---
title: leetcode18.四数之和
date: '2020-03-07'
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
# leetcode18.四数之和

## Question

> 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

> 注意：

> 答案中不可以包含重复的四元组。

> 示例：
> 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

> 满足要求的四元组集合为：
> [
>   [-1,  0, 0, 1],
>   [-2, -1, 1, 2],
>   [-2,  0, 0, 2]
> ]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer


```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
	public List<List<Integer>> fourSum(int[] nums, int target){
		List<List<Integer>> ans = new ArrayList<>();
		Arrays.sort(nums);
		int len = nums.length;
		for(int a=0; a<len-1; a++) {
			//此步k要跟0比
			if((a>0) && nums[a] == nums[a-1])	continue;
			for(int k=a+1; k<len-1; k++) {
				//注意此处k指针只能右移，此步去重
				if((k>a+1) && nums[k] == nums[k-1])	continue;
				int i = k+1;
				int j = len-1;
				while(i < j) {
					int sum = nums[a] + nums[k] + nums[i] + nums[j];
					if(sum < target) {
						++i;
					}else if(sum > target) {
						--j;
					}else {
						ans.add(new ArrayList<Integer>(Arrays.asList(nums[a],nums[k], nums[i], nums[j])));
						while((i<j) && nums[i+1] == nums[i])	++i;
						while((i<j) && nums[j-1] == nums[j])	--j;
						++i;
						--j;
					}
				}
			}
		}
		return ans;
    }
}
```

## Attention

* 在三数之和的 O(N^2) 的外面加一层循环，即可实现。
* 时间复杂度`a遍历O(N)里嵌套k遍历O(N)再嵌套i,j双指针O(N)--> O(N^3)
`


