class myPromise {
    static pending = '待定'; static fulfilled = '成功'; static rejected = '失败';
    constructor(func) {
        this.status = myPromise.pending;
        this.result = null;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        try {
            func(this.resolve.bind(this), this.reject.bind(this));  //必须要bind改变函数内this指向
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        setTimeout(() => {
            if (this.status === myPromise.pending) {
                this.status = myPromise.fulfilled;
                this.result = result;
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        });
    };

    reject(result) {
        setTimeout(() => {
            if (this.status === myPromise.pending) {
                this.status = myPromise.rejected;
                this.result = result;
                this.rejectCallbacks.forEach(callback => {
                    callback(result)
                })
            };
        });
    };

    then(onFulfilled, onRejected) {
        //可以使用多个 .then
        return new myPromise((resolve, reject) => {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { };
            onRejected = typeof onRejected === 'function' ? onRejected : () => { };
            if (this.status === myPromise.pending) {
                this.resolveCallbacks.push(onFulfilled);
                this.rejectCallbacks.push(onRejected);
            }
            if (this.status === myPromise.fulfilled) {
                setTimeout(() => {
                    onFulfilled(this.result);
                });
            }
            else if (this.status === myPromise.rejected) {
                setTimeout(() => {
                    onRejected(this.result);
                });
            };
        })
    };
}


// let myCommit = new myPromise((resolve, reject) => {
//     throw new Error('bsd')
// })

// myCommit.then(
//     result => { console.log(result); },
//     result => { console.log(result.message); }
// )

// myCommit.then(
//     undefined,  //要对传入的参数判断，改为function;
//     result => { console.log(result.message); }
// )
console.log('第一');
let myCommit = new myPromise((resolve, reject) => {
    console.log('第二');
    setTimeout(() => {
        resolve('有度')
        console.log('第四');
    });
}).then(
    result => { console.log(result, '1'); },
    reject => { console.log(reject.message); }
)
console.log('第三');




