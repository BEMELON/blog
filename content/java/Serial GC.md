---
title: Serial GC
draft: false
tags:
  - Java
  - Garbage-Collector
---

# Serial GC
하나의 쓰레드에서 GC 작업을 수행, Young과 Old 영역을 동시에 처리합니다. 싱글 스레드 환경 및 Heap 영역이 매우 작을 때 사용되는 방식입니다. 참고로 Mark And Sweep 이후 메모리 파편화를 막는 Compaction 과정도 진행됩니다.

![|620](https://i.imgur.com/UXIYmC0.png)


