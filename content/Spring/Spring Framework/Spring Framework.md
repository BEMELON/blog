---
title: Spring Framework
draft: false
tags:
  - Spring-Framework
aliases:
---
# Spring Framework 
엔터프라이즈 어플리케이션을 개발하기 위한 필요한 **핵심 모델들을 제공하는 프레임워크**입니다. [Spring Project](https://spring.io/projects)에 설명되는 프로젝트들은 모두 Spring Framework를 기반으로 만들어졌습니다. 

# Design Philosophy 

>1. Provide choice at every level.

개발자가 모든 수준에서 디자인을 선택할 수 있도록 합니다. 이는 설계 결정을 최대한 늦출 수 있도록 도와주게 됩니다. 이러한 철학 덕분에 [[Inversion Of Control|IoC]]와 같은 패턴을 적용해볼 수 있습니다.

> 2. Accommodate diverse perspectives.

다양한 관점과 요구사항을 수용할 수 있는 유연한 프레임워크입니다. 특정 방식에 대해서 의견을 가지지 않고, 개발자들이 자신의 필요에 맞게 여러가지 접근 방식을 선택할 수 있도록 지원합니다.

> 3. Maintain strong backward compatibility.

강력한 [[Backward Compatibility]]를 유지하도록 설계되어 있습니다. 새로운 기능을 추가하면서도 기존 기능의 호환성을 유지하려고 노력하고, 이를 통해 Spring을 기반으로 하는 애플리케이션과 라이브러리르 유지 관리하기 쉽게 해줍니다. 

> 4. Care about API design.

API 디자인은 직관적이고 시간이 지나도 유지될 수 있도록 신중하게 설계되었습니다. Spring 팀에서는  API를 설계할 때 개발자의 경험을 최우선으로 고려하며, 이는 사용하기 쉽고 이해하기 쉬운 API를 만드는 데 중점을 둘었습니다.

> 5. Set high standards for code quality.

코드 품질에 대한 높은 기준을 가지고 있으며, 의미 있는 JavaDoc 문서를 작성하는데 큰 중점을 두고 있습니다.

# Core Techologies 
Spring Framework 에서 제공하는 핵심 기술과 실제로 개발에 활용되는 기술들을 정리하였습니다.
- [[Dependency Injection]] : [[../../inbox/Single Responsibility Principle|단일 책임 원칙]]과 [[../../inbox/Dependency Inversion Principle|의존성 역전 원칙]]을 지키기 위해 도입된 개념

# 출처 
- 공식 홈페이지: [Spring.io](https://spring.io/projects/spring-framework#overview)
