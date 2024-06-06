---
title: Dependency Injection
draft: false
tags:
  - Spring-Framework
aliases:
  - 의존성 주입
  - DI
---
# Dependency Injection 
[[../../inbox/Single Responsibility Principle|단일 책임 원칙]]과 [[../../inbox/Dependency Inversion Principle|의존성 역전 원칙]]을 지키기 위해 도입된 개념입니다. **의존성 주입**으로 더욱 알려져 있습니다. 대부분의 객체는 다른 객체를 의존하게 됩니다. 이 때, 의존성을 외부에서 주입하는 것을 의미하게 됩니다. 

## 간단한 예시 
아래와 같은 Class Diagram이 가정해보겠습니다. MessagePrinter는 **MessageService를 통해 메시지를 수신할 수 있습니다.** 
``` mermaid
classDiagram
    class MessageService {
        <<interface>>
        +String getMessage()
    }

    class HelloWorldMessageService {
        +String getMessage()
    }

    class MessagePrinter {
        -MessageService service
        +MessagePrinter(MessageService service)
        +void printMessage()
    }

    MessageService <|-- HelloWorldMessageService
    MessagePrinter *-- MessageService

```


``` java
// MessageService의 역할을 인터페이스로 표현 
public interface MessageService {
    String getMessage();
}

// MessageService의 구현체
public class HelloWorldMessageService implements MessageService {
    @Override
    public String getMessage() {
        return "Hello, World!";
    }
}

public class MessagePrinter {
    private MessageService service;

    // 생성자를 통해 의존성을 주입받음
    public MessagePrinter(MessageService service) {
        this.service = service;
    }

    public void printMessage() {
        System.out.println(service.getMessage());
    }
}
```

위와 같이 구성함으로써, MessagePrinter는 MessageService 라는 역할에만 의존할 수 있고, 구현체가 어떻게 변경되더라도 동일한 동작을 수행함을 예상할 수 있습니다.

## Spring Framework 
Spring Framework 에서는 의존성 주입 기능을 제공합니다. Spring 에서는 실행 시점에 [[Spring Container]]를 만들어 필요한 [[Bean]]들을 등록하고 관리합니다. 등록된 Bean 들을 기반으로 의존성 주입을 가능하게 합니다.