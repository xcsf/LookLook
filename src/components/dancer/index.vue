<template>
  <div class="stage" :style="{top}">
    <canvas class="stage-dancerone" id="dancerone"></canvas>
    <canvas class="stage-dancertwo" id="dancertwo"></canvas>
  </div>
</template>

<script>
export default {
  name: "JustDance",
  data() {
    return {
      top: null
    };
  },
  mounted() {
    setTimeout(() => {
      window.xxx(this.$el.querySelector("#dancerone"));
      window.xxx(this.$el.querySelector("#dancertwo"));
    }, 1000);
    window.addEventListener("scroll", this.onscroll);
    this.top = window.scrollY + "px";
  },
  methods: {
    onscroll(e) {
      this.top = window.scrollY + "px";
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onscroll);
  }
};
</script>

<style lang="scss" scoped>
.stage {
  position: absolute;
  height: 100%;
  & .dancer-wrapper {
    position: fixed;
  }
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