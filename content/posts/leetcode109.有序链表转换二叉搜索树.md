---
title: leetcode109.有序链表转换二叉搜索树
date: '2022-05-11'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- tree
- BST
categories:
- LeetCode
---
## Question

>
> 给定一个单链表的头节点 head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。 
>
>  本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。 
>
> 
>
>  示例 1: 
>
> 
>
>
> 输入: head = [-10,-3,0,5,9]
> 输出: [0,-3,9,-10,null,5]
> 解释: 一个可能的答案是[0，-3,9，-10,null,5]，它表示所示的高度平衡的二叉搜索树。
>
>
>  示例 2: 
>
>
> 输入: head = []
> 输出: []
>
> 
>
>
>  提示: 
>
>
>  head 中的节点数在[0, 2 * 10⁴] 范围内 
>  -10⁵ <= Node.val <= 10⁵ 
>
>  Related Topics 树 二叉搜索树 链表 分治 二叉树 👍 702 👎 0


## Answer


```cpp
//in: head = [-10,-3,0,5,9]
//out: [0,-3,9,-10,null,5]
TreeNode *buildTree1(ListNode *head, ListNode *tail) {
    //递归边界，head==tail
    if (head == tail)   return nullptr;
    ListNode *fast = head;
    ListNode *slow = head;
    while (fast != tail && fast->next != tail) {
        slow = slow->next;
        fast = fast->next->next;
    }
    TreeNode *root = new TreeNode(slow->val);//双指针找到中间结点
    root->left = buildTree(head, slow);
    root->right = buildTree(slow->next, tail);
    return root;
}
TreeNode* sortedListToBST1(ListNode* head) {
    return buildTree1(head, nullptr);
}


//vector
TreeNode *buildTree2(vector<int> v, int begin, int end){
    if (begin == end)   return nullptr;
    int mid = (begin+end)/2;
    TreeNode *root = new TreeNode(v[mid]);
    root->left = buildTree1(v, begin, mid);
    root->right = buildTree1(v, mid+1, end);
    return root;
}
TreeNode* sortedListToBST2(ListNode* head) {
    vector<int> vec;
    while (head != nullptr) {
        vec.push_back(head->val);
        head = head->next;
    }
    return buildTree2(vec, 0, vec.size());
}
```

## Attention
