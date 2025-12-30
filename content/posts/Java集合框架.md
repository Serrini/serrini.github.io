---
title: Java集合框架
date: '2020-03-08'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- Java
categories:
- Java
---
# Java集合框架

## List,Set,Map三者的区别
* List：List接口存储一组不唯一（可以有多个元素引用相同的对象）、**有序**的对象
* Set：**不允许重复**的集合。不会有多个元素引用相同的对象
* Map：使用**键值对存储**。两个Key可以引用相同的对象，但**Key不能重复**，典型的Key是String类型，但也可以是任何对象

## Arraylist 与 LinkedList 区别
* **是否保证线程安全**：
	* ArrayList 和 LinkedList 都是不同步的，也就是**不保证线程安全**
	
* **底层数据结构**：
	* Arraylist 底层使用的是 **Object 数组**
	* LinkedList 底层使用的是 **双向链表** 数据结构（JDK1.6之前为循环链表，JDK1.7取消了循环）
	
* **插入和删除是否受元素位置的影响**：
	* **ArrayList 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响**
	* 执行add(E e) 方法的时候， ArrayList 会默认在将指定的元素**追加到此列表的末尾**，这种情况时间复杂度就是O(1)。但是如果要在**指定位置 i 插入和删除元素**的话（add(int index, E element) ）时间复杂度就为 **O(n-i)**。因为在进行上述操作的时候集合中第 i 和第 i 个元素之后的**(n-i)个元素都要执行向后位/向前移一位的操作**
	* **LinkedList 采用链表存储**，所以对于add(E e)方法的插入，删除元素时间复杂度不受元素位置的影响，近似 O（1），如果是要**在指定位置i插入和删除元素**的话（(add(int index, E element)） **时间复杂度近似为o(n)**)因为需要**先移动到指定位置再插入**
	
* **是否支持快速随机访问**：
	* LinkedList 不支持高效的随机元素访问
	* **ArrayList 支持**。**快速随机访问就是通过元素的序号快速获取元素对象(对应于get(int index) 方法)**
	
* **内存空间占用**：
	* ArrayList的空间浪费主要体现在在**list列表的结尾会预留一定的容量空间**
	* LinkedList的空间花费则体现在它的**每一个元素都需要消耗比ArrayList更多的空间**（因为要**存放直接后继和直接前驱以及数据**）

## ArrayList 与 Vector 区别，为什么要用Arraylist取代Vector
* **Vector类的所有方法都是同步的**。**可以由两个线程安全地访问一个Vector对象**，但是一个线程访问Vector的话代码要在同步操作上**耗费大量的时间**
* **Arraylist不是同步的**，所以在**不需要保证线程安全时建议使用Arraylist**


## HashMap 和 Hashtable 的区别
* 线程是否安全：
	* **HashMap 是非线程安全的**，HashTable 是线程安全的
	* HashTable 内部的方法基本都经过 synchronized 修饰（保证线程安全就使用**ConcurrentHashMap**）
	
* 效率：
	* 因为线程安全的问题，HashMap 要比 HashTable 效率高一点
	* 另外，HashTable 基本被淘汰，不要在代码中使用它

* 对Null key 和Null value的支持：
	* **HashMap 中，null 可以作为键，这样的键只有一个**，可以有一个或多个键所对应的值为 null
	* 但是在 HashTable 中 put 进的键值只要有一个 null，直接抛出 NullPointerException
	
* 初始容量大小和每次扩充容量大小的不同：
	* 创建时如果不指定容量初始值，**Hashtable 默认的初始大小为11**，之后每次扩充，**容量变为原来的2n+1**
	* **HashMap 默认的初始化大小为16**。之后每次扩充，**容量变为原来的2倍**
	* 创建时如果给定了容量初始值，那么 Hashtable 会直接使用你给定的大小，**而 HashMap 会将其扩充为2的幂次方大小**，也就是说 **HashMap 总是使用2的幂作为哈希表的大小**
	
