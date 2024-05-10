---
title: TCP Header
draft: false
tags: 
aliases:
---
# TCP Header 
![[assets/tcp-header.excalidraw.light.png]]
- `Source Port` : 송신자의 프로세스를 식별하는 데 사용되는 포트 번호
- `Destination Port` : 수신자의 프로세스를 식별하는 데 사용되는 포트 번호
- `Sequence Number` : 전송된 데이터의 순서를 표기
- `Acknowledgement Number` : 정상적으로 수신한 데이터의 마지막 순서 번호
- `Header length` : 헤더의 전체 길이, 동적 필드(Options)를 포함 
- `TCP flags` : TCP 세션의 다양한 상태를 제어하는 플래그
	- SYN: 연결 설정
	- FIN: 연결 종료
	- ACK: 확인 응답
	- RST: 연결 재설정
	- PSH: 수신 측에서 빠른 처리가 필요한 데이터
	- URG: 긴급 데이터
- `Receive Window` :  한 번에 수신할 수 있는 데이터의 양
- `Checksum` : 헤더와 데이터의 오류 검출을 목적으로 하는 공간 
- `Urg Data Pointer` : 긴급 데이터의 끝을 가리키는 포인터
- `Options` : TCP 연결을 보다 효율적으로 처리하기 위해 사용되는 공간
- `Payload` : 전송되는 실제 데이터
 

- [[TCP Reliable Data Transfer]] : `Sequence Number`와 `Acknowledgement Number`를 이용하여 TCP가 신뢰성 있는 데이터 전송을 보장하는 방법 
- [[TCP 3-Way Handshaking]] : `TCP flags`를 이용해 서로 다른 노드 간 연결을 수립하는 방법
- [[TCP 4-Way Handshaking]] : `TCP flags`를 이용해 서로 다른 노드 간 연결을 해제하는 방법 
- [[TCP Flow Control]] : `Receive Window`를 통해 TCP가 수신자에게 적절한 데이터를 보내는 방법 
- [[TCP SACK]] : `Options` 필드를 통해 설정하여 네트워크 환경에서의 최적화