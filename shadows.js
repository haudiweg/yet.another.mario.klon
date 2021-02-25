function webglshadows(){
    //shadowtexture  rendered ligt immage
    //colltexture collisionarray
    //suntextur light off all llight sources

    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)

    gl.useProgram(shaderProgram[3]);
    console.log("using res (buffers): \nminx: "+iminx+"\nmaxx: "+imaxx+"\nminy: "+iminy+"\nmaxy: "+imaxy)

    debugshadow=new Float32Array((imaxy-iminy)*(imaxx-iminx)*4)
    debugsun=new Float32Array((imaxx-iminx)*(imaxy-iminy)*4)
    debugkanten=new Float32Array((imaxy-iminy)*(imaxx-iminx)*1)
    rayminmaxavg=new Float32Array(3)

    webglbuffer.testbufferoverflow("rays",(imaxy-iminy)*(imaxx-iminx))
    webglbuffer.testbufferoverflow("raykante",(imaxy-iminy)*(imaxx-iminx))
    webglbuffer.testbufferoverflow("raysunrender",(imaxy-iminy)*(imaxx-iminx))



    let cordinates=new Float32Array((imaxy-iminy)*(imaxx-iminx)*2)
    for(let i1=iminy,c=0;i1<imaxy;i1++){
        for(let i=iminx;i<imaxx;i++,c+=2){
            cordinates[c]=i
            cordinates[c+1]=i1
        }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rays.buffer.coordinates2.buffer);				
    gl.bufferData(gl.ARRAY_BUFFER,cordinates,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null)

    //gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.raykante.buffer.coordinates5.buffer);				
    //gl.bufferData(gl.ARRAY_BUFFER,cordinates,gl.STATIC_DRAW);
    //gl.bindBuffer(gl.ARRAY_BUFFER,null)

    //gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.raysunrender.buffer.coordinates6.buffer);				
    //gl.bufferData(gl.ARRAY_BUFFER,cordinates,gl.STATIC_DRAW);
    //gl.bindBuffer(gl.ARRAY_BUFFER,null)

    


    if(colltexture==undefined)colltexture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0+4)
    gl.bindTexture(gl.TEXTURE_2D, colltexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, maxx-minx, maxy-miny, 0, gl.RED, gl.UNSIGNED_BYTE, objcolmap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);

    let canvas1=new OffscreenCanvas(imaxx-iminx, imaxy-iminy)  //color
    let context1=canvas1.getContext("2d");
    for(let i of mySun[loadmap]){
        context1.fillStyle=i.lightcolor
        context1.beginPath();
        context1.moveTo(Math.trunc((i.minx-minx)/rayres),Math.trunc((i.miny-miny)/rayres));
        for (let i1=1;i1<i.x.length;i1++){
            context1.lineTo(Math.trunc((i.x[i1]-minx)/rayres),Math.trunc((i.y[i1]-miny)/rayres))
        }
        context1.fill()
    }

    suntexture = gl.createTexture();
    //console.log(colorarr)


    debugsun.set(context1.getImageData(0, 0, imaxx-iminx, imaxy-iminy).data.map(i=>i/255))

    gl.activeTexture(gl.TEXTURE0+5)
    gl.bindTexture(gl.TEXTURE_2D, suntexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, imaxx-iminx, imaxy-iminy, 0, gl.RGBA, gl.FLOAT, debugsun);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);


    sunorgtexture = gl.createTexture();
    //console.log(colorarr)

    gl.activeTexture(gl.TEXTURE0+7)
    gl.bindTexture(gl.TEXTURE_2D, sunorgtexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, imaxx-iminx, imaxy-iminy, 0, gl.RGBA, gl.FLOAT, debugsun);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);


    

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.raydraw.buffer.coordinates3.buffer);				
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([minx, miny, maxx, miny, maxx, maxy, minx, maxy]),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.raydraw.buffer.aTexCoord.buffer);				
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rayminmax.buffer.coordinates4.buffer);				
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0, 0]),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER,null)


    shadowtexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0+6)
    gl.bindTexture(gl.TEXTURE_2D, shadowtexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, imaxx-iminx, imaxy-iminy, 0, gl.RGBA, gl.FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null); 


    gl.uniform4f(webglbuffers.rays.uniform.minmax,iminx,iminy,imaxx,imaxy);
    gl.uniform1i(webglbuffers.rays.uniform.colltexture, 4)
    gl.uniform1i(webglbuffers.rays.uniform.suntexture, 5)
    gl.uniform1f(webglbuffers.rays.uniform.rayres,rayres)
    gl.uniform1i(webglbuffers.rays.uniform.shadowhighquali, shadowhighquali)


    //generate ränder of map
    gl.useProgram(shaderProgram[6]);

    gl.bindVertexArray(webglbuffers.raykante.vao)


    gl.activeTexture(gl.TEXTURE0+4)
    gl.bindTexture(gl.TEXTURE_2D, colltexture);
    gl.uniform1i(webglbuffers.raykante.uniform.colltexture, 4)

    gl.uniform4f(webglbuffers.raykante.uniform.minmax,iminx,iminy,imaxx,imaxy);

    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.rays.buffer.aKante.buffer)

    gl.beginTransformFeedback(gl.POINTS)

    gl.enable(gl.RASTERIZER_DISCARD)

    gl.drawArrays(gl.POINTS,0,(imaxy-iminy)*(imaxx-iminx))

    gl.disable(gl.RASTERIZER_DISCARD)

    gl.endTransformFeedback()
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rays.buffer.aKante.buffer);
    gl.getBufferSubData(gl.ARRAY_BUFFER, 0, debugkanten)
    gl.bindBuffer(gl.ARRAY_BUFFER, null);


    //gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.raysunrender.buffer.aKante.buffer);
    //gl.bufferData(gl.ARRAY_BUFFER, debugkanten, gl.STATIC_DRAW)
    //gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null)
}
function webglshadowsaddtransform(){
    gl.useProgram(shaderProgram[3]);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback["05"]);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.rays.feedbackbuffer.aColorsun1.buffer)
    gl.beginTransformFeedback(gl.POINTS)
    gl.pauseTransformFeedback()
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

    

    shadowrendermode=1
    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    testfunc()
}
function webglshadowsrender(){//1
    testfunc()
    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)

    gl.useProgram(shaderProgram[3]);

    gl.bindVertexArray(webglbuffers.rays.vao)

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback["05"]);//binding and unbinding buffer

    gl.uniform2f(webglbuffers.rays.uniform.num,webglshadowseachinshader%(imaxx-iminx),Math.trunc(webglshadowseachinshader/(imaxx-iminx)))


    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rays.feedbackbuffer.aColorsun.buffer)
    gl.vertexAttribPointer(
        webglbuffers.rays.feedbackbuffer.aColorsun.pointer,
        webglbuffers.rays.feedbackbuffer.aColorsun.bufferlength,
        webglbuffers.rays.feedbackbuffer.aColorsun.numbertype,
        webglbuffers.rays.feedbackbuffer.aColorsun.normalized,
        webglbuffers.rays.feedbackbuffer.aColorsun.offset,
        webglbuffers.rays.feedbackbuffer.aColorsun.stride
    );
    gl.activeTexture(gl.TEXTURE0+4)
    gl.bindTexture(gl.TEXTURE_2D, colltexture);
    gl.activeTexture(gl.TEXTURE0+5)
    gl.bindTexture(gl.TEXTURE_2D, suntexture);

    gl.resumeTransformFeedback()
    gl.enable(gl.RASTERIZER_DISCARD)

    let webglshadowsnumold=webglshadowsnum
    webglshadowsnum+=webglshadowseachadd
    webglshadowsnum+=webglshadowseach
    webglshadowsnum=Math.min(webglshadowsnum,(imaxy-iminy)*(imaxx-iminx))//dont draw more poligons than max

    webglshadowseachadd=webglshadowsnumold+webglshadowseach+webglshadowseachadd-webglshadowsnum //how mutch got skipped

    gl.drawArrays(gl.POINTS,webglshadowsnumold,webglshadowsnum-webglshadowsnumold)

    gl.disable(gl.RASTERIZER_DISCARD)
    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER,null)
    
    if(webglshadowsnum>=(imaxy-iminy)*(imaxx-iminx)){
        webglshadowsnum=0
        shadowrendermode=2
        gl.endTransformFeedback()
        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)
    }else{
        gl.pauseTransformFeedback()
    }
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
}
function webglshadowsremovetransform(){//könte lag machen  2
    testfunc()
    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)

    shadowupdatecounter+=60/fps
    if(shadowupdatecounter>shadowupdatemax){//macht lags in neue func
        shadowupdatecounter-=shadowupdatemax
        shadowrendermode=21
    }



    if(webglshadowsdrawmode=="add")webglshadowseachinshader++
    if(webglshadowsdrawmode=="random")webglshadowseachinshader=Math.round(Math.random()*((imaxx-iminx)*(imaxy-iminy)))
    if(webglshadowsdrawmode=="randomadd")webglshadowseachinshader+=Math.round(Math.random()*1000)
    webglshadowseachinshader=webglshadowseachinshader%((imaxx-iminx)*(imaxy-iminy))
    if(shadowrendermode==2)shadowrendermode=4
}
function webglshadowsremovetransformread(){//21
    gl.useProgram(shaderProgram[3]);
    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)
    if(shadowstomemorypbo&&!debugcolmap){
        gl.activeTexture(gl.TEXTURE0+6)
        gl.bindTexture(gl.TEXTURE_2D, shadowtexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, webglbuffers.rays.feedbackbuffer.aColorsun1.buffer);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0,imaxx-iminx, imaxy-iminy, gl.RGBA, gl.FLOAT, 0);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }else{
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rays.feedbackbuffer.aColorsun1.buffer);
        gl.getBufferSubData(gl.ARRAY_BUFFER, 0, debugshadow);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        gl.activeTexture(gl.TEXTURE0+6)
        gl.bindTexture(gl.TEXTURE_2D, shadowtexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, imaxx-iminx, imaxy-iminy, gl.RGBA, gl.FLOAT, debugshadow);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null); 
    }
    shadowrendermode=3
    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
}

