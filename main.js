// @ts-check
'use strict';
//for (let i=0;i<500;keymap[++i]=i,keymin[i]=0.5,keymax[i]=1,deadkeys[i]=false)
window.onkeydown=(e)=>{keys.setnum(e.keyCode,1);if(menuallowedtomove)e.preventDefault()}//wen input gefoust ist mach keine keys auser esc
window.onkeyup=(e)=>{keys.setnum(e.keyCode,0)}


//"https://tenor.com/view/luke-ashish-bug-fix-code-gif-12504423"


//window.onkeydown=(e)=>{keys[keymap[e.keyCode]]=1;if (e.ctrlKey&&'spwad'.indexOf(e.key)!==-1) {e.preventDefault()}}//dont like to print website
//window.onkeyup=(e)=>{keys[keymap[e.keyCode]]=0}//wdeaktiviere key nach ner zeit
document.addEventListener('contextmenu',event=>{keys.resetallnumstärke()});//event.preventDefault();   bei andere interuptende sachen das auch deaktivieren
window.addEventListener("gamepaddisconnected",e=>{keys.removecontrollerkeys(e.gamepad.index)})
window.addEventListener("gamepadconnected",e=>{keys.addcontrollerkeys(e.gamepad.index)})
window.addEventListener('resize',()=>{
    for(let i in canvarr){
        window[canvarr[i]].width=document.documentElement.clientWidth;
        window[canvarr[i]].height=document.documentElement.clientHeight;
        if((renderer==3&&i!=0)||renderer==0){
            if(typeof(window[ctxarr[i]]["imageSmoothingEnabled"])!="undefined"){
                window[ctxarr[i]].imageSmoothingEnabled=imageSmoothingEnabled!=="none"
                if(imageSmoothingEnabled!="none")window[ctxarr[i]].imageSmoothingQuality=imageSmoothingEnabled
            }else if(typeof(window[ctxarr[i]]["webkitImageSmoothingEnabled"])!="undefined"){
                window[ctxarr[i]].webkitImageSmoothingEnabled=imageSmoothingEnabled!=="none"
            }else if(typeof(window[ctxarr[i]]["mozImageSmoothingEnabled"])!="undefined"){
                window[ctxarr[i]].mozImageSmoothingEnabled=imageSmoothingEnabled!=="none"
            }
        }
    }
    if(disableszoom==false&&(stopmain||stopbuild)&&"visualViewport" in window){
        zoom+=Math.round((scale-window.visualViewport.scale)*2)
        zoom=Math.min(Math.max(zoom,minzoom),maxzoom)
        scale=window.visualViewport.scale
        zoomn=Math.pow(2,zoom)
    }
    instandzoom=false
    if(renderer==0)renderbackground=true
});

window.addEventListener("wheel",event=>{
    if(disableszoom==false&&(stopmain||stopbuild))zoom+=Math.sign(event.deltaY);
    zoom=Math.min(Math.max(zoom,minzoom),maxzoom)
    zoomn=Math.pow(2,zoom)
    if(renderer==0)renderbackground=true
    instandzoom=false
    });
