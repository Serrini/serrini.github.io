---
title: leetcode232.用栈实现队列&225.用队列实现栈
date: '2022-04-26'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- leetcode
- stack
- queue
categories:
- LeetCode
---
## Question

> 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）： 
>
>  实现 MyQueue 类： 
>
>
>  void push(int x) 将元素 x 推到队列的末尾 
>  int pop() 从队列的开头移除并返回元素 
>  int peek() 返回队列开头的元素 
>  boolean empty() 如果队列为空，返回 true ；否则，返回 false 
>
>
>  说明： 
>
>  你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法
> 的。 
>  你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。 
>
>  示例 1： 
> 输入：
> ["MyQueue", "push", "push", "peek", "pop", "empty"]
> [[], [1], [2], [], [], []]
> 输出：
> [null, null, null, 1, 1, false]
>
> 解释：
> MyQueue myQueue = new MyQueue();
> myQueue.push(1); // queue is: [1]
> myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
> myQueue.peek(); // return 1
> myQueue.pop(); // return 1, queue is [2]
> myQueue.empty(); // return false

>
>  提示： 

>  1 <= x <= 9 
>  最多调用 100 次 push、pop、peek 和 empty 
>  假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作） 
>  
>  进阶： 
>
>
>  你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。 
>
>  Related Topics 栈 设计 队列 
>  👍 629 👎 0


## Answer

```cpp
//leetcode submit region begin(Prohibit modification and deletion)
class MyQueue {
public:
    stack<int> st1, st2;
    MyQueue() {

    }
    
    void push(int x) {
        st1.push(x);
        //push即压入st1
    }
    
    int pop() {
        int val;
        while(!st2.empty())
        {
          //如果st2中有数据，说明st1中数全部压入st2，pop出st2栈顶元素
            val = st2.top();
            st2.pop();
            return val;
        }
        while(!st1.empty())
        {
          //如果st1中有数据，说明st1中数据还未全部压入st2，需要全部push进st2
            val = st1.top();
            st1.pop();
            st2.push(val);
        }
      //st1中所有元素压到st2中，即可pop出st2栈顶元素
        val = st2.top();
        st2.pop();
        return val;
    }
    
    int peek() {
        int val;
        while(!st2.empty())
        {
          //st2的栈顶元素即队首元素
            val = st2.top();
            return val;
        }
        while(!st1.empty())
        {
          //st1不为空，需要把st1中数全部压入st2
            val = st1.top();
            st1.pop();
            st2.push(val);
        }
      //pop出st2栈顶->队首元素
        val = st2.top();
        return val;
    }
    
    bool empty() {
        return st1.empty() && st2.empty();//st1和st2都为空，即队列为空
    }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue* obj = new MyQueue();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->peek();
 * bool param_4 = obj->empty();
 */
//leetcode submit region end(Prohibit modification and deletion)
```

## Attention
1. 用stack实现queue：两个stack，将一串数字一次放入st1，再从st1中依次取出放到st2，最后从st2中pop出的数，符合queue先进先出的性质


## Question
> 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。 
>
>  实现 MyStack 类： 
>
>
>  void push(int x) 将元素 x 压入栈顶。 
>  int pop() 移除并返回栈顶元素。 
>  int top() 返回栈顶元素。 
>  boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。 
>
> 
>
>
>  注意： 
>
>
>  你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。 
>  你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。 
>
> 
>
>
>  示例： 
>
>
> 输入：
> ["MyStack", "push", "push", "top", "pop", "empty"]
> [[], [1], [2], [], [], []]
> 输出：
> [null, null, null, 2, 2, false]
>
> 解释：
> MyStack myStack = new MyStack();
> myStack.push(1);
> myStack.push(2);
> myStack.top(); // 返回 2
> myStack.pop(); // 返回 2
> myStack.empty(); // 返回 False
>
> 
>
>
>  提示： 
>
>
>  1 <= x <= 9 
>  最多调用100 次 push、pop、top 和 empty 
>  每次调用 pop 和 top 都保证栈不为空 
>
> 
>
>  进阶：你能否仅用一个队列来实现栈。 
>  Related Topics 栈 设计 队列 
>  👍 491 👎 0

## Answer
```cpp
class MyStack {
public:
    queue<int> q;
    MyStack() {

    }

    void push(int x) {
        int size = q.size();
        q.push(x);
        while (size > 0) {
            int tmp = q.front();
            q.pop();
            q.push(tmp);
            size--;
        }
    }

    int pop() {
        int popVal = q.front();
        q.pop();
        return popVal;
    }

    int top() {
        return q.front();
    }

    bool empty() {
        return q.empty();
    }
};

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack* obj = new MyStack();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->top();
 * bool param_4 = obj->empty();
 */
```

## Attention
1. 用queue实现stack：需要符合先进后出。
2. 入栈，即把数据进行入队，为了保证栈的特性先进后出，因此需要在push方法中对入队之前的所有元素进行一次出 队入队操作，以保证所有数据达到先进后出的顺序。
3. 出栈，由于队列数据顺序已经调整，所以只需取队头元素即可。
