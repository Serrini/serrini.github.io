---
title: leetcode114.二叉树展开为链表
date: '2022-05-11'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- tree
categories:
- LeetCode
---
## Question

> 给你二叉树的根结点 root ，请你将它展开为一个单链表： 
>
>展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。 
>  展开后的单链表应该与二叉树 先序遍历 顺序相同。 
>  
>
> 
>
>示例 1： 
>  
>
>输入：root = [1,2,5,3,4,null,6]
> 输出：[1,null,2,null,3,null,4,null,5,null,6]
> 
>
>示例 2： 
>  
>
>输入：root = []
> 输出：[]
> 
>
>示例 3： 
>  
>输入：root = [0]
> 输出：[0]
> 
>
> 
>
>提示： 
>  
>
>树中结点数在范围 [0, 2000] 内 
>  -100 <= Node.val <= 100 
>  
>
> 
>进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？ 
>  Related Topics 栈 树 深度优先搜索 链表 二叉树 👍 1166 👎 0


## Answer


```cpp
//114
//in：root = [1,2,5,3,4,null,6]
//out：[1,null,2,null,3,null,4,null,5,null,6]
//前序遍历存到数组后，第i个元素left置空，right指向后一个元素
void preOrder(TreeNode* root, vector<TreeNode*> &v) {
    if (root == nullptr) return;
    v.push_back(root);
    preOrder(root->left, v);
    preOrder(root->right, v);
}
void flatten(TreeNode* root) {
    if (root == nullptr) return;//[]
    vector<TreeNode*> vec;
    preOrder(root, vec);
    for (int i = 0; i < vec.size()-1; i++) {
        vec[i]->left = nullptr;
        vec[i]->right = vec[i+1];//vec[i++]导致stackoverflow
    }
}
```

## Attention

1. 原地？