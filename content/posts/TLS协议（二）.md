---
title: TLS协议（二）
date: '2021-11-09'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- tls
categories:
- Security
---
## 密钥交换算法

### Diffie-Hellman密钥交换

![](https://tva1.sinaimg.cn/large/008i3skNly1gw8prni23ij30bs0g4q3k.jpg)

$A=g^a\,\,(mod\,\,\,p)$

$B=g^b\,\,(mod\,\,\,p)$

$SA = B^a\,\,\,mod\,\,\,p=[g^b\,\,(mod\,\,\,p)]^a\,\,\,mod\,\,\,p$

$SB=A^b\,\,\,mod\,\,\,p=[g^a\,\,(mod\,\,\,p)]^b\,\,\,\,mod\,\,\,p$

$SA=B^a\,\,\,mod\,\,\,p=[g^b\,\,(mod\,\,\,p)]^a\,\,\,mod\,\,\,p=\,g^{ab}(mod\,\,\,p)=[g^a\,\,(mod\,\,\,p)]^b\,\,\,\,mod\,\,\,p=A^b\,\,\,mod\,\,\,p$

$SA=SB可证明$

注：

1. g和p的值是AB都已知的，**a是客户端生成的随机数，b是服务端生成的随机数**
2. 客户端发送DHE交换的请求，服务器生成随机数b，可计算出B，发送给客户端，客户端生成随机数a，计算出A，发送给服务端
3. 交换计算出的AB，A用自己的私钥加密得到的B，B用自己的私钥加密得到的A，得到对称密钥
4. 在TLS里，SA和SB就是预主密钥，pre_master_key

### RSA

...

## TLS 双向认证（mTLS）

1. 客户端发起请求
2. 「验证服务端是否可信」：服务端将自己的 TLS 证书发送给客户端，客户端通过自己的 CA 证书链验证这个服务端证书。
3. 「验证客户端是否可信」：客户端将自己的 TLS 证书发送给服务端，服务端使用它的 CA 证书链验证该客户端证书。
4. 协商对称加密算法及密钥
5. 使用对称加密进行后续通信。

