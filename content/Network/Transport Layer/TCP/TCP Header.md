---
title: TCP Header
draft: false
tags: 
aliases:
---
# TCP Header 
![[tcpHeader.light.png]]
- Sequence/Acknowledgement : 신뢰성 있는 통신을 하기 위해 사용되는 영역
- Receivew Window : [[Flow Control|흐름제어]] 를 하기 위해 사용되는 값 
- Header lenth : `payload`를 제외한 데이터 길이의 값 
- TCP flags : TCP의 여러 상태를 표현하기 위한 영역
	- URG : Urgent(긴급한) 데이터의 처리가 필요한 경우 사용
	- ACK : Acknowledgement number 필드의 영역이 유효하다는 것을 의미
	- PSH : 수신자는 Segment의 데이터를 즉시 상위 계층에 넘겨야 함 
	- RST, SYN, FIN : 3-Way/4-Way Handshaking에 사용됨 

