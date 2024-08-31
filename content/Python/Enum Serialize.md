---
date: 2024-08-31 12:25
last-modified: 2024-08-31 01:24
title: Enum Serialize
draft: false
tags:
  - Python
aliases:
---

# Enum Serialize
[[Python과 JSON Serializer]]에서 각각의 Encoder 마다 어떠한 방식으로 데이터를 Serialize 하는지 살펴볼 수 있었습니다. 이번에는 가장 많이 쓰이지만 호환이 되지 않은 `Enum`은 어떻게 Serialize 할 수 있는 지 살펴보겠습니다. 

## 1. Custom Encoder 만들기 
`json.dumps` 사용시 `cls=CustomEncoder`를 통해서 `Enum`을 직접 처리하는 방법입니다. 

```python
PUBLIC_ENUMS = {
    'Status': Status,
    # ...
}

class EnumEncoder(json.JSONEncoder):
    def default(self, obj):
        if type(obj) in PUBLIC_ENUMS.values():
            return {"__enum__": str(obj)}
        return json.JSONEncoder.default(self, obj)

>> text = json.dumps(data, cls=EnumEncoder)
```

이와 비슷한 방법으로 `default` 메소드를 재정의하는 것도 방법입니다.
```python
json.dumps(enum_obj, default=lambda x: x.value)
```

하지만 이러한 방식은 **`json.dumps`를 직접 접근해야 한다는 단점**이 있기 때문에 `Django`나 `DRF`와 같은 외부 프레임워크에 감싸져 있다면 사용하기 힘든 방법입니다. 

## 2. Enum의 다중상속
이 방식을 설명하기 전에, `json.dumps` 에서 기본 타입을 어떻게 직렬화 하는지 이해해야 합니다. `json.dumps` 에서는 기본 타입(int, str, float.. 등)에 대해서 `__repr__` 메소드를 호출함으로써 직렬화를 수행합니다.

이 방식을 응용하여 `Enum`에 기본 타입을 상속받을 수 있습니다. (기본 타입이 본래 클래스로 인식되기 때문입니다.)

```python
class MyEnum(str, Enum):  
    FOO = 1  
    BAR = 2  
  
print(json.dumps(MyEnum.FOO)) # "1"
```

이렇게 기본 타입을 상속 받게 된다면, `Enum`은 `str`의 Sub-class 로 하나로 판단되기 때문에 `__repr__` 접근에 문제가 발생하지 않습니다. 
```python
print(isinstance(MyEnum.FOO, str)) # True
```

## 3. TypedEnum

위에서의 다중상속이 어느정도 패턴화되었기 때문에 이를 고려하여 3.11 에서는 `TypedEnum`이 나오게 되었습니다. 버전 등의 문제가 없다면 이러한 Enum을 사용하는 것이 더욱 좋아보입니다.
```python
class MyEnum(StrEnum):  
    FOO = "foo"  
    BAR = "bar"

class MyEnum(IntEnum):  
    FOO = 1  
    BAR = 2  
  
```

