---
title: TCP Flow Control
draft: false
tags:
  - TCP
aliases:
  - 흐름 제어
---

# TCP Flow Control
패킷의 지연, 분실과 같은 문제는 네트워크의 경로에서도 이루어지지만 수신자의 상황에 따라서도 발생할 수 있습니다. 네트워크 상황이 아무리 쾌적하다 하더라도 수신자가 처리할 수 있는 처리량 이상을 받게 된다면 패킷이 유실될 뿐만 아니라 낭비일 것이다.

흐름 제어는 이러한 배경에서 나오게 된다. **흐름 제어는 수신자의 상황을 고려하여 데이터 전송량을 조절하는 방식**이다. 흐름 제어는 [[TCP Header]]에 있는 `Receive Window` 필드를 참고하여 전송하려는 데이터의 크기를 조절한다. 

![[assets/tcp-rwnd.excalidraw.light.png]]

위의 그림처럼, 전체 공간(`Receive Buffer`)에서 사용중인 공간(`TCP data in buffer`)을 제외한 여유 공간(`Spare Room`)이 수신자의 여유, `Receive Window`가 된다. 송신자는 **이 필드를 통해 수신자의 여유를 파악할 수 있고, 해당 값보다 작은 데이터만**을 보내게 된다.

## Receive Window가 0인 경우 
만약 수신자가 너무 바쁘기 때문에 `Receive Window`가 0인 경우는 어떻게 될까? 송신자는 아무런 데이터를 보내지도 못하고 기다리게 될 수도 있다. 이를 방지하기 위해서는 송신자가 지속적으로 적은 양의 데이터를 보내 수신자의 여유(`Receive Window`) 확인하게 된다.