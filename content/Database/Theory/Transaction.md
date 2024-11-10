---
date: 2024-11-02 01:35
last-modified: 2024-11-02 01:54
title: Transaction
draft: false
tags:
  - Database
aliases:
---

# Transaction
트랜잭션(Transaction)은 데이터베이스에서 **하나의 논리적 기능을 수행하기 위한 작업의 단위를 의미**합니다. 데이터베이스는 쿼리를 통해 접근할 수 있기 때문에, 여러 개의 쿼리들을 하나로 묶는 단위라고 이해할 수 있습니다. 
![[assets/transaction.excalidraw.light.png]]


## Transaction > Atomicity
원자성(Atomicity)는 트랜잭션과 관련된 **일이 수행되었거나 되지 않았거나를 보장하는 속성**입니다.  예를 들어 은행 이체와 같은 작업은 다음과 같이 3가지 작업이 필요합니다.
![[assets/transaction-atomicity.excalidraw.light.png]]

1. 이제자의 잔고 조회 
2. 이체자으로부터 출금
3. 수신인에게 입금 

3개의 과정은 이체라는 작업이기 때문에 해당 작업의 원자성이 지켜지지 않는다면, 출금만 되고 입금은 안되었다거나, 잔액 이상으로 출금이 되었다거나와 같은 문제가 발생할 수 있습니다. 

## Transaction > Commit과 Rollback
커밋(Commit)은 여러 쿼리가 성공적으로 처리되었다고 확정하는 명령어입니다. **트랜잭션 단위로 수행**되며 변경된 내용이 모두 영구적으로 저장되는 것을 의미합니다. 반대로 롤백(Rollback)은 트랜잭션으로 처리한 하나의 묶음 과정을 일어나기 전으로 되돌리는 일을 의미합니다. 

![[assets/transaction-commit.excalidraw.light.png]]

## Transaction > Consistency 
`허용된 방식`으로만 데이터를 변경하고, 트랜잭션이 성공하고 나서 계속적으로 유지해야 한다는 점입니다. 이 부분은 대부분 DBMS 에서 관리하게 됩니다 .

## Transaciton > Isolation 
격리성(Isolation)은 트랜잭션 수행 시 서로 끼어들지 못하는 것을 의미합니다. DBMS는 **한번에 여러 개의 트랜잭션을 수행하는 데, 이 때 트랜잭션이 다른 트랜잭션에 영향을 주어서는 안된다는 것을 의미**합니다. 
![[assets/transaction-isolation.excalidraw.light.png]]

완벽한 트랜잭션의 격리성을 제공하기 위해서는, [[Recoverable Schedule|Recoverability]] 과 [[Serializability]] 모두를 만족시켜야만 합니다. 하지만 이는 성능의 제약을 불러오기 때문에 이를 적절하게 제어할 필요가 있습니다. 이를  [[Transaction Isolation Level]] 이라 합니다.

