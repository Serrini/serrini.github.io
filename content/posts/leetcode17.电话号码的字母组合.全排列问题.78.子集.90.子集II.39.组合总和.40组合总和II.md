---
title: leetcode17.电话号码的字母组合.全排列问题.78.子集.90.子集II.39.组合总和.40组合总和II
date: '2023-03-07'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 回溯
- dfs
categories:
- LeetCode
---
## Question-17-电话号码的字母组合

> 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。 
>
>  给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。 
>
> 
>
> 
>
>  示例 1： 
>
>
> 输入：digits = "23"
> 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
>
>
>  示例 2： 
>
> 输入：digits = ""
> 输出：[]
>
>
>  示例 3： 
>
>
> 输入：digits = "2"
> 输出：["a","b","c"]
>
> 
>
>
>  提示： 
>
>
>  0 <= digits.length <= 4 
>  digits[i] 是范围 ['2', '9'] 的一个数字。 
>
>
>  Related Topics 哈希表 字符串 回溯 👍 2345 👎 0
>

## Answer-17

```cpp
/*
 * 17电话号码的字母组合
 * 回溯法
 */
void dfs_func2(const vector<string> vecInput, vector<string> &vecOutput, string strRes, int index, string digits) {
    if (index == digits.size()) { //递归边界
        vecOutput.push_back(strRes);
        return;
    }
    int x = digits[index]-'0'; //数组下标
    string strTmp = vecInput[x]; //临时str = "abc"，获取数字代表的字符串
    for (int i = 0; i < strTmp.size(); i++) {
        strRes.push_back(strTmp[i]); //push第index个字符串的第i个字母
        dfs_func2(vecInput, vecOutput, strRes, index+1, digits); //index后移
        printf("strRes[%s]\n", strRes.c_str());
        strRes.pop_back(); //***回溯
    }
}
vector<string> letterCombinations_func2(string digits) {
    const vector<string> strVec = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> vecOutput;
    string str;
    vecOutput.clear();
    if (digits.size() == 0) {return vecOutput;} //测试用例:""、测试结果:[""]、期望结果:[]
    dfs_func2(strVec, vecOutput, str, 0, digits);
    return vecOutput;
}
```

## Q&A-回溯法经典全排列问题

```cpp
/*
 * 17plus_func1
 * {2、3、5、7、9}的全排列问题
 * 回溯法
 */
void backtrace_func1(vector<vector<int>> &vecOutput, vector<int> vecInput, vector<bool> &used, vector<int> vecTmp, int index) {
    /*检验当前维度数组是否是一个解*/
    if (index == vecInput.size()) {
        vecOutput.push_back(vecTmp);
        return;
    }
    /*列举当前维度的所有取值的情况，并且进入到下一维度*/
    for (int i = 0; i < vecInput.size(); i++) {
        if (!used[i]) { //去重
            vecTmp.push_back(vecInput[i]);
            used[i] = true;
            backtrace_func1(vecOutput, vecInput, used, vecTmp, index+1); //进入下一个纬度
            vecTmp.pop_back(); //***需要恢复当前纬度的临时变量修改
            used[i] = false; //***
        }
    }
}
vector<vector<int>> quanpailie(vector<int> vecInput, int size) {
    vector<vector<int>> vecOutput;
    vector<int> vecTmp;
    vector<bool> used = {false};
    backtrace_func1(vecOutput, vecInput, used, vecTmp, 0);
    return vecOutput;
}

```

## Question-78-子集

>
> 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。 
>
>  解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。 
>
> 
>
>  示例 1： 
>
> 输入：nums = [1,2,3]
> 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
>
>
>  示例 2： 
>
>
> 输入：nums = [0]
> 输出：[[],[0]]
>
> 
>
>
>  提示： 
>
>
>  1 <= nums.length <= 10 
>  -10 <= nums[i] <= 10 
>  nums 中的所有元素 互不相同 
>
>
>  Related Topics 位运算 数组 回溯 👍 1947 👎 0
>


## Answer-78

