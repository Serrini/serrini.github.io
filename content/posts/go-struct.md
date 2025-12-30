---
title: go-struct
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
# Struct

![](https://tva1.sinaimg.cn/large/008i3skNly1gvjirdizf5j60b905naa602.jpg)

```go
type person struct {
	age int
	name string
}


func (p person) String_name() string{
	return "the person name is " + p.name
}

func (p person) Int_age() int{
	return p.age
}

func (p person) modify_value() {
	p.name = "serrini"
}

func (p *person) modify_point() {
	p.name = "serrini"
}

/*--------------struct-------------*/
//var p person
p := person{12, "jim"}
modify_struct_0(&p)
fmt.Println(p)
modify_struct_1(p)
fmt.Println(p)

fmt.Println(p.String_name())
fmt.Println(p.Int_age())

p.modify_value()
fmt.Println("值接收者，修改无效：", p.String_name())
p.modify_point()
fmt.Println("指针接收者，修改有效：", p.String_name())

func modify_struct_0(p *person) {
	//通过传递结构体指针，可以修改age的值
	p.age = p.age + 10
}

func modify_struct_1(p person) {
	// 结构体传递的是其本身以及里面的值的拷贝，无法修改age的值
	p.age = p.age + 10
}


/*--------------struct-------------*/
```

输出：
```go
/*--------------struct-------------*/
{22 jim}
{22 jim}
the person name is jim
22
值接收者，修改无效： the person name is jim
指针接收者，修改有效： the person name is serrini
/*--------------struct-------------*/
```
