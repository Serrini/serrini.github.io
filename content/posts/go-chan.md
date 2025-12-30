---
title: go-chan
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
# chan

##  定义：

```go
ch := make(chan int)
ch<-2//发送数值2给这个通道
x:=<-ch //从通道里读取值，并把读取的值赋值给x变量
<-ch //从通道里读取值，然后忽略
close(ch) //内置close，关闭
```

```go
ch := make(chan int,0)
```
第二个参数是通道的大小，0则是**无缓冲通道**。**有缓冲通道**，其实是一个**队列**。
对于有缓冲的通道，向其发送操作就是向队列的尾部插入元素，接收操作则是从队列的头部删除元素，并返回这个刚刚删除的元素。

##  **单向通道**

限制一个通道只可以接收，但是不能发送；有时候限制一个通道只能发送，但是不能接收，这种通道我们称为单向通道。

```go
var send chan<- int //只能发送
var receive <-chan int //只能接收
```

单方向的channel类型，分别用于只发送或只接收的channel。类型chan<- int表示一个只发送int的channel，只能发送不能接收。相反，类型<-chan int表示一个只接收int的channel，只能接收不能发送。（箭头<-和关键字chan的相对位置表明了channel的方向。）这种限制将在编译期检测。

## 带缓存的通道

```go
strchan := make(chan string, 10)
strchan <- "a"
strchan <- "b"
strchan <- "c"
fmt.Println(cap(strchan)) 	//10
fmt.Println(len(strchan))		//3

fmt.Println(<-strchan)			//a
fmt.Println(<-strchan)			//b
fmt.Println(<-strchan)			//c
//fmt.Println(<-strchan)	//阻塞
```


##  管道pipeline（串联的通道）

###  example1

```go
package main

import "fmt"

func main() {
	ch := make(chan int)	//无缓冲通道，需要同步操作

	go func() {
		sum := 0
		for i:=0; i<10; i++ {
			sum += i
		}
		ch <- sum
	}()

	fmt.Println(<-ch)	// 45

	//用同步通道实现管道，类似bash中的|
	one := make(chan string)
	two := make(chan string)
	go func() {
		one <- "aaa"
	}()
	go func() {
		var v string
		v =<- one
		two <- v
	}()

	fmt.Println(<-two)	// aaa

	//有缓冲通道，获取最先返回的服务器信息
	mirrieedQuery()	// xxxx from ccccc.io
}

func mirrieedQuery() string {
	responses := make(chan string, 3)
	// 同时发起3个并发goroutine向这三个镜像获取数据
	go func() {
		responses <- requset("aaaaa.io")
	}()

	go func() {
		responses <- requset("bbbbb.io")
	}()

	go func() {
		responses <- requset("ccccc.io")
	}()

	fmt.Println(<-responses)
	return <-responses
}

func requset(hostname string) (response string) {
	return "xxxx from " + hostname
}
```

###  example2

一个channel的输出作为另一个channel的输入，即pipeline。

```go
package main

import "fmt"

func main() {
	//打印0-99的平方
	numbers := make(chan int)
	squares := make(chan int)

	go func() {
		for i:=0; i<100; i++ {
			numbers <- i
		}
		close(numbers)
	}()

	go func() {
		for x := range numbers{
			squares <- x*x
		}

/*
		for {
			x, ok := <-numbers
			if !ok {
				break
			}
			squares <- x*x
		}
*/
		close(squares)
	}()

	for x := range squares{
		fmt.Println(x)
	}
}

```


###  example3

```go
package main

import (
	"fmt"
)

func main() {
	numbers := make(chan int)
	squares := make(chan int)

	go number(numbers)
	go square(squares, numbers)
	printer(squares)
}

func number(outnumber chan<- int) {
  // outnumber 只能发送的单向通道
	for i:=0; i<100; i++ {
		outnumber <- i
	}

	close(outnumber)
}

func square(outsquare chan<- int, innumber <-chan int) {
  // innumber 只能接收的单向通道
	for v := range innumber {
		outsquare <- v * v
	}

	close(outsquare)
}

func printer(outprint <-chan int) {
	for u := range outprint {
		fmt.Println(u)
	}
}

```