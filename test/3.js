
// Array

// let a = [1,2,3]
// let b = [4,5,6]
// // a.unshift(b)
// // console.log(a);

// Array.prototype.myUnshift = function (){
//     let len = arguments.length
//     for (let i = len-1; i >=0; i--) {
//         this.splice(0,0,arguments[i])
//     }
//     return this.length;
// }
// // a.myUnshift(5,6,7)
// // console.log(a);
// console.log(a.unshift(7,8,9));
// console.log(a);

// let a = [2,3,4,4,2,2,null,null]
// let b = []
// a.forEach((item ,index)=>{
//     if(!b.includes(a[index])){
//         b.push(item)
//     }
// })
// // console.log(b);
// // indexOf(要搜索的,开始搜索的索引)
// let xx = a.filter((item,index)=>{
//     return a.indexOf(item,0) === index
// })

// console.log(xx);

setTimeout(() => {
    console.log(1);
}, 0);
console.log(2);