---
title: leetcode20.有效的括号
date: '2021-10-13'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
categories:
- LeetCode
---
# leetcode20.有效的括号

## Question

> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 
> 
>  有效字符串需满足： 
> 
>  
>  左括号必须用相同类型的右括号闭合。 
>  左括号必须以正确的顺序闭合。 
>  
> 
>  
> 
>  示例 1： 
> 
>  
> 输入：s = "()"
> 输出：true
>  
> 
>  示例 2： 
> 
>  
> 输入：s = "()[]{}"
> 输出：true
>  
> 
>  示例 3： 
> 
>  
> 输入：s = "(]"
> 输出：false
>  
> 
>  示例 4： 
> 
>  
> 输入：s = "([)]"
> 输出：false
>  
> 
>  示例 5： 
> 
>  
> 输入：s = "{[]}"
> 输出：true 
> 
>  
> 
>  提示： 
> 
>  
>  1 <= s.length <= 104 
>  s 仅由括号 '()[]{}' 组成 
>  
>  Related Topics 栈 字符串 
>  👍 2668 👎 0


## Answer

```cpp
class Solution {
public:
    bool isValid(string s) {
        map<char, char> mymap;
        stack<char> mysta;
        mymap.insert(pair<char, char>(')', '('));
        mymap.insert(pair<char, char>(']', '['));
        mymap.insert(pair<char, char>('}', '{'));
        for (int i = 0; i < s.length(); ++i) {
            if(s[i] == '(' || s[i] == '[' || s[i] == '{') {
                mysta.push(s[i]);
            } else if (s[i] == ')' || s[i] == ']' || s[i] == '}') {
                if (mysta.empty()) {
                    return false;
                }
                if (!mysta.empty()) {
                    if (mysta.top() == mymap[s[i]]) {
                        mysta.pop();
                    } else {
                        mysta.push(s[i]);
                        continue;
                    }
                }

            } else {
                return false;
            }
        }

        if (mysta.empty()) {
            return true;
        } else {
            return false;
        }

    }
};
```

## Attention

1、map存相应的括号，遇到左括号压栈，右括号如果栈顶元素是对应的，则pop。