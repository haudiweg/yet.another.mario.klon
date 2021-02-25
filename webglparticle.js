function objbreakwebgl2(x=0,y=0){
    gl.useProgram(shaderProgram[2]);

    gl.bindVertexArray(webglbuffers.break.vao)

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback["01"]);

    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.break.feedbackbuffer.aVelop1.buffer)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, webglbuffers.break.feedbackbuffer.aPosp1.buffer)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 2, webglbuffers.break.feedbackbuffer.aLivep1.buffer)

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.feedbackbuffer.aVelop.buffer)
    gl.vertexAttribPointer(
        webglbuffers.break.feedbackbuffer.aVelop.pointer,
        webglbuffers.break.feedbackbuffer.aVelop.bufferlength,
        webglbuffers.break.feedbackbuffer.aVelop.numbertype,
        webglbuffers.break.feedbackbuffer.aVelop.normalized,
        webglbuffers.break.feedbackbuffer.aVelop.offset,
        webglbuffers.break.feedbackbuffer.aVelop.stride
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.feedbackbuffer.aPosp.buffer)
    gl.vertexAttribPointer(
        webglbuffers.break.feedbackbuffer.aPosp.pointer,
        webglbuffers.break.feedbackbuffer.aPosp.bufferlength,
        webglbuffers.break.feedbackbuffer.aPosp.numbertype,
        webglbuffers.break.feedbackbuffer.aPosp.normalized,
        webglbuffers.break.feedbackbuffer.aPosp.offset,
        webglbuffers.break.feedbackbuffer.aPosp.stride
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.feedbackbuffer.aLivep.buffer)
    gl.vertexAttribPointer(
        webglbuffers.break.feedbackbuffer.aLivep.pointer,
        webglbuffers.break.feedbackbuffer.aLivep.bufferlength,
        webglbuffers.break.feedbackbuffer.aLivep.numbertype,
        webglbuffers.break.feedbackbuffer.aLivep.normalized,
        webglbuffers.break.feedbackbuffer.aLivep.offset,
        webglbuffers.break.feedbackbuffer.aLivep.stride
    );


    gl.uniform2f(webglbuffers.break.uniform.globalwind,wind[0],wind[1]);
    gl.uniform1f(webglbuffers.break.uniform.fps,fps);
    gl.uniform2f(webglbuffers.break.uniform.canvashwwebgl,canvas.width,canvas.height);
    gl.uniform4f(webglbuffers.break.uniform.offsgl,x,y,zoom,zoomn);

    gl.uniform4f(webglbuffers.break.uniform.minmax,minx,miny,maxx,maxy);

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, colltexture);
    gl.uniform1i(webglbuffers.break.uniform.positionTexture, 0)

    gl.beginTransformFeedback(gl.POINTS)

    gl.drawArrays(gl.POINTS, 0, maxparticle);
    
    gl.endTransformFeedback()
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, null)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 2, null)
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER,null)

    //mach ne buffer swap function


    try{
        [
            webglbuffers.break.feedbackbuffer.aVelop1.buffer,
            webglbuffers.break.feedbackbuffer.aVelop.buffer,
            webglbuffers.break.feedbackbuffer.aPosp1.buffer,
            webglbuffers.break.feedbackbuffer.aPosp.buffer,
            webglbuffers.break.feedbackbuffer.aLivep1.buffer,
            webglbuffers.break.feedbackbuffer.aLivep.buffer,
        ]=[
            webglbuffers.break.feedbackbuffer.aVelop.buffer,
            webglbuffers.break.feedbackbuffer.aVelop1.buffer,
            webglbuffers.break.feedbackbuffer.aPosp.buffer,
            webglbuffers.break.feedbackbuffer.aPosp1.buffer,
            webglbuffers.break.feedbackbuffer.aLivep.buffer,
            webglbuffers.break.feedbackbuffer.aLivep1.buffer,
        ]
    }catch(e){console.log(e)}//kp
}
function webgl2breakinitialize(){
    gl.useProgram(shaderProgram[2]);

    if(colltexture==undefined)colltexture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, colltexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, maxx-minx, maxy-miny, 0, gl.RED, gl.UNSIGNED_BYTE, objcolmap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);

}
function webgl2breakadd(x,y,velo=[0,0],color=[1,0,0,1],anzahl=1,live=400,randompriv=1){
    anzahl=Math.min(anzahl,maxparticle)

    gl.useProgram(shaderProgram[2]);
    let graviins=[0,0]
    const posgravi=(Math.trunc(y-miny)*(maxx-minx)+Math.trunc(x)-minx)*4
    if(gravicache&&gravimap[posgravi]==1){
        graviins[gravimap[posgravi+1]*particlegravimulti,gravimap[posgravi+2]*particlegravimulti]
    }else{
        for (let i in myGravi[loadmap]){
            let posx=x-myGravi[loadmap][i].minx
            posx-=Math.max(0,Math.min(posx,myGravi[loadmap][i].w))
            let posy=y-myGravi[loadmap][i].miny
            posy-=Math.max(0,Math.min(posy,myGravi[loadmap][i].h))
            if(posx!==0||posy!==0){
                let starke=(myGravi[loadmap][i].stärke/Math.max(myGravi[loadmap][i].abfac*Math.hypot(posx,posy),0))
                let winkel=Math.atan2(posy,posx)
                graviins[0]+=starke*Math.cos(winkel)
                graviins[1]+=starke*Math.sin(winkel)
            }
        }

        if(gravicache){
            gravimap[posgravi+0]=1
            gravimap[posgravi+1]=graviins[0]
            gravimap[posgravi+2]=graviins[1]
            gravimap[posgravi+3]=Math.atan2(graviins[1],graviins[0])
        }

        graviins[0]*=particlegravimulti
        graviins[1]*=particlegravimulti
    }

    //console.log(graviins)
    //maxparticle-(particlecount%maxparticle)
    //mache wen es von einer seite zur anderen geh es splitten
    
    
    let livearr=[]
    let veloarr=[]
    let pos=[]
    let gravi=[]
    let colorarr=[]
    for(let i=0;i<anzahl;i++){
        livearr.push(
            (Math.random()-particleliveadd)*particlelivemulti*randompriv+live,
            (Math.random()+particlesizeadd)*particlesizemulti
        )
        veloarr.push(
            (Math.random()+particleveloxadd)*particleveloxmulti*randompriv+velo[0],
            (Math.random()+particleveloyadd)*particleveloymulti*randompriv+velo[1]
        )
        pos.push(
            x+(Math.random()+particleposxadd)*particleposxmulti*randompriv,
            y+(Math.random()+particleposyadd)*particleposymulti*randompriv
        )
        gravi.push(graviins[0],graviins[1])
        colorarr.push(color[0],color[1],color[2],color[3])
        
    }

    //webglbuffer.testbufferoverflow("break",pos.length*Float32Array.BYTES_PER_ELEMENT)

    //console.log((particlecount%maxparticle))
    //console.log(0+" "+Math.min(maxparticle-(particlecount%maxparticle),anzahl))
    //console.log(Math.min(maxparticle-(particlecount%maxparticle),anzahl)+" "+anzahl)

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.buffer.gravi.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,Float32Array.BYTES_PER_ELEMENT*2*(particlecount%maxparticle), new Float32Array(gravi.slice(0,Math.min(maxparticle-(particlecount%maxparticle),anzahl))));
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(gravi.slice(Math.min(maxparticle-(particlecount%maxparticle),anzahl),anzahl)));


    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.feedbackbuffer.aLivep.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,Float32Array.BYTES_PER_ELEMENT*2*(particlecount%maxparticle), new Float32Array(livearr.slice(0,Math.min(maxparticle-(particlecount%maxparticle),anzahl))));
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(livearr.slice(Math.min(maxparticle-(particlecount%maxparticle),anzahl),anzahl)));


    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.feedbackbuffer.aVelop.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,Float32Array.BYTES_PER_ELEMENT*2*(particlecount%maxparticle), new Float32Array(veloarr.slice(0,Math.min(maxparticle-(particlecount%maxparticle),anzahl))));
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(veloarr.slice(Math.min(maxparticle-(particlecount%maxparticle),anzahl),anzahl)));


    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.feedbackbuffer.aPosp.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,Float32Array.BYTES_PER_ELEMENT*2*(particlecount%maxparticle), new Float32Array(pos.slice(0,Math.min(maxparticle-(particlecount%maxparticle),anzahl))));
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(pos.slice(Math.min(maxparticle-(particlecount%maxparticle),anzahl),anzahl)));

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.break.buffer.color.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,Float32Array.BYTES_PER_ELEMENT*4*(particlecount%maxparticle), new Float32Array(colorarr.slice(0,Math.min(maxparticle-(particlecount%maxparticle),anzahl))));
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(colorarr.slice(Math.min(maxparticle-(particlecount%maxparticle),anzahl),anzahl)));


    gl.bindBuffer(gl.ARRAY_BUFFER,null)

    particlecount=(particlecount+anzahl)%maxparticle
}
promallres[19]()