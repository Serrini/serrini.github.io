---
title: tcprewrite、mergecap修改合并pcap包
date: '2021-10-13'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- tools
categories:
- Tech
---
# tcprewrite、mergecap修改合并pcap包

## Example

需要用tcprewrite构造有背景流量的数据包，服务端的IP和端口是固定的，客户端IP和端口在一个范围中轮巡遍历，因此客户端使用了大量的知名端口，27017对应mogonDB，10000对应hive，9200对应ES。

```python
#!/usr/bin/bash
#-*- coding: UTF-8 -*-

import os
import random

if __name__ == '__main__':
    os.system("mkdir output")
    ports = [1111, 2222, 3333, 4444, 5555, 6666, 7777]
    for port in ports:
        os.system("tcprewrite --postmap=59359:%s --seed=%d --infile=016.pcapng --outfile=./output/%d.pcapng --skipbroadcast" % (port, random.randint(1,1000), port))

    os.system("mergecap -w res_1521.pcapng ./output/*.pcapng")
    print("-----ok-----")
```

## Attention

1. 需要tcpreplay和wireshark
2. **[tcprewrite文档](https://tcpreplay.appneta.com/wiki/tcprewrite-man.html)**

## Notes

### Tcprewrite  

#### -r 字符串，-- portmap =字符串

重写 TCP/UDP 端口。此选项最多可出现 9999 次。

指定由冒号分隔的端口号对组成的逗号分隔端口映射列表。每个冒号分隔的端口对由要匹配的端口和要重写的端口号组成。

示例：
--portmap=80:8000 --portmap=8080:80 # 80->8000 和 8080->80
--portmap=8000,8080,88888:80 # 3 个不同的端口变成 80
--portmap=8000-8999 :80 # 端口 8000 到 8999 变成 80

#### -s 数字，-- seed =数字

使用给定种子随机化 src/dst IPv4/v6 地址。此选项最多可出现 1 次。此选项不得与以下任何选项一起出现：fuzz-seed。此选项将整数作为其参数。

使源和目标 IPv4/v6 地址伪随机化，但仍保持客户端/服务器关系。由于随机化是基于种子的确定性，您可以重复使用相同的种子值来重新创建流量。

#### -N 字符串，-- pnat =字符串

使用伪 NAT 重写 IPv4/v6 地址。此选项最多可出现 2 次。此选项不得与以下任何选项一起出现：srcipmap。

采用逗号分隔的一系列冒号分隔的 CIDR 网络块对。每个网络块对都按照 IP 地址的顺序进行评估。如果数据包中的 IP 地址与第一个网络块匹配，则使用第二个网络块作为高阶位的掩码对其进行重写。

IPv4 示例：--
pnat=192.168.0.0/16:10.77.0.0/16,172.16.0.0/12:10.1.0.0/24
IPv6 示例：--
pnat=[2001:db8::/32]:[dead::/ 16],[2001:db8::/32]:[::ffff:0:0/96]

#### -S 字符串，-- srcipmap =字符串

使用伪 NAT 重写源 IPv4/v6 地址。此选项最多可出现 1 次。此选项不得与以下任何选项一起出现：pnat。

就像 --pnat 选项一样工作，但只影响 IPv4/v6 标头中的源 IP 地址。

#### -D 字符串，-- dstipmap =字符串

使用伪 NAT 重写目标 IPv4/v6 地址。此选项最多可出现 1 次。此选项不得与以下任何选项一起出现：pnat。

就像 --pnat 选项一样工作，但只影响 IPv4/v6 标头中的目标 IP 地址。

#### -e 字符串, --endpoints =字符串

将 IP 地址重写为两个端点之间。此选项最多可出现 1 次。此选项必须与以下选项一起出现：cachefile。

采用一对冒号分隔的 IPv4/v6 地址，用于重写所有流量，使其看起来在两个 IP 地址之间。

IPv4 示例：--
endpoints=172.16.0.1:172.16.0.2
IPv6 示例：--
endpoints=[2001:db8::dead:beef]:[::ffff:0:0:ac:f:0:2]

#### --tcp-sequence =数字

更改 TCP 序列（和 ACK）编号 /w 给定种子。此选项将整数作为其参数。number的值被限制为：

大于或等于 1

此选项的默认编号为：
0

更改所有 TCP 序列号和相关的序列确认号。它们将根据提供的种子随机移动。

#### -b , --skipbroadcast

跳过重写广播/多播 IPv4/v6 地址。

默认情况下，--seed、--pnat 和--endpoints 将重写广播和多播 IPv4/v6 和 MAC 地址。设置此标志将防止广播/多播 IPv4/v6 和 MAC 地址被重写。