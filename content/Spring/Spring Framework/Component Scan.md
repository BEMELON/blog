---
title: Component Scan
draft: false
tags:
  - Spring-Framework
  - Annotation
  - Component
aliases:
  - 컴포넌트 스캔
  - "@ComponentScan"
---
# Component Scan 
[[Spring Component|@Component]] Annotation이 달려 있는 클래스들을 [[Bean]]으로 식별하고, 이를 자동으로 [[Spring Container]]에 등록하는 방법입니다. [[Spring Configuration|@Configuration]] 와 함께 `@ComponentScan` 으로 사용할 수 있습니다. 

[출처: GitLab](https://gitlab.com/kyudo.hwang/spring-core/-/blob/c6187b9b9006b1f32dfe1b46a045d3ae3fd353e3/src/main/kotlin/hello/core/AutoAppConfig.kt)
```kotlin
@Configuration
@ComponentScan
class AutoAppConfig
```

## Component 충돌 
[[Bean]]은 클래스의 이름과 타입이 식별자로 활용될 수 있습니다. 다음의 상황처럼 **타입이 같은 Component가 2개 이상인 경우, 에러(=충돌)이 발생**하게 됩니다. 

```kotlin showLineNumbers {2, 5, 11}
@Component
class FixDiscountPolicy: DiscountPolicy 

@Component
class RateDiscountPolicy: DiscountPolicy 

// DiscountPolicy를 의존하는 클래스 
@Component
class OrderServiceImpl (
	private val memberRepository: MemberRepository,
	private val discountPolicy: DiscountPolicy
)
```

1.  `OrderServiceImpl`은 `DiscountPolicy`를 의존하게 됩니다.
2. `DiscouuntPolicy`는 2개의 컴포넌트에 의해 제공됩니다. 
	1. `FixDiscountPolicy`
	2. `RateDiscountPolicy`
3. Spring은 기본적으로 중복된 타입의 Bean을 허용하지 않습니다. 

### 충돌 해결 : 매개변수 이름을 추가 식별자로 사용
Component에 충돌이 발생하는 경우, Spring은  매개변수 이름을 Bean의 이름을 통하여 정확한 컴포넌트를 얻어올 수 있습니다. ([[Bean#5. Bean의 이름과 객체를 이용하여 조회|Bean의 이름과 객체를 이용하여 조회하는 방법]]을 이용하는 것 같습니다)

```kotlin showLineNumbers ins={12} del={11} ++{12} --{11}
@Component
class FixDiscountPolicy: DiscountPolicy 

@Component
class RateDiscountPolicy: DiscountPolicy 

// DiscountPolicy를 의존하는 클래스 
@Component
class OrderServiceImpl (
	private val memberRepository: MemberRepository,
	private val discountPolicy: DiscountPolicy
	private val fixDiscountPolicy: DiscountPolicy
)
```

### 충돌 해결 : @Primary 를 통한 우선순위 제공하기 
Component에 충돌이 발생하는  경우, `@Primary` Annotation이 포함된 Component가 있다면 우선적으로 사용합니다.

```kotlin showLineNumbers ins={2}
@Component
@Primary
class FixDiscountPolicy: DiscountPolicy 

@Component
class RateDiscountPolicy: DiscountPolicy 

// DiscountPolicy를 의존하는 클래스 
@Component
class OrderServiceImpl (
	private val memberRepository: MemberRepository,
	private val discountPolicy: DiscountPolicy // FixDiscountPolicy
)
```

### 충돌 해결 : @Qualifier 를 통한 명시적인 Bean 호출
Component에 충돌이 발생하는  경우를 대비하여, Bean의 이름을 직접 지정하여 호출할 수 있습니다.  

```kotlin showLineNumbers ins={11}
@Component
class FixDiscountPolicy: DiscountPolicy 

@Component
class RateDiscountPolicy: DiscountPolicy 

// DiscountPolicy를 의존하는 클래스 
@Component
class OrderServiceImpl (
	private val memberRepository: MemberRepository,
	@Qualifier("fixDiscountPolicy") private val discountPolicy: DiscountPolicy
)
```

기본적으로 `@Qualifier`는 런타임에 에러를 체크하게 됩니다. 따라서 컴파일 타임에 최대한 오류를 잡기 위해 별도의 Annotation을 만드는 것이 좋은 전략입니다. 

```kotlin showLineNumbers del={12} ins={13}
@Target(AnnotationTarget.FIELD, AnnotationTarget.FUNCTION, AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.CLASS, AnnotationTarget.TYPE, AnnotationTarget.TYPE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Inherited
@Qualifier("fixDiscountPolicy")
annotation class FixDiscountPolicy() // Annotation 생성

//  ----------------------------------------------------------
@Component
class OrderServiceImpl (
	private val memberRepository: MemberRepository,
	@Qualifier("fixDiscountPolicy") private val discountPolicy: DiscountPolicy
	@FixDiscountPolicy private val discountPolicy: DiscountPolicy
)
```


### 충돌 해결 : 결론  
`@Qualifier`를 통해서 컴포넌트를 명시적으로 가져오는 것이 안전하지만, 모든 코드에 이를 적용하는 것은 확실히 무리입니다. 따라서, `@Primary`를 통하여 1순위를 명시하고, 2순위가 필요한 경우에 있어서 `@Qualifier`를 호출하는 것이 안전하고, 효율적인 선택입니다.

## 실제로 여러 개의 Bean이 모두 필요한 경우
의도적으로 여러 개의 Bean이 필요한 경우가 있습니다. 예를 들어 회원에 따라 할인 정책을 다르게 하고 싶다면, 여러 개의 Bean을 실제로 들고 있어야 할 수도 있습니다. 

이러한 경우에는 `Map`과 `List`를 매개변수로 사용하여 필요한 모든 Bean 들을 주입받을 수 있습니다.

- [출처: GitLab](https://gitlab.com/kyudo.hwang/spring-core/-/blob/790ed7a6c34c049daef72df08aa38e03555b322a/src/test/kotlin/hello/core/autowired/AllBeanTest.kt)
```kotlin showLineNumbers
class DiscountService (
        private val policyMap: Map<String, DiscountPolicy>,
        private val policyList: List<DiscountPolicy>
    ) {
        fun getPolicyMap(): Map<String, DiscountPolicy> {
            return policyMap
        }
        fun getPolicyList(): List<DiscountPolicy> {
            return policyList
        }
        fun discount(member: Member, price: Int, discountCode: String): Int {
            val discountPolicy = policyMap[discountCode] ?: throw IllegalArgumentException("no discount policy for $discountCode")
            return discountPolicy.discount(member, price)
        }
    }
```
## Options
### basePackages 
컴포넌트 스캔을 어떠한 패키지로부터 시작할 수 있는 지를 명시합니다. 아래의 예시처럼 작성한다면 `org.example` 패키지 하위에 있는 패키지들만 스캔하게 됩니다. 서버가 설정(환경 변수 등)에 따라 여러가지 역할을 하는 경우 유용할 수 있다고 생각합니다.

``` kotlin
@Configuration
@ComponentScan(basePackages = ["org.example"])
class AppConfig  {
	// ...
}
```

### excludeFilters 
컴포넌트 스캔에서 제외할 대상을 고르는 방법입니다.   

[출처 : GitLab](https://gitlab.com/kyudo.hwang/spring-core/-/blob/c6187b9b9006b1f32dfe1b46a045d3ae3fd353e3/src/main/kotlin/hello/core/AutoAppConfig.kt)
```kotlin
@Configuration
@ComponentScan(
    excludeFilters = [ComponentScan.Filter(type = FilterType.ANNOTATION, classes = [Configuration::class])]
)
class AutoAppConfig
```

### includeFilters
컴포넌트 스캔에서 포함할 대상을 고르는 방법입니다. 아래의 예시는 `includeFilters`와 `excludeFilters` 를 모두 사용하고 있습니다.

```kotlin
@Configuration
@ComponentScan(basePackages = ["org.example"],
		includeFilters = [Filter(type = FilterType.REGEX, pattern = [".*Stub.*Repository"])],
		excludeFilters = [Filter(Repository::class)])
class AppConfig {
	// ...
}
```