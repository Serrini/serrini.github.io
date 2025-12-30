---
title: Java集合类：HashMap（基于JDK1.8）
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
# 散列函数

## 散列函数处理冲突的方法

### 开放地址法

**所谓开放地址法，即可存放新表项的空闲地址既向他的同义词表项开放，又向他的非同义词表项开放。**

取定某一增量序列后，处理方法是确定的。

* 线性探测法
	* d=0，1，2，···，m-1 
	* 线性查看下一个单元，容易导致聚集
* 平方探测法
	* d=0^2,1^2,-1^2,2^2,-2^2,···，k^2,-k^2,
	* 又称二次探测法
	* 缺点是不能探测到散列表上的所有单元，但至少能探测到一半单元
* 再散列法
* 伪随机序列法

在开放定址的情形下，不能随便物理删除表中已有元素，因为若删除元素就会阶段其他具有相同散列地址的元素的查找地址。若要删除一个元素，给他做一个删除标记，进行逻辑删除。副作用是在执行多次删除后，表面上看起来散列表很满，实际上有很多的位置没有利用，因此需要定期维护散列表，要把删除标记的元素的物理删除。

### 拉链法 （chaining）

**为了避免非同义词发生冲突，可以把所有的同义词存储在一个线性链表中，这个线性链表由其散列地址唯一标识。拉链法适用于经常进行插入和删除的情况。**

## 散列性能分析

散列表的查找效率取决于三个因素：散列函数、处理冲突的方法和装填因子。

装填因子定义为一个表的装满程度

a = 表中记录数n / 散列表长度m


# Java中的HashMap

