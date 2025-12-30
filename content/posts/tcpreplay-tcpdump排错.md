---
title: tcpreplay/tcpdump排错
date: '2022-03-15'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- network
categories:
- Tech
---
## Linux cooked capture

### question

tcpdump时不指定网卡，**-i any** 抓包导致链路层占用16字节，一般链路层占14字节。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0avf0iumtj20zz05w75m.jpg)

如果-i选项指定为一个网卡地址，那么抓取的数据包数据链路层是**以太网头部**；如果指定any，则以太网头部将被替换为linux cooked capture头部

### solution

将linux cooked capture格式的包转换为Ethernet格式

```
 # tcpdump -r linux_sll.pcap
reading from file linux_sll.pcap, link-type LINUX_SLL (Linux cooked)
 # tcprewrite --dlt=enet --infile=linux_sll.pcap  --outfile=enet.pcap
 # tcpdump -r enet.pcap
reading from file enet.pcap, link-type EN10MB (Ethernet)
```

## tcpreplay:send() [218] Message too long (errno = 90)

### solution
数据包长度>mtu值，需要修改发送数据包网卡的MTU，重启network

