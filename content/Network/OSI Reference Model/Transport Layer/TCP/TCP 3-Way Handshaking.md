---
title: TCP 3-Way Handshaking
draft: false
tags:
  - TCP
aliases:
  - 3-Way Handshaking
---
# TCP 3-Way Handshaking 
TCP는 [[../../Modes of communication#연결 지향(`connection-mode`) communication|연결 지향 프로토콜]]의 종류이기 때문에 연결 수립 과정이 필요하다. TCP는 이 과정에서 송신자와 수신자 간의 3번의 통신을 통하여 연결을 수립하게 된다. TCP 자체는 매우 신뢰성 있는 프로토콜이지만, 이는 연결이 수립된 이후에만 적용된다. 즉, **초기 연결을 수립하는 과정에서는 신뢰성을 보장할 수 없다**.

따라서, TCP 프로토콜은 연결 수립에 있어 3-Way Handshaking 방식을 사용한다. 3-Way Handshaking은[[TCP Header]]의 `TCP Flags`를 필드를 사용하게 된다. 구체적으로 `SYN`, `ACK` 필드가 관여하게 된다. 
![[assets/tcp-3way-handshaking.excalidraw.light.png]]

초기 2차례의 통신 이후 마지막 통신부터는 실제 데이터를 전송할 수 있다. 이를 PiggyBacking 이라고 부르기도 한다. 

- [TCP SYN Flooding](https://en.wikipedia.org/wiki/SYN_flood) : 연결 수립 과정을 악용한 DDOS 공격 기법
## 2-Way Handshaking은 안되는 이유 
2-Way Handshaking은 단 한번의 수신만으로 연결을 수립됐다고 판단하게 된다. 그렇기 때문에, 만약 패킷이 지연되어 동일한 연결 요청이 중복되어 나가게 될 수 있고 이로 인하여 의도보다 많은 TCP 연결을 가지게 될 수 있다. 

![[assets/tcp-2way-handshaking.excalidraw.light.png]]

