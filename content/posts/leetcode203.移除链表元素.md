---
title: leetcode203.移除链表元素
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

>
> 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
>
>
>  示例 1： 
>
>
> 输入：head = [1,2,6,3,4,5,6], val = 6
> 输出：[1,2,3,4,5]
>
>
>  示例 2： 
>
>
> 输入：head = [], val = 1
> 输出：[]
>
>
>  示例 3： 
>
>
> 输入：head = [7,7,7,7], val = 7
> 输出：[]
>
> 
>
>
>  提示： 
>
>
>  列表中的节点数目在范围 [0, 104] 内 
>  1 <= Node.val <= 50 
>  0 <= val <= 50 
>
>  Related Topics 递归 链表 
>  👍 899 👎 0


## Answer


```cpp
//203
//in：head = [1,2,6,3,4,5,6], val = 6
//out：[1,2,3,4,5]
ListNode* removeElements(ListNode* head, int val) {
//迭代
    if (head == nullptr)    return nullptr;
    ListNode *dummy = new ListNode(-1);
    dummy->next = head;
    ListNode *p = dummy;
    while (p != nullptr) {
        if (p->next && p->next->val == val) {
            p->next = p->next->next;
        } else {
            p = p->next;
        }
    }
    return dummy->next;
}

ListNode* removeElements2(ListNode* head, int val) {
//递归
    if (head == nullptr)    return nullptr;
    head->next = removeElements2(head->next, val);
    return head->val == val ? head->next : head;
}
```

## Attention