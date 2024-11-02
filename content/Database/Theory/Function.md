---
date: 2024-11-02 07:39
last-modified: 2024-11-02 07:39
title: Function
draft: false
tags:
  - Database
aliases:
---


# Function 
사용자 정의 함수로, 결과 도출이 목적이기 때문에 반드시 반환 값이 필요하다. 

# Syntax
``` SQL
CREATE FUNCTION {함수명} (
	{파라미터들}
) RETURNS {반환할 데이터 타임}
BEGIN 
	{수행할 쿼리들}
	RETURN {반환할 값}
END	
```

## Example

### 곱을 계산하는 함수 

``` SQL 
DELIMITER //
	CREATE FUNCTION multiply(x INT, y INT)
	RETURNS INT
	BEGIN
	    RETURN x * y;
	END //
DELIMITER ;

```

### 함수 사용하기 

``` SQL 
SELECT multiply(6, 7) AS result;
```

### 함수 제거하기 
``` SQL 
DROP FUNCTION IF EXISTS multiply;
```


# 특징 
- 비슷하거나 동일한 연산이 쿼리에서 반복적으로 이루어지는 경우 
- DB에서 실행되기 때문에 어느정도 성능 최적화 가능