```cpp
/*
 * 78子集合问题 ac code
 * 2、3、5，对应的index表示位置取值012
 * index取0时（0、01、012），index取1时（1、12），index取2的时候（2）
 * 2、3、5总共有「空、2、23、235、25、3、35、5」共8种结果
 * 下标表示即共有「空、0、01、012、02、1、12、2」
 * 1、2、3总共有「空、1、12、123、13、2、23、3」共8种结果
 * 下标表示即共有「空、0、01、012、02、1、12、2」
 *
 * 没有约束条件，所有路径都应该加入结果集
 */
void backtrace_func78(vector<vector<int>> &vecOutput, vector<int> vecInput, vector<int> vecTmp, int index) {
    printf("index[%d]\n", index);
    for (auto it : vecTmp) {
        printf("%d ", it);
    }
    printf("\n");
    vecOutput.push_back(vecTmp); //不需要边界条件，index >= vecInput.size()会自动退出
    for (int i = index; i < vecInput.size(); i++) { //for循环是当前维度所有可能的情况， index取值：0、1、2，vecInput.size()=3
        vecTmp.push_back(vecInput[i]);
        backtrace_func78(vecOutput, vecInput, vecTmp, i + 1); //下一维度
        vecTmp.pop_back();
    }
}
vector<vector<int>> subsets(vector<int> vecInput, int size) {
    vector<vector<int>> vecOutput;
    vector<int> vecTmp;
    backtrace_func78(vecOutput, vecInput, vecTmp, 0);
    return vecOutput;
}


/*
 * 78 ac code
 * 子集合
 * 回溯法
 */
void backtrack_subsets_ac(vector<int> &nums, int start, vector<int> &subset, vector<vector<int>> &solution) {
    solution.push_back(subset);
    for (int i = start; i < nums.size(); ++i) {
        subset.push_back(nums[i]);
        backtrack_subsets_ac(nums, i+1, subset, solution);
        subset.pop_back();
    }
}
vector<vector<int>> subsets_ac(vector<int>& nums) {
    vector<vector<int>> solution;
    vector<int> subset;
    backtrack_subsets_ac(nums, 0, subset, solution);
    return solution;
}
```


## Question-90-子集II

> 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。 
>
>  解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。 
>
> 
>
> 
>
> 
>
>  示例 1： 
>
>
> 输入：nums = [1,2,2]
> 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
>
>
>  示例 2： 
>
>
> 输入：nums = [0]
> 输出：[[],[0]]
>
> 
>
>
>  提示： 
>
>
>  1 <= nums.length <= 10 
>  -10 <= nums[i] <= 10 
>
>
>  Related Topics 位运算 数组 回溯 👍 1042 👎 0
>  


## Answer-90
```cpp
/*
 * 90
 * 子集合II（不允许重复）
 * 用标志位记录上一步的取值，每次处理前重复数字不处理
 * nums = [1,2,2]，vecInput.size()=3
 * [[],[1],[1,2],[1,2,2],[2],[2,2]]
 * 选值问题：输入index从0到2，i从index到2
 * index：0，i从0到2
 * index：1，i从1到2
 * index：2，i选2
 */
void backtrace_func90(vector<vector<int>> &vecOutput, vector<int> vecInput, vector<int> vecTmp, int index) {
    vecOutput.push_back(vecTmp); //不需要边界条件，index >= vecInput.size()会自动退出
    int prevN = INT_MAX;
    for (int i = index; i < vecInput.size(); i++) { //index取012，i从index到2
        if (vecInput[i] != prevN) { //当前层处理数不重复
            vecTmp.push_back(vecInput[i]);
            prevN = vecInput[i]; //为下一层做准备
            backtrace_func90(vecOutput, vecInput, vecTmp, i+1); //i+1不是index+1，区别于全排列问题 ***
            vecTmp.pop_back();
        }
    }
}
vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> vecOutput;
    vector<int> vecTmp;
    backtrace_func90(vecOutput, nums, vecTmp, 0);
    return vecOutput;
}
```

## Quesion-39-组合总和

> 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的
>  所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。 
>
>  candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
>
>  对于给定的输入，保证和为 target 的不同组合数少于 150 个。 
>
> 
>
>  示例 1： 
>
>
> 输入：candidates = [2,3,6,7], target = 7
> 输出：[[2,2,3],[7]]
> 解释：
> 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
> 7 也是一个候选， 7 = 7 。
> 仅有这两种组合。 
>
>  示例 2： 
>
>
> 输入: candidates = [2,3,5], target = 8
> 输出: [[2,2,2,2],[2,3,3],[3,5]] 
>
>  示例 3： 
>
>
> 输入: candidates = [2], target = 1
> 输出: []
>
> 
>
>
>  提示： 
>
>
>  1 <= candidates.length <= 30 
>  2 <= candidates[i] <= 40 
>  candidates 的所有元素 互不相同 
>  1 <= target <= 40 
>
>
>  Related Topics 数组 回溯 👍 2377 👎 0

## Answer-39

