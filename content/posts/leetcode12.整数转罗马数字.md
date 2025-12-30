---
title: leetcode12.整数转罗马数字
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
# leetcode12.整数转罗马数字

## Question

> 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

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
> 给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

> 示例 1:
> 输入: 3
> 输出: "III"

> 示例 2:
> 输入: 4
> 输出: "IV"

> 示例 3:
> 输入: 9
> 输出: "IX"

> 示例 4:
> 输入: 58
> 输出: "LVIII"
> 解释: L = 50, V = 5, III = 3.

> 示例 5:
> 输入: 1994
> 输出: "MCMXCIV"
> 解释: M = 1000, CM = 900, XC = 90, IV = 4.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/integer-to-roman
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer

```java
package test001;

public class Test001 {

    public String intToRoman(int num) {
        //由大到小降序,贪心思想
        int[] nums = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] romans = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};


        StringBuilder stringbuilder = new StringBuilder();
        int index = 0;
        while(index < 13){
            //数组下标0-12
            while(num >= nums[index]){
                //从大面值的开始
                stringbuilder.append(romans[index]);
                num = num - nums[index];
            }
            index++;
        }
        return stringbuilder.toString();
    }
    
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Test001 a = new Test001();
        int b = 2;
        String c = a.intToRoman(b);
        System.out.print(c);
    }

}
```


## Attention

我们总是希望写出来的“罗马数字”的个数越少越好，以方便表示，并且这种表示方式还应该是唯一的。
贪心算法的规则是每一步都使用当前较大的罗马数字作为加法因子，最后得到罗马数字表示就是长度最少的，类似于用最少的纸币凑成一个整数。


### String、StringBuffer和StringBuilder的区别

* String类是不可变类，即一旦一个String对象被创建以后，包含在这个对象中的字符序列是不可改变的，直至这个对象被销毁。
    * ![](https://tva1.sinaimg.cn/large/0082zybpgy1gc1u7xy5llj30n702n3yn.jpg)
* StringBuffer对象则代表一个字符序列可变的字符串，当一个StringBuffer被创建以后，通过StringBuffer提供的append()、insert()、reverse()、setCharAt()、setLength()等方法可以改变这个字符串对象的字符序列。一旦通过StringBuffer生成了最终想要的字符串，就可以调用它的toString()方法将其转换为一个String对象。
    * ![](https://tva1.sinaimg.cn/large/0082zybpgy1gc1u8ovk1vj30n902m3yq.jpg)
* StringBuilder类也代表可变字符串对象。实际上，StringBuilder和StringBuffer基本相似，两个类的构造器和方法也基本相同。不同的是：StringBuffer是线程安全的，而StringBuilder则没有实现线程安全功能，所以性能略高。

在自己的方法中使用StringBuilder类:
`StringBuilder stringBuilder = new StringBuilder();`
append()方法可扩展字符串
toString()方法可转化String类型



