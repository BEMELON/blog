---
title: Encoding
draft: false
tags:
  - protobuf
  - protoscope
aliases:
---
# Encoding 
> Protobuf로 작성된 내용을 Binary 형태로 변환하는 과정 

`Protobuf`는 정해진 문법으로 메시지가 작성되었을 때, 이를 압축하여 이진의 형태로 변환할 수 있습니다. 이러한 압축률은 다른 데이터 포맷보다 낮은 Latency를 가지게 되는 주요 이유 중 하나입니다. 이렇게 변환되는 과정을 `Encoding` 이라고 부르게 됩니다. 
```proto 
syntax = "proto3";

message TestMessage {
    int32 field_int32 = 1;
    uint32 field_uint32 = 2;
    bool field_bool = 3;
}
```

# Encoding의 종류 
- [[Encoding - Base 128 Varints|Base 128 Varints]] : int32, int64, unsigned int, bool, enum 등을 처리하는 인코딩 방식 
# Reference 
- [Protocol Buffer Documentation](https://protobuf.dev/programming-guides/encoding/#varints) 