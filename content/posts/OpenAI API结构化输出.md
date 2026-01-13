---
title: OpenAI API结构化输出
date: 2025-06-03
author: serrini
showToc: true
TocOpen: true
draft: false
tags:
  - agent
categories: agent
---

要实现从自然语言到强类型对象的映射，在某些场景下，我需要LLM输出指定的json格式，或类型，或数据结构，可以利用OpenAI的response_format和Pydantic库实现结构化数据。
示例如下：

```python
from pydantic import BaseModel  
from openai import OpenAI  
from dotenv import load_dotenv  
  
load_dotenv()  
  
class Person(BaseModel):  
    name: str  
    age: int  
  
client = OpenAI(  
    api_key="sk-xxxxxx",  
    base_url="https://xxxx",  
    timeout=120  
)  
  
completion = client.beta.chat.completions.parse(  
    model="gpt-4o",  
    messages=[  
        {"role": "user", "content": "我是张三，今年已经28岁了。"}  
    ],  
    response_format=Person,  
)  
  
result = completion.choices[0].message.parsed  
  
print(f"姓名: {result.name}")  # 输出张三  
print(f"年龄: {result.age}")   # 输出28  
  
print(f"JSON格式: {result.model_dump_json()}")
```