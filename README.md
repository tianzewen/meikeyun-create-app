#魅客云 初始项目

本项目意在初始化一个拥有基本调试功能，服务器端渲染的库

##项目运行
在根目录安装依赖：npm i
然后运行：npm start 或 node ./server/index.js

##项目配置
主要的配置在config中，包含了服务器配置（app.config.js）和各种情况下的webpack配置
在服务器配置中：
1.SSR用来设置当前是否开启Server Side Render（服务器端渲染）
2.DEBUG用来设置当前是否开始调试模式
3.PORT是使用什么端口来运行静态资源服务（或渲染服务）
注：其他配置请勿改动
注：在./client/preset中的config文件只是服务器端运行的代码的配置项