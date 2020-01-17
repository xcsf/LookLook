<template>
  <div class="wrapper">
    <g-canvas ref="gcanvas"></g-canvas>
  </div>
</template>

<script>
import gCanvas from "./canvas";
import { Matrix4 } from "@/util/cuon-matrix.js";
export default {
  name: "look3dTriangles",
  components: {
    gCanvas
  },
  data() {
    return {
      canvas: null,
      gl: null,
      a_Position: null,
      a_PointSize: null,
      u_FragColor: null,
      a_Color: null,
      u_ModelMatrix: null,
      u_ViewMatrix: null,
      vertexSizeBuffer: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "attribute float a_PointSize;\n" +
        "attribute vec4 a_Color;\n" +
        "varying vec4 v_Color;\n" + // varying variable
        'uniform mat4 u_ViewMatrix;\n' +
        "uniform mat4 u_ModelMatrix;\n" +
        "void main() {\n" +
        "  gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;\n" +
        "  gl_PointSize = a_PointSize;\n" +
        "  v_Color = a_Color;\n" + // Pass the data to the fragment shader
        "}\n",
      FSHADER_SOURCE:
        "precision mediump float;\n" +
        "uniform vec4 u_FragColor;\n" +
        "varying vec4 v_Color;\n" + // Receive the data from the vertex shader
        "void main() {\n" +
        "  gl_FragColor = v_Color;\n" +
        "}\n",
      g_last: Date.now(),
      speedX: 10,
      speedY: 10,
      speedAngle: 90,
      curAngle: 0.0,
      curX: 0.0,
      curY: 0.0,
      verticesSizeColor: new Float32Array([
        // Vertex coordinates and color(RGBA)
        0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
        -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
        0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
    
        0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
        -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
        0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

        0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
        -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
        0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
      ]),
      modelMatrix: new Matrix4(),
      viewMatrix: new Matrix4(),
      curEyeX: 0.0,
      curEyeY: 0.0,
      curEyeZ: 0.25
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
    document.addEventListener("keydown",this.onkeydown)
  },
  methods: {
    init(gl) {
      this.a_Position = gl.getAttribLocation(gl.program, "a_Position");
      if (this.a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
      }
      this.a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
      if (this.a_PointSize < 0) {
        console.log("Failed to get the storage location of a_PointSize");
        return;
      }
    //   this.u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    //   if (!this.u_FragColor) {
    //     console.log("Failed to get the storage location of u_FragColor");
    //     return;
    //   }
      this.a_Color = gl.getAttribLocation(gl.program, "a_Color");
      if (this.a_Color < 0) {
        console.log("Failed to get the storage location of a_Color");
        return -1;
      }
      // Pass the rotation matrix to the vertex shader
      this.u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
      this.u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
      if (!this.u_ViewMatrix || !this.u_ModelMatrix) {
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
      this.tick();
    },
    initVertexBuffers(gl) {
      this.vertexSizeBuffer = gl.createBuffer();
      if (!this.vertexSizeBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
      }
      // Bind the buffer object to target
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexSizeBuffer);
      // Write date into the buffer object
      gl.bufferData(gl.ARRAY_BUFFER, this.verticesSizeColor, gl.STATIC_DRAW);

      let FSIZE = this.verticesSizeColor.BYTES_PER_ELEMENT;
      // Assign the buffer object to a_Position letiable
      gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
      // Enable the assignment to a_Position letiable
      gl.enableVertexAttribArray(this.a_Position);

    //   gl.vertexAttribPointer( this.a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2 );
    //   gl.enableVertexAttribArray(this.a_PointSize);
      
      gl.vertexAttribPointer( this.a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3 );
      gl.enableVertexAttribArray(this.a_Color);
    },
    tick(event) {
      this.rotatedGraphics();
      this.draw(); // Draw the triangle
      requestAnimationFrame(this.tick, this.canvas); // Request that the browser calls tick
    },
    draw() {
      this.gl.uniformMatrix4fv(this.u_ModelMatrix, false, this.modelMatrix.elements);
      this.gl.uniformMatrix4fv(this.u_ViewMatrix, false, this.viewMatrix.elements);

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
        // this.gl.uniform4fv(this.u_FragColor, [
        //   Math.random(),
        //   Math.random(),
        //   Math.random(),
        //   0.5
        // ]);
        this.speedX = -this.speedX;
      }
      if (this.curY >= 0.5 || this.curY <= -0.5) {
        // this.gl.uniform4fv(this.u_FragColor, [
        //   Math.random(),
        //   Math.random(),
        //   Math.random(),
        //   0.5
        // ]);
        this.speedY = -this.speedY;
      }
      this.curX += this.speedX;
      this.curY += this.speedY;
      this.viewMatrix.setLookAt(this.curEyeX, this.curEyeY, this.curEyeZ, 0, 0, 0, 0, 1, 0);
      // this.modelMatrix.setTranslate(this.curX, this.curY, 0); // Multiply modelMatrix by the calculated translation matrix
      this.modelMatrix.setRotate(this.curAngle, 0, 0, 1); // Rotation angle, rotation axis (0, 0, 1)
    },
    onkeydown(e){
      if(e.keyCode == 39) { // The right arrow key was pressed
        this.curEyeX += 0.02;
      } else 
      if (e.keyCode == 37) { // The left arrow key was pressed
        this.curEyeX -= 0.02;
      } else { return; }
      }
  },
  beforeDestroy() {
    this.canvas.removeEventListener("mousedown", this.onClick);
    document.removeEventListener("keydown", this.onkeydown);
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  position: relative;
}
</style>