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

각 호스트는 여러 개의 프로세스를 동시에 실행하고 있는데, 전송 계층은 수신자의 프로세스를 정확히 찾기 위해 **포트 번호**를 이용한다. 그래서 전송 계층의 모든 프로토콜의 헤더에는 **반드시 포트 번호**를 가지고 있다.

![[assets/transport-layer-header.excalidraw.light.png]]

이렇게 포트 번호를 기반으로 프로세스에게 데이터를 전송하는 작업을 `De-multiplexing` 이라고 한다. 그 반대의 과정은 `Multiplexing` 이라고 한다.
![[assets/multiplexing.excalidraw.light.png]]
 
## 프로토콜의 종류 
- [[TCP]] : 대표적인 [[../Modes of communication#연결 지향(`connection-mode`) communication|연결 지향 프로토콜]]
