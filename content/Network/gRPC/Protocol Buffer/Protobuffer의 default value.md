---
title: Protobuffer의 default value
draft: false
tags:
  - protobuf
aliases:
---
# Protobuffer의 Field 
Protobuffer에서의 Field 모두 Scalar 라고 합니다. **Scalar라 하면 사실상 원시값을 의미하게 되고, 이 뜻은 Null 이 없고 별도의 Default value 가 있음을 의미**합니다. 실제로 Defalut value가 존재합니다. ([gRPC Docs | Scalar Value Types](https://protobuf.dev/programming-guides/proto3/))

이러한 기본 값이 있다는 것은 해당 값이 실제로 있는 지, 아니면 기본 값인지를 판별하는 **감시값이 매우 애매**해진다는 것과 동일합니다. 그렇기 때문에 Protobuf에서는 공식적으로 Wrapper 클래스를 제공합니다. 

- 출처 : [Github | protobuf](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)
아래의 코드처럼, `value`를 `message`로 감싸게 되고, 코드에서는 `HasField` 를 통해서 존재하는 지 확인할 수 있습니다. 
```proto
message DoubleValue {
  // The double value.
  double value = 1;
}
```

- 출처 : [Gitlab | default-value](https://gitlab.com/kyudo.hwang/grpc-lab/-/blob/main/default-value/example/main.py?ref_type=heads)
```python
wrapped_message = example_pb2.TestMessageWrapper()
print(f"id: {wrapped_message.id if wrapped_message.HasField("id") else "None"}")
print(f"name: '{wrapped_message.name.value if wrapped_message.HasField("name") else "None"}'")
print(f"is_active: {wrapped_message.is_active.value if wrapped_message.HasField("is_active") else "None"}")
print(f"score: {wrapped_message.score.value if wrapped_message.HasField("score") else "None"}")
```

- 3.15 버전에서 `optional` 필드가 부활했습니다.
# Reference
 - [gRPC Docs | Proto3](https://protobuf.dev/programming-guides/proto3/)