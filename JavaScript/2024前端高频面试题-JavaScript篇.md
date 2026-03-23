# 2024前端高频面试题 - JavaScript篇

> 来源：[掘金](https://juejin.cn/post/7470807791092088841)
> 发布时间：2025-02-13

【导读】在瞬息万变的前端领域，JavaScript始终是面试考察的核心阵地。本文精选2024年最新高频考点，覆盖原理层深度剖析与实战编码技巧，助你轻松应对各层级面试挑战。

---

## 🧠 核心原理篇

### 1. 事件循环终极拷问

**题目**：分析以下代码输出顺序并解释原理

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
  .then(() => {
    console.log('C');
    setTimeout(() => console.log('D'), 0);
  });

queueMicrotask(() => console.log('E'));

console.log('F');
```

**答案**：A → F → C → E → B → D

**原理图解**：

```
宏任务队列: [B, D]
微任务队列: [C, E]
执行顺序：同��代码 → 清空微任务 → 取宏任务
```

### 2. 作用域与闭包陷阱

**题目**：以下代码输出什么？如何修复？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出：3 3 3
```

**解决方案**：

```javascript
// 方案1：使用let块级作用域
for (let i = 0; i < 3; i++) { ... }

// 方案2：IIFE立即执行函数
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}
```

## 💡 ES6+ 进阶考点

### 1. 箭头函数特性

**必考点**：

- 没有自己的`this`、`arguments`
- 不能作为构造函数使用
- 没有`prototype`属性
- 不能用`yield`命令（不能用作Generator函数）

### 2. 可选链与空值合并

**实战代码**：

```javascript
const user = {
  profile: {
    getName: () => 'John'
  }
};

console.log(user?.profile?.getName?.()); // 'John'
console.log(user?.settings?.theme ?? 'dark'); // 'dark'
```

## ⚡ 异步编程进阶

### 1. Promise并发控制

**题目**：实现带并发限制的异步调度器

```javascript
class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  add(task) {
    return new Promise((resolve) => {
      this.queue.push(() => task().then(resolve));
      this.run();
    });
  }

  run() {
    while (this.running < this.limit && this.queue.length) {
      const task = this.queue.shift();
      task().finally(() => {
        this.running--;
        this.run();
      });
      this.running++;
    }
  }
}
```

### 2. async/await底层原理

**关键点**：

- Generator + 自动执行器实现
- 每次`await`都会创建新的Promise微任务
- 错误处理通过`Promise.catch`捕获

---

## 🔧 手撕代码篇

### 1. 深拷贝终极实现

```javascript
function deepClone(target, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) return target;

  if (map.has(target)) return map.get(target);

  const clone = Array.isArray(target) ? [] : {};
  map.set(target, clone);

  // 处理Symbol属性
  Reflect.ownKeys(target).forEach(key => {
    clone[key] = deepClone(target[key], map);
  });

  return clone;
}
```

### 2. 函数柯里化

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...args2) => curried.apply(this, args.concat(args2));
    }
  };
}

// 使用示例
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
```

## 🚀 性能优化方向

### 1. 内存泄漏定位

**常见场景**：

- 意外全局变量
- 未清除的定时器
- DOM引用未释放
- 闭包不当使用

**检测工具**：

- Chrome DevTools Memory面板
- `performance.memory` API
- Heap Snapshot对比分析

### 2. 函数节流终极版

```javascript
function throttle(fn, delay, options = { leading: true, trailing: true }) {
  let last = 0, timer = null;

  return function(...args) {
    const now = Date.now();

    if (!last && !options.leading) last = now;

    const remaining = delay - (now - last);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      last = now;
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        last = options.leading ? Date.now() : 0;
        timer = null;
      }, remaining);
    }
  };
}
```

## 🆕 2024 新特性速递

### 1. Record与Tuple提案

```javascript
// 记录类型（不可变对象）
const record = #{
  name: "Alice",
  age: 30
};

// 元组类型（不可变数组）
const tuple = #[1, 2, 3];
```

### 2. 顶层await支持

```javascript
// 模块顶层直接使用
const data = await fetchData();
export default data;
```

---

## 💼 实战技巧总结

1. **原型链速记口诀**：
   `实例.__proto__ → 构造函数.prototype → Object.prototype → null`

2. **EventLoop优先级**：
   `同步代码 > process.nextTick > 微任务 > 宏任务 > setImmediate`

3. **类型转换秘籍**：

   ```javascript
   Number([]) => 0          // [] → '' → 0
   Number({}) => NaN        // {} → '[object Object]' → NaN
   [] == ![]                // true (![]→false → []→0 == false→0)
   ```

---

## 📚 推荐学习资源

1. You Don't Know JS 系列
2. V8引擎官方博客
3. ECMAScript提案库

---

*来源：2024前端高频面试题-- JavaScript篇*
