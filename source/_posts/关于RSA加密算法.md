---
title: 关于RSA加密算法
date: 2020-05-16 22:27:37
categories: 原理
tags:
- 加密与编码
---

RSA是目前使用最广泛的公钥密码体制之一。

### RSA产生公私钥对

**1.随机选取两个相近但不相等的质数p和q（越大越难破解）**

取p=11，q=13，n = p * q = 143，n即为密钥长度，143二进制为10001111，密钥为8位。实际应用中，一般为1024位。

**2.计算n的欧拉函数z**

z = (p-1)(q-1) = 120

**3.随机选择一个整数e，作为公钥中用来加密的数字**

条件1 < e < z，且e与z互质。假设随机选择e = 7（实际中常选择为65537）

**4.计算e对于z的模反元素d，作为密钥中用来解密的数字**

模反元素指存在一个整数d，使得e * d mod z = 1。带入可得d = 103

**5.将n和e封装成公钥（143，7），n和d封装成密钥（143，103）**

<!-- more -->

### 题外话：关于m^e mod n的手动计算方法

利用 (a×b) mod m = ((a mod m) × (b mod m)) mod m 这个公式

设三个变量a，b，c，对于m^e mod n，令a = e,b = m, c = 1

然后重复以下步骤：

1.判断a是奇数，进第2步；偶数进第3步

2.a = a - 1, c = (c*b) mod n,回到第1步

3.a = a / 2, b = (b*b) mod n,回到第1步

直到a = 0, c 就是最终结果



### RSA的加密和解密

**加密：c = m^e mod n**

**解密：m = c^d mod n**

首先对明文进行比特串分组，且保证每个分组对应的十进制数小于n，然后对每个分组进行一次加密，所有分组的密文组成的序列就是最终密文了。

举两个栗子：

**1.以数据加密为例：**

甲向乙发送机密数据信息m=85，并已知乙的公钥(n,e)=(143,7)，于是可计算出：c = 123
甲将c发送至乙，乙利用私钥(n,d)=(143,103)对c进行计算：m = 85
则乙得到甲向其要发送的机密数据信息。甲向乙发送信息，甲所拥有的仅仅是乙的公钥。

**2.以数字签名为例：**

乙要向甲发送信息，并要让甲确信此信息是由乙本人所发出的，于是，乙将能代表自己身份的编码值（如：123），利用私钥(n,d)=(143,103)进行计算，并将结果发送给甲：m = 85
甲接受到乙的数字签名后利用乙的公钥(n,e)=(143,7)进行计算，得出代表乙身份的编码：c = 123
现甲经过验证已确信信息的发送方为乙。因为只有乙拥有私钥(n,d)，来对代表自己身份的编码123进行计算。在这里，乙向甲发送信息并进行签名，甲所拥有的也仅仅是乙的公钥来验证乙的签名。



### RSA实际应用

**在基于序列号保护的共享软件中应用RSA。**

在某一共享软件中，甲想用123为注册名进行软件注册，他现在拥有的仅仅是存在于共享软件程序中的公钥(n,e)=(143,7)。

甲现将123为注册名向乙提出注册申请，乙得知此申请并通过此申请后，便利用所拥有的私钥(n,d)对注册名123进行计算：m = 85

甲得到计算后的结果85（序列号），提供给共享软件的注册程序进行计算：c = 123

然后注册程序将判断计算结果c是否为123（注册名），以决定注册是否通过。

如果甲随意输入一组序列号利用公钥(n,e)进行计算，那他得到的结果将不是123，注册也就失败了。注意，在这里，共享软件的注册程序**比较的是注册名**，而不是序列号。

如果甲跟踪注册程序得到了他所随意输入的序列号所产生的注册名，将其提供给注册程序，那注册程序也能够通过注册，但他由于没有(n,d)，所以他无法用自己的注册名进行软件注册，也就**防止了非法注册机的制作**。

将RSA应用于此的目的仅仅是防止非法注册机的制作，在以上描述中，n=143，包括以下Demo中的n(HEX)=963251DC5A9C90D9F203A03C363BA411，以现在的计算机处理速度，能很快地将其因式分解得到相应的p，q，再结合暴露在共享软件注册程序中的e，从而计算出d，那么这个共享软件的保护就完全被破解了。解决的方法是要避免n过短，以及结合MD5等加密算法……
