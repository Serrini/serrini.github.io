---
title: OO分析
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
# OO分析
## OO分析单选题
* 下面哪个符号表示异步消息
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybms1e7wj30pq0hgjso.jpg)
    * 2

***

* 有简易顺序图如下
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmt03wej30ar05i749.jpg)
    * 与此一致的类图是：
    ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmth0f2j30za0l2ju7.jpg)
    * 选C

***

* 有简易顺序图如下
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmtudeqj308m05fwee.jpg)
    * 与此一致的类图是：
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmuqpdaj30z909u760.jpg)
    * 选B

***

* 下图中哪一个符号表示正在处理中
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmx93jmj30z90hj77f.jpg)
    * 1是对象、2是生命线、3是执行态
    * 该图没有异步消息

***

* 一个company会做很多project，一个project由一个team执行，team内包括很多employee，这些employee是company的员工，哪一个类图最为合适
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmy092vj30al076dfy.jpg)

***

* 该图描述了**一个领域**
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybmzvhygj30z70td3zg.jpg)
    * 仅从图中的信息出发，对象A的类与对象C的类之间*不应该*存在关联
    * **vii**的箭头表示*返回消息*
    * 该图表达的交互是*串行的*
    * **viii**的虚线表示*对象B已被销毁*
    * **ix**和**x**所关联的柱状体表示*对象B和C拥有控制权，正在执行中*
    * **i**所关联的元素ABC是*三个类的对象*
    * **ii、iii、iv**所关联的箭头表示*同步消息*

***

* 依照类图

![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn0d7tlj30c107fwei.jpg)
* 对象图如下

![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn0tcx9j30g50760t9.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn1dv4rj30k507sdgg.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn1vgxpj30b905ywej.jpg)

***

* 一些person会养animal作为pet，类图是？

![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn27r37j308v02n747.jpg)

***

* 给出对象图，类图是

![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn3nk49j30fm0bedh8.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn43fjdj30ei02uweo.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn4jfptj30dz03aaab.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybn708ycj30e202vaa7.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnanqcaj30dl02idfy.jpg)  
    * 第三个是正确的，别的是错的

***

* 基于以下类图，能否建立一个对象图以表达“翠花”一个girl喜欢“酸菜”boy

![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnc3qisj30df01sglg.jpg)
    * 不可以

***

* 多态机制的一个好处是可以减少
    * ~~关联类中的方法~~
    * ~~分支和判断语句~~
    * ~~需要完成同样功能的子类~~
    * 整个系统的类之间的耦合
    
***

* ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybndhwnkj30z80750tp.jpg)
    * ~~图里共有三个对象~~
    * ~~图里共有四个对象~~
    * ~~图里只有一个类~~
    * 图里有一个匿名对象

***

* 有关类图如下，
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybndx1jtj30e3023jr8.jpg)
* 有boy对象larry喜欢girl对象mindy，对象图如下
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybneekaej30fl01v748.jpg)
* 那么有没有可能boy对象john也喜欢girl对象mindy？
    * 没有，关联的基数限定了只有一个girl对象只有一个boy对象会喜欢

***

* 参照下图，正确的是？
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybney4uuj30n90dvwkw.jpg)
    * CheckingAccount和SavingAccount没有关联
    * CheckingAccount没有balance
    * CheckingAccount不是implements BankAccount，而是继承关系
    * SavingAccount无法processCheck

***

* 一个计划plan是一种特殊类型的文档
* ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnh9mb4j309601k3yc.jpg)

***

* ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnhqctmj30rq0gcwih.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybni6khgj30ih0jb0to.jpg)
    * 两个图信息一样，但下面更好。
    
***

* 小张和小吴分别是一个公司的财务和销售。现在该公司需要开发一个管理系统，需要登记两个人的姓名和联系方式。他们都可以登录系统处理各自业务，但因为财务比较关键，所以小张需要通过专门的授权验证才能使用系统。针对上面的描述，定义他们的抽象类。
    * 用户、财务用户
    
***

* 设计一个动物游戏，鹦鹉parrot和企鹅penguin，他们都有相同的形状（头、身体、翅脚、尾巴），都会鸣叫，其中企鹅penguin不会飞。那么怎样建立抽象类？
    * 鸟（不会飞）、鹦鹉，其中鹦鹉继承鸟，企鹅是鸟的实例对象
    * ~~鸟（会飞）、企鹅，其中企鹅继承鸟，鹦鹉是鸟的实例对象~~ 
    
***

* 对现实世界进行建模时，理想的顺序是
    * ~~抽象并使用类，需要的时候再列举对象~~
    * 先寻找对象，再归纳类
    
***

