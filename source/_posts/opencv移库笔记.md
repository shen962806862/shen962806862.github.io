---
title: opencv移库笔记
date: 2021-12-23 19:28:33
categories: Graphics and Image
tags: opencv
---

# 环境配置

## VMware Workstation

### 版本

<font color="red"> 16.0版本！ 16.0版本！ 16.0版本！</font>15版本的有bug，会闪退。

### VMware Tools

**实现物理机和虚拟机之间的文件和文本的直接复制粘贴**

1.点击虚拟机选项中的安装，安装的是个tar.gz的压缩包

2.将虚拟机解压至任意路径下，并在该路径下进入命令行

3.`./vmware-install.pl`即可完成安装



## Ubuntu

16.0版本，用户名和密码设简单点！建议英文！

切换中文输入法用Ctrl+空格。

解压：`tar -zxvf xxx.tar.gz`

### 分辨率

```shell
cvt 1920 1080
// 返回
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync

// 增加显示模块，并设置为开机启动，编辑”/etc/profile”，在末尾增加：
xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync
xrandr --addmode VGA1 "1920x1080_60.00"

// 立即启用
source /etc/profile
```

之后就可以在设置中的Display里修改啦。



# opencv库

## 安装与编译

### 下载

1.在GitHub上下载了opencv4.1.1的库，并在Ubuntu中解压

[opencv4]: https://github.com/opencv/opencv/releases/tag/4.1.1

2.下载 **ippicv_2019_lnx_intel64_general_20180723**，这个压缩包无需解压

3.将**opencv-4.1.1/3rdparty/ippicv/ippicv.cmake**文件中倒数第十行(以http开头的)修改成"**file://path**",  **path**为下载的ippicv_2019_lnx_intel64_general_20180723在你的电脑中存放的位置（绝对路径）

### 安装依赖包

```shell
sudo apt-get install build-essential

sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev

sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev
```

### 编译opencv

在opencv-4.1.1路径下

```shell
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local -D OPENCV_GENERATE_PKGCONFIG=ON ..
// 这里选择安装路径为/usr/local下，并开启了pkg-config
// 因为opencv4开始就不会主动支持pkg-config了，但是编译还是需要这个。
// 一定注意这两个点“..”，这是选择编译的内容为整个opencv文件夹
// 编译结束后进入下一步：
make -j8
// 这一步比较久一点，8为选择编译时使用的内核数
sudo make install
opencv_version
//编译结束后运行，若能查看到版本号就ok了
sudo gedit /etc/ld.so.conf.d/opencv.conf
//设置opencv的环境变量。(文件可能为空，即原来不存在，新建立的)
//将如下内容添加到最后：
/usr/local/lib  (依然要对应成你本身的路径，这个看看安装好之后，你的安装路径下的lib文件夹位置)

//配置库
sudo ldconfig
//更改环境变量：
sudo gedit /etc/bash.bashrc
//在文件后添加
PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/home/ubun/myinstall/lib/pkgconfig  
export PKG_CONFIG_PATH
```

opencv 编译后主要文件位于 **/usr/local/bin**    **/usr/local/include/opencv4**     **/usr/local/lib**



### 导入opencv扩展包

1.下载opencv_contrib-4.1.1扩展包

[opencv_contrib]: https://github.com/opencv/opencv_contrib/releases

2.将文件夹解压至opencv-4.1.1文件夹下，同时删除其下的build文件夹（之前的编译文件）

3.下载可能缺少的.i文件（会导致编译失败）

[补充.i文件]: https://github.com/Linfeng-Lee/OpenCV_boostdesc_vgg_file

将下载的.i文件放至**/opencv_4.1.1/opencv_contrib-4.1.1/modules/xfeatures2d/src/**目录下

4.按照上一节的步骤重新编译，其中编译命令做一点改动（增加一句）

```shell
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local -D OPENCV_EXTRA_MODULES_PATH=/home/shenzihan/opencv-4.1.1/opencv_contrib-4.1.1/modules/ -D OPENCV_GENERATE_PKGCONFIG=ON ..
```

5.在执行**make -j4**时可能会报错：**fatal error: features2d/test/test_detectors_regression.impl.hpp: No such file or directory**

按照内容，将opencv-4.1.1/modules/下的**features2d**文件夹复制到**build**文件夹下即可。



## 移植opencv

### 总体流程

**1.封装函数**

需求的操作系统环境下，只允许int char等基本类型的数据类型，因此需要将opencv库中定义的类型（如Mat）做一个转换。函数的输入不再是Mat而是转化成unsigned char和int。

也就是需要在每个opencv函数外面套一层壳，先将unsigned char和int 转为Mat CPoint等输入opencv函数，返回值再转回unsigned char和int作为移植函数的返回值，即可。

**2.生成.so动态链接库**

编译写好的移植函数生成.so文件：

```shell
g++ -fpic -shared -o target.so source.cpp `pkg-config --cflags --libs opencv4` -std=c++11
```

一步到位，直接生成.so文件

**3.在测试文件中调用so文件测试功能**

```C++
void * LdSoHandle=dlopen("./target.so", RTLD_NOW|RTLD_GLOBAL);
```

**4.编译测试文件生成可执行文件**

```shell
g++ -std=c++11 main.cpp -o mai `pkg-config --cflags --libs opencv4` -ldl
// -ldl一定要加上
```



### opencv图像类型参数的值

|   类型   | int值 | elemSize() |
| :------: | :---: | :--------: |
| CV_8UC1  |   0   |     1      |
| CV_8UC2  |   8   |     2      |
| CV_8UC3  |  16   |     3      |
| CV_32FC1 |   5   |     4      |
| CV_32FC2 |  13   |     8      |
| CV_32FC3 |  21   |     12     |
| CV_16FC1 |   7   |     2      |
| CV_16FC2 |  15   |     4      |
| CV_16FC3 |  23   |     6      |

