# mallwithvant
# 使用vantUI库重构
# vue-cli3不使用webpack.config.js而使用vue.config.js
vue的组件分为两种类型，页面组件和子组件
页面组件用于排版子组件的位置，自身不创建内容
子组件只创建内容，不定义其在页面中的位置

web前端发展历程
1.0函数式编程思想：以js函数来分离行为，每个函数做一件事情
2.0模块化编程思想：以js文件来分离行为，每个模块做一类事情
3.0组件化编程思想：以组件来分离行为，每个组件拥有独立的结构style，视图html和行为js，
                代表一个完整的个体
组件的嵌套：每一个项目由多个组件拼接而成，每个组件负责一块功能，组件之间相互独立，

通过特定的方式进行交流
如何实现组件化：
1.组件内部封装一类事情的完整逻辑
2.组件通过向外提供接口与外部沟通
总结：
组件化的目的：让项目功能高度封装又相互独立(高内聚低耦合)
进阶的方式：重点在提高效率，而不是全而不精

使用样式控制页面跳转后的显示与遮盖
使用localstorage保存用户token
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
