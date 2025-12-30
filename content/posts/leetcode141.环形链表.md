---
title: leetcode141.环形链表
date: '2022-04-13'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- list
- 双指针
categories:
- LeetCode
---
## Question

> 给你一个链表的头节点 head ，判断链表中是否有环。 
>
>  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到
> 链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。 
>
>  如果链表中存在环 ，则返回 true 。 否则，返回 false 。 
>
> 
>
>  示例 1： 
>
> 
>
>
> 输入：head = [3,2,0,-4], pos = 1
> 输出：true
> 解释：链表中有一个环，其尾部连接到第二个节点。
>
>
>  示例 2： 
>
> 
>
>
> 输入：head = [1,2], pos = 0
> 输出：true
> 解释：链表中有一个环，其尾部连接到第一个节点。
>
>
>  示例 3： 
>
> 
>
>
> 输入：head = [1], pos = -1
> 输出：false
> 解释：链表中没有环。
>
> 
>
>
>  提示： 
>
>
>  链表中节点的数目范围是 [0, 104] 
>  -105 <= Node.val <= 105 
>  pos 为 -1 或者链表中的一个 有效索引 。 
>
> 
>
>  进阶：你能用 O(1)（即，常量）内存解决此问题吗？ 
>  Related Topics 哈希表 链表 双指针 
>  👍 1404 👎 0


## Answer
```cpp
class Solution {
public:
    bool hasCycleByPoint(ListNode *head) {
        ListNode *faptr = head;
        ListNode *slptr = head;
        while (faptr != nullptr && faptr->next != nullptr) {
            faptr = faptr->next->next;
            slptr = slptr->next;
            if (faptr == slptr)
                return true;
        }
        return false;
    }


    bool hasCycleBySet(ListNode *head) {
        unordered_set<ListNode*> setNode;
        if(head == nullptr)   return false;
        if(head->next == nullptr)   return false;
        while(true) {
            ListNode *node = head->next;
            if(setNode.find(node) == setNode.end()) {
                setNode.insert(node);
                head = node;
            } else {
                return true;
            }
        }
    }
};


```

## Attention
1. pos的意思是尾结点指向链表中的结点的下表，从0开始，pos=-1表示链表无环。
2. 判断链表有无环：hasCycleByPoint->双指针，hasCycleBySet->hash表存储。