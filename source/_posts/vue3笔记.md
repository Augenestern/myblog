---
title: vue3+vite+ts项目笔记
---

包括搭建项目，父子组件传值，兄弟组件传值，插槽，Teleport 组件，依赖注入

<!-- more -->

#### 搭建项目: [点击](https://blog.csdn.net/weixin_59916662/article/details/127331094)

## 数据代理

vue2.x : Object.defineProperty()
vue3.x : Proxy

## 父子组件传值

### 1.父传子

```bash
<div>父组件
  <list :msg="msg"></list>
</div>

let msg = ref('传过去的')
```

```bash
<div>这是子组件{{msg}}</div>

defineProps({
    msg:{
        type:String,
        default:"默认值"
    }
})
```

### 2.子传父

```bash
<div>这是子组件{{msg}}
  <button @click="changeNum">按钮</button>
</div>

let num = ref(200)
// const emit = defineEmits(['fn'])
const emit = defineEmits<{
    (e:"fn", id: number): void
}>()
const changeNum = ()=>{
    emit("fn",num)
}
```

```bash
<div>父组件
  <list @fn='changeHome'></list>
</div>

let changeHome = (n)=>{
    console.log(n)
}
```

### 3.v-model 传值

```bash
<div>父组件
  <list v-model:num = "num"></list>
</div>

let num = ref(1)
```

```bash
<div>这是子组件{{num}}
  <button @click="btn">按钮</button>
</div>

const props = refineProps({
    num:{
        type:Number,
        default:100
    }
})
const emit = defineEmits(['update:num'])
const btn = ()=>{
    emit('update:num',200)
}

```

## 兄弟组件传值

### 1.通过父组件比较繁琐

### 2.通过 mitt

#### 1）.下载安装

```bash
npm install mitt -S
```

#### 2）.新建文件夹

src/plugins/Bus.js

```bash
//bus.js内
import mitt from 'mitt';
const emitter = mitt()
export default emitter;
```

```bash
//兄弟组件A中
import emitter from "@plugins/Bus.js"
let str = ref("A值")
const btn = ()=>{
    emitter.emit('fn',str);
}
```

```bash
//兄弟组件B中 接收
import emitter from "@plugins/Bus.js"
let s = ref("")
const btn = ()=>{
    emitter.on('fn',e=>{
        s.value = e.value;
        console.log(e.value)
    });
}
```

## 插槽

### 1.匿名插槽

```bash
父：
<A>
    这是xxx数据
    这是yyy数据
</A>
```

```bash
子：
<div>
    <div>头部</div>
    <slot></slot>
</div>
<div>
    <div>底部</div>
    <slot></slot>
</div>
```

### 2.具名插槽

```bash
父：
<A>
    <template v-slot:xxx>
        这是xxx数据
    </template>
    <template #yyy>
        这是yyy数据
    </template>
</A>
```

```bash
子：
<div>
    <div>头部</div>
    <slot name="xxx"></slot>
</div>
<div>
    <div>底部</div>
    <slot name="yyy"></slot>
</div>
```

### 3.作用域插槽

```bash
父：
<template v-slot="{data}">
    {{ data.name }}---{{ data.age }}
</template>
//可以简写成#default
<template #default="{data}">
    {{ data.name }}---{{ data.age }}
</template>
```

```bash
子：
<div>
    <slot :data="item"></slot>
</div>
```

### 4.动态插槽

就是通过数据动态切换插槽名

```bash
父：
<template #[name]>
    这是xxx
</template>
let name = ref('xxx')
```

```bash
子：
<div>
    <slot name="xxx"></slot>
</div>
```

## Teleport 组件

传送

```bash
<Teleport to="body"></Teleport>
<Teleport to=".mian"></Teleport>
<Teleport to="#container"></Teleport>
```

## 依赖注入

```bash
//父组件：提供
provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
//如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值
provide('read-only-message', readonly(message))

//子孙组件：注入
const message = inject('message')
```


## js 数组

```bash
//使用slice()方法返回一个子数组，在进行reverse； 不会改变原数组
time1 = time.slice().reverse()  //time1数组反转  time数组不变
```
## js 取整
```bash
parseInt()   //向0取整
Math.floor()  //向下取整
Math.ceil()  //向上取整
Math.trunc()  //去除数字的小数部分，保留整数部分
Math.round()  //返回一个数字四舍五入后的整数部分
```

```bash

```

```bash

```