# 2024前端高频面试题 - React篇

> 来源：[掘金](https://juejin.cn/post/7349971654590857216)

【前端面试复习系列文章】

- 2024前端高频面试题-- html篇
- 2024前端高频面试题-- CSS篇
- 2024前端高频面试题-- JS篇
- 2024前端高频面试题-- VUE篇
- 2024前端高频面试题-- React篇
- 2024前端高频面试题-- 前端工程化篇
- 2024前端高频面试题-- HTTP和浏览器篇
- 2024前端高频面试题-- 手写代码篇
- 2024前端高频面试题-- 数据结构与算法篇

---

## 1. 简述 React 的特点

React 主要有以下特点：

1. **虚拟DOM**：React 在内存中维护一个虚拟 DOM 树，通过 Diff 算法高效地更新实际 DOM
2. **组件化**：一切皆组件，组件可以被复用和组合
3. **单向数据流**：数据从父组件流向子组件，便于理解和调试
4. **声明式编程**：只需要描述 UI 应该是什么样子，而不是如何一步步实现
5. **JSX 语法**：在 JavaScript 中编写类似 HTML 的语法

## 2. 简述 React JSX 转换原理

JSX 是 React 的语法扩展，它允许我们在 JavaScript 中编写类似 HTML 的代码。

JSX 会被 Babel 编译成 `React.createElement()` 调用。

例如，这段 JSX 代码：

```jsx
<div className="sidebar"></div>
```

会被转换为以下 JS 代码：

```javascript
React.createElement(
  'div',
  {className: 'sidebar'}
)
```

## 3. 简述React的生命周期

React 的生命周期主要分为三个阶段：MOUNTING、UPDATE、UNMOUNTING

### 组件挂载时
- componentWillMount：在 render 之前调用
- componentDidMount：在 render 之后调用

### 组件更新时
- shouldComponentUpdate：会接收需要更新的 props 和 state，让开发者增加必要的判断条件
- componentWillUpdate
- render：能获取到最新的 this.state
- componentDidUpdate：能获取到最新的 this.state

### 父组件更新 props 而更新
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

### 组件卸载时
- componentWillUnmount：常常会在组件的卸载过程中执行一些清理方法，比如事件回收、清空定时器

新版的生命周期函数增加了 `getDerivedStateFromProps`，这个生命周期其实就是将传入的 props 映射到 state 中。

## 4. React事件机制和原生DOM事件流有什么区别

react中的事件是绑定到document上面的，而原生的事件是绑定到dom上面的。因此相对绑定的地方来说，dom上的事件要优先于document上的事件执行。

## 5. Redux工作原理

Redux 是 React 的第三方状态管理库。它基于一个称为存储的状态容器的概念，组件可以从该容器中作为 props 接收数据。更新存储区的唯一方法是向存储区发送一个操作，该操作被传递到一个reducer中。reducer接收操作和当前状态，并返回一个新状态，触发订阅的组件重新渲染。

## 6. React-Router工作原理? react-router-dom有哪些组件

组件类型包括：
- 路由器组件
- 路由匹配组件
- 导航组件

react-router 的依赖库 history 支持：
- BrowserHistory：用于支持 HTML5 历史记录 API 的现代 Web 浏览器
- HashHistory：用于旧版Web浏览器
- MemoryHistory：用作参考实现，也可用于非 DOM 环境，如 React Native 或测试

## 7. React hooks解决了什么问题? 函数组件与类组件的区别

Hooks 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。

**类组件：**
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**函数组件：**
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

区别：
- 类组件有 state 和生命周期，但不好复用
- 函数组件是无状态的，比类组件更简单、更具性能
- Hooks 让函数组件也有了状态和能力，有助于分离关注点

## 8. SetState是同步还是异步的，setState做了什么

在React中，`setState()`函数通常被认为是异步的，这意味着调用setState()时不会立刻改变react组件中state的值。

调用 setState时，React会做的第一件事情是将传递给 setState的对象合并到组件的当前状态。这将启动一个称为和解的过程。和解的最终目标是以最有效的方式，根据这个新的状态来更新UI。

## 9. 什么是fiber，fiber解决了什么问题

React15 的 `StackReconciler` 方案由于递归不可中断问题，如果 Diff 时间过长，会造成页面 UI 的无响应的表现。

为了解决这个问题，React16 实现了新的基于 `requestIdleCallback` 的调度器，通过任务优先级的思想，在高优先级任务进入的时候，中断 reconciler。

为了适配这种新的调度器，推出了 `FiberReconciler`，将原来的树形结构转换成 Fiber 链表的形式，整个 Fiber 的遍历是基于循环而非递归，可以随时中断。

## 10. React中在哪捕获错误？

使用 Error Boundary（错误边界）来捕获组件树中的 JavaScript 错误：

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

但是错误边界不会捕获：
- 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
- 服务端渲染
- 它自身抛出来的错误（并非它的子组件)

