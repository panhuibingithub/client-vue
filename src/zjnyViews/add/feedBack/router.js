const FeedBack = resolve =>
  require(["@/zjnyViews/add/feedBack/index"], resolve);

export default {
  path: "feedBack",
  meta: {
    name: "FeedBack"
  },
  component: FeedBack
};