```cpp
/*
 * 39组合总和
 * candidates = [2,3,6,7], target = 7
 * [[7],[2,2,3]]
 * candidates = [2,3,5], target = 8
 * [[2,2,2,2],[2,3,3],[3,5]]
 * candidates = [2], target = 1
 * []
 * candidates = [1], target = 1
 * [[1]]
 * candidates = [1], target = 2
 * [[1,1]]
 */
void backtrace_func39(vector<vector<int>> &vecOutput, vector<int>vecInput, vector<int>vecTmp, int target, int index){
    /*检验当前维度结果是否是一个解*/
    if (target == 0) {
        vecOutput.push_back(vecTmp);
        return;
    }
    /*列举当前维度的所有取值的情况，并且进入到下一维度*/
    for (int i = index; i < vecInput.size(); ++i) { //index初始输入0，i可选从0到2（可重复选数）
        if (target - vecInput[i] >= 0) {
            vecTmp.push_back(vecInput[i]);
            backtrace_func39(vecOutput, vecInput, vecTmp, target - vecInput[i], i);
            //输入参数i，不是index，注意此处***
            //选择子集合问题，区别于全排列问题
            //可以重复选择元素，此处是i，不是i+1
            vecTmp.pop_back();
        }
    }
};
vector<vector<int>> combinationSum_func1(vector<int>& candidates, int target) {
    vector<vector<int>> vecOutput;
    vector<int> vecTmp;
    backtrace_func39(vecOutput, candidates, vecTmp, target, 0);
    return vecOutput;
}
```

## Quesion-40-组合总和II

>
> 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。 
>
>  candidates 中的每个数字在每个组合中只能使用 一次 。 
>
>  注意：解集不能包含重复的组合。 
>
> 
>
>  示例 1: 
>
>
> 输入: candidates = [10,1,2,7,6,1,5], target = 8,
> 输出:
> [
> [1,1,6],
> [1,2,5],
> [1,7],
> [2,6]
> ] 
>
>  示例 2: 
>
>
> 输入: candidates = [2,5,2,1,2], target = 5,
> 输出:
> [
> [1,2,2],
> [5]
> ] 
>
> 
>
>  提示: 
>
>  1 <= candidates.length <= 100 
>  1 <= candidates[i] <= 50 
>  1 <= target <= 30 
>
>
>  Related Topics 数组 回溯 👍 1262 👎 0
>


## Answer-40

```cpp
/*
 * 40组合总和II ac
 * 输入: candidates =[2,5,2,1,2], target =5,
 * 输出:
 * [
 * [1,2,2],
 * [5]
 * ]
 */
void backtrace_func40(vector<vector<int>> &vecOutput, vector<int>vecInput, vector<int>vecTmp, int target, int index){
    /*检验当前维度结果是否是一个解*/
    if (target == 0) {
        vecOutput.push_back(vecTmp);
        return;
    }
    /*列举当前维度的所有取值的情况，并且进入到下一维度*/
    int prevN = INT_MAX; //记录上一层选择的数，避免本轮选择的数与上一轮相同，剪枝
    for (int i = index; i < vecInput.size(); ++i) { //index初始输入0，i可选从1到2（不可重复选数）
//        printf("i = %d, vecInput[i] = %d, prevN = %d\n", i, vecInput[i], prevN);
        if (vecInput[i] != prevN) {
            if (target - vecInput[i] >= 0) {
                vecTmp.push_back(vecInput[i]);
                prevN = vecInput[i];
                backtrace_func40(vecOutput, vecInput, vecTmp, target - vecInput[i], i+1);
                //输入参数i，不是index，注意此处***
                //选择子集合问题，区别于全排列问题
                //不可重复选择元素，此处是i+1，不是i
                vecTmp.pop_back();
            }
        }
    }
}
vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    vector<vector<int>> vecOutput;
    vector<int> vecTmp;
    sort(candidates.begin(), candidates.end());
    backtrace_func40(vecOutput, candidates, vecTmp, target, 0);
    return vecOutput;
}
```

## Attention

回溯法和DFS区别：
DFS往某个方向搜索，为了找到一个目标，而回溯法在DFS的基础上，在搜索过程中，达到结束条件后，恢复状态，回溯上一层，再次搜索。回溯法和DFS最大的区别是有无状态重置。
当问题需要 "回头"，以此来查找出所有的解的时候，使用回溯算法。比如leetcode78子集合问题、leetcode90子集合II、全排列问题（01234的5个数的全排列）、leetcode17电话号码的字母组合、leetcode39组合总和leetcode40组合总和II。