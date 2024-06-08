---
title: Spring Configuration
draft: false
tags:
  - Spring-Framework
aliases:
  - "@Configuration"
---
# Spring Configuration
Spring에서 대부분의 [[Bean]]의 정보를 정의(`Bean Definition`)하는 용도로 사용됩니다. 정의된 정보는 [[Spring Container]]를 생성할 때 활용됩니다. ([[../../inbox/Spring Component|@Component]]를 통해서 Configuration 밖에서도 Bean을 등록할 수 있습니다.)

[출처 : GitLab](https://gitlab.com/kyudo.hwang/spring-core/-/blob/main/src/main/kotlin/hello/core/AppConfig.kt?ref_type=heads)
``` kotlin
@Configuration
class AppConfig {
    @Bean
    fun memberService(): MemberService {
        return MemberServiceImpl(memberRepository())
    }
    @Bean
    fun memberRepository(): MemberRepository {
        return MemoryMemberRepository()
    }
    @Bean
    fun discountPolicy(): RateDiscountPolicy {
        return RateDiscountPolicy()
    }
    @Bean
    fun orderService(): OrderService {
        return OrderServiceImpl(memberRepository(), discountPolicy())
    }
}
```

## Singleton Container
`@Configuration` [[../../Java/Annotation|Annotation]]이 명시되어 있다면, [[Bean]]으로 등록되는 모든 객체들은 [[../../inbox/Singleton|싱글톤]]으로 동작하게 됩니다. 클래스 레벨에서 **싱글톤을 구현하지 않더라도 Spring 레벨에서 싱글톤을 보장**하게 됩니다. (즉, 싱글톤의 단점으로 불리던 상속, 테스트 과정에서의 유연성 문제를 해결하게 됩니다) 이렇게 Spring 레벨에서 싱글톤을 보장하는 것을 **Singleton Container** 이라고 부르게 됩니다. 

## Injecting Inter-bean Dependency 
아래의 코드에서 `MemberRepository()`는 총 몇 번 호출되었을까요? 

[출처 : GitLab](https://gitlab.com/kyudo.hwang/spring-core/-/blob/4d1b8f81a99f9d4c44b07c178e617fed8ef0b6c4/src/main/kotlin/hello/core/AppConfig.kt#L14)
```kotlin showLineNumbers {5, 9, 17}
@Configuration
class AppConfig {
    @Bean
    fun memberService(): MemberService {
        return MemberServiceImpl(memberRepository())
    }
    @Bean
    fun memberRepository(): MemberRepository {
        return MemoryMemberRepository()
    }
    @Bean
    fun discountPolicy(): RateDiscountPolicy {
        return RateDiscountPolicy()
    }
    @Bean
    fun orderService(): OrderService {
        return OrderServiceImpl(memberRepository(), discountPolicy())
    }
}
```

Java 코드가 너무 명시적으로 적혀있었기 때문이었에 저는 5행, 9행, 17행 총 3번 호출되는 것을 예상했습니다. 하지만 실제로는 **단 1번 호출**됩니다. 이렇게 [[Bean]]으로 등록된 객체들 사이에서는 `CGLIB` 라이브러리를 통한 바이트 코드를 조작하여 [[../../inbox/Singleton|싱글톤]]을 보장받게 됩니다.

이렇게 Bean들 사이에서 의존성이 주입되는 것들은 `@Configuration`이 명시된 클래스 안에서만 가능하다고 합니다. (즉, [[../../inbox/Spring Component|@Component]]로 등록된 클래스는 자동으로 주입이 되지 않는다고 합니다.)
 
## Singleton Container 비활성화
`@Configuration` Annotation을 통해 등록된 Bean 들을 싱글톤 형태로 동작시킬 수 있다는 점을 설명드렸습니다. 이렇게 마법 같은 일이 벌어지는 것은 바이트코드 조작(`CGLIB`)이 있었기 때문인데요. `CGLIB` 는 많은 편리함을 주지만, 한 가지 제약 사항을 가지게 됩니다.

1. Configuration Class는 Final Class가 될 수 없습니다.

그래서 만약, 이러한 제한을 피하고 싶다면(대체 어느 시나리오 일까요..) 다음과 같은 방법을 고려해볼 수 있을 것 같습니다.
1. Configuration Class 외부에서 [[Bean]] 선언하기 ([[../../inbox/Spring Component|@Component]] 클래스)
2. `@Configuration` 을 등록하지 않고 [[Spring Container]] 생성 하기
3. `@Configuration(proxyBeanMethods = false)` 를 설정


2번과 3번 모두 주의해서 봐야 하는 내용이 있습니다.
1. `@Configuration` **내부에서** 서로 간의 Bean Dependency 가 걸려 있을 때, 싱글톤이 보장되지 않습니다. (위의 예시에서 `MemoryMemberRepository`는 3번까지 호출 됩니다)
2.  **외부에서**는 싱글톤을 보장받을 수 있습니다. (하지만 각 `@Bean`들은 싱글톤을 보장합니다.)

결국 `CGLIB`가 궁극적으로 제공하는 것은 **`@Configuration` 내에서의 싱글톤 보장 여부**인 것 같습니다.

# 출처  
- [Spring.io | Basic Conecpts](https://docs.spring.io/spring-framework/reference/core/beans/java/basic-concepts.html)
- [Spring.io | Using the @Configuration annotation](https://docs.spring.io/spring-framework/reference/core/beans/java/configuration-annotation.html#page-title)

