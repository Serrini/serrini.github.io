---
title: leetcode200.岛屿数量
date: '2022-05-31'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- 并查集
- bfs
- dfs
categories:
- LeetCode
---
## Question

>
> 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。 
>
>  岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。 
>
>  此外，你可以假设该网格的四条边均被水包围。 
>
> 
>
>  示例 1： 
>
> 输入：grid = [
>   ["1","1","1","1","0"],
>   ["1","1","0","1","0"],
>   ["1","1","0","0","0"],
>   ["0","0","0","0","0"]
> ]
> 输出：1
>
>
>  示例 2： 
>
>
> 输入：grid = [
>   ["1","1","0","0","0"],
>   ["1","1","0","0","0"],
>   ["0","0","1","0","0"],
>   ["0","0","0","1","1"]
> ]
> 输出：3
>
> 
>
>
>  提示： 
>
>
>  m == grid.length 
>  n == grid[i].length 
>  1 <= m, n <= 300 
>  grid[i][j] 的值为 '0' 或 '1' 
>
>  Related Topics 深度优先搜索 广度优先搜索 并查集 数组 矩阵 👍 1733 👎 0
>



## Answer


```cpp
//200
//11110
//11010
//11000
//00000
//1
//200-Solution1
void bfs(int i, int j, int n, int m, vector<vector<char>>& grid) {
    if (i<0 || i>n-1 || j<0 || j>m-1 || grid[i][j]=='0')
        //[0~n-1],递归边界是出界或者找到为0的值
        return;
    grid[i][j]='0';//搜索到为1的值置0，不用再次遍历
    bfs(i-1, j, n, m, grid);
    bfs(i+1, j, n, m, grid);
    bfs(i, j-1, n, m, grid);
    bfs(i, j+1, n, m, grid);//上下左右，可以换顺序
}
int numIslands0(vector<vector<char>>& grid) {
    if (grid.empty()) {
        return 0;
    }
    int n = grid.size();
    int m = grid[0].size();
    int res = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            if (grid[i][j] == '1') {
                bfs(i, j, n, m, grid);
                res++;
            }
        }
    }
    return res;
}

//200-Solution2
void dfs(int i, int j, int n, int m, vector<vector<char>>& grid) {
    grid[i][j] = 0;
    if (i>0 && grid[i-1][j] == '1') {
        dfs(i-1, j, n, m, grid);
    }
    if (i<n-1 && grid[i+1][j] == '1') {
        dfs(i+1, j, n, m, grid);
    }
    if (j>0 && grid[i][j-1] == '1') {
        dfs(i, j-1, n, m, grid);
    }
    if (j<m-1 && grid[i][j+1] == '1') {
        dfs(i, j+1, n, m, grid);
    }
}
int numIslands(vector<vector<char>>& grid) {
    if (grid.empty()) {
        return 0;
    }
    int n = grid.size();
    int m = grid[0].size();
    int res = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            if (grid[i][j] == '1') {
                dfs(i, j, n, m, grid);
                res++;
            }
        }
    }
    return res;
}
```

## Attention

