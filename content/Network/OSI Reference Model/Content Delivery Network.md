---
title: Content Delivery Network
draft: false
tags:
  - Network
aliases:
  - CDN
---
# Content Delivery Network
분산된 서버들을 연결한 네트워크로써 **웹 컨텐츠의 복사본을 사용자에 가까운 곳**에 두게 된다. 이렇게 함으로써 웹 성능 및 속도를 향상 시킬 수 있게 한다. 

## 항상 빠를까?

서비스 개발을 하다보면, 특히 이미지 서버와 관련된 작업을 하다보면 [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) 와 같은 CDN을 붙이는 것을 고민하게 된다. 이전 프로젝트에서도 [Cloudflare](https://www.cloudflare.com/ko-kr/) 를 통해 CDN을 적용시켜본 적이 있었는데, 언젠가 **한국 서비스에 Cloudflare CDN을 붙이는 것은 낭비다** 라는 말을 들은적이 있다.

[한국 서비스에서 Cloudflare의 CDN을 사용은 오히려 속도를 느리게 한다](https://satisfactoryplace.tistory.com/284) 블로그에서 관찰해준 것처럼, CDN 이라고 부르지만 정작 한국에 서버가 없다고 하면, [[TTFB]]가 커지게 된다.

다행히 AWS CloudFront는 한국에 서버가 있는 리전을 고를 수 있다고 하니, CloudFront를 사용하면 된다. CDN 이라고 좋다고 붙이는 것보다, 과연 해당 CDN 서비스를 고르는게 합리적인지 검토할 필요성이 있다.