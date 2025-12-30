---
title: leetcode202.快乐数（C++实现）
date: '2022-03-07'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- hashtable
- 双指针
categories:
- LeetCode
---
## Question

>
> 编写一个算法来判断一个数 n 是不是快乐数。 
>
>  「快乐数」 定义为： 
>
>
>  对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。 
>  然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。 
>  如果这个过程 结果为 1，那么这个数就是快乐数。 
>
>
>  如果 n 是 快乐数 就返回 true ；不是，则返回 false 。 
>
> 
>
>  示例 1： 
>
>
> 输入：n = 19
> 输出：true
> 解释：
> 12 + 92 = 82
> 82 + 22 = 68
> 62 + 82 = 100
> 12 + 02 + 02 = 1
>
>
>  示例 2： 
>
>
> 输入：n = 2
> 输出：false
>
> 
>
>
>  提示： 
>
>
>  1 <= n <= 231 - 1 
>
>  Related Topics 哈希表 数学 双指针 
>  👍 841 👎 0
>



## Answer

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;
//202ishappy
int getNext(int n) {
    int total = 0;
    while(n > 0) {
        int d = n % 10;
        total += d * d;
        n /= 10;
    }
    return total;
}

bool isHappy(int n) {
    //AC
    int slow = n;
    int fast = getNext(slow);
    while (fast != slow) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }

    if(slow != 1) {
        return false;
    } else {
        return true;
    }
}

bool isHappy1(int n) {
    //AC
    int slow = n;
    int fast = n;
    while (fast!=1 && getNext(fast)!=1) {
        fast = getNext(getNext(fast));
        slow = getNext(slow);
        if (slow == fast) {
            //链表有环，则不是
            return false;
        }
    }
    return true;
}

bool isHappyBySet(int n) {
    unordered_set<int> setN;
    while(1) {
        int num = getNext(n);
        if (setN.find(num) == setN.end()) {
            setN.insert(num);
            n = num;
        } else {
            return false;
        }

        if (num == 1)   return true;
    }

}


int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << getNext(19) << std::endl;
    std::cout << isHappy(2) << std::endl;
    std::cout << isHappy(19) << std::endl;

    return 0;
}
```

## Attention
1. 一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为1，那么这个数就是快乐数。已知前提，**如果不是快乐数，经过若干次运算后会进入循环**，所以类似于判断链表是否循环。
2. 可以用快慢指针或者哈希表（bfs）来解决