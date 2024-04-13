
/**
 *  搜索二维矩阵
 * @param {*} matrix 矩阵
 * @param {*} target 目标值
 * @returns {string[]}
 */
var searchMatrix = function (matrix, target) {
    let xx = false;
    let left = 0, right = matrix.length - 1; ans = matrix.length - 1;
    while (left <= right) {
        let mid = ((right - left) >> 1) + left
        if (matrix[mid][0] >= target) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    function searchNumber(num) {
        let nums = matrix[num]
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            let mid = ((right - left) >> 1) + left
            if (nums[mid] > target) {
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                return true;
            }
        }
        return false;
    }
    if (matrix[ans][0] > target && ans !== 0) {
        xx = searchNumber(ans - 1)
    } else {
        xx = searchNumber(ans)
    }
    return xx;
};

// console.log(searchMatrix([[1]], 0));

/**
 * 回溯法电话号码组合
 * @param {string} digits 数字字符串
 * @returns 
 */
var letterCombinations = function (digits) {
    const map = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let res = []
    const backtrack = (track,index) => {
        let str = map[+digits[index]]?map[+digits[index]]:[];
        for (let i = 0; i < str.length; i++) {
            track.push(str[i])
            backtrack(track,index+1)
            if(track.length==digits.length){
                res.push(track.join(''))
            }
            track.pop()
        }
    }
    backtrack([],0)
    return res;
};
// console.log(letterCombinations("2"));

/**
 * 买卖股票
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let res = 0;
    for (let i = 0; i < prices.length; i++) {
        for (let j = i+1; j < prices.length; j++) {
            res = Math.max(res,prices[j]-prices[i])
        }
    }
    return res
};
// console.log(maxProfit([7,1,10,3,6,9]));

var maxProfit = function(prices) {
    let res = 0;
    let min = prices[0];
    for (let i = 0; i < prices.length; i++) {
        min = Math.min(min,prices[i])
        res = Math.max(res,prices[i]-min)
    }
    return res
};
// console.log(maxProfit([7,1,10,3,6,9]));


/**
 *  跳跃游戏
 * @param {number[]} nums
 * @return {boolean}
 */
//超出时间限制
var canJumpXX = function(nums) {
    let res = false;
    const test = (index)=>{
        if(index==nums.length-1){
            res = true
        }
        for (let i = index+1; i < index+1+nums[index]; i++) {
            test(i);
        }
    }
    test(0)
    return res
};
// console.log(canJumpXX([3,3,1,0,4]));

//记录最远可以走到哪
var canJump = function(nums) {
    let maxDir = nums[0];
    for (let i = 0; i < nums.length; i++) {
        if(i<=maxDir){
            maxDir = Math.max(maxDir,nums[i]+i)
        }else{
            return false
        }
    }
    return true
};
// console.log(canJump([3,2,1,0,4]));

/**
 * 跳跃次数
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let end = 0,maxposition = 0;;
    let step = 0;
    for (let i = 0; i < nums.length-1; i++) {
        maxposition = Math.max(maxposition,nums[i]+i)
        if(i==end){
            end = maxposition;
            step++;
        }
    }
    return step
};
// console.log(jump([2,4,1,1,4,1]));











