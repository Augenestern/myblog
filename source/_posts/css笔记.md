---
title: css笔记
top: ture
---

position 布局，transform 的基本使用和常用特效，display 常用方法,外边距塌陷,css 中的伪类：before 与 after

<!-- more -->

## position

Position 的属性值有：
1.Absolute：绝对定位，是相对于最近的且不是 static 定位的父元素来定位
2.Fixed：绝对定位，是相对于浏览器窗口来定位的，是固定的，不会跟屏幕一起滚动。
3.Relative：相对定位，是相对于其原本的位置来定位的。
4.Static：默认值，没有定位。
5.Inherit：继承父元素的 position 值

## transform 的基本使用和常用特效

### 1.平移

```css
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

```css
/* deg相当于度单位，表示旋转45度; */
/* transform: rotate(45deg); */
```

```css
.first {
  margin: 50px auto;
  width: 200px;
  height: 200px;
  border: 2px solid brown;
  /*不要上边框和左边框后旋转45度即可*/
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  transition: transform 0.5s; //设置transform动画效果时间
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

```css
/*  transition: transform 0.7s; //设置transform动画效果时间 */
.first:hover {
  /* 表示xy的倍数，小于1的为缩小，大于1为放大 */
  /* transform: scale(2,2); */
  /* 也可以写成一个表示xy比例一样 */
  /* transform: scale(2); */
}
```

### 4.倾斜

```css
transform:skew(30deg);
transform:skew(30deg,30deg);
# 一个参数时：表示水平方向的倾斜角度。
# 两个参数时：第一个参数表示水平方向的倾斜角度，第二个参数表示垂直方向的倾斜角度 。
# skew 的默认原点 transform-origin 是这个物件的中心点。
```

### 5.transform 动画效果

[详情](https://code84.com/727426.html)

```css
transition: transform 0.2s ease-in-out;
```

## transform 的基本使用和常用特效

1.animation：动画 2.*animation-name：关键帧的名字，该参数必需。 3.*animation-duration：动画持续的时间，该参数必需。
4.animation-timing-function：定时器函数，默认是 ease。
5.animation-delay：动画效果多少秒后开始，默认为 0。
6.animation-iteration-count：动画重复的次数，可以指定为一个整数，表示多少次，默认值是 infinite 关键字，表示无限次。
7.animation-direction：动画方向，可能的值为 forward、backward 或 alternating，默认值为 normal。
8.animation-fill-mode：默认值为 none。
9.animation-play-state：动画默认是否生效，默认值为 running。

### @keyframes

```css
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

```css
keyframes rotation {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg);
  }
}
```

## display 常用方法

### 1.flex 布局

```css
flex-direction: 决定主轴的方向(即项目的排列方向) 默认值：row，主轴为水平方向，起点在左端。
  row-reverse：主轴为水平方向，起点在右端 column：主轴为垂直方向，起点在上沿 column-reverse：主轴为垂直方向，起点在下沿;
```

```css
flex-wrap: 决定容器内项目是否可换行 默认值：nowrap
  不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整(变形) 而并不会挤到下一行。
  wrap：项目主轴总尺寸超出容器时换行，第一行在上方 wrap-reverse：换行，第一行在下方;
