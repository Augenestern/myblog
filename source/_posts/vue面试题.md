---
title: vue笔记
top: ture
---

谈谈你对 vue 的理解

<!-- more -->

### 谈谈你对 vue 的理解

1.1 声明式框架，单页面应用
1.2MVVM 模式
1.3 采用虚拟 DOM：传统更新页面，拼接一个完整的字符串 innerHTML 全部重新渲染，添加虚拟 DOM 后，可以比较新旧虚拟节点，找到变化在更新。虚拟 DOM 就是一个对象，用来描述真实 DOM 的。
1.4 区分编译时和运行时:
vue 的渲染核心就是调用渲染（render）方法将虚拟 DOM 渲染成真实 DOM。
1.5 组件化：实现高内聚，低耦合，单项数据流；

### 谈谈你对 SPA 的理解

· SPA (single-page application) 单页应用，默认情况下我们编写 Vue、React 都只有一个 html 页面，并且提供一个挂载点，最终打包后会再此页面中引入对应的资源。（页面的渲染全部是由 JS 动态进行渲染的）。切换页面时通过监听路由变化，渲染对应的页面 Client Side Rendering,客户端渲染 CSR.
· MPA (Multi-page application) 多页应用，1 多个 htm1 页面。每个页面必须重复加载，js, css 等相关资源。（服务端返回完整的 html，同时数据也可以再后端进行获取一并返回“模板引擎”）。多页应用跳转需要整页资源刷新。Server Side Rendering，服务器端渲染 SSR
如何分清在哪渲染：HTML 是在前端动态生成的“客户端渲染”，在服务端处理好并返回的是“服务端渲染”

1.2 优缺点

| 区别         | 单页面应用(SPA)      | 多页面应用(MPA)                  |
| ---------------- | -------------------- | -------------------------------- |
| 组成             | 一个主页面和页面组件 | 多个完整的页面                   |
| 刷新方式         | 局部刷新             | 整页刷新                         |
| SEO 搜索引擎优化 | 无法实现             | 容易实现                         |
| 页面切换         | 速度快，用户体验良好 | 切换加载资源，速度慢，用户体验差 |
| 维护成本         | 相对容易             | 相对复杂                         |

·用户体验好、快，内容的改变不需要重新加载整个页面，服务端压力小。• SPA 应用不利于搜索引擎的抓取。
·首次渲染速度相对较慢（第一次返回空的 html,需要再次请求首屏数据）白屏时间长。

1.3 解决方案
·静态页面预這染(Static Site Generation) SSG，在构建时生成完整的 html 页面。（就是在打包的时候,，
先将页面放到浏览器中运行一下，将 HTML 保存起来），仅适合静态页面网站。变化率不高的网站
· SSR + CSR 的方式，首屏采用服务端渲染的方式，后续交互采用客户端渲染方式。NuxtJs

### vue 为什么需要虚拟 DOM

1.1 基本概念
基本上所有框架都引入了虚拟 DOM 来对真实 DOM 进行抽象，也就是现在大家所熟知的 VNode 和 VDOM
· Virtual DOM 就是用 js 对象来描述真实 DOM，是对真实 DOM 的抽象，由于直接操作 DOM 性能低但是 js 层的操作效率高，可以将 DOM 操作转化成对象操作，最终通过 diff 算法比对差异进行更新 DOM （减少了对真实 DOM 的操作）。
·虚拟 DOM 不依赖真实平台环境从而也可以实现跨平台。
1.2 补充：VDOM 是如何生成的?
·在 vue 中我们常常会为组件编写模板 -template ·这个模板会被编译器编译为渲染函数-render
·在接下来的挂载过程中会调用 render 函数，返回的对象就是虚拟 dom ·会在后续的 patch 过程中进一步转化为真实 dom.
1.3 再次补充：VDOM 如何做 diff 的?·挂载过程结束后，会记录第一次生成的 VDOM -oldVnode
·当响应式数据发生变化时，将会引起组件重新 render，此时就会生成新的 VDOM - newVnode
·使用 oldVnode 与 newVnode 做 diff 操作，将更改的部分应到真实 DOM 上，从而转换为最小量的 dom 操作，高效更新视图

### Vue2 和 Vue3 响应式原理的区别

数据劫持和数据代理: 1.数据代理：data 中的写入的数据都会通过加工再生成一份，组件实例对象 vm.\_data 中存储的就是 data 中的每个属性 get 和 set。然后 name 属性一改 set 就调，set 的原理就是重新再解析模板，模板一解析就生成新的虚拟 dom，然后新旧 dom 进行对比，然后更新页面 响应式原理 2.数据劫持：就是 get 和 set 每个数据身上都有一个 get 和 set 就是为了实现数据的响应式，getter 就是有人读取 data 中的属性就调用 getter，进行数据劫持监视这个属性，set 就是有人修改了\_data 中的数据然后就调用 set

