---
title: leetcode215.数组中的第K个最大元素
date: '2022-04-24'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- vec
- quicksort
categories:
- LeetCode
---
## Question

> 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。 
>
>  请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。 
>
> 
>
>  示例 1: 
>
>
> 输入: [3,2,1,5,6,4] 和 k = 2
> 输出: 5
>
>
>  示例 2: 
>
>
> 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
> 输出: 4 
>
> 
>
>  提示： 
>
>
>  1 <= k <= nums.length <= 104 
>  -104 <= nums[i] <= 104 
>
>  Related Topics 数组 分治 快速选择 排序 堆（优先队列） 
>  👍 1620 👎 0

## Answer

```cpp
//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
public:
    void quickSort2(vector<int>&nums, int left, int right) {
        if (left >= right) return;
        int privot = nums[left];
        int i = left;
        int j = right;
        while(i < j) {
            while(nums[j] <= privot && i < j) {
                j--;
            }
            while(nums[i] >= privot && i < j) {
                i++;
            }

            if (i<j) {
                swap(nums[i], nums[j]);
            }
        }

        swap(nums[left], nums[i]);
        quickSort2(nums, left, i-1);
        quickSort2(nums, i+1, right);
    }

    int findKthLargest(vector<int>& nums, int k) {
        quickSort2(nums, 0, nums.size()-1);
        return nums[k-1];
    }
};
//leetcode submit region end(Prohibit modification and deletion)
```

## Attention
1. 暴力从大到小快排，返回下标。