---
title: Default Method
draft: false
tags:
  - Java
  - Default-Method
  - Backward-Campatibility
---
# 배경
해당 글에서는, Java의 Collection API가 시간을 거치면서 어떻게 발전해 왔는지 객체지향의 관점에서 살펴보고자 합니다. Collection API는 1998년에 만들어졌으며, List, Map 등 다양한 자료구조를 지원하기 위해 개발되었습니다. 시간이 흐르면서 프로그래밍 패러다임이 변화하게 되었고, 다양한 요구사항들을 Collection API에서 구현했어야 했습니다. 이 글에서는 1998년부터 2023년까지 Collection API 가 어떤식으로 새 버전을 잘 배포했는 지 설명하고자 합니다.

# 문제
위에서 말씀드렸던 내용처럼 Collection API는 시간이 지남에 따라 점점 많은 기능이 요구되고 있었고, 버전 업데이트가 불가피한 상황이 되었습니다.

하지만, 버전 업데이트에는 다음과 같은 문제가 발생할 수 있습니다.
- **인터페이스가 업데이트 되는 경우, 해당 API를 사용하는 클라이언트 코드가 모두 깨지게 됩니다.**

이러한 현상을 Backward Compatibility를 지키지 못했다고 합니다. 클라이언트 입장에서는 매 업데이트마다 Collection API 를 사용하는 모든 코드를 검토하고 수정해야만 했습니다. 이러한 불편함은 클라이언트에게 Java 사용의 불편함을 강조시키게 되며, 다른 언어로 이동하게 되는 주요 명분이 될 수도 있었습니다.

예시를 들어, 인터페이스에 새로운 메소드를 추가한다면, 해당 Interface 를 구현한 클라이언트는 추가로 메소드를 구현해야 되고, 결국 Source Compatibility 가 깨짐으로써 Backward Compatibility 를 준수할 수 없게 됩니다. 따라서, Collection API는 새로운 요구사항을 구현하면서도 API의 Backward Compatibility 을 지켰어야 했습니다.

# 해결

## 정적 메소드를 이용해서 Backward Compatibility 를 유지하기
대표적인 예시가 Collections 클래스입니다. Collections 클래스의 메소드들은 모두 정적 메소드였기 때문에 Backward Compatibility 를 준수하면서 기능의 요구사항을 만족시킬 수 있었습니다.
![|620](https://i.imgur.com/PA0w0d1.png)


다만, 이러한 방법은 유지보수 측면에서 오히려 위험한 상황을 만들었습니다. 인터페이스가 없었기 때문에 다양한 구현체들이 각자만의 JDK Collection을 구현하게 되었고, 클라이언트는 구현체에 의존할 수 밖에 없었기 때문입니다.

Collection API 관점에서는 크게 2가지의 걱정이 있었을 거라 생각됩니다.

- 어떻게 하면 범용성 있는 인터페이스를 구축할 수 있을까?
- 어떻게 하면 인터페이스의 행위를 잘 설명해서 구현체가 이 행위를 잘 구현할 수 있도록 할 수 있을까?

## Default Method
Default 키워드는 Java 8 에서 소개된 문법이며, 인터페이스에 함수를 추가함과 동시에 코드를 정의할 수 있는 강력한 문법입니다.

``` java
interface NEW_INTERFACE {
	default Predicate<T> and(Predicate<? super T> other) {
		Objects.requireNonNull(other);
		return (t) -> test(t) && other.test(t);
	}
}
```

Collection API는 이렇게 Default 문법을 사용함으로써 Backward Compatibility 를 지키며 새로운 버전을 배포할 수 있었습니다.

## Default VS Abstract Class
사실 해당 방법만을 봤을 때, Default Method와 Abstract Class 는 다른 점이 없어보입니다.

두 방법의 가장 큰 차이는, Default 에서는 내부 변수와 같은 상태를 가지는 변수는 사용이 불가능 하지만, Abstract Class 에서는 내부 변수 등 상태 변수의 사용이 가능하다는 점입니다.
또한, 다중 상속 여부, 생성자 지원 여부와 같이 다양한 차이가 있습니다.