function webglshadowsminmaxcolor(){
    testfunc()
    gl.useProgram(shaderProgram[5]);

    gl.bindVertexArray(webglbuffers.rayminmax.vao)

    gl.uniform2f(webglbuffers.rayminmax.uniform.raywh,(maxx-minx)/rayres,(maxy-miny)/rayres);

    gl.activeTexture(gl.TEXTURE0+6)
    gl.bindTexture(gl.TEXTURE_2D, shadowtexture);
    gl.uniform1i(webglbuffers.rayminmax.uniform.uSampler, 6)

    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.rayminmax.feedbackbuffer.minmaxinslight1.buffer)
    gl.beginTransformFeedback(gl.POINTS)
    gl.enable(gl.RASTERIZER_DISCARD)
    //just draw 1 pixel
    gl.drawArrays(gl.POINTS,0,1)

    gl.disable(gl.RASTERIZER_DISCARD)

    gl.endTransformFeedback()
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)

    gl.bindVertexArray(null)

    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    shadowrendermode=31
}
function webglshadowsminmaxread(){//könte lag machen
    testfunc()
    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rayminmax.feedbackbuffer.minmaxinslight1.buffer);
    gl.getBufferSubData(gl.ARRAY_BUFFER, 0, rayminmaxavg);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    shadowrendermode=4
    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
}

