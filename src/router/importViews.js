/* 由build/buildViews.js自动生成 */
// 引入所有页面组件
const Layout = resolve => require(['@/layout/index'], resolve)
const Home = resolve => require(['@/views/home'], resolve)
const Login = resolve => require(['@/views/login'], resolve)
const TaskCenter = resolve => require(['@/views/home/taskCenter'], resolve)
const ReportCenter = resolve => require(['@/views/home/reportCenter'], resolve)

// 导出所有页面
export {
    Layout,
Home,
Login,
TaskCenter,
ReportCenter
}