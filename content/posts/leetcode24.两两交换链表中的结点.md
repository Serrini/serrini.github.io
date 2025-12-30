---
title: leetcode24.两两交换链表中的结点
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

> 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。 
>
> 
>
>  示例 1： 
>
>
> 输入：head = [1,2,3,4]
> 输出：[2,1,4,3]
>
>
>  示例 2： 
>
>
> 输入：head = []
> 输出：[]
>
>
>  示例 3： 
>
>
> 输入：head = [1]
> 输出：[1]
>
> 
>
>
>  提示： 
>
>
>  链表中节点的数目在范围 [0, 100] 内 
>  0 <= Node.val <= 100 
>
>  Related Topics 递归 链表 
>  👍 1367 👎 0

## Answer

```cpp
ListNode* swapPairs(ListNode* head) {
    ListNode *dummy = new ListNode(-1);
    dummy->next = head;
    ListNode *p = dummy;
    for (p; p->next && p->next->next; ) {
        ListNode *a = p->next;
        ListNode *b = a->next;
        p->next = b; //p指向2，作为头结点
        a->next = b->next; //1连接3
        b->next = a; //2连接1
        p = a; //p每次处理完成后指向a
    }
    return dummy->next;
}
```

## Attention
