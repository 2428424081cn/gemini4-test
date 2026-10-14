# gemini4-test

11 个 HTML 测试页面的阿里云 ESA Edge Routine 项目：展示首页 + 10 个风格页面，完整保留原 CSS、JavaScript 和共享资源。

## 从 GitHub 导入

- 仓库：`https://github.com/2428424081cn/gemini4-test`
- 分支：`main`
- 项目根目录：`/`
- 配置文件：`esa.jsonc`
- 函数入口：`src/index.js`
- 如导入界面要求构建命令，填写 `npm run build`。
- 函数入口已预先生成，无运行时依赖，无需源站或 Node.js 服务器。
- 首页路径 `/`；其他页面路径 `/style-01-cyberpunk/` 至 `/style-10-claymorphism/`。

如控制台提供函数代码上传或在线编辑，可直接使用 `src/index.js`。ZIP 为完整项目源码包；GitHub 导入使用仓库根目录。

## 修改与校验

编辑 `public/` 内的网站源码后，执行：

```sh
npm run build
npm test
```

打包入口包含全部 HTML、CSS 和 JS，支持目录首页、补齐目录斜杠、GET/HEAD 及真实 404。网页中的 Google Fonts 等外部资源仍需要浏览器访问对应服务。评分数据沿用原页面的浏览器本地存储行为。

ESA 配置和 `export default { fetch(request) }` 接口参考阿里官方模板：
https://github.com/aliyun/alibabacloud-esa-er-templates/tree/master/functions/hello_world
