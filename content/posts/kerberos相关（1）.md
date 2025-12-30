---
title: kerberos相关（1）
date: '2022-03-16'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- kerberos
categories:
- Security
---
# 背景

| namenode节点 | hadoop00 | 172.20.0.2 |
| ------------ | -------- | ---------- |
| datanode节点 | hadoop01 | 172.20.0.3 |
| datanode节点 | hadoop02 | 172.20.0.4 |

# kdc 服务器涉及到三个配置文件：

```
/etc/krb5.conf
/var/kerberos/krb5kdc/kdc.conf
/var/kerberos/krb5kdc/kadm5.acl
```

## 1. /etc/krb5.conf
```
# To opt out of the system crypto-policies configuration of krb5, remove the
# symlink at /etc/krb5.conf.d/crypto-policies which will not be recreated.
includedir /etc/krb5.conf.d/

[logging]
    default = FILE:/var/log/krb5libs.log
    kdc = FILE:/var/log/krb5kdc.log
    admin_server = FILE:/var/log/kadmind.log

[libdefaults]
    dns_lookup_realm = false
    ticket_lifetime = 24h
    renew_lifetime = 7d
    forwardable = true
    rdns = false
    pkinit_anchors = FILE:/etc/pki/tls/certs/ca-bundle.crt
    spake_preauth_groups = edwards25519
    default_realm = EXAMPLE.COM
#    default_ccache_name = KEYRING:persistent:%{uid}
    udp_preference_limit = 1
[realms]
EXAMPLE.COM = {
    kdc = hadoop00:88
    admin_server = hadoop00:789
}

[domain_realm]
.example.com = EXAMPLE.COM
example.com = EXAMPLE.COM
```

说明：

* udp_preference_limit：禁止使用 udp 
* realms：域，可以认为是namespace命名空间，一般大写，比如EXAMPLE.COM
  * kdc：hostname:port
  * admin_server：hostname:port
* ticket_lifetime：表明凭证生效的时限，一般为24小时
* renew_lifetime：表明凭证最长可以被延期的时限，一般为一周。当凭证过期之后，对安全认证的服务的后续访问则会失败。



## 2. /var/kerberos/krb5kdc/kdc.conf

```
[kdcdefaults]
    kdc_ports = 88
    kdc_tcp_ports = 88
    spake_preauth_kdc_challenge = edwards25519

[realms]
EXAMPLE.COM = {
     #master_key_type = aes256-cts
     acl_file = /var/kerberos/krb5kdc/kadm5.acl
     dict_file = /usr/share/dict/words
     admin_keytab = /var/kerberos/krb5kdc/kadm5.keytab
     supported_enctypes = aes256-cts:normal aes128-cts:normal arcfour-hmac:normal camellia256-cts:normal camellia128-cts:normal
}
```

说明：

* supported_enctypes：指定此领域的默认主体的键/盐组合，通过kadmin创建的任何主体都将具有这些类型的密钥。

* master_key_type：指定主密钥的密钥类型，默认值为aes256-cts-hmac-sha1-96，也是我们目前支持解析的加密套件。
	
	* > 虽然所有 Kerberos 操作都支持aes128-cts和aes256-cts ，但我们
	  >
	  > 的 GSSAPI 实现的非常旧版本（krb5-1.3.1 和更早版本）不支持它们。运行不支持 AES 的 krb5 版本的服务不得在 KDC 数据库中获得这些加密类型的密钥。
  >
	  > from: https://web.mit.edu/kerberos/krb5-latest/doc/admin/conf_files/kdc_conf.html#encryption-types
	
* acl_file：标注了admin的用户权限，默认是admin用户拥有所有权限。
  



## 3. /var/kerberos/krb5kdc/kadm5.acl

* ```*/admin@EXAMPLE.COM	*``` 名称匹配上```*/admin@EXAMPLE.COM```的用户都认为是admin用户，权限是*代表全部权限。

# kerberos数据库

## **kdb5_util**

