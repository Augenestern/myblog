/**
 * 1、使用递归和【Object.defineProperty】的方式，对数据进行劫持：【Observer函数】
 * getter函数和setter函数是数据监听的核心。可以获取属性值、监听数据的变化并对新属性值进行赋值修改
 * 递归是对子属性值进行递归，和对修改后的新值进行递归。
 * 2、【HTML模板解析】，将更新的数据更新到DOM上：
 * 通过创建文档碎片来设置临时内存区域，并将DOM节点添加到文档碎片上。
 * 匹配插值语法获取到属性名，并通过链式调用的方式获取属性对应的值。
 * 将插值语法中的内容替换成属性值，最后将文档碎片应用到DOM上。
 * 
 * 以上操作是通过数据劫持，将数据应用到视图上。
 * 
 * 
 * 接着就是要实现，当数据data发生变化的时候，视图DOM也会随之改变
 * 3、【发布者-订阅者模式】，通过这种模式订阅者就知道将来如何更新自己。
 * 在替换文档碎片时，创建订阅者Watcher实例，告诉订阅者如何更新，往后进行回调的时候，订阅者就知道如何更新自己了。
 * 在获取属性之前创建Dependency实例，并在数据劫持获取数据的时候，将订阅者加入依赖实例的数组中。
 * 然后在数据劫持修改数据的时候，通知订阅者去更新数据。以上操作完成了对文档的绑定。
 * 接下来就是完成输入框的绑定。找到输入框节点，并获取v-model对应的属性名。然后通过属性名就可以赋值它的属性值了。
 * 
 * 这个时候，就已经实现了数据改变视图的逻辑。
 * 
 * 接下来就是要实现用视图改变数据：
 * 通过addEventListener监听输入框节点的input，然后把获取到的值【赋值】给属性名就可以了，也就是给Vue实例上的数据赋值。
 * 以上操作就完成了双向数据绑定。
 */
class Vue {
    constructor(obj_instance) {
        this.$data = obj_instance.data

        // 数据劫持：监听data中属性的变化，将有更新的属性更新到DOM中
        Observer(this.$data)

        // HTML模板解析：应用Vue数据，渲染页面
        // 第一个参数：Vue实例挂载的元素
        // 第二个参数: Vue实例
        Compile(obj_instance.el, this)

        // 发布者-订阅者模式
    }
}

// 监听实例中的数据
function Observer(data_instance) {
    // 递归出口
    if (!data_instance || typeof data_instance !== 'object') return;

    // 创建Dependency实例
    const dependency = new Dependency()

    // 监听对象中每个属性的变化
    // Object.keys(data_instance)以数组的方式返回data对象里面的每一个属性
    Object.keys(data_instance).forEach(key => {
        // 必须先存着，否则进入getter函数后数据会被置为undefined
        let value = data_instance[key]

        // 递归：子属性数据劫持
        Observer(value)

        // 双向绑定的核心点1：Object.defineProperty()
        Object.defineProperty(data_instance, key, {
            enumerable: true, // 属性可枚举
            configurable: true, // 属性描述符可被改
            get() {
                // console.log('getter函数获取当前属性为', key, '的值：', value)
                
                // 验证订阅者已经被添加
                Dependency.temp && console.log('获取到Dependency的临时属性', Dependency.temp)
                // 将订阅者加入依赖实例的数组
                Dependency.temp && dependency.addSub(Dependency.temp)

                // 返回属性对应的值
                return value
            },
            set(newValue) {
                console.log('setter函数修改当前属性为', key, '的值为：', newValue)
                value = newValue
                // 如果newValue传入的是对象，那也需要进行数据劫持的操作
                Observer(newValue)
                // 修改数据的时候通知订阅者去更新
                dependency.notify()
            }
        })
    })
}

