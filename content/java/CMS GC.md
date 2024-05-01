---
title: "CMS GC"
draft: false
tags:
---

# Concurrent Mark-Sweep Garbage Collector (CMS GC)
CMS GC는 STW(Stop-The-World) 시간을 최소화 하기 위해 설계된 GC로써, Old Generation의 메모리를 관리하는데 사용됩니다. 중단 시간을 짧게하기 위해 쓰레드 실행 중에 가급적 많은 일을 하는데요. 

![|620](https://i.imgur.com/xZz0pC8.png)

1. Initial Mark (STW 발생) :  GC Root가 참조하는 객체만 마킹 
2. Concurrent Mark (Tri-Color Marking) : 객체의 변경 사항 추적 
3. Remark (STW 발생) : Concurrent Mark 과정에서 변경된 사항이 없는 지 다시 한번 마킹하여 확정하는 과정 
4. Concurrent Sweep : 접근할 수 없는 객체를 제거하는 과정

## Concurrent Mode Failure (CMF)

> 시나리오 : 할당압이 높아 Full GC를 호출하게 되는 경우
1. 실행 도중 `Eden` 영역이 꽉차 `Minor GC` 를 통해 `Survivor` 영역에 객체 이전 
2. `Minor GC` 이후 `Survivor` 영역이 꽉차 `Premature Promotion` 현상 발생
3. `Premature Promotion` 현상이 발생하면서 `Old` 영역이 꽉차 `Major GC` 발생
4. 최종적으로 `Full GC` 가 발생. 

이를 해결하기 위해 `CMS` 수집 사이클을 개시하는 점유 수준을 적절하게 조절해야 함. 
 