---
title: Parallel GC
draft: false
tags:
  - Java
  - Garbage-Collector
---

# Parallel GC 
기본적인 처리 방식은 [[Serial GC]] 와 동일합니다. 다른 점은 다수의 쓰레드가 붙어 작업하기 때문에 STW 시간이 전체적으로 짧아진다는 점입니다.

`Minor GC` 에 대해서는 멀티 쓰레딩을 진행하지만 `Major GC` 에 대해서는 단일 쓰레드로 작업하게 됩니다.
![|620](https://i.imgur.com/FKPzdcg.png)

# Parallel Old GC 
한 단계 업그레이드 된 버전입니다. 이전 버전과 다르게 `Major GC` 에서도 멀티쓰레딩을 적용할 뿐만 아니라 `Mark Sweep Compation` 에서 `Mark Summary Compaction` 을 사용하게 됩니다.
