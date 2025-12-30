---
title: leetcode148.排序链表
date: '2022-04-18'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- sort
- mergesort
- list
- 快慢指针
categories:
- LeetCode
---
## Question

> 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。 
>
> 
>示例 1： 
> 
>
>输入：head = [4,2,1,3]
>  输出：[1,2,3,4]
>
>
> 示例 2： 
> 
>
>输入：head = [-1,5,3,4,0]
>  输出：[-1,0,3,4,5]
>
>
> 示例 3： 
> 
>
>输入：head = []
>  输出：[]
>
>
> 
> 
>提示： 
> 
>
>链表中节点的数目在范围 [0, 5 * 104] 内 
>  -105 <= Node.val <= 105 
>
>
>  
>  进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？ 
>Related Topics 链表 双指针 分治 排序 归并排序 
> 👍 1565 👎 0

## Answer

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* sortList(ListNode* head) {
      	//归并
        return sort(head);
    }
    ListNode* sort(ListNode* head) {
      	//快慢指针找到中间结点
        if(head==nullptr || head->next==nullptr)  return head;//递归出口
        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* mid = head;
        while (fast != nullptr && fast->next != nullptr) {
            mid = slow;//slow作为中间结点，退出while循环时mid->next==slow
            slow = slow->next;
            fast = fast->next->next;
        }
        mid->next = nullptr;//断开前后，分别排序head->mid,slow->fast
        ListNode* l1 = sort(head);
        ListNode* l2 = sort(slow);
        return merge(l1, l2);//递归sort后l1和l2都是有序链表
    }
    ListNode* merge(ListNode* l1, ListNode* l2) {
        //同21，合并两个有序链表
        if (l1 == nullptr)  return l2;
        if (l2 == nullptr)  return l1;
        ListNode *mergeHead = nullptr;
        if (l1->val < l2->val) {
            mergeHead = l1;
            mergeHead->next = merge(l1->next, l2);
        } else {
            mergeHead = l2;
            mergeHead->next = merge(l1, l2->next);
        }
        return mergeHead;
    }
};
```

## Attention
1. mergesort
   1. sort的递归出口条件：```head->next == nullptr```，判断```head==nullptr```，是为了满足测试用例```[]```。
   2. 快慢指针找到中点后，需要断开，```mid->next = nullptr```，断开后一部分是head到mid，另一部份是slow到fast。
   3. merge函数同21，合并两个有序链表。递归出口是如果l1或l2有空链表，直接return。选择链表l1和l2头结点较小的一个作为```mergerHead```剩下的将递归的决定将哪一个元素加到结点链表中。
   4. 要求时间复杂度 O(n log n) 和空间复杂度 O(1)，如果是数组结构则空间需要占用O(n)，链表则不需要另外开辟空间。O(nlogn)，排序中可选快速排序、归并排序和堆排序。