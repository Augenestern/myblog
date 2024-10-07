function foo() {
    console.log(this)
}
let obj2 = {
    name: 'why',
    foo: foo
}

let bar2 = obj2.foo
bar2() // 全局对象
obj2.foo()
console.log(global);
