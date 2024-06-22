---
title: JSON과 Protobuf 크기 비교
draft: false
tags:
  - protobuf
aliases:
---
### Serialization 
> 네트워크 상에 데이터를 송/수신 하기 위해 변환된 데이터의 크기와 속도를 비교합니다 

## JSON vs Protobuf 
JSON이 YAML 보다 Compact 하지 않긴 합니다만, 가장 대중적으로 사용하기 때문에 비교 대상으로 선정했습니다. 너무 RAW 한 JSON의 경우는 불공평할 수 있기 때문에, **gzip 압축을 함께 진행**하였습니다.

## 1. Simple 
- 출처 : [Gitlab | json-protobuf-size](https://gitlab.com/kyudo.hwang/grpc-lab/-/tree/main/serialization/json-protobuf-size?ref_type=heads)
다음과 같은 `JSON` 이 있다고 했을 때의 크기 비교를 해보았습니다.
```json 
{
	"id": 1234,
	"name": "John Doe", 
	"email": "jdoe@example.com"
}
```

결과는 다음과 같습니다. 33% 정도의 사이즈가 줄어들게 되었습니다.
```shell
JSON: b'{"id": 1234, "name": "John Doe", "email": "jdoe@example.com"}'
JSON size: 76 bytes
Protobuf size: 51 bytes
```

## 2. Nullable Simple object 
- 출처 : [Gitlab | nullable-json-object](https://gitlab.com/kyudo.hwang/grpc-lab/-/tree/main/serialization/nullable-json-object?ref_type=heads)
JSON에서 특정 필드가 Nullable 하다면 어떻게 변화가 될까요? 아래의 객체를 테스트합니다.
```json
{
  "id": 1234,
  "name": "John Doe",
  "email": null
}
```

결과는 다음과 같습니다. 49% 정도의 사이즈가 줄어들게 되었습니다.
```shell
JSON without email: {'id': 123, 'name': 'John Doe', 'email': None}
JSON without email: 62 bytes
Proto without email: 32 bytes
```

`nullable`한 경우, Protobuf는 이를 제외하기 때문에 더 Compact 함을 보여주게 됩니다. 

## 3. Pagination Object 
- 출처 : [Gitlab | repeated-json-object](https://gitlab.com/kyudo.hwang/grpc-lab/-/tree/main/serialization/repeated-json-object?ref_type=heads)
실제로는 Pagination 과 같은 중복된 객체의 형태가 여러번 반복되고는 합니다. 해당 상황에서 결과를 비교해보도록 하겠습니다. JSON은 다음과 형태를 가지게 됩니다. 
```json 
{
	"persons": [
		{
			"id": 1234, // Required
			"name": "John Doe", // Required
			"email": "jd@example.com" // Required
		}
		// 10번 반복 
	]
}
```

결과는 다음과 같습니다. 20% 정도의 사이즈가 줄어들게 되었습니다. 
```shell
JSON: 171 bytes
Proto: 137 bytes
```

## 4. Pagination Nullable Object 
- 출처 : [Gitlab | repated-nullable-json-object](https://gitlab.com/kyudo.hwang/grpc-lab/-/tree/main/serialization/nullable-repeated-json-object?ref_type=heads)
이번에도 비슷하게, Email이 Optional인 상황에 대해서 Pagination을 실행해보겠습니다. 이 때 모든 Email은 null로 표현합니다.
```json
{
	"persons": [
		{
			"id": 1234, // Required
			"name": "John Doe", // Required
			"email": null // optional
		}
		// 10번 반복 
	]
}
```

결과는 다음과 같습니다. 45% 정도의 사이즈가 줄어들게 되었습니다. 
```shell
JSON: 132 bytes
Proto: 86 bytes
```

## Learned 
- 네트워크 비용은 트래픽이 많아질수록 집중해서 살펴봐야 하는 비용입니다.
	- JSON을 Compact하게 사용하더라도 33% 정도 사이즈가 줄게 됩니다.
	- 대부분이 그렇지만 Compact 하지 않은 JSON이라면 50%까지 사이즈가 줄게 됩니다. 
		- (30%가 미사용중이라고 가정)

- 따라서, 실제 외부 네트워크를 사용하는 클라이언트간 gRPC를 적용한다면 비용의 절감 효과를 누릴 수 있을 것입니다. 
- 하지만, 내부 서비스간 통신을 하는 상황에서 서버간 gRPC를 사용한다면 비용의 절감 효과는 미비할 것입니다. 내부 서비스간 통신은 속도의 관점에서 살펴볼 수 있습니다. ([[../JSON과  gRPC 속도 비교]])
