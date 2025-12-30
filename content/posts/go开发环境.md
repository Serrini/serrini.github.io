---
title: go开发环境
date: '2021-10-18'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- golang
categories:
- Go
---
# IDE

IDEA+go插件

![idea插件](https://tva1.sinaimg.cn/large/008i3skNly1gvj9jvprr1j60ra0k2q4902.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNgy1gvj9tps969j60ue0n6myl02.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNgy1gvj9tzbh58j60ue0n6abv02.jpg)

# 常见问题

## Question1：无法导入自定义包

import 时无法导入自定义包，提示找不到包。

## Solution1

从 GOPATH的src下面去找包作为第三方包引入。

1. 我们可以直接把我们要导入的包(自己写的) 丢在GOPATH下的src里面，这样就可以找到 ，但是这样不方便管理。
2. 我们把本项目创建为 GOPATH 下面创建src里面放上我们的包。

## Question2：报错package xxx is not in GOROOT

导入gopath目录下的包时报错“package xxx is not in GOROOT“，编译器没有去**gopath**下找包。原因是GO111MODULE没有关， **gomod 和 gopath 两个包管理方案，是相互不兼容的**。在 gopath 查找包，按照 goroot 和多 gopath 目录下 src/xxx 依次查找。在 gomod 下查找包，解析 go.mod 文件查找包，mod 包名就是包的前缀，里面的目录就后续路径了。在 gomod 模式下，查找包就不会去 gopath 查找，只是 gomod 包缓存在 gopath/pkg/mod 里面。

## Solution2

把GO111MODULE置为off。

```go
go env -w GO111MODULE=off
```

go path 和 go mod不能同时使用， 关掉 go mod，下次需要用的时候再打开。


# Attention

1. Go有两个很重要的环境变量GOROOT和GOPATH,这是两个定义路径的环境变量，GOROOT是安装Go的路径，比如/usr/local/go；GOPATH是我们自己定义的开发者个人的工作空间。编译器会优先在GOROOT里搜索，其次是GOPATH。



