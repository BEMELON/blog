---
title: __all__
draft: false
tags:
  - Python
aliases:
---
# \_\_all_\_ 
> 모듈에서 메소드, 클래스, 변수만 선택하여 공개할 수 있는 방법 

모듈에서 **공개하고 싶은 메소드, 클래스, 변수 등을 선택하여 공개할 수 있는 방법**으로 사용됩니다.   

## Example 
```python title=foobar/foobar.py 
# 메소드 foo 만을 Export
__all__ = ['foo']  
  
  
def foo():  
    return 'foo'  
  
  
def bar():  
    return 'bar'
```

```python title=foobar/__init__.py
# Package에서는 import * 형태로 사용 중 
from foobar.foobar import *
```

```python title=main.py
from foobar import * 

print(foo()) # foo 
print(bar()) # NameError: name 'bar' is not defined
```

## IF : 명시적으로 import 하는 경우 
만약 `__init__.py` 에서 다음과 같이 명시적으로 특정 메소드를 `import` 한다면 얘기가 달라진다. 

```python title=foobar/__init__.py
# Package에서 Module의 메소드를 직접 import 
from foobar.foobar import foo, bar
```

패키지를 사용하는 클라이언트 입장에서는 `foo`와 `bar` 모두를 사용할 수 있게 된다.
```python title=main.py
from foobar import * 

print(foo()) # foo 
print(bar()) # bar
```
