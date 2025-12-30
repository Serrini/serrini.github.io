---
title: leetcode19.删除链表的倒数第 N 个结点
date: '2022-04-28'
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

> 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。 

>  示例 1： 
> 输入：head = [1,2,3,4,5], n = 2
> 输出：[1,2,3,5]

>  示例 2：
> 输入：head = [1], n = 1
> 输出：[]
>
>
>  示例 3： 
> 输入：head = [1,2], n = 1
> 输出：[1]
>
>  提示： 
>  链表中结点的数目为 sz 
>  1 <= sz <= 30 
>  0 <= Node.val <= 100 
>  1 <= n <= sz 
>  
>  进阶：你能尝试使用一趟扫描实现吗？ 
>  Related Topics 链表 双指针 
>  👍 2001 👎 0

## Answer

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

ListNode* removeNthFromEnd1(ListNode* head, int n) {
		//两次遍历
    ListNode *dummy = new ListNode(-1);//记住head位置
    dummy->next = head;
    int nodeSum = 0;
    //第一次遍历获取结点总数
    while (head != nullptr) {
        nodeSum++;
        head = head->next;
    }

    ListNode *ptr = dummy;
    int i = nodeSum - n;//i=5-2=3
    while(i--) {
        ptr = ptr->next;//ptr移动3次后指向4的前驱结点
    }
    ptr->next = ptr->next->next;//直接删除
    return dummy->next;
}

ListNode* removeNthFromEnd2(ListNode* head, int n) {
  	//一次遍历
    ListNode *dummy = new ListNode(-1);//记住head位置
    dummy->next = head;
    ListNode *slow = dummy;
    ListNode *fast = dummy;
    while (n--) {
        //fast指针比slow快n步，即fast先指向正数第n个
        fast = fast->next;
    }
    while (fast->next != nullptr) {
        //slow/fast同时后移，直到fast指向最后一个node
        slow = slow->next;
        fast = fast->next;
    }
    //slow指向待删除结点的前一个结点
    slow->next = slow->next->next;
    return dummy->next;
}
```

## Attention
1. 两次遍历即第一次记住共有多少个node，计算出倒数第n个结点为正数第nodeSum-n个结点，找到后直接删除
2. 一次遍历即双指针，先让fast指向正数第n个结点，fast和slow同步向后移，直到fast移到最后一个结点，slow指向的是需要删除结点的前一个结点
3. ptr指向需要删除结点的前一个结点，直接删除即可，```ptr->next = ptr->next->next```
4. 需要dummy结点来记住head结点的位置