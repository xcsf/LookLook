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
      gl: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "void main() {\n" +
        "  gl_Position = a_Position;\n" +
        "  gl_PointSize = 10.0;\n" +
        "}\n",
      FSHADER_SOURCE:
        "void main() {\n" +
        "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
        "}\n"
    };
  },
  mounted() {
    this.initWebGL();
  },
  methods: {
    initWebGL() {
      this.canvas = this.$el.querySelector("canvas");
      this.gl = this.canvas.getContext("webgl");
      if (!this.gl) {
        alert(
          "Unable to initialize WebGL. Your browser or machine may not support it."
        );
      }
      if (
        !this.initShaders(this.gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE)
      ) {
        console.log("Failed to intialize shaders.");
        return;
      }
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    },
    initShaders(gl, vshader, fshader) {
      let program = this.createProgram(gl, vshader, fshader);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  & canvas {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>