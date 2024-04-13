---
title: vue3+vite+ts项目笔记
---

包括搭建项目，父子组件传值，兄弟组件传值，插槽，Teleport 组件，依赖注入

<!-- more -->

#### 搭建项目: [点击](https://blog.csdn.net/weixin_59916662/article/details/127331094)
#### vue官网: [进入](https://cn.vuejs.org/guide/components/v-model.html)
## 父子组件传值

### 1.父传子

```js
<div>父组件
  <list :msg="msg"></list>
</div>

let msg = ref('传过去的')
```

```js
<div>这是子组件{{msg}}</div>

defineProps({
    msg:{
        type:String,
        default:"默认值"
    }
})
```

### 2.子传父

```js
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

```js
<div>父组件
  <list @fn='changeHome'></list>
</div>

let changeHome = (n)=>{
    console.log(n)
}
```

### 3.v-model 传值
[看官网](https://cn.vuejs.org/guide/components/v-model.html)

## 兄弟组件传值

### 1.通过父组件比较繁琐

### 2.通过 mitt

#### 1）.下载安装

```js
npm install mitt -S
```

#### 2）.新建文件夹

src/plugins/Bus.js

```js
//bus.js内
import mitt from 'mitt';
const emitter = mitt()
export default emitter;
```

```js
//兄弟组件A中
import emitter from "@plugins/Bus.js"
let str = ref("A值")
const btn = ()=>{
    emitter.emit('fn',str);
}
```

```js
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

```js
父：
<A>
    这是xxx数据
    这是yyy数据
</A>
```

```js
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

```js
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

```js
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

```js
父：
<template v-slot="{data}">
    {{ data.name }}---{{ data.age }}
</template>
//可以简写成#default
<template #default="{data}">
    {{ data.name }}---{{ data.age }}
</template>
```

```js
子：
<div>
    <slot :data="item"></slot>
</div>
```

### 4.动态插槽

就是通过数据动态切换插槽名

```js
父：
<template #[name]>
    这是xxx
</template>
let name = ref('xxx')
```

```js
子：
<div>
    <slot name="xxx"></slot>
</div>
```

## Teleport 组件

传送

```js
<Teleport to="body"></Teleport>
<Teleport to=".mian"></Teleport>
<Teleport to="#container"></Teleport>
```

## 依赖注入

```js
//父组件：提供
provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
//如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值
provide('read-only-message', readonly(message))

//子孙组件：注入
const message = inject('message')

//注入默认值
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')

//使用 Symbol 作注入名
我们通常推荐在一个单独的文件中导出这些注入名 Symbol：
// keys.js
export const myInjectionKey = Symbol()

// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'
provide(myInjectionKey, { /*
  要提供的数据
*/ });

// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'
const injected = inject(myInjectionKey)
```




```js
//刷新页面
<meta http-equiv="refresh" content="5">
```

```js

```