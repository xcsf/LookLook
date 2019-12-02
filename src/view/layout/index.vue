<template>
  <g-layout style="color: white;">
    <g-header style="height: 50px; background:lightskyblue;">header</g-header>
    <g-content style="height: 100px; background:deepskyblue;">content</g-content>
    <g-footer style="height: 50px; background:lightskyblue;">footer</g-footer>
  </g-layout>
</template>

<script>
import gContent from "@/components/layout/content";
import gFooter from "@/components/layout/footer";
import gHeader from "@/components/layout/header";
import gLayout from "@/components/layout/layout";
export default {
  name: "Layout",
  components: {
    gContent,
    gFooter,
    gHeader,
    gLayout
  }
};
</script>

<style>
</style>