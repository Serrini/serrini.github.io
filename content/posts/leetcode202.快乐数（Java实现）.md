---
title: leetcode202.快乐数（Java实现）
date: '2020-03-30'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
categories:
- LeetCode
---
#leetcode202.快乐数

## Question
> 编写一个算法来判断一个数是不是“快乐数”。

> 一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数。

> 示例: 
> 输入: 19
> 输出: true
> 
> 解释: 
> 12 + 92 = 82
> 82 + 22 = 68
> 62 + 82 = 100
> 12 + 02 + 02 = 1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/happy-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer

### 方法一：用 HashSet 检测循环

```java
package pid202;

import java.util.HashSet;
import java.util.Set;

public class Solution {
	
	private static int getNext(int n) {
		int totalSum = 0;
		while(n>0) {
			int m = n%10;
			n /= 10;
			totalSum += m*m;
		}
		return totalSum;
	}
	
	public static boolean isHappy(int n) {
		Set<Integer> seen = new HashSet<>();
		while(n!=1 && !seen.contains(n)) {
			seen.add(n);
			n = getNext(n);
		}
		if(n==1) {
			return true;
		}else {
			return false;
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n = 7;
		System.out.println(isHappy(n));
	}
}

```

![](https://tva1.sinaimg.cn/large/00831rSTgy1gdcci9wyujj31cz0ltajb.jpg)
![](https://tva1.sinaimg.cn/large/00831rSTgy1gdccibl4uyj313z0j2gs8.jpg)

只有两种情况：

* 最后得到1，返回true
* 进入循环，返回false

### 方法二：快慢指针判断链表是否有环

快指针每次向前两个结点，慢指针每次向前一个结点。

* 如果是快乐数，最后得到1，即fastrunner==1，返回true
* 如果不是，链表有环，slowrunner会追上fastrunner，最后会在同一个结点上相遇，即fastrunner==slowrunner

```java
public class Solution {
	
	private static int getNext(int n) {
		int totalSum = 0;
		while(n>0) {
			int m = n%10;
			n /= 10;
			totalSum += m*m;
		}
		return totalSum;
	}
	
	public static boolean isHappy(int n) {
		int slowrunner = n;
		int fastrunner = getNext(n);
		
		while(fastrunner!=1 && fastrunner!=slowrunner) {
			slowrunner = getNext(slowrunner);
			fastrunner = getNext(getNext(fastrunner));
		}
		
		return fastrunner == 1;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n = 7;
		System.out.println(isHappy(n));
	}

}

```

