---
title: GitHub Desktop无法log in的问题
date: '2020-03-02'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- git
categories:
- Tech
---
* 错误提示

> GitHub Desktop was unable to store the account token in the keychain. Please check you have unlocked access to the 'login' keychain.

* 解决方法

https://github.com/desktop/desktop/blob/development/docs/known-issues.md#the-username-or-passphrase-you-entered-is-not-correct-error-after-signing-into-account---3263

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfmiybv87j30kw0jkn01.jpg)

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfmhis741j30t20c1wgg.jpg)

**锁定钥匙串，再解锁，之后输入密码，再次尝试登陆GitHub Desktop**

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfmkvmwi9j30oa0gbn0y.jpg)

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfml4gx6oj30oa0ghdjo.jpg)

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfmn3b482j30fb07u0u2.jpg)




