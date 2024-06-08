---
title: JSP
draft: false
tags:
  - Java
aliases:
  - Java Server Pages
---

# Java Server Pages
> [!note]
> Java 소스코드가 들어가 있는 HTML 코드

Java를 이용한 서버 사이드 플랫폼 엔진이다.`<% ... %>`로 둘러싸인 스크립트 영역이 있으며, 실행시에 `javax.servlet.http.HttpServlet` 클래스를 상속받은 Java 소스 코드로 변환한 다음 컴파일되어 [[Servlet|서블릿]]으로 실행된다.

## JSP Container 
JSP 파일을 [[Servlet]] 소스코드로 변환하고 컴파일 하는 과정을 담당하는 역할 

## 흐름 
1. JSP 파일을 JSP Container가 해석 후 이를 Servlet 소스코드로 변환 
2. Servlet 소스코드는 Servlet(Web) Container에서 실행 후 응답을 반환환