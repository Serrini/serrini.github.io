---
title: kerberos相关（3）
date: '2022-03-29'
author: serrini
showToc: true
TocOpen: false
draft: false
tags:
- kerberos
categories:
- Security
---
AP-REQ的结构如下:

AP-REQ ::= [APPLICATION 14] SEQUENCE {

​    pvno      [0] INTEGER (5),

​    msg-type    [1] INTEGER (14),

​    ap-options   [2] APOptions,

​    ticket     [3] Ticket,

​    authenticator  [4] EncryptedData -- Authenticator

}

TGT票据放在这个结构体里面，就是放在ticket里面。 authenticator 的内容包括加密类型和用session_key加密Authenticator加密成的密文。

Authenticator的结构如下:

Authenticator ::= [APPLICATION 2] SEQUENCE {

   authenticator-vno    [0] INTEGER (5),

   crealm         [1] Realm,

   cname          [2] PrincipalName,

   cksum          [3] Checksum OPTIONAL,

   cusec          [4] Microseconds,

   ctime          [5] KerberosTime,

   subkey         [6] EncryptionKey OPTIONAL,

   seq-number       [7] UInt32 OPTIONAL,

   authorization-data   [8] AuthorizationData OPTIONAL

}





