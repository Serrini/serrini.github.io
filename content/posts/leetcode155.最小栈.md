---
title: leetcode155.最小栈
date: '2022-05-24'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- stack
categories:
- LeetCode
---
## Question

> 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。 
>
>  实现 MinStack 类: 
>
>
>  MinStack() 初始化堆栈对象。 
>  void push(int val) 将元素val推入堆栈。 
>  void pop() 删除堆栈顶部的元素。 
>  int top() 获取堆栈顶部的元素。 
>  int getMin() 获取堆栈中的最小元素。 
>
> 
>
>
>  示例 1: 
>
>
> 输入：
> ["MinStack","push","push","push","getMin","pop","top","getMin"]
> [[],[-2],[0],[-3],[],[],[],[]]
>
> 输出：
> [null,null,null,null,-3,null,0,-2]
>
> 解释：
> MinStack minStack = new MinStack();
> minStack.push(-2);
> minStack.push(0);
> minStack.push(-3);
> minStack.getMin();   --> 返回 -3.
> minStack.pop();
> minStack.top();      --> 返回 0.
> minStack.getMin();   --> 返回 -2.
>
> 
>
>
>  提示： 
>
>
>  -2³¹ <= val <= 2³¹ - 1 
>  pop、top 和 getMin 操作总是在 非空栈 上调用 
>  push, pop, top, and getMin最多被调用 3 * 10⁴ 次 
>
>  Related Topics 栈 设计 👍 1310 👎 0
>




## Answer


```cpp
//155
// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。
class MinStack {
    stack<int> s;
    stack<int> s_helper;
public:
    MinStack() {
        s_helper.push(INT_MAX);
    }

    void push(int val) {
        s.push(val);
        s_helper.push(min(s_helper.top(), val));
    }

    void pop() {
        s.pop();
        s_helper.pop();
    }

    int top() {
        return s.top();
    }

    int getMin() {
        return s_helper.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

## Attention

