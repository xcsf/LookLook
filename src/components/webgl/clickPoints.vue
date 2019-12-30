<template>
  <div class="wrapper">
    <g-canvas ref="gcanvas"></g-canvas>
  </div>
</template>

<script>
import gCanvas from "./canvas";
export default {
  name: "WebGL",
  components: {
    gCanvas
  },
  data() {
    return {
      canvas: null,
      gl: null,
      a_Position: null,
      u_FragColor: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "void main() {\n" +
        "  gl_Position = a_Position;\n" +
        "  gl_PointSize = 10.0;\n" +
        "}\n",
      FSHADER_SOURCE:
        "precision mediump float;\n" +
        "uniform vec4 u_FragColor;\n" +
        "void main() {\n" +
        "  gl_FragColor = u_FragColor;\n" +
        "}\n",
      points: [],
      colors: []
    };
  },
  created() {},
  mounted() {
    this.gl = this.$refs.gcanvas.gl;
    this.canvas = this.$refs.gcanvas.canvas;
    if (
      !this.$refs.gcanvas.initShaders(
        this.gl,
        this.VSHADER_SOURCE,
        this.FSHADER_SOURCE
      )
    ) {
      console.log("Failed to intialize shaders.");
      return;
    }
    this.draw();
  },
  methods: {
    draw() {
      this.a_Position = this.gl.getAttribLocation(
        this.gl.program,
        "a_Position"
      );
      if (this.a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
      }
      this.u_FragColor = this.gl.getUniformLocation(
        this.gl.program,
        "u_FragColor"
      );
      if (!this.u_FragColor) {
        console.log("Failed to get the storage location of u_FragColor");
        return;
      }
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.canvas.addEventListener("mousedown", this.onClick);
    },
    onClick(event) {
      for (let j = 0; j < 1000; j++) {
        this.points.push([Math.random(), Math.random()]);
        this.colors.push([Math.random(), Math.random(), Math.random(), 1.0]);
      }
      var x = event.clientX; // x coordinate of a mouse pointer
      var y = event.clientY; // y coordinate of a mouse pointer
      var rect = event.target.getBoundingClientRect();
      x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);
      console.log({ x, y });
      this.points.push([x, y]);
      this.colors.push([Math.random(), Math.random(), Math.random(), 1.0]);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      let len = this.points.length;
      for (var i = 0; i < len; i++) {
        // Pass the position of a point to a_Position variable
        this.gl.vertexAttrib3f(
          this.a_Position,
          this.points[i][0],
          this.points[i][1],
          0.0
        );
        this.gl.uniform4fv(this.u_FragColor, this.colors[i]);
        // Draw
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
      }
    }
  },
  beforeDestroy() {
    this.canvas.removeEventListener("mousedown", this.onClick);
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>