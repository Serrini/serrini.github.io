---
title: leetcode912.排序数组
date: '2022-05-30'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- sort
categories:
- LeetCode
---
## Question

> 给你一个整数数组 nums，请你将该数组升序排列。 
>
> 
>
> 
>
>
>  示例 1： 
>
> 输入：nums = [5,2,3,1]
> 输出：[1,2,3,5]
>
>
>  示例 2： 
>
>
> 输入：nums = [5,1,1,2,0,0]
> 输出：[0,0,1,1,2,5]
>
> 
>
>
>  提示： 
>
>
>  1 <= nums.length <= 5 * 104 
>  -5 * 104 <= nums[i] <= 5 * 104 
>
>  Related Topics 数组 分治 桶排序 计数排序 基数排序 排序 堆（优先队列） 归并排序 
>  👍 535 👎 0




## Answer


```cpp
void quickSort(vector<int>&nums, int left, int right) {
    if (left >= right) return;
    int privot = nums[left];//privot选择左边的数，让j指针先向左移动
    int i = left;
    int j = right;
    while(i < j) {
        while(nums[j] >= privot && i < j) {
            j--;
        }
        while(nums[i] <= privot && i < j) {
            i++;
        }

        if (i<j) {
            swap(nums[i], nums[j]);
        }
    }
    for(auto it : nums) {
        cout << it << " ";
    }
    cout << endl;

    swap(nums[left], nums[i]);//i==j时

    quickSort(nums, left, i-1);
    quickSort(nums, i+1, right);
}

vector<int> sortArray(vector<int>& nums) {
  	quickSort(nums, 0, nums.size()-1);
 		return nums;
}

//快速排序，从大到小
//AC
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
```

## Attention

1. privot选择左边的数，让j指针先向左移动，privot选择右边的数，让指针i先向右移动。i==j时交换。