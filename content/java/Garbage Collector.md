---
title: Garbage Collector
draft: false
tags:
  - "#Java"
  - "#Garbage-Collector"
---

# Garbage Collector 
Java 에서는 모든 객체를 동적으로 할당하곤 합니다. 동적으로 할당된 객체는 상황에 따라 적절하게 해제가 되는데, 이렇게 해제가 되는 작업을 Garbage Collector (이하 GC)가 맡아서 진행하게 됩니다. 

## 왜 알아야 할까? 
Java 에 GC가 붙어 메모리를 관리할 필요가 없다는 것은 다들 알고 있지만, 왜 GC의 원리까지 이해해야 하는지 체감이 되지 않았습니다. 

학습한 내용을 기반으로 답변을 하자면, GC는 정말 순수 오버헤드 작업입니다. GC 작업이 진행되는 동안 기본적으로 Application 실행은 멈추게 되고 메모리 관리에만 모든 시간을 소비하게 됩니다. 이 과정에서 GC의 종류에 따라 메모리/CPU와 GC 실행시간은 Trade-Off 관계를 가지게 됩니다. (CPU/메모리를 많이 사용하지만 GC의 실행시간은 단축) 따라서, 실행하려는 어플리케이션의 특성에 적절한 GC를 선택하고 튜닝을 진행하게 된다면 더욱 효율적인 실행이 가능해질 것입니다. 

하지만, GC의 튜닝이 어려울 뿐만 아니라 드라마틱한 개선을 체감하기는 힘듭니다. 그렇기 때문에 가능한 모든 최적화 방법을 수행한 후 마지막으로 GC의 튜닝을 선택하는게 올바른 방법입니다. 


# Java에서 불필요한 객체를 식별하는 방법  

