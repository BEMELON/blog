---
title: Encoding - Base 128 Varints
draft: false
tags:
  - protobuf
aliases:
---

![[Encoding#Encoding]]


# Base 128 Varints 
7비트 단위로 데이터를 인코딩하는 방법들을 의미합니다. 7비트(=0 ~ 127)의 표현범위를 가지기 때문에 128 이라는 이름을 가지게 되었다고 합니다.  

이러한 인코딩 방식으로 표현 가능한 범위는 `int32`, `int64`, `uint32`, `uint64`, `sint32`, `sint64`, `bool`, `enum`이 있습니다. 그렇기 때문에, 이들 간의 **타입 변환은 서로 호환**될 수 있습니다. 예를 들어 아래와 같은 변환이 하위 호환성에 아무런 문제가 없다는 말과 동일합니다. 👍
```proto 
// AS-IS 
message TestMessage {
	int32 id = 1; 
}

// TO-BE 
message TestMessage {
	uint32 id = 1; 
}
```

처음에는 어떻게 저런 타입들간의 호환이 가능하지? 라고 생각했었는데, 인코딩의 과정을 살펴본 이후에야 왜 가능한지 이해할 수 있었습니다. 

`Base 128 Varints`는 1바이트 단위로 묶이게 되고, 바이트들의 조합으로 숫자를 해석하게 됩니다. 이 과정에서, 어떤 바이트까지 읽어야 하는 지를 판단해야 하는데요. 이것을 바이트의 `MSB` 비트가 담당하게 됩니다. `MSB` 비트는 `Continuation Bit`라고도 불리는데요. 해당 비트가 1인 경우, 다음 바이트를 연속해서 읽어야 하고, 0인 경우 해당 바이트까지 읽어서 숫자를 판단하게 됩니다. 

![[assets/base-128-varints-msb.excalidraw.light.png]]

이렇게 읽어야 하는 바이트들을 분리하고, 바이트들의 `MSB` 비트를 모두 제거합니다. 
![[assets/base-128-varints-drop-msb.excalidraw.light.png]]

제거한 비트들은 현재 `Little-Endian` 으로 표기되어 있는데요. 이를 `Big-Endian` 으로 변환합니다. 그리고 이를 2진수 형태로 해석하면 최종적인 값을 구할 수 있습니다.
![[assets/base-128-varints-convert.excalidraw.light.png]]

## Example 1) 127 이하의 값 해석
```proto
message SimpleMessage {
    int32 number = 1;
}
```

```python 
from example_pb2 import SimpleMessage

def to_binary_string(byte_data):
	return ' '.join(f'{byte:08b}' for byte in byte_data)
  
msg_simple32 = SimpleMessage(number=20)
print("int32 :", to_binary_string(msg_simple32.SerializeToString()))
# int32  : 00001000 00010100
```

이 때 출력되는 결과는 `00001000 00010100` 인데요. 이 때 앞의 8비트는 `Protobuf`의 Field Number 이니 지금은 무시해도 됩니다. 그 뒤의 8비트(`00010100`)가 저희가 해석해야 할 값입니다. 

1. MSB 비트를 제거합니다. -> `0010100` 
2. `Endian` 변환을 합니다. 지금은 단일 바이트기 때문에 동작이 필요없습니다. -> `0010100`
3. 해석합니다. -> `20` 


## Example 2) 128 이상의 값 해석
```python
from example_pb2 import SimpleMessage

def to_binary_string(byte_data):
	return ' '.join(f'{byte:08b}' for byte in byte_data)  

msg_simple32 = SimpleMessage(number=200)
print("int32 :", to_binary_string(msg_simple32.SerializeToString()))
# int32  : 00001000 11001000 00000001
```

아까와 동일하게 첫 바이트는 무시하고, 뒤에 바이트들로 진행해보겠습니다.  첫번째 바이트의 `MSB` 비트가 1인 것을 확인할 수 있었는데요. 그렇기 때문에 그 뒤의 바이트까지 같이 확인해야만 합니다 💪
1. MSB 비트를 제거합니다.  -> (`1001000 0000001`)
2. `Endian` 변환을 합니다. -> (`0000001 1001000`) 
3. 해석합니다 -> (128 + 64 + 8 = 200)

## Example 3) 0 해석 
```python
from example_pb2 import SimpleMessage

def to_binary_string(byte_data):
	return ' '.join(f'{byte:08b}' for byte in byte_data)

msg_simple32 = SimpleMessage(number=0)
print("int32 :", to_binary_string(msg_simple32.SerializeToString()))

# int32 : 
```
0은 `int32`와 같은 값의 기본 값이기 때문에 아무런 비트를 가지고 있지 않습니다. (참고 : [[Protobuffer의 default value]])

## 🧐 첫 바이트의 의미 
첫 바이트를 무시하고 그 뒤의 바이트부터 해석을 했는데요. 첫 바이트의 의미는 **메시지의 번호와 메시지의 타입**을 식별하는 용도로 사용됩니다. 

### 메시지의 번호 
Protobuf 를 정의하게 되면 필드의 번호를 각각 입력해야 하는데요. 이 번호를 메시지의 번호라고 하고. 첫 바이트에서 추출하게 됩니다. 
```proto
message SimpleMessage {
    int32 number = 1;
}
```

추출하는 식은 `{첫 바이트} >> 3` 입니다. 예를 들어, `0001000` 이 있다면,  시프트 연산을 통해 `00000001`으로 변하게 되고, 이 때 값은 1, 메시지의 번호가 1이라는 내용입니다. 

```proto
message TestMessage {
    int32 field_int32 = 1;
    uint32 field_uint32 = 2;
    bool field_bool = 3;
}
```
이렇게 여러 필드를 변환하게 되면 필드마다 첫 바이트는 다음과 같이 가지게 됩니다. 아까와 같이 시프트 연산 후 값을 해석해보면 각각 1, 2, 3을 가리키고 있음을 확인할 수 있습니다. 
```
int32  : 00001000 XXXXXXXX
uint32 : 00010000 YYYYYYYY
bool   : 00011000 ZZZZZZZZ
``` 

### 메시지의 타입 (인코딩 방식)
위에서 맨 뒤의 3비트를 모두 무시했었는데요. 이 3비트가 의미하는 것은 메시지의 인코딩 방식입니다. Protobuf는 다음과 같이 인코딩 방식을 가지게 됩니다. 해당 값을 통해 어떤 인코딩 방식이 사용되었는 지 식별할 수 있습니다. 

지금까지 봐왔던 `VARINT`의 첫 바이트는 모두 `000`으로 끝났다는 것을 확인해볼 수 있습니다. 

| ID  | Name   | Used For                                                 |
| --- | ------ | -------------------------------------------------------- |
| 0   | VARINT | int32, int64, uint32, uint64, sint32, sint64, bool, enum |
| 1   | I64    | fixed64, sfixed64, double                                |
| 2   | LEN    | string, bytes, embedded messages, packed repeated fields |
| 3   | SGROUP | group start (deprecated)                                 |
| 4   | EGROUP | group end (deprecated)                                   |
| 5   | I32    | fixed32, sfixed32, float                                 |

## Example 4) 여러 필드 한번에 보기 
```proto
message TestMessage {
    int32 field_int32 = 1;
    uint32 field_uint32 = 2;
    bool field_bool = 3;
}
```

```python

from example_pb2 import TestMessage

def to_binary_string(byte_data):
	return ' '.join(f'{byte:08b}' for byte in byte_data)

msg_all = TestMessage(
	field_int32=15,
	field_uint32=7,
	field_bool=True
)

print("msg_all :", to_binary_string(msg_all.SerializeToString()))
# msg_all  : 00001000 00001111 00010000 00000111 00011000 00000001
```

1. `field_int32` : 0001000 00001111
2. `field_uint32`:  00010000 00000111 
3. `field_bool` : 00011000 00000001

## Side Notes 
업무에 사용되는 gRPC 통신 중에 `int` 범위를 벗어나는 값들이 들어오기 시작해 이를 대응했어야 했습니다. 그 과정에서 `int`를 `unsigned int` 로 변경하는 작업이 필요했었는데, 생각보다 간단하게 변환할 수 있었습니다. 이 변환 아래에 숨겨진 Protobuf의 궁금증을 풀 수 있었던 기회가 될 수 있었습니다. 😀
