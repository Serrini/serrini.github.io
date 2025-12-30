---
title: leetcode105.从前序与中序遍历序列构造二叉树.106.从中序与后序遍历序列构造二叉树
date: '2022-05-31'
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

> 105
>
> 给定一棵树的前序遍历 preorder 与中序遍历 inorder。请构造二叉树并返回其根节点。 
> 
> 
> 
>  示例 1: 
> 
> 
> Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
> Output: [3,9,20,null,null,15,7]
> 
> 
>  示例 2: 
> 
> 
> Input: preorder = [-1], inorder = [-1]
> Output: [-1]
> 
> 
> 
> 
>  提示: 
> 
> 
>  1 <= preorder.length <= 3000 
>  inorder.length == preorder.length 
>  -3000 <= preorder[i], inorder[i] <= 3000 
>  preorder 和 inorder 均无重复元素 
>  inorder 均出现在 preorder 
>  preorder 保证为二叉树的前序遍历序列 
>  inorder 保证为二叉树的中序遍历序列 
> 
>  Related Topics 树 数组 哈希表 分治 二叉树 
>  👍 1258 👎 0




## Answer


```cpp
//105 ac
//Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
TreeNode* builder(vector<int>& preorder, int pre_start, int pre_end, vector<int>& inorder, int in_start, int in_end) {
    if (pre_start == pre_end) {
        return nullptr;
    }
    TreeNode *root = new TreeNode(preorder[pre_start]);
    int in_root;
    for (int i = in_start; i < in_end; ++i) {
        if (inorder[i] == root->val) {
            printf("root->val[%d]\n", root->val);
            in_root = i;
            break;
        }
    }
    int left_len = in_root - in_start;
    root->left = builder(preorder, pre_start + 1, pre_start + left_len + 1, inorder, in_start, in_root);
    root->right = builder(preorder, pre_start + left_len + 1, pre_end, inorder, in_root + 1, in_end);
    return root;
}
TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    return builder(preorder, 0, preorder.size(), inorder, 0, inorder.size());
}

//105 ac
//Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
TreeNode* builder_105(vector<int>& preorder, int pre_start, int pre_end, vector<int>& inorder, int in_start, int in_end) {
//    if (pre_end < pre_start) {
//        return nullptr;
//    }
    if (in_end < in_start) {
        //递归边界可以是in可以是pre
        return nullptr;
    }
    printf("pre_start[%d], pre_end[%d], in_start[%d], in_end[%d]\n", pre_start, pre_end, in_start, in_end);
    TreeNode *root = new TreeNode(preorder[pre_start]);//pre的第一个结点作为root,3
    int in_root;
    for (int i = in_start; i <= in_end; ++i) {
        if (inorder[i] == root->val) {
            printf("root->val[%d]\n", root->val);
            in_root = i;//在in数组中找到值为root的结点
            break;
        }
    }
    int left_len = in_root - in_start;//1=1-0
    //注意边界，左子树[in_start, in_root-1], [pre_start+1, pre_start+left_len];
    //右子树[in_root+1, in_end], [pre_start+left_len+1, pre_end];
    //对于in数组，选择左右子树时候，左子树是in_root-1，右子树是in_root+1
    //对于pre数组，选择左右子树的时候，左子树需要pre_start+1(pre_start是根结点), 右子树还是pre_end
    root->left = builder_105(preorder, pre_start + 1, pre_start + left_len, inorder, in_start, in_root - 1);
    root->right = builder_105(preorder, pre_start + left_len + 1, pre_end, inorder, in_root + 1, in_end);
    return root;
}
TreeNode* buildTree_105(vector<int>& preorder, vector<int>& inorder) {
    return builder(preorder, 0, preorder.size()-1, inorder, 0, inorder.size()-1);
}
```

## Question

> 106
>
> 根据一棵树的中序遍历与后序遍历构造二叉树。 
>
> 注意: 
> 你可以假设树中没有重复的元素。 
>
> 例如，给出 
>
> 中序遍历 inorder = [9,3,15,20,7]
> 后序遍历 postorder = [9,15,7,20,3] 
>
> 返回如下的二叉树： 
>
>   3
> / \
> 9  20
>  /  \
> 15   7
>
> Related Topics 树 数组 哈希表 分治 二叉树 
> 👍 598 👎 0
>

## Answer

```cpp
//106 ac
//inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
TreeNode* builder_106(vector<int>& inorder, int in_start, int in_end, vector<int>& postorder, int post_start, int post_end) {
    if (in_end < in_start) {
        return nullptr;
    }
    TreeNode *root = new TreeNode(postorder[post_end]);//post的最后一个结点作为root
    int in_root;
    for (int i = in_start; i <= in_end; ++i) {
        if (inorder[i] == root->val) {
            printf("root=[%d], in_root=[%d]\n", root->val, i);
            in_root = i;//在in数组中找到值为root的结点
            break;
        }
    }
    int left_len = in_root - in_start;//1
    //注意边界，左子树[in_start, in_root-1], [post_start, post_start+left_len-1];
    //右子树[in_root+1, in_end], [post_start+left_len, post_end-1];
    //对于in数组，选择左右子树时候，左子树是in_root-1，右子树是in_root+1
    //对于pre数组，选择左右子树的时候，左子树需要post_start, 右子树是post_end-1(post_end是根结点)
    root->left = builder_106(inorder, in_start, in_root - 1, postorder, post_start, post_start + left_len - 1);
    root->right = builder_106(inorder, in_root + 1, in_end, postorder, post_start + left_len, post_end - 1);
    return root;
}

TreeNode* buildTree_106(vector<int>& inorder, vector<int>& postorder) {
    return builder_106(inorder, 0, inorder.size()-1, postorder, 0, postorder.size()-1);
}
```


## Attention
