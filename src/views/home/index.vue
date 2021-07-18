<template>
  <el-container class="container-out">
    <el-aside style="width: 220px">
      <el-menu
        style="height: 100%"
        default-active="1"
        @select="selectMenu"
        class="el-menu-vertical-demo"
        background-color="#555"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index) in menuList"
          v-bind:key="index"
          :index="index + 1 + ''"
        >
          <img
            class="icon-pic"
            :src="require('@/assets/imgs/' + item.icon + '.png')"
            alt
          />
          <span slot="title" v-text="item.name"></span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header">
          <i class="el-icon-bell"></i>
          <span>您好，{{ userName }}</span>
          <div class="avatar">
            <i class="el-icon-user"></i>
          </div>
        </div>
      </el-header>
      <el-main class="main-container" style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      menuList: [],
      userName: sessionStorage.getItem("userName"),
      menuActive: "1"
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      axios
        .get(`${this.$apiOrigin}/getMenuList`)
        .then(res => {
          this.menuList = res.data;
          console.log(this.menuList);
        })
        .catch(err => {});
    },
    selectMenu(index) {
      let path = this.menuList[index - 1].path;
      this.$router.push({ path: path, query: { selected: index } });
    }
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
.my-popover {
  width: 400px;
}
.container-out {
  position: relative;
  border: solid 1px #ddd;
  height: 100%;
}

.el-menu-vertical-demo .el-menu-item.is-active {
  background-color: #191d2c !important;
}

.el-header {
  padding: 0 !important;
}

.header {
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #6d7fe4;
  color: #fff;
  border-bottom: solid 1px #6d7fe4;
}

.header .el-icon-bell {
  font-size: 18px;
  margin-right: 20px;
}

.header .el-icon-user {
  font-size: 26px;
}

.header .avatar {
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: solid 1px #ddd;
  margin-left: 5px;
  margin-right: 20px;
}

.el-main {
  position: relative;
}

.monitoring-scheme {
  color: #4f4febd1;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px;
}

.monitoring-scheme-select {
  margin-left: 20px;
}

.main-container .el-scrollbar,
.main-container .el-scrollbar__view {
  height: 100%;
}

.main-container .el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: scroll;
}

.icon-pic {
  width: 18px;
  height: 18px;
  margin-right: 20px;
}
</style>
