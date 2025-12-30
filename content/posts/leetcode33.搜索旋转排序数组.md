---
title: leetcode33.搜索旋转排序数组
date: '2020-03-06'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
categories:
- LeetCode
---
# leetcode33.搜索旋转排序数组

## Question

> 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

> ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

> 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

> 你可以假设数组中不存在重复的元素。

> 你的算法时间复杂度必须是 O(log n) 级别。

> 示例 1:
> 输入: nums = [4,5,6,7,0,1,2], target = 0
> 输出: 4

> 示例 2:
> 输入: nums = [4,5,6,7,0,1,2], target = 3
> 输出: -1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer


```java
package pid33;

public class Solution {

	public int search(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        int left = 0;
        int right = nums.length - 1;
        int pivot;
        while (left <= right) {
            pivot = left + (right - left) / 2;
            if (nums[pivot] == target) {
                return pivot;           
            }
            
            //左半边升序
            if (nums[left] <= nums[pivot]) {
            	if(target >= nums[left] && target < nums[pivot]) {
            		right = pivot - 1;
            	}else {
            		left = pivot + 1;
            	}
            }else {
            	if(target > nums[pivot] && target <= nums[right]) {
            		left = pivot + 1;
            	}else {
            		right = pivot - 1;
            	}
            }
        }
        return -1;
	}
}
```


## Attention

官方解法思路：

* 二分法找到数组中最小的元素，并记录下该处rotation index
* 比较target与第一个数组元素的大小
	* 如果target>nums[0]，则在rotation index的左边查找
	* 如果taeget<nums[0]，则在rotation index的右边查找
* 查找过程用二分法

另一解法：

* 首先数字无重复
* nums[left]与nums[pivot]比较由此可分成两类情况
	* 一类是`nums[left]<=nums[pivot]`，即**前半部分有序**，如**2 3 4 5 6 7 1**，在这种情况下如果target在左边就到左边去找，如果target在右边则修改left到右边去找
	* 一类是`nums[left]>nums[pivot]`，即**后半部分有序**，如**6 7 1 2 3 4 5**，即**6>2**。此时如果target在升序部分就去右边去找，如果不是就修改right到左边去找
* 技巧是找出升序的部分，如果是左边升序的情况，判断条件`target>=nums[left] && target < nums[pivot]`取反之后是`target<nums[left] || target >= nums[pivot]`，就会去右边找，右边升序的情况同理。

