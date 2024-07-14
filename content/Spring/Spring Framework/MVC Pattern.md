---
title: MVC Pattern
draft: false
tags:
  - Spring-Framework
aliases:
  - MVC 패턴
---
# MVC 패턴 - 개요 
기존에는 서블릿이나 JSP으로 비즈니스 로직과 뷰 렌더링까지 함께 처리를 했었습니다. 이러한 구조는 하나의 파일이 너무 많은 역할을 하게 되고, 이는 유지보수의 어려움을 의미하게 됩니다.

# MVC 패턴 
![[assets/mvc-1.excalidraw.light.png]]

`Model`, `View`, `Controller`의 약자, 기존의 서블릿, JSP에서 처리하는 것들을 컨트롤러와 뷰 라는 영역으로 역할을 분리합니다. 
- `Controller` : HTTP 요청을 받아, 파라미터를 검증하고 비즈니스 로직을 실행 
	- 여기서 비즈니스 로직을 분리한 것이 `Service` 계층 
- `Model` : 뷰에 출력한 데이터를 담아두는 곳
- `View` : 모델에 담겨있는 데이터를 기반으로 화면 렌더링에 집중 

Service 계층을 포함한 그림은 다음과 같게 됩니다.
 ![[assets/mvc-1.excalidraw.light.png]]

# MVC 패턴 - 한계 
MVC 패턴 덕분에 컨트롤러와 뷰의 역할을 명확히 분리할 수 있었습니다. 하지만 이 과정에서 컨트롤러에 중복 코드가 많아지고, 필요하지 않는 코드들도 많아지게 됩니다. 
- Forward, ViewPath 중복 : View로 이동하는 코드가 항상 중복 호출되게 됩니다.
- 불필요한 Request, Response 선언: 사용하지 않더라도, Request, Response를 항상 작성해야 합니다.
- 공통처리의 어려움 : 이러한 공통 로직을 처리하기가 어려워지기 때문에, 유지보수의 한계를 가지게 됩니다. 

