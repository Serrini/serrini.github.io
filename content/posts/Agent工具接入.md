---
title: Agent 工具接入
date: 2025-06-06
author: serrini
showToc: true
TocOpen: true
draft: false
tags:
  - agent
categories: agent
---

## Agent 工具接入方式

背景：如何让大模型使用外部工具

一般有原生Function Calling方式和通过MCP协议（模型上下文协议）调用。
原生Function Calling方式是由模型直接输出结构化的json，包含工具名称和参数，客户端调用本地工具，再回传ToolMesage。而MCP协议是由Anthropic提出的标准，工具运行在独立的MCP Server进程中，通过JSON-RPC协议与Agent通信，无需为每个Agent写单独的工具代码。


## 工具调用时的Agent与模型交互通信全流程

整个过程分为三个回合（Turn）：

1. **Turn 1 (Request)**: Client 发送用户问题。
2. **Turn 2 (Tool Call)**: Model 返回 "通过工具查天气" 的指令。
3. **Turn 3 (Tool Output)**: Client 也就是 Agent 执行代码，把结果传回 Model，Model 生成最终回复。

### 第一回合：用户提问

**Agent 发送给 Model 的 Messages 列表：** (注意：System Prompt 里其实隐含了工具定义，但在 **ChatML格式**（即下方的messages 列表结构）中，工具定义通常作为 tools 参数单独传递，这里为了直观展示，主要关注 messages 数组)
**ChatML (Chat Markup Language)** 是 OpenAI 为了解决“纯文本 Prompt”的安全性与结构化问题而推出的一种交互格式。
**以前**所有的对话只是一个长字符串（如 `User: Hi\nAI: Hello`）。**现在**对话被拆分为结构化的 **Message List**，每条消息都有明确的 **Role** (system/user/assistant/tool)。 这种结构让模型能清楚地区分，哪句话是用户说的，哪句话是系统指令，有效防止 Prompt Injection 攻击，同时为 Tool Calling 提供了专用的数据通道。

```python
// POST /v1/chat/completions body
{
	"model": "gpt-4",
	"tools": [ ... ], // 这里定义了 weather 工具的 schema
	"messages": [
		{
			"role": "system",
			"content": "你是一个有用的助手..."
		},
		{
			"role": "user",
			"content": "北京今天天气怎么样？"
		}
	]
}
```
### 第二回合：模型下达指令 (The Tool Call)

**Model 返回给 Agent 的 Response：** 模型**没有**返回 Content 文本，而是返回了 `tool_calls` 字段。
```python
// Model Response
{
	"id": "chatcmpl-123",
	"choices": [
		{
			"index": 0,
			"message": {
				"role": "assistant",
				"content": null, // 注意这里是 null，因为模型没在说话，而是在思考
				"tool_calls": [
					{
						"id": "call_abc123", // 【关键】这是这次操作的唯一身份证
						"type": "function",
						"function": {
						"name": "weather",
						"arguments": "{\"city\": \"Beijing\"}" // 模型生成的 JSON 字符串参数
						}
					}
				]
			},
			"finish_reason": "tool_calls" // 告诉 Client：我完事主要是因为我要调工具
		}
	]
}
```

### Agent 本地执行

此时，Agent 的 Python 代码捕获到了上面的响应。
1. 解析 `function.name` 是 "weather"。
2. 解析 `function.arguments` 得到 `city="Beijing"`。
3. 调用本地 Python 函数 `weather_tool(city="Beijing")`。
4. 得到结果串：`"22°C, 晴天"`。


### 第三回合：回填结果与最终响应

**Agent 再次发送给 Model 的 Messages 列表：** (注意：这次必须把之前的历史全带上，包括模型刚才的工具调用指令，以及我们新生成的工具结果)

```python
// POST /v1/chat/completions body (第二次请求)
{
	"messages": [
		// 1. 系统提示
		{"role": "system", "content": "..."},
		// 2. 用户的原始问题
		{"role": "user", "content": "北京今天天气怎么样？"},
		// 3. 【必须】带上模型上一轮的回复（包含 tool_calls）
		{
			"role": "assistant",
			"content": null,
			"tool_calls": [
				{
				"id": "call_abc123",
				"type": "function",
				"function": {"name": "weather", "arguments": "{\"city\": \"Beijing\"}"}
				}
			]
		},
		// 4. 【必须】带上工具执行的结果 (Tool Output)
		{
			"role": "tool",
			"tool_call_id": "call_abc123", // ID 必须和上面对应！
			"content": "{\"temperature\": \"22°C\", \"description\": \"晴天\"}"
		}
	]
}
```


### Model 最终返回给 Agent 的 Response
模型看到用户问题、自己的调用意图、以及工具回来的真实数据，终于可以生成人话了
```python
// Model Final Response
{
	"choices": [
		{
			"message": {
				"role": "assistant",
				"content": "北京今天天气不错，气温 22°C，是晴天。"
			},
			"finish_reason": "stop"
		}
	]
}
```



## 代码核心链路

### 定义

每个工具有自己的参数结构和内部逻辑，模型依靠args_schema字段自动生成的JSON Schema知道如何调用。

### 注册与绑定

.bind_tools() 是 LangChain 提供的方法，它会将写的函数转化成 OPEN API需要的JSON Schema格式，然后底层自动调用 OpenAI API 的 `tools` 参数。

