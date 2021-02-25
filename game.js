'use strict';
function ani(time){
    if (keys.getkeyovermin(27)){
        if(multiplayerstartet&&multiplayer&&!listenforplayer){
            let i1=-1
            for(let i of myRect[loadmap]){if(i.playerphysik){postMessage({act:"player leave",data:{playerid:++i1},id:multiplayerid})}}
        }
        postMessage({act:"player afk",id:multiplayerid})
        stopmain=false
        for(let i of myRect[loadmap])if("worker" in i)i.worker.postMessage({stop:true})

        //make hash to test if maps are the same of old and new map
        let values
        if(Array.prototype.flatMap){//fallback
            values=[...myRect[loadmap].filter(i=>i.static).flatMap((i,i1)=>[i1,i.construck,...i.x,...i.y]),minx,maxx,miny,maxy]
        }else{
            values=[]
            for(let i of [...myRect[loadmap].filter(i=>i.static)]){
                values.push(i.construck,...i.x,...i.y) 
            }
            values.push(minx,maxx,miny,maxy)
            console.log(values)
        }
        digestMessage(values.join()).then(i=>oldhash=i)


        mvis()
    }//das in event rein
    if(noob||noobpic)noobmodus()
    if(enableaudio){
        if(listener.positionX){//camera statt me
            if(soundcam){
                listener.positionX.value = Math.trunc(rofx*zoomn+canvas.width*zoomn/2)
                listener.positionY.value = Math.trunc(rofy*zoomn+canvas.height*zoomn/2)
            }else{
                listener.positionX.value = Math.trunc((anime.minx+anime.w/2)/10)*10;
                listener.positionY.value = Math.trunc((anime.miny+anime.h/2)/10)*10;
            }
        }else{
            if(soundcam){
                listener.setPosition(Math.trunc(rofx*zoomn+canvas.width*zoomn/2),Math.trunc(rofy*zoomn+canvas.height*zoomn/2),0);
            }else{
                listener.setPosition(Math.trunc((anime.minx+anime.w/2)/10)*10,Math.trunc((anime.miny+anime.h/2)/10)*10,0);
            }
        }
    }
    //if(gp)checkgamepad()
    fps=Math.max(1/((time-timeo)/1e3),1)
    if(fps>fpslimit)if(stopmain){window.requestAnimationFrame(ani);return};
    fpsav=fpsav*fpsanpassung+fps*(1-fpsanpassung)
    //if(isNaN(fpsav))fpsav=0//fallback 
    //camera

    if(mousex!==null||mousey!==null){
        rofx-=Math.max(menuboarder-mousex,0)
        rofx+=Math.max(menuboarder-(canvas.width*zoomn-mousex),0)
        rofy-=Math.max(menuboarder-mousey,0)
        rofy+=Math.max(menuboarder-(canvas.width*zoomn-mousey),0)
    }

    if((anime.minx+anime.w/2)/zoomn>=rofx+canvas.width*0.9)rofx+=((anime.minx+anime.w/2)/zoomn-rofx-canvas.width*0.85)/(instandzoom?15:1)
    if((anime.minx+anime.w/2)/zoomn<=rofx+canvas.width*0.1)rofx+=((anime.minx+anime.w/2)/zoomn-rofx-canvas.width*0.15)/(instandzoom?15:1)

    if((anime.miny+anime.h/2)/zoomn>=rofy+canvas.height*0.8)rofy+=((anime.miny+anime.h/2)/zoomn-rofy-canvas.height*0.7)/(instandzoom?80:1)
    if((anime.miny+anime.h/2)/zoomn<=rofy+canvas.height*0.1)rofy+=(-(anime.miny+anime.h/2)/zoomn-rofy-canvas.height*0.6)/(instandzoom?80:1)


    if(camfocusallplayer){//das net immer ausführen
        const players=myRect[loadmap].filter(i1=>i1.construck=="Player"||i1.construck=="Multiplayer"||i1.construck=="Playerki")
            if(players.length>=2){
            minplayerposx=Infinity
            minplayerposy=Infinity
            maxplayerposx=-Infinity
            maxplayerposy=-Infinity
            for(let i of players){
                if(minplayerposx>i.minx)minplayerposx=i.minx
                if(minplayerposy>i.miny)minplayerposy=i.miny
                if(maxplayerposx<i.minx+i.w)maxplayerposx=i.minx+i.w
                if(maxplayerposy<i.miny+i.h)maxplayerposy=i.miny+i.h
            }
            //wen nicht alle obj sichtbar sind zoom rein
            //wen obj zu nah dran ist zoom raus
            //wen alle player in 1er bildschirm hälfte befinden dan zoom rein
            if(canvas.width*zoomn<Math.abs(maxplayerposx-minplayerposx)+20/zoomn||canvas.height*zoomn<Math.abs(maxplayerposy-minplayerposy)+20/zoomn){
                zoom+=0.01
                zoomn=Math.pow(2,zoom)
            }
            if(zoom>0&&(canvas.width*zoomn>Math.abs(maxplayerposx-minplayerposx)+canvas.width*zoomn/2&&canvas.height*zoomn>Math.abs(maxplayerposy-minplayerposy)+canvas.height*zoomn/2)){
                zoom-=0.002
                zoomn=Math.pow(2,zoom)
            }
            rofx=Math.min((minplayerposx-10)/zoomn,rofx)
            rofy=Math.min((minplayerposy-10)/zoomn,rofy)
        }
    }

    ////wen bild sichtbar kleiner ist als map dan mach an wand cam collision
    if(canvas.width*zoomn<Math.abs(maxx-minx)){rofx=Math.min(Math.max(rofx,minx/zoomn),maxx/zoomn-canvas.width)}else{rofx=((maxx-minx)/2-(canvas.width*zoomn)/2)/zoomn}
    if(canvas.height*zoomn<Math.abs(maxy-miny)){rofy=Math.min(Math.max(rofy,miny/zoomn),maxy/zoomn-canvas.height)}else{rofy=((maxy-miny)/2-(canvas.height*zoomn)/2)/zoomn}

    if (promall[2].res&&canfishmap&&needfishmap&&(fishmaptimer-=60/fps)<=0){needfishmap=false;canfishmap=false;fishmaptimer=fishmapreset;pathki(anime)}
    if (cancolmap&&needcolmap&&fps+10>fpsav){
        needcolmap=false;
        collisionmap()
    }
    //aufpassen das pfals needcolmap true ist das dan colmap vor shattenberechnung fertig sein muss

    if(shadows){
        if(dynamicshadowtime>1.2&&fpsav<=m4xfps-30)shadowqualli=Math.max(shadowqualli-0.00005,0)
        if(dynamicshadowtime<1&&fpsav>m4xfps-0.5&&shadowqualli<1&&shadowqualli<maxshadowlevel)shadowqualli+=shadowqualli>0.9?(1-shadowqualli)/10:0.001
        if((renderer==3||hadrenderbackground)&&staticshadowtime>1.2&&fpsav<=m4xfps-30)shadowstaticqualli=Math.max(shadowstaticqualli-0.01,0)
        if((renderer==3||hadrenderbackground)&&staticshadowtime<1&&fpsav>m4xfps-1&&shadowstaticqualli<1&&shadowstaticqualli<maxstaticshadowlevel)shadowstaticqualli+=shadowstaticqualli>0.9?   (1-shadowstaticqualli)/10:0.001
        //die werte sollen von max fps abhänig sein
        if(shadows&&(Math.abs(shadowstaticqualli-oldshadowstaticqualli)>0.1||(shadowstaticqualli==0&&oldshadowstaticqualli!=0))&&cancolmap&&fps+10>fpsav){
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
    //wen wasser zu lang braucht deactivire es
    //if(fpscontroll&&wasserphysik&&wassertime>1000/m4xfps)wasserphysik=false
    if(fpscontroll&&fpsav+15<m4xfps&&checkedfps){
        for(let i of fpscontrollarr){if(window[i]==true){window[i]=false;console.log("low fps! disable "+i);fpsav+=15;break}}//net sofort wieder getriggert
    }

    gamespeedupcounter+=gamespeedup
    while(gamespeedupcounter>0){
        gamespeedupcounter--
        for(let i of myRect[loadmap]){
            if(i.playerphysik)playerphysik(i)
            if(i.environment)environmentplayer(i)
        }
    }
    environment()
    collupdate=false
    if (debug)debugtext+=
        "\ndistd "+anime.distd[0]+
        "\ndistd "+anime.distd[1]+
        "\ndistd "+anime.distd[2]+
        "\ndistd "+anime.distd[3]+
        "\nvelox "+anime.velo[0].toFixed(3)+
        "\nveloy "+anime.velo[1].toFixed(3)+
        "\nx  "+anime.minx.toFixed(3)+
        "\ny  "+anime.miny.toFixed(3)+
        "\nfps "+fps.toFixed(1)+
        "\nmaxfps "+m4xfps+
        "\nfpsav "+fpsav.toFixed(3)+
        "\nwasserfps "+myRect[loadmap].filter(i=>typeof(i.wasserfps)=="number").map(i=>"\n "+i.wasserfps.toFixed(3)).join("")+
        "\nfalldistanz  "+anime.falldist.toFixed(3)+
        "\nme "+myRect[loadmap].findIndex(i=>i==anime)
    if (debug&&distancedebug)debugtext+=
        "\ndecke "+(typeof(anime.umgebung[0][0])=="object"?anime.umgebung[0][0].construckarr+(window[anime.umgebung[0][0].construckarr][loadmap].findIndex(obf=>obf==anime.umgebung[0][0])):"")+
        "\n "+anime.umgebung[0][1].toFixed(3)+
        "\nleft "+(typeof(anime.umgebung[1][0])=="object"?anime.umgebung[1][0].construckarr+(window[anime.umgebung[1][0].construckarr][loadmap].findIndex(obf=>obf==anime.umgebung[1][0])):"")+
        "\n "+anime.umgebung[1][1].toFixed(3)+
        "\nground "+(typeof(anime.umgebung[2][0])=="object"?anime.umgebung[2][0].construckarr+(window[anime.umgebung[2][0].construckarr][loadmap].findIndex(obf=>obf==anime.umgebung[2][0])):"")+
        "\n "+anime.umgebung[2][1].toFixed(3)+
        "\nright "+(typeof(anime.umgebung[3][0])=="object"?anime.umgebung[3][0].construckarr+(window[anime.umgebung[3][0].construckarr][loadmap].findIndex(obf=>obf==anime.umgebung[3][0])):"")+
        "\n "+anime.umgebung[3][1].toFixed(3)
    if (debug&&shadowdebug)debugtext+=
        "\nshadowquali "+shadowqualli.toFixed(3)+
        "\nshadowstaticqualli "+shadowstaticqualli.toFixed(3)+
        "\nshadowrand "+shadowrand+
        "\nshadowstroke "+shadowstroke+
        "\nstaticshadowtime "+staticshadowtime.toFixed(3)+
        "\ndynamicshadowtime "+dynamicshadowtime.toFixed(3)+
        "\nneedshadow "+toupdateshadow.size+
        "\ncanfishmap "+canfishmap+
        "\nidletime "+idletime.toFixed(3)+
        "\nfishmaptimer "+fishmaptimer.toFixed(3)+
        "\nfishmapreset "+fishmapreset
    if (debug&&debugdebug)debugtext+=    
        "\ndebtextavg "+debtextavg.toFixed(3)+
        "\ndebtextvariation "+debtextvariation.toFixed(3)+
        "\ndebtextlength "+debtextlength.toFixed(3)
    if (debug&&gravidebug)debugtext+=    
        "\ngravirichtung "+(anime.gravirich*(180/Math.PI)).toFixed(0)+"°"+
        "\ngravi0 "+anime.graviins[0].toFixed(3)+
        "\ngravi1 "+anime.graviins[1].toFixed(3)+
        "\nrich4 "+anime.rich4+
        "\nrich2 "+anime.rich2+
        "\nrich4arr "+anime.rich4arr.join()+
        "\nrich2arr "+anime.rich2arr.join()
    if (debug&&mousedebug)debugtext+=    
        "\nmousex "+mousex+
        "\nmousey "+mousey+
        "\nmousexc "+mousexc+
        "\nmouseyc "+mouseyc+
        "\ntodrawb0 "+todrawb[0].length+
        "\ntodrawb1 "+todrawb[1].length

    //das vieleicht in bored rein
    if(multiplayerstartet&&multiplayer&&multiplayerinversekinematic){
        for(let i of myRect[loadmap].filter(i1=>i1.construck=="Multiplayer"))inverse_kinematic(i,true)
    }
    if(renderer==0)hadrenderbackground=false
    if((oldxcam!=Math.round((rofx+offcamx)*10)/10||oldycam!=Math.round((rofy+offcamy)*10)/10)){
        if(renderer==0)renderbackground=true
    }else{
        instandzoom=true
    }
    oldxcam=Math.round((rofx+offcamx)*10)/10
    oldycam=Math.round((rofy+offcamy)*10)/10

    veloscreenx-=(oldscreenx-window.screenX)*0.05//speed
    veloscreeny-=(oldscreeny-window.screenY)*0.05//speed
    veloscreenx*=0.95//abnahme
    veloscreeny*=0.95//abnahme
    oldscreenx+=veloscreenx
    oldscreeny+=veloscreeny

    if(shadows){
        let a = performance.now();
        repaint(rofx+offcamx+veloscreenx,rofy+offcamy+veloscreeny)
        dynamicshadowtime=(dynamicshadowtime*shadowtimeanpassung)+((performance.now()-a)*(1-shadowtimeanpassung))
    }else{
        repaint(rofx+offcamx+veloscreenx,rofy+offcamy+veloscreeny)
    }
    if((renderbackground&&renderer==0)||playertexturanimation||shadows){
        if(playertexturanimation)texturupdatet=false
        if ('requestIdleCallback' in window) {
            if(idlecallbackactiv==false){idlecallbackactiv=true;window.requestIdleCallback(bored.bind(this,anime))}
        }else{
            if(renderbackground&&renderer==0)repaintb(rofx+offcamx,rofy+offcamy)
            if(shadows&&promall[3].res&&cancolmap&&!needcolmap&&fps+2>fpsav&&fpsav+2>m4xfps){
                for (let i=performance.now()+idletime;i<time+1000/m4xfps&&(toupdateshadow.size>0||(playertexturanimation&&texturupdatet==false));i+=idletime*1.5){
                    if(texturupdatet==false&&playertexturanimation){texturanimation(anime);texturupdatet=true;continue}
                    let a=performance.now()
                    let pop=[...toupdateshadow][0]
                    toupdateshadow.delete(pop)
                    for (let s=0;s<mySun[loadmap].length;s++)shadow(s,pop)
                    if(pop.static)renderbackground=true
                    idletime=(idletime*idletimeanpassung)+((performance.now()-a)*(1-idletimeanpassung))
                }
            }
        }
    }
    timeo=time
    if(stopmain){
        window.requestAnimationFrame(ani)
    }else{
        for(let i of myRect[loadmap])if("worker" in i)i.worker.postMessage({stop:true})
    }
    if(debugcolmap||cleardebugcolmap||debug)debugcol()
}
function bored(me,timetowork){
    if(renderbackground&&fps+10>fpsav&&renderer==0){repaintb(rofx+offcamx,rofy+offcamy,timetowork)}
    if(texturupdatet==false&&playertexturanimation&&!(inversekinematics&&promall[3].res&&me.inversekinematics==true)){texturanimation(me);texturupdatet=true}
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
    if (!(me.minx < me1.minx + me1.w &&
          me.minx + me.w > me1.minx &&
          me.miny < me1.miny + me1.h &&
          me.miny + me.h > me1.miny)){return false}

    const minxs=Math.min(me.minx,me1.minx)
    const minys=Math.min(me.miny,me1.miny)
    const maxxs=Math.max(me.minx+me.w,me1.minx+me1.w)
    const maxys=Math.max(me.miny+me.h,me1.miny+me1.h)

    let canvas1=new OffscreenCanvas(maxxs-minxs,maxys-minys)
    let context1=canvas1.getContext("2d");
    context1.globalCompositeOperation="lighter"
    context1.fillStyle="#ffff00"
    context1.beginPath();
    context1.moveTo(me.minx-minxs,me.miny-minys);
    for (let i=1;i<me.x.length;i++){context1.lineTo(me.x[i]-minxs,me.y[i]-minys)}
    context1.fill()

    context1.fillStyle="#00ffff"
    context1.beginPath();
    context1.moveTo(me1.minx-minxs,me1.miny-minys);
    for (let i=1;i<me1.x.length;i++){context1.lineTo(me1.x[i]-minxs,me1.y[i]-minys)}
    context1.fill()

    const t=context1.getImageData(0,0,maxxs-minxs,maxys-minys).data
    for (let i=0;i<t.length;i+=4){
        if(t[i]>=0&&t[i+1]>=0&&t[i+2]>=0&&t[i+3]==255)return true
    }
    return false
}
function environment(){
    for (let me1 of myRect[loadmap]) {

        if((typeof(me1.environment)!=undefined&&me1.environment)||(typeof(me1.playerphysik)!=undefined&&me1.playerphysik))continue//das skipt spieler

        //wen ki pos updatet wurde sende es


        if(me1.updatet[0]){
            if(playertexturanimation&&"animation" in me1)texturanimation(me1)
            if(shadows)toupdateshadow.add(me1)
            if(multiplayerstartet&&me1.managefromplayernum==multiplayerid){
                postMessage({act:"update obj",data:{x:me1.x,y:me1.y,w:me1.w,h:me1.h,dir:me1.dir[0]},id:multiplayerid,managefromplayerobjnum:me1.managefromplayerobjnum})
            }
            me1.updatet[0]=0
        }

        //anmimnation
        //wen webworker gibt dan lass es in webworker laufen
        if((typeof(me1.managefromplayernum)=="undefined"||me1.managefromplayernum==multiplayerid||me1.sync)&&promall[2].res&&!("Worker" in window&&sharedarraybufferallowed&&Object.getOwnPropertyNames(aiobjwebworker).includes(me1.type))&&Object.getOwnPropertyNames(aiobj).includes(me1.type)&&failedkis[me1.type]!=true){
            try{
                aiobj[me1.type](me1)
            }catch(e){
                console.warn(e)
                console.log("deactivate ai"+me1.type)
                failedkis[me1.type]=true
            }
        }

        if(!me1.havcoll&&me1.type!=undefined){
            let objnum=objcolmap[Math.trunc(me1.miny+me1.h/2-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w/2)-minx]
            if(objnum==0||objnum==undefined)continue
            let obj=colobjarr[objnum-1]
            if(typeof(obj.damage)=="undefined")continue
            if(me1.type in obj.damage){
                console.log(me1)
                obj.damage[me1.type](me1)
            }
        }
    }
}
function environmentplayer(me,first){//noch an gravi anpassen
    //kis solen invirement auch aufruffen können
    if(me!=undefined)me.inwater[0]=false
    if(me!=undefined&&fps+20>fpsav){
        if (me.nokill>0){nokill=true;setTimeout(()=>{nokill=false},me.nokill*1000);me.nokill=0;}

        //feuer
        if(me.statsnum[0]==2&&keys.keytoggle(me.controls.r)){
            new createobj.Feuer(myRect,me.minx+me.w/2,me.miny+me.h/2,{winkel:Math.atan2(-me.dir[0]*me.rich2arr[0]*me.rich2[me.rich2arr[0]],-me.dir[0]*me.rich2arr[1]*me.rich2[me.rich2arr[1]]),owner:me})
            if(renderer==3&&!webglfallback)updatescene=true
        }
        if(me.statsnum[0]==1&&keys.keytoggle(me.controls.r)){
            new createobj.Bommerang(myRect,me.minx+me.w/2,me.miny+me.h/2,{winkel:Math.atan2(-me.dir[0]*me.rich2arr[0]*me.rich2[me.rich2arr[0]],-me.dir[0]*me.rich2arr[1]*me.rich2[me.rich2arr[1]]),owner:me})
            if(renderer==3&&!webglfallback)updatescene=true
        }
        //block kaput machen
        if (typeof(me.umgebung[me.rich4arr[2]][0])!="undefined"&&me.umgebung[me.rich4arr[2]][1]<=1&&me.falldist>30&&me.umgebung[me.rich4arr[2]][0].dest&&me.getstats.dest&&me.shift){
            if(shadows)for(let i of me.umgebung[me.rich4arr[2]][0].shadowadd)toupdateshadow.add(i)
            needcolmap=true
            if(enableparticle)webgl2breakadd(
                me.umgebung[me.rich4arr[2]][0].minx+me.umgebung[me.rich4arr[2]][0].w/2-me.umgebung[me.rich4arr[2]][0].w*0.75*me.rich2[0]*me.rich2arr[0],
                me.umgebung[me.rich4arr[2]][0].miny+me.umgebung[me.rich4arr[2]][0].h/2-me.umgebung[me.rich4arr[2]][0].h*0.75*me.rich2[1]*me.rich2arr[1],
                [me.rich2arr[0]*me.rich2[0]*-5,me.rich2arr[1]*me.rich2[1]*-5],
                me.umgebung[me.rich4arr[0]][0].webglfill,
                100,
                60
            )
            myRect[loadmap].splice(myRect[loadmap].indexOf(me.umgebung[me.rich4arr[2]][0]),1);
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        if (typeof(me.umgebung[me.rich4arr[0]][0])!="undefined"&&me.umgebung[me.rich4arr[0]][1]<=1&&me.umgebung[me.rich4arr[0]][0].dest&&me.getstats.dest){
            if(shadows)for(let i of me.umgebung[me.rich4arr[0]][0].shadowadd)toupdateshadow.add(i)
            needcolmap=true
            if(enableparticle)webgl2breakadd(
                me.umgebung[me.rich4arr[0]][0].minx+me.umgebung[me.rich4arr[0]][0].w/2-me.umgebung[me.rich4arr[0]][0].w*0.75*me.rich2[0]*me.rich2arr[0],
                me.umgebung[me.rich4arr[0]][0].miny+me.umgebung[me.rich4arr[0]][0].h/2-me.umgebung[me.rich4arr[0]][0].h*0.75*me.rich2[1]*me.rich2arr[1],
                [me.rich2arr[0]*me.rich2[0]*5,me.rich2arr[1]*me.rich2[1]*5],
                me.umgebung[me.rich4arr[0]][0].webglfill,
                100,
                60
            )
            myRect[loadmap].splice(myRect[loadmap].indexOf(me.umgebung[me.rich4arr[0]][0]),1);
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        //sumon ist noch bisle buggy bei andere richtung
        //mach spawn richtung umdrehen
        //mach dir umdrehen
        if (me.falldist>30&&me.shift&&typeof(me.umgebung[me.rich4arr[2]][0])!="undefined"&&me.umgebung[me.rich4arr[2]][1]<=1&&me.umgebung[me.rich4arr[2]][0].construck=="Questionblock"&&me.getstats.dest&&typeof(me.umgebung[me.rich4arr[2]][0].spawn)=="object"){
            for(let i of me.umgebung[me.rich4arr[2]][0].spawn.spawn){
                let pos=[]
                if((!"x" in i.options)||(!"y" in i.options)){
                    pos[0]=me.umgebung[me.rich4arr[2]][0].minx+(me.rich2arr[0]*(me.rich2[0]?20:40))
                    pos[1]=me.umgebung[me.rich4arr[2]][0].miny+(me.rich2arr[1]*(me.rich2[1]?20:40))
                    if("xoffset" in i)pos[0]+=i.xoffset
                    if("yoffset" in i)pos[1]+=i.yoffset
                }
                updatetexture(new createobj[i.name](i.were,...pos,i.options))
            }
            if(me.umgebung[me.rich4arr[2]][0].spawn.replaceself){
                let i=me.umgebung[me.rich4arr[2]][0]
                let num=myRect[loadmap].indexOf(me.umgebung[me.rich4arr[2]][0])
                updatetexture(new createobj[i.spawn.replaceself.name]([num,myRect],i.x,i.y,i.spawn.replaceself.options))
            }else if(me.umgebung[me.rich4arr[2]][0].spawn.delete){
                myRect[loadmap].splice(myRect[loadmap].indexOf(me.umgebung[me.rich4arr[2]][0]),1)
            }
            needcolmap=true
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        if (typeof(me.umgebung[me.rich4arr[0]][0])!="undefined"&&me.umgebung[me.rich4arr[0]][1]<=1&&me.umgebung[me.rich4arr[0]][0].construck=="Questionblock"&&typeof(me.umgebung[me.rich4arr[0]][0].spawn)=="object"){
            for(let i of me.umgebung[me.rich4arr[0]][0].spawn.spawn){
                let pos=[]
                if((!"x" in i.options)||(!"y" in i.options)){
                    pos[0]=me.umgebung[me.rich4arr[0]][0].minx-(me.rich2arr[0]*(me.rich2[0]?20:40))
                    pos[1]=me.umgebung[me.rich4arr[0]][0].miny-(me.rich2arr[1]*(me.rich2[1]?20:40))
                    if("xoffset" in i)pos[0]+=i.xoffset
                    if("yoffset" in i)pos[1]+=i.yoffset
                }
                updatetexture(new createobj[i.name](i.were,...pos,i.options))
            }
            if(me.umgebung[me.rich4arr[0]][0].spawn.replaceself){
                let i=me.umgebung[me.rich4arr[0]][0]
                let num=myRect[loadmap].indexOf(me.umgebung[me.rich4arr[0]][0])
                updatetexture(new createobj[i.spawn.replaceself.name]([num,myRect],i.x,i.y,i.spawn.replaceself.options))
            }else if(me.umgebung[me.rich4arr[0]][0].spawn.delete){
                myRect[loadmap].splice(myRect[loadmap].indexOf(me.umgebung[me.rich4arr[0]][0]),1)
            }
            needcolmap=true
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
    }

    for (let i=0;i<myRect[loadmap].length;i++) {
        let me1=myRect[loadmap][i]
        //if(me1==me)continue
        if(typeof(me1.environment)!=undefined&&me1.environment)continue//das skipt spieler



        //kucke ob obj sichtbar ist
        if(!(rofx*zoomn-20<me1.minx+me1.w&&
            me1.minx/zoomn<rofx+canvas.width+20&&
            rofy*zoomn-20<me1.miny+me1.h&&
            me1.miny/zoomn<rofy+canvas.height+20)){continue}
        //console.log(me1)

        if(typeof(me1.damage)!="undefined"){

            if(typeof(me1.damage.collideup)   !="undefined"&&me.umgebung[0][0]==me1&&me.umgebung[0][1]<=5&&keys.getkeyovermin(me.controls.w)){
                try{
                    me1.damage.collideup(me)
                }catch(e){
                    console.warn(e)
                }
            }
            if(typeof(me1.damage.collideright)!="undefined"&&me.umgebung[3][0]==me1&&me.umgebung[3][1]<=5&&keys.getkeyovermin(me.controls.d)){
                try{
                    me1.damage.collideright(me)
                }catch(e){
                    console.warn(e)
                }
            }
            if(typeof(me1.damage.collidedown) !="undefined"&&me.umgebung[2][0]==me1&&me.umgebung[2][1]<=5&&keys.getkeyovermin(me.controls.s)){
                try{
                    me1.damage.collidedown(me)
                }catch(e){
                    console.warn(e)
                }
            }
            if(typeof(me1.damage.collideleft) !="undefined"&&me.umgebung[1][0]==me1&&me.umgebung[1][1]<=5&&keys.getkeyovermin(me.controls.a)){
                try{
                    me1.damage.collideleft(me)
                }catch(e){
                    console.warn(e)
                }
            }

            //spieler coll mit obj
            //das verbessern
            //wen sound net activirt skippe grass
            if(typeof(me1.damage.collide)!="undefined"&&me1.damage.collideendstatus>0)me1.damage.collideendstatus++
            if((typeof(me1.damage.collide)!="undefined"||(me.falldist>=5&&(typeof(me1.damage.jump)!="undefined"||typeof(me1.damage.groundpound)!="undefined")))&&collide(me,me1)){
                if(typeof(me1.damage.groundpound)!="undefined"&&me.falldist>=5&&me.shift){
                    try{
                        me1.damage.groundpound(me,nokill)
                    }catch(e){
                        console.warn(e)
                    }
                }else if(typeof(me1.damage.jump)!="undefined"&&me.falldist>=5){
                    try{
                        me1.damage.jump(me,nokill)
                    }catch(e){
                        console.warn(e)
                    }
                }else if(typeof(me1.damage.collide)!="undefined"){
                    if(me1.damage.collideendstatus==0&&typeof(me1.damage.collidestart)=="function"){
                        try{
                            me1.damage.collidestart()
                        }catch(e){
                            console.warn(e)
                        }
                    }
                    try{
                        me1.damage.collide(me,nokill)
                    }catch(e){
                        console.warn(e)
                    }
                    me1.damage.collideendstatus=1
                }
            }
            if(typeof(me1.damage.collide)!="undefined"&&me1.damage.collideendstatus>=5){//kleines dilay das net so oft fehler gibt
                me1.damage.collideendstatus=0
                if(typeof(me1.damage.collideend)=="function"){
                    try{
                        me1.damage.collideend()
                    }catch(e){
                        console.warn(e)
                    }
                }
            }
            if(enableaudio){
                if(typeof(me1.damage.audiocollide)!="undefined"&&me1.damage.audiocollideendstatus>0)me1.damage.audiocollideendstatus++
                if((typeof(me1.damage.audiocollide)!="undefined"||(me.falldist>=5&&(typeof(me1.damage.audiojump)!="undefined"||typeof(me1.damage.audiogroundpound)!="undefined")))&&collide(me,me1)){
                    if(typeof(me1.damage.audiogroundpound)!="undefined"){
                        try{
                            me1.damage.audiogroundpound(me,nokill)
                        }catch(e){
                            console.warn(e)
                        }
                    }else if(typeof(me1.damage.audiojump)!="undefined"){
                        try{
                            me1.damage.audiojump(me,nokill)
                        }catch(e){
                            console.warn(e)
                        }
                    }else if(typeof(me1.damage.audiocollide)!="undefined"){
                        if(me1.damageaudio.collideendstatus==0&&typeof(me1.damage.audiocollidestart)=="function"){
                            try{
                            me1.damage.audiocollidestart()
                        }catch(e){
                            console.warn(e)
                        }
                    }
                        try{
                            me1.damage.audiocollide(me,nokill)
                        }catch(e){
                            console.warn(e)
                        }
                        me1.damage.audiocollideendstatus=1
                    }
                }
                if(typeof(me1.damage.audiocollide)!="undefined"&&me1.damage.audiocollideendstatus>=5){//kleines dilay das net so oft fehler gibt
                    me1.damage.audiocollideendstatus=0
                    if(typeof(me1.damage.audiocollideend)=="function"){
                        try{
                            me1.damage.audiocollideend()
                        }catch(e){
                            console.warn(e)
                        }
                    }
                }
            }
        }
    }
}

function noobmodus(){
    const metemp=myRect[loadmap].filter(i=>i.construck=="Player")
    if(metemp.length<=noobtarget){console.warn("player dont exist resetting noobtarget");noobtarget=0}
    const me=metemp[noobtarget]
    if(noob&&!noobpic){
        noobpic=true
        window[canvarr[canvarr.length-1]].style="background: url('img/noobhintergund.svg')"
    }
    if(!noob&&noobpic){
        noobpic=false
        for(let i of canvarr)window[i].style="background:'none'"
    }
    if(tp&&mousex!=null&&mousey!=null){
        me.setx=rofx*zoomn+mousex*zoomn
        me.sety=rofy*zoomn+mousey*zoomn
    }
    if(newstart){
        newstart=false
        me.x.fill(...me.dx)
        me.y.fill(...me.dy)
    }
    if(lastwaypoint){
        lastwaypoint=false
        me.x.fill(...me.sx)
        me.y.fill(...me.sy)
    }
    if(playerplus1live){
        me.dmg[0]++
        guistats()
        playerplus1live=false
    }
    if(playerplus1statsnum[0]){
        me.statsnum[0]++
        playerplus1statsnum[0]=false
    }
    if(clearenemy){
        myRect[loadmap]=myRect[loadmap].filter(i=>{i.construck=="Enemy"})
        clearenemy=false
    }
    if(inflive){
        me.dmg[0]=100
        guistats()
    }
    if(tptofinish){
        tptofinish=false
        let nextfinish=myRect[loadmap].filter(i=>i.construck=="Finish").sort((i,i1)=>{
            Math.hypot((i.x+i.w/2)-(me.minx+me.w/2),(i.y+i.h/2)-(me.miny+me.h/2))>Math.hypot((i1.x+i1.w/2)-(me.minx+me.w/2),(i1.y+i1.h/2)-(me.miny+me.h/2))?0:1
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
                            me.setx=tpx
                            me.sety=tpy
                            break br
                        }
                    }
                }
            }
        }
    }
}
function playerphysik(me){
    //shift graviabhänig
    //console.time('shift')


    me.shift=keys.getkeyovermin(me.controls.s,undefined,me)?true:false
    let shiftchanged=false
    if(me.rich4==0){
        if (!me.shift&&(
            me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].h-me.h||
            me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].w-me.w))me.shift=true
        if(me.h!=me.getstats.h||me.w!=me.getstats.w){
            shiftchanged=true
            me.movex=-(me.w-me.getstats.w)
            me.movey=me.h-me.getstats.h
            for(let i in me.x)if(me.x[i]>me.minx)me.x[i]=me.minx+me.getstats.w
            for(let i in me.y)if(me.y[i]>me.miny)me.y[i]=me.miny+me.getstats.h
            me.w=me.getstats.w
            me.h=me.getstats.h
            if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y,w:me.w,h:me.h},playersendid:me.playersendid,id:multiplayerid})
            if(renderer==3&&!inversekinematics&&!(me.animation&&playertexturanimation))updatescene=true
        }
    }else if(me.rich4==1){
        if (!me.shift&&(
            me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].w-me.h||
            me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].h-me.w))me.shift=true
        if(me.h!=me.getstats.w||me.w!=me.getstats.h){
            shiftchanged=true
            for(let i of me.x)if(me.x[i]>me.minx)me.x[i]=me.minx+me.getstats.h
            for(let i of me.y)if(me.y[i]>me.miny)me.y[i]=me.miny+me.getstats.w
            me.w=me.getstats.h
            me.h=me.getstats.w
            if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y,w:me.w,h:me.h},playersendid:me.playersendid,id:multiplayerid})
            if(renderer==3&&!inversekinematics&&!(me.animation&&playertexturanimation))updatescene=true
        }
    }else if(me.rich4==2){
        if (!me.shift&&(
            me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].h-me.h||
            me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].w-me.w))me.shift=true
        if(me.h!=me.getstats.h||me.w!=me.getstats.w){
            shiftchanged=true
            for(let i of me.x)if(me.x[i]>me.minx)me.x[i]=me.minx+me.getstats.w
            for(let i of me.y)if(me.y[i]>me.miny)me.y[i]=me.miny+me.getstats.h
            me.w=me.getstats.w
            me.h=me.getstats.h
            if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y,w:me.w,h:me.h},playersendid:me.playersendid,id:multiplayerid})
            if(renderer==3&&!inversekinematics&&!(me.animation&&playertexturanimation))updatescene=true
        }
    }else if(me.rich4==3){
        if (!me.shift&&(
            me.umgebung[0][1]+me.umgebung[2][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].w-me.h||
            me.umgebung[1][1]+me.umgebung[3][1]<me.stats[me.inwater[0]|0][0][me.statsnum[0]].h-me.w))me.shift=true
        if(me.h!=me.getstats.w||me.w!=me.getstats.h){
            shiftchanged=true
            me.movex=me.w-me.getstats.h
            me.movey=-(me.h-me.getstats.w)
            for(let i of me.x)if(me.x[i]>me.minx)me.x[i]=me.minx+me.getstats.h
            for(let i of me.y)if(me.y[i]>me.miny)me.y[i]=me.miny+me.getstats.w
            me.w=me.getstats.h
            me.h=me.getstats.w
            if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y,w:me.w,h:me.h},playersendid:me.playersendid,id:multiplayerid})
            if(renderer==3&&!inversekinematics&&!(me.animation&&playertexturanimation))updatescene=true
        }
    }
    //console.timeEnd('shift')
    //console.time('rays')

    me.disto=[[],[],[],[]]
    me.distd=[[],[],[],[]]
    const widthnum=Math.max(Math.trunc(me.w/playerwidthcollpoints),1)
    const heightnum=Math.max(Math.trunc(me.h/playerheightcollpoints),1)
    const kuck=Math.max(maxdistcol,Math.abs(me.velo[1])+10,Math.abs(me.velo[0])+10)-(fps+10>fpsav?0:10)
    //make ignore list
    for(let i=0,i1=Math.trunc(me.miny-miny)*(maxx-minx)+Math.trunc(me.minx+1)-minx;i<kuck;i++,i1-=maxx-minx){
        if(objcolmap[i1]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1]-1])||colobjarr[objcolmap[i1]-1].alloweddirections[0]==1)){
            me.distd[0].push(i);me.disto[0].push(colobjarr[objcolmap[i1]-1]);break
        }
    }
    for(let ofs=1/widthnum,pos=ofs/2;pos<=1;pos+=ofs){
        for(let i=0,i1=Math.trunc(me.miny-miny)*(maxx-minx)+Math.trunc(me.minx+me.w*pos)-minx;i<kuck;i++,i1-=maxx-minx){
            if(objcolmap[i1]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1]-1])||colobjarr[objcolmap[i1]-1].alloweddirections[0]==1)){
                me.distd[0].push(i);me.disto[0].push(colobjarr[objcolmap[i1]-1]);break
            }
        }
    }
    for(let i=0,i1=Math.trunc(me.miny-miny)*(maxx-minx)+Math.trunc(me.minx+me.w-1)-minx;i<kuck;i++,i1-=maxx-minx){
        if(objcolmap[i1]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1]-1])||colobjarr[objcolmap[i1]-1].alloweddirections[0]==1)){
            me.distd[0].push(i);me.disto[0].push(colobjarr[objcolmap[i1]-1]);break
        }
    }



    for(let i=0,i1=Math.trunc(me.miny+1-miny)*(maxx-minx)+Math.trunc(me.minx-1)-minx;i<kuck;i++){
        if(objcolmap[i1-i]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1-i]-1])||colobjarr[objcolmap[i1-i]-1].alloweddirections[1]==1)){
            me.distd[1].push(i);me.disto[1].push(colobjarr[objcolmap[i1-i]-1]);break
        }
    }
    for(let ofs=1/heightnum,pos=ofs/2;pos<=1;pos+=ofs){
        for(let i=0,i1=Math.trunc(me.miny+me.h*pos-miny)*(maxx-minx)+Math.trunc(me.minx-1)-minx;i<kuck;i++){
            if(objcolmap[i1-i]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1-i]-1])||colobjarr[objcolmap[i1-i]-1].alloweddirections[1]==1)){
                me.distd[1].push(i);me.disto[1].push(colobjarr[objcolmap[i1-i]-1]);break
            }
        }
    }
    for(let i=0,i1=Math.trunc(me.miny+me.h-1-miny)*(maxx-minx)+Math.trunc(me.minx-1)-minx;i<kuck;i++){
        if(objcolmap[i1-i]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1-i]-1])||colobjarr[objcolmap[i1-i]-1].alloweddirections[1]==1)){
            me.distd[1].push(i);me.disto[1].push(colobjarr[objcolmap[i1-i]-1]);break
        }
    }


    for(let i=0,i1=Math.trunc(me.miny+me.h+1-miny)*(maxx-minx)+Math.trunc(me.minx+me.w-1)-minx;i<kuck;i++,i1+=maxx-minx){
        if(objcolmap[i1]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1]-1])||colobjarr[objcolmap[i1]-1].alloweddirections[2]==1)){
            me.distd[2].push(i);me.disto[2].push(colobjarr[objcolmap[i1]-1]);break
        }
    }
    for(let ofs=1/widthnum,pos=ofs/2;pos<=1;pos+=ofs){
        for(let i=0,i1=Math.trunc(me.miny+me.h+1-miny)*(maxx-minx)+Math.trunc(me.minx+(me.w-me.w*pos))-minx;i<kuck;i++,i1+=maxx-minx){
            if(objcolmap[i1]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1]-1])||colobjarr[objcolmap[i1]-1].alloweddirections[2]==1)){
                me.distd[2].push(i);me.disto[2].push(colobjarr[objcolmap[i1]-1]);break
            }
        }
    }  
    for(let i=0,i1=Math.trunc(me.miny+me.h+1-miny)*(maxx-minx)+Math.trunc(me.minx+1)-minx;i<kuck;i++,i1+=maxx-minx){
        if(objcolmap[i1]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1]-1])||colobjarr[objcolmap[i1]-1].alloweddirections[2]==1)){
            me.distd[2].push(i);me.disto[2].push(colobjarr[objcolmap[i1]-1]);break
        }
    }


    for(let i=0,i1=Math.trunc(me.miny+1-miny)*(maxx-minx)+Math.trunc(me.minx+me.w+1)-minx;i<kuck;i++){
        if(objcolmap[i1+i]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1+i]-1])||colobjarr[objcolmap[i1+i]-1].alloweddirections[3]==1)){
            me.distd[3].push(i);me.disto[3].push(colobjarr[objcolmap[i1+i]-1]);break
        }
    }
    for(let ofs=1/heightnum,pos=ofs/2;pos<=1;pos+=ofs){
        for(let i=0,i1=Math.trunc(me.miny+me.h*pos-miny)*(maxx-minx)+Math.trunc(me.minx+me.w+1)-minx;i<kuck;i++){
            if(objcolmap[i1+i]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1+i]-1])||colobjarr[objcolmap[i1+i]-1].alloweddirections[3]==1)){
                me.distd[3].push(i);me.disto[3].push(colobjarr[objcolmap[i1+i]-1]);break
            }
        }
    }
    for(let i=0,i1=Math.trunc(me.miny+me.h-1-miny)*(maxx-minx)+Math.trunc(me.minx+me.w+1)-minx;i<kuck;i++){
        if(objcolmap[i1+i]>0&&(!("alloweddirections" in colobjarr[objcolmap[i1+i]-1])||colobjarr[objcolmap[i1+i]-1].alloweddirections[3]==1)){
            me.distd[3].push(i);me.disto[3].push(colobjarr[objcolmap[i1+i]-1]);break
        }
    }


    me.umgebung[0][0]=me.distd[0].length==0?0:me.disto[0][me.distd[0].findIndex(i1=>i1==Math.min(...me.distd[0]))]
    me.umgebung[1][0]=me.distd[1].length==0?0:me.disto[1][me.distd[1].findIndex(i1=>i1==Math.min(...me.distd[1]))]
    me.umgebung[2][0]=me.distd[2].length==0?0:me.disto[2][me.distd[2].findIndex(i1=>i1==Math.min(...me.distd[2]))]
    me.umgebung[3][0]=me.distd[3].length==0?0:me.disto[3][me.distd[3].findIndex(i1=>i1==Math.min(...me.distd[3]))]

    me.umgebung[0][1]=Math.trunc(me.miny)-(me.distd[0].length==0?0:Math.ceil(Math.max(me.miny-Math.min(...me.distd[0]),0)))
    me.umgebung[1][1]=me.distd[1].length==0?-minx+me.minx:Math.max(Math.min(...me.distd[1])-1,0)
    me.umgebung[2][1]=maxy-me.miny-me.h-(me.distd[2].length==0?0:Math.ceil(Math.max(maxy-me.miny-me.h+1-Math.min(...me.distd[2]),0)))
    me.umgebung[3][1]=me.distd[3].length==0?maxx-me.minx-me.w:Math.max(Math.min(...me.distd[3])-1,0)

    //console.timeEnd('rays')
    //console.time('gravi')
    const posgravi=(Math.trunc(me.miny+me.h/2-miny)*(maxx-minx)+Math.trunc(me.minx+me.w/2)-minx)*4
    if(gravicache&&gravimap[posgravi]==1){
        me.graviins[0]=gravimap[posgravi+1]*(1-me.getstats.gravimulti)
        me.graviins[1]=gravimap[posgravi+2]*(1-me.getstats.gravimulti)
        me.gravirich=gravimap[posgravi+3]
    }else{
        me.graviins[0]=0
        me.graviins[1]=0
        for (let i in myGravi[loadmap]){
            let posx=me.minx+me.w/2-myGravi[loadmap][i].minx
            posx-=Math.max(0,Math.min(posx,myGravi[loadmap][i].w))
            let posy=me.miny+me.h/2-myGravi[loadmap][i].miny
            posy-=Math.max(0,Math.min(posy,myGravi[loadmap][i].h))
            if(posx!==0||posy!==0){
                let starke=(myGravi[loadmap][i].stärke/Math.max(myGravi[loadmap][i].abfac*Math.hypot(posx,posy),0))
                let winkel=Math.atan2(posy,posx)
                me.graviins[0]+=starke*Math.cos(winkel)
                me.graviins[1]+=starke*Math.sin(winkel)
            }
        }
        me.gravirich=Math.atan2(me.graviins[1],me.graviins[0])

        if(gravicache){
            gravimap[posgravi+0]=1
            gravimap[posgravi+1]=me.graviins[0]
            gravimap[posgravi+2]=me.graviins[1]
            gravimap[posgravi+3]=me.gravirich
        }

        me.graviins[0]*=(1-me.getstats.gravimulti)
        me.graviins[1]*=(1-me.getstats.gravimulti)
    }
    //histerese einfügen
    //uselesscalculations
    //new array gen is bad
    const gravrichtemp=me.gravirich*(180/Math.PI)
         if(gravrichtemp>-135&&gravrichtemp<-45){me.rich4=0;me.rich4arr=[0,1,2,3];me.rich2arr=[0,1];me.rich2=[+1,+1]}
    else if(gravrichtemp>-45&&gravrichtemp<45)  {me.rich4=1;me.rich4arr=[3,0,1,2];me.rich2arr=[1,0];me.rich2=[-1,+1]}
    else if(gravrichtemp>45&&gravrichtemp<135)  {me.rich4=2;me.rich4arr=[2,3,0,1];me.rich2arr=[0,1];me.rich2=[-1,-1]}
    else                                        {me.rich4=3;me.rich4arr=[1,0,3,2];me.rich2arr=[1,0];me.rich2=[+1,-1]}

    //console.timeEnd('gravi')
    //console.time('jump')
    if(keys.getkeyovermin(me.controls.w,undefined,me)){
        if(me.falldist>0.1&&me.umgebung[me.rich4arr[2]][1]>0&&(keys.getkeyovermin(me.controls.a,undefined,me)&&!keys.getkeyovermin(me.controls.d,undefined,me))&&me.umgebung[me.rich4arr[3]][1]<=2){
            me.velo[me.rich2arr[1]]+=me.getstats.wj.y*keys.getmapkey(me.controls.w,undefined,me)*me.rich2[1]
            me.velo[me.rich2arr[0]]-=me.getstats.wj.x*keys.getmapkey(me.controls.a,undefined,me)*me.rich2[0]
        }else if(me.falldist>0.1&&me.umgebung[2][1]>0&&(keys.getkeyovermin(me.controls.d,undefined,me)&&!keys.getkeyovermin(me.controls.a,undefined,me))&&me.umgebung[1][1]<=2){
            me.velo[me.rich2arr[1]]+=me.getstats.wj.y*keys.getmapkey(me.controls.w,undefined,me)*me.rich2[1]
            me.velo[me.rich2arr[0]]+=me.getstats.wj.x*keys.getmapkey(me.controls.d,undefined,me)*me.rich2[0]
        }else if(me.umgebung[me.rich4arr[2]][1]<0.000001||me.inwater[0])me.velo[me.rich2arr[1]]+=me.getstats.jh*keys.getmapkey(me.controls.w,undefined,me)*me.rich2[1]*Math.max((60/fps)/2,1)
    }


    //console.log(me.velo)
    if(fly&&"controls" in me){
        me.velo[0]=0
        me.velo[1]=0
        if(keys.getkeyovermin(me.controls.w,undefined,me)){me.velo[1]=1}
        if(keys.getkeyovermin(me.controls.s,undefined,me)){me.velo[1]=-1}
        if(keys.getkeyovermin(me.controls.d,undefined,me)){me.velo[0]=1}
        if(keys.getkeyovermin(me.controls.a,undefined,me)){me.velo[0]=-1}
    }else{
        //gravi 
        me.velo[0]-=(Math.trunc(me.graviins[0]*1e8)/1e8)*Math.pow(2,60/fps)//hoffe das das fps gleich macht
        me.velo[1]+=(Math.trunc(me.graviins[1]*1e8)/1e8)*Math.pow(2,60/fps)
    
        //wen r und l kleichzeitig dan stopp
        //if in air dan langsamme
        if(keys.getkeyovermin(me.controls.d)&&keys.getkeyovermin(me.controls.a,undefined,me)){
            me.velo[me.rich2arr[0]]=0
        }else if(keys.getkeyovermin(me.controls.a,undefined,me)){
            me.velo[me.rich2arr[0]]-=(me.umgebung[me.rich4arr[2]][1]>=0.1?me.getstats.sa:me.getstats.sg)*keys.getmapkey(me.controls.a,undefined,me)*me.rich2[0]
            me.dir[0]=-1*me.rich2[0]
        }else if(keys.getkeyovermin(me.controls.d,undefined,me)){
            me.velo[me.rich2arr[0]]+=(me.umgebung[me.rich4arr[2]][1]>=0.1?me.getstats.sa:me.getstats.sg)*keys.getmapkey(me.controls.d,undefined,me)*me.rich2[0]
            me.dir[0]=1*me.rich2[0]
        }
    }
    //console.log(me.velo)
    //me.velo=[0,0]
    //return
    //me.velo[1]+=0.035*(60/fps)
    
    if(me.umgebung[me.rich4arr[2]][1]<=0.01){
        me.falldist=0
    }else{
        me.falldist=Math.max(me.umgebung[me.rich4arr[2]][1],me.falldist)
    }

    //console.timeEnd('jump')
    //console.time('slide')
    //mach kraft in 1 winkel in kraft für anderen winkel umrechnen mit neigung
    //if there is no ground say ground is flat
    //if i just see 1 than ground isnt flat  (length/(hightnum+2))*me.h>5  (mach kleine hügel ignorieren)
    //if ground are differend than ground isnt flat
    //const winkel0a=me.distd[0].length!==0&&((me.distd[0].length/(heightnum+2))*me.h<5||me.distd[0].length==1||Math.min(...me.distd[0].filter(i=>i!=Infinity))!=Math.max(...me.distd[0].filter(i=>i!=Infinity)))
    //const winkel1a=me.distd[1].length!==0&&((me.distd[1].length/(widthnum +2))*me.w<5||me.distd[1].length==1||Math.min(...me.distd[1].filter(i=>i!=Infinity))!=Math.max(...me.distd[1].filter(i=>i!=Infinity)))
    //const winkel2a=me.distd[2].length!==0&&((me.distd[2].length/(heightnum+2))*me.h<5||me.distd[2].length==1||Math.min(...me.distd[2].filter(i=>i!=Infinity))!=Math.max(...me.distd[2].filter(i=>i!=Infinity)))
    //const winkel3a=me.distd[3].length!==0&&((me.distd[3].length/(widthnum +2))*me.w<5||me.distd[3].length==1||Math.min(...me.distd[3].filter(i=>i!=Infinity))!=Math.max(...me.distd[3].filter(i=>i!=Infinity)))
    const min0=Math.min(...me.distd[0])
    const min1=Math.min(...me.distd[1])
    const min2=Math.min(...me.distd[2])
    const min3=Math.min(...me.distd[3])
    const minsecmin0=Math.abs(Math.min(...me.distd[0].filter(i=>i!=min0))-min0)
    const minsecmin1=Math.abs(Math.min(...me.distd[1].filter(i=>i!=min1))-min1)
    const minsecmin2=Math.abs(Math.min(...me.distd[2].filter(i=>i!=min2))-min2)
    const minsecmin3=Math.abs(Math.min(...me.distd[3].filter(i=>i!=min3))-min3)
    const winkel0a=me.distd[0].length!==0&&((min0!=Math.max(...me.distd[0])&&(me.rich2arr[0]==0?minsecmin0<5:minsecmin0>10))||((me.distd[0].length/(heightnum+2))*me.h<5))
    const winkel1a=me.distd[1].length!==0&&((min1!=Math.max(...me.distd[1])&&(me.rich2arr[0]==1?minsecmin1<5:minsecmin1>10))||((me.distd[1].length/(widthnum +2))*me.w<5))
    const winkel2a=me.distd[2].length!==0&&((min2!=Math.max(...me.distd[2])&&(me.rich2arr[0]==0?minsecmin2<5:minsecmin2>10))||((me.distd[2].length/(heightnum+2))*me.h<5))
    const winkel3a=me.distd[3].length!==0&&((min3!=Math.max(...me.distd[3])&&(me.rich2arr[0]==1?minsecmin3<5:minsecmin3>10))||((me.distd[3].length/(widthnum +2))*me.w<5))

    if(debug&&me.construck=="Player"&&debugwinkel)debugtext+=
    "\nminsecmin0 "+minsecmin0+
    "\nminsecmin1 "+minsecmin1+
    "\nminsecmin2 "+minsecmin2+
    "\nminsecmin3 "+minsecmin3+
    "\nflatground0 "+!winkel0a+
    "\nflatground1 "+!winkel1a+
    "\nflatground2 "+!winkel2a+
    "\nflatground3 "+!winkel3a
    const wstep=(1/widthnum/2)*me.w
    let winkel0=0
    let winkel1=0
    let winkel2=0
    let winkel3=0
    let deb=false
    if((winkel2a||winkel3a)&&(me.umgebung[2][1]<=1||me.umgebung[3][1]<=1)){
        //beachte das es 1 net umbedingt mitte ist
        //rechne winkel über boden aus
        if(winkel0==0&&me.distd[2].length>=2)winkel0=Math.min(Math.atan((me.distd[2][0]-me.distd[2][1])/wstep),0)
        //rechne winkel über distanz von boden und seite aus
        if(winkel0==0&&winkel3a)winkel0=-Math.atan(me.distd[2][0]/Math.min(...me.distd[3]))
        //kucke wie hoch letztes teil ist wo sichtbar ist und asume das es danach weit nichts kommt  (kuck*5) asume das da nechster punkt ist
        if(winkel0==0&&me.distd[3].length==1)winkel0=-Math.atan((((me.distd[3].length)/(heightnum+2))*me.h)/(kuck*5))
        if(isNaN(winkel0))winkel0=0
        if(inversekinematics&&me.inversekinematics&&me.dir[0]==1)me.bones[2].segment3.winkel=winkel0
        me.velo[0]=me.velo[0]*Math.cos(-winkel0)+me.velo[1]*Math.sin(-winkel0)
        me.velo[1]=me.velo[1]*Math.cos(-winkel0)+me.velo[0]*Math.sin(-winkel0)
    }
    if((winkel1a||winkel2a)&&(me.umgebung[1][1]<=1||me.umgebung[2][1]<=1)){
        if(winkel1==0&&me.distd[2].length>=2)winkel1=Math.min(Math.atan((me.distd[2][me.distd[2].length-1]-me.distd[2][me.distd[2].length-2])/wstep),0)
        if(winkel1==0&&winkel1a)winkel1=-Math.atan(me.distd[2][heightnum+1]/Math.min(...me.distd[1]))
        if(winkel1==0&&me.distd[1].length==1)winkel1=-Math.atan((((me.distd[1].length)/(heightnum+2))*me.h)/(kuck*5))
        if(isNaN(winkel1))winkel1=0
        if(inversekinematics&&me.inversekinematics&&me.dir[0]==-1)me.bones[2].segment3.winkel=winkel1
        me.velo[0]=me.velo[0]*Math.cos(winkel1)+me.velo[1]*Math.sin(winkel1)
        me.velo[1]=me.velo[1]*Math.cos(winkel1)+me.velo[0]*Math.sin(winkel1)
    }
    if((winkel0a||winkel3a)&&(me.umgebung[0][1]<=1||me.umgebung[3][1]<=1)){
        if(winkel2==0&&me.distd[0].length>=2)winkel2=Math.min(Math.atan((me.distd[0][me.distd[0].length-1]-me.distd[0][me.distd[0].length-2])/wstep),0)
        if(winkel2==0&&winkel3a)winkel2=-Math.atan(me.distd[0][heightnum+1]/Math.min(...me.distd[3]))
        if(winkel2==0&&me.distd[3].length==1)winkel2=-Math.atan((((me.distd[3].length)/(heightnum+2))*me.h)/(kuck*5))
        if(isNaN(winkel2))winkel2=0
        me.velo[0]=me.velo[0]*Math.cos(winkel2)+me.velo[1]*Math.sin(winkel2)
        me.velo[1]=me.velo[1]*Math.cos(winkel2)+me.velo[0]*Math.sin(winkel2)
    }
    if((winkel0a||winkel1a)&&(me.umgebung[0][1]<=1||me.umgebung[1][1]<=1)){
        if(winkel3==0&&me.distd[0].length>=2)winkel3=Math.min(Math.atan((me.distd[0][0]-me.distd[0][1])/wstep),0)
        if(winkel3==0&&winkel1a)winkel3=-Math.atan(me.distd[0][0]/Math.min(...me.distd[1]))
        if(winkel3==0&&me.distd[1].length==1)winkel3=-Math.atan((((me.distd[1].length)/(heightnum+2))*me.h)/(kuck*5))
        if(isNaN(winkel3))winkel3=0
        me.velo[0]=me.velo[0]*Math.cos(-winkel3)+me.velo[1]*Math.sin(-winkel3)
        me.velo[1]=me.velo[1]*Math.cos(-winkel3)+me.velo[0]*Math.sin(-winkel3)
    }
    //man solte jetzt eigentlich noch mal distanz berechnen und dan limitiern

    if(debug&&me.construck=="Player"&&debugwinkel)debugtext+=""+
    "\nwstep "+wstep+
    "\nwithnum "+widthnum+
    "\nheightnum "+heightnum+
    "\nkuck "+kuck+
    "\nwinkel0 "+(winkel0*(180/Math.PI)).toFixed(5)+"°"+
    "\nwinkel1 "+(winkel1*(180/Math.PI)).toFixed(5)+"°"+
    "\nwinkel2 "+(winkel2*(180/Math.PI)).toFixed(5)+"°"+
    "\nwinkel3 "+(winkel3*(180/Math.PI)).toFixed(5)+"°"
    //console.timeEnd('slide')
    //console.time('phy')

                        
    //long jump (wen nah am boden man schon bisle fall distanz hat und wen man schnell genug ist und man ganz nach rechtz/links will)
    if (me.umgebung[me.rich4arr[2]][1]<=1&&me.falldist>6&&(me.velo[me.rich2arr[0]]>1||me.velo[me.rich2arr[0]]<-1)&&keys.getmapkey(me.controls.w,undefined,me)==1){
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

    //could we pls cache it in player array
    if(highcolquali){
        me.velo[0]+=Math.max(0,(minx-(me.minx+me.velo[0])))
        me.velo[1]-=Math.max(0,(miny-(me.miny-me.velo[1])))
        me.velo[0]+=Math.min(0,(maxx-(me.minx+me.w+me.velo[0])))
        me.velo[1]-=Math.min(0,(maxy-(me.miny+me.h-me.velo[1])))
        let posx=0
        let posy=0
        const focusposx=me.velo[0]
        const focusposy=-me.velo[1]
        let distance=Math.hypot(Math.abs(focusposy),Math.abs(focusposx))
        if(distance>kuck*2)distance=0
        let d=Math.min(0.01,distance)
        //console.log(distance+"  "+d)
        while(distance>0){//mache das wen mitboden coll da mach andere richtung testen
            const winkel=Math.atan2(focusposy-posy,focusposx-posx)
            let anywork=true
            const sin=Math.sin(winkel)
            const cos=Math.cos(winkel)
            for(let i=0;i<3;i++){
                if(cos==0&&(i==0||i==1))continue
                if(sin==0&&(i==0||i==2))continue
                let postempx=posx+(i==0||i==1?cos*Math.min(d,distance):0)
                let postempy=posy+(i==0||i==2?sin*Math.min(d,distance):0)
                let work=true
                for(let i1=0;i1<me.x.length;i1++){
                    let i2=i1==0?me.x.length-1:i1-1
                    
                    let dist=1/(Math.hypot(me.y[i1]-me.y[i2],me.x[i1]-me.x[i2])/playercollpoints)
                    for(let i3=0;i3<1;i3+=dist){
                        const x=me.x[i1]*(i3)+me.x[i2]*(1-i3)
                        const y=me.y[i1]*(i3)+me.y[i2]*(1-i3)
                        if(
                            minx>=Math.trunc(x+postempx)||
                            miny>=Math.trunc(y+postempy)||
                            maxx<=Math.trunc(x+postempx)||
                            maxy<=Math.trunc(y+postempy)){
                                work=false
                                break
                            }
                        let num=objcolmap[Math.trunc(y+postempy-miny)*(maxx-minx)+Math.trunc(x+postempx)-minx]
                        if(num>0&&(
                            !("alloweddirections" in colobjarr[num-1])||
                            (
                                ((i==0||i==1)&&colobjarr[num-1].alloweddirections[cos>0?3:1]==1)||
                                ((i==0||i==2)&&colobjarr[num-1].alloweddirections[sin>0?2:0]==1)
                            )
                            )){
                            work=false
                            break
                        }
                    }
                }
                //wen in einer richtung laufen geht dan mach es
                if(work){
                    posx=postempx
                    posy=postempy
                    anywork=false
                    break
                }
            }
            if(anywork){
                if(rumble&&me.velo[1]>=1.6&&me.construck=="Player")keys.vibrate(87,me.velo[1])
                if(rumble&&me.velo[0]<=-1.6&&me.construck=="Player")keys.vibrate(65,-me.velo[0])
                if(rumble&&me.velo[1]<=-1.6&&me.construck=="Player")keys.vibrate(83,-me.velo[1])
                if(rumble&&me.velo[0]>=1.6&&me.construck=="Player")keys.vibrate(68,me.velo[0]) 
                break;
            }
            distance-=d
        }
        //console.log(me.velo[0].toFixed(5)+" "+posx.toFixed(5)+"   "+me.velo[1].toFixed(5)+" "+posy)
        me.velo[0]=posx
        me.velo[1]=-posy
    }else{
        if(!nocollision||!me.construck=="Player"){
            if (me.umgebung[0][1]<=me.velo[1]){
                if(rumble&&me.velo[1]>=1.6&&me.construck=="Player"){
                    keys.vibrate(87,me.velo[1])
                }
                me.velo[1]=Math.min(me.velo[1],me.umgebung[0][1])
            }
            if (me.umgebung[1][1]<=-me.velo[0]){
                if(rumble&&me.velo[0]<=-1.6&&me.construck=="Player"){
                    keys.vibrate(65,-me.velo[0])
                }
                me.velo[0]=Math.max(me.velo[0],-me.umgebung[1][1])
            }
            if (me.umgebung[2][1]<=-me.velo[1]){
                if(rumble&&me.velo[1]<=-1.6&&me.construck=="Player"){
                    keys.vibrate(83,-me.velo[1])
                }
                me.velo[1]=Math.max(me.velo[1],-me.umgebung[2][1])
            }
            if (me.umgebung[3][1]<=me.velo[0]){
                if(rumble&&me.velo[0]>=1.6){
                    keys.vibrate(68,me.velo[0]&&me.construck=="Player")
                }
                me.velo[0]=Math.min(me.velo[0],me.umgebung[3][1])
            }
        }
    }
    
    //console.timeEnd('phy')
    //console.time('set')



    
    if(Number.isFinite(me.velo[0])){
        if(me.velo[0]!=0){
            me.movex=Math.min(Math.abs(me.velo[0]),kuck)*(me.velo[0]>=0?1:-1);
            me.velo[0]+=me.velo[0]-Math.min(Math.abs(me.velo[0]),kuck)*(me.velo[0]>=0?1:-1)//wen über sicht bereicht rausgeht mach übergebliebenen velo nechstesmal
        }
    }else{
        if(debug){console.log("error velo is not finite number")};
        me.velo[0]=0
    }
    if(Number.isFinite(me.velo[1])){
        if(me.velo[1]!=0){
            me.movey=-Math.min(Math.abs(me.velo[1]),kuck)*(me.velo[1]>=0?1:-1);
            me.velo[1]+=me.velo[1]-Math.min(Math.abs(me.velo[1]),kuck)*(me.velo[1]>=0?1:-1)
        }
    }else{
        if(debug){console.log("error velo is not finite number")}
        me.velo[1]=0
    }
    //nomove: 0ismoving 1stoppedmoving 2isnt moving
    
    if(fps+20>fpsav){
        if (me.velo[0]!=0||me.velo[1]!=0||shiftchanged){
            if(shadows)toupdateshadow.add(me)
            if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{
                x:me.x,
                y:me.y,
                velo:me.velo,
                falldist:me.falldist,
                inwater:me.inwater[0],
                dir:me.dir[0],
                groundflat:me.distd[me.rich4arr[2]].length==3&&me.distd[me.rich4arr[2]].every((i1)=>i1==me.distd[me.rich4arr[2]][0]),
                rich4arr:me.rich4arr
            },playersendid:me.playersendid,id:multiplayerid})
            me.nomove=0
            me.nomovetimer=0
        }else{
            if(me.nomove==0){
                if(shadows)needcolmap=true
                if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{
                    x:me.x,
                    y:me.y,
                    velo:me.velo,
                    falldist:me.falldist,
                    inwater:me.inwater[0],
                    dir:me.dir[0],
                    groundflat:me.distd[me.rich4arr[2]].length==3&&me.distd[me.rich4arr[2]].every((i1)=>i1==me.distd[me.rich4arr[2]][0]),
                    rich4arr:me.rich4arr
                },playersendid:me.playersendid,id:multiplayerid})
                me.nomove=1
            }
            if(shadows&&me.nomove==1&&cancolmap&&!needcolmap){
                toupdateshadow.add(me)
                me.nomove=2
            }
            if(me.nomove>=1)me.nomovetimer+=60/fps
        }
    }
    //console.timeEnd('set')
    if(inversekinematics&&me.inversekinematics&&promall[3].res)inverse_kinematic(me,false)
    me.lastupdatetime[0]=performance.now()
}
function winscreen(){
    let but=[]
    but.push(document.createElement("H1"))
    but[but.length-1].id="winh1"
    but[but.length-1].textContent="lvl complete"
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent="Start"
    but[but.length-1].id="winbutton"
    but[but.length-1].onclick=(event)=>{console.log("click");defaultarrload(loadmap);document.querySelectorAll('.preset').forEach((me)=>me.remove());event.target.remove();mvis()}

    for (let i of but){i.className="preset";i.style.zIndex=1}
    for (let i of but)document.body.appendChild(i)
}
promallres[6]()