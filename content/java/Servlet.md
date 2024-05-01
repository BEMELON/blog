---
title: Servlet
draft: false
tags:
  - Java
---

# Servlet

> [!note]
> 클라이언트의 요청을 처리하고, 그 결과를 반환하는 Servet 클래스의 구현 규칙을 지킨 자바 웹 프로그래밍 기술
- 클라이언트가 어떠한 요청을 했을 때 그에 해당하는 결과를 동적으로 전송해주는 Java 프로그램

## Servlet 구조 
- Java EE 에 대한 Servlet 스펙이 [Github](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/Servlet.java) 에 공개되어 있다.
``` java
public interface Servlet {
	public void init(ServletConfig config) throws ServletException;
	public ServletConfig getServletConfig();
	public void service(ServletRequest req, ServletResponse res)
		throws ServletException, IOException;
	public String getServletInfo();
	public void destroy();
}
```

- 실제 실행에 관련된 함수는 `service` 함수인데, 그 주석은 다음과 같다. 
	- 멀티쓰레드 형식으로 실행되기 때문에 주의해서 구현해야 한다는 점. 
	- `ServeltResponse` 에 응답값을 담아 실제로 사용하는 것 같다. 
``` java
/**
 * Servlets typically run inside multithreaded servlet containers
 * that can handle multiple requests concurrently. Developers must 
 * be aware to synchronize access to any shared resources such as files,
 * network connections, and as well as the servlet's class and instance 
 * variables. 
 **/ 
public void service(ServletRequest req, ServletResponse res);
```


## GenericServlet
- Servlet이 주로 요청에 따른 응답을 제공하는 것에 사용되기 때문에 이에 맞는 [GenericServlet](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/GenericServlet.java) 추상 클래스가 사용되고 있다. 
	- GenericServlet은 프로토콜과 독립적으로 다양한 프로토콜에서 Servlet을 쉽게 사용할 수 있는 하나의 템플릿으로 사용되고 있다. 

## HTTPServlet
 - 실제 HTTP 프로토콜의 요청을 처리하는 [HTTPServlet](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/http/HttpServlet.java)이다.
	 - 링크는 JAVA EE의 HTTP Servelt이다보니 구현이 엉망(?)이긴한데, 대략적으로 HTTP Method에 따라 적절한 함수를 호출시키는 것을 확인할 수 있다. 
``` java
public abstract class HttpServlet extends GenericServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	protected long getLastModified(HttpServletRequest req)
	protected void doHead(HttpServletRequest req, HttpServletResponse resp)
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
	protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
	protected void doTrace(HttpServletRequest req, HttpServletResponse resp) 
	protected void service(HttpServletRequest req, HttpServletResponse resp)
}
```