function webglshadowsswapbuffers(){
    try{
        [
            webglbuffers.rays.feedbackbuffer.aColorsun1.buffer,
            webglbuffers.rays.feedbackbuffer.aColorsun.buffer
        ]=[
            webglbuffers.rays.feedbackbuffer.aColorsun.buffer,
            webglbuffers.rays.feedbackbuffer.aColorsun1.buffer
        ]
    }catch(e){console.log(e)}//kp
    shadowrendermode=5
    testfunc()
    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
}

function webglshadowaddsun(){
    
    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)
    
    gl.useProgram(shaderProgram[7]);

    gl.bindVertexArray(webglbuffers.raysunrender.vao)

    gl.uniform4f(webglbuffers.raysunrender.uniform.minmax,iminx,iminy,imaxx,imaxy);

    //adde cordinates
    //adde kante
    gl.activeTexture(gl.TEXTURE0+5)
    gl.bindTexture(gl.TEXTURE_2D, suntexture);
    gl.uniform1i(webglbuffers.raysunrender.uniform.suntexture, 5)

    gl.activeTexture(gl.TEXTURE0+6)
    gl.bindTexture(gl.TEXTURE_2D, shadowtexture);
    gl.uniform1i(webglbuffers.raysunrender.uniform.shadowtexture, 6)

    gl.activeTexture(gl.TEXTURE0+7)
    gl.bindTexture(gl.TEXTURE_2D, sunorgtexture);
    gl.uniform1i(webglbuffers.raysunrender.uniform.sunorgtexture, 7)

    gl.uniform3f(webglbuffers.raysunrender.uniform.rayminmaxavg,...rayminmaxavg)

    //gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rays.buffer.coordinates2.buffer);//bind 
    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.rays.buffer.aKante.buffer)//bind 
    

    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.raysunrender.feedbackbuffer.asunarr1.buffer)
    gl.beginTransformFeedback(gl.POINTS)
    gl.enable(gl.RASTERIZER_DISCARD)
    
    gl.drawArrays(gl.POINTS,0,(imaxx-iminx)*(imaxy-iminy))

    gl.disable(gl.RASTERIZER_DISCARD)

    gl.endTransformFeedback()
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)
    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER,null)
    gl.bindTexture(gl.TEXTURE_2D, null); 
    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    shadowrendermode=51
}
function webglshadowaddsunread(){
    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)
    //console.log("s")
    if(shadowstomemorypbo&&!debugcolmap){
        gl.activeTexture(gl.TEXTURE0+5)
        gl.bindTexture(gl.TEXTURE_2D, suntexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, webglbuffers.raysunrender.feedbackbuffer.asunarr1.buffer);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, imaxx-iminx, imaxy-iminy, 0,gl.RGBA,gl.FLOAT, 0)
        //gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0,imaxx-iminx, imaxy-iminy, gl.RGBAF32, gl.FLOAT, 0);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }else{
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.raysunrender.feedbackbuffer.asunarr1.buffer);
        gl.getBufferSubData(gl.ARRAY_BUFFER, 0, debugsun);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        gl.activeTexture(gl.TEXTURE0+5)
        gl.bindTexture(gl.TEXTURE_2D, suntexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        //gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, imaxx-iminx, imaxy-iminy, gl.RGBA32F, gl.FLOAT, debugsun);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, imaxx-iminx, imaxy-iminy, 0,gl.RGBA,gl.FLOAT, debugsun)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null); 
    }


    shadowfencesync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    testfunc()
    shadowrendermode=0
}


