/**
 * 针对引入组件页面的配置（router/importViews.js）
 * update:需要更新的页面地址
 * delete：需要删除的引用地址
 */
const CLIENT_IMPORT = {
  update: {
    //配置替换view文件路径
    TaskCenter: "@/zjnyViews/update/taskCenter/index.vue", // 在标准版本的基础上替换
    ReportCenter: "@/zjnyViews/update/reportCenter/index.vue" // 在标准版本的基础上替换
  },
  add: {
    //配置路由对象路径
    FeedBack: "@/zjnyViews/add/feedBack/router.js",
    FeedBack2: "@/zjnyViews/add/feedBack2/router.js"
  },
  delete: []
};
module.exports = {
  CLIENT_IMPORT
};
