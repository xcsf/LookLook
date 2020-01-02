<template>
  <div class="wrapper">
    <g-canvas ref="gcanvas"></g-canvas>
  </div>
</template>

<script>
import gCanvas from "./canvas";
import { Matrix4 } from "@/util/cuon-matrix.js";
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
      u_ModelMatrix: null,
      vertexBuffer: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "uniform mat4 u_ModelMatrix;\n" +
        "void main() {\n" +
        "  gl_Position = u_ModelMatrix * a_Position;\n" +
        "  gl_PointSize = 10.0;\n" +
        "}\n",
      FSHADER_SOURCE:
        "precision mediump float;\n" +
        "uniform vec4 u_FragColor;\n" +
        "void main() {\n" +
        "  gl_FragColor = u_FragColor;\n" +
        "}\n",
      colors: [],
      g_last: Date.now(),
      speedX: 10,
      speedY: 10,
      speedAngle: 90,
      curAngle: 0.0,
      curX: 0.0,
      curY: 0.0,
      vertices: new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]),
      modelMatrix: new Matrix4()
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
      this.u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
      if (!this.u_ModelMatrix) {
        console.log("Failed to get the storage location of u_ModelMatrix");
        return;
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (this.initVertexBuffers(gl) < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
      }
      console.log(1);
      this.tick();
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
    tick(event) {
      //   let x = event.clientX; // x coordinate of a mouse pointer
      //   let y = event.clientY; // y coordinate of a mouse pointer
      //   let rect = event.target.getBoundingClientRect();
      //   x = (x - rect.left - this.canvas.width / 2) / (this.canvas.width / 2);
      //   y = (this.canvas.height / 2 - (y - rect.top)) / (this.canvas.height / 2);
      //   this.colors.push([Math.random(), Math.random(), Math.random(), 1.0]);

      this.rotatedGraphics();
      this.draw(); // Draw the triangle
      requestAnimationFrame(this.tick, this.canvas); // Request that the browser calls tick
    },
    draw() {
      this.gl.uniformMatrix4fv(this.u_ModelMatrix, false, this.modelMatrix.elements);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.POINTS, 0, 9);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 9);
    },
    // Last time that this function was called
    animate(angle) {
      // Calculate the elapsed time
      let now = Date.now();
      let elapsed = now - this.g_last;
      this.g_last = now;
      // Update the current rotation angle (adjusted by the elapsed time)
      let newAngle = angle + (this.speedAngle * elapsed) / 1000.0;
      return (newAngle %= 360);
    },
    rotatedGraphics() {
      this.curAngle = this.animate(this.curAngle);
      if (this.curX >= 0.5 || this.curX <= -0.5) {
        this.gl.uniform4fv(this.u_FragColor, [
          Math.random(),
          Math.random(),
          Math.random(),
          0.5
        ]);
        this.speedX = -this.speedX;
      }
      if (this.curY >= 0.5 || this.curY <= -0.5) {
        this.gl.uniform4fv(this.u_FragColor, [
          Math.random(),
          Math.random(),
          Math.random(),
          0.5
        ]);
        this.speedY = -this.speedY;
      }
      this.curX += this.speedX;
      this.curY += this.speedY;
      this.modelMatrix.setTranslate(this.curX, this.curY, 0); // Multiply modelMatrix by the calculated translation matrix
      this.modelMatrix.rotate(this.curAngle, 0, 0, 1); // Rotation angle, rotation axis (0, 0, 1)
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