<template>
  <g-layout class="wrapper-home">
    <g-header class="wrapper-guide">
      <g-navmenu></g-navmenu>
    </g-header>
    <g-content class="wrapper-main">
      <g-layout class="wrapper-main-layout">
        <g-sider class="sider-right">
          <g-dancer></g-dancer>
        </g-sider>
        <g-content class="content">
          <router-view></router-view>
        </g-content>
        <g-sider class="sider-left">
          <g-dancer></g-dancer>
        </g-sider>
      </g-layout>
    </g-content>
    <!-- <g-footer class="wrapper-footer">footer</g-footer> -->
  </g-layout>
</template>

<script>
import gContent from "@/components/layout/content";
import gFooter from "@/components/layout/footer";
import gHeader from "@/components/layout/header";
import gLayout from "@/components/layout/layout";
import gSider from "@/components/layout/sider";
import gDancer from "@/components/dancer";
import gNavmenu from "@/components/navmenu";
export default {
  name: "Layout",
  components: {
    gContent,
    // gFooter,
    gHeader,
    gLayout,
    gSider,
    gNavmenu,
    gDancer
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  &-home {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-width: 1000px;
  }
  &-guide {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    height: 3.6rem;
    line-height: 2.2rem;
    z-index: 20;
  }
  &-main {
    margin-top: 3.6rem;
    &-layout {
      > .content {
        border: 1px solid gainsboro;
        height: calc(100vh - 3.6rem);
        width: 70%;
      }
      > .sider {
        &-right {
          width: 15%;
        }
        &-left {
          width: 15%;
        }
      }
    }
  }
  //   &-footer {
  //     background-color: lightskyblue;
  //     height: 100px;
  //   }
}
</style>