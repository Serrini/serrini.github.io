---
title: 多智能体架构multiagent
date: 2025-06-01
author: serrini
showToc: true
TocOpen: true
draft: false
tags:
  - agent
  - multiagent
categories: agent
---
## 需要考虑的问题
1. 劳动分工（角色界定和责任划分）
2. 智能体间通信机制（允许智能体交换数据、委托子任务，协调输出）

## 协作形式：
1. 顺序交接：一个输出作为另一个输入
2. 并行：同时处理问题的不同部分，最后将结果合并
3. 辩论共识：多代理处理不同信源信息
4. 分层：管理代理分配任务，综合结果
5. 专家团队：不同领域有专业知识的代理协作
6. 批评者-审阅者：
	解释：代理a创建初始输出，第二组代理b批判性评估，原来的代理a（或最终代理c）根据反馈修改输出。
	适用于：代码生成、研究写作、逻辑检查等


## 介绍Crew AI和Google ADK框架
### Crew AI框架：
简单来说，分三步：定义agent、定义task、创建团队（团队里指定agent和task）。
![Pasted image 20260104151343](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151343.png)

### Google ADK框架：
#### 层级代理
![Pasted image 20260104151423](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151423.png)
![Pasted image 20260104151522](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151522.png)
#### LoopAgent（迭代模式）
![Pasted image 20260104151514](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151514.png)
![Pasted image 20260104151529](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151529.png)
#### SequentialAgent（线性工作流.）
![Pasted image 20260104151554](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151554.png)
![Pasted image 20260104151600](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151600.png)
![Pasted image 20260104151605](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151605.png)
#### ParallelAgent（并发模式）
![Pasted image 20260104151625](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151625.png)


## A2A协议

### 基本框架
提供一个基于 HTTP 的通用框架，确保基于不同框架（例如Google ADK、LangGraph 或 CrewAI）开发的agent之间的通信。
![Pasted image 20260104151815](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151815.png)![Pasted image 20260104151820](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151820.png)支持的特性：
![Pasted image 20260104151832](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104151832.png)提供一个例子，后面有运行截图：
代码：https://github.com/a2aproject/a2a-samples/blob/main/samples/python/agents/langgraph
langgrzzaph实现的agent，为用户提供货币兑换信息。
通信过程：
1. 客户端通过A2A协议发送获取查询请求，到服务端，服务器端将请求转发到langgraph的agent
2. agent调用api获取实时汇率，处理数据后响应给服务端，服务端再响应客户端

### 交互方式
A2A 支持三种交互方式：
1. 请求/响应（轮询）：客户端发送请求，服务器响应。对于长时间运行的任务，客户端定期轮询服务器以获取更新。
2. 使用服务器发送事件（SSE）的流式传输：客户端发起流以通过开放的HTTP连接从服务器接收实时、增量结果或状态更新。
3. 推送通知：对于非常长时间运行的任务或断开连接的场景，当发生重要任务更新时，服务器可以主动向客户端提供的webhook发送异步通知。
举例：
第1种是网购时关心物流状态，每天打开app刷新，我的快递到哪了，对方回应我；
第2种是我打开一个物流连接，不需要我刷新页面，服务器会实时推送更新；
第3种是我指定一个电话号码，服务器会在关键节点给我发通知短信，告诉我快递到哪一站了。

### 运行示例
启动服务端：
![Pasted image 20260104152040](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104152040.png)
另外一个终端启动客户端：
![Pasted image 20260104152056](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104152056.png)客户端去连接，发现了agentcard，agentcard内容：
![Pasted image 20260104152112](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104152112.png)
对比服务端日志打印，多了一行get方法：
![Pasted image 20260104152127](https://serrinibucket.oss-cn-hangzhou.aliyuncs.com/Pasted%20image%2020260104152127.png)


## LangGraph

### Supervisor架构（监督者模式）

Supervisor决定下一步调用哪个Agent，子Agent不直接通信，通过Supervisor中转，使用共享State传递信息。

```python
class AgentState(TypedDict):
  messages: Annotated[list, add_messages]
  next: str  # 下一个要执行的agent

def supervisor(state):
  # 决定下一步
  return {"next": "agent_a"}

graph = StateGraph(AgentState)
graph.add_node("supervisor", supervisor)
graph.add_node("agent_a", agent_a_node)
graph.add_conditional_edges("supervisor", lambda s: s["next"])
```

### 通信机制：共享state
核心就是所有的Agent读写同一个state对象。
```python
class SharedState(TypedDict):
      messages: list           # 消息历史
      context: dict           # 共享上下文
      agent_outputs: dict     # 各agent的输出
      current_task: str       # 当前任务

  def agent_a(state: SharedState):
      # 读取其他agent的输出
      prev_output = state["agent_outputs"].get("agent_b")

      # 执行任务
      result = do_something(prev_output)

      # 写入自己的输出
      return {
          "agent_outputs": {"agent_a": result},
          "messages": [AIMessage(content=result)]
      }
```

### 独立上下文
State数据在Agent之间共享，但每个LLM调用的token窗口独立。
```python
class AgentState(TypedDict):
  messages: list          # 完整历史，可能很长
  summary: str            # 压缩的摘要
  current_context: dict   # 当前任务相关上下文

def agent_a(state):
  # 不推荐传全部历史（token消耗过多）
  # response = llm.invoke(state["messages"])

  # 推荐只传需要的上下文
  prompt = f"""
  任务摘要: {state["summary"]}
  最近消息: {state["messages"][-5:]}
  当前任务: {state["current_context"]}
  """
  response = llm.invoke(prompt)
```