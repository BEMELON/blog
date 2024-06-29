---
title: VARCHAR vs TEXT
draft: false
tags:
  - MySQL
aliases:
---
# 문자열
이전의 내용 [[CHAR vs VARCHAR]] 에서는 문자열 관련 칼럼에서 주로 사용되는 `CHAR`과 `VARCHAR`에서의 비교를 했다면, 문자열 관련해서 데이터를 저장할 수 있는 `TEXT`와 그와 유사한 `VARCHAR`를 함께 정리해보고자 합니다. 

## VARCHAR
![[CHAR vs VARCHAR#VARCHAR|VARCHAR]] 

## TEXT 
- **65535 이상은 불가**: `VARCHAR`와 마찬가지 로 **최대 65,535의 길이까지 저장이 가능**합니다. 

- **필요할때마다 로드**:`VARCHAR`와 다르게 메모리에 캐싱을 하지 않습니다. 필요할 때마다 데이터를 할당하고, 해제하게 됩니다.

- **Full Index는 불가능**: TEXT에 인덱스를 생성하기 위해서는 반드시 `Prefix` 형태로 길이 지정이 필요합니다.

- **default은 표현식**으로만 :TEXT의 기본 값을 사용하기 위해서는 반드시 표현식 형태로 작성되어야 합니다. 

- **External Page** : 저장하는 데이터의 양이 너무 커지게 되면, 외부의 PAGE에 실제 데이터가 저장되고 포인터만을 가지고 있게 되는 경우가 있습니다. 이는 쿼리 처리 성능에 영향을 주게 됩니다.


## VARCHAR vs TEXT 
- `VARCHAR`의 길이를 기준으로 결정할 요소가 아니다. 
- `VARCHAR`는 메모리에 캐싱되기 때문에, 빈번하게 사용되고 메모리 공간이 여유롭다면 사용하는 경우에 적합함. 
- 반대로 `VARCHAR`를 남발하면 `MySQL`의 ROW 최대 사이즈 제한에 걸릴 수 있기 때문에 `TEXT` 와 적절히 사용해야 합니다.

#  Q. SELECT * vs SELECT {column} 
필요한 Column만 가져오는 것이 보다 효율이 좋은데, `VARCHAR`와 `TEXT`처럼 External Page에 저장되는 Column 들이 있을 수 있기 때문입니다. 실제로 External Page에 저장되는 값들을 포함한다면 4배가량 쿼리 처리 성능이 느려지게 됩니다. 

또한, 필요한 Column 들을 가져오는 것은 [[../../inbox/Covering Index]] 를 사용할 수 있는 확률을 높여주기도 합니다.


# Reference
- [Real MySQL 시즌 1 - Part 1 | 인프런](https://www.inflearn.com/course/lecture?courseSlug=real-mysql-part-1&unitId=226561)