// let a = [1, 2, 3, 73, 23, 5, 3]
// let b = a.filter((current, index, array) => {
//     return index == current
// })

// console.log(a,b);

// let b2 = a.reduce((a, b, c) => {
//     return a + b
// })

// console.log(a,b2);

s = "abcabcbb"
// 输出: 3 
var maxString = (str) => {
    let resStr = '';
    let right = 0;
    let maxNum = 0;
    for (let i = 0; i < str.length; i++) {
        let a = resStr.indexOf(str[i]);
        if (a != -1) {
            resStr = resStr.slice(a + 1, i)
        };
        resStr += str[i];
        maxNum = Math.max(maxNum, resStr.length)
    }
    return maxNum;
}
// console.log(maxString(s));
// let nums = [0,1,0,3,12];
// var moveZeroes = function (nums) {
//     let len = nums.length;
//     for (let i = 0; i < len; i++) {
//         if (nums[i] == 0) {
//             nums.splice(i, 1);
//             nums.unshift(0)
//             i++;
//         }
//     }
//     return nums
// };
// console.log(moveZeroes(nums));


// Promise.allSettled()

let f1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('f11111')
    }, 2000)
})
let f2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('f22222')
    }, 1000)
})
let f3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('err-f33333')
    }, 3000)
})
    .catch(err => err)
let a = [f1, f2, f3]
// promise.all中的异步请求是并发执行的，但是最终的返回结果是按照最初的顺序执行排列好的
//  Promise.race(a).then(data=> { 
//     console.log(data)
//  }).catch(err=> {
//     console.log('糟糕出错了')
//  })
//执行结果：糟糕出错了


let intervals = [[8, 10], [1, 8], [15, 18]];
const mergeArr = (intervals) => {
    let resArr = [];
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    let curArr = intervals[0]
    for (let i = 0; i < intervals.length; i++) {
        let lsArr = intervals[i];
        if (lsArr[0] <= curArr[1]) {
            curArr[1] = Math.max(curArr[1], lsArr[1]);
        } else {
            resArr.push(curArr);
            curArr = lsArr;
        }
    }
    resArr.push(curArr)
    return resArr;
}

// console.log(mergeArr(intervals));





// for...in遍历的是对象的属性名，而for...of遍历的是可迭代对象的元素值。
// for...in会遍历对象自身以及原型链上的属性，而for...of只遍历对象自身的元素。
// for...in适用于普通对象，而for...of适用于可迭代对象，如数组、字符串、Map、Set等。

let stra = '12-34-12-45-67-334-21'
let strb = '12-34-12-43-69-334-21'

function* genFunc(str) {
    let res = ''
    for (let s of str) {
        if (s === '-') {
            yield Number(res);
            res = ''
        } else {
            res += s;
        }
    }
    if (res) {
        yield Number(res);
    }
}

function compare(stra, strb) {
    let sa = genFunc(stra);
    let sb = genFunc(strb);
    while (1) {
        let s1 = sa.next();
        let s2 = sb.next();
        if (s1.done && s2.done) {
            return 0;
        }
        if (s1.done) {
            return -1;
        }
        if (s2.done) {
            return 1;
        }
        if (s1.value > s2.value) {
            return 1;
        }
        if (s1.value < s2.value) {
            return -1;
        }
    }
}

// console.log(compare(stra, strb));
let arr = [7, 1, 5, 3, 6, 4];
function shop(arr) {
    let res = 0;
    let minNum = arr[0]
    for (let i = 0; i < arr.length; i++) {
        minNum = Math.min(minNum, arr[i]);
        res = Math.max(arr[i] - minNum, res)
    }
    return res;
}
// console.log(shop(arr));

function shop2(arr) {
    let res = 0;
    let curMinNum = arr[0]
    let curMaxNum = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (curMaxNum <= arr[i]) {
            curMaxNum = arr[i];
        } else {
            res += (curMaxNum - curMinNum);
            curMaxNum = arr[i];
            curMinNum = arr[i]
        }
    }
    res += (curMaxNum - curMinNum);
    return res;
}
// console.log(shop2(arr));

var partitionLabels = function (s) {
    let resArr = [];
    let last = {};
    for (let i = 0; i < s.length; i++) {
        last[s[i]] = i;
    }
    let j = 0, maxNum = 0;
    for (let i = 0; i < s.length; i++) {
        maxNum = Math.max(maxNum, last[s[i]]);
        if (i === maxNum) {
            resArr.push(i - j + 1);
            j = i + 1;
        }
    }
    return resArr;
};

// console.log(partitionLabels('ababcbacadefegdehijhklij'));


var maxProduct = function (nums) {
    let resNum = nums[0];
    let minNum = nums[0],maxNum = nums[0];
    for (let i = 1; i < nums.length; i++) {
       if(nums[i] < 0){
        [minNum,maxNum] = [maxNum,minNum]
       }
       minNum = Math.min(nums[i],minNum * nums[i]);
       maxNum = Math.max(nums[i],maxNum * nums[i]);
       resNum=Math.max(resNum,maxNum);
    }
    return resNum;
}; 
// console.log(maxProduct([2, 0,3,0, -2,0, 4,-7]));















