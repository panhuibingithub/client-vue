<template>
  <!-- 页面模板无修改情况，整体可以去掉 template -->
  <div class="task-center">
    任务中心 STD （加法计算）
    继承覆盖逻辑为乘法（页面模板无修改情况，整体可以去掉 template）
    <el-input type="text" placeholder="" v-model="a" />
    <el-input type="text" placeholder="" v-model="b" />
    <el-button @click="calc">计算</el-button>
    结果为：{{ count }}
  </div>
</template>
<script>
// 使用Vue继承思路，页面内容
import TaskCenter from "@/views/home/taskCenter";
export default {
  extends: TaskCenter,
  methods: {
    calc() {
      this.count = parseInt(this.a) * parseInt(this.b);
    }
  }
};
</script>
