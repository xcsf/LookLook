<template>
  <g-layout class="wrapper-home">
    <g-header class="wrapper-guide">header</g-header>
    <g-content class="wrapper-main">
      <g-layout class="wrapper-main-layout">
        <g-sider class="sider-right">sider</g-sider>
        <g-content class="content">content</g-content>
        <g-sider class="sider-left">sider</g-sider>
      </g-layout>
    </g-content>
    <g-footer class="wrapper-footer">footer</g-footer>
  </g-layout>
</template>

<script>
import gContent from "@/components/layout/content";
import gFooter from "@/components/layout/footer";
import gHeader from "@/components/layout/header";
import gLayout from "@/components/layout/layout";
import gSider from "@/components/layout/sider";
export default {
  name: "Layout",
  components: {
    gContent,
    gFooter,
    gHeader,
    gLayout,
    gSider
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  &-home {
    height: 100vh;
    min-width: 1300px;
  }
  &-guide {
    background-color: lightskyblue;
    height: 10%;
  }
  &-main {
    height: 80%;
    &-layout {
      height: 100%;
      > .content {
        background-color: lightskyblue;
        height: 100%;
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

  &-footer {
    background-color: lightskyblue;
    height: 10%;
  }
}
</style>