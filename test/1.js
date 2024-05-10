let a = [1, 2, 3, 73, 23, 5, 3]
let b = a.filter((current, index, array) => {
    return index == current
})

a.forEach(element => {
    // console.log(element);
});

let b2 = a.reduce((a, b, c) => {
    return a + b
})
// console.log(b2);

let b3 = [...new Set(a)]
let b4 = Array.from(new Set(a))
// console.log(b4);

// const func = () => {
//     console.log(111);
// }

function func() {
    console.log(222);
}
//防抖封装
// function antiShake(fun, wait) {
//     let timeout = null
//     return function () {
//         clearTimeout(timeout)
//         timeout = setTimeout(fun, wait)
//     }
// }

function antiShake(fn,wait) {
    let timeOut = null
    return args =>{
        if(timeOut) clearTimeout(timeOut)
        timeOut = setTimeout(fn,wait);
    }
}

// let ceshi = antiShake(func, 2000)

// setTimeout(() => {
//     ceshi()
// }, 1000)
// setTimeout(() => {
//     ceshi()
// }, 2000)
// setTimeout(() => {
//     ceshi()
// }, 3000)

//节流
function test2(fun,time) {
    let timeout = null;
    return function () {
        if(!timeout){
            timeout = setTimeout(() => {
                fun()
                timeout = null
            }, time);
        }
    }
}

// let ceshi2 = test2(func,1000)
// setTimeout(() => {
//     ceshi2()
// }, 500)
// setTimeout(() => {
//     ceshi2()
// }, 1000)
// setTimeout(() => {
//     ceshi2()
// }, 1500)
// setTimeout(() => {
//     ceshi2()
// }, 2000)

// //函数柯里化
// function add() {
//     let args = [...arguments];
//     let inner = function () {
//         args = [...args, ...arguments];
//         return inner;
//     }
//     inner.toString = function () {
//         return args.reduce((a,b)=>a+b)
//     }
//     return inner;
// }

// console.log(parseInt(add(1)(3)(5)));

const memoize = (func, content) => {
    //在当前函数作用域定义一个空对象，用于缓存函数的运行结果
    let cache = Object.create(null);
    content = content || null;
    //运用柯里化返回一个函数
    return (...args) => {
        console.log('concent', content);
        console.log("cache",cache);
        if (!cache[args]) {
            console.log('调用了:' , args);
            //call()和apply()：这两个方法允许你在指定的上下文中调用函数，并传递参数。
            //它们的区别在于传递参数的方式不同。call()方法使用逗号分隔的参数列表，而apply()方法使用一个数组作为参数。
            cache[args] = func.call(content, ...args);
            // cache[args] = func.apply(content, args);
        }
        return cache[args];
    }
}
// const add = (a, b) => a + b
// const memoizeAdd = memoize(add);
// console.log(memoizeAdd(1,3));
// console.log(memoizeAdd(1,3));
// console.log(memoizeAdd(3,3));
// console.log(memoizeAdd(1,3));

function name(...args) {
    console.log(typeof args);
}


name(1,23);

let num = 0;
console.log(num++,'erer');
console.log(++num);
console.log(num);

console.log('------------');
for (var i = 0; i <3; i++) {
    setTimeout(() => {
       console.log(i);
    }, 0);
}

for (let i = 0; i <3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0);
}

console.log('ssssssssssssssssss')
// 假设这是你的 JSON 对象数组
let jsonArray = [
    { name: 'aaa', age: 20 },
    { name: 'bbb', age: 25 },
    { name: 'ccc', age: 30 },
    { name: 'ddd', age: 35 }
];

// 使用 filter() 方法删除满足条件的对象
jsonArray = jsonArray.filter(item => item.age !== 20);

// 输出删除后的数组
console.log(jsonArray);



//





