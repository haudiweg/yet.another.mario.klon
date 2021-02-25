async function repaint0(x=0,y=0){
    //redraw nur wen bebraucht
    if(statscanvas!=undefined)ctx.drawImage(statscanvas,0,0,statscanvas.width,statscanvas.height)
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
            for (let sun of i.shadow) {
                if(sun==undefined||typeof(sun[Symbol.iterator])!=="function")continue
                if(sun.constructor.name.match("OffscreenCanvas|HTMLCanvasElement|HTMLVideoElement")){
                    ctxshadow.drawImage(sun,0,0,sun.width,sun.height,Math.trunc(i.minx/zoomn+sun.minxs-x),Math.trunc(i.miny/zoomn+sun.minys-y),sun.width/zoomn,sun.height/zoomn)
                }else{
                    for (let i1 of sun) {
                        ctxshadow.beginPath();
                        if(suppixel){
                            ctxshadow.moveTo(i1[0]/zoomn-x+i.minx/zoomn,i1[1]/zoomn-y+i.miny/zoomn);
                            for (let i2=2;i2<i1.length;i2+=2){ctxshadow.lineTo(i1[i2]/zoomn-x+i.minx/zoomn,i1[i2+1]/zoomn-y+i.miny/zoomn)}
                        }else{
                            ctxshadow.moveTo(Math.trunc(i1[0]/zoomn-x+i.minx/zoomn),Math.trunc(i1[1]/zoomn-y+i.miny/zoomn));
                            for (let i2=2;i2<i1.length;i2+=2){ctxshadow.lineTo(Math.trunc(i1[i2]/zoomn-x+i.minx/zoomn),Math.trunc(i1[i2+1]/zoomn-y+i.miny/zoomn))}
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
               for (let sun of i.shadow) {
                   if(sun==undefined||typeof(sun[Symbol.iterator])!=="function")continue
                   for (let i1 of sun) {
                       for (let i2=0;i2<i1.length;i2+=2){ctx.fillRect(i1[i2]/zoomn-x-1+i.minx/zoomn,i1[i2+1]/zoomn-y-1+i.miny/zoomn,2,2)}
                   }
               }
           }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (let i of [...mySun[loadmap],...myRect[loadmap]]) {
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
    let fill=Array.isArray(i.fill)?i.fill[Math.min(zoom>=1,i.fill.length)]:i.fill
    if(i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")){
        if(typeof(i.rotate)=="number"&&i.rotate!=0){
            ctxt.save();
            ctxt.translate(i.minx/zoomn+(i.w/zoomn/2)-x,i.miny/zoomn+(i.h/zoomn/2)-y);
            ctxt.rotate(i.rotate);
            ctxt.drawImage(fill,0,0,fill.width,fill.height,-i.w*2+(typeof(i.picoff)=="object"?i.picoff[0]:0),-i.h*2+(typeof(i.picoff)=="object"?i.picoff[1]:0),i.w/zoomn,i.h/zoomn)
            ctxt.restore()
        }else{
            if(suppixel){
                if(typeof(i.picoff)=="object"){
                    ctxt.drawImage(fill,0,0,fill.width,fill.height,i.minx/zoomn-x+i.picoff[0],i.miny/zoomn-y+i.picoff[1],i.w/zoomn,i.h/zoomn)
                }else{
                    ctxt.drawImage(fill,0,0,fill.width,fill.height,i.minx/zoomn-x,i.miny/zoomn-y,i.w/zoomn,i.h/zoomn)
                }
            }else{
                if(typeof(i.picoff)=="object"){
                    ctxt.drawImage(fill,0,0,fill.width,fill.height,Math.trunc(i.minx/zoomn-x+i.picoff[0]),Math.trunc(i.miny/zoomn-y+i.picoff[1]),i.w/zoomn,i.h/zoomn) 
                }else{
                    ctxt.drawImage(fill,0,0,fill.width,fill.height,Math.trunc(i.minx/zoomn-x),Math.trunc(i.miny/zoomn-y),i.w/zoomn,i.h/zoomn) 
                }
            }
        }
    }else if(fill.constructor.name=="ImageData"){
        if(suppixel){
            ctxt.putImageData(fill,i.minx/zoomn-x,i.miny/zoomn-y)
        }else{
            ctxt.putImageData(fill,Math.trunc(i.minx/zoomn-x),Math.trunc(i.miny/zoomn-y))
        }
    }else if(typeof(fill)=="string"){
        ctxb.fillStyle=i.fill
        ctxb.shadowColor=typeof(i.blur)=="number"?i.blurcolor:"";
        ctxb.shadowBlur=typeof(i.blur)=="number"?i.blur:0;
        ctxb.beginPath();
        if(suppixel){
            ctxb.moveTo(i.x[0]/zoomn-x,i.y[0]/zoomn-y)
            for (let i1=1;i1<i.x.length;i1++){ctxb.lineTo(i.x[i1]/zoomn-x,i.y[i1]/zoomn-y)}
        }else{
            ctxb.moveTo(Math.trunc(i.x[0]/zoomn-x),Math.trunc(i.y[0]/zoomn-y))
            for (let i1=1;i1<i.x.length;i1++){ctxb.lineTo(Math.trunc(i.x[i1]/zoomn-x),Math.trunc(i.y[i1]/zoomn-y))}
        }
        ctxb.fill();
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
                    let dist=Math.hypot(Math.abs(originx/zoomn-finishx/zoomn),Math.abs(originy/zoomn-finishy/zoomn))
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
        for (let i of [...mySun[loadmap],...myRect[loadmap]]) {
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
            ctxb.beginPath();
            if(suppixel){
                ctxb.moveTo(i.x[0]/zoomn-x,i.y[0]/zoomn-y)
                for (let i1=1;i1<i.x.length;i1++){ctxb.lineTo(i.x[i1]/zoomn-x,i.y[i1]/zoomn-y)}
            }else{
                ctxb.moveTo(Math.trunc(i.x[0]/zoomn-x),Math.trunc(i.y[0]/zoomn-y))
                for (let i1=1;i1<i.x.length;i1++){ctxb.lineTo(Math.trunc(i.x[i1]/zoomn-x),Math.trunc(i.y[i1]/zoomn-y))}
            }
            ctxb.fill();
        }else if(typeof(i.fill)=="object"){
            let fill=Array.isArray(i.fill)?i.fill[Math.min(zoom>=1,i.fill.length)]:i.fill
            if(fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement")){
                if(suppixel){
                    ctxb.drawImage(fill,0,0,fill.width,fill.height,i.minx/zoomn-x,i.miny/zoomn-y,i.w/zoomn,i.h/zoomn)
                }else{
                    ctxb.drawImage(fill,0,0,fill.width,fill.height,Math.trunc(i.minx)/zoomn-x,Math.trunc(i.miny)/zoomn-y,i.w/zoomn,i.h/zoomn)
                }
            }else if(fill.constructor.name=="ImageData"){
                if(suppixel){
                    ctxb.putImageData(fill,i.minx/zoomn-x,i.miny/zoomn-y)
                }else{
                    ctxb.putImageData(fill,Math.trunc(i.minx)/zoomn-x,Math.trunc(i.miny)/zoomn-y)
                }
            }
        }
    }
    while (shadowstaticqualli>0&&shadows&&todrawb[1].length>0&&((time==0||time.timeRemaining()>2)||renderallinstand)) {//man könte zeit anpassen
        let i=todrawb[1].pop()
        for (let sun of i.shadow) {
            if(sun==undefined||typeof(sun[Symbol.iterator])!=="function")continue   //fail save wen game fertig ist
            if(sun.constructor.name.match("OffscreenCanvas|HTMLCanvasElement|HTMLVideoElement")){
                ctxbshadow.drawImage(sun,0,0,sun.width,sun.height,Math.trunc(i.minx/zoomn+sun.minxs-x),Math.trunc(i.miny/zoomn+sun.minys-y),sun.width/zoomn,sun.height/zoomn)
            }else{
                for (let i1 of sun) {
                    ctxbshadow.beginPath();
                    if(suppixel){
                        ctxbshadow.moveTo(i1[0]/zoomn-x+i.minx/zoomn,i1[1]/zoomn-y+i.miny/zoomn);
                        for (let i2=2;i2<i1.length;i2+=2){ctxbshadow.lineTo(i1[i2]/zoomn-x+i.minx/zoomn,i1[i2+1]/zoomn-y+i.miny/zoomn)}
                    }else{
                        ctxbshadow.moveTo(Math.trunc(i1[0]/zoomn-x+i.minx/zoomn),Math.trunc(i1[1]/zoomn-y+i.miny/zoomn));
                        for (let i2=2;i2<i1.length;i2+=2){ctxbshadow.lineTo(Math.trunc(i1[i2]/zoomn-x+i.minx/zoomn),Math.trunc(i1[i2+1]/zoomn-y+i.miny/zoomn))}
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
promallres[15]()