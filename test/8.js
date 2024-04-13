const arr = [1, 2, 22, 2, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.filter((item, index) => arr.indexOf(item) === index);
// console.log(arr.indexOf());

var mergeTwoLists = function (list1, list2) {
    let temp = list1.val > list2.val ? list2 : list1;
    let head = temp;
    while (list1 || list2) {
        if (list1.val > list2.val) {
            temp.next = list2;
            temp = temp.next;
            list2 = list2.next;
        } else {
            temp.next = list1;
            temp = temp.next;
            list1 = list1.next;
        }
    }
    return head;
};


/**
 * 将有序数组转换为二叉搜索树
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    if (nums.length == 0) {
        return null;
    }
    const mid = (nums.length - 1) >> 1
    const node = new TreeNode(nums[mid]);
    node.left = sortedArrayToBST(nums.slice(0, mid))
    node.right = sortedArrayToBST(nums.slice(mid + 1))
    return node;
};
// console.log([1,2,3].slice(0,1));

/**
 * 二叉树的直径
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let maxCount = 0;
    const findMaxCount = (root) => {
        if (!root) {
            return 0;
        }
        let left = findMaxCount(root.left)
        let right = findMaxCount(root.right)
        return Math.max(right + left, maxCount)
    }
    findMaxCount(root)
    return maxCount
};

/**
 * 在排序数组中查找元素的第一个和最后一个位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = (left + right) >> 1;
        if (nums[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if (nums[left] != target) {
        return [-1, -1]
    }
    for (let i = left; i < nums.length; i++) {
        if (nums[i] == target) {
            right = i
        }
    }
    return [left, right]
};
// console.log(searchRange([5,7,7,8,8,10],6));

/**
 * 括号生成
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    if (n <= 0) return [];
    let res = []
    const backtrack = (str, left, right) => {
        if(left<right||left>n) return;
        if(str.length==n*2){res.push(str)}
        backtrack(str+'(',left+1,right);
        backtrack(str+')',left,right+1);
    }
    backtrack('', 0, 0)
    return res;
};
console.log(generateParenthesis(4));