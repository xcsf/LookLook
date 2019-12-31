<template>
  <div class="wrapper">
    <g-canvas ref="gcanvas"></g-canvas>
  </div>
</template>

<script>
import gCanvas from "./canvas";
export default {
  name: "rotatedGraphics",
  components: {
    gCanvas
  },
  data() {
    return {
      canvas: null,
      gl: null,
      a_Position: null,
      u_FragColor: null,
      u_xformMatrix: null,
      vertexBuffer: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "uniform mat4 u_xformMatrix;\n" +
        "void main() {\n" +
        "  gl_Position = u_xformMatrix * a_Position;\n" +
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
      speedRad: 0,
      vertices: new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]),
      xformMatrix: new Float32Array([
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0
      ])
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
    this.init(this.gl);
  },
  methods: {
    init(gl) {
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
      // Pass the rotation matrix to the vertex shader
      this.u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");
      if (!this.u_xformMatrix) {
        console.log("Failed to get the storage location of u_xformMatrix");
        return;
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (this.initVertexBuffers(gl) < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
      }
      this.start();
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
      // Assign the buffer object to a_Position letiable
      gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 0, 0);
      // Enable the assignment to a_Position letiable
      gl.enableVertexAttribArray(this.a_Position);
    },
    start(event) {
      //   let x = event.clientX; // x coordinate of a mouse pointer
      //   let y = event.clientY; // y coordinate of a mouse pointer
      //   let rect = event.target.getBoundingClientRect();
      //   x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      //   y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);
      //   this.colors.push([Math.random(), Math.random(), Math.random(), 1.0]);
      setInterval(() => {
        this.rotatedGraphics();
        this.draw();
      }, 16);
    },
    draw() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.POINTS, 0, 9);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 9);
    },
    rotatedGraphics() {
      //   let xformMatrix = new Float32Array([
      //     cosB,
      //     sinB,
      //     0.0,
      //     0.0,
      //     -sinB,
      //     cosB,
      //     0.0,
      //     0.0,
      //     0.0,
      //     0.0,
      //     1.0,
      //     0.0,
      //     0.0,
      //     0.0,
      //     0.0,
      //     1.0
      //   ]);

      if (this.xformMatrix[12] >= 0.5 || this.xformMatrix[12] <= -0.5) {
        this.gl.uniform4fv(this.u_FragColor, [
          Math.random(),
          Math.random(),
          Math.random(),
          0.5
        ]);
        this.speedX = -this.speedX;
      }
      if (this.xformMatrix[13] >= 0.5 || this.xformMatrix[13] <= -0.5) {
        this.gl.uniform4fv(this.u_FragColor, [
          Math.random(),
          Math.random(),
          Math.random(),
          0.5
        ]);
        this.speedY = -this.speedY;
      }
      this.xformMatrix[12] += this.speedX;
      this.xformMatrix[13] += this.speedY;
      // Create a rotation matrix
      let radian = (Math.PI * this.speedRad++) / 180.0; // Convert to radians
      let cosB = Math.cos(radian),
        sinB = Math.sin(radian);
      this.xformMatrix[0] = cosB;
      this.xformMatrix[1] = sinB;
      this.xformMatrix[4] = -sinB;
      this.xformMatrix[5] = cosB;
      // Note: WebGL is column major order
      this.gl.uniformMatrix4fv(this.u_xformMatrix, false, this.xformMatrix);
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