---
date: 2024-11-02 07:40
last-modified: 2024-11-02 07:42
title: Trigger
draft: false
tags:
  - Database
aliases:
---

# Trigger 
특정 테이블에 `INSERT`, `DELETE`, `UPDATE`와 같은 `DML` 문이 수행되었을 때, 데이터베이스에서 자동으로 동작하도록 작성된 프로그램. 


# 예시. 당일 판매 수량 수집하기 

아래와 같은 주문 테이블이 있다고 가정해보겠습니다. 

| 필드명 (ORDERS)     | 타입     | 설명      |
| ---------- | -------- | --------- |
| ID         | INT      | PK        |
| ORDER_DATE | DATETIME | 주문 시각 |
| QTY        | INT      | 주문 수량 |
| PRICE      | INT      | 주문 가격 |
| PRODUCT    | VARCHAR         | 상품명          |


이 때, 당일 판매 수량을 체크하고자 다음과 테이블을 구축했습니다. 

| 필드명 (DAILY_ORDERS)    | 타입     | 설명      |
| --------- | -------- | --------- |
| ID        | INT      | PK        |
| SALE_DATE | DATETIME | 수집일    |
| PRODUCT   | VARCHAR  | 상품명    |
| TOTAL_QTY       | INT      | 판매 수량 |
| TOTAL_PRICE          | INT         | 판매 금액          |

``` SQL 
CREATE TABLE ORDERS(  
    ID         INT AUTO_INCREMENT,  
    ORDER_DATE DATETIME NOT NULL,  
    PRODUCT    CHAR(255) NOT NULL,  
    QTY        INT NOT NULL,  
    PRICE      INT NOT NULL,  
  
    PRIMARY KEY (ID)  
);  
  
CREATE TABLE DAILY_ORDERS (  
    ID        INT AUTO_INCREMENT,  
    SALE_DATE DATETIME NOT NULL,  
    PRODUCT   CHAR(255) NOT NULL,  
    TOTAL_QTY INT NOT NULL,  
    TOTAL_PRICE INT NOT NULL,  
  
    PRIMARY KEY (ID)  
);
```

주문이 들어오는 경우, 해당 주문의 통계를 구하기 위해 `DAILY_ORDERS` 에 값이 업데이트가 되어야 합니다. 이를 해결하는 방법은 많아보이지만, 우선 `TRIGGER` 를 이용해 작성해보도록 하겠습니다. 



## TRIGGER SYNTAX 
``` SQL
DELIMITER $$ 
	CREATE TRIGGER {trigger_name} 
	{BEFORE | AFTER} {INSERT | UPDATE| DELETE } 
	ON {table_name} FOR EACH ROW 
	BEGIN 
		-- 트리거 내용 
	END 
DELIMITER ;
```

## TRIGGER 작성하기 
위의 문법을 바탕으로, TRIGGER 를 작성해보도록 하겠습니다.  요구사항은 다음과 같습니다.

- 주문이 들어오는 경우 (`ORDERS` 테이블에 `INSERT`되는 경우)
- `DAILY_ORDERS` 값 업데이트 하기  

요구사항에 해당하는 `TRIGGER` 는 다음과 같습니다. 여기서 `NEW` 라는 키워드는 적용될 행을 의미하게 됩니다.
``` SQL
DELIMITER $$  
    CREATE TRIGGER DAILY_ORDER_SUMMARY  
    AFTER INSERT ON ORDERS FOR EACH ROW  
    BEGIN        # 날짜를 저장할 변수를 선언한다.  
        DECLARE ORDERED_DATE DATETIME;  
  
        # 날짜-시간을 날짜로 변환한다.  
        SET ORDERED_DATE = DATE(NEW.ORDER_DATE);  
  
        # 해당 하는 날짜가 없는 경우 날짜에 해당하는 데이터를 미리 삽입한다.  
        IF NOT EXISTS(SELECT * FROM DAILY_ORDERS WHERE SALE_DATE = DATE(NEW.ORDER_DATE) AND PRODUCT = NEW.PRODUCT) THEN  
            INSERT INTO DAILY_ORDERS  
                    (ID, SALE_DATE, PRODUCT, TOTAL_QTY, TOTAL_PRICE)  
                VALUES  
                    (NULL, ORDERED_DATE, NEW.PRODCUT, 0, 0);  
        END IF;  
  
        # 해당 날짜에 해당하는 데이터를 업데이트한다.  
        UPDATE DAILY_ORDERS  
            SET  
                TOTAL_QTY = TOTAL_QTY + NEW.QTY,  
                TOTAL_PRICE = TOTAL_PRICE + NEW.PRICE  
            WHERE  
                SALE_DATE = ORDERED_DATE AND PRODUCT = NEW.PRODUCT;  
    END $$  
DELIMITER ;
```


실제로 데이터를 넣어보고 그 결과를 살펴보겠습니다
``` SQL 
INSERT INTO ORDERS VALUES (NULL, NOW(), 'A', 1, 100);

SELECT * FROM ORDERS;
# 1 | 2023-12-28 03:40:02 | A | 1 | 100

SELECT * FROM DAILY_ORDERS;
# 1 | 2023-12-28 00:00:00 | A | 1 | 100

INSERT INTO ORDERS VALUES (NULL, NOW(), 'B', 1, 50);  
INSERT INTO ORDERS VALUES (NULL, NOW(), 'C', 1, 70);  
INSERT INTO ORDERS VALUES (NULL, NOW(), 'D', 1, 40);  
INSERT INTO ORDERS VALUES (NULL, NOW(), 'E', 1, 100);

SELECT * FROM DAILY_ORDERS;
# 1|2023-12-28 00:00:00|A|1|100
# 2|2023-12-28 00:00:00|B|1|50
# 3|2023-12-28 00:00:00|C|1|70
# 4|2023-12-28 00:00:00|D|1|40
# 5|2023-12-28 00:00:00|E|1|100

```


## TRIGGER 조회
``` SQL
SHOW TRIGGERS;
```


## TRIGGER 삭제 
``` SQL 
DROP TRIGGER {trigger_name};
```

# 특징 
- 제약 조건 관리 : 새로운 데이터가 삽입되는 경우에 다른 테이블에 해당 데이터를 삽입
- 데이터 갱신 관리 : 데이터가 갱신되면 다른 테이블의 데이터도 함께 갱신하도록 
- 로그 기록 : 데이터 변경 작업에 대한 로그를 기록
- 복제 관리  : DB 복제 환경에서 Trigger 를 활용해서 일관성을 유지할 수 있다.

# 장점 
- `Trigger` 는 DB의 이벤트(INSERT, UPDATE 등)에 대해서 앞뒤로 실행될 수 있다. 
- `Trigger` 는 `DB` 에서 동작하기 때문에 불필요한 Round Trip 시간을 줄일 수 있다.
- `Trigger` 는 `DB` 에서 동작하기 때문에 성능적인 이점을 가져갈 수 있다. 


# 단점 
- 가시성이 좋지 않기 때문에 유지보수에 좋지 않은 영향을 끼칠 수 있다. 
- [[Transaction Isolation Level]] 에 따라 동시성 문제가 발생할 수 있다.