```python
self.all_tools = self._load_all_tools() # 实例化所有工具
# 将 Python 对象转换为 OpenAI API 能懂的 JSON 描述
self.default_llm_with_tools = self.default_llm.bind_tools(self.all_tools)
```

### 决策是否调用

在chat中，模型接收messages，如果它决定调用工具，会在返回的response.tool_calls中携带以下数据。

```python
{
	"name": "file_system",
	"args": {"action": "read", "path": "D:/data.txt"},
	"id": "call_xyz123"
}
```

### 执行

#### 简单循环

先来看一个最简单的循环，后面会有线程池支持工具并发执行版本。

```python
messages = [
    {"role": "user", "content": "帮我查一下北京现在的天气"}
]

while True:
	# 问模型
    response = llm.invoke(messages)
    
	# 响应中有tool_calls的情况
    if response.tool_calls:
        print(f"AI决定调用工具: {response.tool_calls}")

        # 【重点】必须先把“AI想调工具”这句话记下来
        messages.append(response)

		# 串行执行工具
        for tool_call in response.tool_calls:
            # 假装执行了工具函数，拿到了结果
            tool_result = my_fake_weather_tool(tool_call['args']) 
            
            # 【重点】把工具运行结果记下来
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call['id'], # 必须对应 ID
                "content": str(tool_result)
            })
        
        # 循环继续... 带着最新的结果（含工具结果）再次回到前面问模型
        
    else:
        # else分支，模型说“我不需要工具了，这是我的回答”
        print("最终回答:", response.content)
        break
```
#### 工具并发调用

如果response.tool_calls 是一个列表，可以用线程池跑工具，减少等待时间。
```python
[
	{"name": "weather", "args": {"city": "Beijing"}, "id": "call_1"},
	{"name": "weather", "args": {"city": "Shanghai"}, "id": "call_2"}
]
```

```python
# 1. 准备任务清单
tool_call_infos = []
for tool_call in response.tool_calls:
	tool_call_infos.append({
		"name": tool_call["name"],
		"args": tool_call["args"],
		"id": tool_call["id"] # 一定要保存 ID，后续要对号入座
	})

# 2. 定义包装函数
def execute_tool_wrapper(info):
	# 这个函数会在独立的线程中运行
	result = self._execute_tool(info["name"], info["args"])
	return {
		"tool_call_id": info["id"], # 带着 ID 回来，证明我是谁的结果
		"result": result["result"],
		# ...
	}

# 3. 扔进线程池
parallel_results = []
# max_workers 设为调用数量，即有多少个工具就开多少个线程（适合IO密集型任务）
with ThreadPoolExecutor(max_workers=len(tool_call_infos)) as executor:
	# 提交任务，建立 Future 对象到原始 info 的映射
	future_to_tool = {
		executor.submit(execute_tool_wrapper, info): info
		for info in tool_call_infos
	}
	# as_completed 会在某个任务一完成就立刻 yield，不需要等所有都做完
	# 这样可以尽早处理部分结果（虽然本例中是收集齐了一起处理）
	for future in as_completed(future_to_tool):
		result = future.result() # 获取线程执行的返回值
		parallel_results.append(result)
```

插入一个字典推导式的写法，但它完全等价于for循环写字典。

```python
future_to_tool = {
	executor.submit(func, info): info
	for info in tool_call_infos
	}

# 与下面这一段完全等价
future_to_tool = {}
for info in tool_call_infos:
	future = executor.submit(execute_tool_wrapper, info)
    future_to_tool[future] = info
```

OpenAI 要求 `ToolMessage` 的顺序最好和 `tool_calls` 的顺序对应（虽然现在的版本宽松了一些，但他依然强依赖 `tool_call_id`）。所以由于`as_completed` 返回的顺序是乱的，就需要重组一下响应。

```python
# 1. 建立索引 (ID -> Result)
result_map = {r["tool_call_id"]: r for r in parallel_results}
# 2. 按原始顺序 (tool_call_infos) 取结果
for info in tool_call_infos:
	result = result_map[info["id"]] # 通过 ID 找回对应的结果
	# 3. 追加消息
	messages.append({
		"role": "tool",
		"tool_call_id": info["id"], # 这里的 ID 必须和 assistant 消息里的对应 ID 严格一致
		"content": str(result["result"])
	})
```


## Function Calling实现

### 使用Pydantic定义输入，描述清楚Description

在我的项目中，即在real_tools.py中新增class。Description类似使用说明书。
```python
from pydantic import BaseModel, Field

class CalculatorInput(BaseModel):
	expression: str = Field(description="要计算的数学表达式，例如 '2 + 2 * (3 - 1)'")
```

### 实现工具内部逻辑

```python
class CalculatorTool(BaseTool):
	name: str = "calculator" # 工具ID，模型通过这个名字调用
	description: str = "执行数学计算，支持加减乘除和括号" # 这一行决定了模型什么时候用它
	args_schema: type[CalculatorInput] = CalculatorInput

def _run(self, expression: str) -> str:
	try:
		# xxxx
	except Exception as e:
	return f"计算错误: {str(e)}"
```

### 注册工具

```python
ALL_TOOLS = {
	'calculator': CalculatorTool, # 在工具字典中新增
}

def _load_all_tools(self) -> List[BaseTool]:
	real_tools = [
		CalculatorTool(), # 新增实例
	]
```