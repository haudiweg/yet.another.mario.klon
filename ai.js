'use strict';
/**
 * @callback aiobjfunc
 * @param {Array.<myRect>} me 
 * @param {Array.<myRect>} me1
 * @param {boolean} first
*/

const aiobj={
    /**@type {aiobjfunc}*/
    ki:function(me1){
        if(me1.dir[0]==0)me1.dir[0]=1
        let tlaki=true,traki=true,colayki=Infinity
        const maxdistcol=5*Math.max(60/m4xfps,1)
        const maxdistcolground=15*Math.max(60/m4xfps,1)
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+1-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+me1.h-1-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
    
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-1+i-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)-minx)if(objcolmap[i1]>0){colayki=i;break}
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-1+i-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-minx)if(objcolmap[i1]>0){colayki=i;break}
    
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+1-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+me1.h-1-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
    
        if (colayki==Infinity&&me1.kitype){
            //console.log("richtungswechsel")
            me1.dir[0]*=-1
        }else{
            if(colayki<=2)me1.movey=-1*60/m4xfps
            if(colayki>=2&&me1.miny+me1.h<=maxy)me1.movey=1*60/m4xfps
    
        }
        if (me1.dir[0]==-1){me1.dir[0]=tlaki?-1:traki?1:0}
        if (me1.dir[0]==1){me1.dir[0]=traki?1:tlaki?-1:0}

        //me1.movex=me1.dir[0]*Math.pow(2,60/m4xfps)
        me1.movex=me1.dir[0]*(60/m4xfps)/(60/m4xfps)*2//das verbessern da ist noch was falsch  (rechnung richtig aber einfacher weg nehmen)
        me1.velo[0]=me1.dir[0]
        me1.lastupdatetime[0]=performance.now()
        me1.updatet[0]=true
    },
    koopaki:function(me1){
        let speed
        if(me1.dmg[0]==3)speed=1
        if(me1.dmg[0]==2)speed=0
        if(me1.dmg[0]==1)speed=5
        if(me1.dir[0]==0)me1.dir[0]=1
        let tlaki=true,traki=true,colayki=Infinity
        const maxdistcol=1+Math.max(60/m4xfps,1)*speed
        const maxdistcolground=15+Math.max(60/m4xfps,1)*speed
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+5-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+me1.h-5-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
    
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-2+i-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)-minx)if(objcolmap[i1]>0){colayki=i;break}
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-2+i-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-minx)if(objcolmap[i1]>0){colayki=i;break}
    
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+5-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+me1.h-5-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
    
        if (colayki==Infinity&&me1.kitype){
            //console.log("richtungswechsel")
            me1.dir[0]*=-1
        }else{
            if(colayki<2)me1.movey=-1*60/m4xfps
            if(colayki>2&&me1.miny+me1.h<=maxy)me1.movey=1*60/m4xfps
    
        }
        if (me1.dir[0]==-1){me1.dir[0]=tlaki?-1:traki?1:0}
        if (me1.dir[0]==1){me1.dir[0]=traki?1:tlaki?-1:0}

        //del old point add new point
        me1.movex=me1.dir[0]*speed
        me1.velo[0]=me1.dir[0]
        me1.lastupdatetime[0]=performance.now()
        me1.updatet[0]=true
    },
    /**@type {aiobjfunc}*/
    movingblock:function(me1){//sol auch für dreiecke...
        for(let i=me1.minx-2;i<=me1.minx+me1.w+2;i++)for(let i1=me1.miny-2;i1<=me1.miny+me1.h+2;i1++){
            let i2=Math.trunc(i1-miny)*(maxx-minx)+Math.trunc(i)-minx
            if(objcolmap[i2]==me1.colobjnum[0])objcolmap[i2]=0
        }
        const x=Math.sign(me1.minx-me1.option[Math.abs(me1.dir[0])>>1<<1])
        const y=Math.sign(me1.miny-me1.option[1+(Math.abs(me1.dir[0])>>1<<1)])
        me1.movex=-x
        me1.movey=-y

        me1.velo[0]=-x
        me1.velo[1]=-y
        me1.lastupdatetime[0]=performance.now()
        me1.updatet[0]=true

        if(multiplayerstartet&&me1.managefromplayernum==multiplayerid){
            me1.kimultiplayertimer-=60/fps
            if(me1.kimultiplayertimer<=0){
                me1.kimultiplayertimer+=me1.kimultiplayertimerreset
                postMessage({act:"update obj",data:{x:me1.x,y:me1.y,dir:me1.dir[0]},id:multiplayerid,managefromplayerobjnum:me1.managefromplayerobjnum})
            }
        }
        if(x==0&&y==0&&!(me1.dir[0]&1)){me1.dir[0]=(me1.dir[0]+2)%(me1.option.length)}
        if(x==0&&y==0&&me1.dir[0]&1){
           me1.dir[0]+=2
           if(Math.abs(me1.dir[0])>=me1.option.length){
                me1.dir[0]*=-1
                me1.dir[0]+=2
           }
        }
        if(shadows)toupdateshadow.add(me1)

        for(let i of myRect[loadmap]){
            if (i.environment&&me1==i.umgebung[2][0]&&me1.miny>=(i.miny+i.h)-5&&me1.miny<=i.miny+i.h+5){//achtung gravi
                i.movex=-x
                i.movey=-y
                if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:i.x,y:i.y},playersendid:i.playersendid,id:multiplayerid})
            }
        }
        for(let i=me1.minx;i<me1.minx+me1.w;i++)for(let i1=me1.miny;i1<me1.miny+me1.h;i1++){
            let i2=Math.trunc(i1-miny)*(maxx-minx)+Math.trunc(i)-minx
            if(objcolmap[i2]==0)objcolmap[i2]=me1.colobjnum[0]
        }
        //mache in collarray wen da 0 ist und ich da bin mache da 1 
    },
    /**@type {aiobjfunc}*/
    breakingblock:function(me1){
        if(me1.invisible&&me1.timeout1==null)makevisible()//wen anderer spieler obj unsichtbar gemacht hat dan mach es nach zeit sichtbar
        function makevisible(){
            me1.timeout1=setTimeout(()=>{
                for(let i=me1.minx;i<me1.minx+me1.w;i++)for(let i1=me1.miny;i1<me1.miny+me1.h;i1++){
                    let i2=Math.trunc(i1-miny)*(maxx-minx)+Math.trunc(i)-minx
                    if(objcolmap[i2]==0)objcolmap[i2]=me1.colobjnum[0]
                }
                me1.invisible=false
                if(renderer==0){
                    if(typeof(me1.shadowadd)!="undefined")for(let i of me1.shadowadd)toupdateshadow.add(i)
                    if(typeof(me1.shadowadd)!="undefined"&&me1.static)renderbackground=true
                }
                if(renderer==3)updatetextur=true
                me1.timeout=null
                me1.timeout1=null
            },me1.option[1]*1e3)
        }


        
        me1.playeronobj=0
        
        for(let i of myRect[loadmap]){
            if(i.environment&&i.umgebung[i.rich4arr[2]][0]==me1){
                me1.playeronobj++
            }
        }

        //wen keiner mehr draufsteht mach unsichtbarwerden deactivirem
        if(me1.playeronobj==0&&me1.timeout!==null){
            clearTimeout(me1.timeout)
            me1.timeout=null
        }

        if(me1.timeout!==null||me1.invisible||me1.playeronobj==0)return
        me1.timeout=setTimeout(()=>{
            makevisible()
            for(let i=me1.minx-2;i<=me1.minx+me1.w+2;i++)for(let i1=me1.miny-2;i1<=me1.miny+me1.h+2;i1++){
                let i2=Math.trunc(i1-miny)*(maxx-minx)+Math.trunc(i)-minx
                if(objcolmap[i2]==me1.colobjnum[0])objcolmap[i2]=0
            }//das ist nur das bisle schneller geht
            me1.invisible=true
            if(renderer==0){
                if(typeof(me1.shadowadd)!="undefined")for(let i of me1.shadowadd)toupdateshadow.add(i)
                if(typeof(me1.shadowadd)!="undefined"&&me1.static)renderbackground=true
            }
            if(renderer==3)updatetextur=true
            if(multiplayerstartet&&(me1.managefromplayernum==multiplayerid||me1.sync))postMessage({act:"update obj",data:{invisible:true},id:multiplayerid,managefromplayerobjnum:me1.managefromplayerobjnum})
        },me1.option[0]*1e3)
            
        
    },
    /**@type {aiobjfunc}*/
    fish:function(me1){//vieleicht in andern cpu kern  wen obj in block ist sol path finding obj da raus lotsen
        //das nochmal programieren
        if(first==false)return
        if(me==undefined)me1.kitype=0
        let dis=Math.sqrt(Math.pow(me1.minx-me.minx,2)+Math.pow(me1.miny-me.miny,2),2)
        let maxdist=500
        breakki:if(me1.kitype==4||(me1.kitype==3&&dis<maxdist)){
            needfishmap=true
            if(fishmap[0]==undefined){break breakki}
            let min=[]
            let minnum=Infinity
            for(let i=-1;i<=1;i++){
                for(let i1=-1;i1<=1;i1++){
                    if(i==0&&i1==0)continue
                    const newnum=(fishmap[Math.round(me1.miny+i-miny)*Math.round(maxx-minx)+Math.round(me1.minx+i1-minx)]
                                +fishmap[Math.round(me1.miny+i-miny)*Math.round(maxx-minx)+Math.round(me1.minx+me1.w+i1-minx)]
                                +fishmap[Math.round(me1.miny+me1.h+i-miny)*Math.round(maxx-minx)+Math.round(me1.minx+i1-minx)]
                                +fishmap[Math.round(me1.miny+me1.h+i-miny)*Math.round(maxx-minx)+Math.round(me1.minx+me1.w+i1-minx)])
                    if(minnum>=newnum){minnum=newnum;min=[i,i1]}
                }
            }
            if(minnum==-Infinity){break breakki}
            me1.movex=min[1]
            me1.movey=min[0]
            return
        }
        if(me1.kitype==4||me1.kitype==3||me1.kitype==2||(me1.kitype==1&&dis<maxdist)){
            let winkel=Math.atan((me.miny-me1.miny)/(me.minx-me1.minx))
            me1.movex=(60/fps)*Math.sin(winkel)
            me1.movey=(60/fps)*Math.cos(winkel)
            return
        }
        if(me1.kitype==0||me1.kitype==1){
            me1.movex=(60/fps)*Math.sin(me1.dir[0]*Math.PI/2)
            me1.movey=(60/fps)*Math.cos(me1.dir[0]*Math.PI/2)
            return
        }
    },
    /**@type {aiobjfunc}*/
    wasser:function(me1){
        if(promall[3].res&&me1.phy&&wasserphysik&&me1.fill!="Wasser"){
            me1.wasserfps+=60/fps
            let a = performance.now();
            if(fps+10>fpsav&&!collupdate&&fpsav+2>m4xfps){
                Wasserpsy(me1.minx,me1.miny,me1,me1.w,me1.h)
            }
            for(let i of myRect[loadmap]){
                if(i.environment&&fpsav+10>m4xfps)wassercolide(i,me1)
            }
            if(fps+10>fpsav&&!collupdate&&fpsav+2>m4xfps)wassertime=(wassertime*wassertimeanpassung)+((performance.now()-a)*(1-wassertimeanpassung))
        }
    },
    fire:function(me,speed=null){
        let graviins=[0,0]
        const posgravi=(Math.trunc(me.miny+me.h/2-miny)*(maxx-minx)+Math.trunc(me.minx+me.w/2)-minx)*4
        //console.log(posgravi)
        if(gravicache&&gravimap[posgravi]==1){
            graviins=[gravimap[posgravi+1],gravimap[posgravi+2]]
        }else{
            for (let i in myGravi[loadmap]){
                let posx=me.minx+me.w/2-myGravi[loadmap][i].minx
                posx-=Math.max(0,Math.min(posx,myGravi[loadmap][i].w))
                let posy=me.miny+me.h/2-myGravi[loadmap][i].miny
                posy-=Math.max(0,Math.min(posy,myGravi[loadmap][i].h))
                if(posx!==0||posy!==0){
                    let starke=(myGravi[loadmap][i].stärke/Math.max(myGravi[loadmap][i].abfac*Math.sqrt(Math.pow(posx,2)+Math.pow(posy,2)),0))
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
        }

        if(speed==null)speed=me.speed
        if(speed<=0)return
        let dist0=Infinity
        let dist1=Infinity
        const sin=Math.sin(me.winkel)
        const cos=Math.cos(me.winkel)
        const offsy=Math.sign(cos.toFixed(2))/2
        const offsx=Math.sign(sin.toFixed(2))/2
        //wegen offset kan es stoppen auserhalb der map
        for(let i=-2,y=me.miny+me.h/2-sin*i,x=me.minx+me.w/2-cos*i;i<Math.abs(speed)+20;i++,y-=sin,x-=cos){
            if(objcolmap[Math.round(y-miny+offsy)*(maxx-minx)+Math.round(x-minx+offsx)]>0||x-me.w/2<=minx||y-me.h/2<=miny||maxx<=x+me.w/2||maxy<=y+me.h/2){
                dist0=i;
                break
            }
        }
        for(let i=-2,y=me.miny+me.h/2-sin*i,x=me.minx+me.w/2-cos*i;i<Math.abs(speed)+20;i++,y-=sin,x-=cos){
            if(objcolmap[Math.round(y-miny-offsy)*(maxx-minx)+Math.round(x-minx-offsx)]>0||x-me.w/2<=minx||y-me.h/2<=miny||maxx<=x+me.w/2||maxy<=y+me.h/2){
                dist1=i;
                break
            }
        }
        
        //make 2 strahlen in direction
        //einer weiter oben einer weiter unten
        if(dist0==Infinity)dist0=dist1
        if(dist1==Infinity)dist1=dist0
        const wink=Math.atan((dist0-dist1)/1)
        if(debug&&kiinfo)debugtext+=
        "\ndist0: "+dist0+
        "\ndist1: "+dist1+
        "\nbounce: "+(wink*(180/Math.PI))+
        "\nsin: "+sin.toFixed(3)+
        "\ncos: "+cos.toFixed(3)

        me.winkel=Math.atan2(sin+Math.random()*me.randomnis-me.randomnis/2,cos+Math.random()*me.randomnis-me.randomnis/2)

        if(!isNaN(wink)&&(dist0<=Math.abs(speed)+2||dist1<=Math.abs(speed)+2)){
            //console.log(dist0+" "+dist1+" "+wink+" "+me.speed)
            //go in direction as mutch as allowed than go the other direction
            //if(dist0<0||dist1<0)dist0=dist1=Math.min(dist0,dist1)
            const dist=(dist0+dist1)/2
            
            me.movex=dist*cos
            me.movey=dist*sin
            //if(dist0<0||dist1<0)return
            me.winkel=me.winkel-wink-Math.PI
            me.winkel=Math.atan2(-Math.sin(me.winkel),-Math.cos(me.winkel))
            if(!me.bouncelast){
                me.bounce++
                me.bouncelast=true
                if(me.bounce>me.bouncemax){
                    clearTimeout(me.timer)
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this),1)
                    if(renderer==3&&!webglfallback)updatescene=true
                    return
                }
            }
            aiobj.fire(me,speed-Math.max(dist,0.1))
        }else{
            me.movex=-me.speed*cos
            me.movey=-me.speed*sin

            //console.log(me.winkel)
            //console.log(graviins)
            me.winkel=Math.atan2(sin+(graviins[1]*gravimulti),cos+(graviins[0]*gravimulti))
            //console.log(me.winkel)

            if(enableparticle)webgl2breakadd(
                me.minx+me.w/2,
                me.miny+me.h/2,
                [me.speed*cos*2,me.speed*sin*2],
                [1,0,0,1],
                5,
                1,
                0.1
            )
            me.updatet[0]=true
            me.bouncelast=false
        }
    },
    Boomerang:function(me){//vieleicht in anderen cpu kern
        if(!me.thrown){
            me.velo=[-Math.cos(me.winkel)*me.speed,-Math.sin(me.winkel)*me.speed]
            me.thrown=true
        }

        me.velo[0]+=((me.owner.minx+me.owner.w/2)-(me.minx+me.w/2))*me.tension//speed
        me.velo[1]+=((me.owner.miny+me.owner.h/2)-(me.miny+me.h/2))*me.tension//speed
        me.velo[0]*=me.dampening//abnahme
        me.velo[1]*=me.dampening//abnahme
        if(me.minx+me.velo[0]<minx)me.velo[0]=Math.max(0,me.velo[0])
        if(me.minx+me.w+me.velo[0]>maxx)me.velo[0]=Math.min(0,me.velo[0])
        if(me.miny+me.velo[1]<miny)me.velo[1]=Math.max(0,me.velo[1])
        if(me.miny+me.h+me.velo[1]>maxy)me.velo[1]=Math.min(0,me.velo[1])
        me.movex=me.velo[0]
        me.movey=me.velo[1]

        //wen in nähe und sehr wenig bewegt dan kill es
        if(Math.abs(me.velo[0])+Math.abs(me.velo[1])<0.1&&Math.sqrt(Math.pow((me.owner.minx+me.owner.w/2)-(me.minx+me.w/2),2)+Math.pow((me.owner.miny+me.owner.h/2)-(me.miny+me.h/2),2))<1){
            myRect[loadmap].splice(myRect[loadmap].indexOf(this),1)
            if(renderer==3&&!webglfallback)updatescene=true
        }
        me.updatet[0]=true
    }
}


