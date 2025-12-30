---
title: leetcode24.两两交换链表中的节点
date: '2020-03-03'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
categories:
- LeetCode
---
# leetcode24.两两交换链表中的节点

## Question

> 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
> 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
>  
> 示例:
> 给定 1->2->3->4, 你应该返回 2->1->4->3.


## Answer

迭代法

```java
//Definition for singly-linked list.
public class ListNode {
  int val;
  ListNode next;
  ListNode(int x) { val = x; }
}

class Solution {
  //迭代
  public ListNode swapPairs(ListNode head) {
    ListNode dummyNode = new ListNode(0);
    dummyNode.next = head;
    //dummyNode用以记住交换后的链表头结点
    
    ListNode preNode = dummyNode;
    while((head!=null) && (head.next!=null)) {
    //head为每次要交换的两个结点的第一个结点
    //只剩一个结点或不剩结点的时候退出
      ListNode firstNode = head;
      ListNode secondNode = head.next;
      //swap
      preNode.next = secondNode;
      firstNode.next = secondNode.next;
      secondNode.next = firstNode;
      
      preNode = firstNode;
      head = firstNode.next;
    }
      return dummyNode.next;
  }
}
```

递归法

```java

//Definition for singly-linked list.
public class ListNode {
  int val;
  ListNode next;
  ListNode(int x) { val = x; }
}


class Solution {
    public ListNode swapPairs(ListNode head) {
        // If the list has no node or has only one node left.
        if ((head == null) || (head.next == null)) {
            return head;
        }

        // Nodes to be swapped
        ListNode firstNode = head;
        ListNode secondNode = head.next;

        // Swapping
        firstNode.next  = swapPairs(secondNode.next);
        secondNode.next = firstNode;

        // Now the head is the second node
        return secondNode;
    }
}
```

## Attention

* 迭代法

每次处理firstNode和secondNode的交换，head结点指示交换前的firstNode，用以判断是否还需要交换（只剩下一个结点或不剩结点则不需要交换），head结点有指针的作用，控制迭代。

dummyNode结点的作用是记住第一次交换前的firstNode的位置，用以返回。

时间复杂度：O(N)，其中N指的是链表的节点数量
空间复杂度：O(1) 

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcgnmf5g1aj31e20u04ff.jpg)

* 递归
  * 从链表的头节点 head 开始递归。
  * 每次递归都负责交换一对节点。由 firstNode 和 secondNode 表示要交换的两个节点。
  * 下一次递归则是传递的是下一对需要交换的节点。若链表中还有节点，则继续递归。
  * 交换了两个节点以后，返回 secondNode，因为它是交换后的新头。
在所有节点交换完成以后，我们返回交换后的头，实际上是原始链表的第二个节点。








