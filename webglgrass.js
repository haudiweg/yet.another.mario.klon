function grassdrawwebgl2(x=0,y=0,time=0){
    windtimer-=60/fps
    if(windtimer<=0){
        windtimer=windreset
        newwind[0]=(Math.random()*2-1)*windrange[0]
        newwind[1]=(Math.random()*2-1)*windrange[1]
    }
    wind[0]=wind[0]*(Math.pow(windsmove,60/fps))+newwind[0]*(1-Math.pow(windsmove,60/fps))
    wind[1]=wind[1]*(Math.pow(windsmove,60/fps))+newwind[1]*(1-Math.pow(windsmove,60/fps))
    //wind[1]=0

    if(zoom>=4)return //grass ist so klein sieht e keiner
    if(webglgrassdrawarr.firsts.length==0)return
    gl.useProgram(shaderProgram[1]);

    gl.bindVertexArray(webglbuffers.grass.vao)

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback["02"]);
    //bindBufferBase bindBuffer und vertexAttribPointer combinieren als ein befehl
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.grass.feedbackbuffer.aVelo1.buffer)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, webglbuffers.grass.feedbackbuffer.aWind1.buffer)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 2, webglbuffers.grass.feedbackbuffer.aWindrandtimer1.buffer)

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aVelo.buffer)
    gl.vertexAttribPointer(
        webglbuffers.grass.feedbackbuffer.aVelo.pointer,
        webglbuffers.grass.feedbackbuffer.aVelo.bufferlength,
        webglbuffers.grass.feedbackbuffer.aVelo.numbertype,
        webglbuffers.grass.feedbackbuffer.aVelo.normalized,
        webglbuffers.grass.feedbackbuffer.aVelo.offset,
        webglbuffers.grass.feedbackbuffer.aVelo.stride
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWind.buffer)
    gl.vertexAttribPointer(
        webglbuffers.grass.feedbackbuffer.aWind.pointer,
        webglbuffers.grass.feedbackbuffer.aWind.bufferlength,
        webglbuffers.grass.feedbackbuffer.aWind.numbertype,
        webglbuffers.grass.feedbackbuffer.aWind.normalized,
        webglbuffers.grass.feedbackbuffer.aWind.offset,
        webglbuffers.grass.feedbackbuffer.aWind.stride
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWindrandtimer.buffer)
    gl.vertexAttribPointer(
        webglbuffers.grass.feedbackbuffer.aWindrandtimer.pointer,
        webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength,
        webglbuffers.grass.feedbackbuffer.aWindrandtimer.numbertype,
        webglbuffers.grass.feedbackbuffer.aWindrandtimer.normalized,
        webglbuffers.grass.feedbackbuffer.aWindrandtimer.offset,
        webglbuffers.grass.feedbackbuffer.aWindrandtimer.stride
    );
    


    gl.uniform2f(webglbuffers.grass.uniform.globalwind,wind[0],wind[1]);
    let objectsgrassmove=myRect[loadmap].filter(i1=>typeof(i1.velo)=="object")

    let boomeranggrassmove=myRect[loadmap].filter(i1=>i1.construck=="Bommerang")
    //wen zu viele obj gibt dan remove so viele bis es unter limit liegt  zb was ist auserhalb der sichtweite
    //gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)
    if(maxgrassobjects<objectsgrassmove.length){
        let objtoremove=maxgrassobjects-objectsgrassmove.length
        objectsgrassmove.filter(i1=>i1.construck=="Player"||(objtoremove++))
        objectsgrassmove.filter(i1=>(objtoremove++))
    }
    if(maxgrassobjects<boomeranggrassmove.length){
        let objtoremove=maxgrassobjects-boomeranggrassmove.length
        boomeranggrassmove.filter(i1=>(objtoremove++))
    }
    let boomeranggrassmovepos=new Float32Array(boomeranggrassmove.length*2)
    let objectsgrassmovepos=new Float32Array(objectsgrassmove.length*4)
    let objectsgrassmovevel=new Float32Array(objectsgrassmove.length*2)
    for(let i1=0;i1<objectsgrassmove.length;i1++){
        objectsgrassmovepos[i1*4+0]=objectsgrassmove[i1].minx
        objectsgrassmovepos[i1*4+1]=objectsgrassmove[i1].miny
        objectsgrassmovepos[i1*4+2]=objectsgrassmove[i1].w
        objectsgrassmovepos[i1*4+3]=objectsgrassmove[i1].h
        objectsgrassmovevel[i1*2+0]=objectsgrassmove[i1].velo[0]
        objectsgrassmovevel[i1*2+1]=objectsgrassmove[i1].velo[1]
    }
    for(let i1=0;i1<boomeranggrassmove.length;i1++){
        boomeranggrassmovepos[i1*2+0]=boomeranggrassmove[i1].minx
        boomeranggrassmovepos[i1*2+1]=boomeranggrassmove[i1].miny
    }
    if(objectsgrassmove.length>0){
        gl.uniform4fv(webglbuffers.grass.uniform.objectspos,objectsgrassmovepos);
        gl.uniform2fv(webglbuffers.grass.uniform.objectsvel,objectsgrassmovevel);
        gl.uniform1i(webglbuffers.grass.uniform.objectslength,objectsgrassmove.length)  
    }

    if(boomeranggrassmove.length>0){
        gl.uniform2fv(webglbuffers.grass.uniform.rassenpos,boomeranggrassmovepos);
        gl.uniform1i(webglbuffers.grass.uniform.rassenlength,boomeranggrassmove.length)  
    }


    gl.uniform1f(webglbuffers.grass.uniform.fps,fps);
    gl.uniform2f(webglbuffers.grass.uniform.canvashwwebgl,canvas.width,canvas.height);
    gl.uniform4f(webglbuffers.grass.uniform.offsgl,x,y,zoom,zoomn);

    gl.beginTransformFeedback(gl.POINTS)
    gl.enable(gl.RASTERIZER_DISCARD)
    gl.uniform1i(webglbuffers.grass.uniform.rendermode, 0);
    
    if(WEBGLmultidraw){
        WEBGLmultidraw.multiDrawArraysWEBGL(gl.POINTS, webglgrassdrawarr.firsts, 0, webglgrassdrawarr.counts, 0, webglgrassdrawarr.firsts.length);
    }else{
        for(let i2=0;i2<=webglgrassdrawarr.firsts.length;i2++)gl.drawArrays(gl.POINTS,webglgrassdrawarr.firsts[i2],webglgrassdrawarr.counts[i2])
    }
    gl.disable(gl.RASTERIZER_DISCARD)
    gl.endTransformFeedback()
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, null)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 2, null)
    gl.uniform1i(webglbuffers.grass.uniform.rendermode, 1);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    if(WEBGLmultidraw){
        WEBGLmultidraw.multiDrawArraysWEBGL(gl.TRIANGLE_FAN, webglgrassdrawarr.firsts, 0, webglgrassdrawarr.counts, 0, webglgrassdrawarr.firsts.length);
    }else{
        for(let i2=0;i2<webglgrassdrawarr.firsts.length;i2++)gl.drawArrays(gl.TRIANGLE_FAN,webglgrassdrawarr.firsts[i2],webglgrassdrawarr.counts[i2])
    }


    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER,null)

    //mach ne buffer swap function
    try{
        [
            webglbuffers.grass.feedbackbuffer.aVelo1.buffer,
            webglbuffers.grass.feedbackbuffer.aVelo.buffer,
            webglbuffers.grass.feedbackbuffer.aWind1.buffer,
            webglbuffers.grass.feedbackbuffer.aWind.buffer,
            webglbuffers.grass.feedbackbuffer.aWindrandtimer1.buffer,
            webglbuffers.grass.feedbackbuffer.aWindrandtimer.buffer,
        ]=[
            webglbuffers.grass.feedbackbuffer.aVelo.buffer,
            webglbuffers.grass.feedbackbuffer.aVelo1.buffer,
            webglbuffers.grass.feedbackbuffer.aWind.buffer,
            webglbuffers.grass.feedbackbuffer.aWind1.buffer,
            webglbuffers.grass.feedbackbuffer.aWindrandtimer.buffer,
            webglbuffers.grass.feedbackbuffer.aWindrandtimer1.buffer,
        ]
    }catch(e){console.log(e)}//kp
}
function grasstogpuwebgl2(timetowalk){//das in itle callback und in 2 teile 
    grasstogpuwebgl2time[0]-=grasstogpuwebgl2timeminus
    if(timetowalk==false||timetowalk.timeRemaining()>grasstogpuwebgl2time[0]||timetowalk.didTimeout){
        const ttime=performance.now()
        const arrBuffer=[
            new Float32Array(new ArrayBuffer(webglbuffers.grass.feedbackbuffer.aVelo.group.buffersize*Float32Array.BYTES_PER_ELEMENT*webglbuffers.grass.feedbackbuffer.aVelo.bufferlength)),
            new Float32Array(new ArrayBuffer(webglbuffers.grass.feedbackbuffer.aWind.group.buffersize*Float32Array.BYTES_PER_ELEMENT*webglbuffers.grass.feedbackbuffer.aWind.bufferlength)),
            new Float32Array(new ArrayBuffer(webglbuffers.grass.feedbackbuffer.aWindrandtimer.group.buffersize*Float32Array.BYTES_PER_ELEMENT*webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength)),
        ]
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aVelo.buffer)
        gl.getBufferSubData(gl.ARRAY_BUFFER, 0, arrBuffer[0])
        gl.bindBuffer(gl.ARRAY_BUFFER,null)
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWind.buffer)
        gl.getBufferSubData(gl.ARRAY_BUFFER, 0, arrBuffer[1])
        gl.bindBuffer(gl.ARRAY_BUFFER,null)
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWindrandtimer.buffer)
        gl.getBufferSubData(gl.ARRAY_BUFFER, 0, arrBuffer[2])
        gl.bindBuffer(gl.ARRAY_BUFFER,null)
        grasstogpuwebgl2time[0]=grasstogpuwebgl2time[0]*grasstogpuwebgl2timeabfac+(performance.now()-ttime)*(1-grasstogpuwebgl2timeabfac)
        grasstogpuwebgl20(arrBuffer,0,timetowalk)
    }else window.requestIdleCallback(grasstogpuwebgl2)
}
function grasstogpuwebgl20(arrBuffer,starti,timetowalk){
    for (let i=starti;i<webglgrassdrawarr.firsts.length;i++){
        if(timetowalk!=false&&timetowalk.timeRemaining()<0.2){
            window.requestIdleCallback(grasstogpuwebgl20.bind(this,arrBuffer,i))
            return
        }
        const i1=webglgrassdrawarr.num[i]
        const counter=webglgrassdrawarr.firsts[i]
        i1.velo[0]=arrBuffer[0][webglbuffers.grass.feedbackbuffer.aVelo.bufferlength*counter+0]
        i1.velo[1]=arrBuffer[0][webglbuffers.grass.feedbackbuffer.aVelo.bufferlength*counter+1]
        i1.randomwind[0]=arrBuffer[1][webglbuffers.grass.feedbackbuffer.aWind.bufferlength*counter+0]
        i1.randomwind[1]=arrBuffer[1][webglbuffers.grass.feedbackbuffer.aWind.bufferlength*counter+1]
        i1.randomwindtimer[0]=arrBuffer[2][webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength*counter+0]
        i1.randomwindtimer[1]=arrBuffer[2][webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength*counter+1]
        i1.randomwindtimer[2]=arrBuffer[2][webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength*counter+2]
        i1.randomwindtimer[3]=arrBuffer[2][webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength*counter+3]
    }
    grasstogpuwebgl21(timetowalk)
}
function grasstogpuwebgl21(timetowalk){
    grasstogpuwebgl2time[1]-=grasstogpuwebgl2timeminus
    if(timetowalk==false||timetowalk.timeRemaining()>grasstogpuwebgl2time[1]||timetowalk.didTimeout){
        const ttime=performance.now()
        const grasst=myRect[loadmap].filter(i=>i.construck=="Grassani"&&typeof(i.grass)!="undefined")
        howmutchgrass=0
        for(let i of grasst)howmutchgrass+=i.grass.length

        grasshalm=[]
        for(let i of grasst){
            for(let i1 of i.grass){
                grasshalm.push([i1.w*i1.h,i1.x+i.minx,i1.y+i.miny,i1])
            }
        }
        grasslimitact=grasshalm.length>webglgrasscut&&!grassrenderall
        grasstogpuwebgl2time[1]=grasstogpuwebgl2time[1]*grasstogpuwebgl2timeabfac+(performance.now()-ttime)*(1-grasstogpuwebgl2timeabfac)

        if(grasslimitact){
            if(timetowalk==false)grasstogpuwebgl22(false)
            if(timetowalk!=false)window.requestIdleCallback(grasstogpuwebgl22)
        }else{
            grasstogpuwebgl23(timetowalk)
        }
    }else window.requestIdleCallback(grasstogpuwebgl21)
}
function grasstogpuwebgl22(timetowalk){
    grasstogpuwebgl2time[2]-=grasstogpuwebgl2timeminus
    if(timetowalk==false||timetowalk.timeRemaining()>grasstogpuwebgl2time[2]||timetowalk.didTimeout){
        const ttime=performance.now()
        const newgrasslimitact=Math.trunc((webglgrasscut/rendertimeavg)*rendertimeopt)
        if(newgrasslimitact<webglgrasscut)webglgrasscut=newgrasslimitact
        if(newgrasslimitact>webglgrasscut+(updategrass&&grasstorender?0:100))webglgrasscut=webglgrasscut+Math.min(newgrasslimitact-webglgrasscut,15)
        grasshalm=grasshalm.sort((i0,i1)=>Math.sign(i1[0]-i0[0])).slice(0,webglgrasscut)
        grasstorender=grasshalm.length
        grasstogpuwebgl2time[2]=grasstogpuwebgl2time[2]*grasstogpuwebgl2timeabfac+(performance.now()-ttime)*(1-grasstogpuwebgl2timeabfac)
        grasstogpuwebgl23(timetowalk)
    }else window.requestIdleCallback(grasstogpuwebgl22)
}
function grasstogpuwebgl23(timetowalk){
    grasstogpuwebgl2time[3]-=grasstogpuwebgl2timeminus
    if(timetowalk==false||timetowalk.timeRemaining()>grasstogpuwebgl2time[3]||timetowalk.didTimeout){//mach das über multible frames
        const ttime=performance.now()
        updategrass=false
        updatetgrass=0
        webglgrassquali=Math.round(Math.max(Math.min(webglgrasswantetpoligons/howmutchgrass,webglmaxgrassquali),webglmingrassquali))
        let objvertices=[]
        let grasssrot=[]
        let grassvelo=[]
        let windopt=[]
        let grassstrawwind=[]
        let randomwindtimer=[]
        let grassstartcord=[]
        let grassnum=[]
        let grasscolor=[]
        let firstsarr=[]
        let countsarr=[]

        //remove all grass  we could give each objvertecy a array with num and type could be better
        for (let i in grasshalm){
            firstsarr.push(objvertices.length/2)
            const i1=grasshalm[i][3]
            webglgrassdrawarr.num[i]=i1
            webglgrassdrawarr.xy[i]=[grasshalm[i][1],grasshalm[i][2]]
            let max=Math.max(2+webglgrassquali*2,3)
            if(max>3){
                max-=i1.spitze
                max=Math.min(Math.max(Math.trunc(i1.h*2),3),max)//um so höher grass ist um so mehr poligone sind erlaubt
            }
            for(let i2=0;i2<max;i2++){
                // bei mitte=0 nim folles i1.h und um so niedriger um so weniger dh am entferntesten punkt von mitte ist addh=0
                const distancefromstartendnormalised=1-(Math.abs(i2-(max&1?(max/2-0.5):(i2>(max/2-0.5)?(max/2):(max/2-1))))/Math.trunc(max/2-0.5))
                //wen unter mitte nim grasshalm[i][1] wen mitte nim i1.x+i1.w/2 und wen über mitte dan i1.x+i1.w
                const addw=(max/2-0.5==i2?i1.w/2:max/2<=i2?i1.w:0)
                //const addh=(max/2-0.5==i2?i1.h/2:max/2<=i2?i1.h:0)
                objvertices.push(grasshalm[i][1]+addw,grasshalm[i][2]-distancefromstartendnormalised*i1.h)
                //grassstartcord.push(grasshalm[i][1]+addw,grasshalm[i][2])
                //grassstartcord.push(grasshalm[i][1],grasshalm[i][2])
                //rotiere mich um 0 punkt
                const rot=Math.abs(Math.cos(i1.rotation))>Math.abs(Math.sin(i1.rotation))
                grassstartcord.push(grasshalm[i][1]+(rot?addw:0),grasshalm[i][2])
                //grassstartcord.push(grasshalm[i][1]+addw*Math.cos(i1.rotation),grasshalm[i][2]))

                grasssrot.push(i1.rotation)
                grassnum.push(Math.pow(distancefromstartendnormalised,2))
                //grassnum.push(distancefromstartendnormalised)
                //grassvelo.push(i1.velo[0],i1.velo[1])
                windopt.push(i1.strengthgwind,i1.strengthiwind,i1.strengthvelo)
                grassstrawwind.push(...i1.randomwind)
                randomwindtimer.push(...i1.randomwindtimer)//random value x   random value y   timer value  grasswachstum 
                grasscolor.push(...i1.color)
            }
            countsarr.push(max)
        }
        webglgrassdrawarr.firsts=new Int32Array(firstsarr)
        webglgrassdrawarr.counts=new Int32Array(countsarr)
        //console.log((objvertices.length/2)*Float32Array.BYTES_PER_ELEMENT)
        webglbuffer.testbufferoverflow("grass",(objvertices.length/2)*Float32Array.BYTES_PER_ELEMENT)

        //obj die weiter web sind weniger grass details
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.grasscolor.buffer);				
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(grasscolor));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.coordinates1.buffer);				
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(objvertices));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.grassstartcord.buffer);				
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(grassstartcord));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.grassnum.buffer);				
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(grassnum));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.grassrotation.buffer);	
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(grasssrot));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.aWindopt.buffer)
        gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(windopt));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aVelo.buffer)
        gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(grassvelo));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWind.buffer)
        gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(grassstrawwind));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWindrandtimer.buffer)
        gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(randomwindtimer));

        gl.bindBuffer(gl.ARRAY_BUFFER,null)
        grasstogpuwebgl2time[3]=grasstogpuwebgl2time[3]*grasstogpuwebgl2timeabfac+(performance.now()-ttime)*(1-grasstogpuwebgl2timeabfac)
        grasstogpuwebgl2mode=0
    }else window.requestIdleCallback(grasstogpuwebgl23)
}
promallres[18]()