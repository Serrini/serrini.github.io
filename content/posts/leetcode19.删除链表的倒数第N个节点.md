---
title: leetcode19.删除链表的倒数第N个节点
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
# leetcode19.删除链表的倒数第N个节点

## Question

> 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

> 示例：
> 给定一个链表: 1->2->3->4->5, 和 n = 2.

> 当删除了倒数第二个节点后，链表变为 1->2->3->5.

> 说明：
> 给定的 n 保证是有效的。

> 进阶：
> 你能尝试使用一趟扫描实现吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer
 
```java
package test001;

public class Test001 {
	public ListNode removeNthFromEnd(ListNode head, int n) {
		int length = 0, pos = 0;
		ListNode dummynode = new ListNode(0);
		dummynode.next = head;
		
		while(head!=null) {
			length++;
			head = head.next;
		}
	    
		pos = length-n;
		head = dummynode;
		for(int i=0; i<pos; i++) {
			head = head.next;
		}
		head.next = head.next.next;
		return dummynode.next;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

## Attention

* 两趟遍历

![](https://tva1.sinaimg.cn/large/00831rSTgy1gcfzzi374wj309x04k3yt.jpg)

第一次遍历链表获得链表长度length，pos即需要删除的结点的前一个结点，pos为length-n，n是倒数第n个结点。
需要引入dummynode记录原来的头结点，用以第二次遍历获得pos。pos的数值即为从dummynode所做的next更新操作的次数。
删除的操作只需要将要删除的前一个结点链接到要删除结点的后一个结点，即跳过他。


