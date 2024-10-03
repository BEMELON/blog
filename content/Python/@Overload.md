---
date: 2024-10-03 07:51
last-modified: 2024-10-03 08:08
title: "@Overload"
draft: false
tags:
  - Python
  - typing
aliases:
  - 파이썬 오버로딩
---

# Overloading 
하나의 함수 또는 연산자가 입력에 따라 여러 가지 동작을 하도록 하는 것을 의미하는데, 기본적으로 Python은 동적 타이핑 언어이기 때문에 이러한 오버로딩이 존재하지 않는다. 하지만 이를 보완해줄 수 있는 `typing.overload`가 있다. 


간단한 정수 덧셈 함수에 있어서 `typing`을 적용해볼 수 있습니다. 
```python
def simple_add(x: int, y: int) -> int:  
    return x + y
```

이 덧셈 함수에 실수를 추가한다고 한다면 `Union` 타입을 통해서 적용해볼 수도 있습니다.
```python
def simple_add(x: int | float, y: int | float) -> int | float:  
	return x + y
```

하지만 이 메소드의  `typehint` 가 사용에 혼동을 줄 수 있습니다. 메소드를 만들 때 의도한 것은 다음의 2가지 케이스일 것입니다.
- `x`와 `y`가 모두 `int` 타입인 경우 
- `x`와 `y` 모두 `float` 타입인 경우 

하지만 사용하는 입장에서의 `typehint`는 이런식으로 보여지게 되게 됩니다.  
```python
import typing

print(typing.get_type_hints(simple_add))
# {'x': int | float, 'y': int | float, 'return': int | float}
```

이 것은 x, y 둘 다 `int | float` 형식이 들어올 수 있다는 것을 의미함으로 혼동을 제공할 수 있습니다.
 - `x: int | float, y: int | float`

2가지 케이스를 생각했지만, `typehint`가 명시적이지 않아 4가지의 케이스가 발생할 수 있습니다. 이러한 문제를 예방할 수 있는게 `typing.overload` 함수입니다. 실제로 오버로딩의 기능을 제공하지 않지만, `typehint`를 더욱 명시적으로 표현할 수 있습니다. 

```python
@overload  
def simple_add(x: int, y: int) -> int: ...  
  
@overload  
def simple_add(x: float, y: float) -> float: ...  
  
def simple_add(x: int | float, y: int | float) -> int | float:  
    return x + y
```

해당 방법을 적용한 경우 `simple_add` 메소드에 대해서 `typing`을 참고했을 때 다음과 같이 2가지 형태의 매개변수를 보여주게 됩니다. 
- `x: int, y: int` 
- `x: float, y: float`

