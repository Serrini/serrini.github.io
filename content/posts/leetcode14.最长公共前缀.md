---
title: leetcode14.最长公共前缀
date: '2023-03-07'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 字符串
categories:
- LeetCode
---
## Question-14-最长公共前缀

> 编写一个函数来查找字符串数组中的最长公共前缀。 
>
>  如果不存在公共前缀，返回空字符串 ""。 
>
> 
>
>  示例 1： 
>
>
> 输入：strs = ["flower","flow","flight"]
> 输出："fl"
>
>
>  示例 2： 
>
>
> 输入：strs = ["dog","racecar","car"]
> 输出：""
> 解释：输入不存在公共前缀。 
>
> 
>
>  提示： 
>
>
>  1 <= strs.length <= 200 
>  0 <= strs[i].length <= 200 
>  strs[i] 仅由小写英文字母组成 
>
>
>  Related Topics 字典树 字符串 👍 2664 👎 0
>





## Answer-14

```cpp
/*
 * 14
 * strs = ["flower","flow","flight"]
 * "fl"
 * nums = 3: 比较01、12
 * nums = 4：比较01、12、23
 * flower
 * flow
 * flight
 * 按照列对比，j列从0到3，i行从0到1（比较01、12）
 */
string longestCommonPrefix_func1(vector<string>& strs) {
    int nums = strs.size(); //3
    int resLen = INT_MAX;
    for (auto it : strs) {
        if (it.size() < resLen) resLen = it.size(); //公共前缀长度一定<=最短串的长度
    }
    int i, j;
    for (j = 0; j < resLen; ++j) {
        for (i = 0; i < nums - 1; i++) {
            printf("i[%d], j[%d]\n", i, j);
            if (strs[i][j] != strs[i+1][j]) {
                cout << "break1" << endl;
                break;
            }
        }
        if(i < nums - 1) { //nums-1此时为2
            cout << "break2" << endl;
            break; //???
        }
    }
    return strs[0].substr(0, j);
}

/*
 * 纵向比较，假设第一个元素是公共前缀，逐个比较第一个元素的各个位置
 * flower
 * flow
 * flight
 */
string longestCommonPrefix_func2(vector<string>& strs) {
    int j = 0;
    while (j < strs[0].size()) {
        char cur = strs[0][j]; //假设第一个元素是公共前缀flower，cur是当前想要比较的字符，从f开始
        for (auto item : strs) {
            printf("item[%s], j[%d]\n", item.c_str(), j);
            if (item.size() < j || item[j] != cur) { //该轮检查有异常 ???
                return j > 0 ? strs[0].substr(0, j) : "";
            }
        }
        ++j; //依次向后找
    }
    return strs[0]; //如果j>=resLen，直接返回第一个元素
}
```
