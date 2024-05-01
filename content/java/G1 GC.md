---
title: G1 GC
draft: false
tags:
  - Java
  - Garbage-Collector
---

## Garbage-First GC (G1 GC)
Java 9 버전부터 기본 GC로 채택된 GC로써 대용량의 메모리가 있는 멀티 프로세서 시스템을 위해 제작되었습니다. 빠른 처리 속도를 지원하면서 STW를 최소화 할 수 있다는 점이 장점입니다. [[CMS GC]] 보다 효율적이면서 동시에 병행성과 메모리 Compaction 과정까지 지원하고 있습니다. 

기존의 방식과 레이아웃이 완전하게 달라졌는데요. 런타임에 따라 영역 별 Region 개수를 튜닝함으로써 STW 시간을 최소화 할 수 있습니다.
![|620](https://i.imgur.com/24V7oIl.png)

- 거대 영역 : Region 절반 이상의 크기를 가진 객체는 거대 객체로 간주하여 거대 영역이라는 공간에 연속적 할당 

- 장점
	- 별도의 STW 없이 메모리 공간을 압축하는 기능을 제공, 압축시 전체 공간을 보지 않고 필요한 영역만 처리하기 때문에 더욱 효율적. 
	- 영역 관리 및 병렬 처리 등의 이유로 Heap 메모리가 클수록 더 잘 동작한다.  
	- 빈 공간 확보가 빠르기 때문에 Premature Promotion 문제로부터 상대적으로 자유롭다.
- 단점
	- 공간 부족 상태를 조심해야 한다, Full GC가 발생하는 경우 싱글 쓰레드로 동작하게 된다. 
	- 작은 Heap 공간을 가지는 Application 에서는 제 성능을 발휘하지 못하고 Full GC가 발생한다. 

## 동작 과정 
- [제이온의 블로그](https://steady-coding.tistory.com/590)