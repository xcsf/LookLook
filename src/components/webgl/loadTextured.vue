<template>
  <div class="wrapper">
    <g-canvas ref="gcanvas"></g-canvas>
  </div>
</template>

<script>
import gCanvas from "./canvas";
import { Matrix4 } from "@/util/cuon-matrix.js";
export default {
  name: "loadTextured",
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
      vertexSizeBuffer: null,
      VSHADER_SOURCE:
        "attribute vec4 a_Position;\n" +
        "attribute float a_PointSize;\n" +
        "attribute vec2 a_TexCoord;\n" +
        "varying vec2 v_TexCoord;\n" +
        "uniform mat4 u_ModelMatrix;\n" +
        "void main() {\n" +
        "  gl_Position = u_ModelMatrix * a_Position;\n" +
        "  gl_PointSize = a_PointSize;\n" +
        "  v_TexCoord = a_TexCoord;\n" +
        "}\n",
      FSHADER_SOURCE:
        "precision mediump float;\n" +
        "uniform sampler2D u_Sampler;\n" +
        "varying vec2 v_TexCoord;\n" +
        "void main() {\n" +
        "  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n" +
        "}\n",
      g_last: Date.now(),
      speedX: 10,
      speedY: 10 ,
      speedAngle: 45,
      curAngle: 0.0,
      curX: 0.0,
      curY: 0.0,
      verticesSizeColor: new Float32Array([
        -0.5, 0.5,
        10.0,
        0.0, 1.0,
        -0.5, -0.5,
        20.0,
        0.0, 0.0,
        0.5, 0.5,
        30.0,
        1.0, 1.0,
        0.5, -0.5,
        40.0,
        1.0, 0.0
      ]),
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
      this.a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
      if (this.a_PointSize < 0) {
        console.log("Failed to get the storage location of a_PointSize");
        return;
      }
      // Get the storage location of a_TexCoord
      this.a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");
      if (this.a_TexCoord < 0) {
        console.log("Failed to get the storage location of a_TexCoord");
        return -1;
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
      // Set texture
      if (!this.initTextures(gl, 4)) {
        console.log("Failed to intialize the texture.");
        return;
      }
      this.tick();
    },

    initTextures(gl, n) {
      let texture = gl.createTexture(); // Create a texture object
      if (!texture) {
        console.log("Failed to create the texture object");
        return false;
      }

      // Get the storage location of u_Sampler
      let u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
      if (!u_Sampler) {
        console.log("Failed to get the storage location of u_Sampler");
        return false;
      }
      let image = new Image(); // Create the image object
      if (!image) {
        console.log("Failed to create the image object");
        return false;
      }
      // Register the event handler to be called on loading an image
      image.onload = () => {
        this.loadTexture(gl, n, texture, u_Sampler, image);
      };
      // Tell the browser to load an image
      image.src = require("@/assets/sky.jpg");

      return true;
    },
    loadTexture(gl, n, texture, u_Sampler, image) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
      // Enable texture unit0
      gl.activeTexture(gl.TEXTURE0);
      // Bind the texture object to the target
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set the texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // Set the texture image
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

      // Set the texture unit 0 to the sampler
      gl.uniform1i(u_Sampler, 0);

      gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

    //   gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
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
      gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
      // Enable the assignment to a_Position letiable
      gl.enableVertexAttribArray(this.a_Position);
      gl.vertexAttribPointer( this.a_PointSize, 1, gl.FLOAT, false, FSIZE * 5, FSIZE * 2 );
      gl.enableVertexAttribArray(this.a_PointSize);
      gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
      gl.enableVertexAttribArray(this.a_TexCoord);  // Enable the assignment of the buffer object
    },
    tick(event) {
      this.rotatedGraphics();
      this.draw(); // Draw the triangle
      requestAnimationFrame(this.tick, this.canvas); // Request that the browser calls tick
    },
    draw() {
      this.gl.uniformMatrix4fv(
        this.u_ModelMatrix,
        false,
        this.modelMatrix.elements
      );
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.POINTS, 0, 4);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
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
        this.speedX = -this.speedX;
      }
      if (this.curY >= 0.5 || this.curY <= -0.5) {
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