* 矩形的定义class Rectangle{int width; int height}，正方形的定义class Square{int edgeSize}
    * 正方形不是矩形的一种，所以可以归纳出两个无关的类，正方形square和矩形Rectangle
    
***

* 软件谷学院开设了java程序设计课程，王明老师进行授课，张三和李四两个学生选修了该课程。抽象出正确的类。
    * 学院、课程、老师、学生
    
*** 

* 与下图一致的接口定义是？
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnimirdj30k804f0u0.jpg)

```
class Order{
public OrderLine getLIneItems(Product aProduct);
public void addLineItem(Number amount, Product aProduct);
}
```
***

* 类图如下
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnj3r4kj30km01x0sp.jpg)
    * 一个人可以不被任何公司雇佣
    * ~~可以有一个没有任何员工的公司~~
    * 一个人可以自己雇佣自己

***

* 类图的内容包括
    * 带有参数和结果的操作
    * 属性及其性质
    * 可见性信息
    * 组成关系
    * ~~事件和行为~~
    * 导航信息

***

* 一个多边形有一些有序点组成，是哪种关系类型
    * ~~继承（泛化Generalization）~~
    * ~~关联（Association）~~
    * 聚集（Aggregation）
    * ~~组成（Composition）~~
* 一个类有许多属性
    * 组成关系
* 一个人在一个项目上使用一种计算机语言
    * 关联关系
* 一个文件包含很多记录
    * 组成关系
* 一个吃饭的人拿一个叉子
    * 关联
* 一个文件可以是普通文件或目录文件
    * 继承关系
* 一个国家有一个首都
    * 聚集关系
    
    
## OO分析判断题
    * ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnjjnq2j30pn02kweo.jpg)
        * 一个运动员要么属于NBA团队，要么属于NFL团队，但不能同时属于两个团队
        * 组合关系决定了player只能属于一个团队
        
***

* ~~该类图说明至少会存在一个teenager对象和一个portable audio device对象~~
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnk0a2oj30kv06xmxe.jpg)
* 关联基数所描述的是指定一端类对象与另一端类对象的可能数量关系，但不能用于限定领域中可能存在的类对象数量

***

* 以下的类图表达了人可以拥有狗，为了进一步明确是人拥有狗而不是狗拥有人，作出修改
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnkhvbuj30bk01n3yd.jpg)
    * 错误的是
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnkyuqyj30bl01pmx1.jpg)
    * 这个箭头表示关联的方向
    * 正确的是
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnlfdz1j30bw01rq2t.jpg)
    * 这个箭头表达的是可见性


## OO分析简答题

* 找出顺序图的错误并修正
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnm0v18j30p60npwof.jpg)
    * 如果需要返回消息，addStudent不应该是异步消息，应该是同步
    * Queue只能返回给Section，Section再返回给Register
    * 最终修改应该是addStudent和getSize都是同步消息，Queue给Section返回size，然后Section再向Register返回size

***

* 一个银行贷款申请的流程如下，建立系统顺序图描述。分析系统顺序图，说明该流程存在哪些问题，并一一修正。
    1. 申请人通过互联网完成并向银行提交贷款申请
    2. 该系统验证贷款申请的信息，检查是否正确和完整
    3. 该系统将贷款请求转交外部信贷局，以获得申请人的信用报告
    4. 该系统根据返回的信用报告计算申请人的信用评分
    
    ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnmd6boj30m30e3glz.jpg)
    
    * 用户的刺激没有得到响应
    * 验证正确和完整性后没有分支处理
    * 计算信用评分后没有完成整个流程

***

* 下面是一个售货机的使用流程
    1. 顾客输入商品码选择商品
    2. 系统显示该商品是否有货
    3. 顾客投币
    4. 系统提示已投金额重复3-4步,直到所投费用超出商品价格
    5. 顾客确认购买
    6. 系统给顾客提供商品
    7. 顾客检查商品,无误后离开
    
    * 扩展流程
    * 2a 如果商品无货
        * (1)系统通知管理员补货
        * (2)管理员确认得到消息
    * 5a 顾客取消购买
        * (1)系统退还钱款
    * 7a 商品有误
    * (1)顾客联系管理员请求帮助
    * (2)管理员告知登记码
    * (3)顾客在系统中登记,等待后续人工处理
* ![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnoes4qj30yz0u0whj.jpg)

***

* 下面的图中存在哪些错误，请找出并改正
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnp88voj30fa0czt97.jpg)
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnq8h2sj30kp0dfwfa.jpg)

***

* 下面的顺序图存在错误，请找出并改正
![](https://tva1.sinaimg.cn/large/0082zybpgy1gbybnr130xj30jt0ecdg2.jpg)

***