/**@param {Array.<myRect>} me */
async function pathki(me=false){
    if(me!=false&&me.minx-minx<0||me.miny-miny<0||me.minx-minx>maxx||me.miny-miny>maxx){canfishmap=true;return}
    let test=[]
    for(let i of myRect[loadmap]){
        if(i.construck=="Wasser"){
            if(typeof(i.x)=="object"){
                test.push({x:i.x,y:i.y,mode:0})
            }else{
                test.push({x:[i.x,i.x+i.w,i.x+i.w,i.x],y:[i.y,i.y,i.y+i.h,i.y+i.h],mode:-1})
            }
        }else if(i.fishtoattack){
            if(typeof(i.x)=="object"){
                test.push({x:i.x,y:i.y,mode:2})
            }else{
                test.push({x:[i.x,i.x+i.w,i.x+i.w,i.x],y:[i.y,i.y,i.y+i.h,i.y+i.h],mode:1})
            }
        }else if(i.havecoll){
            if(typeof(i.x)=="object"){
                test.push({x:i.x,y:i.y,mode:1})
            }else{
                test.push({x:[i.x,i.x+i.w,i.x+i.w,i.x],y:[i.y,i.y,i.y+i.h,i.y+i.h],mode:0})
            } 
        }
    }
    /*
    wasser 0
    alles andere 1
    toatack1 2
    */
    workerpk.postMessage([Math.floor(minx),Math.floor(miny),Math.ceil(maxx),Math.ceil(maxy),test])
    workerpk.onmessage=(e)=>{fishmap=new Uint32Array(e.data);canfishmap=true}
}
const aiobjwebworker={
    /**@type {aiobjfunc}*/
    koopaki:function(me1){
        let speed
        if(me1.dmg[0]==3)speed=1
        if(me1.dmg[0]==2)speed=0
        if(me1.dmg[0]==1)speed=5
        if(me1.dir[0]==0)me1.dir[0]=1
        let tlaki=true,traki=true,colayki=Infinity
        const maxdistcol=1+Math.max(60/m4xfps,1)*speed
        const maxdistcolground=15+Math.max(60/m4xfps,1)*speed
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+5-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+me1.h-5-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
    
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-2+i-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)-minx)if(objcolmap[i1]>0){colayki=i;break}
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-2+i-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-minx)if(objcolmap[i1]>0){colayki=i;break}
    
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+5-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+me1.h-5-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
    
        if (colayki==Infinity&&me1.kitype){
            //console.log("richtungswechsel")
            me1.dir[0]*=-1
        }else{
            if(colayki<2)me1.movey=-1*60/m4xfps
            if(colayki>2&&me1.miny+me1.h<=maxy)me1.movey=1*60/m4xfps
    
        }
        if (me1.dir[0]==-1){me1.dir[0]=tlaki?-1:traki?1:0}
        if (me1.dir[0]==1){me1.dir[0]=traki?1:tlaki?-1:0}

        //del old point add new point
        me1.movex=me1.dir[0]*speed
        me1.velo[0]=me1.dir[0]
        me1.lastupdatetime[0]=performance.now()
        me1.updatet[0]=true
    },
    /**@type {aiobjfunc}*/
    ki:function(me1){
        if(me1.dir[0]==0)me1.dir[0]=1
        let tlaki=true,traki=true,colayki=Infinity
        const maxdistcol=1+Math.max(60/m4xfps,1)
        const maxdistcolground=15+Math.max(60/m4xfps,1)
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+5-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.miny+me1.h-5-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-i-minx)if(objcolmap[i1]>0)tlaki=false
    
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-2+i-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)-minx)if(objcolmap[i1]>0){colayki=i;break}
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.miny+me1.h-2+i-miny)*(maxx-minx)+Math.trunc(me1.minx+1)-minx)if(objcolmap[i1]>0){colayki=i;break}
    
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+5-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.miny+me1.h-5-miny)*(maxx-minx)+Math.trunc(me1.minx+me1.w-1)+i-minx)if(objcolmap[i1]>0)traki=false
    
        if (colayki==Infinity&&me1.kitype){
            //console.log("richtungswechsel")
            me1.dir[0]*=-1
        }else{
            if(colayki<2)me1.movey=-1*60/m4xfps
            if(colayki>2&&me1.miny+me1.h<=maxy)me1.movey=1*60/m4xfps
    
        }
        if (me1.dir[0]==-1){me1.dir[0]=tlaki?-1:traki?1:0}
        if (me1.dir[0]==1){me1.dir[0]=traki?1:tlaki?-1:0}

        //del old point add new point
        me1.movex=me1.dir[0]
        //me1.velo[0]=me1.dir[0]
        me1.lastupdatetime[0]=performance.now()
        me1.updatet[0]=true
    }

}
const neuronetworks={
    playerai:{
        kiloop:function(){
            if(resetafter<(performance.now()-resetcounter)){kidiewin();return}

            for(let sellectetki in objarrays){
                let kiobj=objarrays[sellectetki]
                if(kiobj.dead)continue
                if(Math.abs(kiobj.velo[0])+Math.abs(kiobj.velo[1])<=0.2||kiobj.velo[0]==0){
                    kiobj.oldkeystime+=1
                }else{
                    kiobj.oldkeystime=0
                }
                if(kiobj.oldkeystime>oldkeystimemax){
                    kiobj.dead=true
                    kiobj.newtime=performance.now()
                    kiobj.oldkeystime=0
                    //console.log(sellectetki+" died")
                    kiobj.setx=130
                    kiobj.sety=580
                    kiobj.keys[0]=0
                    kiobj.keys[1]=0
                    kiobj.keys[2]=0
                    kiobj.keys[3]=0
                    kiobj.keys[4]=0
                    continue
                }
            
                let inputs=[]
                inputs.push(...kiobj.graviins)
                inputs.push(minx,miny,maxx,maxy)
                inputs.push(kiobj.statsnum[0])
                inputs.push(kiobj.inwater[0])
                //inputs.push(anime.minx,anime.miny,anime.w,anime.h)
                //console.log(kiobj.miny+kiobj.h/2-viewdistki)
            
                for(let i=Math.round(kiobj.miny+kiobj.h/2-viewdistki);i<Math.round(kiobj.miny+kiobj.h/2+viewdistki);i+=viewscaledown){
                    for(let i1=Math.round(kiobj.minx+kiobj.w/2-viewdistki);i1<Math.round(kiobj.minx+kiobj.w/2+viewdistki);i1+=viewscaledown){
                        if(i<=miny||i1<=minx||maxy<=i||maxx<=i1){
                            inputs.push(-1)
                        }else{
                            inputs.push(objenemymap[i*(maxx-minx)+i1-minx]/127.5-1)
                        }
                    }
                }
                neat.setInputs(inputs, sellectetki); // Sets the inputs of the creature indexed as "index".
            }
            if(objarrays.every(i=>i.dead)){kidiewin();return}

            neat.feedForward()
            const ergki=neat.getDesicions()
            for(let sellectetki in objarrays){
                const kiobj=objarrays[sellectetki]
                if(kiobj.dead)continue
                kiobj.keys[0]=(ergki[sellectetki]&0b00001)>0?1:0//w
                kiobj.keys[1]=(ergki[sellectetki]&0b00010)>0?1:0//a
                kiobj.keys[2]=(ergki[sellectetki]&0b00100)>0?1:0//s
                kiobj.keys[3]=(ergki[sellectetki]&0b01000)>0?1:0//d
                kiobj.keys[4]=(ergki[sellectetki]&0b10000)>0?1:0//r
                if(ergki[sellectetki]==0b11111)kiobj.dead=true
            }
            //console.info(neat.getDesicions())
        },
        kidiewin:function(){
            for(let i of objarrays){
                i.keys[0]=0
                i.keys[1]=0
                i.keys[2]=0
                i.keys[3]=0
                i.keys[4]=0
            }
            //console.groupCollapsed("ki")
            for(let sellectetki in objarrays){
                const kiobj=objarrays[sellectetki]
                let dist=Infinity
                for(let i of finki){
                    dist=Math.min(Math.sqrt(Math.pow(i[0]-(kiobj.minx+kiobj.w/2),2)+Math.pow(i[1]-(kiobj.miny+kiobj.h/2),2)),dist)
                }
        
        
                //will kürzerste distanz zu ziel und höchste statsnum[0] und leben
                //mache die alle in ner 0-1 spanne
                const fitness=((
                        (kiworstfitnes-dist)/kiworstfitnes                          *(kipriorisirung[0]/kipriorisirungmax)+
                        (resetafter-(kiobj.newtime-kiobj.kitime))/resetafter        *(kipriorisirung[1]/kipriorisirungmax)
                    )/kipriorisirung.length)*100
                
        
                //console.log("fitness"+sellectetki+": "+fitness)
                neat.setFitness(fitness, sellectetki);//funct net
            }
            //console.log("best ai: "+neat.bestCreature())
            //console.groupEnd()
            neat.doGen();
            resetcounter=performance.now()
            for(let i of objarrays){
                i.oldkeystime=0
                i.kitime=resetcounter
                i.dead=false
                i.setx=20
                i.sety=680
            }

        }
    },
}

function kidiewin(kiobj){
    kiobj.worker.postMessage({die:true,num:myRect[loadmap].filter(i=>i.worker==kiobj.worker).findIndex(i=>i==kiobj)})
}
promallres[2]()