---
title: Pagination
draft: false
tags:
  - Database
aliases:
  - 페이지네이션
---
# Pagination 
페이지네이션은 **전체 데이터를 부분적으로 나누어 데이터를 조회 및 처리하는 방법**입니다.  이를 통해 DB 및 WAS의 리소스의 사용을 보다 효율적으로 증가할 수 있고, 이는 WAS의 처리 시간을 단축하는 것으로 표현되기도 합니다. 

## Pagination의 방식 

### LIMIT ~ OFFSET 
```sql 
SELECT *
FROM my_db
LIMIT 500 
OFFSET 200;
```
가장 기본적인 구문으로써 대부분의 ORM에서 기본으로 제공하는 방식이기도 합니다. 하지만 `OFFSET` 명령어는 단순하게 순차적으로 데이터를 읽어나가기 때문에 **데이터의 양이 증가할수록 응답 시간이 증가**하기 때문에 일반적으로 사용되지 않는 방식입니다. 

### Seek method - 범위를 기반으로 한 페이징 
```sql
SELECT *
FROM my_db
WHERE created_at BETWEEN ("2024-08-14", "2024-08-15")
```
전체 데이터를 일정한 날짜 혹은 숫자의 범위로 나누어 조회할 때 사용됩니다. 조건이 굉장히 단순하지만, 조건의 인덱스 유무에 따라 성능의 차이가 발생할 수 있다는 점을 감안해야 합니다. 해당 방식은 데이터의 분포가 일정하다면 적용해볼 수 있지만, **데이터의 분포가 일정하지 않다면 마찬가지로 특정 범위에 많은 건수를 조회할 수도 있기 때문에 일반화에 주의**해야 합니다. 

### Seek method - 데이터 개수를 기반으로 한 방식
```sql
SELECT *
FROM my_db
WHERE user_id = ? 
AND finished_at > {이전 데이터의 마지막으로 조회한 finished_at 값}
ORDER BY finished_at, id
LIMIT 30
```
해당 방식을 이용한다면, 필요한 데이터 개수만큼 나눠서 값을 가져올 수 있습니다. 해당 방식은 데이터의 분포와 무관하게 일정한 개수의 데이터를 가져올 수 있기 때문에 대용량의 데이터베이스에서도 효과적으로 사용할 수 있습니다. 

해당 방식은 어떠한 경우에도 안정적인 성능을 제공할 수 있지만, **식별자와 범위 조건 칼럼의 값 순서가 일치하지 않는다면** 쿼리가 한층 복잡해집니다. 위의 예시에서 사용한 쿼리처럼 `id`의 순서가 `finished_at` 순서와 달라지는 경우에는 추가 조건을 걸지 않는다면 데이터 누락이 발생하게 됩니다. 
```sql
SELEcT *
FROM my_db
WHERE (
	(finished_at = '{이전 마지막 데이터의 날짜값}' AND id > '{이전 마지막 데이터의 id 값}')
	OR (finished_at > '{이전 마지막 데이터의 날짜값}' AND finished_at < '{종로 날짜}')
)
ORDER BY finished_at, id
LIMIT 30
```


# 출처 
- [Real MySQL 시즌 1 - Part 1 | 인프런](https://www.inflearn.com/course/lecture?courseSlug=real-mysql-part-1&unitId=226561)
- [Real MySQL 8.0 2권 | 백은빈](https://product.kyobobook.co.kr/detail/S000001766483)