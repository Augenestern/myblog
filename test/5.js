//爬楼梯
var climbStairs = function (n) {
    let q1 = 0, q2 = 0, q3 = 1;
    for (let i = 0; i < n; i++) {
        q1 = q2;
        q2 = q3;
        q3 = q1 + q2;
    }
    return q3;
};
// console.log(climbStairs(44));

// 定义链表节点
class ListNode {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
}

// // 创建一个简单的链表
// const head = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);

// head.next = node2;
// node2.next = node3;

//链表两数相加

var addTwoNumbers = function (l1, l2) {
    let head = null, node = null;
    let lsNum = 0;
    while (l1 || l2) {
        let a = l1 ? l1.val : 0;
        let b = l2 ? l2.val : 0;
        lsNum = a + b + lsNum;
        if (!head) {
            head = node = new ListNode(lsNum % 10)
        } else {
            node.next = new ListNode(lsNum % 10)
            node = node.next
        }
        lsNum = Math.floor(lsNum / 10)
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (lsNum > 0) {
        node.next = new ListNode(carry)
    }
    return head;
}

//搜索插入位置
var searchInsert = function (nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        const mid = ((right - left) >> 1) + left;
        if (nums[mid] >= target) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

//有效的括号
var isValid = function (s) {
    let arr = s.split('');
    let xx = []
    const rule = new Map()
    rule.set(']', '[')
    rule.set('}', '{')
    rule.set(')', '(')
    arr.forEach(e => {
        if (rule.has(e) && xx[0] == rule.get(e)) {
            xx.shift()
        } else {
            xx.unshift(e)
        }
    });
    if (xx.length != 0) {
        return false
    }
    return true
};
// console.log(isValid("[({})]"));

// for (var i = 0; i < 5; i++) {
//     (function(j) {
//         setTimeout(() => {
//             console.log(j);
//         }, 0);
//     })(i)
// }
for (var i = 0; i < 5; i++) {
    setTimeout((j) => {
        console.log(j)
    }, 0, i);
}