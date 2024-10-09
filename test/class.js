var name = 'window';
var newThis = { name: 'lining' };
function showName(info1, info2) {
    console.log(this.name, info1, info2);
}
showName('a', 'b'); //输出：window a b

// 通过bind改变this指向
var newShowName = showName.bind(newThis, 'hello','1','2');
console.log('----------------------');

newShowName('a','world'); //输出：newThis hello world

console.log(new newShowName().constructor); //输出：showName函数体