## 1. Reference Counting 
![|620](https://i.imgur.com/ol5Rv40.png)


`Root nodes`(스택, 전역 등 Heap 영역 참조를 담은 변수들)에서 하나하나 따라가보며 `Heap Space`에 가리키는 객체들을 표시하게 됩니다. 코드가 진행되면서 Reference Count가 0이 되는 경우 이를 메모리에서 제거하는 방식입니다. 

## Cycle Reference Problem 
Reference Counting 방식은 자연스럽게 Heap 메모리 관리를 할 수 있다고 하지만, **순환 참조 문제**가 발생할 수 있습니다.

![|620](https://i.imgur.com/KWNTOXs.png)

위의 그림처럼, 서로가 서로를 참조하는 경우 Reference Count가 0으로 떨어지지 않기 때문에 Heap 메모리 관리가 어려워질 수 있습니다. 

이 순환 참조 문제는 근본적으로 해결하기 어렵게 때문에 세대별로 객체를 관리하는 **Generational Garbage Collection** 방법을 혼용하여 사용하게 됩니다.
- Python의 경우 2가지 방법을 혼용해서 사용하고 있습니다.
- Java의 경우 **Generational Garbage Collection** 방법을 사용하고 있습니다.

## 2. Mark & Sweep 
![|620](https://i.imgur.com/ZIYr7Aw.png)


Mark & Sweep 방법은, `Root nodes` 에서부터 가리키고 있는 모든 객체들을 표시(Mark)한 다음, 표시되지 않은 모든 객체들을 할당 해제 (Sweep) 하는 방식입니다. 위의 그림에서는 빨간색 노드들이 Mark 되지 않았기 때문에 Sweep 될 객체입니다.

이는 **Reference Counting 에서의 순환 잠초 문제를 완벽히 해결했지만 다음과 같은 특성**을 가지게 되는데요.
1. Mark & Sweep 알고리즘을 의도적으로 실행시켜야 합니다.
2. Application 실행과 병행할 수 없기 때문에 GC가 실행하는 동안 Applicaiton의 실행이 멈추게 됩니다.
	- 이를 Stop-The-World이라 부르게 됩니다.

## 3. Tri-color Marking 
앞서 Mark & Sweep 방식의 Stop the world 현상을 단점을 개선하기 위해 고안된 알고리즘입니다. 현대의 GC는 Tri-color Marking 방식을 통하여 지속적으로 개선되고 있습니다. 

Tri-color Marking은 한국어로 삼색 마킹 알고리즘으로도 불리곤 합니다. 흰색, 회색, 검정색마다 의미를 부여하여 불필요한 객체를 선별하는 방법인데요. 이는 Application과 동시에 실행이 가능한 방법으로 GC의 시간을 단축시킬 수 있다는 점에서 큰 의미를 가지고 있습니다. 


아래와 같은 객체 상태가 있다고 가정해보겠습니다. 
### 모든 객체는 `White`에 들어가게 됩니다.
![|620](https://i.imgur.com/nghzz3r.png)

### `Root nodes`가 직접 가리키고 있는 노드를 회색으로 처리합니다. 
![|620](https://i.imgur.com/qjFP0dX.png)

### 회색 객체 중 하나를 검정색으로 처리합니다. 그리고 객체가 가리키는 모든 객체를 회색으로 처리합니다. 
![|620](https://i.imgur.com/qW7cU9b.png)
### 반복
![|620](https://i.imgur.com/PHIMx3Q.png)

여기서 흰색으로 남아있는 객체들은 접근이 불가능한 객체이기 때문에 해제하게 됩니다. 해당 알고리즘은 어플리케이션 실행과 무관하게 즉시(on-the-fly) 실행이 가능하다는 장점이 있습니다. 


# Generational Garbage Collection : 정말 극소수만 오래 살아남더라 
> [!info] Weak Generational Hypothesis 
> 거의 대부분의 객체는 아주 짧은 시간만 살아 있지만, 나머지 객체의 기대 수명이 훨신 길다.

실행되는 Java의 수명주기를 분석해보니 다음과 같은 그래프가 보일 수 있었습니다.
![|620](https://i.imgur.com/Hguqng1.png)

대부분의 객체는 수명주기가 짧고 정말 극히 일부의 객체만이 수명주기가 길다는 점입니다. 이에 착안하여 단명 객체를 쉽고 빠르게 수집하는 방식이 연구되었으며, 단명 객체와 장명 객체를 구분하는 방법이 사용되고 있습니다. 이를 Generational GC라 부르게 됩니다.

![|620](https://i.imgur.com/BRm3FBe.png)


## Young Generation 중 Old 객체를 골라내는 방법 
수 많은 객체 중, 정말 오래 살 것 같은 객체만 Old Generation 영역으로 보내야 합니다. 어떻게 하지? 와 같은 많은 호기심을 재쳐두고 과정을 설명해보겠습니다. 
### Young Generation 메모리 구조
Young Generation은 다음과 같은 메모리 구조를 가지게 됩니다.
![|620](https://i.imgur.com/wWkrEZc.png)

### 새로 생성된 객체는 Eden으로 
`new`와 같이 새로운 객체를 생성하는 순간, 이 객체는 `Eden` 영역에 배치되게 됩니다.
![|620](https://i.imgur.com/ZvnHUhw.png)

### Eden이 꽉차게 되면, 살아남은 객체만 Survivor #1 영역으로 
`Eden` 영역이 언젠가는 꽉 차게 되겠죠? 이 때 살아남은 객체만 빠르게 식별하여 이를 `Survivor #1` 영역으로 보내게 됩니다. 이러한 과정을 `Minor GC` 라고 부르곤 합니다. 
![|620](https://i.imgur.com/wzqmzYr.png)


### 또 Eden이 꽉차게 되면 Survivor #2 영역으로 
이후 `Eden` 의 영역이 꽉차게 되면 다시 `Minor GC` 를 실행하여 `Survivor #2` 영역으로 보내게 됩니다. 이 때 `Eden` 뿐만 아니라 `Survivor #1` 영역도 동시에 `GC`가 이루어지게 됩니다.
![|620](https://i.imgur.com/jfl0dSE.png)

이를 번갈아 반복하다보면 Survivor #1 혹은 #2 중 하나는 반드시 비어있게 되는데요. 굳이 이런 방식을 사용하는 이유는 객체들을 효율적으로 필터링하고 관리하기 위해서입니다. 불필요한 객체를 제거하면서 압축을 진행하게 된다면 메모리 파편화 없이 더 많은 객체를 수용할 수 있습니다. 

### (Promotion) 충분히 살아남았다면, Old Generation으로 
어느정도 객체가 `Survivor #1,#2` 영역에서 살아남았다면 이 객체는 Old Generation 으로 이동하게 됩니다. 이를 `Age` 라고 부르게 되고, `Age bit` 를 통하여 이를 판단할 수 있습니다.  이러한 현상을 Promotion 이라 부르게 됩니다.
![|620](https://i.imgur.com/xY6OaaA.png)

### Old Generation이 꽉차게 되면? Major GC 
Od Generation도 결국 시간이 지나게 되면 꽉 차게 됩니다. 이 때는 Old Generation 의 참조 여부를 판단하는 `Major GC` 실행을 통해  Old Generation 을 정리하게 됩니다.
![|620](https://i.imgur.com/YBoRFyg.png)

`Major GC` 는 `Minor GC`에 비해 상대적으로 실생시간이 높습니다. 더 나아가 `Old Generation`의 크기(힙 메모리의 크기)가 커질수록 이를 실행하는 시간이 늘어나게 됩니다. 
## Young Generation 영역에 대한 고민들 
- `Eden` 영역이 `Survivor`보다 영역이 큰 이유는?
	- 아무래도 대부분의 객체들이 단명하기 때문에 `Eden` 영역이 더 큰 공간을 가지며 그나마 장명의 가능성 있는 객체들이 `Survivor` 에 갈 수 있도록 고를 수 있기 때문이다. 
- `Eden` 에서 관리 다하면 될 것 왜 굳이 `Eden`하고 `Survivor` 영역을 구분했을까? 
	- `Eden` 영역은 대부분의 객체가 죽는다는 관점에서 GC를 실행할 수 있기에 조금 더 최적화가 가능하다고 함. 
- 운이 나쁘게도, 장명할 객체가 많아 `Survivor` 영역을 가득 채운 경우는?
	- [Premature Promotion](https://perfectacle.github.io/2019/05/07/jvm-gc-basic/#Premature-Promotion) 현상이라고 한다, 그냥 Old 영역으로 넘어가게 된다.

# Garbage Collector의 종류 
- [[Serial GC]]
- [[Parallel GC]]
- [[CMS GC]]
- [[G1 GC]]

# 참고하거나 앞으로 보충해야 되는 내용들
- [Siner 블로그](https://blog.siner.io/2021/12/26/garbage-collection/)
- [대흉근의 블로그]()




