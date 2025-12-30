---
title: leetcode142.环形链表II
date: '2022-04-14'
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

>
> 给定一个链表的头节点 head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
>
>  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到
> 链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
>
>  不允许修改 链表。
>
> 
>
> 
>
>
>  示例 1：
>
> 
>
>
> 输入：head = [3,2,0,-4], pos = 1
> 输出：返回索引为 1 的链表节点
> 解释：链表中有一个环，其尾部连接到第二个节点。
>
>
>  示例 2：
>
> 
>
>
> 输入：head = [1,2], pos = 0
> 输出：返回索引为 0 的链表节点
> 解释：链表中有一个环，其尾部连接到第一个节点。
>
>
>  示例 3：
>
> 
>
> 输入：head = [1], pos = -1
> 输出：返回 null
> 解释：链表中没有环。
>
> 
>
>
>  提示：
>
>
>  链表中节点的数目范围在范围 [0, 104] 内
>  -105 <= Node.val <= 105
>  pos 的值为 -1 或者链表中的一个有效索引
>
> 
>
>  进阶：你是否可以使用 O(1) 空间解决此题？
>  Related Topics 哈希表 链表 双指针
>  👍 1517 👎 0



## Answer
```cpp
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (head == nullptr || head->next == nullptr) {
            //[] -1
            //[1] -1
            return nullptr;
        }

        ListNode *slow = head;
        ListNode *fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            if (fast->next->next == nullptr) {
                //[1,2] -1
                return nullptr;
            }
            fast = fast->next->next;
            slow = slow->next;
            if (fast == slow) {
                break;
            }
        }

        if(slow == head) {
            //[1,2] 0
            return slow;
        }  else {
            slow = head;
        }
        while (slow->next != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next;
            if (slow == fast)
                return slow;
        }
        return nullptr;
    }
};
//leetcode submit region end(Prohibit modification and deletion)
```

## Attention
![](https://tva1.sinaimg.cn/large/e6c9d24ely1h19c83y3sbj209j04wwea.jpg)
1. 主要思路是fast_point走的是slow_point的路程的两倍，已知a是head到环起点距离，b是环起点到相遇点距离，c是相遇点到环起点距离。2(a+b)=a+2b+c，即a=c，即从head到环起点的距离等于相遇点到环起点的距离，即当slow和fast相遇时，slow从head以step为1往前，fast从相遇点以step为1往前，第一次相遇点即为环起点。
2. 注：根据测试用例调整，判断特殊情况。