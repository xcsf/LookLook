<template>
  <div class="wrapper">
    <g-canvas ref="gcanvas"></g-canvas>
  </div>
</template>

<script>
import gCanvas from "./canvas";
export default {
  name: "moveGraphics",
  components: {
    gCanvas
  },
  data() {
    return {
      canvas: null,
      gl: null,
      a_Position: null,
      u_FragColor: null,
      u_Translation: null,
      vertexBuffer: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "uniform vec4 u_Translation;\n" +
        "void main() {\n" +
        "  gl_Position = a_Position + u_Translation;\n" +
        "  gl_PointSize = 10.0;\n" +
        "}\n",
      FSHADER_SOURCE:
        "precision mediump float;\n" +
        "uniform vec4 u_FragColor;\n" +
        "void main() {\n" +
        "  gl_FragColor = u_FragColor;\n" +
        "}\n",
      points: [],
      colors: [],
      offset: [0.0, 0.0, 0.0],
      speedX: 10,
      speedY: 10,
      vertices: new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5])
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
    this.speedX = this.speedX / this.canvas.width;
    this.speedY = this.speedY / this.canvas.height;
    this.draw(this.gl);
  },
  methods: {
    draw(gl) {
      this.a_Position = gl.getAttribLocation(gl.program, "a_Position");
      if (this.a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
      }
      this.u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
      if (!this.u_FragColor) {
        console.log("Failed to get the storage location of u_FragColor");
        return;
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (this.initVertexBuffers(gl) < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
      }
      this.u_Translation = gl.getUniformLocation(gl.program, "u_Translation");
      this.canvas.addEventListener("mousedown", this.onClick);
    },
    initVertexBuffers(gl) {
      this.vertexBuffer = gl.createBuffer();
      if (!this.vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
      }
      // Bind the buffer object to target
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      // Write date into the buffer object
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
      // Assign the buffer object to a_Position variable
      gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 0, 0);
      // Enable the assignment to a_Position variable
      gl.enableVertexAttribArray(this.a_Position);
    },
    onClick(event) {
      //   let x = event.clientX; // x coordinate of a mouse pointer
      //   let y = event.clientY; // y coordinate of a mouse pointer
      //   let rect = event.target.getBoundingClientRect();
      //   x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      //   y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);
      //   this.colors.push([Math.random(), Math.random(), Math.random(), 1.0]);
      setInterval(() => {
        this.moveTrangle();
        this.gl.uniform4f(
          this.u_Translation,
          this.offset[0],
          this.offset[1],
          this.offset[2],
          0.0
        );
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        // Draw
        this.gl.drawArrays(this.gl.POINTS, 0, 3);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
      }, 16);
    },
    moveTrangle() {
      if (this.offset[0] + 0.5 >= 1.0 || this.offset[0] - 0.5 <= -1.0) {
        this.speedX = -this.speedX;
      }
      if (this.offset[1] + 0.5 >= 1.0 || this.offset[1] - 0.5 <= -1.0) {
        this.speedY = -this.speedY;
      }
      this.offset[0] += this.speedX;
      this.offset[1] += this.speedY;
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
  position: relative;
}
</style>