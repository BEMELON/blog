---
date: 2024-11-02 07:40
last-modified: 2024-11-02 07:40
title: Integrity
draft: false
tags:
  - Database
aliases:
  - 무결성
---

# Integrity
무결성(Integrity)란 데이터의 정확성, 일관성, 유효성 등을 유지하는 것을 의미하며 무결성이 유지되어야 데이터베이스에 저장된 데이터 값과 그 값에 해당하는 현실 세계의 실제 값이 일치하는 지에 대한 신뢰를 가져갈 수 있습니다. 

# Entity Integrity 
개체 무결성(Entity Integrity)는 모든 테이블은 기본키([[Primary Key]]) 를 반드시 가져야 하며 `null`은 허용되지 않음을 의미합니다.

# Referential Integrity
참조 무결성(Referential Integrity)는 참조 관계에 있는 두 테이블의 데이터가 항상 일관된 값을 갖도록 유지하는 것을 의미합니다. 외래키([[Foreign Key]])를 참조하는 기본키([[Primary Key]])는 반드시 존재해야 함을 의미합니다. 

# Domain Integrity 
도메인 무결성(Domain Integrity)은 테이블의 속성([[Attribute]])은 반드시 속성의 도메인([[Domain]]) 에 해당하는 값만이 들어갈 수 있다는 것을 의미합니다.
