---
title: leetcode206.反转链表
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

> 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
>
> 
>
>
>  示例 1： 
>
>
> 输入：head = [1,2,3,4,5]
> 输出：[5,4,3,2,1]
>
>
>  示例 2： 
>
>
> 输入：head = [1,2]
> 输出：[2,1]
>
>
>  示例 3： 
>
>
> 输入：head = []
> 输出：[]
>
> 
>
>
>  提示： 
>
>
>  链表中节点的数目范围是 [0, 5000] 
>  -5000 <= Node.val <= 5000 
>
> 
>
>
>  进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？ 
>
>  Related Topics 递归 链表 
>  👍 2501 👎 0


## Answer


```cpp
ListNode* reverseList(ListNode* head) {
//迭代
    ListNode *pre = nullptr;
    ListNode *cur = head;
    while (cur != nullptr) {
        ListNode *next = cur->next;//记住当前结点的下一个位置
        cur->next = pre;//当前结点的next指向前一个结点
        pre = cur;
        cur = next;//往后移动当前结点
    }
    return pre;
}
ListNode* reverseList2(ListNode* head) {
//递归
    if (head == nullptr || head->next == nullptr) return head;
    ListNode *newHead = reverseList2(head->next);//结点后移
    head->next->next = head;//箭头反转
    head->next = nullptr;//防止成环
    return newHead;
}
```

## Attention

