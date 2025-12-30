---
title: go-basic
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
# Array&Slice

1. 数组的指针是```*[5]int```，指针数组是```[5]*int```
2. array&slice的定义
```go
//数组
array:=[5]int{4:1}
months := [...]string{1:"Jan", 2:"Feb", 3:"Mar", 4:"APR", 5:"May", 6:"Jun", 7:"July", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"}

for i,v := range months {
  fmt.Printf("%d-%s\n", i, v)
}
for _,v := range months {
  fmt.Printf("%s\n", v)
}

tonull(months[:3])					//切片,直接修改内容
zero(&months)								//指针,直接修改内容
/**
输出
------tonull------
[null null null Mar APR May Jun July Aug Sep Oct Nov Dec]
-------zero-------
[            ]
**/

func zero(ptr *[13]string) {
	*ptr = [13]string{} //[32]byte{}就可以生成一个32字节的数组。而且每个数组的元素都是零值初始化，也就是0
	//无返回值
}

func tonull(arr []string) {
	for i:=0; i<len(arr); i++ {
		arr[i] = "null"
	}
}

//切片
slice:=[]int{4:1}

nums := [...]int{0, 1, 2, 3, 4}
sumNum(nums[:])	//输出10

func sumNum(arr []int) int {
	s := 0
	for i:=0; i<len(arr); i++ {
		s += arr[i]
	}
	return s //返回值int
}
```
3. nil切片和空切片，它们的长度和容量都是0，但是它们指向底层数组的指针不一样，nil切片意味着指向底层数组的指针为nil，而空切片对应的指针是个地址。
```go
//nil切片
var nil Slice []int
//空切片
slice:=[]int{}
```
4. 3个索引的方法，第3个k用来限定新切片的容量，其用法为```slice[i:j:k]```。
5. append函数会智能的增长底层数组的容量，目前的算法是：容量小于1000个时，总是成倍的增长，一旦容量超过1000个，增长因子设为1.25，也就是说每次会增加25%的容量。
6. ...操作符，把一个切片追加到另一个切片里

```go
/*--------------array-------------*/
var array01[5] int
array02 := [5]int{0,1,2,3,4}
array03 := [5]int{0:8, 1:8}
fmt.Printf("%d\n", array01[3])
fmt.Printf("%d\n", array02[0])
fmt.Printf("%d\n", array03[0])

for i, v:=range array03 {
	fmt.Printf("索引[%d], 值[%d]\n", i, v)
}

array04 := [4]*int{0:new(int), 3:new(int)}
*array04[0] = 1
//*array04[1] = 1	// error
array04[1] = new(int)
*array04[1] = 9
fmt.Printf("%d-%d\n", array04[1], *array04[1])

array05 := [5]int{1:2, 3:4}
fmt.Println("before:", array05)
modify_array0(&array05)
fmt.Println("after :", array05)

var array06 [6]int
fmt.Println("before:", array06)
modify_array1(array06)
fmt.Println("after :", array06)

func modify_array0(a *[5]int) {
	//传递数组指针，修改原数组
	a[1] = 3
	fmt.Println("modify_0:", *a)
}

func modify_array1(a [6]int) {
	//复制数组，不修改原数组
	a[1] = 3
	fmt.Println("modify_1:", a)
}
/*--------------array-------------*/
```

打印：
```go
/*--------------array-------------*/
0
0
8
索引[0], 值[8]
索引[1], 值[8]
索引[2], 值[0]
索引[3], 值[0]
索引[4], 值[0]
824633828104-9
before: [0 2 0 4 0]
modify_0: [0 3 0 4 0]
after : [0 3 0 4 0]
before: [0 0 0 0 0 0]
modify_1: [0 3 0 0 0 0]
after : [0 0 0 0 0 0]
/*--------------array-------------*/
```


```go
/*--------------slice-------------*/
slice := []int{0,1,2,3,4}
for _, v:=range slice {
	// 不想要索引，可以使用_来忽略它
	fmt.Println(v)
}

// 值的方式传递，占用内存小
fmt.Println("before modify_slice:", slice)
fmt.Printf("before modify_slice addr:%p\n", &slice)
modify_slice(slice)
fmt.Println("after modify_slice :", slice)

slice1 := slice[:]
slice2 := slice[0:]
slice3 := slice[:4]
slice4 := slice[1:3]
fmt.Println(slice)
fmt.Println(slice1)
fmt.Println(slice2)
fmt.Println(slice3)
fmt.Println(slice4)	//左闭右开

newSlice := slice[1:3]
fmt.Printf("newSlice长度:%d,容量:%d\n",len(newSlice),cap(newSlice))
newSlice = append(newSlice, 10, 20, 30)
newSlice = append(newSlice, slice...)	//slice追加到newSlice
fmt.Println(newSlice)

func modify_slice(slice []int) {
	fmt.Printf("%p\n", &slice)	//两个slice地址不一样
	slice[1] = 10
}
/*--------------slice-------------*/
```

打印：
```go
/*--------------slice-------------*/
0
1
2
3
4
before modify_slice: [0 1 2 3 4]
before modify_slice addr:0xc0000b2138
0xc0000b2168
after modify_slice : [0 10 2 3 4]
[0 10 2 3 4]
[0 10 2 3 4]
[0 10 2 3 4]
[0 10 2 3]
[10 2]
newSlice长度:2,容量:4
[10 2 10 20 30 0 10 2 3 4]
/*--------------slice-------------*/
```

# 类型

1. Go 语言是一种静态类型的编程语
   1. **基本类型**在多线程里是安全的；
   2. **引用类型**有**切片、map、接口、函数类型以及chan**。它的修改可以影响到任何引用到它的变量。
2. 内部类型和外部类型：如果类型名字大写开头，其他包就可以访问；小写开头，其他包就不能访问。
   1. 嵌入类型，或者嵌套类型，这是一种可以把已有的类型声明在新的类型里的一种方式。可以用于interface和struct。
   2. **外部类型还可以添加自己的方法、字段属性等**；外部类型也可以声明**同名的字段或者方法，来覆盖内部类型**；**如果内部类型实现了某个接口，那么外部类型也被认为实现了这个接口**。

```go
/*--------------map-------------*/
dict := make(map[string] int)
dict["cccc"] = 7
dict["aaaa"] = 9
dict["bbbb"] = 8

sort_map(dict)

delete(dict, "aaaa")
dict1 := map[string]int{}
dict1["aaaa"] = 8

func sort_map(dict map[string]int) {
	fmt.Println("Here is sort_map.")
	var names []string
	for name := range dict {
		names = append(names, name)
	}
	sort.Strings(names)
	for _, key:= range names {
		fmt.Println(key, dict[key])
	}
}
/*--------------map-------------*/
```

```go
Here is sort_map.
aaaa 9
bbbb 8
cccc 7
```

# 函数&方法

1. 函数没有接收者，方法有接收者（要么是属于一个结构体的，要么属于一个新定义的类型）。
2. **指针接收者**传递的是一个指向原值指针的副本，指针的副本，指向的还是原来类型的值，所以**修改时，同时也会影响原来类型变量的值**。
3. 接口：
如果要实现一个接口，必须实现这个接口提供的所有方法。

