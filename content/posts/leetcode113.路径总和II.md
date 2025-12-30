---
title: leetcode113.路径总和II
date: '2022-05-12'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- tree
- dfs
categories:
- LeetCode
---
## Question

> 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。 
>
>  叶子节点 是指没有子节点的节点。 
>
> 
>
> 
>
>  示例 1： 
>
>
> 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
> 输出：[[5,4,11,2],[5,8,4,5]]
>
>
>  示例 2： 
>
>
> 输入：root = [1,2,3], targetSum = 5
> 输出：[]
>
>
>  示例 3： 
>
>
> 输入：root = [1,2], targetSum = 0
> 输出：[]
>
> 
>
>
>  提示： 
>
>
>  树中节点总数在范围 [0, 5000] 内 
>  -1000 <= Node.val <= 1000 
>  -1000 <= targetSum <= 1000 
>
> 
>
>  Related Topics 树 深度优先搜索 回溯 二叉树 👍 745 👎 0
>




## Answer


```cpp
//113，跟112相比需要找出所有的路径,dfs
void dfs(TreeNode* root, vector<vector<int>> &res, vector<int> &cur, int targetSum) {
    if (!root)
        return;
    cur.push_back(root->val);
    if (root && !root->left && !root->right && root->val == targetSum) {
        res.push_back(cur);
    }

    dfs(root->left, res, cur, targetSum-root->val);
    dfs(root->right, res, cur, targetSum-root->val);
    cur.pop_back();
}
vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
    vector<vector<int>> res;
    vector<int> cur;
    dfs(root, res, cur, targetSum);
    return res;
}
```

## Attention

