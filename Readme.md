# 利用gulp-webpack搭建的vue简易脚手架
这只是个人自学下gulp以及webpack所做的一个练手项目，仅用于参考，尚有许多bug以及缺陷。

支持热替换、js打包、css打包抽离等功能

用gulp进行自动化执行任务的功能，在这里则只是将lib文件内的js文件打包、启动webpack-dev-server服务器、启动浏览器等功能；而webpack则用来分析src文件夹下各个模块之间的依赖关系，并根据它们之间的依赖关系打包，同时编译vue文件以及处理css文件等

## 运行
```
npm install
npm run dev
```