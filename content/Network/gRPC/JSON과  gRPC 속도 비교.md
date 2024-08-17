---
title: JSON과 Protobuf 속도 비교
draft: false
tags:
  - protobuf
aliases:
---
# JSON과 gRPC 속도 차이 
> [Benchmark](https://github.com/david-cao/gRPCBenchmarks) 에서의 결과를 번역 수준으로 살펴본 글입니다. 

## 결과
벤치마크에서는 `RAW JSON`, `ZIPPED JSON` 그리고 `gRPC` 에서의 속도 차이를 비교합니다. 

> regardless of the serialization/deserialization method used for protobuf, it was consistently about 3x faster for serializing than JSON

JSON의 Serialization과 Deserialization 방법과 별개로, **Protobuf가 3배 정도 빠름**을 보여주었다고 합니다. 

> JSON is actually a bit faster for small messages (<1kb), around 1.5x, but for larger messages (>15kb) protobuf is 2x faster.

작은 메시지의 경우 (1KB)는 JSON이 1.5배 정도 빠르지만 😮, 메시지가 커질수록 Protobuf가 2배가량 빠르다고 합니다. 

> gzipped JSON, protobuf is well over 5x faster in serialization, regardless of size.

압축된 JSON의 경우, **크기와 무관하게 Protobuf가 5배 정도 빠른 성능**을 보여주었다고 합니다.


여기서 사용된 gRPC의 방식은 단순한 요청에 사용되는 [[gRPC#Unary RPC|Unary RPC]] 라고 합니다. [[gRPC#Bidirectional streaming RPC|Streaming RPC]]가 일반적으로 Unary RPC 보다 2배 가량의 빠른 속도를 제공한다는 점을 생각한다면, 실제 환경에서는 성능 차이가 더욱 벌어질 것이라 언급했습니다. (HTTP 2.0이 아니라는 가정하에 👍)
# Reference 
- [gRPC | Mobile Benchmarks](https://github.com/david-cao/gRPCBenchmarks)
- [Github | gRPC Benchmark](https://github.com/david-cao/gRPCBenchmarks)