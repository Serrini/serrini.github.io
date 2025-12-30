---
title: leetcode21.合并两个有序链表
date: '2020-03-02'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
categories:
- LeetCode
---
# leetcode21.合并两个有序链表

## Question

> 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

> 示例：
> 输入：1->2->4, 1->3->4
> 输出：1->1->2->3->4->4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer

#### Java

```java
public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}
```

```java
package test001;

public class Test001 {
	
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) {
            return l2;
        }
        else if (l2 == null) {
            return l1;
        }
        else if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        }
        else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }

    }
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		ListNode l1 = new ListNode(1);
//		l1.next = new ListNode(2);
//		l1.next.next = new ListNode(4);
//		
//		ListNode l2 = new ListNode(1);
//		l2.next = new ListNode(3);
//		l2.next.next = new ListNode(4);
//		
//		Test001 test = new Test001();
//		
//		
//		ListNode l3 = test.mergeTwoLists(l1, l2);
//		while( l3.next!=null ) {
//			System.out.println(l3.val);
//			l3 = l3.next;
//		}
//		
	}
}
```

#### CPP

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
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (l1 == nullptr) {
            return l2;
        }

        if (l2 == nullptr) {
            return l1;
        }

        ListNode *mergeHead = nullptr;
        if (l1->val < l2->val) {
            mergeHead = l1;
            mergeHead->next = mergeTwoLists(l1->next, l2);
        } else {
            mergeHead = l2;
            mergeHead->next = mergeTwoLists(l1, l2->next);
        }

        return mergeHead;
    }
};
```


## Attention

递归函数

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfysqjb2vj30e901z3ys.jpg)

**两个链表头部较小的一个与剩下元素的 merge 操作结果合并**

选取l1和l2中较小的一个结点，如果l1<l2, 选取l1第一个结点，并递归的调用l1第二个元素开始和l2所有剩下结点的merge操作。

如果 l1 或者 l2 一开始就是 null ，那么没有任何操作需要合并，所以我们只需要返回非空链表。否则，我们要判断 l1 和 l2 哪一个的头元素更小，然后递归地决定下一个添加到结果里的值。如果两个链表都是空的，那么过程终止，所以递归过程最终一定会终止。




