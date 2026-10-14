# gemini4-test

十种前端风格全景测试网站：一个测试舱首页和十个独立 HTML 页面。全部页面使用 UTF-8，CSS 和 JavaScript 内嵌，无需安装前端依赖。

## 阿里云 ESA 导入

- 分支：`main`
- 项目根目录：`/`
- 配置文件：`esa.jsonc`
- 函数入口：`src/index.js`
- 构建命令：`npm run build`
- 首页路径：`/`

从首页可以打开全部风格页面，包括新粗野主义、赛博朋克、瑞士排版、毛玻璃、复古桌面、东方禅意、高定腕表、粘土游乐场、CRT 终端和动态音乐节。

## 修改和验证

编辑 `public/` 中的 HTML 后运行：

```sh
npm run build
npm test
```

构建时严格检查 UTF-8 和乱码字符，测试验证全部页面、内部链接、响应头、HEAD 和错误请求。生成的函数包含全部页面内容，返回 `text/html; charset=utf-8`。
