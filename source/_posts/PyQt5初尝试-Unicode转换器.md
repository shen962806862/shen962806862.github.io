---
title: 'PyQt5初尝试:Unicode转换器'
date: 2020-03-07 22:46:57
categories: 应用
tags:
- PyQt5
- 加密与编码
- 小软件
---

## Unicode转换器

### Version 1.1.0 【2020.3.7】

最近玩阴阳师的时候接触到一位大哥写的御魂hub网站，里面通过对json文件的解析来实现了大量御魂配置的计算，省去了手动配置的无限痛苦！！！超级好用！！！ ❤❤❤

另外有个软件可以从阴阳师桌面版中提取出账号中所有的御魂信息并集合成一个json文件，恰巧最近几天尝试了简单的python爬虫，在爬取动态信息时同样涉及到了json~~这让我对json产生了兴趣。
于是今天下午尝试着解析Unicode为字符串，集成在小软件里。

<!-- more -->

python也只是刚入门，所以目前只实现了这一点点小功能。效果图如下👇

![img](PyQt5初尝试-Unicode转换器/UI.png)

源代码我上传到GitHub了~非常简单的两个小文件~ 戳这里去star吧👇https://github.com/shen962806862/Unicode-Chinese

另外我也生成了单独的exe文件，可以直接使用 👇https://pan.baidu.com/s/1G1BLW82elUwAee7DSpzQqA 提取码：9qfw

接下来会有2.0版本，打算尝试实现txt文件与json文件的相互转换√

###  Version 2.0.0 【2020.3.8】

弄了一晚上！更新更新！船新版本！

![img](PyQt5初尝试-Unicode转换器/UI-1.png)

**新增功能：**

1.实现了Json文件与txt文件的相互转换，可以快速阅读json文件中的信息了

2.当你添加一个文件后，打开添加文件夹选项，可以自动锁定到输入文件的地址了

2.5.转换生成的文件名与输入文件相同

3.优化了UI界面，实现了窗口自适应

4.优化了数据窗口，滚动条可以自动滑至文本末了

**源码和软件链接依旧同上，里面存了所有更新版本的内容~**

**大致搞定了第一个python制作小软件了~接下来的话打算抽空做一个桌面便笺了~敬请期待**
