---
date: 2024-11-02 07:42
last-modified: 2024-11-02 07:43
title: Procedure
draft: false
tags:
  - Database
aliases:
---

# Procedure
어떤 업무를 수행하기 위한 절차, [[Function]] 과 비슷한 역할을 수행하지만 다른점이 있다. 

# Procedure VS Function 

| 프로시저(Procedure) | 함수(Function) |
| ---- | ---- |
| 특정 작업을 수행 | 특정 계산을 수행 |
| 반환 값이 있거나 없을 수 있음 | 반환 값이 있어야 함 |
| 반환 값이 여러개가 될 수 있음 | 반환 값은 반드시 1개 |
| 수식 내에서 호출 불가 | 수색 내에서만 호출 가능 |

# SYNTAX 
``` SQL 
DELIMITER $$ 
CREATE PROCEDURE {procedure_name} ( 
	IN NAME VARCHAR(20), -- 입력용 파라미터  
	IN AGE INT,
	OUT x, -- 결과 저장용
	OUT y,
	OUT z
) BEGIN 
	-- 내용
	 
  END $$ 
DELIMITER ;
```


# 예시 
``` SQL
DELIMITER $$  
CREATE PROCEDURE multiply(IN a INT, IN b INT, OUT c INT)  
BEGIN  
    SET c = a * b;  
END $$  
DELIMITER ;  
  
  
CALL multiply(2, 3, @result);  
SELECT @result;
# 6 
```

# 특징 
- `DB` 레벨에서 수행되기 때문에 성능상 이점을 가져갈 수 있음 
- 성능상 향상을 가져갈 수 있지만, 인덱스 힌트가 없으면 최적화가 되지 않을 수 있기에 주의해야 함. 
- 개발시 프로시저에 대한 가시성이 확보되지 않아 어려움이 있을 수 있음.