---
title: vue3异步组件
---

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 defineAsyncComponent 方法来实现此功能
异步组价打包时会分包

<!-- more -->

## 场景一，按需引入

下载包

```bash
npm install @vueuse/core -S
```

向下滑出现这个 C 组件才会加载 C 组件

```bash
<template>
    <div class="home">
        <A></A>
        <B></B>
        <div ref="target">
            <C v-if="targetIsVisible"></C>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import A from './A.vue'
import B from './B.vue'

const C = defineAsyncComponent(() =>
    import('./C.vue')
)

const target = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(
    target,
    ([{ isIntersecting }]: any) => {
        if (isIntersecting) {
            targetIsVisible.value = isIntersecting
            console.log(isIntersecting);
        }
    },
)
</script>

```

## 场景二 异步依赖，搭配 Suspense 使用

```bash
<Suspense>
    <template #default>
        <A></A>
    </template>
    <template #fallback>
        加载中...
    </template>
</Suspense>

const A = defineAsyncComponent(() =>
    import('./A.vue')
)
```

一般是这种用法：

```bash
<div ref="target">
    <Suspense v-if="targetIsVisible">
        <template #default>
            <C></C>
        </template>
        <template #fallback>
            加载中...
        </template>
    </Suspense>
</div>

import { useIntersectionObserver } from '@vueuse/core'
const C = defineAsyncComponent(() =>
    import('./C.vue')
)
const target = ref(null)
const targetIsVisible = ref(false)
useIntersectionObserver(
    target,
    ([{ isIntersecting }]: any) => {
        if (isIntersecting) {
            targetIsVisible.value = isIntersecting
            console.log(isIntersecting);
        }
    },
)
```
#### _[官方文档](https://cn.vuejs.org/guide/components/async.html)_

