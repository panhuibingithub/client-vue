<template>
  <div class="task-center">
    任务中心 STD （加法计算）
    <el-input type="text" placeholder="" v-model="a" />
    <el-input type="text" placeholder="" v-model="b" />
    <el-button @click="calc">计算</el-button>
    结果为：{{ count }}
  </div>
</template>

<script>
export default {
  name: "TaskCenter",
  components: {},
  data() {
    return {
      a: 100,
      b: 100,
      count: 0
    };
  },
  mounted() {},
  methods: {
    calc() {
      this.count = parseInt(this.a) + parseInt(this.b);
    }
  }
};
</script>
<style lang="scss"></style>
