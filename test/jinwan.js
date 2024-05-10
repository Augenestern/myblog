// let arr = [12,23,45,32,12,55,{},{}]
// //Set结构不会添加重复的值
// //Set实例转数组
// let item = [...new Set(arr)]  //ES6写法
// // Array.from(new Set(arr))
// console.log(item);

let a = [2, 3, 4, 4, 2, 2, null, null, {3:3}, {3:4}]
// let b = []
// a.forEach((item ,index)=>{
//     if(!b.includes(a[index])){
//         b.push(item)}
// })
// console.log(b);

// let xx = a.filter((item,index)=>{
//     return a.indexOf(item,0) === index
// })
// console.log(xx);

// function quchong(arr) {
//     let obj = {}
//     return arr.filter(function (item) {
//        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
//     })
// }
// let b = quchong(a)
// console.log(b);

// let arr = [1,2,3,4]
// console.log(Array.prototype);
let arr = []
console.log(Array.__proto__);