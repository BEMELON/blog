---
title: Bean
draft: false
tags:
  - Spring-Framework
aliases:
  - Spring Bean
---
# Bean 
[[Spring Container]]는 하나 이상의 Bean 들을 관리함으로써 [[Dependency Injection|의존성 주입]]을 가능하게 합니다. 여기서 Bean은 **메타 데이터에 의해 정의되고 관리되는 객체들을 의미**합니다. 

서로 다른 Bean을 식별하기 위해 **이름과 객체**를 사용하게 됩니다. 
1. **이름**은 사실상 유일해야 합니다. 동일한 이름을 가지는 Bean들이 있게 된다면 예상하지 못한 충돌이 발생할 수 있습니다.  
2. **객체**는 유일하지 않아도 괜찮습니다. 하지만 여러 개의 객체를 가지는 경우, 실제로 필요한 Bean이 무엇인지 알기 힘듦으로 **이름과 함께 조회**가 되어야 합니다. 

# Bean을 등록하는 방법 

## @Bean 
주로 **외부 라이브러리 클래스의 인스턴스를 등록하기 위해 사용**됩니다. 이렇게 직접 등록하는 Bean들은 [[Spring Configuration]] 에 의해 정의되어야 하며 [[Spring Container]]에 반드시 등록되어야 합니다. 

`@Bean` [[../../Java/Annotation|Annotation]]을 통해 등록할 수 있습니다. 이 때, 이름은 기본적으로 메소드/클래스 이름을 따라가게 되며  매개변수를 통해 이를 커스텀할 수 있습니다. 커스텀된 정보들을 **BeanDefinition** 이라 하게 됩니다.
``` kotlin
@Bean  
fun memberRepository(): MemberRepository {  
    return MemoryMemberRepository()  
}
```

## XML 
기존 레거시 시스템에서 자주 사용되는 방법으로 이해하고 있습니다. XML에서 Bean의 이름과 객체를 직접 지정하고 반드시 [[Spring Container]]에 등록되어야 합니다. 

``` xml
<bean id="memberRepository" class="hello.core.member.MemoryMemberRepository" />
```

## Bean을 조회 하는 방법 

### 1. 모든 Bean 조회하기 
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/a333801fa8b9ec7532ac242d605834c882da9df6/src/test/kotlin/hello/core/beanfind/ApplicationContextInfoTest.kt#L14)

Bean은 개발자가 직접 작성하는 것 외에도 Spring 자체에서 관리하는 Bean들이 있습니다. 먼저 [[Spring Container]]에 등록된 모든 Bean 들의 **이름**을 조회하는 코드입니다. 

``` kotlin
@Test
@DisplayName("모든 빈 출력하기")
fun findAllBean() {
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
	val beanDefinitionNames = ac.beanDefinitionNames
	for (beanDefinitionName in beanDefinitionNames) {
		println("name : ${beanDefinitionName}")
	}
}
```

### 2. Bean의 역할을 기반으로 조회 
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/a333801fa8b9ec7532ac242d605834c882da9df6/src/test/kotlin/hello/core/beanfind/ApplicationContextInfoTest.kt#L23)

Bean은 어떤 주체에 의해 생성되었냐에 따라 역할을 가지게 됩니다. 이번에는 개발자로부터 직접 정의된 Bean 들만 출력하는 코드입니다. 

``` kotlin
@Test
@DisplayName("ROLE_APPLICATION 빈만 출력하기")
fun findApplicationBean() {
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
	val beanDefinitionNames = ac.beanDefinitionNames
	for (beanDefinitionName in beanDefinitionNames) {
		val beanDefinition = ac.getBeanDefinition(beanDefinitionName)
		if (beanDefinition.role == BeanDefinition.ROLE_APPLICATION) {
			val bean = ac.getBean(beanDefinitionName)
			println("name = $beanDefinitionName object = $bean")
		}
	}
}
```

### 3. Bean의 이름으로 조회 
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/c7eb808d23ddb6a5c90a58e459e87c3c930d4b89/src/test/kotlin/hello/core/beanfind/ApplicationContextBasicFindTest.kt#L16)

Bean은 **이름과 객체**를 식별자로 사용하기 때문에 이름을 기반으로 객체 조회를 할 수 있습니다.
``` kotlin
@Test
@DisplayName("빈 이름으로 조회")
fun findBeanByName() {
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
	val memberService = ac.getBean("memberService")	   
	
	Assertions
	.assertThat(memberService)
	.isInstanceOf(MemberServiceImpl::class.java)
}
```

