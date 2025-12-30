---
title: leetcode112.路径总和
date: '2022-05-12'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- tree
- bfs
categories:
- LeetCode
---
## Question

> 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和
>  targetSum 。如果存在，返回 true ；否则，返回 false 。 
>
>  叶子节点 是指没有子节点的节点。 
>
> 
>
>  示例 1： 
>
>
> 输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
> 输出：true
> 解释：等于目标和的根节点到叶节点路径如上图所示。
>
>
>  示例 2： 
>
>
> 输入：root = [1,2,3], targetSum = 5
> 输出：false
> 解释：树中存在两条根节点到叶子节点的路径：
> (1 --> 2): 和为 3
> (1 --> 3): 和为 4
> 不存在 sum = 5 的根节点到叶子节点的路径。 
>
>  示例 3： 
>
>
> 输入：root = [], targetSum = 0
> 输出：false
> 解释：由于树是空的，所以不存在根节点到叶子节点的路径。
>
> 
>
>
>  提示： 
>
>
>  树中节点的数目在范围 [0, 5000] 内 
>  -1000 <= Node.val <= 1000 
>  -1000 <= targetSum <= 1000 
>
>  Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 877 👎 0
>




## Answer


```cpp
//112
//        5
//   4        8
// 11   n   13  4
//7  2 n n n  1
//5.4.11.2=22
//从root开始，用sum减去路过的结点值，到达叶子结点时判断sum是否为0，为0则true。
//递归的循环左右子树，用或条件。
bool hasPathSum(TreeNode* root, int targetSum) {
    if (!root)
        return false;
    targetSum -= root->val;
    if (!root->left && !root->right) {
        if (targetSum == 0) {
            return true;
        } else {
            return false;
        }
    }
    return hasPathSum(root->left, targetSum) || hasPathSum(root->right, targetSum);
}

//bfs,遍历
bool hasPathSum2(TreeNode* root, int targetSum) {
    if (!root)
        return false;
    queue<TreeNode*> qNode;
    queue<int> qValue;
    qNode.push(root);
    qValue.push(root->val);
    while (!qNode.empty()) {
        TreeNode* now = qNode.front();
        int tmpV = qValue.front();
        qNode.pop();
        qValue.pop();
        if (!now->left && !now->right) {
            //到达叶子结点，判断，返回
            if (tmpV == targetSum) {
                return true;
            }
            continue;//如果不等，需要继续向下遍历，先左后右
        }
        if (now->left) {
            qNode.push(now->left);
            qValue.push(tmpV + now->left->val);
        }
        if (now->right) {
            qNode.push(now->right);
            qValue.push(tmpV + now->right->val);
        }
    }
    return false;
}    
```

## Attention

