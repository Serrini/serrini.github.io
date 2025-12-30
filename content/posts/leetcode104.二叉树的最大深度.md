---
title: leetcode104.二叉树的最大深度
date: '2022-03-01'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- tree
- 二叉树遍历
- dfs
- bfs
categories:
- LeetCode
---
# leetcode104.二叉树的最大深度

## Question

> 给定一个二叉树，找出其最大深度。 
>
>  二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。 
>
>  说明: 叶子节点是指没有子节点的节点。 
>
>  示例： 
> 给定二叉树 [3,9,20,null,null,15,7]， 
>
> ​    3
>    / \
>   9  20
> ​      /  \
>    15   7 
>
>  返回它的最大深度 3 。 
>  Related Topics 树 深度优先搜索 广度优先搜索 二叉树 
>  👍 1125 👎 0

## Answer

```cpp
#include <iostream>
#include <queue>
using namespace std;
struct TreeNode {
int val;
TreeNode *left;
TreeNode *right;
TreeNode() : val(0), left(nullptr), right(nullptr) {}
TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

void CreatBinaryTreeByLevelVec(const vector<int>& vec, TreeNode* &cur, int index)
{
    if (index < vec.size() && vec[index] != -1) {
        cur = new TreeNode(vec[index]);
        CreatBinaryTreeByLevelVec(vec, cur->left, 2*index+1);
        if (2*index+2 < vec.size()) {
            CreatBinaryTreeByLevelVec(vec, cur->right, 2*index+2);
        }
    }
}


void CreatBinaryTreeByPreVec(const vector<int>& vec, TreeNode* &cur, int index)
{
    if (index < vec.size() && vec[index] != -1)//不能越界
    {
        cur = new TreeNode(vec[index]);
        cout << "cur: " << cur->val << endl;
        CreatBinaryTreeByPreVec(vec, cur->left, ++index);
        CreatBinaryTreeByPreVec(vec, cur->right, ++index);
    }
}

int maxDepthByDFS(TreeNode* root) {
    //DFS
    if (root == nullptr) return 0;
    return (max(maxDepthByDFS(root->left), maxDepthByDFS(root->right)) + 1);
}

int maxDepthByBFS(TreeNode* root) {
    //按照层来循环，每一层循环的长度为此层元素的个数，每次pop出最左侧的元素；如果该元素有子节点，将子节点加入队列；遍历完一层，ans+1
    if (root == nullptr) return 0;
    queue<TreeNode*> Q;
    Q.push(root);
    int ans = 0;
    while(!Q.empty()) {
        int len = Q.size();
        for (int i = 0; i < len; ++i) {
            TreeNode *node = Q.front();
            Q.pop();

            if (node->left) {
                Q.push(node->left);
            }
            if (node->right) {
                Q.push(node->right);
            }
        }
        ans += 1;
    }

    return ans;
}

int main() {
    vector<int> vec = {3,9,20,-1,-1,15,7};
    TreeNode* root = nullptr;
    CreatBinaryTreeByLevelVec(vec, root, 0);
//    int res = maxDepthByDFS(root);
    int res = maxDepthByBFS(root);
    std::cout << res << std::endl;
    return 0;
}

```

## Attention


