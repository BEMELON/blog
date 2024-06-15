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
# 출처
- [Spring.io | Classpath Scanning and Managed Components](https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html#beans-factorybeans-annotations)