```
[root@hadoop00 krb5kdc]# kdb5_util list_mkeys
Master keys for Principal: K/M@EXAMPLE.COM
KVNO: 1, Enctype: aes256-cts-hmac-sha1-96, Active on: Thu Jan 01 08:00:00 CST 1970 *
```

## 如何创建数据库：

kdb5_util -r EXAMPLE.COM create -s

需要记住输入的密码，默认使用db2数据库。

数据库创建好之后，在/var/kerberos/krb5kdc目录下可以看到principal的相关文件。

## 如何管理数据库

有kadmin.local和kadmin，kadmin.local是必须在KDC所在的机器上执行，这里kdc装在hadoop00主机上；对于kerberos的客户端机器访问，需要输入创建数据库时的密码。


## 使用**kadmind**和**krb5kdc**程序启动Kerberos服务

### 启动kadmin：

```
systemctl status kadmin
```

```
systemctl enable kadmin
```

### 启动krb5kdc:

```
systemctl status kadmin
```

```
systemctl enable krb5kdc
```



### 如何创建一个hadoop服务主体：addprinc

princepal：认证的主体

```
kadmin.local
kadmin.local:  addprinc -randkey hive/hadoop00@EXAMPLE.COM
No policy specified for hive/hadoop00@EXAMPLE.COM; defaulting to no policy
Principal "hive/hadoop00@EXAMPLE.COM" created.
kadmin.local:
kadmin.local:  listprincs
K/M@EXAMPLE.COM
hive/hadoop00@EXAMPLE.COM
hive/hadoop00@HIVE.COM
kadmin/admin@EXAMPLE.COM
kadmin/changepw@EXAMPLE.COM
kadmin/hadoop00@EXAMPLE.COM
kiprop/hadoop00@EXAMPLE.COM
krbtest/admin@EXAMPLE.COM
krbtgt/EXAMPLE.COM@EXAMPLE.COM
root/admin@EXAMPLE.COM
root/hadoop00@EXAMPLE.COM
root/hadoop00@HIVE.COM
root/hadoop01@EXAMPLE.COM
root/hadoop02@EXAMPLE.COM
kadmin.local:
```

### 查看创建的实体：getprinc
```
kadmin.local:  getprinc root/hadoop00@EXAMPLE.COM
Principal: root/hadoop00@EXAMPLE.COM
Expiration date: [never]
Last password change: Mon Nov 29 10:24:08 CST 2021
Password expiration date: [never]
Maximum ticket life: 1 day 00:00:00
Maximum renewable life: 0 days 00:00:01
Last modified: Fri Feb 25 10:25:45 CST 2022 (root/admin@EXAMPLE.COM)
Last successful authentication: [never]
Last failed authentication: [never]
Failed password attempts: 0
Number of keys: 5
Key: vno 3, aes256-cts-hmac-sha1-96
Key: vno 3, aes128-cts-hmac-sha1-96
Key: vno 3, DEPRECATED:arcfour-hmac
Key: vno 3, camellia256-cts-cmac
Key: vno 3, camellia128-cts-cmac
MKey: vno 1
Attributes:
Policy: [none]
```

输入？，可以查看帮助。

# 流程

## 1、先创建一个管理员主体（principal），用户主体（UPN）

```addprinc root/admin```

输入两遍密码，记住密码

## 2、创建服务主体（principal），服务主体（SPN）
```addprinc -randkey hive/hadoop00```

```addprinc -randkey spark/hadoop01```

-randkey参数：随机生成一个值作为principal的key

-pw参数：设置密码

需要为集群中的每个服务/守护程序（如hdfs、yarn），创建一个服务主体，还必须为组件服务(如hive)创建服务主体。在hadoop00机器上的hive服务可以叫hive/hadoop00，在hadoop01机器上的spark服务可以叫spark/hadoop01，创建SPN的时候格式一定是有三部分，即hive/hadoop00@EXAMPLE.COM，默认的realm（域）是EXAMPLE.COM，所以可以省略。

