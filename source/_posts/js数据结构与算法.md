---
title: js数据结构与算法
top: ture #文章置顶
---

js基本数据类型,js中的Object

<!-- more -->

## 基本数据类型

### Array 的方法

```bash
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

```bash
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

```bash
Array.from()  //把类似数组结构的数据转换成数组
```

```bash
let arr = [10,11,12,13]
console.log(arr.indexOf(15))  //判断是否包含15，不包含返回-1，包含返回0
console.log(arr.includes(15))  //判断是否包含15，不包含返回false，包含返回true

let res = arr.find(item=>item>10)  //返回数组中第一个符合条件的值
let res = arr.findIndex(item=>item>10)  //返回数组中第一个符合条件的值的索引值
let res = arr.findLast(item=>item>10)  //返回数组中最后一个符合条件的值
let res = arr.findLastIndex(item=>item>10)  //返回数组中最后一个符合条件的值的索引值
```

### 栈数据结构


```bash

```

```bash

```

```bash

```

## 详解 JS 中的 Object 

### 1.Object 构造函数的属性

在 Object 中声明的属性只有两个：
Object.length —— 值为 1
Object.prototype —— 指向 Object 函数的原型对象

### 2.静态方法

#### Object.assign()

作用：将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
简单来说，该方法可以接收多个参数，其中第一个参数作为目标对象，剩下的都是源对象。该方法将所有源对象的可枚举属性复制（浅复制）到目标对象中，结果返回目标对象。该方法会直接改变目标对象。

```bash
const target = {name:"test",sex:1};
const source = {address:"sz",gender:"male"}
Object.assign(target,source);
console.log(target);//{name: "test", sex: 1, address: "sz", gender: "male"}

如果使用 ES6 的语法来实现这种需求就很简洁了：

let target = {name:"test",sex:1};
let source = {address:"sz",gender:"male"}
target = {...target,...source}
```

...是 ES6 的展开运算符，展开运算符的写法与 obj2 = obj1 直接赋值的写法的区别在于如果直接赋值的话，对于引用类型来说，相当于只是赋值了 obj1 的内存空间地址，当 obj2 发生改变的时候，obj1 也会随着发生改变。而是用展开运算符写法的话，由于 obj1 对象中的属性类型都是基本类型，相当于重新创建了一个对象，此时 obj2 发生改变的时候，并不会影响 obj1 这个对象。但是仅限于其属性都为基本类型的情况（或者说只进行了一层的深拷贝）。

```bash
let obj1 = {
 value1: 1,
 value2: 2
};
let obj2 = {...obj1
};
```

[ES5 和 ES6 区别](https://www.jb51.net/javascript/285980s5x.html)

#### Object.create(proto,propertiesObject)

该方法用于创建新对象。第一个参数用于指定新建对象的原型对象；第二个参数是对象的属性描述对象。方法返回新建的对象。

```bash
function Person() {}
Person.prototype.hello = function (){
    console.log("hello")
}
let person = Object.create(Person.prototype,{
    name:{
        value:"test",
        writable:true,
        configurable:true,
    },
    age:{
        value:1,
        writable:true,
        configurable:true,
    }
})
console.log(person)//Person {name: "test", age: 1}
person.hello()//hello
```

#### Object.defineProperty(obj,prop,desc)

在对象 obj 上定义新的属性，或者修改对象 obj 中的属性，结果返回对象 obj。第一个参数 obj 是目标对象，第二个参数 prop 是属性键名，第三个参数是这个属性的描述符。

```bash
let person = {}
Object.defineProperty(person,"name",{
    value : "test",
    //value —— 该属性的值，默认值为 undefined
    writable : true,
    //writable —— 布尔值，默认值为 false，表示是否能重写。
    enumerable : true,
    //enumerable —— 布尔值，默认值为 false。表示是否能枚举
    configurable : true
    //configurable —— 布尔值，默认值为 false 。若值为 true，则表示这个属性描述符可以被改变，同时该属性也能从对象上删除。

    //get:function —— 默认值为 undefined，当访问该属性时，该方法会被执行。
    //set:function —— 默认值为 undefined，当属性修改时，触发执行改方法，该方法接收一个参数，就是该属性新的值。
})
console.log(person)//{name: "test"}
```

#### Object.entries(obj)

该方法返回对象 obj 自身的可枚举属性的键值对数组。结果是一个二维数组，数组中的元素是一个由两个元素 key ，value 组成的数组。

```bash
let person = {name:"test",sex:1}
let arr = Object.entries(person)
console.log(arr)//[["name", "test"],["sex", 1]]
```

该方法的使用场景是：将普通的对象转换为 Map：

```bash
let person = {name:"test",sex:1}
let map = new Map(Object.entries(person))
console.log(map)//Map(2) {"name" => "test", "sex" => 1}
```

#### Object.freeze(obj)

该方法用于冻结对象，一个被冻结的对象不能被修改，不能添加新的属性，不能修改属性的描述符，该对象的原型对象也不能修改。返回值为被冻结的对象。

```bash
let person = {name:"test",sex:1}
Object.freeze(person)
person.address = "sz"
person.sex= 2
console.log(person)//{name: "test", sex: 1}
```

#### Object.getPrototypeOf(obj)

该方法返回指定对象的原型对象。

```bash
function Person() {}
Person.prototype.hello = function () {
    console.log("hello")
}
let person = new Person()
let proto = Object.getPrototypeOf(person)
proto.hello()//hello
```
#### Object.is(obj1,obj2)
该方法用于比较两个对象是否相同，返回布尔值。
#### Object.getOwnPropertyDescriptor(obj,prop)

该方法用于返回指定对象上自有属性对应的属性描述符。

#### Object.getOwnPropertySymbols(obj)

该方法返回一个指定对象自身所有的 Symbol 键名的属性的数组。

[参考](https://blog.csdn.net/local_752/article/details/125640843)
```bash

```

```bash

```

```bash

```
