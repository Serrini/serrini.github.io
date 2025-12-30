---
title: leetcode82/83.删除排序链表中的重复元素
date: '2022-05-11'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- sort
- list
categories:
- LeetCode
---
## Question

> 82:
>
> 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。 
>
> 
>
>  示例 1： 
>
>
> 输入：head = [1,2,3,3,4,4,5]
> 输出：[1,2,5]
>
>
>  示例 2： 
>
>
> 输入：head = [1,1,1,2,3]
> 输出：[2,3]
>
> 
>
>
>  提示： 
>
>
>  链表中节点数目在范围 [0, 300] 内 
>  -100 <= Node.val <= 100 
>  题目数据保证链表已经按升序 排列 
>
>  Related Topics 链表 双指针 
>  👍 884 👎 0


## Answer


```cpp
//82
//in：head = [1,2,3,3,4,4,5]
//out：[1,2,5]
//[1,1,3,5]
ListNode* deleteDuplicates82(ListNode* head) {
    ListNode *dummy = new ListNode(-1);
    dummy->next = head;
    ListNode *ptr = dummy;
    while (head != nullptr && head->next != nullptr) {
        if (head->val == head->next->val) {
            //[1,1]
//            while (head->val == head->next->val) {
            while (head && head->next && head->val == head->next->val) {
                head = head->next;
            }
            head = head->next;
            ptr->next = head;
        } else {
            ptr = head;
            head = head->next;
        }
    }
    ListNode *res = dummy->next;
    delete dummy;
    return res;
}
```

## Question
> 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。 
>
> 
>
>  示例 1： 
>
>
> 输入：head = [1,1,2]
> 输出：[1,2]
>
>
>  示例 2： 
>
>
> 输入：head = [1,1,2,3,3]
> 输出：[1,2,3]
>
> 
>
>
>  提示： 
>
>
>  链表中节点数目在范围 [0, 300] 内 
>  -100 <= Node.val <= 100 
>  题目数据保证链表已经按升序 排列 
>
>  Related Topics 链表 👍 785 👎 0
>


## Answer

```cpp
//83
//in：head = [1,1,2,3,3]
//out：[1,2,3]
//[1,1,1,2,3]
//[1,1]
ListNode* deleteDuplicates83(ListNode* head) {
    ListNode *res = head;
    ListNode *ptr = nullptr;
    while (head != nullptr) {
        ptr = head->next;
        while (ptr != nullptr && ptr->val == head->val) {
            ptr = ptr->next;
        }
        head->next = ptr;
        head = ptr;
    }
    return res;
}
```

## Attention
