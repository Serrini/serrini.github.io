---
title: OOP
date: '2020-02-18'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- 软工考研
categories:
- Tech
---
# 单选
* 违反了单一职责原则：greet行为和其他行为不是一个职责
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmd5h5dj30j209bmyd.jpg)

* **违反了OCP原则**：如果后续需要扩展新的类型如三角形，drawShape方法必须要修改，违反了对扩展开放对修改关闭的原则
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmdgthuj30ax08lmy3.jpg)

* **违反了LSP原则**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmdx27mj30jh0k5ad5.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmeuzkcj30jc061my5.jpg)
新增的USBDevice并没有修改已有代码，特殊进行了类型处理的Acuquire方法也是新增加的，没有违反OCP
新增加的Refresh接口并不是新的目标，没有违反SRP
Acquire中，子类和父类已经处于不同的逻辑了，父类抛出异常（？？），但子类没有，违反了LSP

* **违反了LSP**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmfrswij30e607p3zd.jpg)
答案说Person的id已经被Student放弃了，所以看上去二者的toString差不多，但二者的含义已经发生了变化，Student已经不能再以待Person

* **违反了借口可分离原则ISP，应该将Refresh方法从iDevice接口中分离出来，这样PICClient和NetworkClient就不再需要依赖于Refresh方法了**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmg7kcjj309003o0t1.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmh6pvaj30jf0jn77c.jpg)
应该注意到子类继承后对Refresh方法do nothing，则Refresh可分离接口

* **违反了数据与行为相集中原则**：当一个类的方法访问的是另一个类的数据，完全没有用到自己的数据的时候，该方法应该转移到另一个类中，不符合数据与行为相集中的原则
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmi30nwj30jf0gzdhp.jpg)


27题：**组合优于继承原则，只是为了复用代码时，需要两个接口。Stack类包含一个LinkedList对象，然后把具体接口的实现委托给该LisnkedList对象**

![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmijz5pj306o022dfv.jpg)
每次Button被presssed，根据状态调用灯Lamp.turnOn,turnOf，无法实现扩展。**Lamp是具体类，需要扩展时无法满足OCP，应该建立Lamp的接口类。**

尽管两个模块代码各自独立，相互之间没有导入导出，更没有互相调用。两个模块之间存在重复时，会产生重复耦合。


# 判断题
单一职责原则指的是一个类最好只有一个修改的原因，原因可能是承载需求，也可能是实现方面的可变更性


```java
class A{
	private B b;
	//...
	public void f(){
		C c = b.getC();
		c.p(); //此处调用违反demeter法则
	}
}
```


```java
class A{
	private B b;
	//...
	public void f(C c){
		fp();
		b.p();
		c.q();
		D d = new D();
		d.m();
		//此处包含了D的实例化，不违反demeter
	}
	private void fp(){}
}
```

# 简答题
* 有一个销售管理系统阶段性设计类图如下
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmj0o6oj30j8080mzp.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmji9fgj30hf06zjse.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmjxveej30e107ojs9.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmkxxiuj30ci0d03zp.jpg)


* 报童辅助系统的部分设计图
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmlvpinj30dd0393ym.jpg)

```java
class PaperBoy{
	public void getPayment(){
		payment=2.00;
		Wallet theWallet=myCustomer.getWallet();
		if(theWallet.countMoney()>=payment){
			theWallet.subtractMoney(payment);
		}else{
			//come back later and get money
		}
	}
}
```
违反了迪米特法则

```java
class PaperBoy{
//无答案，不知道对不对
	Customer customer;
	public void getCustomer(){
		return customer.getWallet(payment);
	}
	
class Customer{
	Wallet wallet;
	public void getWallet(){
		return wallet.subtracMoney(payment);//调用subtractMoney方法
	}
	
class Wallet{
	public void countMoney(){}
	public void addMoney(){}
	public void subtractmoney(){}
}
```

* 设计图如下
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmmbtz2j30az06x74p.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmmt1e1j30es080myb.jpg)
该方案违反了LSP原则，可以**使用组合代替继承的改进方案**
改进方案类图描述
class Duck has a <<interface>>FlyBehavior
class Duck has a <<interface>>QuarkBehavior
MallardDuck is a Duck
RedHeadDuck is a Duck
BubberDuck is a Duck
class FlyWithWings implements <<interface>>FlyBehavior
class FlyNoWay implements <<interface>>FlyBehavior
class Quark implements<<interface>>QuarkBehavior
class Squark implements<<interface>>QuarkBehavior
通过实现接口类中的公共方法fly()和quark()

* 金融系统的部分设计图
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmnaukkj304309qq3c.jpg)
chequeAccount是信用账户，可以取款debit和还款credit
mortgageAccount是按揭贷款账户，不能取款debit但是可以还款credit，还款credit需要计算利息calculateInterest
**违反了LSP**
修改后的设计
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmo26qpj309e092wex.jpg)

* **违反了接口分离原则**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmopdayj30at0awafb.jpg)
改进后
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmp6pgaj30c60aodlp.jpg)

* **组合优于继承原则**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmpp85rj309207140b.jpg)
在同时是多种子类型的情景下，继承机制是失灵的，但各种不同工作之间关于Person的功能部分又是需要复用的，这是典型的使用组合优于继承原则的场景
解决方案是：**新建类Job，Person聚合Job（基数0..3)，Job有三个子类Manager、Engineer和Salesman**

* **违反了Do not repeat原则**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmr2094j30be08ngne.jpg)
改正方案如下：

```java
//Puzzle code
abstract class Puzzle{
	abstract int tile(int r, int c);
	//...
}
class IntPuzzle extends Puzzle{
	public int tile(int r, int c){}
	//...
}
class ArrayPuzzle extends Puzzle{
	public int tile(int r, int c){}
	//...
}

//Client code
public static void display(Puzzle p){
	for(int r=0; r<3; r++)
		for(int c=0; c<3; c++)
			system.out.printIn(p.tile(r, c));
}
```
IntPuzzle类和ArrayPuzzle类继承抽象类Puzzle，在Puzzle类中有一个抽象公共方法，在不同的子类中实现该方法即可实现多态