**以下转载自[美团技术团队——Java 8系列之重新认识HashMap](https://zhuanlan.zhihu.com/p/21673805**)**



* JDK1.8对HashMap底层的实现进行了优化，例如引入红黑树的数据结构和扩容的优化。
* Java中的接口java.util.Map，有四个常用的实现类，HashMap、Hashtable、LinkedHashMap和TreeMap。
* HashMao非线程安全，即任一时刻可以有多个线程同时写HashMap，可能会导致数据的不一致，如果需要满足线程安全，可以用Collections的synchronizedMap方法使HashMap具有线程安全的能力，或者使用ConcurrentHashMap。
* HashMap就是使用哈希表来存储的。哈希表为解决冲突，可以采用开放地址法和链地址法等来解决问题，Java中HashMap采用了链地址法。

## 存储结构-字段


![](https://tva1.sinaimg.cn/large/00831rSTgy1gcml0cnv2uj30qy0ket9y.jpg)

```java
static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;    //用来定位数组索引位置
        final K key;
        V value;
        Node<K,V> next;   //链表的下一个node

        Node(int hash, K key, V value, Node<K,V> next) { ... }
        public final K getKey(){ ... }
        public final V getValue() { ... }
        public final String toString() { ... }
        public final int hashCode() { ... }
        public final V setValue(V newValue) { ... }
        public final boolean equals(Object o) { ... }
}

```

**Node[] table，即哈希桶数组，明显它是一个Node的数组。Node是HashMap的一个内部类，实现了Map.Entry接口。**

**HashMap的几个字段**：从HashMap的**默认构造函数源码**可知，构造函数就是对下面几个字段进行初始化，源码如下：

```java
int threshold;             // 所能容纳的key-value对极限 
final float loadFactor;    // 负载因子
int modCount;  
int size;
```


首先，**Node[] table**的初始化长度**length(默认值是16)**，**Load factor为负载因子(默认值是0.75)**，**threshold是HashMap所能容纳的最大数据量的Node(键值对)个数**。**threshold = length * Load factor**。也就是说，在数组定义好长度之后，负载因子越大，所能容纳的键值对个数越多。

结合负载因子的定义公式可知，**threshold**就是在此Load factor和length(数组长度)对应下允许的最大元素数目，超过这个数目就重新**resize(扩容)**，扩容后的HashMap容量是之前容量的**两倍**。默认的负载因子**0.75**是对空间和时间效率的一个平衡选择，建议大家不要修改，除非在时间和空间比较特殊的情况下。

* 如果内存空间很多而又对时间效率要求很高，可以降低负载因子Load factor的值
* 相反，如果内存空间紧张而对时间效率要求不高，可以增加负载因子loadFactor的值，这个值可以大于1

**size**这个字段其实很好理解，就是**HashMap中实际存在的键值对数量**。注意和table的长度length、容纳最大键值对数量threshold的区别。而**modCount字段**主要用来记录**HashMap内部结构发生变化的次数**，主要**用于迭代的快速失败**。强调一点，内部结构发生变化指的是结构发生变化，例如put新键值对，但是某个key对应的value值被覆盖不属于结构变化。

在HashMap中，**哈希桶数组table的长度length大小必须为2的n次方**(一定是合数)，这是一种**非常规的设计**，常规的设计是把桶的大小设计为素数。相对来说素数导致冲突的概率要小于合数，具体证明可以参考http://blog.csdn.net/liuqiyao_01/article/details/14475159，Hashtable 初始化桶大小为11，就是桶大小设计为素数的应用（Hashtable扩容后不能保证还是素数）。**HashMap采用这种非常规设计，主要是为了在取模和扩容时做优化，同时为了减少冲突，HashMap定位哈希桶索引位置时，也加入了高位参与运算的过程。**

这里存在一个问题，即使负载因子和Hash算法设计的再合理，也免不了会出现拉链过长的情况，**一旦出现拉链过长，则会严重影响HashMap的性能**。于是，在**JDK1.8**版本中，对数据结构做了进一步的优化，**引入了红黑树**。而当链表长度太长（默认超过8）时，链表就转换为红黑树，**利用红黑树快速增删改查的特点提高HashMap的性能**，其中会用到红黑树的插入、删除、查找等算法。本文不再对红黑树展开讨论，想了解更多红黑树数据结构的工作原理可以参考http://blog.csdn.net/v_july_v/article/details/6105630 。

## 功能实现-方法

### 根据key获取哈希桶数组索引位置

```java
方法一：
static final int hash(Object key) {   //jdk1.8 & jdk1.7
     int h;
     // h = key.hashCode() 为第一步 取hashCode值
     // h ^ (h >>> 16)  为第二步 高位参与运算
     return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
方法二：
static int indexFor(int h, int length) {  //jdk1.7的源码，jdk1.8没有这个方法，但是实现原理一样的
     return h & (length-1);  //第三步 取模运算
}
```

这里的Hash算法本质上就是三步：**取key的hashCode值、高位运算、取模运算**。

对于任意给定的对象，只要它的hashCode()返回值相同，那么程序调用方法一所计算得到的Hash码值总是相同的。我们首先想到的就是把hash值对数组长度取模运算，这样一来，元素的分布相对来说是比较均匀的。但是，模运算的消耗还是比较大的，**在HashMap中是这样做的：调用方法二来计算该对象应该保存在table数组的哪个索引处**。

这个方法非常巧妙，它通过**h & (table.length -1)**来得到该对象的保存位，而**HashMap底层数组的长度总是2的n次方**，这是HashMap在速度上的优化。当length总是2的n次方时，**h& (length-1)运算等价于对length取模**，也就是h%length，但是&比%具有更高的效率。
*（由于位运算直接对内存数据进行操作，不需要转成十进制，因此处理速度非常快。）*

在JDK1.8的实现中，优化了高位运算的算法，通过hashCode()的高16位异或低16位实现的：(h = k.hashCode()) ^ (h >>> 16)，主要是从速度、功效、质量来考虑的，这么做可以在数组table的length比较小的时候，也能保证考虑到高低Bit都参与到Hash的计算中，同时不会有太大的开销。

下面举例说明下，n为table的长度。

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmlggbzkzj30k00bfwgw.jpg)


### put方法的详细执行

1. 判断键值对数组table[i]是否为空，否则执行resize()进行扩容
2. 根据key计算hash值的插入的数组索引i，如果table[i]==null，直接新建节点添加，转向4，如果不为空，转向3
3. 判断table[i]的首个元素是否和key一样，相同则直接覆盖value，否则转向4
4. 判断table[i]是否为treeNode，即table[i]是否是红黑树，如果是红黑树，直接插入键值对，否则转向5
5. 遍历table[i]，判断链表长度是否大于8，大于8则将链表转换为红黑树，在红黑树中插入，否则进行链表的插入；遍历过程中如果发现key已经存在直接覆盖value
6. 插入成功后，判断实际存在的键值对数量size是否超出了最大容量threshold，超出则resize()

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmlu1waptj311v0u0q9q.jpg)

JDK1.8 HashMap的put方法源码


