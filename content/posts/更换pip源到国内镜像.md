---
title: 更换pip源到国内镜像
date: '2020-03-03'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- ubuntu
categories:
- Tech
---
# 更换pip源到国内镜像

* 修改 pip.conf 文件

路径`$HOME/.config/pip/pip.conf`

没有该文件自己创建一个

常用命令

ls -a 显示所有文件（包括隐藏文件）

mkdir 创建文件夹

touch pip.conf 创建文件

vi pip.conf

* pip.conf修改成

```conf
[global]
timeout = 6000
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
```

* 国内的其他镜像源

清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
阿里云 http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
豆瓣(douban) http://pypi.douban.com/simple/
中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/



