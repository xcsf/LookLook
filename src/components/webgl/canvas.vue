<template>
  <div class="wrapper">
    <canvas id="webgl">Please use a browser that supports "canvas"</canvas>
  </div>
</template>

<script>
export default {
  name: "WebGL",
  data() {
    return {
      canvas: null,
      gl: null
    };
  },
  created() {},
  mounted() {
    this.canvas = this.$el.querySelector("canvas");
    this.onresize();
    // this.initWebGL();
    // this.draw();
    // window.addEventListener("resize", this.onresize);
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
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.canvas.onmousedown = this.onClick;
    },
    onClick(event) {
      var x = event.clientX; // x coordinate of a mouse pointer
      var y = event.clientY; // y coordinate of a mouse pointer
      var rect = event.target.getBoundingClientRect();
      x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);
      console.log({ x, y });
      this.points.push(x);
      this.points.push(y);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      var len = this.points.length;
      for (var i = 0; i < len; i += 2) {
        // Pass the position of a point to a_Position variable
        this.gl.vertexAttrib3f(
          this.a_Position,
          this.points[i],
          this.points[i + 1],
          0.0
        );
        // Draw
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
      }
    },
    initWebGL() {
      this.gl = this.canvas.getContext("webgl");
      if (!this.gl) {
        alert(
          "Unable to initialize WebGL. Your browser or machine may not support it."
        );
      }
    },
    initShaders(gl, vshader, fshader) {
      let program = this.createProgram(gl, vshader, fshader);
      if (!program) {
        console.log("Failed to create program");
        return false;
      }
      gl.useProgram(program);
      gl.program = program;
      return true;
    },
    createProgram(gl, vshader, fshader) {
      // Create shader object
      var vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshader);
      var fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshader);

      if (!vertexShader || !fragmentShader) {
        return null;
      }
      // Create a program object
      var program = gl.createProgram();
      if (!program) {
        return null;
      }
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        let info = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        throw "WebGL program 不能编译. \n\n" + info;
      }
      return program;
    },
    loadShader(gl, type, source) {
      let shader = gl.createShader(type);
      if (shader == null) {
        console.log("unable to create shader");
        return null;
      }
      // Set the shader program
      gl.shaderSource(shader, source);

      // Compile the shader
      gl.compileShader(shader);
      // Check the result of compilation
      var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log("Failed to compile shader: " + error);
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    onresize() {
      let width = getComputedStyle(this.$el).getPropertyValue("width");
      let height = getComputedStyle(this.$el).getPropertyValue("height");
      this.canvas.width = width.slice(0, -2);
      this.canvas.height = height.slice(0, -2);
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>