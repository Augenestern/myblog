console.log('====================');
function foo() {
    function bar() {
        var inner = 234;
        outer = 0;
        console.log(inner);
    }
    var outer = 123;
    bar();
    console.log(outer)
    console.log(glob)
}
var glob = 100;
foo()
console.log('======================');
// 234 0 100 

// function User() {}
// User.prototype.sayHello = function() {}
// var u1 = new User();
// var u2 = new User();
// console.log(u1.sayHello === u2.sayHello);  //true
// console.log(User.prototype.constructor);   //[Function: User]
// console.log(User.prototype === Function.prototype); //false
// console.log(User.__proto__ === Function.prototype); //true
// console.log(User.__proto__ === Function.__proto__); //true
// console.log(u1.__proto__ === u2.__proto__); //true
// console.log(u1.__proto__ === User.__proto__); //false
// console.log(Function.__proto__ === Object.__proto__); //true
// console.log(Function.prototype.__proto__ === Object.prototype.__proto__); //false
// console.log(Function.prototype.__proto__ === Object.prototype); //true



function myNew(fn, ...args) {
    let obj = Object.create(null); // 1.创建一个空对象
    obj.__proto__ = fn.prototype; // 2.使空对象的隐式原型指向构造函数的显式原型
    //   let obj = Object.create(fn.prototype); //1,2结合
    let res = fn.apply(obj, args); // 3.把函数中的this指向该对象并执行构造函数中的语句
    return (typeof res === "object" && res !== null) || typeof res === "function"
        ? res
        : obj; // 4.判断返回值类型,返回该对象实例
}

function Person(name, age, score) {
    this.name = name;
    this.age = age;
    this.score = score;
    return { name: this.name };
}

let rest = myNew(Person, "dmc", 21, 100);
console.log(rest);