#### 1.vue2 的实现原理

对象类型：通过 Object.defineProperty()对属性的读取，修改进行拦截（数据劫持）。
数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

Object.defineProperty(data, 'count', {
get() {},
set() {}
})
vue2 中初始化的时候没有给数据，后续添加的都是没有 get 和 set 的;
对属性读取能捕获到，对属性修改能捕获到，
但是添加一个属性捕获不到，删除一个已有的数据也捕获不到。
所以，存在两个问题：
a. 新增属性、删除属性，界面不会更新。（$set 或 $delete）
b. 直接通过下标修改属性，界面不会自动更新（$set、或数组变更方法）

监听数组时是重写数组的方法来进行监听的。

#### 2.vue3 的实现原理

Proxy（window 中内置的构造函数）： window.Proxy 直接代理对象
Reflect（window 中内置的构造函数

new Proxy() 需要传递两个参数
const p = new Proxy(person, {}) ---> p: 代理数据/代理对象 person：源数据/源对象
注意：第二个参数必传，即使不传内容，也要用{}空对象进行占位。

Proxy (代理) ：拦截对象中任意属性的变化，包括属性值的读取、修改，属性的添加、删除。

Reflect (反射)：对源对象的属性进行操作。 \*最重要的是通过 Reflect 来修改源数据，这是和 vue2 中数据响应式最大的区别。如果传统的数据劫持编译中出现错误就会直接停止，不会再执行后面的代码，因为 js 是单线程，而 Reflect 就是为了解决这种情况，就算出现了错误也会执行下面的代码。操作源数据
Object.defineProperty() 如果有问题要借助 try {} catch() {}；
Reflect.defineProperty() 直接通过判断即可。

### vue 的生命周期

#### 1.创建阶段

在 beforeCreate 之前：methods 声明；生命周期钩子函数声明。
在创建阶段(created)：data 数据注入，data 数据劫持。给每个声明式变量添加 getter/setter;把劫持过的变量放在组件实例上。

#### 2.挂载阶段

在 beforeMount 之前：寻找 template/el 模版，把找到的 template 试图模版编译成 render()函数。
在挂载阶段(mounted):1.根据 render()渲染函数生成"抽象语法树 AST",再把 AST 第一次创建成"虚拟 DOM 树"；2.根据虚拟 DOM 树创建真实 DOM 树(第一次接触，依赖收集，watcher 发生在此处)，把声明式变量替换成真实数据，DOM 渲染完成。

#### 3.更新阶段

在 beforeUpdate 之前：当被劫持的数据发生变化，进入更新阶段。
在更新阶段(updated):1.当响应式数据发生变化时，调用 render()函数生成新的虚拟 DOM 树。2.使用 diff 算法，patch(oldVode,newVnode),找出两个 Vnode 的差异点，删除旧的 vnode。3.notify 通过 watcher 根据依赖收集在此处更新真实 DOM.

#### 4.销毁阶段

beforeDestory/destoryed:1.拆掉了 watcher。2.拆掉当前组件的子组件。3.拆掉当前组件的事件处理器。

#### 5.父子组件的生命周期。

父 beforeCreat>>父 created>>父 beforeMount>>子 beforeCreate>>子 created>>子 beforeMount>>子 mounted>>父 mounted
子组件更新过程：父 beforeUpdate>>子 beforeUpdate>>子 updated>>父 updated
销毁过程同上

### vue 如何进行依赖收集

.每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher，当属性变化后会通知自己对应的 watcher 去
更新
·默认在初始化时会调用 render 函数，此时会触发属性依赖收集 dep.depend
.当属性发生修改时会触发 watcher 更新 dep.notify()

Vue3 中会通过 Map 结构将属性和 effect 映射起来。
·默认在初始化时会调用 render 函数，此时会触发属性依赖收集 track,
·当属性发生修改时会找到对应的 effect 列表依次执行 trigger

### vue.set 方法是如何实现的

### watch 和 watchEffect 的区别?

watchEffect 立即运行一个函数，然后被动地追踪它的依赖，当这些依赖改变时重新执行该函数
watch 侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数

### 如何将 template 转换成 render 函数?

Vue 中含有模版编译的功能，它的主要作用是将用户编写的 template 编译为 s 中可执行的 render 函数. 1.将 template 模板转换成 ast 语法树-parserHTML 2.对静态语法做静态标记-markup diff 来做优化的静态节点跳过 diff 操作 3.重新生成代码 codeGen

