// @ts-check
'use strict';
const colorobj={
    URL:function(x,y,me,w,h,timetowalk=false,rerender=false){
        if(rerender)return
        let img = new Image();
        img.src = me.fillpic;
        img.onload=()=>{me.fill=img}
        bonescolorf(me)
    },
    Pipe:function(x,y,me,w,h) {
        let canvas1=new OffscreenCanvas(Math.ceil(w),Math.ceil(h))
        let context1=canvas1.getContext("2d");
        let imageData=new ImageData(Math.ceil(w),Math.ceil(h));
        let type=0
        for (let i=0;i<Math.ceil(w)*Math.ceil(h);i++){
            type=0
            let yt=Math.trunc(i/Math.ceil(w))
            let xt=i%Math.ceil(w)
            if(me.ro==0){
                if(yt>h-me.pipetexturtop)type=1
                else if(xt>me.pipetexturside-1&&xt<w-me.pipetexturside)type=1
                else if(xt==me.pipetexturside-1||xt==w-me.pipetexturside)type=2
                if(yt==h-me.pipetexturtop||yt==h-1)type=2
                else if(yt>h-me.pipetexturtop&&(xt==0||xt==w-1))type=2
            }else if(me.ro==1){
                if(xt<me.pipetexturtop)type=1
                else if(yt>me.pipetexturside-1&&yt<h-me.pipetexturside)type=1
                else if(yt==me.pipetexturside-1||yt==h-me.pipetexturside)type=2
                if(xt==me.pipetexturtop||xt==0)type=2
                else if(xt<me.pipetexturtop&&(yt==0||yt==h-1))type=2
            }else if(me.ro==2){
                if(yt<me.pipetexturtop)type=1
                else if(xt>me.pipetexturside-1&&xt<w-me.pipetexturside)type=1
                else if(xt==me.pipetexturside-1||xt==w-me.pipetexturside)type=2
                if(yt==me.pipetexturtop||yt==0)type=2
                else if(yt<me.pipetexturtop&&(xt==0||xt==w-1))type=2
            }else if(me.ro==3){
                if(xt>w-me.pipetexturtop)type=1
                else if(yt>me.pipetexturside-1&&yt<h-me.pipetexturside)type=1
                else if(yt==me.pipetexturside-1||yt==h-me.pipetexturside)type=2
                if(xt==w-me.pipetexturtop||xt==w-1)type=2
                else if(xt>w-me.pipetexturtop&&(yt==0||yt==h-1))type=2
            }
    
    
            if(type==1){
                imageData.data[i*4+0]=me.pipetextur1r||0
                imageData.data[i*4+1]=me.pipetextur1g||100
                imageData.data[i*4+2]=me.pipetextur1b||0
                imageData.data[i*4+3]=me.pipetextur1a||255
            }else if(type==2){
                imageData.data[i*4+3]=me.pipetextur2a||255
            }
        }
        context1.putImageData(imageData,0,0);
        me.fill=canvas1
        if(renderer==3)updatetextur=true
        if(renderer==0)renderbackground=true
    },
    Snow:function(x,y,me,w,h,timetowalk=false,rerender=false){
        colorobj.Grass(x,y,me,w,h,timetowalk,rerender,true)
    },
    Grassstraw:function(x,y,me,w,h,timetowalk=false,rerender=false) {
        if(timetowalk!=false&&timetowalk.timeRemaining()<texturgenbuffertime){
            if(texturgenmaxwaittime==Infinity){
                window.requestIdleCallback(colorobj.Grassstraw.bind(this,me.x,me.y,me,me.w,me.h))
            }else{
                window.requestIdleCallback(colorobj.Grassstraw.bind(this,me.x,me.y,me,me.w,me.h),{timeout:texturgenmaxwaittime})
            }
            return
        }

        if(timetowalk==false||!me.hasOwnProperty("temp")){
            me.temp={}
            me.fill=me.fillbackup
            let ele=[]
            if(typeof(x)=="object"){
                for (let i=0;i<x.length;i++)ele[i]=[x[i],y[i]]
            }else{
                ele=[
                    [x,y],
                    [x+w,y],
                    [x+w,y+h],
                    [x,y+h]]
            }
            me.temp.elefor=[]
            for(let i1=0,i2=1;i1<ele.length;i1++,i2=(i1+1)%ele.length){
                if(typeof(me.texturrichtung)=="undefined"||!me.texturrichtung.includes(i1)||!me.texturrichtung.includes(i2))continue//das als to do in temp
                const winkel=Math.atan2(ele[i1][1]-ele[i2][1],ele[i1][0]-ele[i2][0])
                me.temp.elefor.push([ele[i2][0],ele[i2][1],ele[i1][0],ele[i1][1],Math.cos(winkel),Math.sin(winkel)])
            }
        }
        let suncord=[]
        if(webglgrasssun){
            if(timetowalk!=false&&me.temp.hasOwnProperty("suncord")){
                suncord=me.temp.suncord
            }else{
                for(let sun of mySun[loadmap]){
                    let ele1=[]
                    if(typeof(sun.x)=="object"){
                        for (let i=0;i<sun.x.length;i++)ele1[i]=[sun.x[i],sun.y[i]]
                    }else{
                        ele1=[
                            [sun.x,sun.y],
                            [sun.x+sun.w,sun.y],
                            [sun.x+sun.w,sun.y+sun.h],
                            [sun.x,sun.y+sun.h]]
                    }
                    for(let i1=0,i2=1;i1<ele1.length;i1++,i2=(i1+1)%ele1.length){
                        let gox=ele1[i1][0]
                        let goy=ele1[i1][1]
                        let winkel=Math.atan2(ele1[i1][1]-ele1[i2][1],ele1[i1][0]-ele1[i2][0])
                        suncord.push([gox,goy])
                        while(Math.sqrt(Math.pow(gox-ele1[i2][0],2)+Math.pow(goy-ele1[i2][1],2))>1){
                            gox-=Math.cos(winkel)
                            goy-=Math.sin(winkel)
                            suncord.push([gox,goy])
                        }
                    }
                }
                if(timetowalk!=false&&timetowalk.timeRemaining()<texturgenbuffertime){
                    me.temp.suncord=suncord
                    if(texturgenmaxwaittime==Infinity){
                        window.requestIdleCallback(colorobj.Grassstraw.bind(this,me.x,me.y,me,me.w,me.h))
                    }else{
                        window.requestIdleCallback(colorobj.Grassstraw.bind(this,me.x,me.y,me,me.w,me.h),{timeout:texturgenmaxwaittime})
                    }
                    return
                }
            }
        }
        const minxobj=typeof(x)=="object"?Math.min(...x):x
        const minyobj=typeof(x)=="object"?Math.min(...y):y
        while(me.temp.elefor.length>0){
            let [stopx,stopy,gox,goy,winkelx,winkely]=me.temp.elefor[0]
            while(Math.sqrt((gox-stopx)*(gox-stopx)+(goy-stopy)*(goy-stopy))>1){
                gox-=winkelx
                goy-=winkely
                if(Math.random()<=me.grassrandomfactor){
                    if(webglgrasssun){
                        let max=Infinity
                        let dir=0
                        br:for(let i3 of suncord){
                            let dist=Math.sqrt((gox-i3[0])*(gox-i3[0])+(goy-i3[1])*(goy-i3[1]))
                            if(dist<=max){
                                //das hir auch über multible frames
                                for(let gox1=gox,goy1=goy,winkel1=Math.atan2(goy-i3[1],gox-i3[0]);Math.sqrt((gox1-i3[0])*(gox1-i3[0])+(goy1-i3[1])*(goy1-i3[1]))>1;gox1-=Math.cos  (winkel1),goy1-=Math.sin(winkel1)){
                                    if(objcolmap[Math.trunc(goy1-miny)*(maxx-minx)+Math.trunc(gox1-minx)]>0)continue br
                                    //solte vieleicht kucken ob werte auserhalb min und max sind bzw ob minx maxx miny maxy net ein ganzer wert ist
                                }
                                max=dist
                                dir=Math.atan2(gox-i3[0],goy-i3[1])
                            }
                        }
                        if(max!=Infinity){
                            me.grassspawn(gox-minxobj,goy-minyobj+1,Math.random()*2+0.2,Math.random()*15+0.5,dir)
                            updatetgrass++
                        }
                    }else{
                        me.grassspawn(gox-minxobj,goy-minyobj+1,Math.random()*2+0.2,Math.random()*15+0.5,0)
                        updatetgrass++
                    }
                }
                if(timetowalk!=false&&timetowalk.timeRemaining()<texturgenbuffertime){
                    me.temp.elefor[0][2]=gox
                    me.temp.elefor[0][3]=goy
                    if(texturgenmaxwaittime==Infinity){
                        window.requestIdleCallback(colorobj.Grassstraw.bind(this,me.x,me.y,me,me.w,me.h))
                    }else{
                        window.requestIdleCallback(colorobj.Grassstraw.bind(this,me.x,me.y,me,me.w,me.h),{timeout:texturgenmaxwaittime})
                    }
                    return
                }
            }
            me.temp.elefor.shift()
        }
        delete me.temp
        if(renderer==3)updategrass=true
        if(renderer==0)renderbackground=true
    },
    Grass:function(x,y,me,w,h,timetowalk=false,rerender=false,snow=false) {
        //fieleicht lichtabhänigkeiten reinmachen durch virtuelle kanten reinbaun und kucken ob die sonne erreichen
        //option für wie viele virtuelle abschnitte
        //option das strahlen zur sonne gehen und kuckt ob weg frei ist
        if(w<=0||h<=0)return
        let canvas1=new OffscreenCanvas(Math.ceil(w)*texturquali,Math.ceil(h)*texturquali)
        let context1=canvas1.getContext("2d");
        const texalphascale=typeof(x)=="object"&&textureantialiasingscaling
        let alpha
        if(typeof(x)=="object"){
            let path=new Path2D()
            const offsx=Math.min(...x)
            const offsy=Math.min(...y)
            if(texalphascale){
                alpha=new Float64Array((Math.ceil(w)*texturquali)*(Math.ceil(h)*texturquali))
                path.moveTo((x[0]-offsx)*textureantialiasing*texturquali,(y[0]-offsy)*textureantialiasing*texturquali)
                for (let i=1;i<x.length;i++)path.lineTo((x[i]-offsx)*textureantialiasing*texturquali,(y[i]-offsy)*textureantialiasing*texturquali)
                path.closePath();
                for (let i=0;i<(Math.ceil(w)*texturquali)*(Math.ceil(h)*texturquali);i++){
                    for (let i1=0;i1<textureantialiasing;i1++){
                        for (let i2=0;i2<textureantialiasing;i2++){
                            alpha[i]+=+context1.isPointInPath(path,(i%(Math.ceil(w)*texturquali))*textureantialiasing+i1,Math.trunc(i/(Math.ceil(w)*texturquali))*textureantialiasing+i2)
                        }
                    }
                    alpha[i]/=textureantialiasing*textureantialiasing
                }
            }else{
                alpha=new Float64Array(Math.ceil(w)*Math.ceil(h))
                path.moveTo((x[0]-offsx)*textureantialiasing,(y[0]-offsy)*textureantialiasing)
                for (let i=1;i<x.length;i++)path.lineTo((x[i]-offsx)*textureantialiasing,(y[i]-offsy)*textureantialiasing)
                path.closePath();
                for (let i=0;i<Math.ceil(w)*Math.ceil(h);i++){
                    for (let i1=0;i1<textureantialiasing;i1++){
                        for (let i2=0;i2<textureantialiasing;i2++){
                            alpha[i]+=+context1.isPointInPath(path,(i%Math.ceil(w))*textureantialiasing+i1,Math.trunc(i/Math.ceil(w))*textureantialiasing+i2)
                        }
                    }
                    alpha[i]/=textureantialiasing*textureantialiasing
                }
            }
        }
        let imageData=new ImageData(Math.ceil(w)*texturquali,Math.ceil(h)*texturquali);
        let terain=new Float64Array(Math.ceil(w)*Math.ceil(h))
        let ele=[]
        if(typeof(x)=="object"){
            for (let i=0;i<x.length;i++)ele[i]=[x[i],y[i]]
        }else{
            ele=[
                [x,y],
                [x+w,y],
                [x+w,y+h],
                [x,y+h]]
        }
        let minxobj=typeof(x)=="object"?Math.min(...x):x
        let minyobj=typeof(x)=="object"?Math.min(...y):y
        let dist=new Float32Array(Math.ceil(w)*Math.ceil(h))
        for (let ix=0;ix<Math.ceil(w);ix++) {
            for (let iy=0;iy<Math.ceil(h);iy++) {
                let mindist=Infinity
                for(let i1=0,i2=1;i1<ele.length;i1++,i2=(i1+1)%ele.length){
                    if(typeof(me.texturrichtung)=="undefined"||!me.texturrichtung.includes(i1)||!me.texturrichtung.includes(i2))continue
                    const x=ix+minxobj
                    const y=iy+minyobj
                    const x1=ele[i1][0]
                    const y1=ele[i1][1]
                    const x2=ele[i2][0]
                    const y2=ele[i2][1]
                    const A=x-x1;
                    const B=y-y1;
                    const C=x2-x1;
                    const D=y2-y1;
                    const dot=A*C+B*D;
                    const len_sq=C*C+D*D;
                    let param=-1;
                    if (len_sq!=0)param=dot/len_sq;
                    let xx, yy;
                    if (param<0) {
                        xx=x1
                        yy=y1
                    }else if (param>1) {
                        xx=x2
                        yy=y2
                    }else {
                        xx=x1+param*C;
                        yy=y1+param*D;
                    }
                    const dx=x-xx
                    const dy=y-yy
                    mindist=Math.min(Math.sqrt(dx*dx+dy*dy),mindist)
                }
                dist[iy*Math.ceil(w)+ix]=mindist
            }
        }
        //schneide an mitte von obj textur eiseinander und mach generrieren
        //rerender nur wen kein poligon
        let offsnx=0
        let offsny=0
        let offsx=0
        let offsy=0
        let path=[]
        let ele1=[]
        if(rerender==true){
            offsnx=typeof(x)=="object"?Math.min(...x):x
            offsny=typeof(y)=="object"?Math.min(...y):y
            offsx=typeof(me.gennumbers[1])=="object"?Math.min(...me.gennumbers[1]):me.gennumbers[1]
            offsy=typeof(me.gennumbers[2])=="object"?Math.min(...me.gennumbers[2]):me.gennumbers[2]
            let rotation=[]
            if(typeof(me.gennumbers[1])=="object"){
                for (let i=0;i<me.gennumbers[1].length;i++)ele1[i]=[me.gennumbers[1][i],me.gennumbers[2][i]]
            }else{
                ele1=[
                    [me.gennumbers[1],me.gennumbers[2]],
                    [me.gennumbers[1]+me.gennumbers[3],me.gennumbers[2]],
                    [me.gennumbers[1]+me.gennumbers[3],me.gennumbers[2]+me.gennumbers[4]],
                    [me.gennumbers[1],me.gennumbers[2]+me.gennumbers[4]]
                ]
            }
            for(let inum=0;inum<ele1.length;inum++){
                let min1=(inum-1)<0?ele1.length-1:inum-1
                let plus1=(inum+1)%ele1.length
                path[inum]=new Path2D()
                path[inum].moveTo(ele1[inum][0]-offsx,ele1[inum][1]-offsy)
    
                let temp=[]
                let winkel=[]
    
                temp[0]=[ele1[inum][0]-offsx,ele1[inum][1]-offsy]
                temp[1]=[(ele1[inum][0]+ele1[min1][0])/2-offsx,(ele1[inum][1]+ele1[min1][1])/2-offsy]
                temp[3]=[(ele1[inum][0]+ele1[plus1][0])/2-offsx,(ele1[inum][1]+ele1[plus1][1])/2-offsy]
                winkel[1]=Math.atan2(ele1[inum][1]-ele1[min1][1],ele1[inum][0]-ele1[min1][0])
                winkel[3]=Math.atan2(ele1[inum][1]-ele1[plus1][1],ele1[inum][0]-ele1[plus1][0])
                rotation[inum]=-winkel[3]+Math.atan2(ele[inum][1]-ele[plus1][1],ele[inum][0]-ele[plus1][0])
    
    
                if(Math.abs(temp[1][0]-temp[0][0])<me.savemin*Math.abs(Math.cos(winkel[1])))temp[1][0]=temp[0][0]+me.savemin*Math.cos(winkel[1])
                if(Math.abs(temp[1][1]-temp[0][1])<me.savemin*Math.abs(Math.sin(winkel[1])))temp[1][1]=temp[0][1]-me.savemin*Math.sin(winkel[1])
    
                if(Math.abs(temp[3][0]-temp[0][0])<me.savemin*Math.abs(Math.cos(winkel[3])))temp[3][0]=temp[0][0]+me.savemin*Math.cos(winkel[3])
                if(Math.abs(temp[3][1]-temp[0][1])<me.savemin*Math.abs(Math.sin(winkel[3])))temp[3][1]=temp[0][1]-me.savemin*Math.sin(winkel[3])
    
                temp[2]=[Math.max(temp[1][0],temp[3][0]),Math.max(temp[1][1],temp[3][1])]
    
                if(temp[0][0]==temp[2][0])temp[2][0]=Math.min(temp[1][0],temp[3][0])
                if(temp[0][1]==temp[2][1])temp[2][1]=Math.min(temp[1][1],temp[3][1])
    
                for(let i=1;i<temp.length;i++){
                    let px = Math.cos(rotation[inum]) * (temp[i][0]-temp[0][0]) - Math.sin(rotation[inum]) * (temp[i][1]-temp[0][1]) + temp[0][0]
                    let py = Math.sin(rotation[inum]) * (temp[i][0]-temp[0][0]) + Math.cos(rotation[inum]) * (temp[i][1]-temp[0][1]) + temp[0][1]
                    temp[i][0]=px
                    temp[i][1]=py
                }
                for(let itemp of temp)path[inum].lineTo(itemp[0],itemp[1])
            }
        }
        for (let i=0;i<Math.ceil(w)*Math.ceil(h);i++) {
            let num=(Math.random()*me.randomnis+Math.min(Math.max(Math.min(Math.max(1-((dist[i]-me.offsetheight)/me.abnahmeheight),0),1)*(me.abfac+0.5),0),1)*(1-me.randomnis))
            if(rerender==true){
                let yt=Math.trunc(i/Math.ceil(w))
                let xt=i%Math.ceil(w)
                let tnum=0
                let texturoverwrite=false
    
                for(let inum=0;inum<ele.length;inum++){
                    if(!me.texturrichtung.includes(inum))continue
                    let tempxc=(ele1[inum][0]-ele[inum][0])-(offsx-offsnx)
                    let tempyc=(ele1[inum][1]-ele[inum][1])-(offsy-offsny)
                    let tempxu=xt+tempxc
                    let tempyu=yt+tempyc
    
                    //let basex=xt+tempxc
                    //let basey=yt+tempyc
    
                    //let px = Math.cos(rotation[inum]) * (basex-ele[inum][0]) - Math.sin(rotation[inum]) * (basey-ele[inum][1]) + ele[inum][0]
                    //let py = Math.sin(rotation[inum]) * (basex-ele[inum][0]) + Math.cos(rotation[inum]) * (basey-ele[inum][1]) + ele[inum][1]
    
                    //px-=tempxc
                    //py-=tempyc
    
                    if(context1.isPointInPath(path[inum],tempxu,tempyu)){
                        tnum=me.gennumbers[0][Math.ceil(tempyu)*Math.ceil(me.gennumbers[3])+Math.ceil(tempxu)]
                        texturoverwrite=true
                        //tnum=3
                        break
                    }
                }
                if(texturoverwrite){
                    tnum*=me.überlagerung
                    num*=(1-me.überlagerung)
                    num+=tnum
                }
    
            }
            terain[i]=num
        }
        //wen textur smaler wird dan net save   bearchte das texturen die nicht pixel perfect sind net so gern gesavt werden
        if(me.gennumbers[3]*me.gennumbers[4]<Math.floor(w)*Math.floor(h)){
            me.gennumbers[0]=[...terain]
            me.gennumbers[1]=typeof(x)=="object"?[...x]:x
            me.gennumbers[2]=typeof(y)=="object"?[...y]:y
            me.gennumbers[3]=w
            me.gennumbers[4]=h
        }
        //filterung
        for(let ifilter=0;ifilter<me.grassfilter;ifilter++){
            const oldterain=[...terain]
            for (let yi=0,i=0;yi<Math.ceil(h);yi++) {
                for (let xi=0;xi<Math.ceil(w);xi++,i++) {
                    let divfilter=1
                    if(xi>0){divfilter+=me.filtersmove;terain[i]+=oldterain[i-1]*me.filtersmove}
                    if(xi<w-1){divfilter+=me.filtersmove;terain[i]+=oldterain[i+1]*me.filtersmove}
                    if(yi>0){divfilter+=me.filtersmove;terain[i]+=oldterain[i-Math.ceil(w)]*me.filtersmove}
                    if(yi<h-1){divfilter+=me.filtersmove;terain[i]+=oldterain[i+Math.ceil(w)]*me.filtersmove}
    
                    if(xi>0&&yi>0){divfilter+=me.filtersmove;terain[i]+=oldterain[i-Math.ceil(w)-1]*me.filtersmove}
                    if(xi<w-1&&yi>0){divfilter+=me.filtersmove;terain[i]+=oldterain[i-Math.ceil(w)+1]*me.filtersmove}
                    if(xi>0&&yi<h-1){divfilter+=me.filtersmove;terain[i]+=oldterain[i+Math.ceil(w)-1]*me.filtersmove}
                    if(xi<w-1&&yi<h-1){divfilter+=me.filtersmove;terain[i]+=oldterain[i+Math.ceil(w)+1]*me.filtersmove}
    
                    terain[i]/=divfilter
                }
            }
        }
        for(let i=0,i1=0,i3=0;i1<Math.ceil(h)*texturquali;i1++){
            for(let i2=0;i2<Math.ceil(w)*texturquali;i2++,i3++){
                i=Math.trunc(i1/texturquali)*Math.ceil(w)+Math.trunc(i2/texturquali)
                if(snow){
                    if(terain[i]>=0.5){
                        imageData.data[i3*4+0]=Math.random()*me.snowtextursnow[0][0]+me.snowtextursnow[0][1]
                        imageData.data[i3*4+1]=Math.random()*me.snowtextursnow[1][0]+me.snowtextursnow[1][1]
                        imageData.data[i3*4+2]=Math.random()*me.snowtextursnow[2][0]+me.snowtextursnow[2][1]
                        imageData.data[i3*4+3]=me.snowtextursnow[3]*(typeof(x)=="object"?alpha[texalphascale?i3:i]:1)
                    }else if(Math.round(Math.random()*me.snowstone)==1){
                        imageData.data[i3*4+0]=Math.random()*me.snowtexturdirt[0][0]+me.snowtexturdirt[0][1]
                        imageData.data[i3*4+1]=Math.random()*me.snowtexturdirt[1][0]+me.snowtexturdirt[1][1]
                        imageData.data[i3*4+2]=Math.random()*me.snowtexturdirt[2][0]+me.snowtexturdirt[2][1]
                        imageData.data[i3*4+3]=me.snowtexturdirt[3]*(typeof(x)=="object"?alpha[texalphascale?i3:i]:1)
                    }else{
                        imageData.data[i3*4+0]=Math.random()*me.snowtexturstone[0][0]+me.snowtexturstone[0][1]
                        imageData.data[i3*4+1]=Math.random()*me.snowtexturstone[1][0]+me.snowtexturstone[1][1]
                        imageData.data[i3*4+2]=Math.random()*me.snowtexturstone[2][0]+me.snowtexturstone[2][1]
                        imageData.data[i3*4+3]=me.snowtexturstone[3]*(typeof(x)=="object"?alpha[texalphascale?i3:i]:1)
                    }
                }else{
                    if(terain[i]>=0.5){
                        imageData.data[i3*4+0]=Math.random()*me.grasstexturgrass[0][0]+me.grasstexturgrass[0][1]
                        imageData.data[i3*4+1]=Math.random()*me.grasstexturgrass[1][0]+me.grasstexturgrass[1][1]
                        imageData.data[i3*4+2]=Math.random()*me.grasstexturgrass[2][0]+me.grasstexturgrass[2][1]
                        imageData.data[i3*4+3]=me.grasstexturgrass[3]*(typeof(x)=="object"?alpha[texalphascale?i3:i]:1)
                    }else if(Math.round(Math.random()*me.grassstone)==1){
                        imageData.data[i3*4+0]=Math.random()*me.grasstexturdirt[0][0]+me.grasstexturdirt[0][1]
                        imageData.data[i3*4+1]=Math.random()*me.grasstexturdirt[1][0]+me.grasstexturdirt[1][1]
                        imageData.data[i3*4+2]=Math.random()*me.grasstexturdirt[2][0]+me.grasstexturdirt[2][1]
                        imageData.data[i3*4+3]=me.grasstexturdirt[3]*(typeof(x)=="object"?alpha[texalphascale?i3:i]:1)
                    }else{
                        imageData.data[i3*4+0]=Math.random()*me.grasstexturstone[0][0]+me.grasstexturstone[0][1]
                        imageData.data[i3*4+1]=Math.random()*me.grasstexturstone[1][0]+me.grasstexturstone[1][1]
                        imageData.data[i3*4+2]=Math.random()*me.grasstexturstone[2][0]+me.grasstexturstone[2][1]
                        imageData.data[i3*4+3]=me.grasstexturstone[3]*(typeof(x)=="object"?alpha[texalphascale?i3:i]:1)
                    }
                }
            }
            
        }
        context1.putImageData(imageData,0,0);
        me.fill=canvas1
        if(renderer==3)updatetextur=true
        if(renderer==0)renderbackground=true
    },
    Wasser:function(x,y,me,w,h,timetowalk=false,rerender=false) {
        if(rerender&&me.phy){Wasserpic(x,y,me,w,h);return}
        let negpos=1
        let lastnum=0
        let wellspeedup=0
        let num=10
        let newnum=10
        let num1=1
        if(me.allblue){
            me.fill="rgba("+
            (((me.wassertexturwasser & 0x000000FF) >>0)-1)+","+
            (((me.wassertexturwasser & 0x0000FF00) >> 8))+","+
            (((me.wassertexturwasser & 0x00FF0000) >> 16)-1)+","+
            (((me.wassertexturwasser & 0xFF000000) >> 24)/255)+")"
            return
        }
        if(!rerender)me.gennumbers=[[],w]
        for (let i=-me.einpendelphasse;i<w;i++) {
            wellspeedup+=num1
            let welle=(rerender&&me.gennumbers[1]<i&&i>=0)?me.gennumbers[0][i]:Math.sin(Math.PI/180*wellspeedup)
            if(!rerender)me.gennumbers[0][i]=welle
            if(lastnum<welle&&negpos==1){
                negpos=-1;
                newnum=(Math.random()*me.stärke+me.stärkemit)
                num1*=me.smovnes
                num1+=(Math.random()*me.stärke1+me.stärkemit1)*(1-me.smovnes)
            }
            if(lastnum>welle&&negpos==-1)negpos=1
            num-=newnum
            num*=me.übergang
            num+=newnum
            let welle1=Math.round(welle*num)
            if(0<=i){
                me.wasserphysa[0][i]=welle1
                me.wasserphysa[1][i]=0
            }
            lastnum=welle
        }
        me.fill=new OffscreenCanvas(w,h)
        Wasserpic(x,y,me,w,h)
    },
    Question:function(x,y,me,w,h){
        let ele=[]
        if(typeof(me.x)=="object"){
            for (let i=0;i<me.x.length;i++){ele[i][0]=me.x[i];ele[i][1]=me.y[i]}
        }else{
            ele=[
                [me.x,me.y],
                [me.x+me.w,me.y],
                [me.x+me.w,me.y+me.h],
                [me.x,me.y+me.h]]
        }
        let offsx=typeof(me.x)=="object"?Math.min(me.x):me.x
        let offsy=typeof(me.y)=="object"?Math.min(me.y):me.y

        let canvas1=new OffscreenCanvas(Math.ceil(w),Math.ceil(h))
        let context1=canvas1.getContext("2d");

        context1.beginPath()
        context1.moveTo(ele[0][0]-offsx,ele[0][1]-offsy)
        for (let i=1;i<ele.length;i++)context1.lineTo(ele[i][0]-offsx,ele[i][1]-offsy)
        context1.stroke();
        context1.clip();

        context1.fillStyle=me.questiontexturcolor
        context1.fillRect(0,0,canvas1.width,canvas1.height)

        context1.textAlign="center";
        context1.textBaseline="middle";
        context1.font='1px Monaco,Courier,monospace,Andale Mono,Lucida Console,Helvetica,Arial Narrow,Verdana';

        //kan fehler kommen bei langen text
        let metrics=context1.measureText(me.questiontexturtext)
        if(typeof(metrics.actualBoundingBoxDescent)!=="undefined"){
        context1.font=Math.min((me.ro%2==0?w:h)/metrics.width,(me.ro%2==0?h:w)/(metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent))+'px Monaco,Courier,monospace,Andale Mono,Lucida Console,Helvetica,Arial Narrow,Verdana';
        }else{
            context1.font=Math.min(canvas1.width,canvas1.height)+'px Monaco,Courier,monospace,Andale Mono,Lucida Console,Helvetica,Arial Narrow,Verdana'
        }
        context1.fillStyle=me.questiontexturtextcolor
        context1.strokeStyle=me.questiontexturtextstroke
        context1.save();
        context1.rotate(-(Math.PI/2)*me.ro);
        context1.fillText(me.questiontexturtext,w/2,h/2);
        context1.strokeText(me.questiontexturtext,w/2,h/2);
        context1.restore();

        context1.fillStyle=me.questiontexturpointcolor
        for(let i=0;i<ele.length;i++){
            let im=(i-1)<0?ele.length-1:i-1
            let ip=(i+1)%ele.length
            
            let tx=(ele[im][0]+ele[ip][0])/2
            let ty=(ele[im][1]+ele[ip][1])/2
            let winkel=Math.atan2(ty-ele[i][1],tx-ele[i][0])
            let wx=ele[i][0]+me.questiontexturdistanz*Math.cos(winkel)
            let wy=ele[i][1]+me.questiontexturdistanz*Math.sin(winkel)
            context1.fillRect(Math.round(wx-1-offsx),Math.round(wy-1-offsy),2,2)
        }
        me.fill=canvas1
        if(renderer==3)updatetextur=true
        if(renderer==0)renderbackground=true
    }
}
Object.freeze(colorobj)
function resizetextur(i,backupmove=0){
    if(i.fill.constructor.name.match("OffscreenCanvas")){
        i.fill.width=i.w
        i.fill.height=i.h
        if(typeof(i.wasserphysa)=="object"){
            i.wasserphysa[0]=new Float32Array(Array.from({length:i.w},(x,i)=>backupmove[0].length>i?backupmove[0][i]:0))
            i.wasserphysa[1]=new Float64Array(Array.from({length:i.w},(x,i)=>backupmove[1].length>i?backupmove[1][i]:0))
        }
        if(Object.getOwnPropertyNames(colorobj).includes(i.fillstr))colorobj[i.fillstr](i.x,i.y,i,i.w,i.h,false,true)
        if(i.static&&renderer==0)renderbackground=true
    }
}
function bonescolorf(me){
    if(typeof(me.bones)!="undefined"){
        for(let i of me.bones){
            for(let i1=0;(typeof(i["segment"+i1])!="undefined");i1++){
                for(let i2=0;(typeof(i["segment"+i1]["fillpic"+i2])!="undefined");i2++){
                    if(bonescolor){
                    let img1 = new Image();
                    img1.src =i["segment"+i1]["fillpic"+i2];
                    img1.onload=()=>{i["segment"+i1]["fill"+i2]=img1}
                    }else{
                        delete i["segment"+i1]["fill"+i2]
                    }
                }
            }
        }
    }
}
async function shadow(s,me){//nur wen sich was bewegt
    if((me.static?shadowstaticqualli:shadowqualli)<=0||shadows==false){
        if(typeof(me.shadow)=="object")delete me.shadow
        if(typeof(me.shadowadd)=="object")delete me.shadowadd
        return
    }else{
        if(typeof(me.shadow)!=="object"){
            me.shadow=new Array(mySun[loadmap].length)
            if(me.static)me.shadowadd=new Set()
        }
    }
    let firstx=typeof(me.x)=="object"?me.x[0]:me.x
    let firsty=typeof(me.y)=="object"?me.y[0]:me.y
    //vieleicht einstellbare quali
    //@ts-ignore
    let ele=new Float64Array((typeof(me.x)=="object")?me.x.length*2:[
        me.x,me.y,
        me.x+me.w,me.y,
        me.x+me.w,me.y+me.h,
        me.x,me.y+me.h])
    if(typeof(me.x)=="object"){
        for (let i=0;i<me.x.length;i++){ele[i*2]=me.x[i],ele[i*2+1]=me.y[i]}
    }
    //me.x,me.y,
    //me.x+me.w,me.y,
    //me.x,me.y+me.h,
    //me.x+me.w,me.y+me.h])
    if (me.static&&typeof(me.x)!=="object"){
        let menum=colobjarr.findIndex(i=>i==me)+1
        for (let i=0;i<ele.length;i++) {
            let i1=i%2
            let t0=i-i1
            let t1=i-i1+1
            let dirallowed=0
            //das hir auf neues sys umstelln
            if(objcolmap[Math.trunc((i1==1?1:0)+ele[t1]-miny)*(maxx-minx)+Math.trunc((i1==0?1:0)+ele[t0]-minx)]==menum)dirallowed=-1
            if(objcolmap[Math.trunc((i1==1?-1:0)+ele[t1]-miny)*(maxx-minx)+Math.trunc((i1==0?-1:0)+ele[t0]-minx)]==menum)dirallowed=1
            let num=ele[i]
            if(ele[t0]<minx||ele[t1]<miny||ele[t0]>maxx||ele[t1]>maxy||dirallowed==0)continue
            while(num>(i1==0?minx:miny)&&num<(i1==0?maxx:maxy)&&objcolmap[Math.trunc((i1==1?num:ele[i+1])-miny)*(maxx-minx)+Math.trunc((i1==0?num:ele[i-1])-minx)]!=0){

                if(
                  (i==0&&colmap[Math.trunc(Math.max(ele[i+1]-1-miny,0))*(maxx-minx)+Math.trunc(ele[i]-minx)]>0)||
                  (i==1&&colmap[Math.trunc(ele[i]-miny)*(maxx-minx)+Math.trunc(Math.max(ele[i-1]-1-minx,0))]>0)||
                  (i==2&&colmap[Math.trunc(Math.max(ele[i+1]-1-miny,0))*(maxx-minx)+Math.trunc(ele[i]-minx)]>0)||
                  (i==3&&colmap[Math.trunc(ele[i]-miny)*(maxx-minx)+Math.trunc(Math.min(ele[i-1]+1-minx,maxx))]>0)||
                  (i==4&&colmap[Math.trunc(Math.min(ele[i+1]+1-miny,maxy))*(maxx-minx)+Math.trunc(ele[i]-minx)]>0)||
                  (i==5&&colmap[Math.trunc(ele[i]-miny)*(maxx-minx)+Math.trunc(Math.max(ele[i-1]-1-minx,0))]>0)||
                  (i==6&&colmap[Math.trunc(Math.min(ele[i+1]+1-miny,maxy))*(maxx-minx)+Math.trunc(ele[i]-minx)]>0)||
                  (i==7&&colmap[Math.trunc(ele[i]-miny)*(maxx-minx)+Math.trunc(Math.min(ele[i-1]+1-minx,maxx))]>0))break
                  //skipt falsche solte aber neu programieren damit es bei n ecke geht
                    
                if(objcolmap[Math.trunc((i1==1?num:ele[i+1])-miny)*(maxx-minx)+Math.trunc((i1==0?num:ele[i-1])-minx)]!=menum){
                    if(colobjarr[objcolmap[Math.trunc((i1==1?num:ele[i+1])-miny)*(maxx-minx)+Math.trunc((i1==0?num:ele[i-1])-minx)]-1].static){
                        me.shadowadd.add(colobjarr[objcolmap[Math.trunc((i1==1?num:ele[i+1])-miny)*(maxx-minx)+Math.trunc((i1==0?num:ele[i-1])-minx)]-1])
                    }
                }
                ele[i]=num
                num+=dirallowed
                
            }
        }
    }
    //
    const ele2x=typeof(mySun[loadmap][s].x)!=="object"?[mySun[loadmap][s].x,mySun[loadmap][s].x+mySun[loadmap][s].w,mySun[loadmap][s].x+mySun[loadmap][s].w,mySun[loadmap][s].x]:mySun[loadmap][s].x
    const ele2y=typeof(mySun[loadmap][s].y)!=="object"?[mySun[loadmap][s].y,mySun[loadmap][s].y,mySun[loadmap][s].y+mySun[loadmap][s].h,mySun[loadmap][s].y+mySun[loadmap][s].h]:mySun[loadmap][s].y
    let punkt=suppixel?new Float64Array(ele.length):new Int32Array(ele.length)
    //sonne punkte bei minimal 0 punkte
    // 1 in mitte
    //4 in ecken
    //usw
    let menum
    //if(shadowlimmiter||me.static||sunnlineofsight)menum=[0,...[me,...(typeof(me.shadowadd)!="undefined"?me.shadowadd:[])].map(m=>colobjarr.findIndex(i=>i==m)+1)]
    //untere solte aktuel sein weil ja jetzt spieler rausgefiltert werden solten
    if(shadowlimmiter||me.static||sunnlineofsight)menum=[0,...[me,...(typeof(me.shadowadd)!="undefined"?me.shadowadd:[])].map(m=>colobjarr.findIndex(i=>i==m))]

    me.shadow[s]=[]

    for (let sunn0=mySun[loadmap][s].x;sunn0<mySun[loadmap][s].x+mySun[loadmap][s].w;sunn0+=Math.sqrt(mySun[loadmap][s].w*mySun[loadmap][s].h)*(1-(me.static?shadowstaticqualli:shadowqualli))) {
        for (let sunn1=mySun[loadmap][s].y;sunn1<mySun[loadmap][s].y+mySun[loadmap][s].h;sunn1+=Math.sqrt(mySun[loadmap][s].w*mySun[loadmap][s].h)*(1-(me.static?shadowstaticqualli:shadowqualli))) {
            let ignore=new Set()
            for (let i=0;i<ele.length;i+=2) {
                const winkel=Math.atan2(ele[i+1]-sunn1,ele[i]-sunn0)
                if(sunnlineofsight){
                    let tempx=ele[i]
                    let tempy=ele[i+1]
                    while(true){
                        tempx-=Math.cos(winkel)
                        tempy-=Math.sin(winkel)
                        if(!menum.includes(objcolmap[Math.trunc(tempy-miny)*(maxx-minx)+Math.trunc(tempx-minx)])){ignore.add(i);break}
                        if(Math.abs(tempx-sunn0)<1&&Math.abs(tempy-sunn1)<1)break
                    }
                }
                //teste ob obj kante dahinter schatten erscheint
                if(me.static&&
                   ele[i+1]-Math.sign(Math.round(Math.sin(winkel)*100)/100)>=miny&&
                   ele[i+1]-Math.sign(Math.round(Math.sin(winkel)*100)/100)<=maxy&&
                   ele[i]-Math.sign(Math.round(Math.cos(winkel)*100)/100)>=minx&&
                   ele[i]-Math.sign(Math.round(Math.cos(winkel)*100)/100)<=maxx&&
                   colmap[Math.trunc(ele[i+1]-Math.sign(Math.round(Math.sin(winkel)*100)/100)-miny)*(maxx-minx)+Math.trunc(ele[i]-Math.sign(Math.round(Math.cos(winkel)*100)/100)-minx)]>0){ignore.add(i);continue}
                   //achtung bei bewegen von obj den durch nicht gleiche cordinaten(in echt und in colmap) könnte berechnung falsch sein
                if(shadowlimmiter||me.static){
                    const obj=Math.trunc(ele[i+1]-miny)*(maxx-minx)+Math.trunc(ele[i])-minx
                    let x=0
                    let y=0
                    let iloop=0
                    while(true){
                        iloop++
                        x+=Math.cos(winkel)
                        y+=Math.sin(winkel)
                        let testnum=obj+(Math.trunc(y)*(maxx-minx))+Math.trunc(x)
                        if(testnum<=0||testnum>=(maxx-minx)*(maxy-miny)){
                            punkt[i]=ele[i]+x-firstx
                            punkt[i+1]=ele[i+1]+y-firsty
                            break
                        }
                        let test=objcolmap[testnum]
                        if(iloop>maxshadow){
                            ignore.add(i)
                            break
                        }
                        if(!menum.includes(test)){
                            punkt[i]=ele[i]+x-firstx
                            punkt[i+1]=ele[i+1]+y-firsty
                            break
                        }
                    }
                }else{
                    let dist=Math.min(Math.abs((ele[i]-(Math.cos(winkel)>0?maxx:0)-(Math.cos(winkel)<0?minx:0))/Math.cos(winkel)),Math.abs((ele[i+1]-(Math.sin(winkel)>0?maxy:0)-(Math.sin(winkel)<0?miny:0))/Math.sin(winkel)))
                    if(dist>maxshadow)ignore.add(i)
                    punkt[i]=ele[i]+dist*Math.cos(winkel)-firstx
                    punkt[i+1]=ele[i+1]+dist*Math.sin(winkel)-firsty
                }
            }
            for (let i=0;i<ele.length;i+=2) {
                if(ignore.has(i))continue
                for (let i1=0;i1<ele.length;i1+=2) {
                if(i==i1||ignore.has(i1))continue
                    let backi=i
                    //disable schatten die net aus obj gehen
                    //als typed array
                    let counti=[]
                    let bigger=((i-i1)<0?ele.length+(i-i1):(i-i1))<((i1-i)<0?ele.length+(i1-i):(i1-i))
                    do{
                        if(suppixel){
                            counti.push(ele[backi]-firstx,ele[backi+1]-firsty)
                        }else{
                            counti.push(Math.trunc(ele[backi]-firstx),Math.trunc(ele[backi+1]-firsty))
                        }
                        if(bigger==false){
                            backi=((backi-2)<0)?ele.length-2:backi-2
                        }else{
                            backi=((backi+2)>=ele.length-1)?0:backi+2
                            //backi=(backi+2)%(ele.length)
                            //console.log(backi)
                        }
                    }while(backi!=i1)
                    if(suppixel){
                        me.shadow[s].push(new Float64Array([+
                            ele[i1]-firstx,ele[i1+1]-firsty,
                            punkt[i1],punkt[i1+1],
                            punkt[i],punkt[i+1],
                            ...counti
                        ]))
                    }else{
                        me.shadow[s].push(new Int32Array([+
                            ele[i1]-firstx,ele[i1+1]-firsty,
                            punkt[i1],punkt[i1+1],
                            punkt[i],punkt[i+1],
                            ...counti
                        ]))
                    }

                }
            }
        }
    }
}
function playertexturani(me){
    if(typeof(me.animation)!="object")return
    let obj=Object.keys(me.animation).filter(i=>i.includes("fillpic")&&typeof(me.animation[i])=="object")
    let trigger=[]
    for(let i in obj){
        trigger[i]=me.animation[obj[i]].trigger
    }
    function mostimportant(i0,i1){
        if(i0[1]>i1[1])return 1
        if(i0[1]<i1[1])return -1
        return 0
    }
    let mostimpactiv=trigger.filter(i=>i[0]).sort(mostimportant)
    let notactiv=trigger.filter(i=>i[0]==false)
    for(let i in notactiv){
        notactiv[i][2].aniframe=0
    }
    if(mostimpactiv.length==0&&me.animation.reset!=null){
        me.fill=me.animation.reset
        me.animation.reset=null
    }
    if(mostimpactiv.length>0&&me.animation.reset==null){
        me.animation.reset=me.fill
    }
    if(mostimpactiv.length>0){
        let highest=mostimpactiv[mostimpactiv.length-1]
        let keys1=[...highest[2].pic.keys()]
        let num=keys1.filter(i=>i<=highest[2].aniframe&&highest[2].pic.get(i).length==2)
        if(num.length>0)me.fill=highest[2].pic.get(num[num.length-1])[1]
        if(highest[2].mode=="stop"){
            if(keys1[keys1.length-1]>=highest[2].aniframe)highest[2].aniframe+=60/fps
        }
        if(highest[2].mode=="loopjump"){
            if(keys1[keys1.length-1]>=highest[2].aniframe){
                highest[2].aniframe+=60/fps
            }else{
                highest[2].aniframe=0
            }
        }
        if(highest[2].mode=="loopback"){
            if(keys1[keys1.length-1]<highest[2].aniframe)highest[2].dir=-1
            if(keys1[0]>highest[2].aniframe)highest[2].dir=1
            highest[2].aniframe+=(60/fps)*highest[2].dir
        }
    }
}
async function Wasserpsy(x=0,y=0,me,w,h){
    let left=new Float64Array(w)
    let right=new Float64Array(w)
    while(me.wasserfps>=1){
        me.wasserfps--
        for(let i=0;i<w;i++){
	    	me.wasserphysa[0][i]+=me.tension*(me.TargetHeight-me.wasserphysa[1][i])-me.wasserphysa[0][i]*me.dampening
	    	me.wasserphysa[1][i]+=me.wasserphysa[0][i]//fps unabhänig machen
        }
        for(let times=0;times<=me.j;times++){
            for(let i=0;i<w;i++){
                if(0<i){
                    me.wasserphysa[1][i-1]+=me.Spread*(me.wasserphysa[0][i]-me.wasserphysa[0][i-1])
                    left[i]=me.Spread*(me.wasserphysa[0][i]-me.wasserphysa[0][i-1])
                }
                if(i<w-1){
                    me.wasserphysa[1][i+1]+=me.Spread*(me.wasserphysa[0][i]-me.wasserphysa[0][i+1])
                    right[i]=me.Spread*(me.wasserphysa[0][i]-me.wasserphysa[0][i+1])
                }
            }
            for(let i=0;i<w;i++){
                if(0<i)me.wasserphysa[0][i-1]+=left[i]
                if(i<w-1)me.wasserphysa[0][i+1]+=right[i]
            }
        }
    }
    Wasserpic(x,y,me,w,h)
    //interpolation
}
async function Wasserpic(x,y,me,w,h) {
    let buf = new ArrayBuffer(w*h*4);
    let data = new Uint32Array(buf);
    for (let i=0;i<w;i++) {
        for(let i1=Math.trunc(me.down-me.schaum+me.wasserphysa[0][i]);i1<Math.trunc(me.down+me.wasserphysa[0][i]);i1++)data[i+i1*w]=me.wassertexturschaum
        for(let i1=Math.trunc(me.down+me.wasserphysa[0][i]);i1<=h;i1++)data[i+i1*w]=me.wassertexturwasser
    }
    if(typeof(x)=="object"){
        let canvas1=new OffscreenCanvas(w,h)
        let context1=canvas1.getContext("2d");
        let path=new Path2D()
        const offsx=Math.min(...x)
        const offsy=Math.min(...y)
        path.moveTo(x[0]-offsx,y[0]-offsy)
        for (let i=1;i<x.length;i++)path.lineTo(x[i]-offsx,y[i]-offsy)
        for (let i=0;i<w*h;i++)if(!context1.isPointInPath(path,i%w, i/w)){data[i]=0}
    }
    //rgba beachten also endian
    me.fill.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(buf),w,h),0,0)
}
//https://codepen.io/ge1doot/pres/zGywYw
function inverse_kinematic(me){
    for(let i in me.bones){
        if (me.bones[i].phy==false)continue
        let bone=me.bones[i]
        let bonseg0=bone[Object.keys(bone).filter(i1=>i1.includes("segment")&&bone[i1].phy==true)[0]]
        let bonseg1=bonseg0.next
        let originx=bonseg0.origin.x
        let originy=bonseg0.origin.y
        let angle,theta1;
        let ix=originx-bone.pointer.x
        let iy=originy-bone.pointer.y
        let move=0
        let wink=Math.atan2(originy-bone.pointer.y,originx-bone.pointer.x)*(180/Math.PI)
        let richtung=(Math.abs(wink-0)<45||Math.abs(wink-180)<45)?0:1
        schleife:while(me.falldist<10){
            ix=0
            iy=0

            let winkel=Math.atan2(originy-(bone.pointer.y+(richtung?0:move)),originx-(bone.pointer.x+(richtung?move:0)))
            for(let it=0,i1=Math.trunc(originy-miny)*(maxx-minx)+Math.trunc(originx)-minx;it<=bonseg0.len+bonseg1.len;it++,ix-=Math.cos(winkel),iy-=Math.sin(winkel))if(objcolmap[i1+Math.round(iy)*(maxx-minx)+Math.round(ix)]>1){break schleife}
            if(move>=0)move++
            if(Math.abs(move)>bone.fussklippe){ix=(richtung?0:bone.fussklippe);iy=(richtung?bone.fussklippe:0);bone.wait=true;break}
            move*=-1
        }

        if(debug)debugtext+="\nbonewinkel"+i+" "+wink+"°"+
                            "\nbonewinkel"+i+" "+wink/(180/Math.PI)+
                            "\nrichtung"+i+" "+richtung+
                            "\nmove"+i+" "+move+
                            "\nix"+i+" "+ix+
                            "\niy"+i+" "+iy+
                            "\ndir "+me.dir

        bone.bewegung+=Math.abs(me.velo[0])
        if(me.inwater&&me.falldist>10){
            iy-=Math.max(Math.sin((Math.PI)*(Math.max(bone.bewegung,0)/5)),0)*4
        }else{
            if(bone.wait==false&&Math.abs(me.velo[0])<0.1){
                if(bone.bewegung<1){
                    bone.bewegung=i%2?-6:-1
                    bone.wait=true
                }else{
                    bone.bewegung+=bone.bewegung<2?-0.9:0.9
                }
            }else if(bone.bewegung>0){
                bone.wait=false  
            }else{
                if(me.distd[me.rich4arr[2]].length==3&&me.distd[me.rich4arr[2]].every((i1)=>i1==me.distd[me.rich4arr[2]][0]))iy=50*Math.sign(iy)//nur wen boden gerade
            }
            if(bone.bewegung>10)bone.bewegung%=10
            if(bone.wait==false&&me.falldist<4){
                iy-=Math.max(Math.sin((Math.PI)*(Math.max(bone.bewegung,0)/5)),0)*4
                ix+=5-Math.abs(Math.max(bone.bewegung,0)-5)
            }
        }

        let targetSqrDist=Math.abs(ix)*Math.abs(ix)+Math.abs(iy)*Math.abs(iy);
        angle = Math.max(-1, Math.min( 1, 
            (targetSqrDist + bonseg0.len2 - bonseg1.len2) / (2 * bonseg0.len * Math.sqrt(targetSqrDist))
        ));
        theta1 = Math.atan2(Math.abs(iy), Math.abs(ix)) - Math.acos(angle);
        bonseg0.x = originx + bonseg0.len * Math.cos(theta1)*me.dir*(me.inwater?-1:1);
        bonseg0.y = originy + bonseg0.len * Math.sin(theta1);


        angle = Math.max(-1, Math.min( 1, 
            (targetSqrDist - bonseg0.len2 - bonseg1.len2) / (2 * bonseg0.len * bonseg1.len)
        )); 
        let theta2 = Math.acos(angle);
        bonseg1.x = bonseg0.x + bonseg1.len * Math.cos(theta2 + theta1)*me.dir*(me.inwater?-1:1);
        bonseg1.y = bonseg0.y + bonseg1.len * Math.sin(theta2 + theta1);
    }
}
function wassercolide(me,me1){
    if (collide(me,me1)){
        if(me1.wasserphycollision&&wasserphycollision){
            const offsx=typeof(me1.x)=="object"?Math.min(...me1.x):me1.x
            const offsy=typeof(me1.x)=="object"?Math.min(...me1.y):me1.y
            let heightunderplayer=0
            let counter=0
            for(let i1=Math.trunc(me.x-offsx);i1<Math.trunc(me.x+me.w-offsx);i1++){
                if(i1<0)continue
                if(i1>me1.w)continue
                heightunderplayer+=me1.wasserphysa[0][i1]
                counter++
            }
            heightunderplayer=offsy+me1.down+(heightunderplayer/counter)

            if(me.y+me.h<heightunderplayer)return
            me.inwater=true

            if(me.y+me.h-heightunderplayer<10&&me1.wasserphyplayerwave&&wasserphyplayerwave){
                for(let i1=Math.trunc(Math.max(me.x-offsx,0));i1<Math.trunc(Math.min(me.x+me.w-offsx,me1.w));i1++){
                    me1.wasserphysa[1][i1]+=me.velo[1]*100
                    if(i1+1<me1.w&&i1-1>0){
                        me1.wasserphysa[1][i1-1]+=me.velo[0]*100
                        me1.wasserphysa[1][i1+1]-=me.velo[0]*100
                    }
                }
            }
        }else{
            me.inwater=true
        }
    }
}
function pani(ro,wx,wy,me){
    stopmain=false
    let paniv=true,timeo1pani=0
    setTimeout(()=>{paniv=false,stopmain=true;me.x=wx;me.y=wy;window.requestAnimationFrame(ani.bind(this,me,false));if(renderer==0)renderbackground=true},200)
    function ani1pani(time1pani){
        const fps1=Math.max(1/((time1pani-timeo1pani)/1e3),10)
        if(promall[3].res)for (let s in mySun[loadmap])shadow(s,me)
        switch (ro) {
            case 0:
                me.y-=(60/fps1)
            break;
            case 1:
                me.x+=(60/fps1)
            break;
            case 2:
                me.y+=(60/fps1)
            break;
            case 3:
                me.x-=(60/fps1)
            break;
        }
        repaint(rofx,rofy)
        timeo1pani=time1pani
        if (paniv)window.requestAnimationFrame(ani1pani)
    }
    window.requestAnimationFrame(ani1pani)
}
promallres[3]()