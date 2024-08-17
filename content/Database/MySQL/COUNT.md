---
title: COUNT
draft: false
tags:
  - MySQL
aliases:
date: 2024-08-17 05:15
last-modified: 2024-08-17 08:50
---

# `COUNT(*)`
레코드의 건수를 반환하는 함수인데, 여기서 `*`는 모든 칼럼을 가져오는 의미가 아니라 레코드의 형태이기 때문에 PK, 인덱스 여부와의 성능 차이는 크게 발생하지 않습니다. 일반적으로 `COUNT(*)`의 경우 별도의 `limit` 제한 없이 수행되곤 하는데요. 이러한 점에서 `count(*)` 사용할 때 주의해야 하는 점들을 정리해보았습니다. 

## 동작 원리 
`COUNT` 함수는 단순하게 행의 개수를 계산하게 됩니다. 따라서, `COUNT (1)`, `COUNT (*)` 는 서로 동일한 성능을 보이게 됩니다.  MyISAM 스토리지 엔진은 상황에 따라 최선의 방법으로 개수를 반환하도록 설게 되어 있습니다. 

예를 들어, 아래와 같은 쿼리는 실제 DB에 접근하지 않고 행의 개수를 저장하는 메타 테이블을 통하여 값을 빠르게 반환할 수 있습니다.
```sql 
SELECT COUNT(*)
FROM profiles;
```

하지만. 아래와 같이 특정 조건이 걸려있는 쿼리의 경우, 실제 테이블에 접근하여 값을 확인해야 하기 때문에 성능적으로 문제가 될 가능성이 있습니다.  아래와 같이 인덱스가 아닌 열에 대해서 값을 조회하게 되면 Full-Scan까지 걸리게 될 가능성이 있습니다.
```SQL
SELECT COUNT(*)
FROM profiles
WHERE created_at > '2023-08-12'; -- created_at은 non-index  
```

## 최적화 가이드
###  1. [[../../inbox/Covering Index|Covering Index]] 를 통한 최적화 
```sql
SELECT COUNT(*)
FROM profiles 
WHERE id >= 500; -- index key 
```
인덱스가 존재하는 항목들로 조건 절을 구성하는 방법입니다. 해당 방식을 통해 보다 빠르게 개수를 구할 수 있습니다. 하지만, 모든 쿼리를 커버링 인덱스의 형태로 구성하는 것은 적절하지 않고, 꼭 필요한 순간에만 최적화 하는 것이 중요합니다.

### 2. 최대한 지양하기 
보통 이런 `COUNT(*)` 쿼리는  `OFFSET ~ LIMIT`기반의 페이지네이션에서 전체 페이지 개수를 구하기 위해 주로 사용이 됩니다. 하지만 요 방법은 테이블이 커지게 되면 문제가 발생할 수 있기 때문에, `Cursor` 기반의 페이지네이션으로 변환하는 것이 적절합니다. 

### 3. 필요한 정보만 쿼리하기
대용량의 테이블에서 페이지네이션을 하기 위해, 굳이 끝 페이지를 알아야 할 필요는 없는 경우가 대부분입니다. 그렇기 때문에, 처음에 보여지는 페이지들에 해당하는 쿼리를 작성하는 방식으로도 충분히 활용 될 수 있습니다. 

```sql
SELECT COUNT(*)
FROM (
	SELECT 1
	FROM table 
	LIMIT 200 -- 첫 페이지 목록은 200개 개수 내에서 조절이 가능하다는 전제 
) z; 
```

### 4. 대략적인 정보 활용하기 
만약, **정확한 개수가 궁금한게 아니라, 대략적인 정보만 필요하다면 테이블 통계를 활용하는** 것도 좋은 방법이 될 수 있습니다. 

```sql 
SELECT TABLE_ROWS as rows
FROM INFORMATION_SCHEMA.tables
WHERE schema_name=? AND table_name = ?
```

## `COUNT(DISTINCT expr)` 주의점 
해당 쿼리는 중복을 제거한 개수를 구하고자 하기 위해 주로 사용됩니다. MySQL 내부에서는 중복을 제거하기 위한 임시 테이블을 생성 후 이의 개수를 구하곤 하는데요.  

중복을 제거하기 위해 생성된 임시 테이블의 크기가 크게 되면, 디스크에 저장된 이후 다시 사용될 가능성이 있기 때문에 쿼리에 부하를 발생시킬 수 있습니다. 이를 방지하기 위해서는, `GENERAL LOG`를 설정하고 이를 기반으로 분석하는 것이 중요하다고 합니다. 


# 출처 
- [Real MySQL 시즌 1 - Part 1 | 인프런](https://www.inflearn.com/course/lecture?courseSlug=real-mysql-part-1&unitId=226561)
- [Real MySQL 8.0 2권 | 백은빈](https://product.kyobobook.co.kr/detail/S000001766483)