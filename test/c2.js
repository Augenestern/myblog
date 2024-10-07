//JS实现class的私有属性
class Stu {
    constructor(name, age， sexy) {
      this._name = name;
      this._age = age;
      this.sexy = sexy
    }
    get info() {
          return `该学生姓名：${this._name}，年龄：${this._age}`;
    }
  }
   
  // 定义一个处理器
  const handler = {
    get (target, key) {
      if (key[0] === '_') {
        throw new Error('禁止访问！');
      }
      return target[key];
    },
    set (target, key, value) {
      if (key[0] === '_') {
        throw new Error('禁止访问！');
      }
      target[key] = value;
    },
    ownKeys(target, prop) {
      return Object.keys(target).filter(key => key[0] !== '_')
    },
  }
   
//   const zs = new Proxy(new Stu('张三', 18, '男'), handler);
//   console.log(zs.info);           // 该学生姓名：张三，年龄：18
//   console.log(Object.keys(zs))    // [ 'sexy' ]
//   zs._age = 20; 

class 