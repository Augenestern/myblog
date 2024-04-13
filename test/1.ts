let v1: string = 'abc';
let v2: number = 10;
let v3: boolean = false;
let nu: null = null;
let nu2: undefined = undefined;

let v4: string | null = null;
let v5: 1 | 2 | 3 = 2;


let arr1: number[] = [1, 23, 4];
let arr11: Array<number> = [1, 23, 4];
let arr2: string[] = ['1', '23', '4'];

let t1: [number, string, number?] = [1, '3', 4]; //?代表可选,必须放在最后

enum MyEunm {
    A,
    B,
    C
}
console.log(MyEunm.A);
console.log(MyEunm[0]);

// 没有返回值用void
function MyFn(a: number, b: string, c?: boolean, ...rest: number[]): string {
    return '1';
}
const f = MyFn(20, 'dbb', true, 1, 2, 3)

interface Obj {
    name:string,
    age:number
}

const obj:Obj = {
    name:'a',
    age:23
}

type MyUseNum = string|number;
let a:MyUseNum = 10;

function MyFn1<T>(a:T,b:T):T[] {
    return [a,b];
}
MyFn1<number>(2,3)













