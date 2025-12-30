---
title: leetcode61.旋转链表
date: '2022-05-06'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- list
categories:
- LeetCode
---
## Question

> 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。 
>
> 
>
>  示例 1： 
>
>
> 输入：head = [1,2,3,4,5], k = 2
> 输出：[4,5,1,2,3]
>
>
>  示例 2： 
>
>
> 输入：head = [0,1,2], k = 4
> 输出：[2,0,1]
>
> 
>
>
>  提示： 
>
>
>  链表中节点的数目在范围 [0, 500] 内 
>  -100 <= Node.val <= 100 
>  0 <= k <= 2 * 109 
>
>  Related Topics 链表 双指针 
>  👍 753 👎 0

## Answer


```cpp
ListNode* rotateRight(ListNode* head, int k) {
    if (head == nullptr)
        return nullptr;
    ListNode *p = head;
    ListNode *tail;
    int num = 0;
    while (p != nullptr) {
        num++;
        tail = p;
        p = p->next;
    }
    k = k % num;//k可能大于num
    printf("nums[%d], tail.val[%d], k[%d]\n", num, tail->val, k);
    ListNode *ptr = head;
    for (int i = 0; i < num-k-1; ++i) {
        ptr = ptr->next;//找到第n-k个结点，即3
    }
    printf("ptr.val[%d]\n", ptr->val);

    tail->next = head;//5跟1连接
    head = ptr->next;//第n-k个结点的下一个结点，作为head
    ptr->next = nullptr;//第n-k个结点作为尾结点
    return head;
}
```

## Attention