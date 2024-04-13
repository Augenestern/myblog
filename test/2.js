
// function transposeMatrix(matrix) {
//     return matrix[0].map((_, columnIndex) => matrix.map(row => row[columnIndex]));
// }

// // 示例
// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ];

// const transposedMatrix = transposeMatrix(matrix);
// console.log();

//相交链表
var getIntersectionNode = function (headA, headB) {
    let bag = new Set();
    let temp = headA;
    while (temp != null) {
        bag.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp != null) {
        if (bag.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return temp
};
//使用双指针
var getIntersectionNode1 = function (headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    let tempA = headA, tempB = headB;
    while (tempA != tempB) {
        tempA = tempA.next == null ? headB : tempA.next;
        tempB = tempB.next == null ? headA : tempB.next;
    }
    return tempA
}
//反转链表
var reverseList = function (head) {
    let prev = null;
    let temp = head;
    while (temp) {
        const next = temp.next;
        temp.next = prev;
        prev = temp;
        temp = next;
    }
    return prev
};
//递归
var reverseList = function (head) {
    if (head == null || head.next == null) {
        return head;
    }
    const xx =  reverseList(head.next)
    head.next.next = head;
    head.next = null;
    return xx;
};

//二叉树 递归法 中序遍历
var inorderTraversal = function (root) {
    const res = [];
    const inorder = (root) => {
        if (!root) {
            return;
        }
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};

//利用迭代
var inorderTraversal = function (root) {
    if (!root) return [];
    let res = [];
    let stack = [];
    while (stack.length > 0 || root) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val)
        root = root.right
    }
    return res;
};

//二叉树的最大深度:二叉树的最大深度是指从根节点到最远叶子节点的最长路径上的节点数。
var maxDepth = function (root) {
    if (!root) {
        return 0;
    } else {
        const left = maxDepth(root.left)
        const right = maxDepth(root.right)
        return Math.max(left, right) + 1;
    }
};

//翻转二叉树
var invertTree = function (root) {
    if (!root) {
        return
    } else {
        const l = invertTree(root.left)
        const r = invertTree(root.right)
        root.right = l;
        root.left = r;
        return root;
    }
};
//对称二叉树
var isSymmetric = function (root) {
    if (!root) {
        return true
    }
    const func = (left, right) => {
        if (!left && !right) { return true }
        if (left && right && left.val == right.val && func(left.left, right.right) && func(left.right, right.left)) {
            return true
        } else {
            return false
        }
    }
    return func(root.left, root.right)
};

//全排列
var permute = function (nums) {
    let result = []
    let xx = nums.length
    const backtrack = function (nums, track, index) {
        for (let i = 0; i < nums.length; i++) {
            track.push(nums[i])
            backtrack(nums.filter((item, index) => { return item != nums[i] }),track,index)
            if(track.length==xx){
                result.push([...track])
            }
            track.pop()
        }
    }
    backtrack(nums,[],0)
    return result
};

// console.log(permute([1,2,3,4]));

// 输出所有子集合
function subsets(nums) {
    const result = [];
    function backtrack(nums, track, start, result) {
        result.push([...track]);
        for (let i = start; i < nums.length; i++) {
            track.push(nums[i]);
            backtrack(nums, track, i + 1, result);
            track.pop();
        }
    }
    backtrack(nums, [], 0, result);
    return result;
}
// console.log(subsets([1, 2, 3]));