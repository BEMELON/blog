---
title: __str__ vs __repr__
draft: false
tags:
  - Python
aliases:
  - __str__
  - __repr__
---
# \_\_str\_\_
>  객체의 “비형식적인(informal)” 또는 보기 좋게 인쇄 가능한 문자열 표현을 계산합니다.

객체를 보다 **보기 좋게 표현**하는 것이 가장 큰 목적입니다. 
```python
import datetime 

now = datetime.datetime.now()
str(now) # '2024-06-29 19:13:42.285964'
```
# \_\_repr\_\_
> 객체의 “형식적인(official)” 문자열 표현을 계산합니다. 만약 가능하다면, 이것은 같은 (적절한 환경이 주어질 때) 값을 갖는 객체를 새로 만들 수 있는 올바른 파이썬 표현식처럼 보여야 합니다. 이것은 디버깅에 사용되기 때문에, 표현이 풍부한 정보를 담고 모호하지 않게 하는 것이 중요합니다.

객체를 디버깅하기 위해 사용되는 것이 가장 큰 목적입니다. 보기 좋은 것보다, 향후 **똑같은 객체를 만들 때에 필요한 정보들을 제공하는 것이 가장 바람직**합니다. 
```python
import datetime 

now = datetime.datetime.now()
str(now) # 'datetime.datetime(2024, 6, 29, 19, 13, 42, 285964)'
```
# \_\_str\_\_ vs \_\_repr\_\_
- 둘 다 구현하기 힘들다면, `__repr__` 만을 구현하자
	- `__repr__`은 `__str__` 을 대체할 수 있지만, 그 반대는 불가능합니다.
- `__str__` 는 보기 좋게 구현하는게 최종 목표입니다.
- `__repr__`는 헷갈리지 않게 필요한 정보만을 전달하는 것이 최종 목표입니다.
# Reference 
 - [docs.python.org | \_\_str\_\_](https://docs.python.org/ko/3/reference/datamodel.html#object.__str__)
 - [docs.python,ogr | \_\_repr\_\_](https://docs.python.org/ko/3/reference/datamodel.html#object.__repr__)
 