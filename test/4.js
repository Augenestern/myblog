//回文链表
var isPalindrome = function (head) {
    const arr = [];
    while (head != null) {
        arr.push(head.val)
        head = head.next
    };
    for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
        console.log(i, j);
        if (arr[i] != arr[j]) {
            return false
        }
    }
    return true
};

//环形链表
const hasCycle1 = function (head) {
    while (head) {
        if (head.tag) {
            return true;
        }
        head.tag = true;
        head = head.next;
    }
    return false;
};

//快慢指针做法
var hasCycle = function (head) {
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true
        }
    }
    return false
};

//只出现一次的数字
//哈希表
var singleNumber = function (nums) {
    let a = new Map()
    nums.forEach(e => {
        if (a.has(e)) {
            a.delete(e)
        } else {
            a.set(e, 1)
        }
    });
    let res = Array.from(a)[0][0]
    return res
};
//直接异或^  a^a=0; a^0=a; a^b^a=a^a^b=b
var singleNumber = function (nums) {
    let a = 0
    nums.forEach(e => {
        a = a ^ e;
    });
    return a
};