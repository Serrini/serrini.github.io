---
title: leetcode5.最长回文子串
date: '2023-03-07'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 双指针
- 动态规划
categories:
- LeetCode
---
## Question-5


>
> 给你一个字符串 s，找到 s 中最长的回文子串。 
>
>  如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。 
>
> 
>
>  示例 1： 
>
>输入：s = "babad"
> 输出："bab"
> 解释："aba" 同样是符合题意的答案。
> 
>
>示例 2： 
>  
>输入：s = "cbbd"
> 输出："bb"
> 
>
> 
>
>提示： 
>  
>1 <= s.length <= 1000 
>s 仅由数字和英文字母组成 
>  
>  
>Related Topics 字符串 动态规划 👍 6220 👎 0


## Answer-5

```cpp
//法一
//"babad"
//"bab"
string longestPalindrome(string s) {
    if (s.empty()) return "";
    int start = 0, maxsize = 1;
    for (int i = 0; i < s.size(); ++i) {
        for (int j = i+1; j < s.size(); ++j) {
            int p1 = i, p2 = j;
            while (p1 < p2) {
                if (s[p1] != s[p2]) break;
                p1++;
                p2--;
            }
            if (p1 >= p2 && j-i+1 > maxsize) {
                maxsize = max(maxsize, j-i+1);
                start = i; //仅在需要更新时更新start，否则"ccc"返回"cc"
                cout << "[i: " << i << " j:"  << j << endl;
                cout << "p1: " << p1 << " p2:"  << p2 << endl;
                cout << "maxsize: " << maxsize << "]" << endl;
            }
        }
    }
    cout << "start: " << start << ", maxsize: " << maxsize << endl;
    return s.substr(start, maxsize);
}


/*
 * 法二
 * 1、分解成更小的问题解决，判断abba，先判断最外侧dp[0][3]=1，内侧dp[1][2]=1，若为假不需要继续判断
 * 2、已知：长度是1必然true，长度为2或3，仅需判断最外侧
 * 3、当s[i]=s[j]时，如果s[i+1...j-1]是回文串，则s[i...j]也是回文串；如果s[i+1...j-1]不是回文串，则s[i...j]不是回文串
 * 4、注意：两层循环写法。i从0到s.size()，j从i+1到s.size()会导致abba在i=0,j=3时，无法获取子串dp[1][2]的值
 * 需要j从1到s.size()，i从前往后到j的位置
 */
string longestPalindrome_withdp(string s) {
    if (s.empty()) return "";
    int start = 0, maxsize = 1;
    vector<vector<int>> dp(s.size(), vector<int>(s.size())); //s*s
    for (int j = 1; j < s.size(); ++j) {
        for (int i = 0; i < j; i++) {
            if (s[i] == s[j]) {
                if (j-i+1 == 2 || j-i+1 == 3){
                    dp[i][j] = 1;
                } else {
                    if (dp[i+1][j-1] == 0) continue;
                    dp[i][j] = 1;
                }

                if (dp[i][j] == 1 && j-i+1 > maxsize) {
                    maxsize = j-i+1;
                    start = i;
                    cout << "[start: " << start << ", maxsize: " << maxsize << " ,ij " << i << j <<  "]" << endl;
                }
            }
        }
    }
    return s.substr(start, maxsize);
}
```

## Attention

1. 方法一暴力法，i从0到s.size()，j从i+1到s.size()，枚举出所有子串，判断长度大于1的子串是否是回文子串。
   1. 判断子串是否为回文子串，可while循环双指针移动，当```p1>=p2```时，必为回文，更新maxsize
   2. substr函数返回结果
   3. 时间复杂度：*O*(*N*3)
2. 方法二动态规划
   1. 回文天然具有「状态转移」性质：一个长度严格大于 2 的回文去掉头尾字符以后，剩下的部分依然是回文。反之，如果一个字符串头尾两个字符都不相等，那么这个字符串一定不是回文
   2. 初始化一个n*n的空间，```dp[i][j]```，i为子串初始位置，j为子串截止位置
   3. 截止位置j从1到s.size()，起始位置i从0到j，i为行，j为列，先遍历j，然后遍历i
   4. ```dp[i][j] = dp[i + 1][j - 1];```