```

```css
justify-content：定义了项目在主轴的对齐方式。
默认值: flex-start 左对齐
flex-end：右对齐
center：居中
space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙。
space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。(边0.5，间隔1)
space-evenly:均匀分布，首尾都有相等的间隔(1:1:1)
```

```css
align-items: 定义了项目在交叉轴上的对齐方式
默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。
flex-start：交叉轴的起点对齐
flex-end：交叉轴的终点对齐
center：交叉轴的中点对齐
baseline: 项目的第一行文字的基线对齐
```

```css
aligin-content:控制多条轴线的交叉轴方向
strech:默认；
flex-start 左对齐
flex-end：右对齐
center：居中
space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙。
space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。(边0.5，间隔1)
space-evenly:均匀分布，首尾都有相等的间隔(1:1:1)
```

flex-grow:定义 Flex 项目放大比例，默认为 0；
flex-shrink:定义 Flex 项目收缩比例，默认为 1；
align-self:单独为某个设置

### 2.grid 布局

```css
grid-template-columns: repeat(4,1fr);
/* grid-template-columns: repeat(auto-fill,minmax(100px,1fr)); */
/* grid-template-rows: 1fr 1fr; */
/* gap: 10px 10px; */
```
[详情](https://blog.csdn.net/weixin_41192489/article/details/115588135)

常用：
```css
.MBox {
    width: 600px;
    height: 400px;
    /* height: 100vh;    */
    background-color: aqua;
    /* display: flex; */
    /* overflow: auto; */
    /* flex-wrap: wrap; */
    /* justify-content: center; */
    display: grid;
    /* 设置几列 */
    grid-template-columns: repeat(4,1fr);
    /* grid-template-columns: repeat(auto-fill,minmax(100px,1fr)); */
    /* grid-template-rows: 1fr 1fr; */
    gap: 10px 10px;
}
.MBox .item{
    /* width: 100px; */
    /* height: 100px; */
    /* 不压缩且不扩大元素  */
    /* flex: 0 0 auto;   */
    /* margin: 10px 10px 0 0; */
    background-color: red;
    box-sizing: border-box;
    border: 1px solid black;
}
.item:first-child{
    /* grid-row: span 2; */
    grid-row: 1/3;
    /* grid-column: span 4; */
    grid-column: 1/5;
}
/* .item:nth-child(3n){
    margin-right: 0px;
}
.MBox:after{
    content: '';
    flex: auto;
} */
```
## 外边距塌陷

外边距只塌路也称外边距合并，在文档流中相邻兄弟或父子关系的块级元素的外边距组合在一起变成单个外边距，只有在上下外边距才会出现塌陷，左右不会出现
解析，1.两个嵌套块级元素 Q，父元素如果没有上补白和上边框，那么它的上边距会和它的文档流中的的第一个子元素的上边距重叠，取两者较大的值，父元素上的外边距为 0，也会发生合并。(通俗来说: 子元素找不到父元素的 border 或者 padding.就会与父元素上边距重季) 2.两人相邻块级元素，如果上面的元素存在外边距 margin-bottom,下面的元素存在外边距 margin-top,那么它们之间外边距不是 margin-bottom + margin-top.而是取两者最人值外边距

### 1.外边距计算方式

1.两个值为正数，取较大值 2.两个值为负数，取绝对值 Q 较大的值 3.一正一负，取两个值的和

### 2.解决方式(父元素)

```css
1.border: 1px solid #fff
2.float: left.
3.position: absolute
4.padding: 1px
5.display: inline-block
6.overflow. hidden
7.overflow: auto
```

## css 中的伪类：before 与 after

```css
//破碎图片占位,当用户网络出现问题的时候，可能会造成某些图片的访问失败

img::before {
  background-color: #eeeeee;
  border: #aaaaaa;
  display: block;
  height: 100%;
  content: attr(alt);
  text-align: center;
}

//自定义引用样式
blockquote::before {
  content: open-quote;
  top: 0;
  left: 0;
}

blockquote::after {
  content: close-quote;
  bottom: 0;
  right: 0;
}

blockquote::before,
blockquote::after {
  background-color: #cccccc;
  display: block;
  width: 60px;
  height: 60px;
  line-height: 1.618;
  font-size: 3em;
  border-radius: 100%;
  text-align: center;
  position: absolute;
}

//图片渐变叠加
figure::before {
  background-image: linear-gradient(to top right, #1a1a1a, transparent);
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
}
```

## html 中 meta 什么作用,HTML 中各种常用 meta 标签的作用

[查看](https://blog.csdn.net/weixin_32643811/article/details/117950069)

## 媒体查询（media query）

媒体查询是 css3 新语法，可以针对不同的媒体类型定义不同的样式，可简单理解为根据页面不同的宽度，来使用不同的 css 样式。

```css
///and only not;
@media media-type and (media-feature) {
  /* CSS 样式规则 */
}

media-type 可以是 screen--(用于电脑屏幕，ipad，手机等)、print--(用于打印机)、all--(用于所有设备) 等，表示媒体类型。
media-feature 是一个媒体特性，例如 width、height、orientation 等，用于检查设备属性。


/* 默认样式 */
p {
  font-size: 16px;
}

/* 在小屏幕上调整文本大小 */
@media screen and (max-width: 768px) {
  p {
    font-size: 14px;
  }
}

/* 在非常小的屏幕上进一步调整文本大小 */
@media screen and (max-width: 480px) {
  p {
    font-size: 12px;
  }
}
```

[详细](https://blog.csdn.net/jhxl_/article/details/132400594)