```java
public V put(K key, V value) {
      // 对key的hashCode()做hash
      return putVal(hash(key), key, value, false, true);
  }
  
  final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                 boolean evict) {
      Node<K,V>[] tab; Node<K,V> p; int n, i;
      // 步骤①：tab为空则创建
     if ((tab = table) == null || (n = tab.length) == 0)
         n = (tab = resize()).length;
     // 步骤②：计算index，并对null做处理 
     if ((p = tab[i = (n - 1) & hash]) == null) 
         tab[i] = newNode(hash, key, value, null);
     else {
         Node<K,V> e; K k;
         // 步骤③：节点key存在，直接覆盖value
         if (p.hash == hash &&
             ((k = p.key) == key || (key != null && key.equals(k))))
             e = p;
         // 步骤④：判断该链为红黑树
         else if (p instanceof TreeNode)
             e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
         // 步骤⑤：该链为链表
         else {
             for (int binCount = 0; ; ++binCount) {
                 if ((e = p.next) == null) {
                     p.next = newNode(hash, key,value,null);
                        //链表长度大于8转换为红黑树进行处理
                     if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st  
                         treeifyBin(tab, hash);
                     break;
                 }
                    // key已经存在直接覆盖value
                 if (e.hash == hash &&
                     ((k = e.key) == key || (key != null && key.equals(k))))                                          break;
                 p = e;
             }
         }
         
         if (e != null) { // existing mapping for key
             V oldValue = e.value;
             if (!onlyIfAbsent || oldValue == null)
                 e.value = value;
             afterNodeAccess(e);
             return oldValue;
         }
     }

     ++modCount;
     // 步骤⑥：超过最大容量 就扩容
     if (++size > threshold)
         resize();
     afterNodeInsertion(evict);
     return null;
 }

```


### 扩容过程

扩容(resize)就是**重新计算容量，向HashMap对象里不停的添加元素**，而**HashMap对象内部的数组无法装载更多的元素时，对象就需要扩大数组的长度，以便能装入更多的元素**。当然Java里的数组**是无法自动扩容**的，方法是**使用一个新的数组代替已有的容量小的数组**，就像我们用一个小桶装水，如果想装更多的水，就得换大水桶。

#### resize源码（JDK1.7）

```java
 void resize(int newCapacity) {   //传入新的容量
      Entry[] oldTable = table;    //引用扩容前的Entry数组
      int oldCapacity = oldTable.length;         
      if (oldCapacity == MAXIMUM_CAPACITY) {  //扩容前的数组大小如果已经达到最大(2^30)了
          threshold = Integer.MAX_VALUE; //修改阈值为int的最大值(2^31-1)，这样以后就不会扩容了
          return;
      }
   
      Entry[] newTable = new Entry[newCapacity];  //初始化一个新的Entry数组
     transfer(newTable);                         //！！将数据转移到新的Entry数组里
     table = newTable;                           //HashMap的table属性引用新的Entry数组
     threshold = (int)(newCapacity * loadFactor);//修改阈值
 }
```

**transfer()方法将原有Entry数组的元素拷贝到新的Entry数组里。**


```java
void transfer(Entry[] newTable) {
      Entry[] src = table;                   //src引用了旧的Entry数组
      int newCapacity = newTable.length;
      for (int j = 0; j < src.length; j++) { //遍历旧的Entry数组
          Entry<K,V> e = src[j];             //取得旧Entry数组的每个元素
          if (e != null) {
              src[j] = null;//释放旧Entry数组的对象引用（for循环后，旧的Entry数组不再引用任何对象）
              do {
                  Entry<K,V> next = e.next;
                 int i = indexFor(e.hash, newCapacity); //！！重新计算每个元素在数组中的位置
                 e.next = newTable[i]; //标记[1]
                 newTable[i] = e;      //将元素放在数组上
                 e = next;             //访问下一个Entry链上的元素
             } while (e != null);
         }
     }
 }

```

