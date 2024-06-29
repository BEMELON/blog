---
title: TCP
draft: false
tags:
  - Network
  - TCP
  - "#Protocol"
  - Transport-Layer
aliases:
---

# TCP 
**Transmission Control Protocol** 의 약자로, [[../../Modes of communication#연결 지향(`connection-mode`) communication|Connection Oriented]]한 특성을 가지는 대표적인 전송 계층 프로토콜입니다. 

## 기본 특성
- [[TCP Header]] : TCP 프로토콜의 헤더를 기반으로 필드 별 특성을 설명합니다.
- [[TCP Reliable Data Transfer]] : TCP가 신뢰성 있는 데이터 전송을 보장하는 방법 
- [[TCP 3-Way Handshaking]] : 서로 다른 노드 간 연결을 수립하는 방법
- [[TCP 4-Way Handshaking]] : 서로 다른 노드 간 연결을 해제하는 방법 
- [[TCP Flow Control]] :  TCP가 수신자에게 적절한 데이터를 보내는 방법 
- [[../../../../inbox/TCP Congestion Control]] : TCP가 네트워크 상황을 고려해 데이터를 보내는 방법 


## 최적화 기법 
- [[../../../../inbox/TCP SACK]] :  네트워크 최적화
- [[../../../../inbox/TCP Nagle's Algorithm]] : 응답을 누적해서 응답 
- [[../../../../inbox/TCP Keep Alive]] : 연결 해제 시간을 늘림으로써 불필요한 Handshaking 방지 
- [[../../../../inbox/TCP Fast Open]] : 연결에 대한 정보를 저장함으로써 재연결시 Handshaking 최적화