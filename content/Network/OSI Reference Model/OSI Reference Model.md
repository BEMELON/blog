---
title: OSI Reference Model
draft: false
tags:
  - Network
aliases:
  - OSI 7 Layer
  - OSI 7계층
---
#  OSI Reference Model 
`Open Systems Interconnection Reference Model`의 약어로, 우리는 흔히 **OSI 7계층**이라고 부르곤 한다. **개방된(`Open`) 시스템(`System`)들 간에 정보 교환(`Interconnection`)을 위해 상호적으로 적용 가능한 표준**을 정의함으로써 상호 연결될 수 있도록 한다. 

네트워크를 공부하게 되면 한번씩은 보게 된다는 그림이기도 하다. 참조 모델(`Reference Model`)이기 때문에 위의 7개의 계층이 항상 존재해야 할 필요는 없다. 예를 들어 TCP/IP 참조 모델의 경우 7개의 계층을 그룹화하여 더 적은 계층으로 운영될 수 있다.
![[OSI Reference Model/assets/network.excalidraw.light.png]]
각 계층마다 계층의 속성을 가지고 있다. 계층은 **하위 계층의 기능을 사용하여 상위 계층에게 또 다른 기능을 제공**한다. 반대로 말하자면, 상위 계층은 하위 계층의 모든 기능을 이용할 수 있어야 한다. 이렇게 각각의 역할이 어느정도 분리되어 있기 때문에 유지보수 측면에서 큰 도움을 주게 된다. 

계층 사이 간 통신은 각각의 **프로토콜**을 통해 이루어질 수 있다. 하지만 계층 내에서 상호 간 통신은 불가능하다. **계층 내에서 통신을 하기 위해서는 하위 계층의 도움**이 있어야 한다. 프로토콜은 크게 2가지의 [[Modes of communication|종류]]로 나뉘어지는데 연결 지향형과 비연결 지향형 프로토콜이 존재한다.

## Application Layer 
OSI 계층에서 가장 높은 계층을 담당하고 있다. 우리가 개발하고 사용하는 프로세스가 OSI에 접근하는 유일한 수단이다.  즉, 응용 프로그램과 네트워크 사이의 인터페이스 역할을 한다. 

## Presentation Layer 
데이터의 표현을 담당하는 계층이다. **데이터의 변환, 암호화, 압축** 등을 담당한다.  사실 현대의 TCP/IP 체계에서는 Application Layer에 모든 내용이 담겨져 있기 때문에 명확히 구분하기는 어렵다. [XDR 프로토콜](https://www.ibm.com/docs/en/aix/7.2?topic=system-external-data-representation-protocol)이 하나의 예시로 사용될 수 있다.

## Session Layer 
네트워크에서의 세션은, 송신자와 수신자가 연결이 되어 데이터를 주고 받는 경우를 의미한다. 세션 계층은 이러한 세션을 구성, 관리(동기화, 상호작용 등), 종료하는 역할을 한다. 이 계층은 [[Modes of communication#연결 지향(`connection-mode`) communication|연결 지향 프로토콜]]에서 주로 사용한다.

![[Transport Layer/Transport Layer#Transport Layer|Transport Layer]]


## Network Layer
네트워크 계층은 데이터 송/수신에 있어 **네트워크 연결을 설정, 유지 및 종료할 수 있는 수단을 제공**한다. 이를 기반으로 전송 계층에서 네트워크와 독립적으로 응용 프로그램을 처리할 수 있도록 한다. 

## Data Link Layer 
데이터 링크 계층은, 네트워크 계층 간의 신뢰성(`reliable`) 있는 데이터 전송을 위해 연결을 설정, 유지, 해제하고 **물리 계층의 오류를 감지 및 수정하는 역할**을 한다.

## Physical Layer 
물리 계층은 데이터 링크 계층에서 사용할 데이터를 비트(`bit`) 단위로 송/수신하는 계층이다.

# 참고자료 
- [[OSI Reference Model/assets/ISO-IEC 7498-2.pdf]]