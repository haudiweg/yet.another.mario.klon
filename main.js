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
window.onunload = websiteclose
window.onbeforeunload = websiteclose
function websiteclose(event=null){
    window.onunload = null
    window.onbeforeunload=null
    for(let i of closeonclose)i.close()
    if(multiplayerstartet)postMessage({act:"bye",id:multiplayerid});
    for(let i of myRect[loadmap])if("worker" in i)i.worker.postMessage({stop:true})
    let promises=[]
    let allfinished=true
    if(exportki){
        for(let i of Object.keys(createobjhelper.spawnedaiworker)){
            promises.push(createobjhelper.spawnedaiworker[i].prom)
            if(!createobjhelper.spawnedaiworker[i].res){
                createobjhelper.spawnedaiworker[i].postMessage({sendnetwork:true})
                allfinished=false
            }
        }
    }
    Promise.all(promises).then(()=>{
        //try{
        //    // @grant        window.close
        //    window.close()
        //}catch(e){console.log("close 1 failed");console.log(e)}
        //try{
        //    window.open('', '_self', '')
        //    window.close()
        //}catch(e){console.log("close 2 failed");console.log(e)}
        //try{
        //    window.close('','_parent','')
        //}catch(e){console.log("close 3 failed");console.log(e)}
        //try{
        //    window.open('','_self').close()
        //}catch(e){console.log("close 4 failed");console.log(e)}
        //try{
        //    window.open("about:blank","_self")
        //}catch(e){console.log("close 5 failed");console.log(e)}
        //try{
        //    location.href = "about:blank";
        //}catch(e){console.log("close 6 failed");console.log(e)}
        //console.log("ok cant close tab pls manuell close it")
    })
    if(!allfinished&&event!=null){
        event.preventDefault(); // required in some browsers
        event.returnValue = "";
        return "wait moment for aiwebworker to unload"
}
}
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
    if(isFinite(me.minx)&&me.minx!=null&&isFinite(me.w)&&me.w!=null&&isFinite(me.miny)&&me.miny!=null&&isFinite(me.h)&&me.h!=null){
        minx=Math.round(Math.min(minx,me.minx))
        maxx=Math.round(Math.max(maxx,me.minx+me.w))
        miny=Math.round(Math.min(miny,me.miny))
        maxy=Math.round(Math.max(maxy,me.miny+me.h))
    }else{
        console.warn(new Error("invalid object in mesureminmax"));
        console.warn(me);
    }
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
        if(renderer==3&&i=="0")rendererhere=3 //nur das erste webgl canvas ist webgl
        if(renderer==3&&i!="0")rendererhere=0

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
            stopbuild=false
            stopmain=false
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
function fastresetmap(){
    defaultarrload(loadmap)
    collisionmap()
    if(renderer==3)updatescene=true
    for (let me of myRect[loadmap]){
            if(shadows)toupdateshadow.add(me)
            if(me.static&&renderer==0)renderbackground=true
            if(typeof(colorobj)=="undefined"||disabletexturs){
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
    anime=myRect[loadmap].find(i=>i.construck=='Player')
}
async function start(obj){
    if(obj=="ani"&&promall[10].res&&!multiplayerjustlisten&&multiplayer)multiplayerconnect(true)//mach dich nochmal testen zu verbinden könnten ja seit client start was pasiert sein oder webrtc connect
    maxx=-Infinity
    maxy=-Infinity
    minx=Infinity
    miny=Infinity
    cancolmap=true
    oldscreenx=window.screenX
    oldscreeny=window.screenY
    veloscreenx=0
    veloscreeny=0

    inversekinematicsold=inversekinematics

    for (let me of [...myRect[loadmap],...mySun[loadmap]]){
        if(typeof(me.getstats)=="function")[me.w,me.h]=[me.getstats.w,me.getstats.h]
        mesureminmax(me)
    }
    let values=[...myRect[loadmap].filter(i=>i.static).flatMap((i,i1)=>[i1,i.construck,...i.x,...i.y]),minx,maxx,miny,maxy]
    let newhash=await digestMessage(values.join())

    let wait=collisionmap(true)
    if(enableaudio){
        startaudio()//pfals man audio activirt hat
        for(let i of Object.keys(soundvalues))sound[i].gain.setValueAtTime(soundvalues[i], audioctx.currentTime)
    }
    if(obj=="build"){
        if(inversekinematics||debug||!disablevideos){
            canvarr[1]="canvasb"
            ctxarr[1]="ctxb"
        }
        canvarr[0]="canvas"
        ctxarr[0]="ctx"
    }
    if(obj=="ani"){
        if(inversekinematics||debug||!disablevideos||webglfallback){
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
        if(typeof(colorobj)=="undefined"||disabletexturs){
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
        guistats()
        multipleplayer=myRect[loadmap].filter(i=>i.construck=='Player').length>1
        instandzoom=false
        if(promall[10].res&&multiplayer&&!listenforplayer&&multiplayerstartet){
            let i1=-1
            for(let i of myRect[loadmap]){
                if(i.playerphysik){
                    postMessage({
                        act:"player join",
                        data:{
                            playerid:++i1,
                            x:i.x,
                            y:i.y,
                            w:i.w,
                            h:i.h,
                            statsnum:i.statsnum[0],
                            inwater:i.inwater[0],
                            falldist:i.falldist
                        },
                        id:multiplayerid
                        },null)
                    i.playersendid=i1
                }
            }
            postMessage({act:"player not afk",id:multiplayerid})
        }
        await wait

        if(renderer==3&&webglshadowsallowed&&newhash!=oldhash){
            webglshadows()
        }

        window.requestAnimationFrame(ani)
        let finki=myRect[loadmap].filter(i=>i.construck=="Finish").map(i=>[i.minx+i.w/2,i.miny+i.h/2])
        if(neatkiworker&&sharedarraybufferallowed){
            let tempworkers=Object.values(createobjhelper.spawnedaiworker)//if ki got deactivatet and activatet agan than start them
            for(let i of myRect[loadmap]){
                createobjhelper.objcreatesharedworker.call(i)
                if("worker" in i){
                    if(tempworkers.some(i1=>i1==i.worker)){
                        i.worker.postMessage({
                            add:{
                                x:i.sharedx,
                                y:i.sharedy,
                                dir:i.shareddir,
                                lastupdatetime:i.sharedlastupdatetime,
                                velo:i.sharedvelo,
                                dmg:i.shareddmg,
                                statsnum:i.sharedstatsnum,
                                kitype:i.kitype,
                                objnum:i.objnum,
                                updatet:i.sharedupdatet,
                                colobjnum:i.sharedcolobjnum,
                                graviins:i.sharedgraviins,
                                inwater:i.sharedinwater,
                                keys:i.sharedkeys
                            }
                        })
                    }
                }
            }
        }
        for(let i of myRect[loadmap]){
            if("worker" in i){
                i.worker.postMessage({update:{finki:finki},start:true})
            }
        }
    }
    if(obj=="build"){
        stopbuild=true;
        build();
    }
    mhid()
    menuupdatekeys=false
    oldhash=newhash
}
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
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
         if(renderer==0){repaint0(...arguments)}//canvas
    else if(renderer==1){repaint1(...arguments)}//dom
    else if(renderer==2){repaint2(...arguments)}//svg
    else if(renderer==3){repaint3(...arguments)}//webgl
}
function repaintb(){
         if(renderer==0){repaintb0(...arguments)}//canvas
    else if(renderer==1){repaintb1(...arguments)}//dom
    else if(renderer==2){repaintb2(...arguments)}//svg
    else if(renderer==3){console.log("wtf wieso wird das gecalled renderbackgroound   rerenderer=3")}
}
function messurefps(){
    function loop(timemes){
        const fpsmes=1/((timemes-timeomes)/1e3)
        if(isFinite(fpsmes))m4xfps=m4xfps*(fpsmes>=m4xfps?0.7:0.95)+fpsmes*(fpsmes>=m4xfps?0.3:0.05)
        timeomes=timemes
        if(timemes<fpschecktime+perold){
            window.requestAnimationFrame(loop)
        }else{
            console.log("messure time "+m4xfps)
            for(let i=allowedmaxfps.length;i>=0;i--)if(allowedmaxfps[i]<=m4xfps+5){m4xfps=allowedmaxfps[i];break}
            m4xfps=Math.max(m4xfps,allowedmaxfps[0])
            checkedfps=true
        }
    }
    let perold=performance.now()
    let timeomes=perold
    window.requestAnimationFrame(loop)
}
function collisionmap(wait=false,ignore=false){
    if(basicinfo)console.log("update collmap")
    if(cancolmap!=true)return
    cancolmap=false
    colobjarr=[]
    let test=[]
    for(let i of [...myRect[loadmap],...mySun[loadmap]])if(ignore||i.havcoll==true){colobjarr.push(i);test.push({x:i.x,y:i.y,w:i.w,h:i.h,invisible:i.invisible,objnum:i.objnum})}
    for(let i=0;i<colobjarr.length;i++)colobjarr[i].colobjnum[0]=i+1
    if(!"Worker" in window||collmapnowebworker){
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
        if(objenemymap.length==(maxy-miny)*(maxx-minx)){
            objenemymap.fill(0)
        }else{
            objenemymap=new Uint8Array((maxy-miny)*(maxx-minx));
        }
        if(gravicache){
            if(gravimap.length==(maxy-miny)*(maxx-minx)*4){
                gravimap.fill(0)
            }else{
                gravimap=new Float32Array((maxy-miny)*(maxx-minx)*4);
            }
        }
        work(minx,miny,maxx,maxy,test,colmap,objcolmap,objenemymap)
        cancolmap=true
        collupdate=true
        if(renderer==3&&enableparticle)webgl2breakinitialize()
    }else{
        if(sharedarraybufferallowed&&collwebworkershared&&(!collwebworkersharedsend||(maxy-miny)*(maxx-minx)*Uint32Array.BYTES_PER_ELEMENT!=colsharedmap.byteLength)){
            workercol.postMessage([minx,miny,maxx,maxy,test,gpuacceleratedgame])
            colsharedmap=new SharedArrayBuffer((maxy-miny)*(maxx-minx)*Uint32Array.BYTES_PER_ELEMENT);
            objcolsharedmap=new SharedArrayBuffer((maxy-miny)*(maxx-minx)*Uint8Array.BYTES_PER_ELEMENT);
            objenemysharedmap=new SharedArrayBuffer((maxy-miny)*(maxx-minx)*Uint8Array.BYTES_PER_ELEMENT);
            if(gravicache)gravisharedmap=new SharedArrayBuffer((maxy-miny)*(maxx-minx)*Float32Array.BYTES_PER_ELEMENT*4);
            colmap=new Uint32Array(colsharedmap);
            objcolmap=new Uint8Array(objcolsharedmap);
            objenemymap=new Uint8Array(objenemysharedmap);
            if(gravicache)gravimap=new Float32Array(gravisharedmap)
            workercol.postMessage([colsharedmap,objcolsharedmap,objenemysharedmap])
            for(let i of myRect[loadmap])if("worker" in i)i.worker.postMessage({
                update:{
                    objcolmap:objcolsharedmap,
                    objenemymap:objenemysharedmap,
                    minx:minx,
                    miny:miny,
                    maxx:maxx,
                    maxy:maxy
                }
            })
            collwebworkersharedsend=true
        }
        if(wait){
            return new Promise((resolve, reject) => {
                workercol.postMessage([minx,miny,maxx,maxy,test,gpuacceleratedgame])

                workercol.onmessage=(e)=>{
                    if(!collwebworkersharedsend){
                        colmap=new Uint32Array(e.data[0]);
                        objcolmap=new Uint8Array(e.data[1]);
                        objenemymap=new Uint8Array(e.data[2]);
                    }
                    cancolmap=true
                    collupdate=true
                    resolve()
                    if(renderer==3&&enableparticle)webgl2breakinitialize()
                }
                workercol.onerror=reject
            })
        }else{
            workercol.postMessage([minx,miny,maxx,maxy,test,gpuacceleratedgame])
            workercol.onmessage=(e)=>{
                if(!collwebworkersharedsend){
                    colmap=new Uint32Array(e.data[0]);
                    objcolmap=new Uint8Array(e.data[1]);
                    objenemymap=new Uint8Array(e.data[2]);
                }
                cancolmap=true
                collupdate=true
                if(renderer==3&&enableparticle)webgl2breakinitialize()
            }
        }
    }
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
    for(let i in canvarr)window[canvarr[i]].style.zIndex=renderer==3?canvarr.length-parseInt(i)-1:"0"
    menuupdatekeys=true
}
function mswitch() {
    document.querySelectorAll('.menu').forEach((me)=>{menunode.push(me);me.remove()})
    for(let i of canvarr)window[i].style.zIndex="-1"
}
function mvis() {
    if(enableaudio)for(let me of myRect[loadmap])if(me.audio==true&&me.createtaudio==true)me.audiorem(me)
    while(menunode.length)document.body.appendChild(menunode.shift())
    for(let i of canvarr)window[i].style.zIndex="-1"
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
async function getweather() {
    if(weaterinfo!=null)return
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{weaterlatlon(position.coords.latitude,position.coords.longitude)},getweather1)
    }else{
        getweather1()
    }
}
async function getweather1(){
    console.log("ok i use api to get were you are")
    if(useipapi){
        let data=await fetch('http://ip-api.com/json/').then(resp=>resp.json())
        console.log(data);
        weaterlatlon(data.lat,data.lon)
    } else{
        console.log("cant find your cordinates")
    }
    
}
async function weaterlatlon(lat,lon){
    console.log('Your latitude is :'+lat+' and longitude is '+lon);
    weaterinfo=await fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+lat+'&lon='+lon+'&appid='+weatherapikey).then(resp=>resp.json()) // Convert data to json
    console.log(weaterinfo);
    //distance of 
    //devicedirection
    //weaterinfo.wind.deg
    //todo   (couldnt do not enoth medicine)
    windrange=[weaterinfo.wind.speed/5,weaterinfo.wind.speed/10]
}


window.addEventListener("deviceorientation", event=>{devicedirection=event.beta|0}, true);

function testvib(time,slow=1,strong=1){
    function vib(){
        navigator.getGamepads()[0].vibrationActuator.playEffect("dual-rumble", {
            duration: 150,
            strongMagnitude: strong,
            weakMagnitude: slow
        })
    }
    let v=setInterval(vib,100)
    setTimeout(()=>{clearInterval(v)}, time);
}
promallres[0]()