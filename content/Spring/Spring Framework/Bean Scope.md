---
title: Bean Scope
draft: false
tags:
  - Bean
  - Spring-Framework
aliases:
---

# Bean Scope 
[[Bean]]의 유효범위(Scope)에 따라 [[Bean Lifecycle|Bean 생명주기]]가 결정되곤 합니다. Bean의 Scope는 다음과 같은 내용들이 있습니다. 

## Singleton Scope
기본으로 사용되는 Bean의 유효범위 입니다. 하나의 Bean을 만들어 각 요청마다 같은 Bean을 되돌려줍니다.
![[assets/singleton.excalidraw.light.png]]

## Prototype Scope
요청마다 새로운 객체를 만들어 클라이언트에게 제공하는 방식입니다. 
![[assets/prototype.excalidraw.light.png]]
### Singleton와 Prototype을 같이 쓰면 발생하는 문제 
싱글톤과 Prototype을 같이 쓰게 되면 예상치 못한 결과가 발생하게 됩니다. **Singleton 인스턴스가 처음 의존성 주입 된 객체를 지속적으로 저장하고 재사용하기 때문에 Proto 객체가 새로 생성되지 않고 재사용**됩니다.
![[assets/singleton-with-proto.excalidraw.light.png]]
- 출처: [Gitlab | SingletonWithPrototypeTest.kt](https://gitlab.com/kyudo.hwang/spring-core/-/blob/91973819fa342e7adf70281e6330ccb7d4ea190c/src/test/kotlin/hello/core/scope/SingletonWithPrototypeTest1.kt)
```kotlin
@Scope("prototype")
class PrototypeBean {
	var count = 0
	fun addCount() {
		count++
		println("count = $count")
	}
}

// 싱글톤 Bean 안에 Proto Bean을 사용 중
@Scope("singleton")
class ClientBean(
	private val prototypeBean: PrototypeBean
) {
	fun logic() {
		prototypeBean.addCount()
	}
}

@Test
fun singletonClientUsePrototype() {
	val ac = AnnotationConfigApplicationContext(ClientBean::class.java, PrototypeBean::class.java)
	val clientBean1 = ac.getBean(ClientBean::class.java)
	val clientBean2 = ac.getBean(ClientBean::class.java)
	clientBean1.logic() // 1
	clientBean2.logic() // 2 (재사용되기 때문에 값이 증가됨)
	ac.close()

}
```

이를 해결하기 위해 `ObjectProvider`를 이용할 수 있습니다. `ObjectProvider`는 **Spring 에서 제공하는 특별한 객체**로, 지연 로딩, 필요한 객체를 조회하고 생성하는 역할을 하곤 합니다. `ObjectProvider`를 통해서 필요한 객체를 직접 호출해오는 방식입니다.
- 출처: [Gitlab | SingletonWithPrototypeTest1.kt](https://gitlab.com/kyudo.hwang/spring-core/-/blob/020dd9cbf2eca871597a52fd736f02ea1d078caf/src/test/kotlin/hello/core/scope/SingletonWithPrototypeTest1.kt)
```kotlin showLineNumbers {3}
@Scope("singleton")
class ClientBean(
   private val prototypeBeanProvider: ObjectProvider<PrototypeBean>
) {
	fun logic(): Int {
		val prototypeBean = prototypeBeanProvider.getObject()
		prototypeBean.addCount()
		return prototypeBean.count
	}
}
```


## Request Scope 
요청마다 각각의 새로운 Instance를 가지는 방식입니다. 해당 방식을 사용함으로써 서로 간의 데이터가 섞이는 문제와 같은 현상을 최소화 할 수 있습니다.
![[assets/request.excalidraw.light.png]]

### Request Scope Bean과 Proxy 
이처럼 **요청이 들어오면 생성되는 Bean**이기 때문에 실제 Spring 초기화 과정에서 Bean을 생성하지 못하는 에러가 발생하게 됩니다. 
- `ObjectProvider`를 통해서 문제를 해결할 수 있습니다. (위와 동일)
- `Proxy`를 활용하여 문제를 해결할 수 있습니다. 
ObjectProvider와 Proxy 모두 객체의 생성을 늦추어 필요한 시점에 생성을 하는 것에 목적을 둔다는 점에서 매우 유사합니다. Proxy는 사용에 간편함을 제공하는 만큼 단순한 로직(AOP 등)에 적합하며, ObjectProvider는 불편한 만큼 다양한 조건에 적용할 수 있고, 보다 복잡한 로직에 적용할 수 있다는 점이 다르다고 생각합니다.

# Reference 
- [인프런 - 스프링 핵심 원리 기본편 | 섹션 9](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
- [Spring.io | Bean Scops](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-custom)