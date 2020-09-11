// @ts-check
'use strict';
//for (let i=0;i<500;keymap[++i]=i,keymin[i]=0.5,keymax[i]=1,deadkeys[i]=false)
window.onkeydown=(e)=>{keys.setnum(e.keyCode,1);if(menuallowedtomove)e.preventDefault()}//wen input gefoust ist mach keine keys auser esc
window.onkeyup=(e)=>{keys.setnum(e.keyCode,0)}


//"https://tenor.com/view/luke-ashish-bug-fix-code-gif-12504423"

//window.onkeydown=(e)=>{keys[keymap[e.keyCode]]=1;if (e.ctrlKey&&'spwad'.indexOf(e.key)!==-1) {e.preventDefault()}}//dont like to print website
//window.onkeyup=(e)=>{keys[keymap[e.keyCode]]=0}//wdeaktiviere key nach ner zeit
document.addEventListener('contextmenu',()=>{keys.resetallnumstärke()});//event.preventDefault();   bei andere interuptende sachen das auch deaktivieren
window.addEventListener("gamepaddisconnected",e=>{keys.removecontrollerkeys(e.gamepad.index)})
window.addEventListener("gamepadconnected",e=>{keys.addcontrollerkeys(e.gamepad.index)})
window.addEventListener('resize',()=>{
    for(let i in canvarr){
        window[canvarr[i]].width=document.documentElement.clientWidth;
        window[canvarr[i]].height=document.documentElement.clientHeight;
        if((renderer==3&&i!=0)||renderer==0)imagesmoothingset(window[ctxarr[i]])
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
window.onbeforeunload=()=>{if(multiplayerstartet)postMessage({act:"bye",id:multiplayerid})}
function checkPageFocus(){
    if(multiplayerstartet&&multiplayer&&!listenforplayer&&stopmain){
        if(document.hidden){
            let i1=-1
            for(let i of myRect[loadmap])if(i.playerphysik)postMessage({act:"player leave",data:{playerid:++i1},id:multiplayerid})
        }
    }
    if(document.hidden&&stopmain){
        stopmain=false
        mvis()
    }
}
setInterval(checkPageFocus, 300);
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
function clipread(e){
    try{
        navigator.clipboard.readText().then(clipText=>e.target.value=clipText)
    }catch(a){
        console.info(a)
        try{
            e.target.focus();
            document.execCommand("paste")
        }catch(a1){console.info(a1)}
    }
}
function clipwrite(e){
    try{
        navigator.clipboard.writeText(e.target.textContent)
    }catch(a){
        console.info(a)
        try{
            e.target.focus();
            document.execCommand("copy")
        }catch(a1){console.info(a1)}
    }
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
function canvasstart(disabledesync){//disablesync macht async weg wen ich in baumous bin weil hintergrund schwartz würde wen ich in baumodus währe
    console.groupCollapsed("canvasstart")
    for(let i in canvarr){
        let samecanvas=false
        let rendererhere=0
        if(renderer==0)rendererhere=0
        if(renderer==1)rendererhere=1
        if(renderer==2)rendererhere=2
        if(renderer==3&&i==0)rendererhere=3 //nur das erste webgl canvas ist webgl
        if(renderer==3&&i!=0)rendererhere=0

        if(typeof(window[ctxarr[i]])!=="undefined"&&window[ctxarr[i]].hasOwnProperty("opt")){
            if(
               (rendererhere!=3||webglnames[usewebgl2ifcan==true?1:0].includes(window[ctxarr[i]].opt.renderer))&&
               window[ctxarr[i]].opt.renderernum==rendererhere&&
               window[ctxarr[i]].opt.num==i&&
               window[ctxarr[i]].opt.antialias==antialias&&
               window[ctxarr[i]].opt.desynchronized==(disabledesync||noob?false:desynchronized)
               ){
                console.info("its the same canvas dont need to create new canvas "+ctxarr[i])
                console.info(window[ctxarr[i]].opt)
                samecanvas=true
            }else{
                console.info("its not the same canvas need to create new canvas and del old one "+ctxarr[i])
                console.info(window[ctxarr[i]].opt)
            }
        }else{
            console.info("need a new canvas(there is no canvas) "+ctxarr[i])
        }
        if(!samecanvas){
            if(document.getElementById(canvarr[i]))document.getElementById(canvarr[i]).remove()
            /** @global */
            window[canvarr[i]]=document.createElement("canvas")
            window[canvarr[i]].id=canvarr[i]
            document.body.appendChild(window[canvarr[i]])
            givecontext(i,rendererhere,disabledesync)
        }
    }
    console.groupEnd()
}
function givecontext(i,rendererhere,disabledesync){
    if(rendererhere==3){
        let canwebgl=false
        for (let i1 of webglnames[usewebgl2ifcan==true?1:0]){
            try{
                window[ctxarr[i]]=window[canvarr[i]].getContext(i1,{antialias: antialias,desynchronized:(disabledesync||noob?false:desynchronized)});
                //window[ctxarr[i]]=window[canvarr[i]].getContext(i1,{preserveDrawingBuffer: true,antialias: antialias,desynchronized:(disabledesync||noob?false:desynchronized)});
                window[ctxarr[i]].opt={renderer:i1,renderernum:rendererhere,num:i,antialias:antialias,desynchronized:(disabledesync||noob?false:desynchronized)}
                canwebgl=true
                break
            }catch(e){
                console.log(i1+" not work"+e)
            }
        }
        if(!canwebgl){
            renderer=0
            console.warn("cant do webgl fallback canvas(using webgl2 canvas)")
            givecontext(i,0)//fallback weil webgl net geht
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
    if(rendererhere==0){
        window[ctxarr[i]]=window[canvarr[i]].getContext('2d',{desynchronized:disabledesync||noob?false:desynchronized});
        window[ctxarr[i]].opt={renderernum:rendererhere,num:i,antialias:antialias,desynchronized:(disabledesync||noob?false:desynchronized)}
        //window[ctxarr[i]]=window[canvarr[i]].getContext('2d',{pixelFormat:"float16",desynchronized:true});

        //imagequali of canvas
        imagesmoothingset(window[ctxarr[i]])
    }
    if(renderer==0||renderer==3||window[canvarr[i]].id=="debug"){
        window[canvarr[i]].width=document.documentElement.clientWidth;
        window[canvarr[i]].height=document.documentElement.clientHeight;
    }
    if(i==0&&(renderer==0||renderer==3)){//mache auf ersten canvas klick bzw wen das net geht zb machs auf svg element oder document
        canvas.onmousemove=(e)=>{keys.mousemove(e)}
        canvas.onmousedown=(e)=>{keys.mousedown(e)}
    }
    window.onmouseup=(e)=>{keys.mouseup(e)}
}
//imagequali of canvas
function imagesmoothingset(c){
    if(typeof(c["imageSmoothingEnabled"])!="undefined"){
        c.imageSmoothingEnabled=imageSmoothingEnabled!=="none"
        if(imageSmoothingEnabled!="none")c.imageSmoothingQuality=imageSmoothingEnabled
    }else if(typeof(c["webkitImageSmoothingEnabled"])!="undefined"){
        window[ctxarr[i]].webkitImageSmoothingEnabled=imageSmoothingEnabled!=="none"
    }else if(typeof(c["mozImageSmoothingEnabled"])!="undefined"){
        c.mozImageSmoothingEnabled=imageSmoothingEnabled!=="none"
    }
}
async function start(obj){
    if(obj=="ani"&&promall[10].res&&!multiplayerjustlisten&&multiplayer)multiplayerconnect(true)//mach dich nochmal testen zu verbinden könnten ja seit client start was pasiert sein oder webrtc connect
    maxx=-Infinity
    maxy=-Infinity
    minx=0
    miny=0
    cancolmap=true
    for (let me of [...myRect[loadmap],...mySun[loadmap],...myFire[loadmap]]){
        if(typeof(me.getstats)=="function")[me.w,me.h]=[me.getstats.w,me.getstats.h]
        mesureminmax(me)
    }
    let wait=collisionmap(true)
    if(enableaudio){
        startaudio()//pfals man audio activirt hat
        for(let i of Object.keys(soundvalues))sound[i].gain.setValueAtTime(soundvalues[i], audioctx.currentTime)
    }
    if(obj=="build"){
        canvarr[0]="canvas"
        ctxarr[0]="ctx"
    }
    if(obj=="ani"){
        if(inversekinematics||debug||!disablevideos){
            canvarr[1]="canvasb"
            ctxarr[1]="ctxb"
        }
        canvarr[0]="canvas"
        ctxarr[0]="ctx"
    }
    canvasstart(obj=="build")
    for(let i of canvarr.filter(i=>i!="canvasshadow"&&i!="canvasbshadow"))window[i].style.filter = "none"
    
    for (let me of myRect[loadmap]){
        if(shadows)toupdateshadow.add(me)
        if(me.static&&renderer==0)renderbackground=true
        if(typeof(colorobj)=="undefined"){
            if(typeof(me.fillbackup)!="undefined")me.fill=me.fillbackup
        }else{
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
        if(enableaudio&&me.audio==true&&me.createtaudio!==true){
            me.audiogen(me)
        }
    }
    if(renderer==3)updatescene=true
    disableszoom=false

    if(obj=="ani"){
        stopmain=true;
        anime=myRect[loadmap].find(i=>i.construck=='Player')
        multipleplayer=myRect[loadmap].filter(i=>i.construck=='Player').length>1
        instandzoom=false
        if(promall[10].res&&multiplayer&&!listenforplayer&&multiplayerstartet){
            let i1=-1
            for(let i of myRect[loadmap]){
                if(i.playerphysik){
                    postMessage({act:"player join",data:{
                        playerid:++i1,
                        x:i.x,
                        y:i.y,
                        w:i.w,
                        h:i.h,
                        statsnum:i.statsnum,
                        inwater:i.inwater,
                        falldist:i.falldist
                    },id:multiplayerid})
                    i.playersendid=i1
                }
            }
            postMessage({act:"player not afk",id:multiplayerid})
        }
        await wait
        window.requestAnimationFrame(ani)
    }
    if(obj=="build"){
        stopbuild=true;
        build();
    }
    mhid()
    menuupdatekeys=false
}
function startaudio(){
    if(enableaudio&&typeof(audioctx)=="undefined"){
        audioctx = new AudioContext();
        listener=audioctx.listener
        if(listener.forwardX){
            listener.forwardX.setValueAtTime(0, audioctx.currentTime);
            listener.forwardY.setValueAtTime(0, audioctx.currentTime);
            listener.forwardZ.setValueAtTime(0, audioctx.currentTime);
            listener.upX.setValueAtTime(0, audioctx.currentTime);
            listener.upY.setValueAtTime(0, audioctx.currentTime);
            listener.upZ.setValueAtTime(0, audioctx.currentTime);
        }else{
            listener.setOrientation(0,0,0,0,0,0)
        }
        sound.grass=audioctx.createGain()
        sound.grass.gain.setValueAtTime(0.9, audioctx.currentTime)
        sound.grass.connect(audioctx.destination)
    }
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
    let vertShader=window[ctxarr[i]].createShader(window[ctxarr[i]].VERTEX_SHADER);
    window[ctxarr[i]].shaderSource(vertShader, document.getElementById(webgl2?"shader-webgl2-vs":"shader-vs").text);
    window[ctxarr[i]].compileShader(vertShader);
    let fragShader=window[ctxarr[i]].createShader(window[ctxarr[i]].FRAGMENT_SHADER);
    window[ctxarr[i]].shaderSource(fragShader, document.getElementById(webgl2?"shader-webgl2-fs":"shader-fs").text);
    window[ctxarr[i]].compileShader(fragShader);

    if (!webglstartdisablechecks&&!window[ctxarr[i]].getShaderParameter(vertShader,  window[ctxarr[i]].COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(vertShader));
    }
    if (!webglstartdisablechecks&&!window[ctxarr[i]].getShaderParameter(fragShader,  window[ctxarr[i]].COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(fragShader));
    }

    shaderProgram[0]=window[ctxarr[i]].createProgram();
    window[ctxarr[i]].attachShader(shaderProgram[0], vertShader);
    window[ctxarr[i]].attachShader(shaderProgram[0], fragShader);

    if(webgl2){
        let vertShader1=window[ctxarr[i]].createShader(window[ctxarr[i]].VERTEX_SHADER);
        window[ctxarr[i]].shaderSource(vertShader1, maxarrinshader(document.getElementById("shader-webgl2-vs-grass").text,window[ctxarr[i]].getParameter(window[ctxarr[i]].MAX_VERTEX_UNIFORM_VECTORS)));
        window[ctxarr[i]].compileShader(vertShader1);
        let fragShader1=window[ctxarr[i]].createShader(window[ctxarr[i]].FRAGMENT_SHADER);
        window[ctxarr[i]].shaderSource(fragShader1, document.getElementById("shader-webgl2-fs-grass").text);
        window[ctxarr[i]].compileShader(fragShader1);

        if (!webglstartdisablechecks&&!window[ctxarr[i]].getShaderParameter(vertShader1,  window[ctxarr[i]].COMPILE_STATUS)) {
            console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(vertShader1));
        }
        if (!webglstartdisablechecks&&!window[ctxarr[i]].getShaderParameter(fragShader1,  window[ctxarr[i]].COMPILE_STATUS)) {
            console.log("An error occurred compiling the shaders: " +  window[ctxarr[i]].getShaderInfoLog(fragShader1));
        }

        shaderProgram[1]=window[ctxarr[i]].createProgram();
        window[ctxarr[i]].attachShader(shaderProgram[1], vertShader1);
        window[ctxarr[i]].attachShader(shaderProgram[1], fragShader1);

        WEBGLmultidraw=gl.getExtension("WEBGL_multi_draw")
        WEBGLdisjointtimer=gl.getExtension('EXT_disjoint_timer_query_webgl2');

        transformFeedback[i] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[1], ['aVelo1','aWind1','aWindrandtimer1'], window[ctxarr[i]].SEPARATE_ATTRIBS)
    }else{
        WEBGLoes=gl.getExtension("OES_vertex_array_object");
    }

    for(let i1 of shaderProgram){
        window[ctxarr[i]].linkProgram(i1)
        if (!webglstartdisablechecks&&!window[ctxarr[i]].getProgramParameter(i1, window[ctxarr[i]].LINK_STATUS)) {
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
    if(webgl2){
        new webglbuffer.creategroup({name:"grass",shader:shaderProgram[1]})
        new webglbuffer.createbuffer("grass",{buffername:"coordinates1"})
        new webglbuffer.createbuffer("grass",{buffername:"grasscolor",bufferlength:4})
        new webglbuffer.createbuffer("grass",{buffername:"grassnum",bufferlength:1})
        new webglbuffer.createbuffer("grass",{buffername:"grassrotation",bufferlength:1})
        new webglbuffer.createbuffer("grass",{buffername:"aWindopt",bufferlength:3})
        new webglbuffer.createbuffer("grass",{buffername:"grassstartcord"})

        new webglbuffer.createfeedbackbuffer("grass",{buffername:"aVelo"})
        new webglbuffer.createfeedbackbuffer("grass",{buffername:"aWind"})
        new webglbuffer.createfeedbackbuffer("grass",{buffername:"aWindrandtimer",bufferlength:4})


        new webglbuffer.createuniform("grass","canvashwwebgl")
        new webglbuffer.createuniform("grass","offsgl")
        new webglbuffer.createuniform("grass","rendermode")
        new webglbuffer.createuniform("grass","fps")
        new webglbuffer.createuniform("grass","globalwind")
        new webglbuffer.createuniform("grass","objectspos")
        new webglbuffer.createuniform("grass","objectsvel")
        new webglbuffer.createuniform("grass","objectslength")
        new webglbuffer.addvaotogroup("grass")
    }
    if(webgl2&&WEBGLdisjointtimer){
        WEBGLdisjointtimerquery=gl.createQuery()
    }
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
        updatescene=false
        updatetextur=true
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


        webgldrawarr=[...mySun[loadmap],...myFire[loadmap],...myRect[loadmap]].filter(i=>(!webglfallback||!i.webglcantdraw)&&!(inversekinematics&&promall[3].res&&i.inversekinematics==true))


        /**@type {number[]} objvertices */
        let objvertices=[]
        let objuv=[]
        objvertecys[0]=[]

        for (let i of webgldrawarr){
            objvertecys[0].push(objvertices.length)
            if(typeof(i.x)=="object"){
                for (let i1=0;i1<i.x.length;i1++){
                    objvertices.push(i.x[i1]-i.minx)
                    objvertices.push(i.y[i1]-i.miny)
                    objuv.push((i.x[i1]-i.minx)/i.w)//uv mapping
                    objuv.push(1-(i.y[i1]-i.miny)/i.h)//uv mapping
                }
            }else{
                objvertices.push(
                    i.x-i.minx,i.y-i.miny,
                    i.x+i.w-i.minx,i.y-i.miny,
                    i.x+i.w-i.minx,i.y+i.h-i.miny,
                    i.x-i.minx,i.h+i.y-i.miny
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
        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.obj.buffer.aTexCoord.buffer);	
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(objuv));

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.obj.buffer.coordinates.buffer);				
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(objvertices));

    }
    if(updatetextur){
        updatetextur=false
        let pics=0
        for (let i of webgldrawarr){
            let texturerror=false
            let texturerrorobj=""
            if(i.nodraw||i.invisible){
                i.webglfill=[0,0,0,0]
            }else if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")&&i.webglcantdraw!=true){
                if(typeof(i.texture)=="undefined"||!gl.isTexture(i.texture))i.texture=gl.createTexture();
                gl.activeTexture(gl.TEXTURE0 + pics)
                gl.bindTexture(gl.TEXTURE_2D, i.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

                try{
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, i.fill)
                }catch(e){
                    if(webglfallback){
                        i.webglcantdraw=true
                        updatescene=true
                    }
                    gl.deleteTexture(i.texture)
                    delete i.texture
                    texturerror=true
                    texturerrorobj=
                    "cant load texture"+
                    "\nconstr: "+i.construck+
                    "\nerror: "+e+
                    "\nimg/video: "+(typeof(i.fillvideo)!="undefined"?i.fillvideo:"")+(typeof(i.fillpic)!="undefined"?i.fillpic:"")+
                    (webglfallback?"\nusing canvas for it":"")
                }
                gl.bindTexture(gl.TEXTURE_2D, null);
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
            if(texturerror){
                i.webglcantdrawfillbackup=true
                let colorctx = new OffscreenCanvas(1,1).getContext('2d');
                colorctx.fillStyle = typeof(i.fillbackup)=="string"?i.fillbackup:"black";
                colorctx.fillRect(0, 0, 1, 1);
                let compcolor=[...colorctx.getImageData(0, 0, 1, 1).data]
                for (let i1 in compcolor)compcolor[i1]/=255
                i.webglfill=compcolor
                console.groupCollapsed("texture webgl info")
                console.info("texturerror: "+texturerrorobj)
                console.groupEnd()
            }
        }
    }


    if(grasstogpuwebgl2mode==0&&webgl2&&webglgrassani&&fpsav+10>m4xfps&&fps+10>m4xfps){
        if(updategrass||updatetgrass>updatewebglgrass||(updatetgrass>0&&fpsav+2>m4xfps&&fps+5>m4xfps)){
            grasstogpuwebgl2mode=1
            if('requestIdleCallback' in window){window.requestIdleCallback(grasstogpuwebgl2)}else{grasstogpuwebgl2(false)}
        }
    }
    if(debug)debugtext+="\nwebglgrassquali "+webglgrassquali

    if(WEBGLdisjointtimer){
        if(WEBGLdisjointtimermode==1&&!gl.isQuery(WEBGLdisjointtimerquery)){WEBGLdisjointtimermode=0;console.warn("query error reset mode")}//fallsave wen net resetet worden
        if(WEBGLdisjointtimermode==1&&gl.getQueryParameter(WEBGLdisjointtimerquery, gl.QUERY_RESULT_AVAILABLE)) {
            rendertime=gl.getQueryParameter(WEBGLdisjointtimerquery, gl.QUERY_RESULT)/1000000
            rendertimeavg=rendertimeavg*rendertimeabfac+rendertime*(1-rendertimeabfac)
            WEBGLdisjointtimermode=0
            
        }
        if(WEBGLdisjointtimermode==0)gl.beginQuery(WEBGLdisjointtimer.TIME_ELAPSED_EXT, WEBGLdisjointtimerquery);
    }
    if(debug)debugtext+=""+
        "\nrendertime: "+rendertime.toFixed(5)+
        "\nrendertimeavg: "+rendertimeavg.toFixed(5)+
        "\nhowmutchgrass: "+howmutchgrass+
        "\ngrasstorender: "+grasstorender+
        "\nupdatetgrass: "+updatetgrass+
        "\ngrasstogpuwebgl2mode: "+grasstogpuwebgl2mode+
        "\ngrasslimitact: "+grasslimitact+
        "\nwebglgrasscut: "+webglgrasscut

    gl.viewport(0, 0, canvas.width, canvas.height)
    webgldraw(x,y,time)
    if(webgl2&&webglgrassani)grassdrawwebgl2(x,y,time)

    if(WEBGLdisjointtimer&&WEBGLdisjointtimermode==0){
        gl.endQuery(WEBGLdisjointtimer.TIME_ELAPSED_EXT)
        WEBGLdisjointtimermode=1
    }

    if(webglfallback||debug)ctxb.clearRect(0,0,canvas.width,canvas.height)
    if(inversekinematics&&promall[3].res&&webglfallback)canvasdrawbones(ctxb,x,y)
    if(webglfallback)for(let i of [...mySun[loadmap],...myFire[loadmap],...myRect[loadmap]])if(i.webglcantdraw)canvasdrawimage(ctxb,i,x,y)

}
function webgldraw(x=0,y=0,time=0){
    gl.useProgram(shaderProgram[0]);
    webglbuffer.bindvertexarray("obj")
    gl.uniform2f(webglbuffers.obj.uniform.canvashwwebgl,canvas.width,canvas.height);
    gl.uniform4f(webglbuffers.obj.uniform.offsgl,x,y,zoom,zoomn);
    let i=-1
    let pics=0
    for (let i1 of webgldrawarr){
        i++
        if(i1.nodraw||i1.invisible)continue//wen obj unsichtbar oder net gedrawt werden sol net drawn
        if(objvertecys[0][i+1]-objvertecys[0][i]<=0)continue//wen obj keine vertecys hat net draw
        if(!(rofx*zoomn-20<i1.minx+i1.w&&
            i1.minx/zoomn<rofx+canvas.width+20&&
            rofy*zoomn-20<i1.miny+i1.h&&
            i1.miny/zoomn<rofy+canvas.height+20))continue//wen unsichtbar nicht draw
        gl.uniform2f(webglbuffers.obj.uniform.translation,i1.minx,i1.miny);

        gl.uniform1f(webglbuffers.obj.uniform.aPicture, 0);
        if(i1.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")&&!i1.webglcantdrawfillbackup){
            gl.uniform1f(webglbuffers.obj.uniform.aPicture, 1);
            gl.uniform1i(webglbuffers.obj.uniform.uSampler, pics)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, i1.texture);
            
            if(((i1.phy==true&&i1.construck=="Wasser")||i1.fill.constructor.name.match("HTMLVideoElement"))&&!i1.webglcantdraw){
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
                
                gl.texSubImage2D(gl.TEXTURE_2D, 0,0,0, gl.RGBA,gl.UNSIGNED_BYTE, i1.fill) 
            }
            
            pics++
        }else if(Array.isArray(i1.webglfill)){
            gl.uniform4f(webglbuffers.obj.uniform.aColor, ...i1.webglfill);
        }
        gl.drawArrays(gl.TRIANGLE_FAN, objvertecys[0][i]/2, (objvertecys[0][i+1]-objvertecys[0][i])/2)
    }
    if(webgl2){
        gl.bindVertexArray(null)
    }else if(WEBGLoes){
        WEBGLoes.bindVertexArrayOES(null)
    }else{
        gl.bindBuffer(gl.ARRAY_BUFFER,null)
    }
}
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
    let objectsgrassmove=myRect[loadmap].filter(i1=>typeof(i1.velo)=="object"&&Array.isArray(i1.velo)&&i1.velo.length==2)
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
    gl.uniform4fv(webglbuffers.grass.uniform.objectspos,objectsgrassmovepos);
    gl.uniform2fv(webglbuffers.grass.uniform.objectsvel,objectsgrassmovevel);

    gl.uniform1i(webglbuffers.grass.uniform.objectslength,objectsgrassmove.length)  

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
            new Float32Array(new ArrayBuffer(webglbuffers.grass.feedbackbuffer.aVelo.group.buffersize*bpe*webglbuffers.grass.feedbackbuffer.aVelo.bufferlength)),
            new Float32Array(new ArrayBuffer(webglbuffers.grass.feedbackbuffer.aWind.group.buffersize*bpe*webglbuffers.grass.feedbackbuffer.aWind.bufferlength)),
            new Float32Array(new ArrayBuffer(webglbuffers.grass.feedbackbuffer.aWindrandtimer.group.buffersize*bpe*webglbuffers.grass.feedbackbuffer.aWindrandtimer.bufferlength)),
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
        webglbuffer.testbufferoverflow("grass",(objvertices.length/2)*bpe)

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
async function repaint0(x=0,y=0){
    //redraw nur wen bebraucht
    if(shadows&&canvasshadow.constructor.name!="HTMLCanvasElement"){
        canvasshadow=document.createElement("CANVAS")
        ctxshadow=canvasshadow.getContext('2d');//,{pixelFormat:"float16",desynchronized:true}
        if(!canvarr.includes("canvasshadow"))canvarr.push("canvasshadow")
        if(!ctxarr.includes("ctxshadow"))ctxarr.push("ctxshadow")
        canvasshadow.width=document.documentElement.clientWidth;
        canvasshadow.height=document.documentElement.clientHeight;
        imagesmoothingset(ctxshadow)
        canvasshadow.id="canvasshadow"
        if(shadowblurtype==1)canvasshadow.style.filter="blur("+shadowblur+"px)"
        if(shadowblurtype==2)canvasshadow.filter="blur("+shadowblur+"px)"
        document.body.appendChild(canvasshadow)
    }
    if(!shadows&&typeof(canvasshadow)!="undefined"&&canvasshadow.constructor.name=="HTMLCanvasElement"){
        canvasshadow.remove()
        canvarr=canvarr.filter(i=>i!="canvasshadow")
        ctxarr=canvarr.filter(i=>i!="ctxshadow")
        canvasshadow=null
        ctxshadow=null
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
                if(sun.constructor.name.match("OffscreenCanvas|HTMLCanvasElement|HTMLVideoElement")){
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
            canvasdrawimage(ctx,i,x,y)
        }
    }//animierte textur feuer schweif usw noch reinbaun

    if(inversekinematics&&promall[3].res)canvasdrawbones(ctx,x,y)
}
function canvasdrawimage(ctxt,i,x,y){
    if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")){
        if(typeof(i.rotate)=="number"&&i.rotate!=0){
            ctxt.save();
            if(typeof(i.x)=="object"){
                ctxt.translate(i.minx/zoomn+(i.w/zoomn/2)-x,i.miny/zoomn+(i.h/zoomn/2)-y);
            }else{
                ctxt.translate(i.x/zoomn+(i.w/zoomn/2)-x,i.y/zoomn+(i.h/zoomn/2)-y);
            }
            ctxt.rotate(i.rotate);
            ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,-i.w*2+(typeof(i.picoff)=="object"?i.picoff[0]:0),-i.h*2+(typeof(i.picoff)=="object"?i.picoff[1]:0),i.w/zoomn,i.h/zoomn)
            ctxt.restore()
        }else{
            if(suppixel){
                if(typeof(i.picoff)=="object"){
                    if(typeof(i.x)=="object"){
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.minx/zoomn-x+i.picoff[0],i.miny/zoomn-y+i.picoff[1],i.w/zoomn,i.h/zoomn)
                    }else{
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.x/zoomn-x+i.picoff[0],i.y/zoomn-y+i.picoff[1],i.w/zoomn,i.h/zoomn)
                    }
                }else{
                    if(typeof(i.x)=="object"){
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.minx/zoomn-x,i.miny/zoomn-y,i.w/zoomn,i.h/zoomn)
                    }else{
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.x/zoomn-x,i.y/zoomn-y,i.w/zoomn,i.h/zoomn)
                    }
                }
            }else{
                if(typeof(i.picoff)=="object"){
                    if(typeof(i.x)=="object"){
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.minx/zoomn-x+i.picoff[0]),Math.trunc(i.miny/zoomn-y+i.picoff[1]),i.w/zoomn,i.h/zoomn)
                    }else{
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.x/zoomn-x+i.picoff[0]),Math.trunc(i.y/zoomn-y+i.picoff[1]),i.w/zoomn,i.h/zoomn)
                    }
                }else{
                    if(typeof(i.x)=="object"){
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.minx/zoomn-x),Math.trunc(i.miny/zoomn-y),i.w/zoomn,i.h/zoomn)
                    }else{
                        ctxt.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.x/zoomn-x),Math.trunc(i.y/zoomn-y),i.w/zoomn,i.h/zoomn)
                    }
                }
            }
        }
    }else if(i.fill.constructor.name=="ImageData"){
        if(suppixel){
            if(typeof(i.x)=="object"){
                ctxt.putImageData(i.fill,i.minx/zoomn-x,i.miny/zoomn-y)
            }else{
                ctxt.putImageData(i.fill,i.x/zoomn-x,i.y/zoomn-y)
            }
        }else{
            if(typeof(i.x)=="object"){
                ctxt.putImageData(i.fill,Math.trunc(i.minx/zoomn-x),Math.trunc(i.miny/zoomn-y))
            }else{
                ctxt.putImageData(i.fill,Math.trunc(i.x/zoomn-x),Math.trunc(i.y/zoomn-y))
            }
        }
    }
}
function canvasdrawbones(ctxt,x,y){
    ctxt.strokeStyle = "gray";
    ctxt.lineWidth=2
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
                if(typeof(textur1)=="object"&&textur1.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")){
                    let dist=Math.sqrt(Math.pow(Math.abs(originx/zoomn-finishx/zoomn),2)+Math.pow(Math.abs(originy/zoomn-finishy/zoomn),2))
                    let rot=Math.atan2(originy-finishy,originx-finishx)-Math.PI/2-Math.PI
                    ctxt.save();
                    ctxt.translate(originx/zoomn-x,originy/zoomn-y);
                    ctxt.rotate(rot);
                    ctxt.drawImage(textur1,0,0,textur1.width,textur1.height,-(seg.width/zoomn)/2,0,(seg.width/zoomn),dist)
                    ctxt.restore();
                }else{
                    if(typeof(textur1)=="string")ctxt.fillStyle=textur1
                    ctxt.beginPath();
                    ctxt.moveTo(originx/zoomn-x,originy/zoomn-y);
                    ctxt.lineTo(finishx/zoomn-x,finishy/zoomn-y);
                    ctxt.stroke()
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
        imagesmoothingset(ctxbshadow)
        canvasbshadow.id="canvasbshadow"
        if(shadowblurtype==1)canvasbshadow.style.filter="blur("+shadowblur+"px)"
        if(shadowblurtype==2)canvasbshadow.filter="blur("+shadowblur+"px)"
        document.body.appendChild(canvasbshadow)
    }
    if(!shadows&&typeof(canvasbshadow)!="undefined"&&canvasbshadow.constructor.name=="HTMLCanvasElement"){
        canvasbshadow.remove()
        canvarr=canvarr.filter(i=>i!="canvasbshadow")
        ctxarr=canvarr.filter(i=>i!="ctxbshadow")
        canvasbshadow=null
        ctxbshadow=null
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
            if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")){
                if(suppixel){
                    ctxb.drawImage(i.fill,0,0,i.fill.width,i.fill.height,i.minx/zoomn-x,i.miny/zoomn-y,i.w/zoomn,i.h/zoomn)
                }else{
                    ctxb.drawImage(i.fill,0,0,i.fill.width,i.fill.height,Math.trunc(i.minx)/zoomn-x,Math.trunc(i.miny)/zoomn-y,i.w/zoomn,i.h/zoomn)
                }
            }else if(i.fill.constructor.name=="ImageData"){
                if(suppixel){
                    ctxb.putImageData(i.fill,i.minx/zoomn-x,i.miny/zoomn-y)
                }else{
                    ctxb.putImageData(i.fill,Math.trunc(i.minx)/zoomn-x,Math.trunc(i.miny)/zoomn-y)
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
            if(sun.constructor.name.match("OffscreenCanvas|HTMLCanvasElement|HTMLVideoElement")){
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
    for(let i of [...myRect[loadmap],...mySun[loadmap]])if(ignore||i.havcoll==true){colobjarr.push(i);test.push({x:i.x,y:i.y,w:i.w,h:i.h,invisible:i.invisible})}
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
                workercol.postMessage([minx,miny,maxx,maxy,test,gpuacceleratedgame])
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
            workercol.postMessage([minx,miny,maxx,maxy,test,gpuacceleratedgame])
            workercol.onmessage=(e)=>{
                colmap=new Uint32Array(e.data[0]);
                objcolmap=new Uint8Array(e.data[1]);
                cancolmap=true
                collupdate=true
            }
        }
    }
}
function menu(){
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
        if(loadmap==i)but[but.length-1].style.background="lightgray"
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
        if(multiplayerstartet){
            but.push(document.createElement("BUTTON"))
            but[but.length-1].style.gridColumn="6/6";
            but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("upload")?tooltips.loadandsave.duplicate:"upload"
            but[but.length-1].onclick=()=>{
                mapinfo[mapinfo.length]=mapinfo[i]
                postMessage({act:"sendmap",obj:savearr(2)})
                document.querySelectorAll('.preset').forEach((me)=>me.remove());
                loadandsave()
            }
        }
    }

    if(promall[4].res){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
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
        but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("save_localstorage")?tooltips.loadandsave.save_localstorage:"save_localstorage"
        but[but.length-1].onclick=()=>savearr(1)

        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
        but[but.length-1].onclick=(m)=>{loadstorage(window.prompt("",""));document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()}
        but[but.length-1].name="client-localstorage"
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("load_localstorage")?tooltips.loadandsave.load_localstorage:"load_localstorage"
    }

    but.push(document.createElement("BUTTON"))
    but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
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
                i1.onclick=event=>{window[a]()}
                i1.onblur=event=>{if(Array.isArray(checksettings[a])&&checksettings[a].length==4)checksettings[a][3]()}
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
                    if(Array.isArray(checksettings[a])&&checksettings[a].length==4)checksettings[a][3]()
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
                    if(Array.isArray(checksettings[a])&&checksettings[a].length==4)checksettings[a][3]()
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
    if(cheats)obj.push([...cheatsettings])
    if(noob){
        let finish=false
        let search=function(i){
            if(finish)return
            for(let i1 of i){
                if(Array.isArray(i1)){
                    search(i1)
                }else if(i1=="noob"){
                    i.push(...noobsettings)
                    finish=true
                }
            }
        }
        search(obj)//hoffe das das so geht wen net breuchte ich array das sich pfad merkt
    }
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
    if(Array.isArray(checksettings[settingname])&&checksettings[settingname].length>=3){
        if(checksettings[settingname][2] instanceof RegExp){
            convregexcheck=JSON.stringify(obj)
            numberregcheck=convregexcheck.match(checksettings[settingname][2])
            regexcheck=true
        }else{
            console.error(new SyntaxError(
                "setting invalide(3param is not regex or string):"+
                "\nsetting:"+settingname+
                "\n"+new Error().stack))
            return false
        }
    }
    if(Array.isArray(checksettings[settingname])&&checksettings[settingname].length==4){
        if(!(checksettings[settingname][3] instanceof Function)){//mach function check ob save ist
            console.error(new SyntaxError(
                "setting invalide(4param is not function):"+
                "\nsetting:"+settingname+
                "\n"+new Error().stack))
            return false
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
    if(enableaudio)for(let me of myRect[loadmap])if(me.audio==true&&me.createtaudio==true)me.audiorem(me)
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
        let height=canvas.height
        let othersite=false
        for (let i=0,i1=0;i<lines.length;i++,i1++){
            let secend=lines[i].substring(lines[i].indexOf(" "))
            dctx.fillText(lines[i].substring(0,lines[i].indexOf(" ")),othersite?canvas.width-debtextlength:0,10+i1*maxl)
            dctx.fillText(secend,(othersite?canvas.width:debtextlength)-dctx.measureText(secend).width,10+i1*maxl)
            if(!othersite&&(height-=maxl)<maxl){othersite=true;i1=0}
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