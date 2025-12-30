---
title: Anaconda、conda、pip、virtualenv的区别
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
# Anaconda、conda、pip、virtualenv的区别

## Anaconda

* Anaconda是一个包含180+的科学包及其依赖项的发行版本。其包含的科学包包括：conda, numpy, scipy, ipython notebook等。

## conda

* conda是包及其依赖项和环境的管理工具。 
* 适用语言：Python, R, Ruby, Lua, Scala, Java, JavaScript, C/C++, FORTRAN。 
* 适用平台：Windows, macOS, Linux 
* 用途：
	* 快速安装、运行和升级包及其依赖项。
	* 在计算机中便捷地创建、保存、加载和切换环境。
	
* 如果你需要的包要求不同版本的Python，你无需切换到不同的环境，因为conda同样是一个环境管理器。仅需要几条命令，你可以创建一个完全独立的环境来运行不同的Python版本，同时继续在你常规的环境中使用你常用的Python版本。——conda官方网站
	* conda为Python项目而创造，但可适用于上述的多种语言。
	* conda包和环境管理器包含于Anaconda的所有版本当中。 
## pip

* pip是用于安装和管理软件包的包管理器。 
	* pip编写语言：Python。 
	* Python中默认安装的版本：
		* Python 2.7.9及后续版本：默认安装，命令为pip 
		* Python 3.4及后续版本：默认安装，命令为pip3 
	
	* pip名称的由来：pip采用的是递归缩写进行命名的。其名字被普遍认为来源于2处：
		* “Pip installs Packages”（“pip安装包”）
		* “Pip installs Python”（“pip安装Python”）
		
## virtualenv

* virtualenv：用于创建一个独立的Python环境的工具。 
* 解决问题：
	* 当一个程序需要使用Python 2.7版本，而另一个程序需要使用Python 3.6版本，如何同时使用这两个程序？ 
	* 如果将所有程序都安装在系统下的默认路径，如：/usr/lib/python2.7/site-packages，当不小心升级了本不该升级的程序时，将会对其他的程序造成影响。 
	* 如果想要安装程序并在程序运行时对其库或库的版本进行修改，都会导致程序的中断。 
	* 在共享主机时，无法在全局site-packages目录中安装包。 
* virtualenv将会为它自己的安装目录创建一个环境，这并不与其他virtualenv环境共享库；同时也可以选择性地不连接已安装的全局库。 
## pip 与 conda 比较

### 依赖项检查

* pip：
	* 不一定会展示所需其他依赖包。
	* 安装包时或许会直接忽略依赖项而安装，仅在结果中提示错误。
* conda：
	* 列出所需其他依赖包。
	* 安装包时自动安装其依赖项。
	* 可以便捷地在包的不同版本中自由切换。
	
### 环境管理

* pip：维护多个环境难度较大。
* conda：比较方便地在不同环境之间进行切换，环境管理较为简单。
	
### 对系统自带Python的影响

* pip：在系统自带Python中包的**更新/回退版本/卸载将影响其他程序。
* conda：不会影响系统自带Python。
	
### 适用语言

* pip：仅适用于Python。
* conda：适用于Python, R, Ruby, Lua, Scala, Java, JavaScript, C/C++, FORTRAN。

### conda与pip、virtualenv的关系
* conda结合了pip和virtualenv的功能。




**以上内容转载自[Raxxie](https://www.jianshu.com/p/62f155eb6ac5)**


*** 

* 用virtualenv创建一个独立的python环境的基本用法
	* 用pip安装virtualenv	`pip install virtualenv --upgrade`
	* 安装后创建一个工作目录，比如home下建一个tensorflow文件夹`virtualenv --system-site-packages ~/tensorflow`
	* 然后进入该目录`cd ~/tensorflow`
	* 激活沙箱`source bin/activate`
	* 在里面用pip安装tensorflow`pip install tensorflow`

***


