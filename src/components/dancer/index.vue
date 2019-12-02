<template>
  <div class="stage">
    <canvas class="stage-dancerone" id="dancerone"></canvas>
    <canvas class="stage-dancertwo" id="dancertwo"></canvas>
  </div>
</template>

<script>
export default {
  name: "JustDance",
  data() {
    return {};
  },
  mounted() {
    console.log();
    setTimeout(() => {
      window.xxx(this.$el.querySelector("#dancerone"));
      window.xxx(this.$el.querySelector("#dancertwo"));
    }, 1000);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.stage {
  position: absolute;
  height: 100%;
  &-dancerone {
    display: block;
    position: relative;
    width: 100%;
    height: 50%;
    cursor: pointer;
  }
  &-dancertwo {
    display: block;
    position: relative;
    width: 100%;
    height: 50%;
    cursor: pointer;
  }
}
</style>