<template>
  <div class="wrapper">
    <div id="catch-the-cat"></div>
  </div>
</template>
<script>
export default {
  name: "game",
  data() {
    return {
      oScript3: document.createElement("script")
    };
  },
  methods: {},
  created() {},
  mounted() {
    this.oScript3.type = "text/javascript";
    this.oScript3.innerText = `
        new CatchTheCatGame({
            w: 11,
            h: 11,
            r: 20,
            backgroundColor: 0xeeeeee,
            parent: "catch-the-cat",
            statusBarAlign: "center",
            credit: "xcsf"
          });
          `;
    document.body.appendChild(this.oScript3);
  },
  destroyed() {
    document.body.removeChild(this.oScript3);
  }
};
</script>
<style lang="scss" scoped>
</style>