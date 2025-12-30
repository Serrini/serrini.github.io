---
title: leetcode15.三数之和.16.最接近的三数之和
date: '2020-03-07'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 双指针
- sort
categories:
- LeetCode
---
## Question-15

> 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

> 注意：答案中不可以包含重复的三元组。

> 示例：

> 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

> 满足要求的三元组集合为：
> [
>   [-1, 0, 1],
>   [-1, -1, 2]
> ]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Answer-15



```java
package pid15;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
	public List<List<Integer>> threeSum(int[] nums) {
		List<List<Integer>> ans = new ArrayList<>();
		Arrays.sort(nums);
		int len = nums.length;
		for(int k=0; k<len-1; k++) {
			if(nums[k] > 0)	break;
			if(k>0 && nums[k]==nums[k-1])	continue;
			int i = k+1;
			int j = len-1;
			while(i < j) {
				int sum = nums[k] + nums[i] + nums[j];
				if(sum < 0) {
					++i;
				}else if(sum > 0) {
					--j;
				}else {
					ans.add(new ArrayList<Integer>(Arrays.asList(nums[k], nums[i], nums[j])));
					while((i<j) && nums[i+1] == nums[i])	++i;
					while((i<j) && nums[j-1] == nums[j])	--j;
					++i;
					--j;
				}
			}
		}
		return ans;
		
    }
}

```

```cpp
/*
 * 15三数之和
 * nums = [0,0,0]
 * [[0,0,0]]
 * nums = [-1,0,1,2,-1,-4]
 * [[-1,-1,2],[-1,0,1]]
 * 和为0且不重复的三元组
 * vector<int> vec01 = {34,55,79,28,46,33,2,48,31,-3,84,71,52,-3,93,15,21,-43,57,-6,86,56,94,74,83,-14,28,-66,46,-49,62,-11,43,65,77,12,47,61,26,1,13,29,55,-82,76,26,15,-29,36,-29,10,-70,69,17,49};
 * 测试结果:[[-82,-11,93],[-82,13,69],[-82,17,65],[-82,21,61],[-82,26,56],[-82,33,49],[-82,34,48],[-82,36,46],[-70,-14,84],[-70,-6,76],[-70,1,69],[-70,13,57],[-70,15,55],[-70,21,49],[-70,34,36],[-66,-11,77],[-66,-3,69],[-66,1,65],[-66,10,56],[-66,17,49],[-49,-6,55],[-49,-3,52],[-49,1,48],[-49,2,47],[-49,13,36],[-49,15,34],[-49,21,28],[-43,-14,57],[-43,-6,49],[-43,-3,46],[-43,10,33],[-43,12,31],[-43,15,28],[-43,17,26],[-29,-14,43],[-29,1,28],[-29,12,17]]
 * 期望结果:[[-82,-11,93],[-82,13,69],[-82,17,65],[-82,21,61],[-82,26,56],[-82,33,49],[-82,34,48],[-82,36,46],[-70,-14,84],[-70,-6,76],[-70,1,69],[-70,13,57],[-70,15,55],[-70,21,49],[-70,34,36],[-66,-11,77],[-66,-3,69],[-66,1,65],[-66,10,56],[-66,17,49],[-49,-6,55],[-49,-3,52],[-49,1,48],[-49,2,47],[-49,13,36],[-49,15,34],[-49,21,28],[-43,-14,57],[-43,-6,49],[-43,-3,46],[-43,10,33],[-43,12,31],[-43,15,28],[-43,17,26],[-29,-14,43],[-29,1,28],[-29,12,17],[-14,-3,17],[-14,1,13],[-14,2,12],[-11,-6,17],[-11,1,10],[-3,1,2]]
 */

vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> tmp;
    sort(nums.begin(), nums.end());
    cout << nums.size() << endl;
    for (int i = 0; i < nums.size(); ++i) {
        int l = i + 1, r = nums.size() - 1;
        if (nums[i] > 0) continue;
        if (i > 0 && nums[i] == nums[i-1]) continue; //跳过相同元素，去重，使用continue不使用break
        while (l < r) {
            if (nums[i] + nums[l] + nums[r] > 0) {
                r--;
            } else if (nums[i] + nums[l] + nums[r] < 0) {
                l++;
            } else {
                tmp.clear();
                tmp.push_back(nums[i]);
                tmp.push_back(nums[l]);
                tmp.push_back(nums[r]);
                res.push_back(tmp);
                while (l < r && nums[l] == nums[l+1]) ++l;//去重
                while (l < r && nums[r] == nums[r-1]) --r;
                ++l;
                --r;
             }
        }
    }
    return res;
}

```

## Attention

* 暴力法三重循环会超时
* 先对数组排序，然后双指针移动
* 排序后固定指针k在最左边
* 初始化`i=k+1``j=len-1`，在`while(i<j)`的循环内
	* 如果`sum>0`，大了则是j指针需要左移
	* 如果`sum<0`，小了则是i指针需要由移
	* 如果`sum=0`，用Arrays类的asList方法将数组加入到ans中，并且修改指针，i右移，j左移动
	
* 如何去重？
	* 可以先判断nums[k]，如果>0，不用比较了，k右移动
	* 在i和j指针移动的过程中，如果nums[i]或nums[j]的值相同且连续，可以让指针直接跳过
	
* Arrays类的静态方法sort()可直接对数组进行升序排序

## Question-16-最接近的三数之和

> 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。 
>
>  返回这三个数的和。 
>
>  假定每组输入只存在恰好一个解。 
>
> 
>
>  示例 1： 
>
>
> 输入：nums = [-1,2,1,-4], target = 1
> 输出：2
> 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
>
>
>  示例 2： 
>
>
> 输入：nums = [0,0,0], target = 1
> 输出：0
>
> 
>
>
>  提示： 
>
>
>  3 <= nums.length <= 1000 
>  -1000 <= nums[i] <= 1000 
>  -10⁴ <= target <= 10⁴ 
>
>
>  Related Topics 数组 双指针 排序 👍 1347 👎 0
>

## Answer-16

```cpp
/*
 * 16最接近的三数之和
 * nums = [-1,2,1,-4], target = 1, return 2
 * 与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 */
int threeSumClosest(vector<int>& nums, int target) {
    int closestDif = INT_MAX;
    int flag = 0;
    sort(nums.begin(), nums.end());
    for (int i = 0; i < nums.size(); ++i) {
        int l = i + 1, r = nums.size() - 1;
        while (l < r) {
//            printf("i[%d], l[%d], r[%d]\n", nums[i], nums[l], nums[r]);
            if (nums[i] + nums[l] + nums[r] > target) {
//                closestDif = min(closestDif, nums[i] + nums[l] + nums[r] - target);
                if (nums[i] + nums[l] + nums[r] - target < closestDif) {
                    closestDif = nums[i] + nums[l] + nums[r] - target;
                    flag = 1; //满足条件修改flag，否则用例2,3,8,9,10-16，返回17，正确15
                }
                r--;
            } else if (nums[i] + nums[l] + nums[r] < target) {
//                closestDif = min(closestDif, target - nums[i] - nums[l] - nums[r]);
                if (target - nums[i] - nums[l] - nums[r] < closestDif) {
                    closestDif = target - nums[i] - nums[l] - nums[r];
                    flag = -1;
                }
                l++;
            } else {
                return target;
            }
        }
    }
//    printf("closestDif[%d], flag[%d]\n", closestDif, flag);
    return target + flag * closestDif;
}

```