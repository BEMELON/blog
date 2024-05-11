---
title: TCP Reliable Data Transfer
draft: false
tags:
  - TCP
aliases:
---
# TCP Reliable Data Transfer 
TCP는 혼잡한 네트워크 상황에서 데이터 송/수신의 신뢰성을 보장하기 위해 `Sequence Number`와 `Acknowledge Number` 를 이용하게 됩니다. 

여기서의 핵심 아이디어는 **데이터에 요청하고 해당 데이터를 정상적으로 수신했는 지 응답**하는 방식이다.
![[assets/simple-tcp-rdt.excalidraw.light.png]]

조금 더 구체화해보자면, [[TCP Header]] 필드 중 `Sequence Number` 와 `Acknowledge Number` 를 이용한다.
- `Sequence Number` : 전송된 데이터의 순서를 표기
- `Acknowledgement Number` : 정상적으로 수신한 데이터의 **마지막** 순서 번호

![[assets/tcp-rdt-no-loss.excalidraw.light.png]]

데이터를 전송할 때 데이터의 위치(`Sequence Number`)와 데이터(`Payload`)를 보내게 되고, 수신자는 이를 정상적으로 수신했다는 뜻으로 `Acknowledgement Number` 를 전송하게 된다. 이 때 `Acknowledgement Number`의 값은 **다음 통신때 수신할 데이터의 위치**이다.  (82번째 데이터를 시작으로 8byte의 데이터를 받았기 때문에 $[82, 89]$의 데이터를 수신했고, 다음에 수신해야 될 데이터는 90이다.)


## 패킷 손실에 대응하는 방법 
위의 상황은 매우 이상적인 상황이다. 하지만 실제 네트워크 환경에서는 패킷의 손실이 언제든지 발생할 수 있는 상황이다. TCP에서는 패킷 손실에 다음과 같이 대응하게 된다. 

![[assets/tcp-rdt.excalidraw.light.png]]

송신자는 전송한 데이터에 대한 `Acknowledgement Number` 에 대한 `timeout` 이 정해져  있다. 해당 시간 동안 전송한 데이터에 대한 응답이 오지 않는다면 동일한 데이터를 다시 한번 전송하게 된다. 

## 패킷 지연에 대응하는 방법 
패킷이 `timeout` 시간보다 늦게 도착하는 경우가 발생할 수 있다. 송신자 측에서는 `timeout`이 지나게 되면 해당 패킷이 지연된 건지, 손실된 건지 알 수 있는 방법이 없다. **수신자 측에서는 중복된 패킷이 들어오는 경우에 항상 자기가 필요한 최신의 `Acknowledgement Number`를 전송**하게 된다. 

![[assets/tcp-rdt-delay.excalidraw.light.png]]

해당 방법은 수신자가 데이터의 신뢰성을 유지하는 방법일 수 있지만, 네트워크 상에서는 중복된 패킷이 송/수신되는 상황이기 때문에 낭비일 수 있다. 이러한 낭비는 어떻게 보면 네트워크 상에서의 혼잡을 의미하게 되고, [[TCP Congestion Control|혼잡 제어]]를 통하여 최적화 된다. 







