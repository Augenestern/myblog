---
title: typescript学习
# top: ture #文章置顶
date: 2023-12-12 08:05:17
---

typescript 学习

<!-- more -->

### 1.类型推断

### 2.类型注解

### 3.类型断言

```ts
let numArr = [1,2,3]
const result = numArr.find(item=>item>2) as number; //只有确定这个结果才这样用，如果有undefined就不要这样用。
result*5

```
### 4.基础类型和联合类型

```ts
let v1: string = 'abc';
let v2: number = 10;
let v3: boolean = false;
let nu: null = null;
let nu2: undefined = undefined;

let v4: string | null = null;
let v5: 1 | 2 | 3 = 2;
```
### 5.数组，元祖，枚举

```ts
let arr1: number[] = [1, 23, 4];
let arr11: Array<number> = [1, 23, 4];
let arr2: string[] = ['1', '23', '4'];

let t1: [number, string, number?] = [1, '3', 4]; //?代表可选,必须放在最后

enum MyEunm{
    A,
    B,
    C
}
console.log(MyEunm.A);
console.log(MyEunm[0]);
```
### 6.函数
```ts
// 没有返回值用void
function MyFn(a:number, b:string ,c?:boolean,...rest:number[]):string {
    return '1';
}
const f = MyFn(20,'dbb',true,1,2,3)

```
### 7.接口
```ts
interface Obj {
    name:string,
    age:number
}

const obj:Obj = {
    name:'a',
    age:23
}

```
### 8.类型别名
```ts
type MyUseNum = string|number;
let a:MyUseNum = 10;

```
### 9.泛型
```ts
function MyFn<T>(a:T,b:T):T[] {
    return [a,b];
}
MyFn<number>(2,3)
```

### 10.示例
```ts
import instance from "./request";
 
//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数
interface ReqLogin {
    name: string
    paw: string
}
interface ReqStatus {
    id: string
    navStatus: string
}
 
// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理***
type Res<T> = Promise<ItypeAPI<T>>;
// 一般情况下响应数据返回的这三个参数，
// 但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
    data: T,//请求的数据，用泛型
    msg: string | null // 返回状态码的信息，如请求成功等
    code: number //返回后端自定义的200，404，500这种状态码
}
 
 
// post请求 ，没参数
export const LogoutAPI = (): Res<null> => 
    instance.post("/admin/logout");
 
// post请求，有参数,如传用户名和密码
export const loginAPI = (data: ReqLogin): Res<string> =>
    instance.post("/admin/login", data);
 
// post请求 ，没参数，但要路径传参
export const StatusAPI = (data: ReqStatus): Res<null> =>
    instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`);
 
 
//  get请求，没参数，
export const FlashSessionListApi = (): Res<null> =>
    instance.get("/flashSession/list");
 
// get请求，有参数，路径也要传参  (也可能直接在这写类型，不过不建议,大点的项目会维护一麻烦)
export const ProductCategoryApi = (params: { parentId: number }): any =>
    instance.get(`/productCategory/list/${params.parentId}`, { params });
 
// get请求，有参数，(如果你不会写类型也可以使用any,不过不建议,因为用了之后 和没写TS一样)
export const AdminListAPI = (params:any): any => 
    instance.get("/admin/list", { params });
```