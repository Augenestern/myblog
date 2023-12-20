---
title: CSS布局和transform笔记
---

position 布局，transform 的基本使用和常用特效，display常用方法

<!-- more -->

## 一.position

Position 的属性值有：
1.Absolute：绝对定位，是相对于最近的且不是 static 定位的父元素来定位
2.Fixed：绝对定位，是相对于浏览器窗口来定位的，是固定的，不会跟屏幕一起滚动。
3.Relative：相对定位，是相对于其原本的位置来定位的。
4.Static：默认值，没有定位。
5.Inherit：继承父元素的 position 值

## 二.transform 的基本使用和常用特效

### 1.平移

```bash
/* x表示x轴移动的坐标，y表示y轴移动的坐标 */
/* transform: translate(30px,30px); */
/* x轴移动的坐标，y轴不变  */
/* transform: translateX(30px); */
/* y轴移动的坐标，x轴不变  */
/* transform: translateY(30px); */
/* 百分比参照的单位是自身的宽高，在这里也就是100px; */
/* transform: translate(50%,50%); */
```

### 2.旋转

```bash
/* deg相当于度单位，表示旋转45度; */
/* transform: rotate(45deg); */
```

```bash
.first {
    margin: 50px auto;
    width: 200px;
    height: 200px;
    border: 2px solid brown;
    /*不要上边框和左边框后旋转45度即可*/
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
    transition: transform 0.5s;  //设置transform动画效果时间
    // transform-origin设置旋转中心点
    /* transform-origin: bottom left; */
    /* transform-origin: 50px 50px;  */
}
.first:hover {
    transform: rotate(225deg);
}
```

### 3.缩放

不会影响其他盒子

```bash
/*  transition: transform 0.7s; //设置transform动画效果时间 */
.first:hover {
    /* 表示xy的倍数，小于1的为缩小，大于1为放大 */
    /* transform: scale(2,2); */
    /* 也可以写成一个表示xy比例一样 */
    /* transform: scale(2); */
}
```
### 4.倾斜
```bash
transform:skew(30deg);
transform:skew(30deg,30deg);
# 一个参数时：表示水平方向的倾斜角度。
# 两个参数时：第一个参数表示水平方向的倾斜角度，第二个参数表示垂直方向的倾斜角度 。
# skew 的默认原点 transform-origin 是这个物件的中心点。
```
### 5.transform 动画效果

[详情](https://code84.com/727426.html)
```bash
transition: transform 0.2s ease-in-out;
```

## 三.transform 的基本使用和常用特效
1.animation：动画
2.*animation-name：关键帧的名字，该参数必需。
3.*animation-duration：动画持续的时间，该参数必需。
4.animation-timing-function：定时器函数，默认是ease。
5.animation-delay：动画效果多少秒后开始，默认为0。
6.animation-iteration-count：动画重复的次数，可以指定为一个整数，表示多少次，默认值是infinite关键字，表示无限次。
7.animation-direction：动画方向，可能的值为forward、backward或alternating，默认值为normal。
8.animation-fill-mode：默认值为none。
9.animation-play-state：动画默认是否生效，默认值为running。

### @keyframes
```bash
@keyframes myname {
  0% {
    top: 0px;
  }
  25% {
    top: 200px;
  }
  50% {
    top: 100px;
  }
  75% {
    top: 200px;
  }
  100% {
    top: 0px;
  }
}
```
```bash
keyframes rotation {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg);
  }
}
```
## 四.display常用方法

### 1.flex布局
```bash
flex-direction: 决定主轴的方向(即项目的排列方向)
  默认值：row，主轴为水平方向，起点在左端。
  row-reverse：主轴为水平方向，起点在右端
  column：主轴为垂直方向，起点在上沿
  column-reverse：主轴为垂直方向，起点在下沿
```
```bash
flex-wrap: 决定容器内项目是否可换行
  默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整(变形)而并不会挤到下一行。
  wrap：项目主轴总尺寸超出容器时换行，第一行在上方
  wrap-reverse：换行，第一行在下方
```
```bash
justify-content：定义了项目在主轴的对齐方式。
  默认值: flex-start 左对齐
  flex-end：右对齐
  center：居中
  space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙。
  space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。(边0.5，间隔1)
```
```bash
align-items: 定义了项目在交叉轴上的对齐方式
  默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。
  flex-start：交叉轴的起点对齐
  flex-end：交叉轴的终点对齐
  center：交叉轴的中点对齐
  baseline: 项目的第一行文字的基线对齐
```

More info: [查看更多](https://zhuanlan.zhihu.com/p/611136271)

