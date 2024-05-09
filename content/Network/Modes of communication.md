---
title: Modes of communication
draft: false
tags:
  - Network
aliases:
---
## Modes of communication 
통신(`commnunicaion`)에는 2가지의 종류가 있다. 연결 지향(`connection-mode`)와 비연결 지향(`connectionless-mode`). 계층은 **하위 계층으로부터 제공된 통신의 종류를 상위 계층에도 전달**해야 한다.

### 연결 지향(`connection-mode`) communication 
연결 지향 통신의 경우 다음과 같은 3가지의 단계를 거친다.
1. 연결 수립 (`connection establishment`)
2. 데이터 전송 (`data transfer`)
3. 연결 해제 (`connection release`)

연결을 수립하는 과정에서는 데이터 통신에 있어 규약을 설정하고, 전송 프로토콜, 데이터의 최적화 방식 등을 논의하게 된다. 이러한 과정이 있기 대문에 **실제 데이터 전송(`data transfer`) 과정에서는 핵심이 되는 데이터**만을 주고 받을 수 있다. 이러한 특성 덕분에 파일 전송, 원격 접속과 같이 `long-lived` , `stream-oriented`한 특성을 가지는 어플리케이션에서 주로 사용하곤 한다.

### 비연결 지향(`connectionless-mode`) commnunication 
비연결지향의 경우, 연결 지향 통신과 다르게 바로 데이터 전송 과정을 거치게 된다. 그에 따라 모**든 메타 데이터가 매 송/수신마다 전송**되게 된다. 연결 수립/해제 과정이 없기 때문에 보다 유연하고, 간편하게 데이터를 전송할 수 있게 된다.

## 종류에 따른 지원가능한 기능

| Function                                   | Connection | Connectionless |
| ------------------------------------------ | ---------- | -------------- |
| Conn Estab. & Rel                          | x          |                |
| Suspend                                    | x          |                |
| Resume                                     | x          |                |
| Muxing & Splitting                         | x          | x              |
| Normal Data Transfert during Establishment | x          | x              |
| during Establishment                       | x          |                |
| Flow Control                               | x          | x              |
| Expedited                                  | x          |                |
| Segmenting                                 | x          | x              |
| Blocking                                   | x          |                |
| Concatenation                              | x          | x              |
| Sequencing                                 | x          | x              |
| Acknowledgement                            | x          | x              |
| Error Detect & Notif                       | x          | x              |
| Reset                                      | x          |                |
| Routing                                    | x          | x              |
| Quality of Service                         | x          | x              |


# 출처
- [[ISO-IEC 7498-2.pdf]]