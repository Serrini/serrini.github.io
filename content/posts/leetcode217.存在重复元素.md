---
title: leetcode217.存在重复元素
date: '2022-04-19'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- hashtable
- sort
categories:
- LeetCode
---
## Question

> 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
>
>
>  示例 1： 
>
>
> 输入：nums = [1,2,3,1]
> 输出：true 
>
>  示例 2： 
>
>
> 输入：nums = [1,2,3,4]
> 输出：false 
>
>  示例 3： 
>
>
> 输入：nums = [1,1,1,3,3,4,3,2,4,2]
> 输出：true 
>
> 
>
>  提示： 
>
>
>  1 <= nums.length <= 105 
>  -109 <= nums[i] <= 109 
>
>  Related Topics 数组 哈希表 排序 
>  👍 711 👎 0

## Answer

```cpp
//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> setNum;
        for(auto it : nums) {
            if(setNum.find(it) == setNum.end()) {
                setNum.insert(it);
            } else {
                return true;
            }
        }
        return false;
    }
};
//leetcode submit region end(Prohibit modification and deletion)
```

## Attention
1. hashtable，需要```#include <unordered_set>```。
2. 判断链表是否有环时可以用到，202，141，142。