---
title: Protocol Buffer
draft: false
tags:
  - gRPC
  - protobuf
aliases:
  - ProtoBuf
---
# Protocol Buffer 
[[../../../inbox/IDL|IDL]] 종류 중 하나로써, [[gRPC]]에서 기본으로 사용하는 언어(?)입니다. 구글 주도하에 개발되었으며, **XML처럼 구조화된 데이터를 가지고 있지만, 더 단순하고 적은 용량을 차지**합니다

언어와 무관하게 정의된 내용만 있다면 사용할 수 있다는 장점을 가지고 있습니다. 다음과 같은 정의가 있을 때 각각 Java와 C++에서 데이터를 읽을 수 있습니다.
```proto
message Person {
  optional string name = 1;
  optional int32 id = 2;
  optional string email = 3;
}
```

Java로는 다음과 같이 사용할 수 있습니다.
```java
Person john = Person.newBuilder()
    .setId(1234)
    .setName("John Doe")
    .setEmail("jdoe@example.com")
    .build();
output = new FileOutputStream(args[0]);
john.writeTo(output);
```

C++ 로는 다음과 같습니다.
```cpp
Person john;
fstream input(argv[1],
    ios::in | ios::binary);
john.ParseFromIstream(&input);
id = john.id();
name = john.name();
email = john.email();
```

## JSON vs Protobuf 
- [[JSON과 Protobuf 크기 비교]] : JSON과 Protobuf 간의 객체 크기를 비교합니다.
- [[../JSON과  gRPC 속도 비교|JSON과  gRPC 속도 비교]] : JSON과 gRPC 간의 속도를 비교합니다.

## Tips? 
- [gRPC Docs | Best Practies](https://protobuf.dev/programming-guides/dos-donts/) : proto 파일의 Best Practice를 설명합니다. 
- [gRPC Docs | Best API Practies](https://protobuf.dev/programming-guides/api/) : Message 에서의 Best Practice를 설명합니다.
 - [[Protobuffer의 default value]] : Protobuffer의 기본 값이 있기 때문에 Wrapper 클래스를 사용해야 합니다. (버전마다 다름)
	 - [ukjae.io | proto3에서 optional 이 사라졌다 다시 생긴 이유](https://blog.ukjae.io/posts/optional-label-in-proto3/) : proto3이 상당히 대격변 수준으로 변화됐는데 그 중 하나가 `optional` 과 `required` 입니다. 해당 블로그에서 자세히 설명하고 있습니다. 
 - [protoscope](https://github.com/protocolbuffers/protoscope) : Protobuf의 Binary를 살펴볼 수 있는 도구
# Reference
 - [Protocol Buffers](https://protobuf.dev/)
