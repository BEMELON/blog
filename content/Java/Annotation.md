---
title: Annotation
draft: false
tags:
  - Java
  - Annotation
---

# Annotation 
`JVM` 에서의 Annotation은 소스 코드에 메타데이터를 추가하는 방법입니다. 메타데이터는 코드에 대한 추가 정보를 제공하며, 컴파일러, 런타임 시스템 또는 다른 도구들이 이 정보를 활용할 수 있습니다.

예시를 들어, `@Builder`, `@Getter`, `@Setter` 등을 통하여 객체의 접근자를 생성할 수 있습니다.

# 배경 
한 [게시글](https://dzone.com/articles/how-annotations-work-java) 에 따르면 Annotation 이전에는 XML을 통하여 메타데이터 관리를 했다고 합니다. XML 방식은 전역에 걸쳐지는 객체들에게 내용을 적용하기에는 적합했지만, 특정 코드 영역에 대해서 메타데이터 관리하기에는 어려움이 있었다고 합니다.  Annotation은 특정 코드 영역에 대해서 사용자 정의 메타데이터를 관리할 수 있는 방법입니다. 

# 동작 원리 
Annotation은 오직 컴파일 과정에만 처리되고, 런타임에는 실제로 영향을 주지 않습니다. Annotation Processer 가 Annotation을 해석하고, 해석한 값을 바탕으로 컴파일 과정에 생성된 Parse Tree에 변경을 하게 됩니다. 

# 출처 
 - [Dzone](https://dzone.com/articles/how-annotations-work-java)
 - [Refelctoring](https://reflectoring.io/java-annotation-processing/)