---
title: leetcode13.罗马数字转整数
date: '2020-02-19'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
categories:
- LeetCode
---
# leetcode13.罗马数字转整数

## Question
> 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

> 字符          数值
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

> 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

> I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
> X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
> C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
> 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

> 示例 1:
> 输入: "III"
> 输出: 3

> 示例 2:
> 输入: "IV"
> 输出: 4

> 示例 3:
> 输入: "IX"
> 输出: 9

> 示例 4:
> 输入: "LVIII"
> 输出: 58
> 解释: L = 50, V= 5, III = 3.

> 示例 5:
> 输入: "MCMXCIV"
> 输出: 1994
> 解释: M = 1000, CM = 900, XC = 90, IV = 4.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/roman-to-integer
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer
**解法一:**
```java
package test001;

import java.util.Map;
import java.util.HashMap;

public class Test001 {
	 public int romanToInt(String s) {
	        Map<String, Integer> map = new HashMap<>();
	        map.put("I", 1);
	        map.put("IV", 4);
	        map.put("V", 5);
	        map.put("IX", 9);
	        map.put("X", 10);
	        map.put("XL", 40);
	        map.put("L", 50);
	        map.put("XC", 90);
	        map.put("C", 100);
	        map.put("CD", 400);
	        map.put("D", 500);
	        map.put("CM", 900);
	        map.put("M", 1000);
	        
	        int ans = 0;
	        
	        for(int i = 0;i < s.length();) {
	            if(i + 1 < s.length() && map.containsKey(s.substring(i, i+2))) {
	            	//System.out.println(s.substring(i, i+2));
	            	//两个字符组成
	                ans += map.get(s.substring(i, i+2));
	                i += 2;
	            } else {
	            	//System.out.println(s.substring(i, i+1));
	            	//一个字符组成
	                ans += map.get(s.substring(i, i+1));
	                i ++;
	            }
	        }
	        return ans;
	    }
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Test001 a = new Test001();
		String s = "XXIV";
		System.out.println(a.romanToInt(s));
	}
}
```



**解法二:**
```java
package test001;

import java.util.*;

public class Test001 {
	 public int romanToInt(String s) {
		 int ans = 0;
		 int prenum = getValue(s.charAt(0)); //记下第一位，当前位
		 
		 for(int i=1; i<s.length(); i++) { 
		 	 //从第二位开始，即往后看一位，后一位将决定当前位的符号
			 int num = getValue(s.charAt(i));
			 if(num > prenum) {
			 	 //只有后一位大于当前位的时候，当前位符号为负
				 ans -= prenum;
			 }else{
				 ans += prenum;
			 }
			 prenum = num; //更新当前位
		 }
		 ans += prenum; //只剩一个字符时直接加上
		 return ans;
	 }
	
	private int getValue(char charAt) {
		switch(charAt) {
			case'I': return 1;
			case'V': return 5;
			case'X': return 10;
			case'L': return 50;
			case'C': return 100;
			case'D': return 500;
			case'M': return 1000;
			default: return 0;
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Test001 a = new Test001();
		String s = "XXIV";
		System.out.println(a.romanToInt(s));
	}
}

```

## Attention

* 解法一将可能出现的一个字符或两个字符的组合存到哈希表中，分两个分支去哈希表中去找到数字累加。
* 解法二找到规律如下:
	* VI为5+1=6，即小的数在大的数后面为加法
	* IV为5-1=4，即小的数在大的数后面为减法，可以看作1的符号为负
* 解法二的思路是：先记录下第一位为当前位，从第二位开始到最后一位循环遍历。（注意charAt()方法下标从0开始）。往后看一位，当且仅当后一位大于当前位，当前位符号为负，注意ans加减的值为prenum即当前位。遍历完需要把最后一位num加到ans上再返回。


