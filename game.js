'use strict';
function ani(me,start,time){
    if(start==false)instandzoom=false
    if (keys.getkeyovermin(27)){stopmain=false;debug=false;mvis()}//das in event rein
    if(enableaudio){
        if(listener.positionX){
            listener.positionX.value = Math.trunc(me.x+me.w/2);
            listener.positionY.value = Math.trunc(me.y+me.h/2);
        }else{
            listener.setPosition(Math.trunc(me.x+me.w/2),Math.trunc(me.y+me.h/2),0);
        }
    }
    //if(gp)checkgamepad()
    fps=Math.max(1/((time-timeo)/1e3),1)
    //fpsav=fpsav*(fpsav<=fps?0.96:0.9)+fps*(fpsav<=fps?0.04:0.1)
    //fpsav=fpsav*(fpsav<=fps+5?0.99:0.9)+fps*(fpsav<=fps+5?0.01:0.1)
    fpsav=fpsav*fpsanpassung+fps*(1-fpsanpassung)
    //camera

    if(mousex!==null||mousey!==null){
        rofx-=Math.max(menuboarder-mousex,0)
        rofx+=Math.max(menuboarder-(canvas.width*zoomn-mousex),0)
        rofy-=Math.max(menuboarder-mousey,0)
        rofy+=Math.max(menuboarder-(canvas.width*zoomn-mousey),0)
    }


    if((me.x+me.w/2)/zoomn>=rofx+canvas.width*0.9)rofx+=((me.x+me.w/2)/zoomn-rofx-canvas.width*0.85)/(instandzoom?15:1)
    if((me.x+me.w/2)/zoomn<=rofx+canvas.width*0.1)rofx+=((me.x+me.w/2)/zoomn-rofx-canvas.width*0.15)/(instandzoom?15:1)

    if((me.y+me.h/2)/zoomn>=rofy+canvas.height*0.8)rofy+=((me.y+me.h/2)/zoomn-rofy-canvas.height*0.7)/(instandzoom?80:1)
    if((me.y+me.h/2)/zoomn<=rofy+canvas.height*0.1)rofy+=(-(me.y+me.h/2)/zoomn-rofy-canvas.height*0.6)/(instandzoom?80:1)


    ////wen bild sichtbar kleiner ist als map dan mach an wand cam collision
    if(canvas.width*zoomn<Math.abs(maxx-minx)){rofx=Math.min(Math.max(rofx,minx),(maxx-canvas.width)/zoomn)}else{rofx=((maxx-minx)/2-(canvas.width*zoomn)/2)/zoomn}
    if(canvas.height*zoomn<Math.abs(maxy-miny)){rofy=Math.min(Math.max(rofy,miny),maxy/zoomn-canvas.height)}else{rofy=((maxy-miny)/2-(canvas.height*zoomn)/2)/zoomn}

    if (promall[2].res&&canfishmap&&needfishmap&&(fishmaptimer-=60/fps)<=0){needfishmap=false;canfishmap=false;fishmaptimer=fishmapreset;pathki(me)}
    if (cancolmap&&((colmaptimer-=60/fps)<=0||needcolmap)&&fps+10>fpsav){needcolmap=false;colmaptimer=colmapreset;collisionmap()}
    //aufpassen das pfals needcolmap true ist das dan colmap vor shattenberechnung fertig sein muss

    if(shadows){
        if(dynamicshadowtime>1.2&&fpsav<=m4xfps-30)shadowqualli=Math.max(shadowqualli-0.00005,0)
        if(dynamicshadowtime<1&&fpsav>m4xfps-0.5&&shadowqualli<1&&shadowqualli<maxshadowlevel)shadowqualli+=shadowqualli>0.9?(1-shadowqualli)/10:0.001
        if((renderer==3||hadrenderbackground)&&staticshadowtime>1.2&&fpsav<=m4xfps-30)shadowstaticqualli=Math.max(shadowstaticqualli-0.01,0)
        if((renderer==3||hadrenderbackground)&&staticshadowtime<1&&fpsav>m4xfps-1&&shadowstaticqualli<1&&shadowstaticqualli<maxstaticshadowlevel)shadowstaticqualli+=shadowstaticqualli>0.9?   (1-shadowstaticqualli)/10:0.001
        //die werte sollen von max fps abhänig sein
        if((Math.abs(shadowstaticqualli-oldshadowstaticqualli)>0.1||(shadowstaticqualli==0&&oldshadowstaticqualli!=0))&&cancolmap&&fps+10>fpsav){
            if(toupdateshadow.size==0){
                oldshadowstaticqualli=shadowstaticqualli
                for (let i of myRect[loadmap]){
                    if(!myRect[loadmap].static)continue
                    toupdateshadow.add(i)
                }
            }
        }
    }

    //functionen abschaltung für bessere fps
    if(fpscontroll&&wasserphysik&&wassertime>1000/m4xfps)wasserphysik=false
    if(fpscontroll&&fpsav+30<m4xfps){
        for(let i of fpscontrollarr){if(window[i]==true){window[i]=false;console.log("low fps! disable "+i);fpsav+=20;break}}//net sofort wieder getriggert
    }

    let first=true
    for(let i of myRect[loadmap]){
        if(i.playerphysik)playerphysik(i)
        if(i.environment){environment(i,first);first=false}
    }
    collupdate=false
    if (debug)debugtext+=
        "\ndistd "+me.distd[0]+
        "\ndistd "+me.distd[1]+
        "\ndistd "+me.distd[2]+
        "\ndistd "+me.distd[3]+
        "\nme "+myRect[loadmap].findIndex(i=>i==me)+
        "\nvelox "+me.velo[0].toFixed(3)+
        "\nveloy "+me.velo[1].toFixed(3)+
        "\nx  "+me.x.toFixed(3)+
        "\ny  "+me.y.toFixed(3)+
        "\ndecke "+(typeof(me.umgebung[0][0])=="object"?me.umgebung[0][0].construckarr+(window[me.umgebung[0][0].construckarr][loadmap].findIndex(obf=>obf==me.umgebung[0][0])):"")+
        "\n "+me.umgebung[0][1].toFixed(3)+
        "\nleft "+(typeof(me.umgebung[1][0])=="object"?me.umgebung[1][0].construckarr+(window[me.umgebung[1][0].construckarr][loadmap].findIndex(obf=>obf==me.umgebung[1][0])):"")+
        "\n "+me.umgebung[1][1].toFixed(3)+
        "\nground "+(typeof(me.umgebung[2][0])=="object"?me.umgebung[2][0].construckarr+(window[me.umgebung[2][0].construckarr][loadmap].findIndex(obf=>obf==me.umgebung[2][0])):"")+
        "\n "+me.umgebung[2][1].toFixed(3)+
        "\nright "+(typeof(me.umgebung[3][0])=="object"?me.umgebung[3][0].construckarr+(window[me.umgebung[3][0].construckarr][loadmap].findIndex(obf=>obf==me.umgebung[3][0])):"")+
        "\n "+me.umgebung[3][1].toFixed(3)+
        "\nfps "+fps.toFixed(1)+
        "\nmaxfps "+m4xfps+
        "\nfpsav "+fpsav.toFixed(3)+
        "\nwasserfps "+myRect[loadmap].map(i=>typeof(i.wasserfps)=="number"?"\n "+i.wasserfps.toFixed(3):"").join("")+
        "\nfalldistanz  "+me.falldist.toFixed(3)+
        "\nshadowquali "+shadowqualli.toFixed(3)+
        "\nshadowstaticqualli "+shadowstaticqualli.toFixed(3)+
        "\nshadowrand "+shadowrand+
        "\nshadowstroke "+shadowstroke+
        "\ncanfishmap "+canfishmap+
        "\nstaticshadowtime "+staticshadowtime.toFixed(3)+
        "\ndynamicshadowtime "+dynamicshadowtime.toFixed(3)+
        "\nidletime "+idletime.toFixed(3)+
        "\ncolmaptimer "+colmaptimer.toFixed(3)+
        "\ncolmapreset "+colmapreset+
        "\nfishmaptimer "+fishmaptimer.toFixed(3)+
        "\nfishmapreset "+fishmapreset+
        "\nneedshadow "+toupdateshadow.size+
        "\ndebtextavg "+debtextavg.toFixed(3)+
        "\ndebtextvariation "+debtextvariation.toFixed(3)+
        "\ndebtextlength "+debtextlength.toFixed(3)+
        "\ngravirichtung "+(me.gravirich*(180/Math.PI)).toFixed(0)+"°"+
        "\ngravi0 "+me.graviins[0].toFixed(3)+
        "\ngravi1 "+me.graviins[1].toFixed(3)+
        "\nrich4 "+me.rich4+
        "\nrich2 "+me.rich2+
        "\nrich4arr "+me.rich4arr.join()+
        "\nrich2arr "+me.rich2arr.join()+
        "\nmousex "+mousex+
        "\nmousey "+mousey+
        "\nmousexc "+mousexc+
        "\nmouseyc "+mouseyc+
        "\ntodrawb0 "+todrawb[0].length+
        "\ntodrawb1 "+todrawb[1].length

        
    if(renderer==0)hadrenderbackground=false
    if((oldxcam!=Math.round((rofx+offcamx)*10)/10||oldycam!=Math.round((rofy+offcamy)*10)/10)){
        if(renderer==0)renderbackground=true
    }else{instandzoom=true}
    oldxcam=Math.round((rofx+offcamx)*10)/10
    oldycam=Math.round((rofy+offcamy)*10)/10
    if(shadows){
        let a = performance.now();
        repaint(rofx+offcamx,rofy+offcamy)
        dynamicshadowtime=(dynamicshadowtime*shadowtimeanpassung)+((performance.now()-a)*(1-shadowtimeanpassung))
    }else{
        repaint(rofx+offcamx,rofy+offcamy)
    }
    for(let me1 of myFire[loadmap]){bounce(me1)}
    if(playertexturanimation)texturupdatet=false
    if ('requestIdleCallback' in window) {
        if(idlecallbackactiv==false){idlecallbackactiv=true;window.requestIdleCallback(bored.bind(this,me))}
    }else{
        if(renderbackground&&renderer==0)repaintb(rofx+offcamx,rofy+offcamy)
        if(promall[3].res&&cancolmap&&!needcolmap&&fps+2>fpsav&&fpsav+2>m4xfps){
            for (let i=performance.now()+idletime;i<time+1000/m4xfps&&(toupdateshadow.size>0||(playertexturanimation&&texturupdatet==false));i+=idletime*1.5){
                if(texturupdatet==false&&playertexturanimation){playertexturani(me);texturupdatet=true;continue}
                let a=performance.now()
                let pop=[...toupdateshadow][0]
                toupdateshadow.delete(pop)
                for (let s=0;s<mySun[loadmap].length;s++)shadow(s,pop)
                if(pop.static)renderbackground=true
                idletime=(idletime*idletimeanpassung)+((performance.now()-a)*(1-idletimeanpassung))
            }
        }
    }
    timeo=time
    if (stopmain)window.requestAnimationFrame(ani.bind(this,me,true))
    if(debugcolmap||cleardebugcolmap||debug)debugcol()
}
function bored(me,timetowork){
    if(renderbackground&&fps+10>fpsav&&renderer==0){repaintb(rofx+offcamx,rofy+offcamy,timetowork)}
    if(texturupdatet==false&&playertexturanimation){playertexturani(me);texturupdatet=true}
    while(shadows&&promall[3].res&&timetowork.timeRemaining()>idletime&&toupdateshadow.size>0){
        let a=performance.now()
        let pop=[...toupdateshadow][0]
        toupdateshadow.delete(pop)
        for (let s=0;s<mySun[loadmap].length;s++)shadow(s,pop)
        if(pop.static&&renderer==0)renderbackground=true
        idletime=(idletime*idletimeanpassung)+((performance.now()-a)*(1-idletimeanpassung))
    }
    idlecallbackactiv=false
}
function collide(me,me1){
    if(typeof(me.x)=="number"&&typeof(me1.x)=="number"){
        if (me1.x < me.x + me.w &&
            me1.x + me1.w > me.x &&
            me1.y < me.y + me.h &&
            me1.h + me1.y > me.y){return true}
        return false
    }

    let ele=[]
    if(typeof(me.x)=="object"){
        for (let i=0;i<me.x.length;i++)ele[i]=[me.x[i],me.y[i]]
    }else{
        ele=[
            [me.x,me.y],
            [me.x+me.w,me.y],
            [me.x+me.w,me.y+me.h],
            [me.x,me.y+me.h]]
    }

    let ele1=[]
    if(typeof(me1.x)=="object"){
        for (let i=0;i<me1.x.length;i++)ele1[i]=[me1.x[i],me1.y[i]]
    }else{
        ele1=[
            [me1.x,me1.y],
            [me1.x+me1.w,me1.y],
            [me1.x+me1.w,me1.y+me1.h],
            [me1.x,me1.y+me1.h]]
    }
    let minxs=Infinity
    let minys=Infinity
    let maxxs=-Infinity
    let maxys=-Infinity
    for(let obj of [...ele,...ele1]){
        for(let i in obj){
            if(minxs>obj[i][0])minxs=obj[i][0]
            if(maxxs<obj[i][0])maxxs=obj[i][0]
            if(minys>obj[i][1])minys=obj[i][1]
            if(maxys<obj[i][1])maxys=obj[i][1]
        }
    }
    if(minxs==Infinity)minxs=0
    if(minys==Infinity)minys=0
    if(maxxs==-Infinity)maxxs=1
    if(maxys==-Infinity)maxys=1
    let canvas1=new OffscreenCanvas(maxxs-minxs,maxys-minys)
    let context1=canvas1.getContext("2d");
    context1.fillStyle="#010000"
    context1.beginPath();
    context1.moveTo(ele[0][0]-minxs,ele[0][1]-minys);
    for (let i=1;i<ele.length;i++){context1.lineTo(ele[i][0]-minxs,ele[i][1]-minys)}
    context1.fill()

    context1.beginPath();
    context1.moveTo(ele1[0][0]-minxs,ele1[0][1]-minys);
    for (let i=1;i<ele1.length;i++){context1.lineTo(ele1[i][0]-minxs,ele1[i][1]-minys)}
    context1.fill()

    const t=context1.getImageData(0,0,maxxs-minxs,maxys-minys).data
    for (let i of t){
        if(i==2)return true
    }
    return false
}

