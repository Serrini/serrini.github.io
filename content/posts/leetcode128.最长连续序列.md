---
title: leetcode128.最长连续序列
date: '2022-05-19'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 并查集
categories:
- LeetCode
---
## Question

> 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。 
>
>  请你设计并实现时间复杂度为 O(n) 的算法解决此问题。 
>
> 
>
>  示例 1： 
>
>
> 输入：nums = [100,4,200,1,3,2]
> 输出：4
> 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。 
>
>  示例 2： 
>
>
> 输入：nums = [0,3,7,2,5,8,4,6,0,1]
> 输出：9
>
> 
>
>
>  提示： 
>
>  0 <= nums.length <= 10⁵ 
>  -10⁹ <= nums[i] <= 10⁹ 
>
>  Related Topics 并查集 数组 哈希表 👍 1254 👎 0
>




## Answer


```cpp
//128最长连续序列，并查集
//in：nums = [100,4,200,1,3,2]
//4
//in：nums = [0,3,7,2,5,8,4,6,0,1]
//9
unordered_map<int, int> fa, cnt;
int find0(int x) {
    //无压缩find
    while (fa[x] != x)
        x = fa[x];//向上找
    return x;//return root
}
int find(int x) {
    //压缩路径，fa[x]==root
    if (fa[x] == x)
        return x;//出口，root
    return fa[x] = find(fa[x]);
}
int join(int x, int y) {
    //合并，修改每颗合并后的层高
    x = find(x);
    y = find(y);
    if (x==y)	return cnt[x];
    if (cnt[x] > cnt[y]) {
        fa[y] = x;
        cnt[x] += cnt[y];
        return cnt[x];
    } else {
        fa[x] = y;
        cnt[y] += cnt[x];
        return cnt[y];
    }
}
int longestConsecutive(vector<int>& nums) {
    if (!nums.size()) return 0;
    for (auto x : nums) {
        //让每个num自成一个子树，指定层高为1
        fa[x] = x;
        cnt[x] = 1;
    }
    int res = 1;
    for (auto x : nums) {
        //遍历nums，如果x+1也在nums中，则合并这两个子树
        if (fa.count(x+1)) {
            //统计合并后子树层高，与之前的res取大的一个
            res = max(res, join(x, x+1));
        }
    }
    return res;
}
```

## Attention

