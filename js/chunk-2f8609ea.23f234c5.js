(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f8609ea"],{4980:function(t,i,e){"use strict";e.r(i);var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"wrapper"},[e("g-canvas",{ref:"gcanvas"})],1)},a=[],r=(e("ace4"),e("0d03"),e("d3b7"),e("cfc3"),e("9a8c"),e("a975"),e("735e"),e("c1ac"),e("d139"),e("3a7b"),e("d5d6"),e("82f8"),e("e91f"),e("60bd"),e("5f96"),e("3280"),e("3fcc"),e("ca91"),e("25a1"),e("cd26"),e("3c5d"),e("2954"),e("649e"),e("219c"),e("170b"),e("b39a9"),e("72f7"),e("f31e")),s=e("7c72"),n={name:"rotatedGraphics",components:{gCanvas:r["a"]},data:function(){return{canvas:null,gl:null,a_Position:null,a_PointSize:null,u_FragColor:null,a_Color:null,u_ModelMatrix:null,vertexSizeBuffer:null,VSHADER_SOURCE:"attribute vec4 a_Position;\nattribute float a_PointSize;\nattribute vec4 a_Color;\nvarying vec4 v_Color;\nuniform mat4 u_ModelMatrix;\nvoid main() {\n  gl_Position = u_ModelMatrix * a_Position;\n  gl_PointSize = a_PointSize;\n  v_Color = a_Color;\n}\n",FSHADER_SOURCE:"precision mediump float;\nuniform vec4 u_FragColor;\nvarying vec4 v_Color;\nvoid main() {\n  gl_FragColor = v_Color;\n}\n",g_last:Date.now(),speedX:10,speedY:10,speedAngle:90,curAngle:0,curX:0,curY:0,verticesSizeColor:new Float32Array([0,.5,10,1,0,0,-.5,-.5,20,0,1,0,.5,-.5,30,0,0,1]),modelMatrix:new s["a"]}},created:function(){},mounted:function(){this.gl=this.$refs.gcanvas.gl,this.canvas=this.$refs.gcanvas.canvas,this.$refs.gcanvas.initShaders(this.gl,this.VSHADER_SOURCE,this.FSHADER_SOURCE)?(this.speedX=this.speedX/this.canvas.width,this.speedY=this.speedY/this.canvas.height,this.init(this.gl)):console.log("Failed to intialize shaders.")},methods:{init:function(t){if(this.a_Position=t.getAttribLocation(t.program,"a_Position"),this.a_Position<0)console.log("Failed to get the storage location of a_Position");else if(this.a_PointSize=t.getAttribLocation(t.program,"a_PointSize"),this.a_PointSize<0)console.log("Failed to get the storage location of a_PointSize");else{if(this.a_Color=t.getAttribLocation(t.program,"a_Color"),this.a_Color<0)return console.log("Failed to get the storage location of a_Color"),-1;this.u_ModelMatrix=t.getUniformLocation(t.program,"u_ModelMatrix"),this.u_ModelMatrix?(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),this.initVertexBuffers(t)<0?console.log("Failed to set the positions of the vertices"):this.tick()):console.log("Failed to get the storage location of u_ModelMatrix")}},initVertexBuffers:function(t){if(this.vertexSizeBuffer=t.createBuffer(),!this.vertexSizeBuffer)return console.log("Failed to create the buffer object"),-1;t.bindBuffer(t.ARRAY_BUFFER,this.vertexSizeBuffer),t.bufferData(t.ARRAY_BUFFER,this.verticesSizeColor,t.STATIC_DRAW);var i=this.verticesSizeColor.BYTES_PER_ELEMENT;t.vertexAttribPointer(this.a_Position,2,t.FLOAT,!1,6*i,0),t.enableVertexAttribArray(this.a_Position),t.vertexAttribPointer(this.a_PointSize,1,t.FLOAT,!1,6*i,2*i),t.enableVertexAttribArray(this.a_PointSize),t.vertexAttribPointer(this.a_Color,3,t.FLOAT,!1,6*i,3*i),t.enableVertexAttribArray(this.a_Color)},tick:function(t){this.rotatedGraphics(),this.draw(),requestAnimationFrame(this.tick,this.canvas)},draw:function(){this.gl.uniformMatrix4fv(this.u_ModelMatrix,!1,this.modelMatrix.elements),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.drawArrays(this.gl.POINTS,0,3),this.gl.drawArrays(this.gl.TRIANGLES,0,3)},animate:function(t){var i=Date.now(),e=i-this.g_last;this.g_last=i;var o=t+this.speedAngle*e/1e3;return o%360},rotatedGraphics:function(){this.curAngle=this.animate(this.curAngle),(this.curX>=.5||this.curX<=-.5)&&(this.speedX=-this.speedX),(this.curY>=.5||this.curY<=-.5)&&(this.speedY=-this.speedY),this.curX+=this.speedX,this.curY+=this.speedY,this.modelMatrix.setTranslate(this.curX,this.curY,0),this.modelMatrix.rotate(this.curAngle,0,0,1)}},beforeDestroy:function(){this.canvas.removeEventListener("mousedown",this.onClick)}},l=n,c=(e("d932"),e("2877")),h=Object(c["a"])(l,o,a,!1,null,"6a7f7377",null);i["default"]=h.exports},cd0b:function(t,i,e){},d932:function(t,i,e){"use strict";var o=e("cd0b"),a=e.n(o);a.a}}]);
//# sourceMappingURL=chunk-2f8609ea.23f234c5.js.map