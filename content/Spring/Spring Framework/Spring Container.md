---
title: Spring Container
draft: false
tags:
  - Spring-Framework
aliases:
  - 스프링 컨테이너
  - ApplicationContext
---
# Spring Container 
[[Dependency Injection|의존성 주입]]을 제공하기 위해 [[Spring Framework]] 에서 제공하는 컨테이너입니다. 메타데이터를 기반으로 정의된 [[Bean]]을 찾아서 등록하게 됩니다. 


## Spring Container의 종류 
[[Bean]]을 등록하는 방법은 많기 때문에 여러가지 [GenericApplicationContext](https://github.com/spring-projects/spring-framework/blob/main/spring-context/src/main/java/org/springframework/context/support/GenericApplicationContext.java)를 상속받은 구현체를 통하여 등록을 하게 됩니다. 
``` mermaid
graph RL
	GenericApplicationContext --> StaticApplicationContext
	GenericApplicationContext --> AnnotationConfigApplicationContext
	GenericApplicationContext --> GenericXmlApplicationContext

```

## Spring Container의 역할 
Spring Container의 역할을 정의하는 [Application Context](https://github.com/spring-projects/spring-framework/blob/main/spring-context/src/main/java/org/springframework/context/ApplicationContext.java) 인터페이스를 찾아보면 여러개의 인터페이스를 상속을 받아서 사용하고 있습니다. 다음과 같은 역할을 제공한다고 이해할 수 있습니다.

- EnvironmentCapable : 환경 설정을 제공하는 인터페이스
- MessageSource : i18n을 지원하는 인터페이스
- ApplicationEventPublisher : 이벤트를 발행할 수 있는 기능을 제공하는 인터페이스
- ResourcePatternResolver : 리소스를 패턴을 사용하여 검색할 수 있는 기능을 제공하는 인터페이스
- **BeanFactory** : [[Bean]]을 등록하고 관리하는 인터페이스 

