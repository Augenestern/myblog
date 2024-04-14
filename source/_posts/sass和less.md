---
title: sass和less
# top: ture #文章置顶
---

sass,less

<!-- more -->

### sass

安装：

```bash
cnpm i -S node-sass sass-loader
npm i -D sass@1.32.10 sass-loader@10.1.0
```

#### 1.变量

```scss
$baseColor: red;
$baseColor: red !default; //!default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值

//如果变量需要镶嵌在字符串之中
$side: bottom;
.aaa {
  border-#{$side}: 2px solid red;
}
```

#### 2.嵌套

```scss
a {
  　　&:hover {
    color: red;
  }
}
```

#### 3.继承

```scss
.a {
  @extend .b;
}
.b {
  color: red;
}
```

[详细](https://blog.csdn.net/qq_15911201/article/details/130772891)

### less

安装：

```bash
npm install -g less
```

#### 变量

```less
@color: #999;
```

##### 选择器变量:

```less
/* Less */
@mySelector: #wrap;
@Wrap: wrap;
@{mySelector}{ //变量名 必须使用大括号包裹
  color: #999;
  width: 50%;
}
.@{Wrap}{
  color:#ccc;
}
#@{Wrap}{
  color:#666;
}

/* 生成的 CSS */
#wrap{
  color: #999;
  width: 50%;
}
.wrap{
  color:#ccc;
}
#wrap{
  color:#666;
}

```

##### 属性变量：

```less
/* Less */
@borderStyle: border-style;
@Soild: solid;
#wrap {
  @{borderStyle}: @Soild; //变量名 必须使用大括号包裹
}

/* 生成的 CSS */
#wrap {
  border-style: solid;
}
```

##### url 变量:

```less
/* Less */
@images: "../img"; //需要加引号
body {
  background: url("@{images}/dog.png"); //变量名 必须使用大括号包裹
}

/* 生成的 CSS */
body {
  background: url("../img/dog.png");
}
```

##### 声明变量:

```less
/* Less */
@background: {
  background: red;
};
#main {
  @background();
}
@Rules: {
  width: 200px;
  height: 200px;
  border: solid 1px red;
};
#con {
  @Rules();
}

/* 生成的 CSS */
#main {
  background: red;
}
#con {
  width: 200px;
  height: 200px;
  border: solid 1px red;
}
```

##### 变量运算：

```less
/* Less */
@width: 300px;
@color: #222;
#wrap {
  width: @width - 20; // 尽量有空格，防止识别不出变量名
  height: @width - 20 * 5;
  margin: (@width -20) * 5;
  color: @color*2;
  background-color: @color + #111;
}

/* 生成的 CSS */
#wrap {
  width: 280px;
  height: 200px;
  margin: 1400px;
  color: #444;
  background-color: #333;
}
```

##### 变量定义变量：

```less
/* Less */
@fnord: "I am fnord.";
@var: "fnord";
#wrap::after {
  content: @@var; //将@var替换为其值 content:@fnord;
}
/* 生成的 CSS */
#wrap::after {
  content: "I am fnord.";
}
```
[详细](https://blog.csdn.net/Vvaans/article/details/130421103)
