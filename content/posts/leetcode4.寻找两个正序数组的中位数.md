---
title: leetcode4.寻找两个正序数组的中位数
date: '2023-03-07'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 二分法
- 归并
categories:
- LeetCode
---
## Question-4

>
> 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。 
>
>  算法的时间复杂度应该为 O(log (m+n)) 。 
>
> 
>
>  示例 1： 
>
>
> 输入：nums1 = [1,3], nums2 = [2]
> 输出：2.00000
> 解释：合并数组 = [1,2,3] ，中位数 2
>
>
>  示例 2： 
>
>
> 输入：nums1 = [1,2], nums2 = [3,4]
> 输出：2.50000
> 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
>
> 
>
> 
>
>
>  提示： 
>
>
>  nums1.length == m 
>  nums2.length == n 
>  0 <= m <= 1000 
>  0 <= n <= 1000 
>  1 <= m + n <= 2000 
>  -10⁶ <= nums1[i], nums2[i] <= 10⁶ 
>
>
>  Related Topics 数组 二分查找 分治 👍 6337 👎 0
>



## Answer-4

```cpp
/*
 * 4
 * nums1 = [1,2], nums2 = [3,4]
 * 2.50000
 */
double findMedianSortedArrays_func1_merge(vector<int>& nums1, vector<int>& nums2) {
    int len = nums1.size() + nums2.size();
    vector<int> res(len, 0);
    int i = 0, j = 0, k = 0;
    while (i < nums1.size() && j < nums2.size()) {
        if (nums1[i] < nums2[j]) {
            res[k++] = nums1[i++];
        } else {
            res[k++] = nums2[j++];
        }
    }
    while (i < nums1.size()) res[k++] = nums1[i++]; //nums1更长，把nums1剩下的加上
    while (j < nums2.size()) res[k++] = nums2[j++]; //nums2更长，把nums2剩下的加上
//    for (auto it : res) printf("%d ", it);
    printf("\n");
    if (k % 2) {
        return res[k/2];
    } else {
        return (res[k/2-1] + res[k/2]) / 2.0;
    }
}
```

## Attention

1. 使用归并的方式，合并两个有序数组，得到一个大的有序数组。大的有序数组的中间位置的元素，即为中位数
2. 时间复杂度是 O(m+n)，空间复杂度是 O(m+n)
