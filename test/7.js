/**
 * 杨辉三角
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    let res = [];
    for (let i = 0; i < numRows; i++) {
        let lsArr = [];
        for (let j = 0; j <= i; j++) {
            if (j == 0 || j == i) {
                lsArr.push(1)
            } else {
                lsArr.push(res[i - 1][j] + res[i - 1][j - 1])
            }
        }
        res.push(lsArr)
    }
    return res
};


/**
 * 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    let arr = [], track = [];
    const backtrack = (value, index) => {
        if (value == target) {
            arr.push([...track]);
            return
        }
        for (let i = index; i < candidates.length; i++) {
            track.push(candidates[i])
            // console.log(track);
            value += candidates[i]
            console.log(value);
            if (value <= target) {
                backtrack(value, i)
            }
            track.pop();
            value -= candidates[i]
        }
    }
    backtrack(0, 0)
    return arr
};
//优化
var combinationSum = function (candidates, target) {
    let arr = [], track = [];
    candidates.sort((a,b)=>a-b); // 排序
    const backtrack = (value, index) => {
        if (value == target) {
            arr.push([...track]);
            return
        }
        for (let i = index; i < candidates.length; i++) {
            if(candidates[i]>target-value){break;}
            track.push(candidates[i])
            value += candidates[i]
            console.log(value);
            backtrack(value, i)
            track.pop();
            value -= candidates[i]
        }
    }
    backtrack(0, 0)
    return arr
};
// console.log(combinationSum([2,3,6,7],7));