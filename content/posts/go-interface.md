---
title: go-interface
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
# Interface

```go
package main

import (
	"fmt"
)

type hello_inter interface {
	hello()
}

type animal interface {
	printInfo()
}

type cat string
type dog string
type bird string
type edog string

type user struct {
	name string
	email string
}

type admin struct {
	user
	level string
}


func (u user) hello() {
	fmt.Println("hello")
}

func (u user) printHello() {
	fmt.Println("this is user")
}

func (a admin) printHello() {
	fmt.Println("this is admin")
}

func (b bird) printInfo() {
	// 值接收者实现animal接口
	// 方法
	fmt.Println("this is bird")
}

func (c cat) printInfo() {
	//值接收者实现animal接口
	// 方法
	fmt.Println("this is cat")
}

func (d dog) printInfo() {
	//值接收者实现animal接口
	// 方法
	fmt.Println("this is dog")
}

func (e *edog) printInfo() {
	// 指针接收者实现animal接口
	// 调用的地方需要以指针作为参数传递
	fmt.Println("this is e-dog")
}

func invoke(a animal) {
	// 函数
	a.printInfo()
}

func sayHello (a admin) {
	a.hello()
}

func main() {
/*--------------多态-------------*/
	var a animal
	var b bird
	var c cat
	var d dog
	var e edog
	invoke(&e)	// this is e-dog

	a = c
	a.printInfo()	// this is cat

	a = d
	a.printInfo()	// this is dog

	invoke(b)	// this is bird

	ad := admin{user{"serrini", "123@qq.com"}, "level001"}
	ad.printHello()	// 同名函数重写，打印admin	// this is admin
	//ad.hello()

	sayHello(ad) // 内部user实现了接口hello_inter，外部类型admine也被认为实现了该接口 // hello
}
```

```go
this is e-dog
this is cat
this is dog
this is bird
this is admin
hello
```

1. 如果要实现一个接口，必须实现这个接口提供的所有方法。
