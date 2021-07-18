let express = require("express");
let app = express();
app.use(express.static("web")).listen(8000, () => {
  console.log("服务在8000端口开启");
});
const createData = () => {
  let list = [];
  list.push(
    {
      icon: "rocket",
      name: "任务中心",
      path: "/home/taskCenter"
    },
    {
      icon: "trend",
      name: "报告中心",
      path: "/home/reportCenter"
    },
    {
      icon: "trend",
      name: "问题反馈",
      path: "/home/feedback"
    },
    {
      icon: "trend",
      name: "问题反馈2",
      path: "/home/feedback2"
    }
  );
  return list;
};
app.get("/getMenuList", (req, res) => {
  res.send(createData());
});
