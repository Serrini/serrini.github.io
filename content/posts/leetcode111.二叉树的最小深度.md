---
title: leetcode111.二叉树的最小深度
date: '2022-05-12'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- tree
- dfs
- bfs
categories:
- LeetCode
---
## Question

> 给定一个二叉树，找出其最小深度。 
>
>  最小深度是从根节点到最近叶子节点的最短路径上的节点数量。 
>
>  说明：叶子节点是指没有子节点的节点。 
>
> 
>
>  示例 1： 
>
>
> 输入：root = [3,9,20,null,null,15,7]
> 输出：2
>
>
>  示例 2： 
>
>
> 输入：root = [2,null,3,null,4,null,5,null,6]
> 输出：5
>
> 
>
>
>  提示： 
>
>
>  树中节点数的范围在 [0, 10⁵] 内 
>  -1000 <= Node.val <= 1000 
>
>  Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 749 👎 0
>


## Answer


```cpp
//111，求二叉树的最小深度（最小深度是指从根节点到叶节点的最短距离）
//dfs，递归
int minDepth(TreeNode* root) {
    if (!root)
        return 0;
    if (!root->left && !root->right) {
        return 1;
    }
    int minDepthRes = INT_MAX;//最大！！
    if (root->left)
        minDepthRes = min(minDepthRes, minDepth(root->left));
    if (root->right)
        minDepthRes = min(minDepthRes, minDepth(root->right));
    return 1+minDepthRes;
}

//非递归层次遍历
int minDepth2(TreeNode* root) {
    if (!root)
        return 0;
    queue<TreeNode*> q;
    q.push(root);
    int depth = 0;
    while (!q.empty()) {
        depth++;
        int len = q.size();
        for (int i = 0; i < len; ++i) {
            TreeNode *tmp = q.front();
            q.pop();
            if (!tmp->left && !tmp->right) {
                //无左右子结点即退出
                return depth;
            }
            if (tmp->left)
                q.push(tmp->left);
            if (tmp->right)
                q.push(tmp->right);
        }
    }
    return depth;
}
```

## Attention

