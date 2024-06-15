---
title: Spring Configuration
draft: false
tags:
  - Spring-Framework
  - Annotation
aliases:
  - "@Configuration"
---
# Spring Configuration
[[Bean]]의 정보들을 실제 [[Spring Container]]에 등록하는 역할을 하고, `@Configuration` Annotation 을 통해 사용될 수 있습니다.

## Bean을 등록하는 방법
### 수동 등록 
[[Bean]]의 정보를 수동으로 등록하는 과정입니다. 모든 Bean 들을 하나하나 등록해야 한다는 점에서 불편하지만, **명시적으로 볼 수 있다는 점이 특징**입니다.

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

### 자동 등록 ([[Component Scan]])
수 많은 Bean 들을 하나하나 정의하기 보다는, [[Spring Component|@Component]] 을 가지고 있는 객체들만 자동으로 등록하는 방법이 있습니다. 이를 `Component Scan` 이라 부르게 됩니다. 사용하는 클래스들을 **자동으로 등록할 수 있다는 점이 매력적이지만, 명시적이지 않다는 점이 특징**입니다.

[출처: GitLab](https://gitlab.com/kyudo.hwang/spring-core/-/blob/c6187b9b9006b1f32dfe1b46a045d3ae3fd353e3/src/main/kotlin/hello/core/AutoAppConfig.kt)
```kotlin
@Configuration
@ComponentScan
class AutoAppConfig
```

### 수동 등록 vs 자동 등록 
-  출처: [스프링 핵심 원리 - 기본편 | 자동, 수동의 올바른 실무 기준](https://www.inflearn.com/course/lecture?courseSlug=%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8&unitId=55381&tab=curriculum)
기본적으로 수동 등록과 자동 등록된 Bean이 충돌나는 경우, 에러가 발생하게 됩니다. Spring Framework에서는 수동 등록과 자동 등록, 둘 중 하나를 선택하는 것을 유도한다고 해석할 수도 있습니다. 김영한님은 어떠한 Bean을 수동 등록, 자동 등록하는 것에 대해서 어느정도 기준이 있다고 합니다. 

> Bean은 **업무를 지원하기 위한 Bean**과 **기술적인 문제를 해결하기 위한 Bean**으로 나누어 지게 됩니다. 업무를 지원하는 Bean이란, 비즈니스 로직(REST API)와 같은 내용이 될 수 있고, 기술적인 문제를 해결하는 Bean이란 AOP와 같은 내용을 의미하는데요. 
> 
> 업무를 지원하는 Bean의 경우, **단순하고 반복적인 패턴**이 보이는 것이 일반적이기 때문에 **자동 등록**을 사용하는 것이 좋습니다. 반면, 기술적인 문제를 해결하는 Bean이라면, 어떤 Bean이 어떻게 등록되었는 지 **수동 등록 함으로써 향후 유지보수를 용이**하도록 하는 것이 좋습니다.

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

이렇게 Bean들 사이에서 의존성이 주입되는 것들은 `@Configuration`이 명시된 클래스 안에서만 가능하다고 합니다. (즉, [[Spring Component|@Component]]로 등록된 클래스는 자동으로 주입이 되지 않는다고 합니다.)
 
## Singleton Container 비활성화
`@Configuration` Annotation을 통해 등록된 Bean 들을 싱글톤 형태로 동작시킬 수 있다는 점을 설명드렸습니다. 이렇게 마법 같은 일이 벌어지는 것은 바이트코드 조작(`CGLIB`)이 있었기 때문인데요. `CGLIB` 는 많은 편리함을 주지만, 한 가지 제약 사항을 가지게 됩니다.

1. Configuration Class는 Final Class가 될 수 없습니다.

그래서 만약, 이러한 제한을 피하고 싶다면(대체 어느 시나리오 일까요..) 다음과 같은 방법을 고려해볼 수 있을 것 같습니다.
1. Configuration Class 외부에서 [[Bean]] 선언하기 ([[Spring Component|@Component]] 클래스)
2. `@Configuration` 을 등록하지 않고 [[Spring Container]] 생성 하기
3. `@Configuration(proxyBeanMethods = false)` 를 설정


2번과 3번 모두 주의해서 봐야 하는 내용이 있습니다.
1. `@Configuration` **내부에서** 서로 간의 Bean Dependency 가 걸려 있을 때, 싱글톤이 보장되지 않습니다. (위의 예시에서 `MemoryMemberRepository`는 3번까지 호출 됩니다)
2.  **외부에서**는 싱글톤을 보장받을 수 있습니다. (하지만 각 `@Bean`들은 싱글톤을 보장합니다.)

결국 `CGLIB`가 궁극적으로 제공하는 것은 **`@Configuration` 내에서의 싱글톤 보장 여부**인 것 같습니다.

# 출처  
- [Spring.io | Basic Conecpts](https://docs.spring.io/spring-framework/reference/core/beans/java/basic-concepts.html)
- [Spring.io | Using the @Configuration annotation](https://docs.spring.io/spring-framework/reference/core/beans/java/configuration-annotation.html#page-title)