function environment(me,first){//noch an gravi anpassen
    //kis solen invirement auch aufruffen können
    if(me!=undefined)me.inwater=false
    if(me!=undefined&&fps+20>fpsav){
        if (me.nokill>0){nokill=true;setTimeout(()=>{nokill=false},me.nokill*1000);me.nokill=0;}

        //feuer
        if(me.statsnum==2&&keys.keytoggle(me.controls.r)){
            new createobj.Feuer(myFire,me.x+Math.sign(me.dir)*me.w,me.y,{winkel:(Math.sign(me.dir)*(Math.PI/2+0.2)+Math.PI/2),owner:me})
            if(renderer==3)updatescene=true
        }
        //block kaput machen
        if (me.umgebung[me.rich4arr[2]][1]<=1&&me.falldist>30&&me.umgebung[me.rich4arr[2]][0].dest&&me.getstats.dest&&me.shift){
            if(shadows)for(let i of me.umgebung[me.rich4arr[2]][0].shadowadd)toupdateshadow.add(i)
            needcolmap=true
            myRect[loadmap].splice(myRect[loadmap].indexOf(me.umgebung[me.rich4arr[2]][0]),1);
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        if (me.umgebung[me.rich4arr[0]][1]<=1&&me.umgebung[me.rich4arr[0]][0].dest&&me.getstats.dest){
            if(shadows)for(let i of me.umgebung[me.rich4arr[0]][0].shadowadd)toupdateshadow.add(i)
            needcolmap=true
            myRect[loadmap].splice(myRect[loadmap].indexOf(me.umgebung[me.rich4arr[0]][0]),1);
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        //sumon ist noch bisle buggy bei andere richtung
        //mach spawn richtung umdrehen
        //mach dir umdrehen
        if (me.falldist>30&&me.shift&&me.umgebung[me.rich4arr[2]][1]<=1&&me.umgebung[me.rich4arr[2]][0].constructor==createobj.Questionblock&&me.getstats.dest){
            if(typeof(me.umgebung[me.rich4arr[2]][0].option[0])!=="undefined"){
                new createobj[me.umgebung[me.rich4arr[2]][0].option[0][0]]((me.umgebung[me.rich4arr[2]][0].option[0].length==3?me.umgebung[me.rich4arr[2]][0].option[0][2]:myRect),me.umgebung[me.rich4arr[2]][0].x+(me.rich2arr[0]*(me.rich2[0]?20:40)), me.umgebung[me.rich4arr[2]][0].y+(me.rich2arr[1]*(me.rich2[1]?20:40)), 20, 20,{dir:me.umgebung[me.rich4arr[2]][0].dir,...me.umgebung[me.rich4arr[2]][0].option[0][1]})
                if(shadows)toupdateshadow.add(myRect[loadmap][myRect[loadmap].length-1])
            }
            if(typeof(me.umgebung[me.rich4arr[2]][0].option[1])!=="undefined"){
                let num=myRect[loadmap].indexOf(me.umgebung[me.rich4arr[2]][0])
                new createobj[me.umgebung[me.rich4arr[2]][0].option[1][0]]([num,myRect],me.umgebung[me.rich4arr[2]][0].x, me.umgebung[me.rich4arr[2]][0].y, me.umgebung[me.rich4arr[2]][0]. w, me.umgebung[me.rich4arr[2]][0].h,{...me.umgebung[me.rich4arr[2]][0].option[1][1]})
                if(shadows)toupdateshadow.add(myRect[loadmap][num])
            }
            needcolmap=true
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        if (me.umgebung[me.rich4arr[0]][1]<=1&&me.umgebung[me.rich4arr[0]][0].constructor==createobj.Questionblock){
            if(typeof(me.umgebung[me.rich4arr[0]][0].option[0])!=="undefined"){
                new createobj[me.umgebung[me.rich4arr[0]][0].option[0][0]]((me.umgebung[me.rich4arr[0]][0].option[0].length==3?me.umgebung[me.rich4arr[0]][0].option[0][2]:myRect),me.umgebung[0][0].x-(me.rich2arr[0]*(me.rich2[0]?20:40)), me.umgebung[0][0].y-(me.rich2arr[1]*(me.rich2[1]?20:40)), 20, 20, {dir:me.umgebung[me.rich4arr[0]][0].dir,...me.umgebung[me.rich4arr[0]][0].option[0][1]})
                if(shadows)toupdateshadow.add(myRect[loadmap][myRect.length-1])
            }
            if(typeof(me.umgebung[me.rich4arr[0]][0].option[1])!=="undefined"){
                let num=myRect[loadmap].indexOf(me.umgebung[me.rich4arr[0]][0])
                new createobj[me.umgebung[me.rich4arr[0]][0].option[1][0]]([num,myRect],me.umgebung[me.rich4arr[0]][0].x, me.umgebung[me.rich4arr[0]][0].y, me.umgebung[me.rich4arr[0]][0]. w, me.umgebung[me.rich4arr[0]][0].h, {...me.umgebung[me.rich4arr[0]][0].option[1][1]})
                if(shadows)toupdateshadow.add(myRect[loadmap][num])
            }
            needcolmap=true
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
    }

    for (let i=0;i<myRect[loadmap].length;i++) {
        let me1=myRect[loadmap][i]
        //if(me1==me)continue
        if(typeof(me1.environment)!=undefined&&me1.environment)continue
        const offsx=typeof(me1.x)=="object"?Math.min(...me1.x):me1.x
        const offsy=typeof(me1.x)=="object"?Math.min(...me1.y):me1.y

        //kucke ob obj sichtbar ist
        if(!(rofx*zoomn-20<offsx+me1.w&&
        offsx/zoomn<rofx+canvas.width+20&&
        rofy*zoomn-20<offsy+me1.h&&
        offsy/zoomn<rofy+canvas.height+20)){continue}
        //console.log(me1)


        //anmimnation
        if(promall[2].res&&Object.getOwnPropertyNames(aiobj).includes(me1.type))aiobj[me1.type](me,me1,first)

        //feuer coll mit obj
        if(typeof(me1.damage)!="undefined"&&promall[1].res&&typeof(me1.damage.fire)!="undefined"){
            for(let me2 of myFire[loadmap]){
                if(collide(me1,me2)){
                    me1.damage.fire(me2)
                    myFire[loadmap].splice(myFire[loadmap].indexOf(me2),1)
                    if(renderer==3)updatescene=true
                    if(renderer==0)renderbackground=true
                }
            }
        }

        //spieler coll mit obj
        if(typeof(me1.damage)!="undefined"&&promall[1].res&&collide(me,me1)){
            if(me.falldist>=5&&typeof(me1.damage.jump)!="undefined"){
                me1.damage.jump(me,nokill)
            }else if(typeof(me1.damage.collide)!="undefined"){
                me1.damage.collide(me,nokill)
            }
        }
    }
}


function playerphysik(me){
    if(tp&&mousex!=null&&mousey!=null){
        me.x=mousex
        me.y=mousey
    }
    if(newstart){
        newstart=false
        me.x=me.dx
        me.y=me.dy
    }
    if(lastwaypoint){
        lastwaypoint=false
        me.x=me.sx
        me.y=me.sy
    }
    if(tptofinish){
        tptofinish=false
        let nextfinish=myRect[loadmap].filter(i=>i.construck=="Finish").sort((i,i1)=>{
            Math.sqrt(Math.pow((i.x+i.w/2)-(me.x+me.w/2),2)+Math.pow((i.y+i.h/2)-(me.y+me.h/2),2))>Math.sqrt(Math.pow((i1.x+i1.w/2)-(me.x+me.w/2),2)+Math.pow((i1.y+i1.h/2)-(me.y+me.h/2),2))?0:1
        })
        const tpxrange=me.rich2arr[0]==0?20+me.w:0
        const tpyrange=me.rich2arr[0]==0?0:20+me.h
        const tpxrangem=me.rich2arr[0]==0?20:0
        const tpyrangem=me.rich2arr[0]==0?0:20
        const msx=me.rich2arr[0]==0
        const msy=me.rich2arr[0]==1

        //nf.x
        //nf.x+nf.w
        br:for (let nf of nextfinish){
            for (let numx=6,tpx=numx>0?nf.x+nf.w+(msx?numx:-numx-me.w+1):nf.x+(msx?numx-me.w:-numx-1);Math.abs(numx)<(msx?20:nf.w/2);numx=(numx>0?-numx:-numx+1),tpx=numx>0?nf.x+nf.w+(msx?numx:-numx-me.w+1):nf.x+(msx?numx-me.w:-numx-1)){
                for (let numy=1,tpy=numy>0?nf.y+nf.h+(msy?numy:-numy-me.h+1):nf.y+(msy?numy-me.h:-numy-1);Math.abs(numy)<(msy?20:nf.h/2);numy=(numy>0?-numy:-numy+1),tpy=numy>0?nf.y+nf.h+(msy?numy:-numy-me.h+1):nf.y+(msy?numy-me.h:-numy-1)){//hir werte anpassen
                    //console.log(tpx+" "+tpy)
                    if(tpx<minx||maxx<tpx+me.w||tpy<miny||maxy<tpy+me.h)continue
                    let col=false
                    console.log("tpx "+tpx+"\ntpy "+tpy)
                    for(let tppx=0;tppx<me.w;tppx++)for(let tppy=0;tppy<me.h;tppy++)if(objcolmap[(tpy+tppy-miny)*(maxx-minx)+(tpx+tppx-minx)]!=0)col=true
                    if(col==false){
                        let ground=false
                        if(me.rich2arr[0]==0){
                            if(me.rich2[0]==1){
                                for(let tpygroundr=me.h;tpygroundr<10+me.h;tpygroundr++)for(let tpxgroundr=0;tpxgroundr<me.w;tpxgroundr++)if(objcolmap[(tpy+tpygroundr-miny)*(maxx-minx)+(tpx+tpxgroundr-minx)]!=0)ground=true
                            }
                            if(me.rich2[0]==-1){
                                for(let tpygroundr=0;tpygroundr<10;tpygroundr++)for(let tpxgroundr=0;tpxgroundr<me.w;tpxgroundr++)if(objcolmap[(tpy-tpygroundr-miny)*(maxx-minx)+(tpx+tpxgroundr-minx)]!=0)ground=true
                            }
                        }
                        if(me.rich2arr[1]==0){
                            if(me.rich2[1]==1){
                                for(let tpygroundr=0;tpygroundr<me.h;tpygroundr++)for(let tpxgroundr=0;tpxgroundr<10;tpxgroundr++)if(objcolmap[(tpy+tpygroundr-miny)*(maxx-minx)+(tpx-tpxgroundr-minx)]!=0)ground=true
                            }
                            if(me.rich2[1]==-1){
                                for(let tpygroundr=0;tpygroundr<me.h;tpygroundr++)for(let tpxgroundr=me.w;tpxgroundr<10+me.w;tpxgroundr++)if(objcolmap[(tpy+tpygroundr-miny)*(maxx-minx)+(tpx+tpxgroundr-minx)]!=0)ground=true
                            }
                        }
                        if(ground){
                            me.x=tpx
                            me.y=tpy
                            break br
                        }
                    }
                }
            }
        }
    }
    if(clearenemy){
    }
    if(inflive){
        me.dmg=100
    }

    //shift graviabhänig
    me.shift=keys.getkeyovermin(me.controls.s)?true:false
    let shiftchanged=false
    if(me.rich4==0){
        if (!me.shift&&me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater|0][0][me.statsnum].h-me.h)me.shift=true
        if (!me.shift&&me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater|0][0][me.statsnum].w-me.w)me.shift=true
        if(me.h!=me.getstats.h||me.w!=me.getstats.w){
            shiftchanged=true
            me.x-=me.w-me.getstats.w
            me.y+=me.h-me.getstats.h
            me.w=me.getstats.w
            me.h=me.getstats.h
        }
    }else if(me.rich4==1){
        if (!me.shift&&me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater|0][0][me.statsnum].w-me.h)me.shift=true
        if (!me.shift&&me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater|0][0][me.statsnum].h-me.w)me.shift=true
        if(me.h!=me.getstats.w||me.w!=me.getstats.h){
            shiftchanged=true
            me.w=me.getstats.h
            me.h=me.getstats.w
        }
    }else if(me.rich4==2){
        if (!me.shift&&me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater|0][0][me.statsnum].h-me.h)me.shift=true
        if (!me.shift&&me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater|0][0][me.statsnum].w-me.w)me.shift=true
        if(me.h!=me.getstats.h||me.w!=me.getstats.w){
            shiftchanged=true
            me.w=me.getstats.w
            me.h=me.getstats.h
        }
    }else if(me.rich4==3){
        if (!me.shift&&me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater|0][0][me.statsnum].w-me.h)me.shift=true
        if (!me.shift&&me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater|0][0][me.statsnum].h-me.w)me.shift=true
        if(me.h!=me.getstats.w||me.w!=me.getstats.h){
            shiftchanged=true
            me.x+=me.w-me.getstats.h
            me.y-=me.h-me.getstats.w
            me.w=me.getstats.h
            me.h=me.getstats.w
        }
    }

    me.disto=[[],[],[],[]]
    me.distd=[[],[],[],[]]
    const kuck=Math.max(maxdistcol,Math.abs(me.velo[1])+10,Math.abs(me.velo[0])+10)-(fps+10>fpsav?0:10)
    for(let i=0,i1=Math.trunc(me.y-miny)*(maxx-minx)+Math.trunc(me.x+1)-minx;i<kuck;i++,i1-=maxx-minx)if(objcolmap[i1]>0){me.distd[0].push(i);me.disto[0].push(colobjarr[objcolmap[i1]-1]);break}
    for(let i=0,i1=Math.trunc(me.y-miny)*(maxx-minx)+Math.trunc(me.x+me.w/2)-minx;i<kuck;i++,i1-=maxx-minx)if(objcolmap[i1]>0){me.distd[0].push(i);me.disto[0].push(colobjarr[objcolmap[i1]-1]);break}
    for(let i=0,i1=Math.trunc(me.y-miny)*(maxx-minx)+Math.trunc(me.x+me.w-1)-minx;i<kuck;i++,i1-=maxx-minx)if(objcolmap[i1]>0){me.distd[0].push(i);me.disto[0].push(colobjarr[objcolmap[i1]-1]);break}



    for(let i=0,i1=Math.trunc(me.y+1-miny)*(maxx-minx)+Math.trunc(me.x+1)-minx;i<kuck;i++)if(objcolmap[i1-i]>0){me.distd[1].push(i);me.disto[1].push(colobjarr[objcolmap[i1-i]-1]);break}
    for(let i=0,i1=Math.trunc(me.y+me.h/2-miny)*(maxx-minx)+Math.trunc(me.x+1)-minx;i<kuck;i++)if(objcolmap[i1-i]>0){me.distd[1].push(i);me.disto[1].push(colobjarr[objcolmap[i1-i]-1]);break}
    for(let i=0,i1=Math.trunc(me.y+me.h-1-miny)*(maxx-minx)+Math.trunc(me.x+1)-minx;i<kuck;i++)if(objcolmap[i1-i]>0){me.distd[1].push(i);me.disto[1].push(colobjarr[objcolmap[i1-i]-1]);break}


    for(let i=0,i1=Math.trunc(me.y+me.h-1-miny)*(maxx-minx)+Math.trunc(me.x+me.w-1)-minx;i<kuck;i++,i1+=maxx-minx)if(objcolmap[i1]>0){me.distd[2].push(i);me.disto[2].push(colobjarr[objcolmap[i1]-1]);break}
    for(let i=0,i1=Math.trunc(me.y+me.h-1-miny)*(maxx-minx)+Math.trunc(me.x+me.w/2)-minx;i<kuck;i++,i1+=maxx-minx)if(objcolmap[i1]>0){me.distd[2].push(i);me.disto[2].push(colobjarr[objcolmap[i1]-1]);break}
    for(let i=0,i1=Math.trunc(me.y+me.h-1-miny)*(maxx-minx)+Math.trunc(me.x+1)-minx;i<kuck;i++,i1+=maxx-minx)if(objcolmap[i1]>0){me.distd[2].push(i);me.disto[2].push(colobjarr[objcolmap[i1]-1]);break}


    for(let i=0,i1=Math.trunc(me.y+1-miny)*(maxx-minx)+Math.trunc(me.x+me.w-1)-minx;i<kuck;i++)if(objcolmap[i1+i]>0){me.distd[3].push(i);me.disto[3].push(colobjarr[objcolmap[i1+i]-1]);break}
    for(let i=0,i1=Math.trunc(me.y+me.h/2-miny)*(maxx-minx)+Math.trunc(me.x+me.w-1)-minx;i<kuck;i++)if(objcolmap[i1+i]>0){me.distd[3].push(i);me.disto[3].push(colobjarr[objcolmap[i1+i]-1]);break}
    for(let i=0,i1=Math.trunc(me.y+me.h-1-miny)*(maxx-minx)+Math.trunc(me.x+me.w-1)-minx;i<kuck;i++)if(objcolmap[i1+i]>0){me.distd[3].push(i);me.disto[3].push(colobjarr[objcolmap[i1+i]-1]);break}


    me.umgebung[0][0]=me.distd[0].length==0?0:me.disto[0][me.distd[0].findIndex(i1=>i1==Math.min(...me.distd[0]))]
    me.umgebung[1][0]=me.distd[1].length==0?0:me.disto[1][me.distd[1].findIndex(i1=>i1==Math.min(...me.distd[1]))]
    me.umgebung[2][0]=me.distd[2].length==0?0:me.disto[2][me.distd[2].findIndex(i1=>i1==Math.min(...me.distd[2]))]
    me.umgebung[3][0]=me.distd[3].length==0?0:me.disto[3][me.distd[3].findIndex(i1=>i1==Math.min(...me.distd[3]))]

    me.umgebung[0][1]=Math.trunc(me.y)-(me.distd[0].length==0?0:Math.ceil(Math.max(me.y-Math.min(...me.distd[0]),0)))
    me.umgebung[1][1]=me.distd[1].length==0?-minx+me.x:Math.max(Math.min(...me.distd[1])-1,0)
    me.umgebung[2][1]=maxy-me.y-me.h-(me.distd[2].length==0?0:Math.ceil(Math.max(maxy-me.y-me.h+1-Math.min(...me.distd[2]),0)))
    me.umgebung[3][1]=me.distd[3].length==0?maxx-me.x-me.w:Math.max(Math.min(...me.distd[3])-1,0)

    //if(fps+30>=fpsav){
        me.graviins=[0,0]
        for (let i in myGravi[loadmap]){
            let posx=me.x+me.w/2-myGravi[loadmap][i].x
            posx-=Math.max(0,Math.min(posx,myGravi[loadmap][i].w))
            let posy=me.y+me.h/2-myGravi[loadmap][i].y
            posy-=Math.max(0,Math.min(posy,myGravi[loadmap][i].h))
            if(posx!==0||posy!==0){
                let starke=(myGravi[loadmap][i].stärke/Math.max(myGravi[loadmap][i].abfac*Math.sqrt(Math.pow(posx,2)+Math.pow(posy,2)),0))*(1-me.getstats.gravimulti)
                let winkel=Math.atan2(posy,posx)
                me.graviins[0]+=starke*Math.cos(winkel)
                me.graviins[1]+=starke*Math.sin(winkel)
            }
        }
        me.gravirich=Math.atan2(me.graviins[1],me.graviins[0])
        //histerese einfügen
        const gravrichtemp=me.gravirich*(180/Math.PI)
             if(gravrichtemp>-135&&gravrichtemp<-45){me.rich4=0;me.rich4arr=[0,1,2,3];me.rich2arr=[0,1];me.rich2=[+1,+1]}
        else if(gravrichtemp>-45&&gravrichtemp<45)  {me.rich4=1;me.rich4arr=[3,0,1,2];me.rich2arr=[1,0];me.rich2=[-1,+1]}
        else if(gravrichtemp>45&&gravrichtemp<135)  {me.rich4=2;me.rich4arr=[2,3,0,1];me.rich2arr=[0,1];me.rich2=[-1,-1]}
        else                                        {me.rich4=3;me.rich4arr=[1,0,3,2];me.rich2arr=[1,0];me.rich2=[+1,-1]}
    //}

    if(keys.getkeyovermin(me.controls.w)){
        if (me.falldist>5&&me.umgebung[me.rich4arr[2]][1]>0&&(keys.getkeyovermin(me.controls.a)&&!keys.getkeyovermin(me.controls.d))&&me.umgebung[me.rich4arr[3]][1]<=2){
            me.velo[me.rich2arr[1]]+=me.getstats.wj.y*keys.getmapkey(me.controls.w)*me.rich2[1]
            me.velo[me.rich2arr[0]]-=me.getstats.wj.x*keys.getmapkey(me.controls.a)*me.rich2[0]
        }else if (me.falldist>5&&me.umgebung[2][1]>0&&(keys.getkeyovermin(me.controls.d)&&!keys.getkeyovermin(me.controls.a))&&me.umgebung[1][1]<=2){
            me.velo[me.rich2arr[1]]+=me.getstats.wj.y*keys.getmapkey(me.controls.w)*me.rich2[1]
            me.velo[me.rich2arr[0]]+=me.getstats.wj.x*keys.getmapkey(me.controls.d)*me.rich2[0]
        }else if(me.umgebung[me.rich4arr[2]][1]<=0.1||me.inwater)me.velo[me.rich2arr[1]]+=me.getstats.jh*keys.getmapkey(me.controls.w)*me.rich2[1]
    }


    //console.log(me.velo)
    if(fly){
        me.velo=[0,0]
        if(keys.getkeyovermin(me.controls.w)){me.velo[1]=1}
        if(keys.getkeyovermin(me.controls.s)){me.velo[1]=-1}
        if(keys.getkeyovermin(me.controls.d)){me.velo[0]=1}
        if(keys.getkeyovermin(me.controls.a)){me.velo[0]=-1}
    }else{
        //gravi 
        me.velo[0]-=(Math.trunc(me.graviins[0]*1e8)/1e8)*Math.pow(2,60/fps)//hoffe das das fps gleich macht
        me.velo[1]+=(Math.trunc(me.graviins[1]*1e8)/1e8)*Math.pow(2,60/fps)
    
        //wen r und l kleichzeitig dan stopp
        //if in air dan langsamme
        if(keys.getkeyovermin(me.controls.d)&&keys.getkeyovermin(me.controls.a)){me.velo[me.rich2arr[0]]=0}
        else if (keys.getkeyovermin(me.controls.a)){me.velo[me.rich2arr[0]]-=(me.umgebung[me.rich4arr[2]][1]>0.1?me.getstats.sa:me.getstats.sg)*keys.getmapkey(me.controls.a)*me.rich2[0];me.dir=-1*me.rich2[0]}
        else if (keys.getkeyovermin(me.controls.d)){me.velo[me.rich2arr[0]]+=(me.umgebung[me.rich4arr[2]][1]>0.1?me.getstats.sa:me.getstats.sg)*keys.getmapkey(me.controls.d)*me.rich2[0];me.dir=1*me.rich2[0]}
    }
    //console.log(me.velo)
    //me.velo=[0,0]
    //return
    me.velo[1]+=0.035*(60/fps)
    
    if(me.umgebung[me.rich4arr[2]][1]<=0.01){
        me.falldist=0
    }else{
        me.falldist=Math.max(me.umgebung[me.rich4arr[2]][1],me.falldist)
    }

    //mach kraft in 1 winkel in kraft für anderen winkel umrechnen mit neigung
    const winkel0a=(me.distd[3].length<3&&me.distd[3].filter(i=>i==Infinity).length!=3)||Math.min(...me.distd[3].filter(i=>i!=Infinity))!=Math.max(...me.distd[3].filter(i=>i!=Infinity))
    const winkel1a=(me.distd[1].length<3&&me.distd[1].filter(i=>i==Infinity).length!=3)||Math.min(...me.distd[1].filter(i=>i!=Infinity))!=Math.max(...me.distd[1].filter(i=>i!=Infinity))

    if(debug)debugtext+="\nwin1 "+winkel1a+
                        "\nwin0 "+winkel0a
  
    if(me.umgebung[2][1]<=1&&me.umgebung[3][1]<=1){
        let winkel0=0
        if(winkel0==0&&me.distd[2].length==3)winkel0=Math.min(Math.atan((me.distd[2][0]-me.distd[2][1])/(me.w/2)),0)
        if(winkel0==0&&winkel0a)winkel0=-Math.atan(me.distd[2][0]/Math.min(...me.distd[3]))
        if(me.distd[3].length<3)winkel0=Math.max(-Math.atan(1/(kuck-kuck*(me.distd[3].length/3))),winkel0)
        if(isNaN(winkel0))winkel0=0
        if(debug)debugtext+="\nwinkel0 "+(winkel0*(180/Math.PI)).toFixed(0)+"°"
        if(inversekinematics&&me.dir==1)me.bones[2].segment3.winkel=winkel0
        me.velo=[me.velo[0]*Math.cos(-winkel0)+me.velo[1]*Math.sin(-winkel0),me.velo[1]*Math.cos(-winkel0)+me.velo[0]*Math.sin(-winkel0)]
    }
    if(me.umgebung[2][1]<=1&&me.umgebung[1][1]<=1){
        let winkel1=0
        if(winkel1==0&&me.distd[2].length==3)winkel1=Math.min(Math.atan((me.distd[2][2]-me.distd[2][1])/(me.w/2)),0)
        if(winkel1==0&&winkel1a)winkel1=-Math.atan(me.distd[2][2]/Math.min(...me.distd[1]))
        if(me.distd[1].length<3)winkel1=Math.max(-Math.atan(1/(kuck-kuck*(me.distd[1].length/3))),winkel1)
        if(isNaN(winkel1))winkel1=0
        if(debug)debugtext+="\nwinkel1 "+(winkel1*(180/Math.PI)).toFixed(0)+"°"
        if(inversekinematics&&me.dir==-1)me.bones[2].segment3.winkel=winkel1
        me.velo=[me.velo[0]*Math.cos(winkel1)+me.velo[1]*Math.sin(winkel1),me.velo[1]*Math.cos(winkel1)+me.velo[0]*Math.sin(winkel1)]
    }
    if(me.umgebung[0][1]<=1&&me.umgebung[3][1]<=1){
        let winkel2=0
        if(winkel2==0&&me.distd[0].length==3)winkel2=Math.min(Math.atan((me.distd[0][2]-me.distd[0][1])/(me.w/2)),0)
        if(winkel2==0&&winkel0a)winkel2=-Math.atan(me.distd[0][2]/Math.min(...me.distd[3]))
        if(me.distd[3].length<3)winkel2=Math.max(-Math.atan(1/(kuck-kuck*(me.distd[3].length/3))),winkel2)
        if(isNaN(winkel2))winkel2=0
        if(debug)debugtext+="\nwinkel2 "+(winkel2*(180/Math.PI)).toFixed(0)+"°"
        me.velo=[me.velo[0]*Math.cos(winkel2)+me.velo[1]*Math.sin(winkel2),me.velo[1]*Math.cos(winkel2)+me.velo[0]*Math.sin(winkel2)]
    }
    if(me.umgebung[0][1]<=1&&me.umgebung[1][1]<=1){
        let winkel3=0
        if(winkel3==0&&me.distd[0].length==3)winkel3=Math.min(Math.atan((me.distd[0][0]-me.distd[0][1])/(me.w/2)),0)
        if(winkel3==0&&winkel1a)winkel3=-Math.atan(me.distd[0][0]/Math.min(...me.distd[1]))
        if(me.distd[1].length<3)winkel3=Math.max(-Math.atan(1/(kuck-kuck*(me.distd[1].length/3))),winkel3)
        if(isNaN(winkel3))winkel3=0
        if(debug)debugtext+="\nwinkel3 "+(winkel3*(180/Math.PI)).toFixed(0)+"°"
        me.velo=[me.velo[0]*Math.cos(-winkel3)+me.velo[1]*Math.sin(-winkel3),me.velo[1]*Math.cos(-winkel3)+me.velo[0]*Math.sin(-winkel3)]
    }
    //man solte jetzt eigentlich noch mal distanz berechnen und dan limitiern

    if(debug)debugtext+="\nvelo "+me.velo[0]+
                        "\nvelo "+me.velo[1]

                        
    //long jump (wen nah am boden man schon bisle fall distanz hat und wen man schnell genug ist und man ganz nach rechtz/links will)
    if (me.umgebung[me.rich4arr[2]][1]<=1&&me.falldist>6&&(me.velo[me.rich2arr[0]]>1||me.velo[me.rich2arr[0]]<-1)&&keys.getmapkey(me.controls.w)==1){
        me.velo[me.rich2arr[1]]=me.getstats.lj.y*me.rich2[1];
        me.velo[me.rich2arr[0]]=Math.sign(me.velo[me.rich2arr[0]])*me.getstats.lj.x*me.rich2[0];
    }

    //combiniert
    if(me.umgebung[0][1]<=1&&typeof(me.umgebung[0][0])=="object"&&me.velo[0]!=0&&me.velo[1]!=0){
        me.velo[0]-=Math.sign(me.velo[0])*Math.min(me.umgebung[0][0].reibung*+me.velo[1],Math.abs(me.velo[0]))
        if(Math.abs(me.velo[0])<Math.pow(me.umgebung[0][0].haftreibung*+me.velo[1],60/fps))me.velo[0]=0
    }
    if(me.umgebung[1][1]<=1&&typeof(me.umgebung[1][0])=="object"&&me.velo[1]!=0&&me.velo[0]!=0){
        me.velo[1]-=Math.sign(me.velo[1])*Math.min(me.umgebung[1][0].reibung*+me.velo[0],Math.abs(me.velo[1]))
        if(Math.abs(me.velo[1])<Math.pow(me.umgebung[1][0].haftreibung*+me.velo[0],60/fps))me.velo[1]=0
    }
    if(me.umgebung[2][1]<=1&&typeof(me.umgebung[2][0])=="object"&&me.velo[0]!=0&&me.velo[1]!=0){
        me.velo[0]-=Math.sign(me.velo[0])*Math.min(me.umgebung[2][0].reibung*-me.velo[1],Math.abs(me.velo[0]))
        if(Math.abs(me.velo[0])<Math.pow(me.umgebung[2][0].haftreibung*-me.velo[1],60/fps))me.velo[0]=0
    }
    if(me.umgebung[3][1]<=1&&typeof(me.umgebung[3][0])=="object"&&me.velo[1]!=0&&me.velo[0]!=0){
        me.velo[1]-=Math.sign(me.velo[1])*Math.min(me.umgebung[3][0].reibung*-me.velo[0],Math.abs(me.velo[1]))
        if(Math.abs(me.velo[1])<Math.pow(me.umgebung[3][0].haftreibung*-me.velo[0],60/fps))me.velo[1]=0
    }//fixen
    

    //luft bzw wasser wiederstand
    //me.velo[0]*=Math.pow(1-me.getstats.wiederstand,60/fps)
    //me.velo[1]*=Math.pow(1-me.getstats.wiederstand,60/fps)
    //me.velo[0]*=Math.pow(1-me.getstats.wiederstand,fps/60)
    //me.velo[1]*=Math.pow(1-me.getstats.wiederstand,fps/60)
    
    if(me.velo[0]!=0)me.velo[0]*=Math.pow(1-me.getstats.wiederstand,1)
    if(me.velo[1]!=0)me.velo[1]*=Math.pow(1-me.getstats.wiederstand,1)
    //*/


    if(!nocollision){
        if (me.umgebung[0][1]<=me.velo[1]){
            if(rumble&&me.velo[1]>=1.6){
                keys.vibrate(87,me.velo[1])
            }
            me.velo[1]=Math.min(me.velo[1],me.umgebung[0][1])
        }
        if (me.umgebung[1][1]<=-me.velo[0]){
            if(rumble&&me.velo[0]<=-1.6){
                keys.vibrate(65,-me.velo[0])
            }
            me.velo[0]=Math.max(me.velo[0],-me.umgebung[1][1])
        }
        if (me.umgebung[2][1]<=-me.velo[1]){
            if(rumble&&me.velo[1]<=-1.6){
                keys.vibrate(83,-me.velo[1])
            }
            me.velo[1]=Math.max(me.velo[1],-me.umgebung[2][1])
        }
        if (me.umgebung[3][1]<=me.velo[0]){
            if(rumble&&me.velo[0]>=1.6){
                keys.vibrate(68,me.velo[0])
            }
            me.velo[0]=Math.min(me.velo[0],me.umgebung[3][1])
        }
    }
    //me.x+=Math.min(Math.abs(me.velo[0]),kuck)*(me.velo[0]>=0?1:-1)
    //me.velo[0]+=me.velo[0]-Math.min(Math.abs(me.velo[0]),kuck)*(me.velo[0]>=0?1:-1)
    //me.y-=Math.min(Math.abs(me.velo[1]),kuck)*(me.velo[1]>=0?1:-1)
    //me.velo[1]+=me.velo[1]-Math.min(Math.abs(me.velo[1]),kuck)*(me.velo[1]>=0?1:-1)
    if(Number.isFinite(me.velo[0])){
        me.x+=Math.min(Math.abs(me.velo[0]),kuck)*(me.velo[0]>=0?1:-1);
        me.velo[0]+=me.velo[0]-Math.min(Math.abs(me.velo[0]),kuck)*(me.velo[0]>=0?1:-1)
    }else{
        if(debug){console.log("error velo is not finite number")};
        me.velo[0]=0
    }
    if(Number.isFinite(me.velo[1])){
        me.y-=Math.min(Math.abs(me.velo[1]),kuck)*(me.velo[1]>=0?1:-1);
        me.velo[1]+=me.velo[1]-Math.min(Math.abs(me.velo[1]),kuck)*(me.velo[1]>=0?1:-1)
    }else{
        if(debug){console.log("error velo is not finite number")}
        me.velo[1]=0
    }

    if (shadows&&fps+20>fpsav&&(me.velo[0]!=0||me.velo[1]!=0||shiftchanged)){
        toupdateshadow.add(me)
        me.nomove=0
    }else{
        if(me.nomove==0){
            needcolmap=true
            me.nomove=1
        }
        if(me.nomove==1&&cancolmap&&!needcolmap){
            toupdateshadow.add(me)
            me.nomove=2
        }
    }
    if(inversekinematics&&promall[3].res)inverse_kinematic(me)
}
function winscreen(){
    let but=[]
    but.push(document.createElement("H1"))
    but[but.length-1].textContent="lvl complete"
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent="Start"
    but[but.length-1].onclick=(event)=>{console.log("click");defaultarrload(loadmap);document.querySelectorAll('.preset').forEach((me)=>me.remove());event.target.remove();mvis()}

    for (let i of but){i.className="preset";i.style.zIndex=1}
    for (let i of but)document.body.appendChild(i)
}
promallres[6]()