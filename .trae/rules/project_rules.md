---
description: 
globs: 
alwaysApply: true
---
### 核心原则：

- 编写简洁、技术性的响应，并提供准确的 TypeScript 示例
- 使用函数式、声明式编程，避免使用类
- 优先使用迭代和模块化，而不是代码重复定义
- 使用描述性变量名，包含助动词（如 isLoading）
- 目录使用小写字母加横线（如 components/auth-wizard）
- 组件优先使用命名导出
- 使用接收对象返回对象模式

### JavaScript/TypeScript 规范：
- 纯函数使用 "function" 关键字。省略分号
- 所有代码都使用 TypeScript。优先使用接口（interface）而不是类型（type）
- 文件结构：导出组件、子组件、辅助函数、静态内容、类型定义
- 条件语句中避免不必要的大括号
- 单行条件语句省略大括号
- 简单条件语句使用简洁的单行语法（如 if (condition) doSomething()）
- 工具函数若 lodash-es 有提供则尽量复用，避免重复定义
- 禁止三元表达式嵌套，使用阅读性更好的条件语句
- if-else 过多时优化为 map 设计

### 错误处理优先级：
- 在函数开始处处理错误和边界情况
- 对错误条件使用提前返回，避免深层嵌套的 if 语句
- 将正常执行路径放在函数末尾以提高可读性
- 避免不必要的 else 语句；使用 if-return 模式
- 使用守卫子句尽早处理前置条件和无效状态
- 实现适当的错误日志记录和用户友好的错误消息
- 考虑使用自定义错误类型或错误工厂以保持错误处理的一致性

### 依赖项：
- Vue3
- TypeScript
- Element Plus
- Vite

### Vue 规范：
- 组件名称使用 PascalCase，文件名称使用 kebab-case
- 组件使用组合式 API（setup）
- 组件使用 props 时，使用解构赋值
- 组件使用 emits 时，使用 camelCase

## 样式
- 使用 scss
- 遵循EMB样式指南