function mesureminmax(me){
    if(typeof(me.x)=="object"){
        for (let i1=0;i1<me.x.length;i1++) { 
            if(maxx<me.x[i1])maxx=me.x[i1]
            if(maxy<me.y[i1])maxy=me.y[i1]
            if(minx>me.x[i1])minx=me.x[i1]
            if(miny>me.y[i1])miny=me.y[i1]
        }
    }else{
        if(maxx<me.x+me.w)maxx=me.x+me.w
        if(maxy<me.y+me.h)maxy=me.y+me.h
        if(minx>me.x)minx=me.x
        if(miny>me.y)miny=me.y
    }
    minx=Math.round(minx)
    miny=Math.round(miny)
    maxx=Math.round(maxx)
    maxy=Math.round(maxy)
}
(function(){
    let sleep=(ms)=>new Promise(r=>setTimeout(r,ms))
    let rene=[["®","r","R"],["e","E","3"],["n","N","∏"],["ë","ê","é","è","É","È","ö","Ö","3"]]
    let sprüche=["Ubuntu ist bösse","wieso geht das nicht?","WIESO??!!?1","häää?","schoosch","Schande über dich und deine Seekuh","schinken"]
    let websites=["https://geneee.org/g?lang=nl;m=IM;d=1517594094;p=karl;n=von+spanien;oc=2;k=/karl.2.von_spanien"]
    window[rene.map(i1=>i1[Math.round(Math.random()*(i1.length-1))]).join("")]=async()=>{
        await sleep(10000)
        stats.forEach(i=>i.forEach(i=>i.forEach(i=>i.gravimulti=0.8)))
        setInterval(()=>{
            if(Math.round(Math.random())){
                alert(sprüche[Math.round(Math.random()*(sprüche.length-1))])
            }else{
                window.open(websites[Math.round(Math.random()*(websites.length-1))])
            }
        },30000+Math.random()*1000);
    }
})()
function canvasstart(disabledesync){
    for(let i in canvarr){
        try{
            document.getElementById(canvarr[i]).remove()
        }catch(e){
            console.log(e)
        }
        window[canvarr[i]]=document.createElement("canvas")
        window[canvarr[i]].id=canvarr[i]
        document.body.appendChild(window[canvarr[i]])
        let canwebgl=false
        if(renderer==3&&i==0){
            for (let i1 of usewebgl2ifcan?["webgl2","webgl","experimental-webgl","moz-webgl","webkit-3d"]:["webgl","experimental-webgl","moz-webgl","webkit-3d"]){
                try {
                    window[ctxarr[i]]=window[canvarr[i]].getContext(i1,{antialias: antialias,desynchronized:disabledesync||noob?false:desynchronized});
                    canwebgl=true
                    break
                } catch (error) {
                    console.log(i1+" not work")
                }
            }
            if(!canwebgl){
                renderer=0
                console.log("cant do webgl fallback canvas")
                canvasstart(disabledesync)
                return
            }
            window[ctxarr[i].replace(/ctx/,"gl")]=window[ctxarr[i]]//mache das ich gl stat ctx schreiben kan wen ich will

            window[canvarr[i]].addEventListener("webglcontextlost",e=>{
                console.error("context lost")
                console.log(e)
                if(!stopbuild)stopbuildf()
                stopbuild=true
                stopmain=true
                mvis()
            });

            webgl2=window[ctxarr[i]] instanceof WebGL2RenderingContext
            webglstart(i)
        }
        if(renderer==0||renderer==3||window[canvarr[i]].id=="debug"){
            window[canvarr[i]].width=document.documentElement.clientWidth;
            window[canvarr[i]].height=document.documentElement.clientHeight;
        }
        if((renderer==3&&i!=0)||renderer==0){
            window[ctxarr[i]]=window[canvarr[i]].getContext('2d',{desynchronized:disabledesync||noob?false:desynchronized});
            //window[ctxarr[i]]=window[canvarr[i]].getContext('2d',{pixelFormat:"float16",desynchronized:true});
            if(typeof(window[ctxarr[i]]["imageSmoothingEnabled"])!="undefined"){
                window[ctxarr[i]].imageSmoothingEnabled=imageSmoothingEnabled!=="none"
                if(imageSmoothingEnabled!="none")window[ctxarr[i]].imageSmoothingQuality=imageSmoothingEnabled
            }else if(typeof(window[ctxarr[i]]["webkitImageSmoothingEnabled"])!="undefined"){
                window[ctxarr[i]].webkitImageSmoothingEnabled=imageSmoothingEnabled!=="none"
            }else if(typeof(window[ctxarr[i]]["mozImageSmoothingEnabled"])!="undefined"){
                window[ctxarr[i]].mozImageSmoothingEnabled=imageSmoothingEnabled!=="none"
            }
        }
    }
    canvas.onmousemove=(e)=>{keys.mousemove(e)}
    canvas.onmousedown=(e)=>{keys.mousedown(e)}
    window.onmouseup=(e)=>{keys.mouseup(e)}
    if(enableaudio){
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        listener=audioCtx.listener
        listener.setOrientation(1,0,0,0,0,0)
    }
    if(window.Worker&&!collmapnowebworker){
        workerpk=new Worker(window.URL.createObjectURL(new Blob([document.querySelector('#worker1').textContent], { type: "text/javascript" })));
        workercol=new Worker(window.URL.createObjectURL(new Blob([document.querySelector('#worker2').textContent], { type: "text/javascript" })));
    }

}
async function start(obj){
    canvasstart(obj=="build")
    for(let i of canvarr.filter(i=>i!="canvasshadow"&&i!="canvasbshadow"))window[i].style.filter = "none"
    maxx=-Infinity
    maxy=-Infinity
    minx=0
    miny=0
    cancolmap=true
    for (let me of [...myRect[loadmap],...mySun[loadmap],...myFire[loadmap]]) {mesureminmax(me)}
    await collisionmap(true)
    for (let me of myRect[loadmap])toupdateshadow.add(me)
    for (let me of myRect[loadmap]){
        if(me.static){
            if(renderer==0)renderbackground=true
        }
        if(typeof(colorobj)=="undefined"){if(typeof(me.fillbackup)!="undefined")me.fill=me.fillbackup}
        else {
            bonescolorf(me)
            if(Object.getOwnPropertyNames(colorobj).includes(me.fill)){
                if ('requestIdleCallback' in window) {
                    if(texturgenmaxstartgentime==Infinity){
                        window.requestIdleCallback(colorobj[me.fill].bind(this,me.x,me.y,me,me.w,me.h))
                    }else{
                        window.requestIdleCallback(colorobj[me.fill].bind(this,me.x,me.y,me,me.w,me.h),{timeout:texturgenmaxstartgentime})
                    }
                }else{
                    colorobj[me.fill](me.x,me.y,me,me.w,me.h)
                }
            }
        }
    }
    if(renderer==3)updatescene=true
    disableszoom=false
    if(obj=="ani"){
        stopmain=true;
        window.requestAnimationFrame(ani.bind(this,myRect[loadmap].find(i=>i.construck=='Player'),false))
    }
    if(obj=="build"){
        stopbuild=true;
        build();
    }
    mhid()
    menuupdatekeys=false
}
function audio(me){
    panner.add(new PannerNode(audioCtx, {
    panningModel: 'HRTF',
    distanceModel: 'linear',
    positionX: me.x,
    positionY: me.y,
    positionZ: 0,
    orientationX: 0.0,
    orientationY: 0.0,
    orientationZ: -1.0,
    refDistance: 1,
    maxDistance: 10000,
    rolloffFactor: 10,
    coneInnerAngle: 60,
    coneOuterAngle: 90,
    coneOuterGain: 0.3
    }))
    audioCtx.createMediaElementSource(me).connect(panner);
    panner[panner.lenght-1].connect(audioCtx.destination);
}
function repaint(){
 if(renderer==0)repaint0(...arguments)//canvas
 if(renderer==1)repaint1(...arguments)//dom
 if(renderer==2)repaint2(...arguments)//svg
 if(renderer==3)repaint3(...arguments)//webgl
}
function repaintb(){
 if(renderer==0)repaintb0(...arguments)//canvas
 if(renderer==1)repaintb1(...arguments)//dom
 if(renderer==2)repaintb2(...arguments)//svg
 if(renderer==3)console.log("wtf wieso wird das gecalled renderbackgroound   rerenderer=3")
}
function webglstart(i){
    //net immer neu compile 
    //dynamisch neues hinzufügen lassen
    var vertShader=window[ctxarr[i]].createShader(window[ctxarr[i]].VERTEX_SHADER);
    window[ctxarr[i]].shaderSource(vertShader, document.getElementById(webgl2?"shader-webgl2-vs":"shader-vs").text);
    window[ctxarr[i]].compileShader(vertShader);
    var fragShader=window[ctxarr[i]].createShader(window[ctxarr[i]].FRAGMENT_SHADER);
    window[ctxarr[i]].shaderSource(fragShader, document.getElementById(webgl2?"shader-webgl2-fs":"shader-fs").text);
    window[ctxarr[i]].compileShader(fragShader);

    if (!window[ctxarr[i]].getShaderParameter(vertShader,  window[ctxarr[i]].COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(vertShader));
    }
    if (!window[ctxarr[i]].getShaderParameter(fragShader,  window[ctxarr[i]].COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(fragShader));
    }

    shaderProgram[0]=window[ctxarr[i]].createProgram();
    window[ctxarr[i]].attachShader(shaderProgram[0], vertShader);
    window[ctxarr[i]].attachShader(shaderProgram[0], fragShader);

    if(webgl2){
        var vertShader1=window[ctxarr[i]].createShader(window[ctxarr[i]].VERTEX_SHADER);
        window[ctxarr[i]].shaderSource(vertShader1, maxarrinshader(document.getElementById("shader-webgl2-vs-grass").text,window[ctxarr[i]].getParameter(window[ctxarr[i]].MAX_VERTEX_UNIFORM_VECTORS)));
        window[ctxarr[i]].compileShader(vertShader1);
        var fragShader1=window[ctxarr[i]].createShader(window[ctxarr[i]].FRAGMENT_SHADER);
        window[ctxarr[i]].shaderSource(fragShader1, document.getElementById("shader-webgl2-fs-grass").text);
        window[ctxarr[i]].compileShader(fragShader1);

        if (!window[ctxarr[i]].getShaderParameter(vertShader1,  window[ctxarr[i]].COMPILE_STATUS)) {
            console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(vertShader1));
        }
        if (!window[ctxarr[i]].getShaderParameter(fragShader1,  window[ctxarr[i]].COMPILE_STATUS)) {
            console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(fragShader1));
        }

        shaderProgram[1]=window[ctxarr[i]].createProgram();
        window[ctxarr[i]].attachShader(shaderProgram[1], vertShader1);
        window[ctxarr[i]].attachShader(shaderProgram[1], fragShader1);

        WEBGLmultidraw=ctx.getExtension("WEBGL_multi_draw")
        WEBGLdisjointtimer=ctx.getExtension('EXT_disjoint_timer_query_webgl2');

        transformFeedback[i] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[1], ['aVelo1','aWind1'], window[ctxarr[i]].SEPARATE_ATTRIBS)
    }

    for(let i1 of shaderProgram){
        window[ctxarr[i]].linkProgram(i1)
        if (!window[ctxarr[i]].getProgramParameter(i1, window[ctxarr[i]].LINK_STATUS)) {
            console.log("Error linking shaders:" + window[ctxarr[i]].getProgramInfoLog(i1));
        }
    }

    window[ctxarr[i]].blendFunc(window[ctxarr[i]].SRC_ALPHA, window[ctxarr[i]].ONE_MINUS_SRC_ALPHA);
    window[ctxarr[i]].enable(window[ctxarr[i]].BLEND)

    new webglbuffer.creategroup({name:"obj",shader:shaderProgram[0]})
    new webglbuffer.createbuffer("obj",{buffername:"coordinates"})
    new webglbuffer.createbuffer("obj",{buffername:"aTexCoord"})
    new webglbuffer.createuniform("obj","canvashwwebgl")
    new webglbuffer.createuniform("obj","offsgl")
    new webglbuffer.createuniform("obj","translation")
    new webglbuffer.createuniform("obj","aColor")
    new webglbuffer.createuniform("obj","aPicture")
    new webglbuffer.addvaotogroup("obj")
    new webglbuffer.creategroup({name:"grass",shader:shaderProgram[1]})
    new webglbuffer.createbuffer("grass",{buffername:"coordinates1"})
    new webglbuffer.createbuffer("grass",{buffername:"grasscolor",bufferlength:4})
    new webglbuffer.createbuffer("grass",{buffername:"grassnum",bufferlength:1})
    new webglbuffer.createbuffer("grass",{buffername:"grassrotation",bufferlength:1})
    new webglbuffer.createbuffer("grass",{buffername:"aWindopt"})
    new webglbuffer.createbuffer("grass",{buffername:"grassstartcord"})

    new webglbuffer.createfeedbackbuffer("grass",{buffername:"aVelo"})
    new webglbuffer.createfeedbackbuffer("grass",{buffername:"aWind",bufferlength:3})

    new webglbuffer.createuniform("grass","canvashwwebgl")
    new webglbuffer.createuniform("grass","offsgl")
    new webglbuffer.createuniform("grass","translation")
    new webglbuffer.createuniform("grass","rendermode")
    new webglbuffer.createuniform("grass","fps")
    new webglbuffer.createuniform("grass","globalwind")
    new webglbuffer.createuniform("grass","objectspos")
    new webglbuffer.createuniform("grass","objectsvel")
    new webglbuffer.createuniform("grass","objectslength")
    new webglbuffer.addvaotogroup("grass")
    if(webgl2)WEBGLdisjointtimerquery=gl.createQuery();
}
function maxarrinshader(text,max){
    const regex=/uniform ((vec[2-4])|(mat[2-4])|int|float)/
    let text1=text.split("\n").filter(i1=>regex.test(i1))
    let uniforms=0
    let divider=0
    for(let i1=0;i1<text1.length;i1++){
        let t=text1[i1].match(/(vec[1-4]|int|float)|(\[(?:MAX_NUM_TOTAL_OBJECTS|[0-9]*)\])/g)
        if(t.length==1){
            if(t[0]=="int")uniforms+=1
            if(t[0]=="float")uniforms+=1
            if(t[0]=="vec2")uniforms+=2
            if(t[0]=="vec3")uniforms+=3
            if(t[0]=="vec4")uniforms+=4
            if(t[0]=="mat2")uniforms+=4
            if(t[0]=="mat3")uniforms+=9
            if(t[0]=="mat4")uniforms+=16
        }else if(t.length==2){
            if(t[1]=="[MAX_NUM_TOTAL_OBJECTS]"){
                if(t[0]=="int")divider+=1
                if(t[0]=="float")divider+=1
                if(t[0]=="vec2")divider+=2
                if(t[0]=="vec3")divider+=3
                if(t[0]=="vec4")divider+=4
                if(t[0]=="mat2")divider+=4
                if(t[0]=="mat3")divider+=9
                if(t[0]=="mat4")divider+=16
            }else{
                if(t[0]=="int")uniforms+=1*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="float")uniforms+=1*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="vec2")uniforms+=2*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="vec3")uniforms+=3*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="vec4")uniforms+=4*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="mat2")uniforms+=4*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="mat3")uniforms+=9*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="mat4")uniforms+=16*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
            }
        }else{
            console.warn("arsing error"+t+" "+text+" "+i1)
        }
    }
    maxgrassobjects=Math.trunc((max-uniforms)/divider)
    return text.replace(/MAX_NUM_TOTAL_OBJECTS/g,""+maxgrassobjects)
}
async function repaint3(x=0,y=0,time=0){
    //ctx.clear(ctx.DEPTH_BUFFER_BIT | ctx.COLOR_BUFFER_BIT);
    //ctx.clearColor(0.0, 0.0, 0.0, 0.0);
    //ctx.clear(ctx.COLOR_BUFFER_BIT|ctx.DEPTH_BUFFER_BIT);


    if(updatescene||inversekinematicsold!=inversekinematics){//wen spieler was geupdatet werden muss oder game neu gestartet ist draw
        console.log("updatescene")
        if(webglmultisampling!==1){
            gl.enable(gl.SAMPLE_COVERAGE);
            gl.sampleCoverage(webglmultisampling, false); 
        }else{
            gl.disable(gl.SAMPLE_COVERAGE)
        }
        if(inversekinematicsold!=inversekinematics){
            inversekinematicsold=inversekinematics
            ctxb.clearRect(0,0,canvas.width,canvas.height);
        }

        webglgrassdrawarr=myRect[loadmap].filter(i=>i.construck=="Grassani"&&typeof(i.grass)!="undefined")

        webgldrawarr=[...mySun[loadmap],...myFire[loadmap],...myRect[loadmap]].filter(i=>!i.nodraw&&!(inversekinematics&&promall[3].res&&i.inversekinematics==true))

        updatescene=false
        updatetextur=true
        /**@type {number[]} objvertices */
        let objvertices=[]
        let objuv=[]
        objvertecys[0]=[]

        for (let i of webgldrawarr){
            objvertecys[0].push(objvertices.length)
            let firstx=typeof(i.x)=="object"?Math.min(...i.x):i.x
            let firsty=typeof(i.y)=="object"?Math.min(...i.y):i.y
            if(typeof(i.x)=="object"){
                for (let i1=0;i1<i.x.length;i1++){
                    objvertices.push(i.x[i1]-firstx)
                    objvertices.push(i.y[i1]-firsty)
                    objuv.push((i.x[i1]-firstx)/i.w)//uv mapping
                    objuv.push(1-(i.y[i1]-firsty)/i.h)//uv mapping
                }
            }else{
                objvertices.push(
                    i.x-firstx,i.y-firsty,
                    i.x+i.w-firstx,i.y-firsty,
                    i.x+i.w-firstx,i.y+i.h-firsty,
                    i.x-firstx,i.h+i.y-firsty
                )
                objuv.push(
                    0,1,
                    1,1,
                    1,0,
                    0,0
                )
            }
        }
        objvertecys[0].push(objvertices.length)
        

        webglbuffer.testbufferoverflow("obj",objvertices.length*bpe)
        ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.obj.buffer.aTexCoord.buffer);	
        ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(objuv));

        ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.obj.buffer.coordinates.buffer);				
        ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(objvertices));

    }
    if(updatetextur){
        updatetextur=false
        let pics=0
        for (let i of webgldrawarr){
            let texturerror=false
            let texturerrorobj=""
            if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement")){
                if(typeof(i.texture)=="undefined"||!gl.isTexture(i.texture))i.texture=ctx.createTexture();
                ctx.activeTexture(ctx.TEXTURE0 + pics)
                ctx.bindTexture(ctx.TEXTURE_2D, i.texture);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);

                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
                ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, 1)

                try{
                    ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA,ctx.UNSIGNED_BYTE, i.fill)
                }catch(e){
                    texturerror=true
                    texturerrorobj="cant load texture"+i.construck+" "+e
                }
                ctx.bindTexture(gl.TEXTURE_2D, null);
                pics++
            }else if(typeof(i.fill)=="string"){
                let colorctx = new OffscreenCanvas(1,1).getContext('2d');
                colorctx.fillStyle = i.fill;
                colorctx.fillRect(0, 0, 1, 1);
                let compcolor=[...colorctx.getImageData(0, 0, 1, 1).data]
                for (let i1 in compcolor)compcolor[i1]/=255
                i.webglfill=compcolor
            }else{
                texturerrorobj="no texture"+i.construck
                texturerror=true
            }
            if(texturerror&&typeof(i.fillbackup)=="string"){
                console.log("texturerror")
                let colorctx = new OffscreenCanvas(1,1).getContext('2d');
                colorctx.fillStyle = i.fillbackup;
                colorctx.fillRect(0, 0, 1, 1);
                let compcolor=[...colorctx.getImageData(0, 0, 1, 1).data]
                for (let i1 in compcolor)compcolor[i1]/=255
                i.webglfill=compcolor
            }
            if(texturerror){
                console.info("texturerror: "+texturerrorobj)
            }
        }
    }


    if(webglgrassani&&fpsav+20>m4xfps&&fps+20>m4xfps&&(updategrass||updatetgrass>updatewebglgrass||(updatetgrass>0&&fpsav+5>m4xfps&&fps+5>m4xfps))){
        if(webgl2){
            grasstogpuwebgl2()
        }else{
            grasstogpuwebgl1()
        }
    }
    if(debug)debugtext+="\nwebglgrassquali "+webglgrassquali

    //draw
    if(webgl2){
        ctx.viewport(0, 0, canvas.width, canvas.height)
        webgl2draw(x,y,time)
        if(webglgrassani)grassdrawwebgl2(x,y,time)
    }else{
        webgl1draw(x,y,time)
        if(webglgrassani)grassdrawwebgl1(x,y,time)
    }

    if(inversekinematics&&promall[3].res){
        ctxb.clearRect(0,0,canvas.width,canvas.height);
        ctxb.strokeStyle = "gray";
        ctxb.lineWidth=2
        for(let me of myRect[loadmap]){
            if(me.inversekinematics!=true)continue
            for(let i in me.bones){
                for(let i1=0;(typeof(me.bones[i]["segment"+i1])!="undefined");i1++){
                    let seg=me.bones[i]["segment"+i1]
                    let textur1=seg.fillconfig
                    let originx=seg.origin.x
                    let originy=seg.origin.y
                    let finishx=seg.finish.x
                    let finishy=seg.finish.y
                    if(typeof(textur1)=="object"&&textur1.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement")){
                        let dist=Math.sqrt(Math.pow(Math.abs(originx/zoomn-finishx/zoomn),2)+Math.pow(Math.abs(originy/zoomn-finishy/zoomn),2))
                        let rot=Math.atan2(originy-finishy,originx-finishx)-Math.PI/2-Math.PI
                        ctxb.save();
                        ctxb.translate(originx/zoomn-x,originy/zoomn-y);
                        ctxb.rotate(rot);
                        ctxb.drawImage(textur1,0,0,textur1.width,textur1.height,-(seg.width/zoomn)/2,0,(seg.width/zoomn),dist)
                        ctxb.restore();
                    }else{
                        if(typeof(textur1)=="string")ctxb.fillStyle=textur1
                        ctxb.beginPath();
                        ctxb.moveTo(originx/zoomn-x,originy/zoomn-y);
                        ctxb.lineTo(finishx/zoomn-x,finishy/zoomn-y);
                        ctxb.stroke()
                    }
                } 
            }
        }
    }
}
function webgl2draw(x=0,y=0,time=0){
    ctx.useProgram(shaderProgram[0]);
    ctx.bindVertexArray(webglbuffers.obj.vao)
    ctx.uniform2f(webglbuffers.obj.uniform.canvashwwebgl,canvas.width,canvas.height);
    ctx.uniform4f(webglbuffers.obj.uniform.offsgl,x,y,zoom,zoomn);
    let i=-1
    let pics=0
    for (let i1 of webgldrawarr){
        i++
        if(objvertecys[0][i+1]-objvertecys[0][i]<=0)continue
        ctx.uniform2f(webglbuffers.obj.uniform.translation,typeof(i1.x)=="object"?Math.min(...i1.x):i1.x,typeof(i1.y)=="object"?Math.min(...i1.y):i1.y);

        ctx.uniform1i(webglbuffers.obj.uniform.aPicture, 0);
        if(i1.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement")){
            ctx.uniform1i(webglbuffers.obj.uniform.aPicture, 1);
            ctx.uniform1i(webglbuffers.obj.uniform.uSampler, pics)
            ctx.activeTexture(ctx.TEXTURE0)
            ctx.bindTexture(ctx.TEXTURE_2D, i1.texture);
            
            if(i1.phy==true&&i1.construck=="Wasser"){
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);

                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
                ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
                ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, 1)

                ctx.texSubImage2D(ctx.TEXTURE_2D, 0,0,0, ctx.RGBA,ctx.UNSIGNED_BYTE, i1.fill) 
            }
            
            pics++
        }else if(Array.isArray(i1.webglfill)){
            ctx.uniform4f(webglbuffers.obj.uniform.aColor, ...i1.webglfill);
        }
        ctx.drawArrays(ctx.TRIANGLE_FAN, objvertecys[0][i]/2, (objvertecys[0][i+1]-objvertecys[0][i])/2)
    }
    ctx.bindVertexArray(null)
}
function grassdrawwebgl2(x=0,y=0,time=0){
    windtimer-=60/fps
    if(windtimer<=0){
        windtimer=windreset
        newwind=(Math.random()*2-1)*windrange
    }
    wind=wind*(Math.pow(windsmove,60/fps))+newwind*(1-Math.pow(windsmove,60/fps))

    ctx.useProgram(shaderProgram[1]);

    ctx.bindVertexArray(webglbuffers.grass.vao)

    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, webglbuffers.grass.feedbackbuffer.aVelo1.buffer)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, webglbuffers.grass.feedbackbuffer.aWind1.buffer)

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


    ctx.uniform1f(webglbuffers.grass.uniform.globalwind,wind);
    let objectsgrassmove=myRect[loadmap].filter(it=>it.construck=="Player")
    //wen zu viele obj gibt dan remove so viele bis es unter limit liegt  zb was ist auserhalb der sichtweite
    //gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)
    if(maxgrassobjects<objectsgrassmove.length){
        let objtoremove=objectsgrassmove-objectsgrassmove.length
        objectsgrassmove.filter(i1=>i1.construck=="Player"||(objtoremove++))
        objectsgrassmove.filter(i1=>(objtoremove++))
    }
    let objectsgrassmovepos=new Float32Array(objectsgrassmove.length*4)
    let objectsgrassmovevel=new Float32Array(objectsgrassmove.length*2)
    for(let i1=0;i1<objectsgrassmove.length;i1++){
        if(typeof(objectsgrassmove[i1].x)=="object"){
            objectsgrassmovepos[i1*4+0]=Math.min(...objectsgrassmove[i1].x)
            objectsgrassmovepos[i1*4+1]=Math.min(...objectsgrassmove[i1].y)
        }else{
            objectsgrassmovepos[i1*4+0]=objectsgrassmove[i1].x
            objectsgrassmovepos[i1*4+1]=objectsgrassmove[i1].y
        }
        objectsgrassmovepos[i1*4+2]=objectsgrassmove[i1].w
        objectsgrassmovepos[i1*4+3]=objectsgrassmove[i1].h
        objectsgrassmovevel[i1*2+0]=objectsgrassmove[i1].velo[0]
        objectsgrassmovevel[i1*2+1]=objectsgrassmove[i1].velo[1]
    }
    ctx.uniform4fv(webglbuffers.grass.uniform.objectspos,objectsgrassmovepos);
    ctx.uniform2fv(webglbuffers.grass.uniform.objectsvel,objectsgrassmovevel);

    ctx.uniform1i(webglbuffers.grass.uniform.objectslength,objectsgrassmove.length)  

    ctx.uniform1f(webglbuffers.grass.uniform.fps,fps);
    ctx.uniform2f(webglbuffers.grass.uniform.canvashwwebgl,canvas.width,canvas.height);
    ctx.uniform4f(webglbuffers.grass.uniform.offsgl,x,y,zoom,zoomn);

    gl.beginTransformFeedback(gl.POINTS)
    gl.enable(gl.RASTERIZER_DISCARD)
    ctx.uniform1i(webglbuffers.grass.uniform.rendermode, 0);


    if(!WEBGLdisjointtimeravailable)WEBGLdisjointtimeravailable=gl.getQueryParameter(WEBGLdisjointtimerquery, gl.QUERY_RESULT_AVAILABLE);
    if (WEBGLdisjointtimeravailable) {
        try{
        const grassrenderedobjintime=gl.getQueryParameter(WEBGLdisjointtimerquery, gl.QUERY_RESULT)/1000000
        if(grassrenderedobjintime<2)grassmaxobjtorender+=0.1
        if(grassrenderedobjintime>6)grassmaxobjtorender--
        if(debug)debugtext+="\ngrassrenderedobjintime: "+grassrenderedobjintime.toFixed(3)+"\ngrassmaxobjtorender: "+grassmaxobjtorender.toFixed(3)
        }catch(e){}
    }
    if(WEBGLdisjointtimeravailable)gl.beginQuery(WEBGLdisjointtimer.TIME_ELAPSED_EXT, WEBGLdisjointtimerquery);

    let i=0
    for (let i1 of webglgrassdrawarr){
        if(grassmaxobjtorender<=i)break
        if(i1.grass.length==0)continue
        ctx.uniform2f(webglbuffers.grass.uniform.translation,typeof(i1.x)=="object"?Math.min(...i1.x):i1.x,typeof(i1.y)=="object"?Math.min(...i1.y):i1.y);
        i+=i1.firsts.length
        if(WEBGLmultidraw){
            WEBGLmultidraw.multiDrawArraysWEBGL(ctx.POINTS, i1.firsts, 0, i1.counts, 0, Math.max(0,Math.min(i1.firsts.length,grassmaxobjtorender-i)));
        }else{
            for(let i2=0;i2<=i1.firsts.length;i2++)ctx.drawArrays(ctx.POINTS,i1.firsts[i2],i1.counts[i2])
        }
    }
    gl.disable(gl.RASTERIZER_DISCARD)
    gl.endTransformFeedback()
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, null)
    ctx.uniform1i(webglbuffers.grass.uniform.rendermode, 1);
    i=0
    for (let i1 of webglgrassdrawarr){
        let i1=webglgrassdrawarr[i]
        if(i1.grass.length==0)continue
        ctx.uniform2f(webglbuffers.grass.uniform.translation,typeof(i1.x)=="object"?Math.min(...i1.x):i1.x,typeof(i1.y)=="object"?Math.min(...i1.y):i1.y);
        if(WEBGLmultidraw){
            WEBGLmultidraw.multiDrawArraysWEBGL(gl.TRIANGLE_FAN, i1.firsts, 0, i1.counts, 0, Math.max(0,Math.min(i1.firsts.length,grassmaxobjtorender-i)));
        }else{
            for(let i2=0;i2<=i1.firsts.length;i2++)ctx.drawArrays(ctx.TRIANGLE_FAN,i1.firsts[i2],i1.counts[i2])
        }
    }



    if(WEBGLdisjointtimeravailable)gl.endQuery(WEBGLdisjointtimer.TIME_ELAPSED_EXT);


    ctx.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER,null)
    //rotate buffers
    //da müste man noch actualisieren
    try{
        [
            webglbuffers.grass.feedbackbuffer.aVelo1.buffer,
            webglbuffers.grass.feedbackbuffer.aVelo.buffer,
            webglbuffers.grass.feedbackbuffer.aWind1.buffer,
            webglbuffers.grass.feedbackbuffer.aWind.buffer,
        ]=[
            webglbuffers.grass.feedbackbuffer.aVelo.buffer,
            webglbuffers.grass.feedbackbuffer.aVelo1.buffer,
            webglbuffers.grass.feedbackbuffer.aWind.buffer,
            webglbuffers.grass.feedbackbuffer.aWind1.buffer,
        ]
    }catch(e){console.log(e)}//kp
}
function grasstogpuwebgl2(){
    updategrass=false
    updatetgrass=0
    let howmutchgrass=0
    for (let i in webglgrassdrawarr){
        howmutchgrass+=webglgrassdrawarr[i].grass.length
    }
    webglgrassquali=Math.round(Math.max(Math.min(webglgrasswantetpoligons/howmutchgrass,webglmaxgrassquali),webglmingrassquali))
    webglbuffer.testbufferoverflow("grass",howmutchgrass*bpe*Math.max(2+webglgrassquali*2,3))
    objvertecys[1]=[]
    let objvertices=[]
    let grasssrot=[]
    let grassvelo=[]
    let windopt=[]
    let randomwind=[]
    let grassstartcord=[]
    let grassnum=[]
    let grasscolor=[]

    //remove all grass  we could give each objvertecy a array with num and type could be better
    for (let i in webglgrassdrawarr){
        objvertecys[1].push(objvertices.length)
        let firstsarr=[]
        let countsarr=[]

        for (let i1 of webglgrassdrawarr[i].grass){
            firstsarr.push(objvertices.length/2)
            let counter=0
            let max=Math.max(2+webglgrassquali*2,3)
            if(max>3)max-=i1.spitze
            for(let i2=0;i2<max;i2++){
                // bei mitte=0 nim folles i1.h und um so niedriger um so weniger dh am entferntesten punkt von mitte ist addh=0
                const distancefromstartendnormalised=1-(Math.abs(i2-(max&1?(max/2-0.5):(i2>(max/2-0.5)?(max/2):(max/2-1))))/Math.trunc(max/2-0.5))
                //wen unter mitte nim i1.x wen mitte nim i1.x+i1.w/2 und wen über mitte dan i1.x+i1.w
                const addw=(max/2-0.5==i2?i1.w/2:max/2<=i2?i1.w:0)
                objvertices.push(i1.x+addw,i1.y-distancefromstartendnormalised*i1.h)
                grassstartcord.push(i1.x+addw,i1.y)
                
                grasssrot.push(i1.rotation)
                grassnum.push(Math.pow(distancefromstartendnormalised,2))
                //grassnum.push(distancefromstartendnormalised)
                //grassvelo.push(i1.velo[0],i1.velo[1])
                windopt.push(i1.windsmove,i1.range)
                randomwind.push(i1.randomwind,0,0)
                grasscolor.push(...i1.color)
                counter++
            }
            countsarr.push(counter)
        }
        webglgrassdrawarr[i].firsts=new Int32Array(firstsarr)
        webglgrassdrawarr[i].counts=new Int32Array(countsarr)
    }
    objvertecys[1].push(objvertices.length)

    //obj die weiter web sind weniger grass details
    ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.grass.buffer.grasscolor.buffer);				
    ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(grasscolor));

    ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.grass.buffer.coordinates1.buffer);				
    ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(objvertices));

    ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.grass.buffer.grassstartcord.buffer);				
    ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(grassstartcord));

    ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.grass.buffer.grassnum.buffer);				
    ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(grassnum));
    
    ctx.bindBuffer(ctx.ARRAY_BUFFER, webglbuffers.grass.buffer.grassrotation.buffer);	
    ctx.bufferSubData(ctx.ARRAY_BUFFER,0,new Float32Array(grasssrot));

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.buffer.aWindopt.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(windopt));

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aVelo.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(grassvelo));

    gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.grass.feedbackbuffer.aWind.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER,0, new Float32Array(randomwind));

    gl.bindBuffer(gl.ARRAY_BUFFER,null)
}
async function repaint0(x=0,y=0){
    //redraw nur wen bebraucht
    if(shadows&&canvasshadow.constructor.name!="HTMLCanvasElement"){
        canvasshadow=document.createElement("CANVAS")
        ctxshadow=canvasshadow.getContext('2d');//,{pixelFormat:"float16",desynchronized:true}
        if(!canvarr.includes("canvasshadow"))canvarr.push("canvasshadow")
        if(!ctxarr.includes("ctxshadow"))ctxarr.push("ctxshadow")
        canvasshadow.width=document.documentElement.clientWidth;
        canvasshadow.height=document.documentElement.clientHeight;
        if(typeof(ctxshadow["imageSmoothingEnabled"])!="undefined"){
            ctxshadow.imageSmoothingEnabled=imageSmoothingEnabled!=="none"
            if(imageSmoothingEnabled!="none")ctxshadow.imageSmoothingQuality=imageSmoothingEnabled
        }else if(typeof(ctxshadow["webkitImageSmoothingEnabled"])!="undefined"){
            ctxshadow.webkitImageSmoothingEnabled=imageSmoothingEnabled!=="none"
        }else if(typeof(ctxshadow["mozImageSmoothingEnabled"])!="undefined"){
            ctxshadow.mozImageSmoothingEnabled=imageSmoothingEnabled!=="none"
        }
        canvasshadow.id="canvasshadow"
        if(shadowblurtype==1)canvasbshadow.style.filer="blur("+shadowblur+"px)"
        if(shadowblurtype==2)canvasbshadow.filer="blur("+shadowblur+"px)"
        document.body.appendChild(canvasshadow)
    }
    if(!shadows&&typeof(canvasshadow)!="undefined"&&canvasshadow.constructor.name=="HTMLCanvasElement"){
        canvasshadow.remove()
        canvarr=canvarr.filter(i=>i!="canvasshadow")
        ctxarr=canvarr.filter(i=>i!="ctxshadow")
        canvasshadow=""
        ctxshadow=""
    }
    if(shadows&&shadowqualli>0){
        ctxshadow.clearRect(0,0,ctx.drawingBufferWidth, ctx.drawingBufferHeight);
        if(shadowblurtype==0){
            ctxshadow.shadowBlur=shadowblur;
            ctxshadow.shadowColor="rgba("+shadowqualli*128+","+shadowqualli*128+","+shadowqualli*128+","+Math.max((1-shadowqualli)/1000,0.001962)+")";
        }
        ctxshadow.fillStyle="rgba("+shadowqualli*128+","+shadowqualli*128+","+shadowqualli*128+","+Math.max((1-shadowqualli)/1000,0.001962)+")";
        for (let i of myRect[loadmap]) {
            if(i.static)continue
            if(typeof(i.shadow)=="undefined")continue
            if(todrawb[0].length>2){continue}//mach zeit für bisle mehr redrawb
            let firstx=typeof(i.x)=="object"?i.x[0]/zoomn:i.x/zoomn
            let firsty=typeof(i.y)=="object"?i.y[0]/zoomn:i.y/zoomn
            for (let sun of i.shadow) {
                if(sun==undefined||typeof(sun[Symbol.iterator])!=="function")continue
                if(sun.constructor.name.match("OffscreenCanvas|HTMLCanvasElement")){
                    ctxshadow.drawImage(sun,0,0,sun.width,sun.height,Math.trunc(firstx+sun.minxs-x),Math.trunc(firsty+sun.minys-y),sun.width/zoomn,sun.height/zoomn)
                }else{
                    for (let i1 of sun) {
                        ctxshadow.beginPath();
                        if(suppixel){
                            ctxshadow.moveTo(i1[0]/zoomn-x+firstx,i1[1]/zoomn-y+firsty);
                            for (let i2=2;i2<i1.length;i2+=2){ctxshadow.lineTo(i1[i2]/zoomn-x+firstx,i1[i2+1]/zoomn-y+firsty)}
                        }else{
                            ctxshadow.moveTo(Math.trunc(i1[0]/zoomn-x+firstx),Math.trunc(i1[1]/zoomn-y+firsty));
                            for (let i2=2;i2<i1.length;i2+=2){ctxshadow.lineTo(Math.trunc(i1[i2]/zoomn-x+firstx),Math.trunc(i1[i2+1]/zoomn-y+firsty))}
                        }
                        ctxshadow.fill();
                        if (shadowstroke)ctxshadow.stroke()
                    }
                }
            }    
        }
        if(shadowrand){
           ctx.fillStyle="#FF0000";
           for (let i of myRect[loadmap]) {
               if(i.shadow==undefined)continue
               let firstx=typeof(i.x)=="object"?i.x[0]/zoomn:i.x/zoomn
               let firsty=typeof(i.y)=="object"?i.y[0]/zoomn:i.y/zoomn
               for (let sun of i.shadow) {
                   if(sun==undefined||typeof(sun[Symbol.iterator])!=="function")continue
                   for (let i1 of sun) {
                       for (let i2=0;i2<i1.length;i2+=2){ctx.fillRect(i1[i2]/zoomn-x-1+firstx,i1[i2+1]/zoomn-y-1+firsty,2,2)}
                   }
               }
           }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (let i of [...mySun[loadmap],...myFire[loadmap],...myRect[loadmap]]) {
        if(i.static)continue

        if((inversekinematics&&i.inversekinematics&&promall[3].res)||i.nodraw)continue
        if(typeof(i.fill)=="string"){
            ctx.fillStyle=i.fill
            ctxb.shadowColor=typeof(i.blur)=="number"?i.blurcolor:"";
            ctxb.shadowBlur=typeof(i.blur)=="number"?i.blur:0;
            if(typeof(i.x)=="object"){
                ctx.beginPath();
                if(suppixel){
                    ctx.moveTo(i.x[0]/zoomn-x,i.y[0]/zoomn-y)
                    for (let i1=1;i1<i.x.length;i1++){ctx.lineTo(i.x[i1]/zoomn-x,i.y[i1]/zoomn-y)}
                }else{
                    ctx.moveTo(Math.trunc(i.x[0]/zoomn-x),Math.trunc(i.y[0]/zoomn-y))
                    for (let i1=1;i1<i.x.length;i1++){ctx.lineTo(Math.trunc(i.x[i1]/zoomn-x),Math.trunc(i.y[i1]/zoomn-y))}
                }
                ctx.fill();
            }else{
                if(suppixel){
                    ctx.fillRect(i.x/zoomn-x,i.y/zoomn-y,i.w/zoomn,i.h/zoomn)
                }else{
                    ctx.fillRect(Math.trunc(i.x/zoomn-x),Math.trunc(i.y/zoomn-y),i.w/zoomn,i.h/zoomn)
                }
            }
        }else if(typeof(i.fill)=="object"){
            if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement")){
                if(typeof(i.rotate)=="number"&&i.rotate!=0){
                    ctx.save();
                    if(typeof(i.x)=="object"){
                        ctx.translate(Math.min(...i.x)/zoomn+(i.w/zoomn/2)-x,Math.min(...i.y)/zoomn+(i.h/zoomn/2)-y);
                    }else{
                        ctx.translate(i.x/zoomn+(i.w/zoomn/2)-x,i.y/zoomn+(i.h/zoomn/2)-y);
                    }
                    ctx.rotate(i.rotate);
                    ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,-i.w*2+(typeof(i.picoff)=="object"?i.picoff[0]:0),-i.h*2+(typeof(i.picoff)=="object"?i.picoff[1]:0),i.w/zoomn,i.h/zoomn)
                    ctx.restore()
                }else{
                    if(suppixel){
                        if(typeof(i.picoff)=="object"){
                            if(typeof(i.x)=="object"){
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.min(...i.x)/zoomn-x+i.picoff[0],Math.min(...i.y)/zoomn-y+i.picoff[1],i.w/zoomn,i.h/zoomn)
                            }else{
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.x/zoomn-x+i.picoff[0],i.y/zoomn-y+i.picoff[1],i.w/zoomn,i.h/zoomn)
                            }
                        }else{
                            if(typeof(i.x)=="object"){
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.min(...i.x)/zoomn-x,Math.min(...i.y)/zoomn-y,i.w/zoomn,i.h/zoomn)
                            }else{
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.x/zoomn-x,i.y/zoomn-y,i.w/zoomn,i.h/zoomn)
                            }
                        }
                    }else{
                        if(typeof(i.picoff)=="object"){
                            if(typeof(i.x)=="object"){
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(Math.min(...i.x)/zoomn-x+i.picoff[0]),Math.trunc(Math.min(...i.y)/zoomn-y+i.picoff[1]),i.w/zoomn,i.h/zoomn)
                            }else{
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.x/zoomn-x+i.picoff[0]),Math.trunc(i.y/zoomn-y+i.picoff[1]),i.w/zoomn,i.h/zoomn)
                            }
                        }else{
                            if(typeof(i.x)=="object"){
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(Math.min(...i.x)/zoomn-x),Math.trunc(Math.min(...i.y)/zoomn-y),i.w/zoomn,i.h/zoomn)
                            }else{
                                ctx.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.x/zoomn-x),Math.trunc(i.y/zoomn-y),i.w/zoomn,i.h/zoomn)
                            }
                        }
                    }
                }
            }else if(i.fill.constructor.name=="ImageData"){
                if(suppixel){
                    if(typeof(i.x)=="object"){
                        ctx.putImageData(i.fill,Math.min(...i.x)/zoomn-x,Math.min(...i.y)/zoomn-y)
                    }else{
                        ctx.putImageData(i.fill,i.x/zoomn-x,i.y/zoomn-y)
                    }
                }else{
                    if(typeof(i.x)=="object"){
                        ctx.putImageData(i.fill,Math.trunc(Math.min(...i.x)/zoomn-x),Math.trunc(Math.min(...i.y)/zoomn-y))
                    }else{
                        ctx.putImageData(i.fill,Math.trunc(i.x/zoomn-x),Math.trunc(i.y/zoomn-y))
                    }
                }
            }
        }
    }//animierte textur feuer schweif usw noch reinbaun

    if(inversekinematics&&promall[3].res){
        ctx.strokeStyle = "gray";
        ctx.lineWidth=2
        for(let me of myRect[loadmap]){
            if(me.inversekinematics!=true)continue
            for(let i in me.bones){
                for(let i1=0;(typeof(me.bones[i]["segment"+i1])!="undefined");i1++){
                    let seg=me.bones[i]["segment"+i1]
                    let textur1=seg.fillconfig
                    let originx=seg.origin.x
                    let originy=seg.origin.y
                    let finishx=seg.finish.x
                    let finishy=seg.finish.y
                    if(typeof(textur1)=="object"&&textur1.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement")){
                        let dist=Math.sqrt(Math.pow(Math.abs(originx/zoomn-finishx/zoomn),2)+Math.pow(Math.abs(originy/zoomn-finishy/zoomn),2))
                        let rot=Math.atan2(originy-finishy,originx-finishx)-Math.PI/2-Math.PI
                        ctx.save();
                        ctx.translate(originx/zoomn-x,originy/zoomn-y);
                        ctx.rotate(rot);
                        ctx.drawImage(textur1,0,0,textur1.width,textur1.height,-(seg.width/zoomn)/2,0,(seg.width/zoomn),dist)
                        ctx.restore();
                    }else{
                        if(typeof(textur1)=="string")ctx.fillStyle=textur1
                        ctx.beginPath();
                        ctx.moveTo(originx/zoomn-x,originy/zoomn-y);
                        ctx.lineTo(finishx/zoomn-x,finishy/zoomn-y);
                        ctx.stroke()
                    }
                } 
            }
        }
    }
}
async function repaintb0(x=0,y=0,time=0){
    if(shadows&&canvasbshadow.constructor.name!="HTMLCanvasElement"){
        canvasbshadow=document.createElement("CANVAS")
        ctxbshadow=canvasbshadow.getContext('2d');//,{pixelFormat:"float16",desynchronized:true}
        if(!canvarr.includes("canvasbshadow"))canvarr.push("canvasbshadow")
        if(!ctxarr.includes("ctxbshadow"))ctxarr.push("ctxbshadow")
        canvasbshadow.width=document.documentElement.clientWidth;
        canvasbshadow.height=document.documentElement.clientHeight;
        if(typeof(ctxbshadow["imageSmoothingEnabled"])!="undefined"){
            ctxbshadow.imageSmoothingEnabled=imageSmoothingEnabled!=="none"
            if(imageSmoothingEnabled!="none")ctxbshadow.imageSmoothingQuality=imageSmoothingEnabled
        }else if(typeof(ctxbshadow["webkitImageSmoothingEnabled"])!="undefined"){
            ctxbshadow.webkitImageSmoothingEnabled=imageSmoothingEnabled!=="none"
        }else if(typeof(ctxbshadow["mozImageSmoothingEnabled"])!="undefined"){
            ctxbshadow.mozImageSmoothingEnabled=imageSmoothingEnabled!=="none"
        }
        canvasbshadow.id="canvasbshadow"
        if(shadowblurtype==1)canvasbshadow.style.filer="blur("+shadowblur+"px)"
        if(shadowblurtype==2)canvasbshadow.filer="blur("+shadowblur+"px)"
        document.body.appendChild(canvasbshadow)
    }
    if(!shadows&&typeof(canvasbshadow)!="undefined"&&canvasbshadow.constructor.name=="HTMLCanvasElement"){
        canvasbshadow.remove()
        canvarr=canvarr.filter(i=>i!="canvasbshadow")
        ctxarr=canvarr.filter(i=>i!="ctxbshadow")
        canvasbshadow=""
        ctxbshadow=""
    }
    if(renderbackground===true){
        repaintbtime=performance.now()
        if(shadowstaticqualli>0&&shadows){
            ctxbshadow.clearRect(0,0,canvasb.width,canvasb.height)
            ctxbshadow.fillStyle="rgba("+shadowqualli*128+","+shadowqualli*128+","+shadowqualli*128+","+Math.max((1-shadowqualli)/1000,0.001961)+")";
            if(shadowblurtype==0){
                ctxshadow.shadowBlur=shadowblur;
                ctxshadow.shadowColor="rgba("+shadowqualli*128+","+shadowqualli*128+","+shadowqualli*128+","+Math.max((1-shadowqualli)/1000,0.001961)+")";
            }
        }
        ctxb.clearRect(0,0,canvasb.width,canvasb.height)
        todrawb=[[],[]]
        if(shadowstaticqualli>0&&shadows){
            for (let i of myRect[loadmap]) {
                if(!i.static)continue
                if(typeof(i.shadow)=="undefined")continue
                if(i.shadow.length==0)continue
                if(i.nodraw)continue
                todrawb[1].push(i)
            }
        }
        for (let i of [...mySun[loadmap],...myFire[loadmap],...myRect[loadmap]]) {
            if(!i.static)continue
            if(i.nodraw)continue
            todrawb[0].push(i)
        }
    }

    while (todrawb[0].length>0&&((time==0||time.timeRemaining()>2)||renderallinstand)) {//man könte zeit anpassen
        let i=todrawb[0].pop()
        if(i.nodraw)continue
        if(typeof(i.fill)=="string"){
            ctxb.fillStyle=i.fill
            ctxb.shadowColor=typeof(i.blur)=="number"?i.blurcolor:"";
            ctxb.shadowBlur=typeof(i.blur)=="number"?i.blur:0;
            if(typeof(i.x)=="object"){
                ctxb.beginPath();
                if(suppixel){
                    ctxb.moveTo(i.x[0]/zoomn-x,i.y[0]/zoomn-y)
                    for (let i1=1;i1<i.x.length;i1++){ctxb.lineTo(i.x[i1]/zoomn-x,i.y[i1]/zoomn-y)}
                }else{
                    ctxb.moveTo(Math.trunc(i.x[0]/zoomn-x),Math.trunc(i.y[0]/zoomn-y))
                    for (let i1=1;i1<i.x.length;i1++){ctxb.lineTo(Math.trunc(i.x[i1]/zoomn-x),Math.trunc(i.y[i1]/zoomn-y))}
                }
                ctxb.fill();
            }else{
                if(suppixel){
                    ctxb.fillRect(i.x/zoomn-x,i.y/zoomn-y,i.w/zoomn,i.h/zoomn)
                }else{
                    ctxb.fillRect(Math.trunc(i.x/zoomn-x),Math.trunc(i.y/zoomn-y),i.w/zoomn,i.h/zoomn)
                }
            }
        }else if(typeof(i.fill)=="object"){
            if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement")){
                if(suppixel){
                    ctxb.drawImage(i.fill,0,0,i.fill.width,i.fill.height,(typeof(i.x)=="object"?Math.min(...i.x):i.x)/zoomn-x,(typeof(i.y)=="object"?Math.min(...i.y):i.y)/zoomn-y,i.w/zoomn,i.h/zoomn)
                }else{
                    ctxb.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(typeof(i.x)=="object"?Math.min(...i.x):i.x)/zoomn-x,Math.trunc(typeof(i.y)=="object"?Math.min(...i.y):i.y)/zoomn-y,i.w/zoomn,i.h/zoomn)
                }
            }else if(i.fill.constructor.name=="ImageData"){
                if(suppixel){
                    ctxb.putImageData(i.fill,(typeof(i.x)=="object"?Math.min(...i.x):i.x)/zoomn-x,(typeof(i.y)=="object"?Math.min(...i.y):i.y)/zoomn-y)
                }else{
                    ctxb.putImageData(i.fill,Math.trunc(typeof(i.x)=="object"?Math.min(...i.x):i.x)/zoomn-x,Math.trunc(typeof(i.y)=="object"?Math.min(...i.y):i.y)/zoomn-y)
                }
            }
        }
    }
    while (shadowstaticqualli>0&&shadows&&todrawb[1].length>0&&((time==0||time.timeRemaining()>2)||renderallinstand)) {//man könte zeit anpassen
        let i=todrawb[1].pop()
        let firstx=typeof(i.x)=="object"?i.x[0]/zoomn:i.x/zoomn
        let firsty=typeof(i.y)=="object"?i.y[0]/zoomn:i.y/zoomn
        for (let sun of i.shadow) {
            if(sun==undefined||typeof(sun[Symbol.iterator])!=="function")continue   //fail save wen game fertig ist
            if(sun.constructor.name.match("OffscreenCanvas|HTMLCanvasElement")){
                ctxbshadow.drawImage(sun,0,0,sun.width,sun.height,Math.trunc(firstx+sun.minxs-x),Math.trunc(firsty+sun.minys-y),sun.width/zoomn,sun.height/zoomn)
            }else{
                for (let i1 of sun) {
                    ctxbshadow.beginPath();
                    if(suppixel){
                        ctxbshadow.moveTo(i1[0]/zoomn-x+firstx,i1[1]/zoomn-y+firsty);
                        for (let i2=2;i2<i1.length;i2+=2){ctxbshadow.lineTo(i1[i2]/zoomn-x+firstx,i1[i2+1]/zoomn-y+firsty)}
                    }else{
                        ctxbshadow.moveTo(Math.trunc(i1[0]/zoomn-x+firstx),Math.trunc(i1[1]/zoomn-y+firsty));
                        for (let i2=2;i2<i1.length;i2+=2){ctxbshadow.lineTo(Math.trunc(i1[i2]/zoomn-x+firstx),Math.trunc(i1[i2+1]/zoomn-y+firsty))}
                    }
                    ctxbshadow.fill();
                    if (shadowstroke)ctxbshadow.stroke()
                }
            }
        }
    }

    if(todrawb[0].length>0||todrawb[1].length>0)renderbackground=2
    if(todrawb[0].length==0&&todrawb[1].length==0){
        renderbackground=false
        hadrenderbackground=true
        staticshadowtime=(staticshadowtime*shadowtimeanpassung)+((performance.now()-repaintbtime)*(1-shadowtimeanpassung))
    }
}
function messurefps(){
    function loop(timemes){
        const fpsmes=1/((timemes-timeomes)/1e3)
        if(isFinite(fpsmes))m4xfps=m4xfps*(fpsmes>=m4xfps?0.7:0.95)+fpsmes*(fpsmes>=m4xfps?0.3:0.05)
        timeomes=timemes
        if(timemes<5000+perold){
            window.requestAnimationFrame(loop)
        }else{
            console.log("messure time "+m4xfps)
            for(let i=allowedmaxfps.length;i>=0;i--)if(allowedmaxfps[i]<=m4xfps+5){m4xfps=allowedmaxfps[i];break}
        }
    }
    let perold=performance.now()
    let timeomes=perold
    window.requestAnimationFrame(loop)
}
function collisionmap(wait=false,ignore=false){
    if(cancolmap!=true)return
    cancolmap=false
    colobjarr=[]
    let test=[]
    for(let i of [...myRect[loadmap],...mySun[loadmap]])if(ignore||(i.havcoll==true&&!(typeof(i.playerphysik)!=undefined&&i.playerphysik==true))){colobjarr.push(i);test.push({x:i.x,y:i.y,w:i.w,h:i.h})}
    if(!window.Worker||collmapnowebworker){
        if(document.querySelectorAll("#worker2backup").length==0){
            console.log("backup")
            let work=document.querySelectorAll("#worker2")[0].innerText
            let js = document.createElement("script");
            js.id = "worker2backup";
            js.textContent = work;
            document.head.appendChild(js)
        }
        if(colmap.length==(maxy-miny)*(maxx-minx)){
            colmap.fill(0)
        }else{
            colmap=new Uint32Array((maxy-miny)*(maxx-minx));
        }
        if(objcolmap.length==(maxy-miny)*(maxx-minx)){
            objcolmap.fill(0)
        }else{
            objcolmap=new Uint8Array((maxy-miny)*(maxx-minx));
        }
        work(minx,miny,maxx,maxy,test,colmap,objcolmap)
        cancolmap=true
        collupdate=true
    }else{
        if(wait){
            return new Promise((resolve, reject) => {
                workercol.postMessage([minx,miny,maxx,maxy,test])
                workercol.onmessage=(e)=>{
                    colmap=new Uint32Array(e.data[0]);
                    objcolmap=new Uint8Array(e.data[1]);
                    cancolmap=true
                    collupdate=true
                    resolve()
                }
                workercol.onerror=reject
            })
        }else{
            workercol.postMessage([minx,miny,maxx,maxy,test])
            workercol.onmessage=(e)=>{
                colmap=new Uint32Array(e.data[0]);
                objcolmap=new Uint8Array(e.data[1]);
                cancolmap=true
                collupdate=true
            }
        }
    }
}

