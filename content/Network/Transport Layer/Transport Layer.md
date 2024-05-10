---
title: Transport Layer
draft: false
tags:
  - "#Transport-Layer"
  - Network
aliases:
---
# Transport Layer 
전송 계층은 데이터 송수신에 있어 **신뢰성**(`reliable`) 있고, **효율적인**(`cost-effective`) 방법을 제공하는데 목적이 있고, 전송 계층에서 구현되는 모든 프로토콜은 송신자와 수신자 **양 끝단**(`end-to-end`)에 데이터를 전달한다.

해당 계층에서는 이를 `Segment` 혹은 `Datagram` 으로 부르게 된다.
![[assets/segment.excalidraw.light.png]]

## 프로토콜의 종류 
- [[TCP]] : 대표적인 [[../Modes of communication#연결 지향(`connection-mode`) communication|연결 지향 프로토콜]]
