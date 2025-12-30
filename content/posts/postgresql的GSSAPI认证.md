---
title: postgresql的GSSAPI认证
date: 2022-04-01
author: Serrini
showToc: true
TocOpen: false
draft: false
tags:
  - GSSAPI
categories:
  - Security
---

# pgsql的GSSAPI 认证踩坑

## 常见报错


### 1、GSSAPI authentication failed for user "postgres@EXAMPLE.COM"
#### postgresql.log

```shell
2022-04-01 15:09:14.234 CST [11468] LOG: provided user name (postgres@EXAMPLE.COM) and authenticated user name (postgres) do not match

2022-04-01 15:09:14.234 CST [11468] FATAL: GSSAPI authentication failed for user "postgres@EXAMPLE.COM"

2022-04-01 15:09:14.234 CST [11468] DETAIL: Connection matched pg_hba.conf line 95: "host  all       all       all           gss include_realm=0 krb_realm=EXAMPLE.COM"
```

#### 原因
```java
Connection conn =
                (Connection) Subject.doAs(specificSubject, new PrivilegedExceptionAction() {
                    public Object run() {
                        Connection con = null;
                        Properties prop = new Properties();
                        prop.setProperty("user", "postgres"); //value是postgre@EXAMPLE.COM导致的报错
                        prop.setProperty("jaasApplicationName", "pgjdbc");
                        prop.setProperty("gss","true");
                        String url = URL;
                        try {
                            con = DriverManager.getConnection(url, prop);
                        } catch (Exception except) {
                            except.printStackTrace();
                        }
                        return con;
                    }
                });
```


### 2、Unspecified GSS failure.  Minor code may provide more information: Request ticket server postgres/10.211.55.11@EXAMPLE.COM kvno 4 not found in keytab; keytab is likely out of date

#### postgresql.log
```shell
2022-04-01 14:41:35.628 CST [7881] LOG:  accepting GSS security context failed
2022-04-01 14:41:35.628 CST [7881] DETAIL:  Unspecified GSS failure.  Minor code may provide more information: Request ticket server postgres/10.211.55.11@EXAMPLE.COM kvno 4 not found in keytab; keytab is likely out of date
2022-04-01 14:41:35.628 CST [7881] FATAL:  GSSAPI authentication failed for user "postgres"
2022-04-01 14:41:35.628 CST [7881] DETAIL:  Connection matched pg_hba.conf line 95: "host    all             all             all                     gss include_realm=0 krb_realm=EXAMPLE.COM"
202
```
#### jdbc连接时的报错
```java
Entered Krb5Context.initSecContext with state=STATE_IN_PROCESS
org.postgresql.util.PSQLException: GSS Authentication failed
	at org.postgresql.gss.GssAction.run(GssAction.java:145)
	at org.postgresql.gss.GssAction.run(GssAction.java:32)
	at java.base/java.security.AccessController.doPrivileged(Native Method)
	at java.base/javax.security.auth.Subject.doAs(Subject.java:361)
	at org.postgresql.gss.MakeGSS.authenticate(MakeGSS.java:60)
	at org.postgresql.core.v3.ConnectionFactoryImpl.lambda$doAuthentication$3(ConnectionFactoryImpl.java:768)
	at org.postgresql.core.v3.AuthenticationPluginManager.withPassword(AuthenticationPluginManager.java:81)
	at org.postgresql.core.v3.ConnectionFactoryImpl.doAuthentication(ConnectionFactoryImpl.java:767)
	at org.postgresql.core.v3.ConnectionFactoryImpl.tryConnect(ConnectionFactoryImpl.java:180)
	at org.postgresql.core.v3.ConnectionFactoryImpl.openConnectionImpl(ConnectionFactoryImpl.java:235)
	at org.postgresql.core.ConnectionFactory.openConnection(ConnectionFactory.java:49)
	at org.postgresql.jdbc.PgConnection.<init>(PgConnection.java:223)
	at org.postgresql.Driver.makeConnection(Driver.java:400)
	at org.postgresql.Driver.connect(Driver.java:259)
	at java.sql/java.sql.DriverManager.getConnection(DriverManager.java:677)
	at java.sql/java.sql.DriverManager.getConnection(DriverManager.java:189)
	at pgsql.client$1.run(client.java:64)
	at java.base/java.security.AccessController.doPrivileged(Native Method)
	at java.base/javax.security.auth.Subject.doAs(Subject.java:423)
	at pgsql.client.main(client.java:53)
Caused by: GSSException: Defective token detected (Mechanism level: AP_REP token id does not match!)
	at java.security.jgss/sun.security.jgss.krb5.AcceptSecContextToken.<init>(AcceptSecContextToken.java:80)
	at java.security.jgss/sun.security.jgss.krb5.Krb5Context.initSecContext(Krb5Context.java:757)
	at java.security.jgss/sun.security.jgss.GSSContextImpl.initSecContext(GSSContextImpl.java:266)
	at java.security.jgss/sun.security.jgss.GSSContextImpl.initSecContext(GSSContextImpl.java:196)
	at org.postgresql.gss.GssAction.run(GssAction.java:102)
	... 19 more
Exception in thread "main" java.lang.NullPointerException
	at pgsql.client.main(client.java:72)

Process finished with exit code 1
```
#### 原因

需要重新生成server的keytab文件，过期了


### 3、Krb认证报错 KrbException: Message stream modified (41)
#### 删除 krb5.conf 配置文件里的 renew_lifetime = xxx 这行配置即可

renew_lifetime：代表凭证最长能够被延期的时限，通常为一个礼拜。当凭证过时以后，对安全认证的服务的后续访问则会失败

ticket_lifetime： 代表凭证生效的时限，通常为24小时


### 4、Unspecified GSS failure.  Minor code may provide more information: Key table entry not found

#### postgresql.log
```shell
2022-03-28 20:02:36.172 CST [10294] LOG:  could not accept GSSAPI security context
2022-03-28 20:02:36.172 CST [10294] DETAIL:  Unspecified GSS failure.  Minor code may provide more information: Key table entry not found
2022-03-28 20:02:36.177 CST [10295] LOG:  accepting GSS security context failed
2022-03-28 20:02:36.177 CST [10295] DETAIL:  Unspecified GSS failure.  Minor code may provide more information: Key table entry not found
2022-03-28 20:02:36.177 CST [10295] FATAL:  GSSAPI authentication failed for user "postgres"
2022-03-28 20:02:36.177 CST [10295] DETAIL:  Connection matched pg_hba.conf line 95: "host    all              all     all            gss  include_realm=0 krb_realm=EXAMPLE.COM"
```

#### 原因
没有正确读取到pgsql server的keytab文件，配置文件指定keytab文件在/root目录下，用户postgres对/root目录无权限导致的读取失败。
