---
title: TLS协议（一）
date: '2021-11-06'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- tls
categories:
- Security
---
## 本文数据包来源

对eth0网口抓包，访问github.com，这是TLS通信过程。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw5lzzlh0aj31400p0qav.jpg)


![](https://tva1.sinaimg.cn/large/008i3skNgy1gw5m4pd43uj31400p0afy.jpg)


## TLS

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw81fhs62gj30tb0qmq64.jpg)

### client hello

![clienthello](https://tva1.sinaimg.cn/large/008i3skNgy1gw5gv5fukjj313l0mgn30.jpg)

客户端版本：客户端希望支持的协议版本

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5h0naea4j306d00kwe9.jpg)

客户端随机数：客户端生成，32字节，前4个字节表示epoch格式的当前日期时间，其余28个字节由加密强随机数生成器生成

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5h1rndxbj30fz00kwec.jpg)

密码套件：客户端支持的密码套件

![密码套件](https://tva1.sinaimg.cn/large/008i3skNly1gw5gy3unyoj30kj0cnjtg.jpg)

### server hello

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5h4oq5n2j313y0ncn2x.jpg)

服务端版本：0x0303表示支持1.2的版本

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw5h6f0n0vj30cb022749.jpg)

服务端随机数

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5h7gkxwbj30fv00j0sl.jpg)

密码套件：服务端选择了一个密码套件

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5h8bkxsfj30ip061q3i.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5iu7q16ej30hk05174s.jpg)

### Certificate

服务器证书

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5hitfg7xj313l0n8n3c.jpg)

### Server Key Exchange（服务器密钥交换）

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5hseqwdfj313x0lwdl9.jpg)

服务器密钥交换(Server Key Exchange)是可选的。仅当服务器提供的证书不足以允许客户端交换预主密钥时，才会发送此消息。

使用Elliptic Curve Diffie Hellman算法来交换密钥（ECDHE）。在[Diffie-Hellman](https://www.wst.space/ssl-part-2-diffie-hellman-key-exchange/)中，客户端无法自行计算预主密钥，双方都有助于计算它，因此客户端需要从服务器获取Diffie-Hellman公钥。当使用`Elliptic Curve Diffie-Hellman`时，该公钥不在证书中。因此，服务器必须在单独的消息中向客户端发送其DH公钥，以便客户端可以计算预主密钥。

服务器密钥交换完成后，服务器将发送**Server Hello Done** 消息。客户端将开始计算Pre-Master Secret。

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5is1ntrrj30n3093t9s.jpg)

以上密钥交换算法是ECDHE，服务器会生成一对密钥（公钥和私钥）与客户端共享。客户端和服务器都为每个新会话生成一个新密钥对。一旦计算出预主密钥，将立即删除客户端和服务器的私钥。这意味着私钥永远不会被窃取，比rsa更具有前向安全性。

### Server Key Exchange（客户端密钥交换）

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw5j8gnx2jj313q0koafn.jpg)

通过RSA或ECDHE，客户端和服务端都生成了共同的Pre-Master Secert，之后，客户端将发送Change Cipher Spec消息。

### Change Cipher Spec

客户端向服务端发送的Change Cipher Spec：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw5jg9szorj31400d8tbk.jpg)

服务端向客户端发送的Change Cipher Spec：

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5jhiqvynj31400a9wgo.jpg)

## 一些概念

### 加密算法

#### 对称加密

用同一密钥加解密，常见的对称加密算法：DES、AES、ChaCha20 等。

#### 非对称加密

分公钥、私钥，常见的非对称加密算法：RSA，ECC 等。ECC子算法 ECDHE 用于密钥交换，ECDSA 用于数字签名。

#### 混合加密

TLS在通信刚开始的时候使用 非对称加密 算法，解决密钥交换的问题。后续全都使用 对称加密 进行通信。

### 加密套件

一般是客户端提供一个列表，服务端选择一个加密套件，用openssl命令行查看一些加密套件：

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5l63ntxfj30hv0myjwr.jpg)

加密套件结构：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw5l7irkj5j30h7033mx6.jpg)

### TLS数据完整性

#### 消息验证代码（MAC）

当服务器或客户端使用主密钥加密数据时，还会计算明文数据的校验和（哈希值），这个校验和称为消息验证代码（MAC）。发送方用密钥生成MAC包含在加密数据中，接收方将MAC和明文分开，用密钥计算明文的校验和，与接收到的MAC比较，就知道内容有没有被篡改。

以上例子中SHA256就是计算MAC的哈希函数，这是对称加密，客户端和服务端需要用相同的散列算法。

一共有四个密钥来保证TLS的数据完整性：
1. 客户端写入加密密钥：客户端用赖加密数据，服务器用来解密数据。
2. 服务器写入加密密钥：服务器用来加密数据，客户端用来解密数据。
3. 客户端写入MAC密钥：客户端用来创建MAC，服务器用来验证MAC。
4. 服务器写入MAC密钥：服务器用来创建MAC，客户端用来验证MAC。

#### 初始化向量IV

...

### 证书

CA 证书，就是 CA 公钥+CA机构相关信息构成的一个文件。
TLS 证书，则包含公钥+申请者信息，颁发者(CA)的信息+签名(使用 CA 私钥加密的证书 Hash)，以及一些其他信息。
几种文件类型：
1. xxx.key: 就是一个私钥，一般是一个 RSA 私钥，长度通常指定为 2048 位。
2. xxx.csr: 即 Certificate Sign Request，证书签名请求。使用 openssl 等工具，通过 TLS 密钥+TLS 证书的相关信息，可生成出一个 CSR 文件。
3. xxx.crt: 这就是我们所说的 TLS 证书，CA 证书和服务端 TLS 证书都是这个格式。
使用 CA 证书、CA 密钥对 csr 文件进行签名，就能得到最终的服务端 TLS 证书——一个 crt 文件。

