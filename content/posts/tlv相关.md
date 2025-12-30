---
title: tlv相关
date: '2022-03-30'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- tlv
categories:
- Tech
---
# 背景

在hive数据库的kerberos加密协议解析中，加密套件默认是*ETYPE_AES256_CTS_HMAC_SHA1_96*。解密后的cipher部分是asn.1编码过的，拿到想要的字段就需要解密tlv协议。TLV三元组<Type, Length,Value>。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0e7f86fc1j209d01xt8k.jpg)

描述Value部分所占字节的个数，编码格式分两类：定长方式（DefiniteForm）和不定长方式（IndefiniteForm）。定长模式中，根据长度是否超过一个字节（127）分短/长形式。

短：0-127，二进制表示01111 111，第8位是0，即length用一个字节即可

长：>127，二进制表示10000000，第8位是1，即length需要用多个字节表示，此时0-7位用来描述length值需要占用的字节数。

# Example

```cpp
//
// Created by Serrini on 2022/1/6.
//

#ifndef TEST021_HDFS_TLV_H
#define TEST021_HDFS_TLV_H
#include <iostream>


class TLV{
public:
    TLV();
    int ParseTLV(const unsigned char* data, int len);
    void SkipHead(int len);
    void SkipTLV(int len);
    void Clear();
public:
    int m_type;
    int m_length;
    unsigned char* m_data;
    int m_headLen;

    unsigned char* m_skipPtr;
    int m_skipLength;
};

#endif //TEST021_HDFS_TLV_H
```


```cpp
//
// Created by Serrini on 2022/1/6.
//

#include "TLV.h"
TLV::TLV():m_type(0) , m_length(0), m_data(NULL), m_headLen(0), m_skipPtr(NULL), m_skipLength(0){

}

int TLV::ParseTLV(const unsigned char *data, int len) {
    if((data == NULL) || (len < 2)){
        printf("Check tlv data and len failed\n");
        return -1;
    }
    m_type = data[0];
    if(data[1] > 0x7F){
        m_length = 0;
        if(len > (1 + 1 + (data[1] - 0x80))){
            int i = 0;
            m_data = (unsigned char*)data + 1 + 1 + (data[1] - 0x80);
            for(i = 0; i < (data[1] - 0x80); ++i){
                m_length = m_length * 256 + data[1 + 1 + i];
            }
            m_headLen = 1 + 1 + (data[1] - 0x80);
        }else{
            printf("Check value length len failed, length len:%d, len:%d\n", (1 + 1 + (data[1] - 0x80)), len);
            return -1;
        }
    }else{
        m_headLen = 1 + 1;
        m_length = data[1];
        m_data = (unsigned char*)data + 1 + 1;
    }
    if((m_headLen + m_length) > len){
        printf("Check value length and package length failed, tlv:%d, package len:%d\n", (m_headLen + m_length), len);
        return -1;
    }
    printf("type:%x, length:%d, head length:%d\n", m_type, m_length, m_headLen);
    return 0;
}

void TLV::SkipHead(int len){
    m_skipPtr = m_data;
    m_skipLength = len - m_headLen;
    if(m_skipLength <= 0){
        m_skipPtr = NULL;
        m_skipLength = 0;
        printf("[SkipHead]:Skip head length failed. len:%d, head len:%d\n", len, m_headLen);
    }
}

void TLV::SkipTLV(int len){
    m_skipPtr = m_data + m_length;
    m_skipLength = len - m_headLen - m_length;
    if(m_skipLength <= 0){
        m_skipPtr = NULL;
        m_skipLength = 0;
        printf("[SkipTLV]:Skip head length failed. len:%d, head len:%d, value length: %d\n", len, m_headLen, m_length);
    }
}

void TLV::Clear(){
    m_type = 0;
    m_length = 0;
    m_data = NULL;
    m_headLen = 0;
    m_skipLength = 0;
    m_skipPtr = NULL;
}

```

