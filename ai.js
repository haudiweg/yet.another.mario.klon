'use strict';
/**
 * @callback aiobjfunc
 * @param {Array.<myRect>} me 
 * @param {Array.<myRect>} me1
 * @param {boolean} first
*/

const aiobj={
    /**@type {aiobjfunc}*/
    ki:function(me,me1,first) {
        if(fps+10<fpsav)return
        if(first==false)return
        let tlaki=true,traki=true,colayki=Infinity
        const maxdistcol=10
        const maxdistcolground=15
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.y+1-miny)*(maxx-minx)+Math.trunc(me1.x+1)-i-minx)if(objcolmap[i1]>1)tlaki=false
        for(let i=0,i1=0;i<maxdistcol&&tlaki;i++,i1=Math.trunc(me1.y+me1.h-1-miny)*(maxx-minx)+Math.trunc(me1.x+1)-i-minx)if(objcolmap[i1]>1)tlaki=false
    
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.y+me1.h-1+i-miny)*(maxx-minx)+Math.trunc(me1.x+me1.w-1)-minx)if(objcolmap[i1]>1){colayki=i;break}
        for(let i=0,i1=0;i<maxdistcolground;i++,i1=Math.trunc(me1.y+me1.h-1+i-miny)*(maxx-minx)+Math.trunc(me1.x+1)-minx)if(objcolmap[i1]>1){colayki=i;break}
    
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.y+1-miny)*(maxx-minx)+Math.trunc(me1.x+me1.w-1)+i-minx)if(objcolmap[i1]>1)traki=false
        for(let i=0,i1=0;i<maxdistcol&&traki;i++,i1=Math.trunc(me1.y+me1.h-1-miny)*(maxx-minx)+Math.trunc(me1.x+me1.w-1)+i-minx)if(objcolmap[i1]>1)traki=false
    
        if (colayki==Infinity&&me1.kitype){
            //console.log("richtungswechsel")
            me1.dir*=-1
        }else{
            if(colayki<=2)me1.y--
            if(colayki>=2&&me1.y+me1.h<=maxy)me1.y++
    
        }
        if (me1.dir==-1){me1.dir=tlaki?-1:traki?1:0}
        if (me1.dir==1){me1.dir=traki?1:tlaki?-1:0}
        me1.x+=me1.dir
        toupdateshadow.add(me1)
    },
    /**@type {aiobjfunc}*/
    movingblock:function(me,me1,first) {//sol auch für dreiecke...
        if (typeof(me1.x)=="object")return
        if(first){
            const x=Math.sign(me1.x-me1.option[Math.abs(me1.dir)>>1<<1])
            const y=Math.sign(me1.y-me1.option[1+(Math.abs(me1.dir)>>1<<1)])
            me1.x-=x
            me1.y-=y
            if(x==0&&y==0&&!(me1.dir&1)){me1.dir=(me1.dir+2)%(me1.option.length)}
            if(x==0&&y==0&&me1.dir&1){
               me1.dir+=2
               if(Math.abs(me1.dir)>=me1.option.length){
                    me1.dir*=-1
                   me1.dir+=2
               }
            }
            toupdateshadow.add(me1)
        }
        if (me1==me.umgebung[2][0]&&me1.y>=(me.y+me.h)-5&&me1.y<=me.y+me.h+5){//achtung gravi
            me.x-=x
            me.y-=y
        }
    },
    /**@type {aiobjfunc}*/
    breakingblock:function(me,me1,first) {
        if(me.umgebung[me.rich4arr[2]][0]==me1){
            if(timeout!==""){return}
            timeout=setTimeout(()=>{
                const telem=me1
                setTimeout(()=>{
                    myRect[loadmap].push(telem)
                    needcolmap=true
                    if(typeof(telem.shadowadd)!="undefined")for(let i of me1.shadowadd)toupdateshadow.add(i)
                    if(typeof(telem.shadowadd)!="undefined"&&me1.static){
                        if(renderer==3)updatescene=true
                        if(renderer==0)renderbackground=true
                    }
                    timeout=""
                },me1.option[1]*1e3)
                if(typeof(me1.shadowadd)!="undefined")for(let i of me1.shadowadd)toupdateshadow.add(i)
                if(typeof(me1.shadowadd)!="undefined"&&me1.static){
                    if(renderer==3)updatescene=true
                    if(renderer==0)renderbackground=true
                }
                myRect[loadmap].splice(myRect[loadmap].findIndex(it=>it==me1),1)
                needcolmap=true
            },me1.option[0]*1e3)
        }else if(timeout!==""){
            clearTimeout(timeout)
            timeout=""
        }
    },
    /**@type {aiobjfunc}*/
    fish:function(me,me1,first){//vieleicht in andern cpu kern  wen obj in block ist sol path finding obj da raus lotsen
        if(first==false)return
        if(me==undefined)me1.kitype=0
        let dis=Math.sqrt(Math.pow(me1.x-me.x,2)+Math.pow(me1.y-me.y,2),2)
        let maxdist=500
        breakki:if(me1.kitype==4||(me1.kitype==3&&dis<maxdist)){
            needfishmap=true
            if(fishmap[0]==undefined){break breakki}
            let min=[]
            let minnum=Infinity
            for(let i=-1;i<=1;i++){
                for(let i1=-1;i1<=1;i1++){
                    if(i==0&&i1==0)continue
                    const newnum=(fishmap[Math.round(me1.y+i-miny)*Math.round(maxx-minx)+Math.round(me1.x+i1-minx)]
                                +fishmap[Math.round(me1.y+i-miny)*Math.round(maxx-minx)+Math.round(me1.x+me1.w+i1-minx)]
                                +fishmap[Math.round(me1.y+me1.h+i-miny)*Math.round(maxx-minx)+Math.round(me1.x+i1-minx)]
                                +fishmap[Math.round(me1.y+me1.h+i-miny)*Math.round(maxx-minx)+Math.round(me1.x+me1.w+i1-minx)])
                    if(minnum>=newnum){minnum=newnum;min=[i,i1]}
                }
            }
            if(minnum==-Infinity){break breakki}
            me1.x+=min[1]
            me1.y+=min[0]
            return
        }
        if(me1.kitype==4||me1.kitype==3||me1.kitype==2||(me1.kitype==1&&dis<maxdist)){
            let winkel=Math.atan((me.y-me1.y)/(me.x-me1.x))
            me1.x+=(60/fps)*Math.sin(winkel)
            me1.y+=(60/fps)*Math.cos(winkel)
            return
        }
        if(me1.kitype==0||me1.kitype==1){
            me1.x+=(60/fps)*Math.sin(me1.dir*Math.PI/2)
            me1.y+=(60/fps)*Math.cos(me1.dir*Math.PI/2)
            return
        }
    },
    /**@type {aiobjfunc}*/
    pipe:function(me,me1,first){
        if(me1.ro==0&&me.umgebung[0][0]==me1&&me.umgebung[0][1]<=5&&keys.getkeyovermin(me.controls.w)){if(promall[3].res){pani(me1.ro,me1.wx,me1.wy,me)}else{me.x=me1.wx;me.y=me1.wy}}
        if(me1.ro==1&&me.umgebung[3][0]==me1&&me.umgebung[3][1]<=5&&keys.getkeyovermin(me.controls.d)){if(promall[3].res){pani(me1.ro,me1.wx,me1.wy,me)}else{me.x=me1.wx;me.y=me1.wy}}
        if(me1.ro==2&&me.umgebung[2][0]==me1&&me.umgebung[2][1]<=5&&keys.getkeyovermin(me.controls.s)){if(promall[3].res){pani(me1.ro,me1.wx,me1.wy,me)}else{me.x=me1.wx;me.y=me1.wy}}
        if(me1.ro==3&&me.umgebung[1][0]==me1&&me.umgebung[1][1]<=5&&keys.getkeyovermin(me.controls.a)){if(promall[3].res){pani(me1.ro,me1.wx,me1.wy,me)}else{me.x=me1.wx;me.y=me1.wy}}
    },
    /**@type {aiobjfunc}*/
    finish:function(me,me1,first){
        for (let i1 of me.umgebung){
            if(i1[0]==me1&&i1[1]<=5){
                console.log("finish")
                stopmain=false;
                winscreen()
            }
        }
    },
    /**@type {aiobjfunc}*/
    waypoint:function(me,me1,first){
        for (let i1 of me.umgebung){
            if(i1[0]==me1&&i1[1]<=5){
                console.log("waypoint")
                me.sx=me.x
                me.sy=me.y
            }
        }
    },
    /**@type {aiobjfunc}*/
    wasser:function(me,me1,first){
        if(promall[3].res&&me1.phy&&wasserphysik){
            if(first)me1.wasserfps+=60/fps
            let a = performance.now();
            if(first&&fps+10>fpsav&&!collupdate&&fpsav+2>m4xfps)Wasserpsy(me1.x,me1.y,me1,me1.w,me1.h)
            if(fpsav+10>m4xfps)wassercolide(me,me1)
            if(fps+10>fpsav&&!collupdate&&fpsav+2>m4xfps)wassertime=(wassertime*wassertimeanpassung)+((performance.now()-a)*(1-wassertimeanpassung))
        }
    }
}
/**@param {Array.<myRect>} me */
async function bounce(me){
    let dist0=Infinity
    let dist1=Infinity
    for(let i=0,i2=0,i3=0,i1=Math.trunc(me.y+(me.h/2)+Math.sign(Math.cos(me.winkel).toFixed(2))-miny)*(maxx-minx)+Math.trunc(me.x+(me.w/2)+Math.sign(Math.sin(me.winkel).toFixed(2)))-minx;i<Math.abs(me.speed);i++,i2+=Math.sin(me.winkel),i3+=Math.cos(me.winkel)){if(objcolmap[i1-(maxx-minx)*Math.trunc(i2)-Math.trunc(i3)]>0){dist0=i;break}}
    for(let i=0,i2=0,i3=0,i1=Math.trunc(me.y+(me.h/2)-Math.sign(Math.cos(me.winkel).toFixed(2))-miny)*(maxx-minx)+Math.trunc(me.x+(me.w/2)-Math.sign(Math.sin(me.winkel).toFixed(2)))-minx;i<Math.abs(me.speed);i++,i2+=Math.sin(me.winkel),i3+=Math.cos(me.winkel)){if(objcolmap[i1-(maxx-minx)*Math.trunc(i2)-Math.trunc(i3)]>0){dist1=i;break}}

    let wink=Math.atan((dist0-dist1)/2)
    if(debug)debugtext+=
    "\ndist0: "+dist0+
    "\ndist1: "+dist1+
    "\nbounce: "+(wink*(180/Math.PI))+
    "\nsin: "+Math.sin(me.winkel).toFixed(3)+
    "\ncos: "+Math.cos(me.winkel).toFixed(3)

    if(!isNaN(wink)&&(dist0<Math.abs(me.speed)||(dist1<Math.abs(me.speed)))){
        me.winkel=me.winkel-wink-Math.PI
        me.winkel=Math.atan2(Math.sin(me.winkel),Math.cos(me.winkel))
    }
    me.x-=Math.sign(me.speed)*Math.cos(me.winkel)
    me.y-=Math.sign(me.speed)*Math.sin(me.winkel)
}
/**@param {Array.<myRect>} me */
async function pathki(me){
    if(me.x-minx<0||me.y-miny<0||me.x-minx>maxx||me.y-miny>maxx){canfishmap=true;return}
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
promallres[2]()