// HTML模板解析 
// 获取页面元素-放入临时内存区域【存放所有已更新的数据，避免每更新一次就渲染一次DOM】-应用Vue数据-渲染页面
function Compile(el, vm) {
    // 获取页面元素
    vm.$el = document.querySelector(el)

    // 创建文档碎片，设置临时内存区域（临时接受DOM元素）
    const fragment = document.createDocumentFragment()

    // 循环子节点，将其添加到文档碎片上
    let child;
    while (child = vm.$el.firstChild) {
        fragment.append(child)
    }
    console.log('文档碎片', fragment.childNodes)

    fragmentCompile(fragment)

    // 将修改的内容应用到文档碎片中，并将其渲染在页面上
    function fragmentCompile(node) {
        // 文本节点类型
        if (node.nodeType === 3) {
            const xxx = node.nodeValue

            // 匹配插值语法
            const pattern = /\{\{\s*(\S+)\s*\}\}/ // {{ name }}
            // exec方法是用于检测字符串中正则表达式的匹配
            const resultRegex = pattern.exec(node.nodeValue)
            if (resultRegex) {
                console.log('索引为1的才是剔除大括号和空格之后得到的属性名：', resultRegex[1])
                const arr = resultRegex[1].split('.') // 将字符串转换为数组
                // 链式调用this.data，获取属性里子属性的值
                const value = arr.reduce((pre, cur) => pre[cur], vm.$data)
                console.log('正则匹配结果对应的属性值', value)

                // 将插值语法中的内容替换成获取到的属性的值
                // replace方法第一个参数是匹配的内容，第二个参数是用什么值替换内容
                node.nodeValue = xxx.replace(pattern, value)
                console.log('目前文本', node.nodeValue)

                // 创建订阅者
                // 为的是在数据更新的时候，订阅者知道更新自己
                new Watcher(vm, resultRegex[1], (newValue) => {
                    node.nodeValue = xxx.replace(pattern, newValue)
                })
            }
            return
        }

        // 输入框节点类型
        if (node.nodeType === 1 && node.nodeName === 'INPUT') {
            // 将node.attributes转化为数组，去除多余的信息
            const attrArr = Array.from(node.attributes)
            console.log('节点属性', attrArr)
            attrArr.forEach(item => {
                if (item.nodeName === 'v-model') {
                    // item.nodeValue对应的是属性名 'name'和 'more.like.me'
                    const value = item.nodeValue.split('.').reduce((pre, cur) => pre[cur], vm.$data)
                    console.log('输入框类型对应的值', value)
                    node.value = value

                    // 创建订阅者
                    new Watcher(vm, item.nodeValue, (newValue) => {
                        node.value = newValue
                    })

                    // 监听输入框输入
                    node.addEventListener('input', (e) => {
                        console.log(e.target.value)
                        // ['more', 'like', 'me']
                        let keys = item.nodeValue.split('.')
                        // ['more', 'like']
                        let frontKeys = keys.slice(0, keys.length - 1)
                        // ['me']
                        let endKey = keys[keys.length - 1]
                        // vm.$data.more.like.me
                        let newKeys = frontKeys.reduce((pre, cur) => {
                            console.log(pre, cur)
                            return pre[cur]
                        }, vm.$data)
                        // 赋值
                        newKeys[endKey] = e.target.value
                    })
                }
            })
        }

        // 递归子节点
        node.childNodes.forEach(child => fragmentCompile(child))
    }
    // 将文档碎片应用到DOM上
    vm.$el.appendChild(fragment)
}

// 依赖-收集和通知订阅者
class Dependency {
    constructor() {
        // 存放订阅者信息
        this.subscribers = []
    }
    // 添加订阅者
    addSub(sub) {
        this.subscribers.push(sub)
    }
    // 通知订阅者
    notify() {
        this.subscribers.forEach(sub => sub.update())
    }
}

// 订阅者: 将来如何更新自己
// 什么时候创建订阅者实例：在修改文档内容的时候（模板解析时）
class Watcher {
    // vm代表Vue实例，key代表Vue实例上的属性名，callback记录如何更新文本内容
    constructor(vm, key, callback) {
        this.vm = vm
        this.key = key
        this.callback = callback

        // 为了把订阅者实例存储到Dependency实例里的数组中
        // 巧妙涉及：为Dependency这个类设置临时属性temp，将订阅者实例赋值给这个临时属性
        // 根据作用域的功能，可以最大限度的访问这个临时属性
        Dependency.temp = this

        // 为了触发getter的时候来添加订阅者到订阅者数组中（具体操作看Observer里面的getter方法）
        console.log('用属性 ', key, ' 创建订阅者')
        key.split('.').reduce((pre, cur) => pre[cur], vm.$data)

        // 为了防止订阅者多次被加入到依赖实例数组中
        Dependency.temp = null
    }
    // 发布者通知订阅者更新
    update() {
        const value = this.key.split('.').reduce((pre, cur) => pre[cur], this.vm.$data)
        this.callback(value)
    }
}

