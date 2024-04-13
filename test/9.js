class MinStack {
    constructor() {
        this.stack = [];
        this.min = [];
    }
    push(val) {
        this.stack.unshift(val);
        if (this.stack.length == 1) {
            this.min.push(val)
        } else {
            this.min.push(Math.min(this.min[this.min.length - 1], val))
        }
        // return this.stack.length;
    }
    pop() {
        this.stack.shift()
        this.min.pop()
    }
    top() {
        return this.stack[0]
    }
    getMin() {
        return this.min[this.min.length - 1];
    }
}

/**
 * 删除链表的倒数第 N 个结点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let m = new ListNode(null);
    let c = m;
    m.next = head;
    let nn = head;
    for (let i = 0; i < n; i++) {
        nn = nn.next;
    }
    while (nn != null) {
        nn = nn.next;
        m = m.next;
    }
    m.next = m.next.next
    return c.next;
};

/**
 * 两两交换链表中的节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    let m = new ListNode(null);
    let c = m;
    m.next = head;
    let a, b;
    if (head == null || head.next == null) { return head }
    while (m.next != null) {
        a = m.next;
        b = m.next.next.next;
        m.next = a.next;
        m.next.next = a;
        a.next = b;
        m = m.next.next;
        if (m.next == null || m.next.next == null) {
            break;
        }
    }
    return c.next;
};

/**
 * 二叉树的层序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    let res = new Map();
    let arr = []
    const inorder = (root, index) => {
        if (!root) {
            return;
        }
        if (res.has(index)) {
            let xx = res.get(index)
            xx.push(root.val)
            res.set(index, xx)
        } else {
            res.set(index, [root.val])
        }
        index++
        inorder(root.left, index);
        inorder(root.right, index);
    }
    inorder(root, 0);
    res.forEach((value, key) => {
        arr.push(value)
    });
    return arr;
};

/**
 * 验证二叉搜索树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    if (root == null) {
        return true
    }
    if (root.left.val >= root.val || root.right.val <= root.val) {
        return false;
    }
    return isValidBST(root.left) && isValidBST(root.right)
};



/**
 * 随机链表的复制
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    
};

function getCustomUnion(a, b) {
    const resultSet = new Set(b);
    const resultArray = a.filter(item => resultSet.has(item));
    const resultSet2 = new Set(resultArray);
    b.forEach(item => {
        if (!resultSet2.has(item)) {
            resultArray.push(item);
        }
    });
    return resultArray;
}

const a = [2, 4, 5];
const b = [6, 1, 4, 2, 7,5,8];
const customUnionArray = getCustomUnion(a, b);
console.log(customUnionArray);

















