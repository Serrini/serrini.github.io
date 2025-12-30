---
title: leetcode234.回文链表
date: '2022-05-07'
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

> 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。 
>
> 
>
>  示例 1： 
>
>
> 输入：head = [1,2,2,1]
> 输出：true
>
>
>  示例 2： 
>
>
> 输入：head = [1,2]
> 输出：false
>
> 
>
>
>  提示： 
>
>
>  链表中节点数目在范围[1, 105] 内 
>  0 <= Node.val <= 9 
>
> 
>
>
>  进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？ 
>  Related Topics 栈 递归 链表 双指针 
>  👍 1350 👎 0



## Answer


```cpp
//array
//需要O(n)空间存放链表结点
bool isPalindrome(ListNode* head) {
    vector<int> p;
    int i = 0, j = 0;
    while (head != nullptr) {
        p.push_back(head->val);
        j++;
        head = head->next;
    }
    j--;
    printf("j = %d\n", j);
    while (i < j) {
        if (p[j--] != p[i++]) {
            return false;
        }
    }
    return true;
}


bool isPalindrome2(ListNode* head) {
    ListNode *fast = head;
    ListNode *slow = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode *p1 = head;
    if (slow->next != nullptr) {
        ListNode *p2 = reverseList(slow);//lc206.反转链表
        while (p1 != nullptr && p2 != nullptr) {
            printf("p1[%d], p2[%d]\n", p1->val, p2->val);
            if (p1->val != p2->val) {
                return false;
            }
            p1 = p1->next;
            p2 = p2->next;
        }
    } else {
        //[1,2]
        if (slow->val == head->val) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}


bool isPalindrome3(ListNode* head) {
    ListNode *fast = head;
    ListNode *slow = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode *p1 = head;
    if (slow->next != nullptr) {
        //reverse list
        ListNode *p2 = nullptr;
        ListNode *cur = slow;
        while (cur != nullptr) {
            ListNode *next = cur->next;
            cur->next = p2;
            p2 = cur;
            cur = next;
        }
        while (p1 != nullptr && p2 != nullptr) {
            printf("p1[%d], p2[%d]\n", p1->val, p2->val);
            if (p1->val != p2->val) {
                return false;
            }
            p1 = p1->next;
            p2 = p2->next;
        }
    } else {
        //[1,2]
        if (slow->val == head->val) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}
```

## Attention