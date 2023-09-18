---
title: js数据结构与算法
top: ture #文章置顶
---
js练习
<!-- more -->
## 基本数据类型 

### Array的方法
``` bash
arr.push() //数组末尾追加
arr.pop()  //数组末尾删除一个，返回删除值
arr.shift()
arr.unshift()
arr.splice(0,2) //删除数组前两个
arr.slice(0,2) //选择数组前两个
arr.splice(0,2,5) //数组前两个换成一个5
arr.sort((x,y)=>x-y)  //正序
arr.sort((x,y)=>y-x)  //倒序
arr.sort((x,y)=>y.age-x.age) 

let arr1 = [1,2,3]
let arr2 = [4,5,6]
arr1.concat(arr2)  //数组追加
arr1.concat(arr2,7,8,9)

//使用slice()方法返回一个子数组，在进行reverse； 不会改变原数组
time1 = time.slice().reverse()  //time1数组反转  time数组不变
```

``` bash
let arr = [10,11,12,13]
let res1 = arr.every(item=>item>10)   //判断数组中每一个元素是否都大于10，返回true或false
let res2 = arr.some(item=>item>10)    //判断数组中是否有一个元素大于10，返回true或false
let res3 = arr.filter(item=>item>11)  //把符合条件的过滤出来
let res4 = arr.map(item=>item+"aaa")  //数组每一项都加“aaa”
let res5 = arr.forEach((item,index)=>{
    console.log(item,index)
}) 
let res6 = arr.reduce((item1,item2)=>item1+item2)  //item1是上一次的，item是这一次的。这个实现的是数组累加
```
``` bash
Array.from()  //把类似数组结构的数据转换成数组
```
``` bash
let arr = [10,11,12,13]
console.log(arr.indexOf(15))  //判断是否包含15，不包含返回-1，包含返回0
console.log(arr.includes(15))  //判断是否包含15，不包含返回false，包含返回true

let res = arr.find(item=>item>10)  //返回数组中第一个符合条件的值
let res = arr.findIndex(item=>item>10)  //返回数组中第一个符合条件的值的索引值
let res = arr.findLast(item=>item>10)  //返回数组中最后一个符合条件的值
let res = arr.findLastIndex(item=>item>10)  //返回数组中最后一个符合条件的值的索引值
```
### 栈数据结构
``` bash
```
``` bash
```
``` bash
```
``` bash
```