## 11. React组件传值有哪些方式

- **父传子**：props
- **子传父**：通过在父组件引入的子组件中传递一个函数并传参数，子组件去触发这个函数更改参数完成数据更新
- **跨多层组件传值**：通过context api完成

## 12. react无状态组件和class类组件的区别

- 直观区别，函数组件代码量较少，相比类组件更加简洁
- 函数组件中没有this，没有state，也没有生命周期，决定了函数组件都是展示性组件
- 因为函数组件不需要考虑组件状态和组件生命周期方法中的各种比较校验，所以有很大的性能提升空间

## 13. react如何做到和vue中keep-alive的缓存效果

React Keep Alive 提供了类似 Vue keep-alive 的功能，需要把组件放在 Provider 里面，并且每个组件都必须拥有一个唯一的 key。

## 14. React如何做路由监听

```javascript
componentDidMount(){
  this.context.router.history.listen((route)=>{
    if(route.pathname==='/xxx'){
      console.log(1);
    }
  });
}
```

也可以用高阶组件来实现。

## 15. React有哪几种方式改变state

- this.forceUpdate
- this.setState
- :key值传递不同也可以
- replaceState也可以改变

## 16. React有哪几种创建组件方法

React 有三种构建组件的方式：

1. React.createClass：最传统、兼容性最好的方法
2. ES6 class：使用类来实现
3. 无状态函数：始终保持一个实例，避免了不必要的检查和内存分配

## 17. react中props和state有什么区别

- props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的
- props 是不可修改的，所有 React 组件都必须像纯函数一样保护它们的 props 不被更改
- state 是在组件中创建���，一般在 constructor中初始化
- state 是多变的、可以修改，每次setState都异步更新的

## 18. React 中 keys 的作用是什么？

Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。key 应该是唯一ID，最好是 UUID 或收集项中的其他唯一字符串。

```javascript
{todos.map((todo) =>
  <li key={todo.id}>{todo.text}</li>
)}
```

## 19. React 中 refs 的作用是什么？

Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。

```javascript
class CustomForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

## 20. React diff 原理

1. 把树形结构按照层级分解，只比较同级元素
2. 列表结构的每个单元添加唯一的 key 属性，方便比较
3. React 只会匹配相同 class 的 component
4. 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty 到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制
5. 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能

## 21. 受控组件和非受控组件有什么区别？

在 HTML 文档中，许多表单元素都保持自己的状态。不受控制的组件将 DOM 视为这些输入状态的真实源。在受控组件中，内部状态用于跟踪元素值。当输入值改变时，React 会重新渲染输入。

在与非 React 代码集成时，不受控制的组件非常有用。

## 22. 为什么虚拟 dom 会提高性能?

虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。

具体实现步骤如下：

1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
3. 把所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

---

*PS.未完待续，文中有错误的地方也欢迎评论指出或评论分享自己的面试题。*

**另外作者也在找工作，欢迎公司有HC的同学内推，base地：深圳、广州或长沙。**
