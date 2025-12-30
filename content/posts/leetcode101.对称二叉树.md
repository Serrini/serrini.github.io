---
title: leetcode101.对称二叉树
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

> 给你一个二叉树的根节点 root ， 检查它是否轴对称。 
>
> 
>
>  示例 1： 
>
>
> 输入：root = [1,2,2,3,4,4,3]
> 输出：true
>
>
>  示例 2： 
>
>
> 输入：root = [1,2,2,null,3,null,3]
> 输出：false
>
> 
>
>
>  提示： 
>
>
>  树中节点数目在范围 [1, 1000] 内 
>  -100 <= Node.val <= 100 
>
> 
>
>
>  进阶：你可以运用递归和迭代两种方法解决这个问题吗？ 
>  Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 1908 👎 0
>

## Answer


```cpp
//同100，递归出口条件不同
bool isMirror(TreeNode* p, TreeNode* q) {
    if (!p && !q)
        return true;//左右两个结点有都为空，出口
    if (!p || !q)
        return false;//左右两个结点只有一个为空，说明不对称
    if (p->val == q->val) {
        return isMirror(p->left, q->right) && isMirror(p->right, q->left);
    } else {
        return false;
    }
}
//递归
bool isSymmetric1(TreeNode* root) {
    if (!root)
        return true;
    return isMirror(root->left, root->right);
}


//迭代
bool isSymmetric2(TreeNode* root) {
    if (!root)
        return true;
    queue<TreeNode*> q;
    q.push(root->left);
    q.push(root->right);
    //左右子树分别比较
    while (!q.empty()) {
        auto p1 = q.front();
        q.pop();
        auto p2 = q.front();
        q.pop();
        if (!p1 && !p2)
            continue;
        if (!p1 || !p2)
            return false;
        if (p1->val != p2->val) {
            return false;
        }
        q.push(p1->left);
        q.push(p2->right);
        q.push(p1->right);
        q.push(p2->left);//注意顺序
    }
    return true;
}
```

## Attention
