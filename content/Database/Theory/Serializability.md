---
date: 2024-11-02 01:55
last-modified: 2024-11-02 01:57
title: Serializability
draft: false
tags:
  - Database
aliases:
  - Serializability
  - 직렬성
---

# Serializability
Serializability는 여러 트랜잭션([[Transaction]])이 동시에 실행될 때 각각의 isolation 수준을 보장하는 것을 의미한다. 이는 데이터베이스 시스템에서 트랜잭션들이 동시에 수행될 때 발생할 수 있는 문제를 해결하기 위해 중요한 개념이다.

트랜잭션들이 동시에 실행되더라도 결과가 순차적으로 실행된 것과 동일하게 나와야 하며, 이를 통해 일관성을 유지할 수 있다. Serializability는 특정 조건을 만족할 때, 여러 트랜잭션이 서로 간섭하지 않고 동시에 실행할 수 있는 상태를 확인하는 방법이다.

## 조건
서로 다른 트랜잭션들이 동시에 실행되면서도 Serializability가 유지되기 위해서는 다음과 같은 조건을 충족해야 한다
1. [[Equivalent Schedule]]: 트랜잭션들의 실행 스케줄이 순차적으로 실행된 것과 논리적으로 동일해야 한다. 이는 동시에 실행되더라도 결과가 같아야 한다는 뜻이다.

2. [[Recoverable Schedule]]: 트랜잭션 실행 중에 발생한 실패 상황에서도 데이터베이스가 회복 가능해야 한다. 즉, 하나의 트랜잭션이 다른 트랜잭션의 변경 사항에 의존할 때, 해당 트랜잭션이 성공적으로 완료되어야 한다.

  

이 두 조건이 충족될 때 트랜잭션 간 isolation이 보장되며, 안전하게 동시에 실행할 수 있게 된다.