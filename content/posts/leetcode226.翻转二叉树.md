---
title: leetcode226.翻转二叉树
date: '2022-05-12'
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

> 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。 
>
> 
>
>  示例 1： 
>
> 
>
>
> 输入：root = [4,2,7,1,3,6,9]
> 输出：[4,7,2,9,6,3,1]
>
>
>  示例 2： 
>
> 
>
>
> 输入：root = [2,1,3]
> 输出：[2,3,1]
>
>
>  示例 3： 
>
>
> 输入：root = []
> 输出：[]
>
> 
>
>
>  提示： 
>
>
>  树中节点数目范围在 [0, 100] 内 
>  -100 <= Node.val <= 100 
>
>  Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 1282 👎 0
>




## Answer


```cpp
//226
TreeNode* invertTree(TreeNode* root) {
    if (!root)
        return nullptr;
    TreeNode *tmp = root->left;
    root->left = root->right;
    root->right = tmp;

    invertTree(root->left);
    invertTree(root->right);
    return root;
}
```

## Attention

