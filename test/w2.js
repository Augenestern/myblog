// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
//   }

//   async function async2() {
//     console.log("async2");
//   }

//   console.log("script start");

//   setTimeout(function () {
//     console.log("setTimeout");
//   }, 0);

//   async1();

//   new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
//     console.log(2222222);
//   }).then(function () {
//     console.log("promise2");
//   });

//   console.log("script end")

//默认绑定：如果函数没有使用任何上下文对象进行调用，即独立函数调用，this 默认绑定到全局对象（在浏览器环境下是 window 对象，Node.js 环境下是 global 对象）。在严格模式下，this 将绑定为 undefined。
this.name = 'liniong'
// window.name = '22'
console.log(this); // 在全局作用域中打印 this，指向全局对象
//案例一
function myFunction() {
    console.log(this)
}
myFunction(); // 指向全局对象
//案例二
function foo1() {
    console.log(this)
}
function foo2() {
    console.log(this)
    foo1()
}
function foo3() {
    console.log(this)
    foo2()
}
foo3() //打印3次全局对象
// 案例三
let obj = {
    name: 'why',
    foo: function () {
        console.log(this)
    }
}

let bar = obj.foo
bar() // 全局对象
//案例四
function foo() {
    console.log(this, 'foo')
}
let obj2 = {
    name: 'why',
    foo: foo
}

let bar2 = obj2.foo
bar2() // 全局对象
obj2.foo()
//案例五
function foo() {
    function bar() {
        console.log(this)
    }
    return bar
}
let fn = foo()
fn() //全局对象

//补充

//定时器
setTimeout(function () {
    console.log(this) //游览器环境下window，
}, 1000)
//node环境下是
//`setTimeout`函数的回调函数中的 `this` 默认是指向一个空对象的，
//而不是指向全局对象`global`，
//这个空对象称为“定时器对象”（Timer object）。

//监听点击
//   const boxDiv = document.querySelector('.box')
//   boxDiv.onclick = function () {
//     console.log(this)
//   }
//   boxDiv.addEventListener('click', function () {
//     console.log(this)
//   })
//当事件被触发时，`this`都会指向触发事件的元素，也就是`.box`元素。

// 3.数组.forEach/map/filter/find
let names = ['zhaimou', 'zhaione', 'zhaitwo']
names.forEach(function (item) {
    console.log(item, this)
}, 'abc')
names.map(function (item) {
    console.log(item, this)
}, 'cba')
//zhaimou [String: 'abc']
//zhaione [String: 'abc']
//zhaitwo [String: 'abc']
//zhaimou [String: 'cba']
//zhaione [String: 'cba']
//zhaitwo [String: 'cba']


//   隐式绑定：当函数作为对象的方法调用时，通过隐式绑定，this 绑定到调用该方法的对象。
// 案例一
function foo() {
    console.log(this)
}
const obj = {
    name: 'why',
    foo: foo
}
obj.foo() // obj对象
// 案例二:
const obj = {
    name: 'why',
    eating: function () {
        console.log(this.name + '在吃东西')
    },
    running: function () {
        console.log(obj.name + '在跑步')
    }
}
obj.eating() //why在吃东西
obj.running() //why在跑步
// 案例三:
const obj1 = {
    name: 'obj1',
    foo: function () {
        console.log(this)
    }
}
let obj2 = {
    name: 'obj2',
    bar: obj1.foo
}
obj2.bar() //{ name: 'obj2', bar: [Function: foo]}
// 案例4
function fn() {
    console.log(this)
}
const obj = {
    foo: fn
}
const cloneObj = {
    foo1: obj
}
cloneObj.foo1.foo() // obj 