newTable[i]的引用赋给了e.next，也就是**使用了单链表的头插入方式**，同一位置上**新元素总会被放在链表的头部位置**；这样先放在一个索引上的元素终会被放到Entry链的尾部(如果发生了hash冲突的话），**这一点和Jdk1.8有区别**。在旧数组中同一条Entry链上的元素，通过重新计算索引位置后，有可能被放到了新数组的不同位置上。


#### JDK1.7

下面举个例子说明下扩容过程。假设了我们的hash算法就是简单的用key mod 一下表的大小（也就是数组的长度）。其中的哈希桶数组**table的size=2**， 所以key = 3、7、5，put顺序依次为 5、7、3。在mod 2以后都冲突在table[1]这里了。这里假设**负载因子 loadFactor=1**，**即当键值对的实际大小size 大于 table的实际大小时进行扩容**。接下来的三个步骤是哈希桶数组 **resize成4**，然后所有的Node重新rehash的过程。



![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmlu7o5oxj31120pqjuk.jpg)

#### JDK1.8做的优化

**我们使用的是2次幂的扩展(指长度扩为原来2倍)，所以，元素的位置要么是在原位置，要么是在原位置再移动2次幂的位置。**

n为table的长度，图（a）表示扩容前的key1和key2两种key确定索引位置的示例，图（b）表示扩容后key1和key2两种key确定索引位置的示例，其中hash1是key1对应的哈希与高位运算结果。

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmm22ebqsj319c0cejts.jpg)

元素在重新计算hash之后，因为n变为2倍，那么n-1的mask范围在高位多1bit(红色)，因此新的index就会发生这样的变化：

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmm23mxlvj30tk05mq38.jpg)

因此，我们在扩充HashMap的时候，不需要像JDK1.7的实现那样重新计算hash，只需要看看原来的hash值新增的那个bit是1还是0就好了，是0的话索引没变，是1的话索引变成“原索引+oldCap”，可以看看下图为16扩充为32的resize示意图：

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmm371xfrj30k00bjjtk.jpg)

这个设计确实非常的巧妙，既省去了重新计算hash值的时间，而且同时，由于新增的1bit是0还是1可以认为是随机的，因此resize的过程，均匀的把之前的冲突的节点分散到新的bucket了。这一块就是JDK1.8新增的优化点。有一点注意区别，**JDK1.7中rehash的时候，旧链表迁移新链表的时候，如果在新表的数组索引位置相同，则链表元素会倒置，但是从上图可以看出，JDK1.8不会倒置。**


## 线程安全性

在多线程使用场景中，应该尽量避免使用线程不安全的HashMap，而使用线程安全的ConcurrentHashMap。下面举例子说明**在并发的多线程使用场景中使用HashMap可能造成死循环**。代码例子如下(便于理解，仍然使用JDK1.7的环境)：


```java
public class HashMapInfiniteLoop {  

    private static HashMap<Integer,String> map = new HashMap<Integer,String>(2，0.75f);  
    public static void main(String[] args) {  
        map.put(5， "C");  

        new Thread("Thread1") {  
            public void run() {  
                map.put(7, "B");  
                System.out.println(map);  
            };  
        }.start();  
        new Thread("Thread2") {  
            public void run() {  
                map.put(3, "A);  
                System.out.println(map);  
            };  
        }.start();        
    }  
}

```

其中，**map初始化为一个长度为2的数组，loadFactor=0.75**，threshold=2*0.75=1，也就是说当put第二个key的时候，map就需要进行resize。

通过设置断点让线程1和线程2同时debug到**transfer方法**的首行。注意此时两个线程已经成功添加数据。放开thread1的断点至transfer方法的“Entry next = e.next;” 这一行；然后放开线程2的的断点，**让线程2进行resize**。结果如下图。

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmmhmjfotj312k0hgq4z.jpg)

注意，Thread1的 e 指向了key(3)，而next指向了key(7)，其在线程二rehash后，指向了线程二重组后的链表。

线程一被调度回来执行，先是执行 newTalbe[i] = e， 然后是e = next，导致了e指向了key(7)，而下一次循环的next = e.next导致了next指向了key(3)。

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmmimz8vrj30k007kq3l.jpg)

e.next = newTable[i] 导致 key(3).next 指向了 key(7)。注意：此时的key(7).next 已经指向了key(3)， **环形链表**就这样出现了。

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcmminesahj30k006zwf4.jpg)

于是，当我们用**线程一调用map.get(11)**时，悲剧就出现了——Infinite Loop。

## 小结

* 扩容是一个特别耗性能的操作，所以当程序员在使用HashMap的时候，估算map的大小，初始化的时候给一个大致的数值，避免map进行频繁的扩容。
* 负载因子是可以修改的，也可以大于1，但是建议不要轻易修改，除非情况非常特殊。
* HashMap是线程不安全的，不要在并发的环境中同时操作HashMap，建议使用ConcurrentHashMap。
* JDK1.8引入红黑树大程度优化了HashMap的性能。




