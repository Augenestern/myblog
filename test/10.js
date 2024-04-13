/**
 * 二叉搜索树中第K小的元素
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    let arr = [];
    let track = [];
    while (track.length != 0 || root) {
        while (root) {
            track.push(root)
            root = root.left;
        }
        root = track.pop();
        arr.push(root.val)
        root = root.right;
    }
    function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function partition(arr, left, right) {
        const pivot = arr[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, i, right);
        return i;
    }

    function quickSelect(arr, left, right, k) {
        if (left === right) {
            return arr[left];
        }

        const pivotIndex = partition(arr, left, right);

        if (k === pivotIndex) {
            return arr[k];
        } else if (k < pivotIndex) {
            return quickSelect(arr, left, pivotIndex - 1, k);
        } else {
            return quickSelect(arr, pivotIndex + 1, right, k);
        }
    }
    return quickSelect(arr, 0, arr.length - 1, k - 1)
};


var rob = function (nums) {
    let ll = nums.length;
    if (ll == 0) return 0;
    let arr = new Array(ll)
    arr[0] = nums[0];
    arr[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < ll; i++) {
        arr[i] = Math.max(arr[i - 1], arr[i - 2] + nums[i]);
    }
    return arr[ll - 1]

};
// console.log(rob([1]));

var rightSideView = function (root) {
    if (!root) return [];
    let res = [];
    let ll = rightSideView(root.left)
    let rr = rightSideView(root.right)
    if (ll.length > rr.length) {
        res = [root.val, ...rr, ...ll.slice(rr.length, ll.length)]
    } else {
        res = [root.val, ...rr]
    }
    return res;
};

var flatten = function (root) {
    let top = root;
    let bb = top;
    const qian = (root) => {
        if (!root) return;
        bb.right = root;
        bb.left = null;
        bb = bb.right;
        qian(root.left);
        qian(root.right);
    }
    return top;
};

var flatten = function (root) {
    let res = []
    const qian = (root) => {
        if (!root) return;
        res.push(root)
        qian(root.left);
        qian(root.right);
    }
    qian(root)
    for (let i = 1; i < res.length; i++) {
        let lsNode = res[i - 1];
        lsNode.left = null;
        lsNode.right = res[i];
    }
    if (res.length == 1) return root;
    return res[0];
};

//计算并返回可以凑成总金额所需的 最少的硬币个数 。
const coinChange = (coins, amount) => {
    if (!amount) {
        return 0;
    }
    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

//请你计算并返回可以凑成总金额的硬币组合数
var change = function (amount, coins) {
    // if (!amount) {
    //     return 0;
    // }
    let dp = Array(amount + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] += dp[j - coins[i]]
        }
    }
    return dp[amount]
};

var uniquePaths = function (m, n) {
    let a = m + n - 2;
    let x = 1, y = 1;
    for (let i = 1; i <= n - 1; i++) {
        y *= i;
    }
    for (let i = a; i > m - 1; i--) {
        x *= i;
    }
    return x / y;
};

/**
 * 最小路径和
 * @param {number[][]} grid
 * @return {number}
 */
// var minPathSum = function (grid) {
//     let res = Array.from({ length: grid.length }, () => new Array(grid[0].length));
//     res[0][0] = grid[0][0]
//     for (let i = 0; i < grid.length; i++) {
//         for (let j = 0; j < grid[0].length; j++) {
//             if (i == 0 && j == 0) { continue; }
//             else if (i == 0) { res[i][j] = res[i][j - 1] + grid[i][j] }
//             else if (j == 0) { res[i][j] = res[i - 1][j] + grid[i][j] }
//             else { res[i][j] = Math.min(res[i][j - 1], res[i - 1][j]) + grid[i][j] }
//         }
//     }
//     return res[grid.length - 1][grid[0].length - 1]
// };

// var dailyTemperatures = function (temperatures) {
//     let T = temperatures;
//     let res = new Array(T.length).fill(0);
//     let stack = [];
//     for (let i = T.length-1; i >=0; i--) {
//         while(stack.length!=0&&T[stack[stack.length-1]]<=T[i]){
//             stack.pop();
//         }
//         res[i] = (stack[stack.length-1]-i)?stack[stack.length-1]-i:0;
//         stack.push(i);
//     }
//     return res;
// };

/**
 * 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    if(nums.length==1&&target!=nums[nums.length-1]){return -1}
    let k = nums.length - 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > nums[i]) {
            k = i - 1;
        }
    }
    const erFen = (nums, left, right) => {
        let mid = ((right - left) >> 1) + left;
        console.log(left, right, mid, nums[mid], target)
        if (left == right) {console.log(left); return left; }
        if (nums[mid] == target) {console.log(mid); return mid; }
        else if (nums[mid] > target) {
            return erFen(nums, left, mid - 1)
        }
        else if (nums[mid] < target) { return erFen(nums, mid + 1, right) }
    }
    if (target > nums[k]) {
        return -1;
    } else if (target >= nums[0]) {
        return erFen(nums, 0, k)
    } else if (target < nums[0]) {
        return erFen(nums, k + 1, nums.length - 1)
    }
};


/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.arr = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.arr.has(key)){
        let lsVal = this.arr.get(key);
        this.arr.delete(key)
        this.arr.set(key,lsVal);
        return this.arr.get(key);
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.arr.has(key)){
        this.arr.delete(key);
    }else if(this.arr.size>=this.capacity){
        const leastUsedKey = this.arr.keys().next().value;//取第一个;
        this.arr.delete(leastUsedKey)
    }
    this.arr.set(key,value);
};