function webglshadowsdraw(x,y){
    const imaxx=Math.trunc(maxx/rayres)
    const imaxy=Math.trunc(maxy/rayres)
    const iminx=Math.trunc(minx/rayres)
    const iminy=Math.trunc(miny/rayres)
    gl.useProgram(shaderProgram[4]);
    

    gl.bindVertexArray(webglbuffers.raydraw.vao)

    gl.uniform4f(webglbuffers.raydraw.uniform.minmax,iminx,iminy,imaxx,imaxy);
    gl.uniform2f(webglbuffers.raydraw.uniform.canvashwwebgl,canvas.width,canvas.height);
    gl.uniform4f(webglbuffers.raydraw.uniform.offsgl,x,y,zoom,zoomn);
    gl.uniform3f(webglbuffers.raydraw.uniform.rayminmaxavg,...rayminmaxavg)
    gl.uniform1f(webglbuffers.raydraw.uniform.light,8)
    gl.uniform1i(webglbuffers.raydraw.uniform.shadowdrawmode,shadowdrawmode)

    gl.activeTexture(gl.TEXTURE0+6)
    gl.bindTexture(gl.TEXTURE_2D, shadowtexture);
    gl.uniform1i(webglbuffers.raydraw.uniform.uSampler, 6)

    gl.drawArrays(gl.TRIANGLE_FAN,0,4)
    gl.bindVertexArray(null)
}
function testfunc(){
    return 0
}
promallres[17]()