---
title: TCP 4-Way Handshaking
draft: false
tags:
  - TCP
aliases:
  - 4-Way Handshaking
---
# TCP 4-Way Handshaking
TCP는 [[../../Modes of communication#연결 지향(`connection-mode`) communication|연결 지향 프로토콜]]의 종류이기 때문에 연결 수립 과정으로 [[TCP 3-Way Handshaking|3-Way Handshaking]]이 있었고, 연결을 해제하는 과정에서도 절차가 필요하다. 해제 과정에서는 4-Way Handshaking 이 진행된다. 

4-Way Handshaking 에서는 [[TCP Header]]에 있는 `TCP Flags` 항목이 사용된다. 구체적으로, `FIN`, `ACK` 가 사용된다. 4-Way로 진행되는 이유는, TCP는 전이중(`full-duplex`) 통신이기 때문에 양쪽 모두가 데이터를 전송할 수 있다. 따라서 양쪽 모두 보내는 데이터를 확인한 이후 통신을 종료하게 된다.
![[assets/tcp-4way-handshaking.excalidraw.light.png]]


