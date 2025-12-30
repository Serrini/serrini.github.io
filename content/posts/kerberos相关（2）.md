---
title: kerberos相关（2）
date: '2022-03-28'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- kerberos
categories:
- Security
---
# 流程

## 创建用户名为test的Principal
kadmin创建一个用户test，之后可以用密码登录，如果不想记住密码可以用keytab文件登录。（也可以不设置密码，-randkey随机生成一个）
kadmin在kdc服务器上可以是kadmin.local，如果是kerberos客户端就是kadmin。

```addprinc -pw 123456 test```
```ktadd -k /root/user.keytab test```

## 创建TGT
创建TGT需要在hive客户端
### 方式一：账号密码登录

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0jse888ssj20dx04hmxe.jpg)

### 方式二：用户keytab文件登录

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0jsglhx8uj20do03wdg1.jpg)

## 访问hive

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0jt9b68z9j20iv0fd40s.jpg)



# 示意图

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0jxyt9yybj21200u0n2h.jpg)



# 审计需要的keytab文件

审计系统需要的keytab文件是server的keytab文件，是需要保存在配置文件hive_site.xml指定的位置，hdfs/spark等同理。里面相当于是server端的密码，可以指定也可以随机生成，这个跟集群配置有关。

用户登录认证有两种方式，```kinit sl```(密码登录)或者是```kinit -kt user.keytab sl```（用户keytab文件登录），不管怎样，klist回显的信息，表示TGT创建成功了，这时候的principal表示是用哪个用户登录的。

如果我们拿到的是user.keytab，里面相当于存的是client的密码，是没法解密的。



优点：

Kerberos实际上就是使用对称秘钥，比使用公钥操作的SSL性能更好；所有的用户/服务密钥存在KDC的数据库里，可以认为是一个集中管理平台，如果想要删除一个用户，直接在KDC中删除该用户即可。





# Hive相关

文档：https://hive.apache.org/

hive.server2.authentication

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0kzeokkbrj20ux0d90uz.jpg)

hive.server2.thrift.sasl.qop 

![hive.server2.thrift.sasl.qop ](https://tva1.sinaimg.cn/large/e6c9d24ely1h0kzf0iggrj20u503xmy2.jpg)





#Kerberos的黄金票据/白银票据



## Golden Ticket 
不用as_req/as_rep，伪造的TGT，通常的TGT都是由TGS加密过的（涉及到krbtgt账户），黄金票据就是伪造的TGT，作为tgs_req的一部分被发送，以获取 serverticket。被krbtgt账户密钥加密过的TGT可以被域中任意kdc解密，但是client/server都不行。

> krbtgt账户：每个域控制器都有一个 `krbtgt`的用户账户，是 KDC的服务账户，用来创建票据授予服务(TGS)加密的密钥



## Silver Tickets

......

