const fs = require("fs");
const path = require("path");
const endOfLine = require("os").EOL;
const render = require("json-templater/string"); // 模板渲染
const chalk = require("chalk"); // 控制台打印带颜色信息

// 获取标准版配置
const { STANDERD_IMPORT, STANDERD_ROUTERS } = require("./standerd");

// 获取客制化配置
const CLIENT = process.env.CLIENT || "";
console.log(CLIENT);
if (CLIENT) {
  var { CLIENT_IMPORT, CLIENT_ROUTERS } = require(`./client/${CLIENT}`);
} else {
  var { CLIENT_IMPORT, CLIENT_ROUTERS } = {
    CLIENT_IMPORT: {},
    CLIENT_ROUTERS: {}
  };
}

// 获取版本信息
let versionConfig;
if (CLIENT) {
  versionConfig = require(`./client/${CLIENT}/info`);
} else {
  versionConfig = require(`./standerd/info`);
}
console.log(
  chalk.yellow(
    `当前执行版本信息：${versionConfig.clientFullName}-${versionConfig.version}`
  )
);
console.log(chalk.yellow(`编译时间：${versionConfig.packageTime}`));

// 生成router/importViews.js
const IMPORT_VIEWS_PATH = path.join(__dirname, "../src/router/importViews.js");
const IMPORT_VIEWS_IMPORT_TEMPLATE =
  "const {{name}} = resolve => require(['{{path}}'], resolve)";
const IMPORT_VIEWS_MAIN_TEMPLATE = `/* 由build/buildViews.js自动生成 */
// 引入所有页面组件
{{include}}

// 导出所有页面
export {
    {{list}}
}`;

// 以客制化为标准，更新标准文件,替换或新增
let useViews = {};
if (CLIENT) {
  // 新增客制化组件,组合为新的文件信息
  useViews = Object.assign(STANDERD_IMPORT, CLIENT_IMPORT.update);
  // 删除不需要的标准组件
  CLIENT_IMPORT.delete.forEach(name => {
    if (useViews[name]) delete useViews[name];
  });
} else {
  useViews = STANDERD_IMPORT;
}

let importAllViewsArr = [];
let importAllViewsNameArr = [];
// 生成const 定义 [Login = resolve => require(['./src/login'], resolve),Home = resolve => require(['./src/home'], resolve)]
Object.keys(useViews).forEach(name => {
  importAllViewsArr.push(
    render(IMPORT_VIEWS_IMPORT_TEMPLATE, {
      name: name,
      path: useViews[name]
    })
  );
  importAllViewsNameArr.push(`${name}`);
});
// 生成主模板
console.log("替换定制", CLIENT_IMPORT.update);
let importMainTemplate = render(IMPORT_VIEWS_MAIN_TEMPLATE, {
  include: importAllViewsArr.join(endOfLine),
  list: importAllViewsNameArr.join(`,${endOfLine}`)
});
fs.writeFileSync(IMPORT_VIEWS_PATH, importMainTemplate);

//---------------------生成router/router.js-------------------------------------------
const CLIENT_ROUTER_PATH = path.join(__dirname, "../src/router/router.js");
const CLIENT_ROUTER_IMPORT_TEMPLATE = "import {{name}} from '{{path}}';";
// 默认路由模板
const CLIENT_ROUTER_MAIN_TEMPLATE = `/* 由build/buildViews.js自动生成 */
import { Layout } from './importViews.js';
import { Login } from './importViews.js';
import { Home } from './importViews.js';
import BaseRouter from './standerd/index.js';
{{include}}

export default {
  path: "/",
  redirect: "/login",
  component: Layout,
  children: [
    {
      path: "/login",
      meta: {
        name: "login"
      },
      component: Login
    },
    {
      path: "/home",
      meta: {
        name: "home"
      },
      component: Home,
      children: [
        ...BaseRouter,
        {{list}}
      ]
    }
  ]
};`;
// 客制化新增文件
let importAllRoutersArr = [];
if (CLIENT) {
  // 生成const [import System from './standerd/system';]
  console.log("增加定制", CLIENT_IMPORT.add);
  Object.keys(CLIENT_IMPORT.add).forEach(key => {
    importAllRoutersArr.push(
      render(CLIENT_ROUTER_IMPORT_TEMPLATE, {
        name: key,
        path: CLIENT_IMPORT.add[key]
      })
    );
  });
}
// 生成主模板
let importMainRouterTemplate = render(CLIENT_ROUTER_MAIN_TEMPLATE, {
  include: importAllRoutersArr.join(endOfLine),
  list: Object.keys(CLIENT_IMPORT.add ? CLIENT_IMPORT.add : {}).join(
    `,${endOfLine}`
  )
});
fs.writeFileSync(CLIENT_ROUTER_PATH, importMainRouterTemplate);

// 生成模板信息
const VERSION_CONFIG_OUTPUT_PATH = path.join(__dirname, "../static/version.js");
fs.writeFileSync(VERSION_CONFIG_OUTPUT_PATH, JSON.stringify(versionConfig));