* 底层数据结构：
	* JDK1.8 以后的 HashMap 在解决哈希冲突时有了较大的变化，当链表长度**大于阈值（默认为8）**时，将**链表转化为红黑树**，以减少搜索时间

## HashMap 和 HashSet区别

HashMap | HashSet
------- | -------
实现了Map接口 | 实现Set接口
存储键值对 | 仅存储对象
put()方法向map中添加元素 | add()方法向Set中添加元素
使用key计算HashCode | 使用成员对象来计算HashCode

**对于两个对象来说HashCode可能相同，所以equals()方法用来判断对象是否相等。**

## HashMap 的长度为什么是2的幂次方
* 这个数组下标的计算方法是`(n - 1) & hash`
* 取余(%)操作中如果除数是2的幂次则等价于与其除数减一的与(&)操作（也就是说 **hash%length==hash&(length-1)**的前提是 **length 是2的 n 次方**）
* 采用二进制位操作&，相对于%能够提高运算效率，这就解释了 HashMap 的长度为什么是2的幂次方

## ConcurrentHashMap 和 Hashtable 的区别
**ConcurrentHashMap 和 Hashtable 的区别主要体现在实现线程安全的方式上不同。**

* 底层数据结构：
	* JDK1.7的 **ConcurrentHashMap** 底层采用 **分段的数组+链表** 实现，JDK1.8 采用的数据结构跟 HashMap1.8 的结构一样，**数组+链表/红黑二叉树**
	* **Hashtable** 和 JDK1.8 之前的 HashMap 的底层数据结构类似都是采用 **数组+链表** 的形式，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的
	
* 实现线程安全的方式（重要）：
	* 在JDK1.7的时候，**ConcurrentHashMap（分段锁）**对整个桶数组进行了**分割分段(Segment)**，每一把锁只锁容器其中一部分数据，**多线程访问容器里不同数据段的数据，就不会存在锁竞争，提高并发访问率**。到了 JDK1.8 的时候已经摒弃了Segment的概念，而是直接用 **Node 数组+链表+红黑树** 的数据结构来实现，并发控制使用 **synchronized 和 CAS** 来操作。（JDK1.6以后 对 synchronized锁做了很多优化） 整个看起来就像是优化过且线程安全的 HashMap，虽然在JDK1.8中还能看到 Segment 的数据结构，但是已经简化了属性，只是为了兼容旧版本
	* **Hashtable(同一把锁) **:使用 **synchronized 来保证线程安全，效率非常低下**。当一个线程访问同步方法时，其他线程也访问同步方法，可能会进入阻塞或轮询状态，如使用 put 添加元素，另一个线程不能使用 put 添加元素，也不能使用 get，竞争会越来越激烈效率越低


## HashMap 、 Hashtable 和 ConcurrentHashMap 的区别
* HashMap是**线程不安全的**，并发环境下危险
* **HashTable和HashMap的实现原理几乎一样**
	* HashTable**不允许key和value为null**
	* HashTable**是线程安全的**，**但是HashTable线程安全的策略实现代价却太大了**。get/put所有相关操作都是**synchronized**的，这相当于**给整个哈希表加了一把大锁**，多线程访问时候，只要有一个线程访问或操作该对象，那其他线程只能阻塞，**相当于将所有的操作串行化**，在竞争激烈的并发场景中性能就会非常差。
* 如果容器中有多把锁，每一把锁锁一段数据，这样在多线程访问时不同段的数据时，就不会存在锁竞争了，这样便可以有效地提高并发效率，这就是**ConcurrentHashMap**所采用的**"分段锁"**思想

**以上转载自[JavaGuide](https://gitee.com/SnailClimb/JavaGuide/blob/master/docs/java/collection/Java%E9%9B%86%E5%90%88%E6%A1%86%E6%9E%B6%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95%E9%A2%98.md)**

