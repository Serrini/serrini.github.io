---
title: go-goroutine
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
# goroutine

go语言中并发指的是让某个函数独立于其他函数运行的能力，一个goroutine就是一个独立的工作单元，Go的runtime（运行时）会在逻辑处理器上调度这些goroutine来运行，一个逻辑处理器绑定一个操作系统线程，所以说goroutine不是线程，它是一个协程，也是这个原因，它是由Go语言运行时本身的算法实现的。

| **概念**     | **说明**                                      |
| ------------ | --------------------------------------------- |
| 进程         | 一个程序对应一个独立程序空间                  |
| 线程         | 一个执行空间，一个进程可以有多个线程          |
| 逻辑处理器   | 执行创建的goroutine，绑定一个线程             |
| 调度器       | Go运行时中的，分配goroutine给不同的逻辑处理器 |
| 全局运行队列 | 所有刚创建的goroutine都会放到这里             |
| 本地运行队列 | 逻辑处理器的goroutine队列                     |


## Go的并发

当我们创建一个goroutine的后，会先存放在**全局运行队列**中，等待Go运行时的调度器进行调度，把他们分配给其中的一个**逻辑处理器**，并放到这个逻辑处理器对应的**本地运行队列**中，最终等着**被逻辑处理器执行**即可。

并发可以同时做很多事情，比如有个goroutine执行了一半，就被暂停执行其他goroutine去了，这是Go控制管理的。所以并发的概念和并行不一样，**并行指的是在不同的物理处理器上同时执行不同的代码片段，并行可以同时做很多事情，而并发是同时管理很多事情**，因为操作系统和硬件的总资源比较少，所以并发的效果要比并行好的多，使用较少的资源做更多的事情，也是Go语言提倡的。

## Go的并行

那么Go的并行是怎样的呢？多创建一个逻辑处理器就好了，这样调度器就可以同时分配全局运行队列中的goroutine到不同的逻辑处理器上并行执行。

默认情况下，Go默认是**给每个可用的物理处理器都分配一个逻辑处理器**。


## 原子化（atomic）


我们对于同一个资源的读写必须是原子化的，也就是说，同一时间只能有一个goroutine对共享资源进行读写操作。

共享资源竞争的问题，Go语言提供了**atomic包**和**sync包**里的一些函数对共享资源同步枷锁。

```go
package main

import (
	"fmt"
	"runtime"
	"sync"
	"sync/atomic"
)

var (
	count int32
	wg sync.WaitGroup
	mutex sync.Mutex
)
func main() {
	//atomic_ex()
	//mutex_ex()
}

func mutex_ex() {
	wg.Add(2)
	count = 8
	go intcount_mutex()
	go intcount_mutex()
	wg.Wait()
}

func intcount_mutex() {
	// 互斥锁
	defer wg.Done()
	for i:=0; i<2; i++ {
		mutex.Lock()
		value := count
		runtime.Gosched()
		value++
		count := value
		mutex.Unlock()
		fmt.Println("cout : ", count)
	}
}

func atomic_ex() {
	// 原子操作
	count = 7
	wg.Add(2)
	go intcount_atomic()
	go intcount_atomic()
	wg.Wait()
	fmt.Println(count)
}

func intcount_atomic() {
	defer wg.Done()
	fmt.Printf("----count[%d]----\n", count)
	for i:=0; i<2; i++ {
		fmt.Printf("count[%d]\n", count)
		value := atomic.LoadInt32(&count)
		runtime.Gosched() //让出cpu时间
		value++
		atomic.StoreInt32(&count, value)
		fmt.Println("count:", count, "value:", value)
	}
}

```

atomic_ex()输出：

```go
----count[7]----
----count[7]----
count[7]
count[7]
count: 8 value: 8
count[9]
count: 10 value: 10
count: 9 value: 9
count[10]
count: 11 value: 11
11

```

mutex_ex()输出：

```go
cout :  9
cout :  9
cout :  9
cout :  9
```

### defer延迟语句

**defer延迟语句**：在函数中添加多个defer语句，当函数执行到最后时，这些defer语句会按照逆序执行，最后该函数返回。进行一些打开资源的操作时，遇到错误需要提前返回，在返回前需要关闭相应的资源，不然容易造成资源泄露等问题。

```go
func ReadWrite() bool {
    file.Open("file")
    defer file.Close()
    if failureX {
        return false
    }
    if failureY {
        return false
    }
    return true
}
```

如果有很多调用defer，那么defer是采用后进先出模式，所以如下代码会输出4 3 2 1 0

```go
for i := 0; i < 5; i++ {
    defer fmt.Printf("%d ", i)
}
```

### atomic包
1. GO语言提供的原子操作都是非入侵式的，由标准库sync/atomic中的众多函数代表
2. 类型包括int32,int64,uint32,uint64,uintptr,unsafe.Pointer，共六个
3. 这些函数提供的原子操作共有五种：增或减，比较并交换，载入，存储和交换

```go
// 一个32位整数读出或者写入内存
// LoadInt32 atomically loads *addr.
func LoadInt32(addr *int32) (val int32)
// StoreInt32 atomically stores val into *addr.
func StoreInt32(addr *int32, val int32)
```

## Example
```go
package main

import (
	"fmt"
	"runtime"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	//runtime.GOMAXPROCS(1) // 设置逻辑处理器，1个
	runtime.GOMAXPROCS(runtime.NumCPU())
	fmt.Println("runtime.NumCPU() =", runtime.NumCPU())
	wg.Add(2) // 计数器2
	go func() {
		defer wg.Done()	// 延迟语句 -1
		for i:=0; i<100; i++ {
			fmt.Println("A:%d", i)
		}
	}()

	go func() {
		defer wg.Done()
		for i:=0; i<100; i++ {
			fmt.Println("B:%d", i)
		}
	}()

	wg.Wait()
}
```

输出：runtime.NumCPU() = 4，AB交替输出0-99