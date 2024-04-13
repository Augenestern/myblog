---
title: Vuex和Pinia
#文章封面图
# photos: [
#         ["https://img1.baidu.com/it/u=640593135,209279600&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"],
# ["https://img2.baidu.com/it/u=1693058886,815993951&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"]
# ]
---

应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。

<!-- more -->

## Vuex 的使用

### 1.Vuex 的安装和注册

注意：vue 的 2.x 版本对应 vuex 的 3.x 版本，vue 的 3.x 版本对应 vuex 的 4.x 版本

```js
npm install --save vuex@3.6.2
```

在 src 目录下新建 store 文件夹，创建 index.js 文件引入、安装、创建并导出 Vuex 对象。

```js
import Vue from 'vue'
import Vuex from 'vuex'
//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  state:{
    counter:1000
  },
  mutations:{},
  actions:{},
  getters:{},
  modules:{}
})
//3.导出使用
export default store
```

样例如下：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //设置全局访问的state对象  要设置的初始属性值
  state: {
    username:localStorage.getItem("username"), //存储登录名
    number:localStorage.getItem("number"),  //存储其他有关数据
    Authorization: localStorage.getItem('Authorization')  //存储登录需要用到的请求头token
  },
  //实时监听state值的变化（最新状态）
  getters:{
    getusername(state){  //承载变化的对象（username）的值
      return state.username
    },
    getnumber(state){   //承载变化的对象（number）的值
      return state.number
    }
  },
  //要修改store中的值唯一的方法就是提交mutation来修改   同步操作
  mutations: {
    //自定义改变state初始值的方法，这里面的参数除了stae之外还可以再传额外的参数（变量或对象）
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    setnumber(state,number){
      state.number=number
    },
    setusername(state,username){
      state.username=username
    }
  },
  //Action 类似于 mutation，不同在于：1.Action 提交的是 mutation，而不是直接变更状态。2.Action 可以包含任意异步操作。
  actions: {
    getUser(context, username){
      context.commit('setusername',username)
    },
    //自定义触发mutations里函数的方法context与store实例具有相同方法和属性
    getNumber(context, number){
      context.commit('setnumber',number)
    },
  },
  modules: {
  },
})
```

在 main.js 文件中挂载使用

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

### 2.Vuex 的基本使用

1.getter 方法的调用

```js
this.$store.getters.resturantName
```

state 状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态，如下：

```js
computed: {
  resturantName: function() {
    return this.$store.getters.resturantName;
  }
}
```

2.mutations 中方法的调用方式
不能直接调用 this.$store.mutations.setResturantName('KFC')，必须使用如下方式调用：this.$store.commit(type,payload);

```js
// 1、把载荷和type分开提交
this.$store.commit('setResturantName',{
  resturantName:'KFC'
})
```

```js
// 2、载荷和type写到一起
this.$store.commit({
  type: 'setResturantName',
  resturantName: 'KFC'
})
```

3.actions 数据的静态异步(async)操作

```js
this.$store.dispatch('xxx',{
  name:'KFC'
})
```

## Pinia 的使用

### 1.Pinia 的安装和注册

```js
npm install pinia
```

在 src 目录下新建 store 文件夹，创建 index.js 文件引入、安装、创建并导出 Pinia 对象。

```js
import { defineStore } from 'pinia'

//defineStore()：创建仓库容器的方法，主要有两个参数，第一个参数是容器的一个别名，
//特点：此名字必须唯一，不能重复，第二个参数是配置信息即仓库的初始化数据和方法
export const indexStore = defineStore('index', {
    state: ()=>{
        return {}
    },
    getters: {},
    actions: {}
})
```

样例如下：

```js
import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
    // 相当于data
    state: () => {
        return {
          // 所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
          counter: 0,
          name: 'Eduardo',
        }
    },
    // 相当于计算属性
    getters: {
        doubleCount: (state) => {
            return state.counter * 2
        },
    },
    // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
    actions: {
        increment() {
          this.counter++
        },
        randomizeCounter() {
            setTimeout(() => {
                this.counter = Math.round(100 * Math.random())
            }, 0);
        },
    },
})
```

在 main.js 文件中挂载使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
const store = createPinia()

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
```

### 2.Pinia 的基本使用

1.获取数据

```js
<template>
  <h3>{{store.helloWorld}}</h3>
  <h3>解构：{{ helloWorld }}</h3>
</template>
<script lang="ts" setup>
import { indexStore } from "../store"
import { storeToRefs } from "pinia"
const store = indexStore()
// 解构：
const { helloWorld } = storeToRefs(store)
</script>
```

2.$patch 的两种方法

```js
<script lang="ts" setup>
import { indexStore } from "../store";
const store = indexStore()
// 方法一-直接改
const update = () => {
  store.helloWorld = 'hello world'
}
// 方法二-使用$patch
const handleClickPatch = () => {
  store.$patch({
    helloWorld: 'hello world patch'
  })
}
// 方法三-使用$patch回调函数
const handleClickMethod = () => {
  store.$patch((state)=>{
    state.helloWorld = 'hello world  method'
  })
}
</script>
```

3.使用 actions，注意 actions 中的 this 指向，这里不能使用箭头函数
在/store 中：

```js
import { defineStore } from 'pinia'

export const indexStore = defineStore('main', {
    state: ()=>{
        return {
          helloWorld: 'Hello world!'
        }
    },
    getters: {},
    actions: {
      actionChange() {
            this.helloWorld = 'hello world actions'
        },
    },
})
```

在/Hello 中：

```js
<script lang="ts" setup>
import { indexStore } from "../store";
const store = indexStore()

const handleClickActions = () => {
  store.actionChange()
}
</script>
```

4.重置

```js
import { indexStore } from "../store";
const store = indexStore()
store.$reset()
```

### 3.Pinia 储存持久化

#### 1.安装 pinia-plugin-persistedstate 插件

```js
npm i pinia-plugin-persistedstate
```

#### 2.安装完成后 在 main.ts/js 文件内进行配置

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
```

#### 3.store 里添加 persist: true，与 getters 同级

```js
getters: {
},
// 相当于vuex的 mutation + action，可以同时写同步和异步的代码
actions: {
},
persist: true,
```

_借鉴:[Vuex](https://blog.csdn.net/m0_67476502/article/details/124750596)和[Pinia](https://zhuanlan.zhihu.com/p/575738777)_
