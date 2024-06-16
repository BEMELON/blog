---
title: Spring Component
draft: false
tags:
  - Spring-Framework
  - Stereotype
  - Annotation
aliases:
  - "@Component"
---
# Spring Component 
Spring이 [[Bean]]의 속성을 결정하고 적절히 사용하기 위해서 스트레오(`Strereotype`) Annotation 을 사용하게 됩니다. 가장 대표적인 스트레오 타입으로는 `@Component`, `@Service`, `@Controller`, `@Repository`가 있을 수 있습니다. 그 중 `@Component`는 스트레오 타입의 가장 기본적인 타입이고, 나머지 스트레오 타입들은 `@Component`를 상속 받아 사용하게 됩니다. 

# StereoTypes 
## @Controller 
**HTTP 요청을 처리하는 컨트롤러**로 인식하게 됩니다. 
```kotlin
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@MustBeDocumented
@Component
annotation class Controller {
	// ...
}
```

## @Service
특별하게 동작하는 행위가 없습니다. 개발자에게 비즈니스 로직이 이러한 계층에 있음을 명시하는 용도로 사용됩니다.

[출처 : Spring.io](https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html#beans-factorybeans-annotations)
```kotlin
@Target(AnnotationTarget.TYPE)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Component
annotation class Service {

	// ...
}
```

## @Repository
실제 Database에 접근하는 계층을 명시하는 Annotation 입니다. Database의 종류마다 **서로 다른 에러들을 하나의 추상적인 계층으로 묶어주는 역할**을 수행합니다. ([Exception Translation](https://docs.spring.io/spring-framework/reference/data-access/orm/general.html#orm-exception-translation))

[출처 : Github - spring-projects](https://github.com/spring-projects/spring-framework/blob/main/spring-context/src/main/java/org/springframework/stereotype/Repository.java)
```kotlin
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@MustBeDocumented
@Component
annotation class Repository {
	// ...
}
```

# Component 조회하는 방법 

## Autowired 
위에서의  6가지 방법들을 자동화한 방식이고, [[Dependency Injection|의존성 주입]]에 사용되는 방식입니다. 

### A. 생성자 주입 
가장 **추천되는** 주입 방식입니다. 
- 생성 과정에 딱 1번 호출되는 것이 보장됩니다.
- **불편, 필수**의 관계에 적합합니다.
- **순환 참조** 문제를 해결할 수 있습니다.

```kotlin showLineNumbers
@Component
class OrderServiceImpl @Autowired constructor(
    private val memberRepository: MemberRepository,
    private val discountPolicy: DiscountPolicy
) : OrderService
```

###  B. 변경자(Setter) 주입 
**상황에 따라** 추천되는 주입 방식입니다.
- **선택, 변경**의 관계에 적합합니다.
- 생성자 주입과 겹친다면, 생성자 주입이 우선됩니다. 

```kotlin showLineNumbers 
@Component
class OrderServiceImpl : OrderService {

    @set:Autowired
    private lateinit var memberRepository: MemberRepository

    @set:Autowired
    private lateinit var discountPolicy: DiscountPolicy

}
```

### C. 필드 주입 
**상황에 따라** 추천되는 주입 방식입니다.
- **불변, 필수**의 관계에 적합합니다.
- 하지만, **외부 주입이 불가능하기 때문에 테스트에 어려움이 발생**합니다
- **테스트 코드**와 같이 프로덕션과 무관한 곳에 적합합니다.
- [[Spring Configuration|@Configuration]]에 적합할 수도 있습니다.

```kotlin showLineNumbers 
@Component
class OrderServiceImpl : OrderService {

    @Autowired
    private lateinit var memberRepository: MemberRepository

    @Autowired
    private lateinit var discountPolicy: DiscountPolicy

}
```

### D. 메소드 주입
**쓸 이유가 없다고 합니다.** 
일반 메소드에 `@Autowired` 를 통해 주입 받는 방식입니다.

# 출처
- [Spring.io | Classpath Scanning and Managed Components](https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html#beans-factorybeans-annotations)