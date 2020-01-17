<template>
  <header class="wrapper">
    <h1>
      <router-link to="/">
        <img :src="icon" alt />
      </router-link>
    </h1>
    <div class="wrapper-links">
      <el-menu class="link" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">
            <router-link to="/game1">Game1</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/marked">Marked</router-link>
          </el-menu-item>
          <el-submenu index="2-3">
            <template slot="title">WebGL</template>
            <el-menu-item index="2-3-1">
              <router-link to="/clickPoints">ClickPoints</router-link>
            </el-menu-item>
            <el-menu-item index="2-3-2">
              <router-link to="/multiGraphics">MultiGraphics</router-link>
            </el-menu-item>
            <el-menu-item index="2-3-3">
              <router-link to="/moveGraphics">MoveGraphics</router-link>
            </el-menu-item>
            <el-menu-item index="2-3-4">
              <router-link to="/rotatedGraphics">RotatedGraphics</router-link>
            </el-menu-item>
            <el-menu-item index="2-3-5">
              <router-link to="/loadTextured">LoadTextured</router-link>
            </el-menu-item>
            <el-menu-item index="2-3-6">
              <router-link to="/look3dTriangles">Look3dTriangles</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4">
          <a href="#" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
export default {
  name: "navmenu",
  data() {
    return {
      activeIndex: "1",
      icon: require("@/assets/logo.png")
    };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
  color: inherit;
  outline: none;
  text-decoration: none;
  display: block;
}
.wrapper {
  user-select: none;
  position: absolute;
  width: 100%;
  > h1 {
    margin-left: 250px;
    line-height: 3.6rem;
    float: left;
    height: 3.6rem;
    > a {
      height: 3.6rem;
      display: block;
      > img {
        height: 3.6rem;
        line-height: 3.6rem;
        vertical-align: sub;
      }
    }
  }
  &-links {
    height: 100%;
    width: 100%;
    > .link {
      height: 3.6rem;
      float: right;
      width: 500px;
    }
  }
}
</style>