### new vue()做了什么

new Vue 的时候调用会调用\_init 方法
定义 $set、$get 、$delete、$watch 等方法
定义 $on、$off、$emit、$off 等事件
定义 \_update、$forceUpdate、$destroy 生命周期
调用$mount 进行页面的挂载
挂载的时候主要是通过 mountComponent 方法
定义 updateComponent 更新函数
执行 render 生成虚拟 DOM
\_update 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中

### v-if 和 v-for 同时使用的优先级

在 vue2 中 v-for 的优先级高于 v-if，vue3 相反
vue2 中 v-if 和 v-for 同时使用会很消耗性能，一般用计算属性代替原数据

```js
computed:{
  filterArr(){
    return this.arr.filter(item=>item%2)
  }
}
```

### vue 中 diff 算法原理

diff 算法的核心就是比较两个新旧节点的差异，diff 算法是平级比较，不考虑跨级比较的情况下，内部采用深度递归的方式+双指针进行比较。
diff 算法比较流程：

1.先比较是否是相同节点 key tag

2.相同节点比较属性，并复用老节点 （将老的虚拟 dom 复用给新的虚拟节点 DOM)

3.比较儿子节点，考虑老节点和新节点儿子的情况

.老的没儿子，现在有儿子。直接插入新的儿子。 老的有儿子，新的没儿子。直接删除页面节点

.老的儿子是文本，新的儿子是文本，直接更新文本节点即可

.老的儿子是一个列表，新的儿子也是一个列表 updateChildren

4.优化比较：头头、尾尾、头尾、尾头

5.比对查找进行复用

Vue3 中采用最长递增子序列来实现 diff 优化

### key 作用

key 的特殊 arttribute 主要用在 vue 的虚拟 DOM 算法，在新旧的 vnode 节点比较时，如果不使用 key，vue 会使用一种最大限度减少动态元素并且尽量就地修改。

当 vue 使用 v-for 渲染列表时，他默认使用就地更改策略。

作用：
vue 在 patch 过程中通过 key 可以判断两个节点是否是相同节点，尽量不要用索引当 key

### Vue.extend()方法的作用？

概念：
创建一个子类，参数是包含子件选项的对象；

```js
// 创建一个组件构造器
const MyComponent = Vue.extend({
  // 组件的选项
  data() {
    return {
      message: 'Hello!'
    };
  },
  template: '<div>{{ message }}</div>',
  methods: {
    greet() {
      alert(this.message);
    }
  }
});

// 使用组件构造器创建一个实例
const myComponentInstance = new MyComponent();

// 挂载实例到某个元素上
myComponentInstance.$mount('#app');

```

所有组件创建时都会调用 Vue.extend()进行创建。
此方法可以手动挂载组件。
后端储存的字符串模版可以通过此方法进行渲染，但是需要引入编译时。

### Vue.use 是干什么的？

在 Vue.js 中，Vue.use() 是用来安装 Vue.js 插件的方法。Vue.js 插件通常是一个包含 install 方法的 JavaScript 对象，该方法用于在 Vue 实例中添加全局功能或第三方库。 1.安装插件：调用插件对象的 install 方法，并将 Vue 构造函数作为参数传入。这样，插件就可以在 Vue 实例中注册全局组件、指令、混入等功能。 2.避免重复安装：Vue.js 会阻止插件多次安装同一个插件，因此即使在多个地方多次调用 Vue.use() 也只会安装一次。

### vue 中的 data 为什么必须是个函数？

确保每个组件实例都拥有独立的数据对象，从而避免不同组件实例之间共享同一个数据对象所导致的数据混乱和难以追踪的问题。防止数据污染。
当 data 选项被定义为一个函数时，每次创建组件实例时，Vue.js 都会调用该函数来返回一个全新的数据对象，这样每个组件实例都拥有自己独立的数据对象，相互之间不会产生影响。这种方式保证了组件的数据在组件实例之间的隔离性，使得组件可以更加可靠地进行状态管理。

如果 data 选项直接是一个对象而不是一个函数，那么这个对象将会被所有组件实例共享，当一个组件实例修改了其中的数据时，其他组件实例也会受到影响，导致不可预料的结果。这种共享数据对象的方式不利于组件之间的独立性和可维护性，容易造成代码逻辑混乱和难以调试。

### vue 中的过滤器？及其应用场景

允许你在模板中使用管道符（|）来应用过滤器，并对要显示的数据进行处理，从而改变它的展示形式。过滤器可以用于处理文本、日期、数字等各种类型的数据。

