---
title: gRPC란?
draft: false
tags:
  - gRPC
aliases:
---

# gRPC 
구글에서 만든 [[../../inbox/RPC|RPC]](Remote Procedure Call)의 종류입니다. RPC의 종류들은 [[../../inbox/IDL|IDL]]을 통해서 통신을 하게 되는데, gRPC는 [[Protocol Buffer/Protocol Buffer]]를 기본으로 사용하게 됩니다.

아래의 예시는 `gRPC`와 `ProtoBuf`를 이용한 `proto` 정의 예시입니다. 
```proto
service HelloService {
  rpc SayHello (HelloRequest) returns (HelloResponse);
}

message HelloRequest {
  string greeting = 1;
}

message HelloResponse {
  string reply = 1;
}

```


## Service definition
### Unary RPC 
> 클라이언트가 서버에게 단순한 Request를 보내고 Response를 받는 구조 

```proto
service HelloService {
  rpc SayHello (HelloRequest) returns (HelloResponse);
}
```

### Server streaming RPC
> 클라이언트가 서버에게 Request를 보내고, 서버는 Stream을 Response 전송하게  됩니다. 클라이언트는 Stream에 더 이상 메시지가 없을 때 까지 읽습니다. 이 때, **메세지의 순서는 보장**됩니다.

```proto
service HelloService {
  rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse);
}
```

### Client streaming RPC 
> 클라이언트가 서버에게 Stream Request를 보내게 됩니다. 모든 Stream 을 보내게 되면 서버가 이를 읽고 Response 를 제공하게 됩니다. 마찬가지로 **메시지의 순서는 보장**됩니다.

```proto
service HelloService {
  rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse);
}
```

### Bidirectional streaming RPC 
> 클라이언트 서버 모두 Stream을 이용해 Reqeust와 Response를 보내는 방식입니다. 메시지의 순서는 보장되며, 동작 방식이 자유롭습니다. 클라이언트의 요청을 모두 받고 처리할 수도 있고, 요청이 하나마다 처리할 수도 있습니다.

```proto
service HelloService {
  rpc BidiHello(stream HelloRequest) returns (stream HelloResponse);
}
```