function menu() {
    let but=[]
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("save")?tooltips.keymap.save:"save"
    but[but.length-1].onclick=()=>{
        for(let i of keysdisplayarr){
            console.log(Object.keys(keys).find(me=>keys[me]===i)+"="+JSON.stringify(i))
            document.cookie=Object.keys(keys).find(me=>keys[me]===i)+"="+JSON.stringify(i)
        }
        console.log(document.cookie)
    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("load")?tooltips.keymap.load:"load"
    but[but.length-1].onclick=()=>{
        for (let i of document.cookie.split('; ')){
            if(keys.getOwnPropertyNames(i.split('=')[0]))keys[i.split('=')[0]]=JSON.parse(i.split('=')[1])
        }
        document.querySelectorAll('.preset').forEach((me)=>me.remove())
        menu()
    }

    but.push(document.createElement("H1"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("pressedkeys")?tooltips.keymap.pressedkeys:"pressedkeys"

    but.push(document.createElement("TEXTAREA"))
    but[but.length-1].readOnly=true
    but[but.length-1].rows="6"
    but[but.length-1].style.resize="none"
    but[but.length-1].style.overflow="auto"
    but[but.length-1].style.height="min-content"
    but[but.length-1].style.textAlign="center"
    but[but.length-1].placeholder=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("placeholder")?tooltips.keymap.placeholder:"press a key"
    let pressedkeys = [window.setInterval(myCallback, 100),but[but.length-1]]
    function myCallback() {
        if(!document.documentElement.contains(pressedkeys[1]))window.clearInterval(pressedkeys[0])
        pressedkeys[1].textContent=""
        keys.actualizekeys()
        for(let i of Object.keys(keys.arr)){
            let str=i.toString()
            if(Math.abs(keys.arr[i].stärke)>0.2)pressedkeys[1].textContent+="\n"+(" ".repeat(5-str.length))+str+" "+keys.arr[i].stärke.toPrecision(3)
        }
    }

    but.push(document.createElement("H1"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("preset")?tooltips.keymap.preset:"preset"
    
    for(let i of Object.keys(keys.keymaps)){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].id=i
        but[but.length-1].onclick=()=>{
            keys.setkeymap(i)
            document.querySelectorAll('.preset').forEach((me)=>me.remove())
            menu()
        }
    }
    for(let i of but.filter(i1=>i1 instanceof HTMLButtonElement&&i1.hasAttribute("id"))){
        i.textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("presetsname")&&tooltips.keymap.presetsname.hasOwnProperty(i.id)?tooltips.keymap.presetsname[i.id]:i.id
        i.title=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("presets")&&tooltips.keymap.presets.hasOwnProperty(i.id)?tooltips.keymap.presets[i.id]:""
    }

    but.push(document.createElement("H1"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("custom")?tooltips.keymap.custom:""

    but.push(document.createElement("SPAN"))
    but[but.length-1].innerHTML=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("explain")?tooltips.keymap.explain:""


    but.push(document.createElement("H3"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("keyname")?tooltips.keymap.keyname:""


    for (let i in keysdisplayarr) {
        but.push(document.createElement("TEXTAREA"))
        but[but.length-1].value=JSON.stringify(keysdisplayarr[i]).replace(/((?:[\]\}0-9],)|(?:^{))("[0-9])/g,"$1\n $2").replace(/([^{])(})$/,"$1\n$2")
        but[but.length-1].title=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("keys")?tooltips.keymap.keys[i]:""
        but[but.length-1].style.overflowY="visible";
        but[but.length-1].style.resize="none"
        but[but.length-1].style.overflow="hidden"
        but[but.length-1].style.minHeight="1vh"
        but[but.length-1].spellcheck=false
        but[but.length-1].autocorrect="off"
        but[but.length-1].autocapitalize="off"
        but[but.length-1].autocomplete="off"
        but[but.length-1].onclick=event=>{
            i=JSON.parse(event.target.value)
            event.target.style.height=0;
            event.target.style.height=event.target.scrollHeight+"px";
            menuallowedtomove=false
        }
        but[but.length-1].onblur=event=>{
            event.target.style.height="";
            menuallowedtomove=true
        }
        
    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    but[but.length-1].onclick=(event)=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());mvis()}
    for (let i of but)i.className="preset"
    for(let i of but)document.body.appendChild(i)
}

function loadandsave() {//gib an wie datei heisen sol    bei load werden dan alle datein angezeigt
    let but=[]
    for(let i=0;i<mapinfo.length;i++){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="1/span 3";
        but[but.length-1].textContent=mapinfo[i].mapname
        but[but.length-1].onclick=()=>{
            loadmap=i;
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        if(mapinfo[i].static){
            but.push(document.createElement("BUTTON"))
            but[but.length-1].style.gridColumn="4/4";
            but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("reload")?tooltips.loadandsave.reload:"reload"
            but[but.length-1].onclick=()=>{defaultarrload(i)}
        }else{
            but.push(document.createElement("BUTTON"))
            but[but.length-1].style.gridColumn="4/4";
            but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("remove")?tooltips.loadandsave.remove:"remove"
            but[but.length-1].onclick=()=>{
                mapinfo=mapinfo.splice(i,1)
                myRect=myRect.splice(i,1)
                mySun=mySun.splice(i,1)
                myFire=myFire.splice(i,1)
                myGravi=myGravi.splice(i,1)
                if(loadmap==i){
                    loadmap--
                    if(renderer==3)updatescene=true
                    if(renderer==0)renderbackground=true
                }
                if(loadmap>i)loadmap--
                document.querySelectorAll('.preset').forEach((me)=>me.remove());
                loadandsave()
            }
        }
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="5/5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("duplicate")?tooltips.loadandsave.duplicate:"duplicate"
        but[but.length-1].onclick=()=>{
            mapinfo[mapinfo.length]=mapinfo[i]
            myRect[mapinfo.length-1]=[...myRect[i]]
            mySun[mapinfo.length-1]=[...mySun[i]]
            myFire[mapinfo.length-1]=[...myFire[i]]
            myGravi[mapinfo.length-1]=[...myGravi[i]]
            document.querySelectorAll('.preset').forEach((me)=>me.remove());
            loadandsave()
        }
    }

    if(promall[4].res){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="1/span 5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("save")?tooltips.loadandsave.save:"save"
        but[but.length-1].onclick=()=>savearr(0)

        but.push(document.createElement("INPUT"))
        but[but.length-1].style.gridColumn="1/1";
        but[but.length-1].onchange=(m)=>{allfiles(m).then(()=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()})}
        but[but.length-1].type="file"
        but[but.length-1].name="client-folder"
        but[but.length-1].id="get-files"
        but[but.length-1].webkitdirectory="webkitdirectory"
        but[but.length-1].directory="directory"

        but.push(document.createElement("INPUT"))
        but[but.length-1].style.gridColumn="3/3";
        but[but.length-1].onchange=(m)=>{allfiles(m).then(()=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()})}
        but[but.length-1].type="file"
        but[but.length-1].name="client-file"
        but[but.length-1].id="get-files"
        but[but.length-1].accept=".txt"
        but[but.length-1].multiple="multiple"

        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="1/span 5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("save_localstorage")?tooltips.loadandsave.save_localstorage:"save_localstorage"
        but[but.length-1].onclick=()=>savearr(1)

        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="1/span 5";
        but[but.length-1].onclick=(m)=>{loadstorage(window.prompt("",""));document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()}
        but[but.length-1].name="client-localstorage"
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("load_localstorage")?tooltips.loadandsave.load_localstorage:"load_localstorage"
    }

    but.push(document.createElement("BUTTON"))
    but[but.length-1].style.gridColumn="1/span 5";
    but[but.length-1].textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    but[but.length-1].onclick=(event)=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());event.target.remove();mvis()}
    for (let i of but)i.className="preset"
    for (let i of but)document.body.appendChild(i)
}
function setting(){
    let but=[]
    let obj=[]
    let settingsarray=function(a,num){
        if(Array.isArray(a)){
            let div=document.createElement("DIV")
            div.style.display="contents"
            for(let i in a){
                for(let i1 of settingsarray(a[i],num+1))div.appendChild(i1)
            }
            if(div.children.length>=2){
                let spans=div.querySelectorAll('span,button.func')
                let first=spans[0]
                let secend=spans[spans.length-1]
                if(secend.nextSibling!=null){
                    first.nextSibling.style.boxSizing="border-box"
                    secend.nextSibling.style.boxSizing="border-box"

                    first.style.borderTop=(first.style.borderTop==""?1:parseInt(first.style.borderTopWidth,10)+1)+"px solid black"
                    secend.style.borderBottom=(secend.style.borderBottomWidth==""?1:parseInt(secend.style.borderBottomWidth,10)+1)+"px solid black"
                    secend.style.marginBottom="2px"
                    if(secend.nextSibling.tagName=="INPUT"||secend.nextSibling.tagName=="BUTTON")secend.nextSibling.style.marginBottom="2px"
                }
            }
            return [...[div]]
        }else{
            if(!checksettings.hasOwnProperty(a)){
                let i1=document.createElement("BUTTON")
                i1.className="func"
                i1.style.width="100%"
                i1.textContent="error: "+a+" not exist in checksettings"
                i1.style.gridColumn="1/span 2";
                if(renderer==3&&desynchronized)i1.style.backgroundColor="white"
                return [i1]
            }
            let type=Array.isArray(checksettings[a])?checksettings[a][1]:checksettings[a]
            if(type=="function"){
                let i1=document.createElement("BUTTON")
                i1.className="func"
                i1.style.width="100%"
                i1.textContent=tooltips.hasOwnProperty("settingsname")&&tooltips.settingsname.hasOwnProperty(a)?tooltips.settingsname[a]:a
                i1.style.gridColumn="1/span 2";
                i1.onclick=event=>{window[a]}
                i1.title=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty(a)?tooltips.settings[a]:""
                if(renderer!=0)i1.style.backgroundColor="white"
                return [i1]
            }else if(type.match("number|string|object")){
                let i1=document.createElement("SPAN")
                let i2=document.createElement("INPUT")
                i2.placeholder="put something in it! (pls a "+type+")"
                if(type=="number"&&navigator.userAgent.indexOf("Firefox")==-1){i2.type="number"}else{i2.type="text"}//wen net firefox
                if(type=="number"){i2.pattern="^[-+]?[0-9]*[.,]?[0-9]*$"}
                i2.value=type=="object"?JSON.stringify(window[a]):window[a]
                i2.onclick=event=>menuallowedtomove=false
                i2.onblur=event=>{
                    menuallowedtomove=true
                    i2.style.color=""
                    i2.value=type=="object"?JSON.stringify(window[a]):window[a]
                }
                i2.oninput=event=>{
                    if(event.target.value==""){
                        i2.style.color="red"
                        return false
                    }
                    let parse
                    if(type=="object")parse=JSON.parse(event.target.value)
                    if(type=="string")parse=event.target.value
                    if(type=="number")parse=Number.parseFloat(event.target.value)
                    if(checksetting(a,parse)){
                        window[a]=parse
                        i2.style.color=""
                        return true
                    }
                    console.log("red")
                    i2.style.color="red"
                    return false
                }
                i1.textContent=tooltips.hasOwnProperty("settingsname")&&tooltips.settingsname.hasOwnProperty(a)?tooltips.settingsname[a]:a
                i1.style.borderLeft="inherit"
                i1.style.gridColumn="1/1";
                i2.style.gridColumn="2/2";
                i1.title=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty(a)?tooltips.settings[a]:""
                if(renderer==3&&desynchronized)i1.style.backgroundColor="white"
                return [i1,i2]
            }else if(type=="boolean"){
                let i1=document.createElement("SPAN")
                let i2=document.createElement("BUTTON")
                i2.value=window[a]
                i2.textContent=tooltips.hasOwnProperty(window[a])?tooltips[window[a]]:window[a]
                i2.onclick=event=>{
                    let a1=event.target.value=="true"?false:true
                    i2.value=a1
                    window[a]=a1
                    i2.textContent=tooltips.hasOwnProperty(a1)?tooltips[a1]:a1
                }
                i1.textContent=tooltips.hasOwnProperty("settingsname")&&tooltips.settingsname.hasOwnProperty(a)?tooltips.settingsname[a]:a
                i1.style.borderLeft="inherit"
                i1.style.gridColumn="1/1";
                i2.style.gridColumn="2/2";
                i1.title=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty(a)?tooltips.settings[a]:""
                if(renderer==3&&desynchronized)i1.style.backgroundColor="white"
                return [i1,i2]
            }else{
                console.warn(window[a])
            }
        }
    }
    obj.push(...settings)
    if(cheats)obj.push(...cheatsettings)
    if(noob)obj.push(...noobsettings)
    but.push(...settingsarray(obj,0))
    but.push(document.createElement("BUTTON"))
    but[but.length-1].style.gridColumn="1/span 2";
    but[but.length-1].textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    but[but.length-1].onclick=(event)=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());mvis();event.target.remove()}
    for (let i of but)i.className="preset func"
    for (let i of but)document.body.appendChild(i)
}
function checksetting(settingname,obj){
    if(!checksettings.hasOwnProperty(settingname)){
        console.error(new SyntaxError(
            "setting not found:"+
            "\nsetting:"+settingname+
            "\n"+new Error().stack))
        return false
    }
    let typeofrec=b=>Array.isArray(b)?"["+b.map(a=>typeofrec(a))+"]":typeof(b)
    let match=Array.isArray(checksettings[settingname])?checksettings[settingname][0]:checksettings[settingname]
    let conv=typeofrec(obj)
    let numberregcheck
    let regexcheck=false
    let convregexcheck=""
    if(Array.isArray(checksettings[settingname])&&checksettings[settingname].length==3){
        if(checksettings[settingname][2] instanceof RegExp){
            convregexcheck=JSON.stringify(obj)
            numberregcheck=convregexcheck.match(checksettings[settingname][2])
            regexcheck=true
        }
    }
    let type=conv.match(match)
    if(type==null||type.index!==0||(regexcheck&&(numberregcheck==null||numberregcheck.index!==0))){
        if(regexcheck){
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nsetting:"+settingname+
                "\nmatchstr:"+typeof(match)=="object"?match.source:match+
                "\nconv:"+conv+
                "\ntype:"+type+
                "\nmatchstr:"+checksettings[settingname][2]+
                "\nconv:"+convregexcheck+
                "\ntype:"+numberregcheck+
                "\n"+new Error().stack))
        }else{
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nsetting:"+settingname+
                "\nmatchstr:"+typeof(match)=="object"?match.source:match+
                "\nconv:"+conv+
                "\ntype:"+type+
                "\n"+new Error().stack))
        }
        return false
    }
    return true
}
function Fullscreen() {
    if(document.fullscreenElement==null&&document.fullscreenEnabled){
    if(document.documentElement.requestFullscreen) {document.documentElement.requestFullscreen();
    } else if(document.documentElement.mozRequestFullScreen) {document.documentElement.mozRequestFullScreen();
    } else if(document.documentElement.webkitRequestFullscreen) {document.documentElement.webkitRequestFullscreen();
    }
  }else if(document.fullscreenElement!=null){
    if(document.exitFullscreen) {document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {document.webkitExitFullscreen();
    }
  }
}

function mhid() {
    document.querySelectorAll('.menu').forEach((me)=>{menunode.push(me);me.remove()})
    if(typeof(canvas)=="object")canvas.style.zIndex="0"
    menuupdatekeys=true
}
function mswitch() {
    document.querySelectorAll('.menu').forEach((me)=>{menunode.push(me);me.remove()})
    if(typeof(canvas)=="object")canvas.style.zIndex="-1"
}
function mvis() {
    while(menunode.length)document.body.appendChild(menunode.shift())
    if(typeof(canvas)=="object")canvas.style.zIndex="-1"
    menuupdatekeys=true
    disableszoom=true
    if(!disablemenucontrolls)menucontrolls()
    if(typeof(canvas)=="object")for(let i of canvarr.filter(i=>i!="canvasshadow"&&i!="canvasbshadow"))window[i].style.filter = "blur(3px)";
}
function menucontrolls() {
    function loop1(){
        let obj=document.querySelectorAll("button,input,textarea")
        let ind=[...obj].findIndex(me=>me===document.activeElement)||0
        if(keys.keytoggle(27))try{obj[ind].blur()}catch{}
        if(menuallowedtomove){
            if(keys.keytoggle(83))ind++
            if(keys.keytoggle(87))ind--
            if(ind<0)ind+=obj.length
            if(ind>=obj.length)ind-=obj.length

            if(keys.keytoggle(82))try{obj[ind].click()}catch{}
            try{obj[ind].focus()}catch{}
        }
        if(menuupdatekeys&&!disablemenucontrolls)window.requestAnimationFrame(loop1);
    }
    window.requestAnimationFrame(loop1)
}

function debugcol() {
    if(!cleardebugcolmap&&renderer!=0&&renderer!=3){
        window.canvasdeb=document.createElement('canvas');
        canvasdeb.id="debug"
        canvasdeb.style.zIndex=-1
        canvasdeb.style.position="absolute"
        canvasdeb.width=canvas.width
        canvasdeb.height=canvas.height
        document.body.appendChild(canvasdeb)
        window.ctxdeb=canvasdeb.getContext("2d")
        canvarr.push("canvasdeb")
        ctxarr.push("ctxdeb")
    }
    if((cleardebugcolmap&&!debugcolmap&&!debug)&&renderer!=0&&renderer!=3){
        canvasdeb.remove()
        cleardebugcolmap=false
        ctxdeb=null
        canvarr=canvarr.filter(i=>i!="canvasdeb")
        ctxarr=ctxarr.filter(i=>i!="ctxdeb")
        return
    }
    let dctx=(renderer==0||renderer==3?ctxb:ctxdeb)
    if(fpsav>50&&zoom==0){
        if(renderer==1||renderer==2||debugcolmap)dctx.clearRect(0, 0, canvas.width, canvas.height)
        if(debugcolmap){
            let offy=Math.trunc(rofy)
            let buf = new ArrayBuffer((maxx-minx)*(maxy-miny-offy)*4);
            let data = new Uint32Array(buf);
            for (let x=0;x<=maxx-minx;x++) {
                for (let y=0;y<=maxy-miny-offy;y++) {
                    if(debugcolmode=="objcolmap"&&objcolmap[(y-miny+offy)*(maxx-minx)+(x-minx+Math.trunc(rofx))])data[x+y*(maxx-minx)]=1790862145
                    if(debugcolmode=="fishmap"){
                        data[x+y*(maxx-minx)]=Math.trunc((fishmap[(y-miny+offy)*(maxx-minx)+(x-minx+Math.trunc(rofx))]/Number.MAX_SAFE_INTEGER)*256)
                        if(data[x+y*(maxx-minx)]<255)data[x+y*(maxx-minx)]=data[x+y*(maxx-minx)]|0xFF000000
                    }
                }
            }
            dctx.putImageData(new ImageData(new Uint8ClampedArray(buf),maxx-minx),0,0)
        }
    }
    if(renderer==3&&!(inversekinematics&&promall[3].res)&&debug)dctx.clearRect(0, 0, canvas.width, canvas.height)
    if(debug){
        let lines=debugtext.split('\n');
        dctx.font="20px Arial";
        dctx.fillStyle = "black";
        let maxlengthdebtext=0
        let maxl=15
        for (let i of lines){
            let metrics=dctx.measureText(i)
            maxlengthdebtext=Math.max(metrics.width,maxlengthdebtext)
            maxl=Math.max(metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent,maxl)
        }
        debtextvariation+=Math.abs(debtextavg-maxlengthdebtext)
        debtextvariation*=debtextabfac
        debtextavg=debtextavg*debtextavgabfac+maxlengthdebtext*(1-debtextavgabfac)
        if(maxlengthdebtext>debtextlength)debtextlength=maxlengthdebtext
        if(maxlengthdebtext<debtextlength)debtextlength-=1/Math.pow(2,debtextvariation)   // oder 1/debtextvariation 
        let hight=canvas.height
        let othersite=false
        for (let i=0,i1=0;i<lines.length;i++,i1++){
            let secend=lines[i].substring(lines[i].indexOf(" "))
            dctx.fillText(lines[i].substring(0,lines[i].indexOf(" ")),othersite?canvas.width-debtextlength:0,10+i1*maxl)
            dctx.fillText(secend,(othersite?canvas.width:debtextlength)-dctx.measureText(secend).width,10+i1*maxl)
            if(!othersite&&(hight-=maxl)<maxl){othersite=true;i1=0}
        }
        debugtext=""
    }
    cleardebugcolmap=true
}

function urlparams(){
    //url parameter sollen setting variablen setzen  wen es geht
    let url = new URL(window.location.href);
    function unfold(a){
        let arr=[]
        if(Array.isArray(a)){
            for(let i of a)arr.push(...unfold(i))
        }else{
            arr.push(a)
        }
        return arr
    }
    let setting=unfold(settings)
    if(url.searchParams.has("loadmap")){
        let temp=Number.parseInt(url.searchParams.get("loadmap"))
        if(Number.isFinite(temp)&&temp>=0&&temp<mapinfo.length)loadmap=temp
    }
    if(url.searchParams.has("autostart")){start("ani")}
    for(let i in setting){
        if(url.searchParams.has(setting[i])){
            let temp=url.searchParams.get(setting[i])
            if(temp==""||temp=="undefined")continue
            if(typeof(window[setting[i]])=="string")window[setting[i]]=temp
            if(typeof(window[setting[i]])=="number")window[setting[i]]=Number.parseFloat(temp)
            if(typeof(window[setting[i]])=="boolean")window[setting[i]]=(temp=="true")
            if(typeof(window[setting[i]])=="object")window[setting[i]]=JSON.parse(temp)
        }
    }
}
function testcreateobjloadet(){
    console.log("need createobj.js \nsorry game work without it not")
    alert("need createobj.js to work")
}
function testbuildloadet(){
    console.log("need build.js for building mode")
    alert("need build.js for building mode")
}
function testgameloadet(){
    console.log("need game.js for playing mode")
    alert("need game.js for playing mode")
}
promallres[0]()