만약 이름이 존재하지 않다면 에러를 발생시키게 됩니다.
### 4. Bean의 객체로 조회 
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/46301d1f3af73bd8baf116c0c1787cc221bb5ddc/src/test/kotlin/hello/core/beanfind/ApplicationContextBasicFindTest.kt#L24)

Bean은 **이름과 객체**를 식별자로 사용하기 때문에 객체을 기반으로 객체 조회를 할 수 있습니다. 
``` kotlin
@Test
@DisplayName("이름 없이 타입으로 조회")
fun findBeanByType() {
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
	val memberService = ac.getBean(MemberService::class.java)

	Assertions
	.assertThat(memberService)
	.isInstanceOf(MemberService::class.java)
}
```

### 4-1. Bean의 객체가 2개 이상인 경우 
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/98b6a5711239d5c1a784dcc67a516975d04d875f/src/test/kotlin/hello/core/beanfind/ApplicationContextSameBeanFindTest.kt#L32)
Bean의 객체는 이름과 다르게 2개 이상 존재할 수도 있습니다.

아래의 설정은 서로 다른 이름을 가진 Bean이 같은 객체를 가리키는 경우입니다.
``` kotlin
@Configuration  
class SameBeanConfig {  
    @Bean  
    fun memberRepository1(): MemberRepository {  
        return MemoryMemberRepository()  
    }  
  
  
    @Bean  
    fun memberRepository2(): MemberRepository {  
        return MemoryMemberRepository()  
    }  
}
```

해당 상황에서 객체를 기반으로 Bean을 조회하는 경우 에러가 발생합니다.
``` kotlin
@Test  
@DisplayName("타입으로 조회시 같은 타입이 둘 이상 있으면, 중복 오류가 발생한다")  
fun findBeanByTypeDuplicate() {  
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
    Assertions
    .assertThatThrownBy {  
        ac.getBean(MemberRepository::class.java)  
    }
    .isInstanceOf(NoUniqueBeanDefinitionException::class.java)  
}
```

## 5. Bean의 이름과 객체를 이용하여 조회 
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/98b6a5711239d5c1a784dcc67a516975d04d875f/src/test/kotlin/hello/core/beanfind/ApplicationContextSameBeanFindTest.kt#L40)

위에서의 상황을 방지하려면 결국 **이름**을 이용하여 조회해야 합니다.
``` kotlin
@Test  
@DisplayName("타입으로 조회시 같은 타입이 둘 이상 있으면, 빈 이름을 지정하면 된다")  
fun findBeanByName() {  
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
    val memberRepository = ac.getBean("memberRepository1", MemberRepository::class.java)  
    Assertions
    .assertThat(memberRepository)
    .isInstanceOf(MemberRepository::class.java)  
}
```

## 6. Bean은 하위 타입까지 모두 조회한다.
- [GitLab 소스코드](https://gitlab.com/kyudo.hwang/spring-core/-/blob/b4d530acaaeb3b3d9db66e5a2bd5e0d3157ac0e2/src/test/kotlin/hello/core/beanfind/ApplicationContextExtendsFindTest.kt#L29)
Bean을 조회할 때, 타입을 사용하게 된다면 그 자식 객체까지 모두 조회하게 됩니다. `instanceof`와 같은 연산자를 사용하기 때문이지 않을까 싶습니다. 

다음과 같은 설정이 있습니다. 
RateDiscountPolicy, FixDiscountPolicy는 모두 DiscountPolicy의 구현체입니다.
``` kotlin
// RateDiscountPolicy, FixDiscountPolicy는 모두 DiscountPolicy의 구현체
@Configuration
class TestConfig {
	@Bean
	fun rateDiscountPolicy() = RateDiscountPolicy()
	@Bean
	fun fixDiscountPolicy() = FixDiscountPolicy()
}
```

그렇기 때문에 `DiscountPolicy`를 조회한다고 하면 2개의 구현체를 반환하게 되어 에러가 발생되게 됩니다. 이를 해결하기 위해서는 타입을 구체적으로 명시해야 합니다.
``` kotlin
@Test
@DisplayName("부모 타입으로 조회시, 자식이 둘 이상 있으면 중복 오류가 발생한다")
fun findBeanByParentType() {
	val ac = AnnotationConfigApplicationContext(AppConfig::class.java)
	assertThrows(NoUniqueBeanDefinitionException::class.java) {
		ac.getBean(DiscountPolicy::class.java)
	}
}
```
# 출처
- [Spring.io](https://docs.spring.io/spring-framework/reference/core/beans/definition.html)
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)