```js
<div id="app">
  <!-- 使用内置的 uppercase 过滤器将文本转换为大写 -->
  <p>{{ message | uppercase }}</p>
  <!-- 使用自定义的 currency 过滤器格式化金额 -->
  <p>{{ amount | currency }}</p>
</div>

# Vue.filter('filterA',function(value){
#   //返回处理后的值
# })
# Vue.filter('filterB',function(value){
#   //返回处理后的值
# })
// 定义 Vue 实例
new Vue({
  el: '#app',
  data: {
    message: 'hello, vue!',
    amount: 1000
  },
  filters: {
    // 自定义过滤器：将金额转换为货币格式
    currency(value) {
      return '$' + value.toFixed(2);
    }
  }
});
```

在 Vue.js 3 中，虽然过滤器的概念仍然存在，但是其用法已经有了较大的变化。Vue.js 3 推荐的更现代的方式是使用函数或计算属性来代替过滤器。这是因为 Vue.js 3 引入了 Composition API（组合式 API），使得组件内部的逻辑更加灵活和可复用，而过滤器的功能可以通过组合式 API 更好地实现。

```js
<template>
  <div>
    <p>{{ uppercaseMessage }}</p>
    <p>{{ formattedAmount }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const message = ref('hello, vue!');
    const amount = ref(1000);

    // 使用计算属性来转换文本为大写
    const uppercaseMessage = computed(() => message.value.toUpperCase());

    // 使用计算属性来格式化金额为货币形式
    const formattedAmount = computed(() => '$' + amount.value.toFixed(2));

    return {
      uppercaseMessage,
      formattedAmount
    };
  }
};
</script>
```

### v-once 使用场景

用于执行一次性地将元素和组件的内容渲染一次，并且不再对其进行响应式更新。这意味着，一旦数据发生变化，使用了 v-once 的元素或组件的内容将不再更新。
v-once 主要用于那些不需要响应式更新的静态内容，以提高性能并避免不必要的重新渲染。例如，在展示一些静态数据，或者某些只需要初始化一次的内容时，可以考虑使用 v-once。

在 vue3.2 之后又加了 v-memo 指令,只有限定的值发生改变才会更新

```js
<div v-memo="[valueA,B]">
<..>...
</div>
```

```js
111
```

### Vue.mixin 的使用场景及原理

mixin（混入），提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
本质其实就是一个 js 对象，它可以包含我们组件中任意功能选项，如 data、components、methods、created、computed 等等
我们只要将共用的功能以对象的方式传入 mixins 选项中，当组件使用 mixins 对象时所有 mixins 对象的选项都将被混入该组件本身的选项中来

1.局部混入

```js
# 定义一个mixin对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

# 组件通过mixins属性调用mixin对象
Vue.component('componentA',{
  mixins: [myMixin]
})
# 该组件在使用的时候，混合了mixin里面的方法，在自动执行created生命钩子，执行hello方法
```

2.全局混入

```js
# 通过Vue.mixin()进行全局的混入

Vue.mixin({
  created: function () {
      console.log("全局混入")
    }
})
# 使用全局混入需要特别注意，因为它会影响到每一个组件实例（包括第三方组件）
# PS：全局混入常用于插件的编写
```

注意：
当组件存在与 mixin 对象相同的选项的时候，进行递归合并的时候组件的选项会覆盖 mixin 的选项
但是如果相同选项为生命周期钩子的时候，会合并成一个数组，先执行 mixin 的钩子，再执行组件的钩子

（1）使用场景：
在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立
这时，可以通过 Vue 的 mixin 功能将相同或者相似的代码提出来

（2）源码分析：
优先递归处理 mixins
先遍历合并 parent 中的 key，调用 mergeField 方法进行合并，然后保存在变量 options
再遍历 child，合并补上 parent 中没有的 key，调用 mergeField 方法进行合并，保存在变量 options
通过 mergeField 函数进行了合并

合并策略：替换型，合并型，队列型，叠加型 1.替换型合并有 props、methods、inject、computed，同名的 props、methods、inject、computed 会被后来者代替。 2.合并型合并有：data。当目标 data 对象不包含当前属性时，调用 set 方法进行合并（set 方法其实就是一些合并重新赋值的方法）当目标 data 对象包含当前属性并且当前值为纯对象时，递归合并当前对象值，这样做是为了防止对象存在新增属性 3.队列型合并有：全部 生命周期 和 watch 被合并为一个数组，然后正序遍历一次执行。先执行 mixin 的钩子，再执行组件的钩子 4.叠加型有 component、directives、filters，通过原型链进行层层的叠加
