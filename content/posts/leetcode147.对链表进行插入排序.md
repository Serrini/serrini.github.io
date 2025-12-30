---
title: leetcode147.对链表进行插入排序
date: '2022-04-18'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- sort
- insertsort
categories:
- LeetCode
---
## Question
> 对链表进行插入排序。 
>
>
> 插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。 
> 每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。 
>
> 
>
>  插入排序算法： 
>
>
>  插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。 
>  每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。 
>  重复直到所有输入数据插入完为止。 
>
> 
>
>
>  示例 1： 
>
>  输入: 4->2->1->3
> 输出: 1->2->3->4
>
>
>  示例 2： 
>
>  输入: -1->5->3->4->0
> 输出: -1->0->3->4->5
>
>  Related Topics 链表 排序 
>  👍 438 👎 0


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
    ListNode* insertionSortList(ListNode* head) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* ptr = head->next;//无序区第一个结点
        ListNode* rear = head;//有序区最后一个结点
        while (ptr != nullptr) {
            if (ptr->val >= rear->val) {
                //ptr>rear,直接insert到rear后面
                rear->next = ptr;
                rear = ptr;
            } else {
                //ptr<rear,pre从head往后找到比ptr大的第一个结点
                ListNode* pre = dummy;
                while (pre->next->val <= ptr->val) {
                    pre = pre->next;
                }
                rear->next = ptr->next;
                ptr->next = pre->next;
                pre->next = ptr;
            }
            ptr = rear->next;
        }
        return dummy->next;

    }
};
//leetcode submit region end(Prohibit modification and deletion)
```

## Attention

1. 需要两个指针，一个ptr指向无序区的第一个结点，即每次处理的结点，一个rear指向有序区的最后一个结点。每次ptr和rear对比，如果大于等于当前尾结点，则直接插入；如果小于尾结点，则需要从head开始往后找到第一个比ptr大的结点。
   1. 尾结点后插入新结点：```rear->next = ptr; rear = ptr;```
   2. [1,2,4]中插入[3,6]，修改指针在已有序链表中插入结点：由于需要保存第一个比ptr大的结点的前一个位置，需要一个dummy结点指向head。pre->next为4时大于3，首先需要先保存下一个待排序结点结点```rear->next = ptr->next```，4->6，然后```ptr->next = pre->next```，将3跟4连接，最后```pre->next = ptr```，将2和3连接。
2. 链表的插入排序时间复杂度，O(n^2)。最坏情况外层需要遍历(n-1)次，内层需要1+2+3+...+(n-2)=(n-2)(n-1)/2次，最坏情况O(n^2)；最好的情况每次只需要在尾结点后插入，时间复杂度O(n)，平均复杂度(n^2 + n)/2，即O(n^2)。空间复杂度O(1)，辅助变量ListNode* pre。