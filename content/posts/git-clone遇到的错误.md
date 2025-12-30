---
title: git-clone遇到的错误
date: '2020-02-19'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- git
categories:
- Tech
---
**error: RPC failed; curl transfer closed with outstanding read data remaining**

慢速网络连接获取大的仓库时遇到错误,连接关闭,整个克隆被取消.**解决方案是先做一个表层克隆,然后用其历史记录更新存储库,无需切换至SSH也可解决问题.**

```java
Cloning into 'large-repository'...
remote: Counting objects: 20248, done.
remote: Compressing objects: 100% (10204/10204), done.
error: RPC failed; curl 18 transfer closed with outstanding read data remaining 
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```

The idea is to do a shallow clone first and then update the repository with its history.


```java
$ git clone http://github.com/large-repository --depth 1
$ cd large-repository
$ git fetch --unshallow
```

–depth 1的含义是复制深度为1，就是每个文件只取最近一次提交，不是整个历史版本。

