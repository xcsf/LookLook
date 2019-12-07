<template>
  <div class="marked-wrapper">
    <div class="content">
      <textarea class="edit"></textarea>
      <div class="display"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
export default {
  name: "Marked",
  data() {
    return {
      text: "## hello",
      inputText: "",
      oTextarea: null,
      oDisplay: null
    };
  },
  mounted() {
    this.oTextarea = this.$el.querySelector(".edit");
    this.oDisplay = this.$el.querySelector(".display");
    this.oTextarea.addEventListener("keyup", this.onInput);
  },
  methods: {
    onInput(e) {
      console.log();
      this.oDisplay.innerHTML = marked(this.oTextarea.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.marked-wrapper {
  height: 100%;
}
.content {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  & .edit {
    // display: block;
    width: 50%;
    resize: none;
    outline: none;
    font-size: 20px;
    line-height: 1.5;
    border-radius: 5px;
    margin: 5px;
    padding-left: 5px;
    padding-right: 5px;
    box-shadow: 0 0 5px black;
  }
  & .display {
    width: 50%;
    border-radius: 5px;
    margin: 5px;
    box-shadow: 0 0 5px black;
  }
}
</style>