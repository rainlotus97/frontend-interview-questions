/**
 * JavaScript 面试题 - 事件循环专题
 */

export const eventLoopQuestions = [
  {
    id: 'el-001',
    category: 'JavaScript',
    topic: '事件循环',
    difficulty: 'medium',
    question: '阐述一下 JS 的事件循环',
    answer: {
      summary: '事件循环又叫消息循环，是浏览器渲染主线程的工作方式。',
      details: [
        '在 Chrome 源码中，开启一个不会结束的 for 循环',
        '每次循环从消息队列中取出第一个任务执行',
        '其他线程在合适时将任务加入队列末尾'
      ],
      evolution: '过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。',
      w3cSpec: [
        '每个任务有不同的类型，同类型的任务必须在同一个队列',
        '不同的任务可以属于不同的队列',
        '不同任务队列有不同的优先级',
        '在一次事件循环中，由浏览器自行决定取哪一个队列的任务',
        '浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行'
      ]
    },
    extendedKnowledge: {
      macroTasks: ['setTimeout', 'setInterval', 'I/O', 'UI渲染', '<script>整体代码'],
      microTasks: ['Promise.then', 'MutationObserver', 'queueMicrotask', 'process.nextTick(Node)'],
      executionOrder: '同步代码 → 清空微任务队列 → UI渲染(如需要) → 取一个宏任务 → 循环'
    }
  }
];

export default eventLoopQuestions;