```shell
[root@hadoop00 /]# beeline
Beeline version 3.1.0 by Apache Hive
beeline> !connect jdbc:hive2://hadoop00:10002/default;principal=sl@EXAMPLE.COM
Connecting to jdbc:hive2://hadoop00:10002/default;principal=sl@EXAMPLE.COM
22/03/23 10:38:24 [main]: WARN jdbc.HiveConnection: Failed to connect to hadoop00:10002
Error: Could not open client transport with JDBC Uri: jdbc:hive2://hadoop00:10002/default;principal=sl@EXAMPLE.COM: Kerberos principal should have 3 parts: sl@EXAMPLE.COM (state=08S01,code=0)
beeline>
```


每个服务主体都需要一个keytab文件来存储其密码。keytab文件包含主体principal和根据其密码派生的加密密钥对。**用户主体UPN可以直接kinit用密码登录到集群上，服务主体SPN无法交互式登录，需要用keytab文件。**（可以把多个SPN的密钥存储在同一个keytab文件中）

## 如何导出密钥文件：

kadmin.local

```
xst -k root.keytab root/hadoop00@EXAMPLE.COM
```

这样就为root/hadoop00账户创建了一个密钥表文件，这个密钥表文件放在集群配置文件指定的位置，注意需要分发到所有节点上去。




## 如何免密登录：

klist
```
[root@hadoop00 krb5kdc]# klist
klist: No credentials cache found (filename: /tmp/krb5cc_0)
```
登录失败，用kinit测试这个keytab文件是否可用

```
kinit -kt root.keytab root/hadoop00@EXAMPLE.COM
```
没有返回表示登录成功
```
[root@hadoop00 keytab]# klist
Ticket cache: FILE:/tmp/krb5cc_0
Default principal: root/hadoop00@EXAMPLE.COM

Valid starting     Expires            Service principal
03/09/22 11:45:51  03/10/22 11:45:51  krbtgt/EXAMPLE.COM@EXAMPLE.COM
	renew until 03/09/22 11:45:51
```



## 如何访问服务

刚刚已经用kinit登录成功了，本地访问可以直接在hadoop00这个机器上执行```hdfs dfs -ls /```访问；远程访问要用UserGroupInformation这个class载入配置文件、密钥表文件等访问服务。



# 问题

1、datanode启动失败，报错如下：

> 2022-03-09 16:09:11,286 ERROR org.apache.hadoop.hdfs.server.datanode.DataNode: Exception in secureMain
> org.apache.hadoop.security.KerberosAuthException: failure to login: for principal: root/hadoop02@EXAMPLE.COM from keytab /usr/local/keytab/root.keytab javax.security.auth.login.LoginException: Unable to obtain password from user
>
> 

查看root.keytab文件，只有hadoop00主机：

[root@hadoop00 keytab]# klist -ket root.keytab
Keytab name: FILE:root.keytab
KVNO Timestamp         Principal

---- ----------------- --------------------------------------------------------
   2 03/09/22 11:27:11 root/hadoop00@EXAMPLE.COM (aes256-cts-hmac-sha1-96)
   2 03/09/22 11:27:11 root/hadoop00@EXAMPLE.COM (aes128-cts-hmac-sha1-96)
   2 03/09/22 11:27:11 root/hadoop00@EXAMPLE.COM (DEPRECATED:arcfour-hmac)
   2 03/09/22 11:27:11 root/hadoop00@EXAMPLE.COM (camellia256-cts-cmac)
   2 03/09/22 11:27:11 root/hadoop00@EXAMPLE.COM (camellia128-cts-cmac)

需要加入hadoop01和hadoop02主机：

addprinc -randkey root/hadoop01

addprinc -randkey root/hadoop02

xst -k root_new.keytab root/hadoop00 root/hadoop01 root/hadoop02

生产一个新的keytab文件，分发到所有主机上去，重启后如果datanode启动成功，在web页面上有Live Nodes两个。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h03rasdkb3j20x80lh0vm.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h03rbi3utyj20xg0jc75m.jpg)

