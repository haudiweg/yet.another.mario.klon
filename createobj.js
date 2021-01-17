//@ts-check
'use strict';
/**
 * Options for showing a dialog.
 * @callback createobjfunc
 * @param {Array.<myRect>} arr obj properys
 * @param {...([number,number,number,number,Object]|[number,number,number,number]|[Array,Array,Object]|[Array,Array])} opt obj properys
 * @return {void} Nothing
 */

/**
 * @constructor
 * include all functions to create obj
 */
const createobj={
/**@type {createobjfunc}*/
    Shape:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.damage={
            t:this,
            collide:function(me){
                if(me.statsnum!=3)return
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
                if(rumble&&me.construck=="Player")keys.vibrate(87,0,1)
                needcolmap=true
            },
        };
        this.havcoll = true;
        this.fill = "grey";
        this.dest = false;
        this.static = true;
        this.coindropdest = 10;
        this.reibung = 0.1;
        this.haftreibung = 0.3;
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
Onewayblock:function(arr,...opt) {
    let defaultarr=myRect;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.alloweddirections=[0,0,1,0];
    this.havcoll = true;
    this.fill = "blue";
    this.dest = false;
    this.static = true;
    this.coindropdest = 10;
    this.reibung = 0.1;
    this.haftreibung = 0.3;
    createobjhelper.pos.call(this,opt)
    this.fillstr=this.fill;
    createobjhelper.convtoshared.call(this)
    createobjhelper.check.call(this,arr,defaultarr)
},
/**@type {createobjfunc}*/
    Grassani:function(arr,...opt){
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.fillbackup = "rgba(0,0,0,0)";
        this.fill = "Grassstraw";
        this.ignoresun = false;
        this.nodraw = true;
        this.havcoll = false;
        this.dest = false;
        this.static = true;
        this.reibung = 0.1;
        this.haftreibung = 0.3;
        this.grassrandomfactor = 0.8;//0.8
        this.texturrichtung = [0,1];
        this.audio=true
        this.audioobj={}
        this.audiogen=function(me){
            let gain=audioctx.createGain()
            let panner=audioctx.createPanner()
            if(soundHRTF)panner.panningModel = 'HRTF';
            gain.connect(panner);
            me.audioobj.panner=panner
            me.audioobj.gain=gain
            me.createtaudio=true
        }
        this.audiorem=function(me){
            try{
                me.audioobj.osc.stop();
                me.audioobj.osc.disconnect(me.audioobj.gain);
                me.audioobj.panner.disconnect(sound.grass);
            }catch(e){}
            me.audioobj.gain.disconnect(me.audioobj.panner)
            me.audioobj={}
            me.createtaudio=false
        }
        this.grassspawn=function(...opt){
            let gen={}
            gen.x=0
            gen.y=0
            gen.w=1
            gen.h=10
            gen.rotation=0
            gen.randomwind=[Math.random()*2-1,Math.random()*2-1]
            gen.velo=[0,0]
            gen.randomwindtimer=[0,0,Math.random(),0]
            gen.strengthgwind=0.9+(Math.random()*0.1)
            gen.strengthiwind=0.3+(Math.random()*0.1)
            gen.strengthvelo=0.9+(Math.random()*0.1)
            gen.spitze=Math.random()>=0.5
            gen.color=[0+Math.random()*0.2,1-Math.random()*0.2,0+Math.random()*0.2,1]

            const keys=Object.keys(gen)
            if(Array.isArray(opt)){//das hir alles fixen und jshint
                let test=true
                for(let i=0;i<opt.length;i++){
                    let test1=false

                    if(i==8&&opt.length==9){//kucke ob stelle 8 array oder obj ist  wen opt 8 lang ist
                        if(Array.isArray(opt[i])&&opt[i].length==2)test1=true
                        if(typeof(opt[i])=="object"&&!Array.isArray(opt[i]))test1=true
                    }else if(i==opt.length-1){
                        if(typeof(opt[i])=="number")test1=true
                        if(typeof(opt[i])=="object"&&!Array.isArray(opt[i]))test1=true
                    }else{
                        if(typeof(opt[i])=="number")test1=true
                    }
                    if(!test1){test=false;break}
                }

                if(test){
                    for(let i=0;i<opt.length;i++){
                        if(typeof(opt[i])=="object"&&!Array.isArray(opt[i])){
                            for(let i1 of keys)if(opt[i].includes(i1))gen[i1]=opt[i][i1]
                        }else{
                            gen[keys[i]]=opt[i]
                        }
                    }
                    this.grass.push(gen)
                }
            }else{
                console.warn("syntax error grass")
            }
        }
        this.grass=[];
        this.firsts=[];
        this.damage={
            t:this,
            audiocollideendstatus:0,
            audiocollidestart:function(){
                let osc=audioctx.createOscillator();
                osc.frequency.value = 500;
                osc.start()
                osc.connect(this.t.audioobj.gain)
                this.t.audioobj.osc=osc
                this.t.audioobj.panner.connect(sound.grass);
            },
            audiocollide:function(me){
                const velo=Math.abs(me.velo[0])+Math.abs(me.velo[1])
                if(this.t.audioobj.gain.v==velo)return
                this.t.audioobj.gain.gain.setValueAtTime(Math.max(0,Math.min(1,velo)), audioctx.currentTime)
                this.t.audioobj.gain.v=velo
                if(velo<0.1)return
                const mingx=this.t.minx
                const mingy=this.t.miny
                if(this.t.audioobj.panner.positionX){
                    this.t.audioobj.panner.positionX.setValueAtTime(Math.max(this.t.minx,Math.min(me.minx+me.w/2,this.t.minx+this.t.w)), audioctx.currentTime);
                    this.t.audioobj.panner.positionY.setValueAtTime(Math.max(this.t.miny,Math.min(me.miny+me.h/2,this.t.miny+this.t.w)), audioctx.currentTime);
                }else{
                    this.t.audioobj.panner.setPosition(Math.max(this.t.minx,Math.min(me.minx+me.w/2,this.t.minx+this.t.w)),Math.max(this.t.miny,Math.min(me.miny+me.h/2,this.t.miny+this.t.w)),0);
                }
            },
            audiocollideend:function(){
                    this.t.audioobj.osc.stop();
                    this.t.audioobj.osc.disconnect(this.t.audioobj.gain);
                    this.t.audioobj.panner.disconnect(sound.grass);
                    delete this.t.audioobj.osc
            }
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Grass:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fillbackup = "green";
        this.fill = "Grass";
        this.dest = false;
        this.static = true;
        this.reibung = 0.1;
        this.haftreibung = 0.3;
        this.texturrichtung = [0,1];
        this.überlagerung = 1.0;
        this.savemin = 50;
        this.randomnis = 0.2;
        this.abfac = 0.1;
        this.abnahmeheight = 100;
        this.offsetheight = 0;
        this.filtersmove = 0.1;
        this.grassstone = 50;
        this.grasstexturgrass = [[0,0],[50,175],[0,0],255];
        this.grasstexturdirt = [[50,102],[50,102],[50,102],255];
        this.grasstexturstone = [[100,39],[100,-31],[50,-16],255];
        this.grassfilter = 1;

        this.randomnisremove = 0.2;
        this.abfacremove = 0.45;
        this.abnahmeheightremove = 1;
        this.offsetheightremove = 0;
        this.filtersmoveremove = 0.8;
        this.grassremovefilter = 1;

        createobjhelper.pos.call(this,opt)
        this.gennumbers=[[],0,0,0,0]
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
    Ground:function(arr,...opt){
        if(weaterinfo!=null&&(weaterinfo.weather[0].main=="Snow"||weaterinfo.main.temp_min<0)){
            createobj.Snow.apply(this,arguments)
        }else{
            createobj.Grass.apply(this,arguments)
        }
    },
/**@type {createobjfunc}*/
    Snow:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fillbackup = "LightGray";
        this.fill="Snow";
        this.dest = false;
        this.static = true;
        this.reibung = 0.1;
        this.haftreibung = 0.5;
        this.texturrichtung = [0,1];
        this.überlagerung = 1.0;
        this.savemin = 50;
        this.randomnis = 0.2;
        this.abfac = 0.16;
        this.abnahmeheight = 100;
        this.offsetheight = 0;
        this.filtersmove = 0.1;
        this.grassfilter = 1;

        this.randomnisremove = 0.2;
        this.abfacremove = 0.45;
        this.abnahmeheightremove = 1;
        this.offsetheightremove = 0;
        this.filtersmoveremove = 0.8;
        this.grassremovefilter = 1;

        this.snowstone = 50;
        this.snowtextursnow = [[30,205],[30,205],[20,225],255];
        this.snowtexturdirt = [[50,102],[50,102],[50,102],255];
        this.snowtexturstone = [[100,39],[100,-31],[50,-16],255];
        createobjhelper.pos.call(this,opt)
        this.gennumbers=[[],0,0,0,0]
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Wasser:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.fillbackup = "rgba(0,0,200,0.7)";
        this.fill = "Wasser";
        this.havcoll = false;
        this.wasserfps = 0;
        this.phy = false;
        this.allblue = false;
        this.type = "wasser";
        this.übergang = 0.99;
        this.stärke = 30;
        this.stärkemit = -10;
        this.smovnes = 0.5;
        this.stärke1 = 2;
        this.stärkemit1 = 0.7;
        this.einpendelphasse = 0;
        this.down = 30;
        this.schaum = 2;
        this.Spread = 0.4;
        this.j = 8;//8
        this.TargetHeight = 0;
        this.dampening = 0.001;//0.025
        this.tension = 0.001;//0.025
        this.static = false;
        this.wassertexturschaum = 3372220415;
        this.wassertexturwasser = 1690862145
        this.wasserphycollision = false;
        this.wasserphyplayerwave = false;
        createobjhelper.pos.call(this,opt)
        this.wasserphysa=[new Float32Array(this.w),new Float64Array(this.w)]
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Powerup:function(arr,...opt) {
        let defaultarr=myRect;
        this.velo = [0,0];
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = false;
        this.fill = "gray";
        this.dmg = 0;
        this.md = 0;
        this.dir = 0;
        this.type = 0;
        this.managefromplayer = true;
        this.static = false;
        this.damage={
            t:this,
            jump:function(me){
                if (me.getstats.powerup.includes(this.t.md)){
                    me.statsnum[0]=this.t.md
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{statsnum:me.statsnum[0]},playersendid:me.playersendid,id:multiplayerid})
                }
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
            },
            collide:function(me){
                if (me.getstats.powerup.includes(this.t.md)){
                    me.statsnum[0]=this.t.md
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{statsnum:me.statsnum[0]},playersendid:me.playersendid,id:multiplayerid})
                }
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
            },
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Enemy:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.velo = [0,0];
        this.type = "ki";
        this.havcoll = false;
        this.fill = "gray";
        this.dmg = 0;
        this.kitype = 0;
        this.dir = 1;
        this.managefromplayer = true;
        this.static = false;
        this.damage={
            t:this,
            fire:function(){
                if(this.t.dmg[0]>0)this.t.dmg[0]--
                if(this.t.dmg[0]==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            jump:function(){
                if(this.t.dmg[0]>0)this.t.dmg[0]--
                if(this.t.dmg[0]==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            collide:function(me,nokill){
                if(nokill)return
                if (me.statsnum[0]>0){
                    console.log("dmg")
                    me.statsnum[0]=me.getstats.minus
                    me.nokill=1
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{statsnum:me.statsnum[0]},playersendid:me.playersendid,id:multiplayerid})
                }else if (me.dmg[0]>0){
                    console.log("kill")
                    me.x.set(me.sx)
                    me.y.set(me.sy)
                    me.dmg[0]--
                    me.nokill=1
                    if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
                    if(renderer==0)renderbackground=true
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y},playersendid:me.playersendid,id:multiplayerid})
                }else{
                    console.log("kill no live")
                    me.x.set(me.sx=[...me.dx])
                    me.y.set(me.sy=[...me.dy])
                    me.dmg[0]=5
                    me.nokill=1
                    if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
                    if(renderer==0)renderbackground=true
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y},playersendid:me.playersendid,id:multiplayerid})
                }
                if(me==anime)guistats()
                if(renderer==3)updatescene=true
            }
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Gumpa:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.velo = [0,0];
        this.type = "ki";
        this.havcoll = false;
        this.fill = "gray";
        this.dmg = 0;
        this.kitype = 0;
        this.dir = 1;
        this.managefromplayer = true;
        this.static = false;
        this.damage={
            t:this,
            fire:function(){
                if(this.t.dmg[0]>0)this.t.dmg[0]--
                if(this.t.dmg[0]==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            jump:function(){
                if(this.t.dmg[0]>0)this.t.dmg[0]--
                if(this.t.dmg[0]==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            collide:function(me,nokill){
                if(nokill)return
                if (me.statsnum[0]>0){
                    console.log("dmg")
                    me.statsnum[0]=me.getstats.minus
                    me.nokill=1
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{statsnum:me.statsnum[0]},playersendid:me.playersendid,id:multiplayerid})
                }else if (me.dmg[0]>0){
                    console.log("kill")
                    me.x.set(me.sx)
                    me.y.set(me.sy)
                    me.dmg[0]--
                    me.nokill=1
                    if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
                    if(renderer==0)renderbackground=true
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y},playersendid:me.playersendid,id:multiplayerid})
                }else{
                    console.log("kill no live")
                    me.x.set(me.sx=[...me.dx])
                    me.y.set(me.sy=[...me.dy])
                    me.dmg[0]=5
                    me.nokill=1
                    if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
                    if(renderer==0)renderbackground=true
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y},playersendid:me.playersendid,id:multiplayerid})
                }
                if(me==anime)guistats()
                if(renderer==3)updatescene=true
            }
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Koopa:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.velo = [0,0];
        this.type = "koopaki";
        this.havcoll = false;
        this.fill = "red";
        this.dmg = 3;
        this.kitype = 1;
        this.dir = 1;
        this.managefromplayer = true;
        this.static = false;
        this.animation={
            //frames (auch komma werte), bildurl img
            //trigger sol return [bool,importance,this]
            fillpicwlg:{
                pic:new Map([
                    [0,["img/Koopa/KoopaLinks.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==-1&&this.t.dmg[0]==3&&this.t.kitype==0,0,this]
                },
                aniframe:0
            },
            fillpicwrg:{
                pic:new Map([
                    [0,["img/Koopa/KoopaRechts.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==1&&this.t.dmg[0]==3&&this.t.kitype==0,0,this]
                },
                aniframe:0
            },
            fillpicwlshellg:{
                pic:new Map([
                    [0,["img/Koopa/KoopaPanzerLinks.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==-1&&(this.t.dmg[0]==1||this.t.dmg[0]==2)&&this.t.kitype==0,0,this]
                },
                aniframe:0
            },
            fillpicwrshellg:{
                pic:new Map([
                    [0,["img/Koopa/KoopaPanzerRechts.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==1&&(this.t.dmg[0]==1||this.t.dmg[0]==2)&&this.t.kitype==0,0,this]
                },
                aniframe:0
            },

            fillpicwlr:{
                pic:new Map([
                    [0,["img/Koopa/KoopaLinksRot.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==-1&&this.t.dmg[0]==3&&this.t.kitype==1,0,this]
                },
                aniframe:0
            },
            fillpicwrr:{
                pic:new Map([
                    [0,["img/Koopa/KoopaRechtsRot.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==1&&this.t.dmg[0]==3&&this.t.kitype==1,0,this]
                },
                aniframe:0
            },
            fillpicwlshellr:{
                pic:new Map([
                    [0,["img/Koopa/KoopaPanzerLinksRot.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==-1&&(this.t.dmg[0]==1||this.t.dmg[0]==2)&&this.t.kitype==1,0,this]
                },
                aniframe:0
            },
            fillpicwrshellr:{
                pic:new Map([
                    [0,["img/Koopa/KoopaPanzerRechtsRot.svg"]],
                ]),
                get trigger(){
                    return [this.t.dir[0]==1&&(this.t.dmg[0]==1||this.t.dmg[0]==2)&&this.t.kitype==1,0,this]
                },
                aniframe:0
            },
        }
        createobjhelper.animation.call(this)
        this.damage={
            t:this,
            fire:function(){
                if(this.t.dmg[0]>0)this.t.dmg[0]--
                if(this.t.dmg[0]==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            groundpound:function(me){
                me.velo[me.rich2arr[1]]+=me.rich2[me.rich2arr[1]]*2
                if(this.timer!=undefined)clearInterval(this.timer)
                if(this.t.dmg[0]==3){
                    this.t.dmg[0]=2
                    this.timer=setTimeout(()=>{this.t.dmg[0]=3},10000);
                    return
                }
                if(this.t.dmg[0]==2){
                    this.t.dir[0]=Math.sign((this.t.minx+this.t.w/2)-(me.minx+me.w/2))
                    this.t.dmg[0]=1
                    return
                }
                if(this.t.dmg[0]==1){
                    this.t.dmg[0]=2
                    this.timer=setTimeout(()=>{this.t.dmg[0]=3},10000);
                    return
                }
                //walk
                //shell no speed
                //shell speed
            },
            jump:function(me){
                me.velo[me.rich2arr[1]]+=me.rich2[me.rich2arr[1]]*2
                if(this.timer!=undefined)clearInterval(this.timer)
                if(this.t.dmg[0]==3){
                    this.t.dmg[0]=2
                    this.timer=setTimeout(()=>{this.t.dmg[0]=3},10000);
                    return
                }
                if(this.t.dmg[0]==2){
                    this.t.dir[0]=Math.sign((this.t.minx+this.t.w/2)-(me.minx+me.w/2))
                    this.t.dmg[0]=1
                    return
                }
                if(this.t.dmg[0]==1){
                    this.t.dmg[0]=2
                    this.timer=setTimeout(()=>{this.t.dmg[0]=3},10000);
                    return
                }
                //3walk
                //2shell no speed
                //1shell speed
            },
            collide:function(me,nokill){
                if(this.t.dmg[0]==2){
                    this.t.dir[0]=Math.sign((this.t.minx+this.t.w/2)-(me.minx+me.w/2))
                    this.t.dmg[0]=1
                    return
                }
                if(nokill)return
                if (me.statsnum[0]>0){
                    console.log("dmg")
                    me.statsnum[0]=me.getstats.minus
                    me.nokill=1
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{statsnum:me.statsnum[0]},playersendid:me.playersendid,id:multiplayerid})
                }else if (me.dmg[0]>0){
                    console.log("kill")
                    me.x.set(me.sx)
                    me.y.set(me.sy)
                    me.dmg[0]--
                    me.nokill=1
                    if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
                    if(renderer==0)renderbackground=true
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y},playersendid:me.playersendid,id:multiplayerid})
                }else{
                    console.log("kill no live")
                    me.x.set(me.sx=[...me.dx])
                    me.y.set(me.sy=[...me.dy])
                    me.dmg[0]=5
                    me.nokill=1
                    if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
                    if(renderer==0)renderbackground=true
                    if(multiplayerstartet&&multiplayer&&!listenforplayer)postMessage({act:"player stats update",data:{x:me.x,y:me.y},playersendid:me.playersendid,id:multiplayerid})
                }
                if(renderer==3)updatescene=true
                if(me==anime)guistats()
            }
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Specialblock:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.velo = [0,0];
        this.havcoll = true;
        this.fill = "orange";
        this.damage={
            t:this,
            collide:function(me){
                if(me.statsnum!=3)return
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
                if(rumble&&me.construck=="Player")keys.vibrate(87,0,1)
                needcolmap=true
            },
        };
        this.dir = 0;
        this.option = 0;
        this.reibung = 0.06;
        this.haftreibung = 0.02;
        this.managefromplayer = true;//achtung wegen moving und breaking
        this.kimultiplayertimer = 0;
        this.kimultiplayertimerreset = 5;
        this.static = false;
        this.timeout = null;
        this.timeout1 = null;
        this.invisible = false;
        this.sync = true;
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Pipe:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fillbackup = "green";
        this.fill = "Pipe";
        this.wx = 0;
        this.wy = 0;
        this.ro = 0;
        this.static = true;
        this.reibung = 0.05;
        this.haftreibung = 0.02;
        this.pipetexturtop = 10;
        this.pipetexturside = 2;
        
        this.damage={
            t:this,
            collide:function(me){
                if(me.statsnum!=3)return
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
                if(rumble&&me.construck=="Player")keys.vibrate(87,0,1)
                needcolmap=true
            },
            collideup:function(me){
                if(this.t.ro==0)if(promall[3].res){pani(this.t.ro,this.t.wx,this.t.wy,me)}else{me.setx=this.t.wx;me.sety=this.t.wy}
            },
            collideright:function(me){
                if(this.t.ro==1)if(promall[3].res){pani(this.t.ro,this.t.wx,this.t.wy,me)}else{me.setx=this.t.wx;me.sety=this.t.wy}
            },
            collidedown:function(me){
                if(this.t.ro==2)if(promall[3].res){pani(this.t.ro,this.t.wx,this.t.wy,me)}else{me.setx=this.t.wx;me.sety=this.t.wy}
            },
            collideleft:function(me){
                if(this.t.ro==3)if(promall[3].res){pani(this.t.ro,this.t.wx,this.t.wy,me)}else{me.setx=this.t.wx;me.sety=this.t.wy}
            },
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Multiplayer:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.velo = [0,0];
        this.inwater = false;
        this.falldist = 0;
        this.dir = 1;
        this.statsnum = 0;
        this.havcoll = false;
        this.fill = "orange";
        this.dest = false;
        this.static = false;
        this.reibung = 0.1;
        this.haftreibung = 0.3;
        this.groundflat = true;
        this.rich4arr = [0,1,2,3];
        createobjhelper.pos.call(this,opt)
        this.inversekinematics = true;
        if(promall[20].res){
            skelett.Luigi.call(this)
            createobjhelper.bones.call(this)
        }else{
            Promise.all([promall[20]]).then(()=>{
                skelett.Luigi.call(this)
                createobjhelper.bones.call(this)
            })
        }
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Player:function(arr,...opt) {
        let defaultarr=myRect;
        this.controls = {w:87,a:65,s:83,d:68,r:82};
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = false;
        this.fill = "blue";
        this.rotate = 0;
        this.fishtoattack = true;
        this.nomovetimer=0;

        //wen bild geladen fügs in animation rein
        //fillconfig schreibt dan was wan ausgefürt wird
        //dadurch picturesort usw entfernen
        //vorteil modularer
        //bild trigger
        this.animation={
            //frames (auch komma werte), bildurl img
            //trigger sol return [bool,importance,this]
            fillpicwl:{
                pic:new Map([
                    [0,["img/wl(0).png"]],
                    [1,["img/wl(1).png"]],
                ]),
                get trigger(){
                    return [this.t.velo[0]<-1,0,this]
                },
                aniframe:0
            },
            fillpicwr:{
                pic:new Map([
                    [0,["img/wr(0).png"]],
                    [1,["img/wr(1).png"]]
                ]),
                get trigger(){
                    return [this.t.velo[0]>1,0,this]
                },
                aniframe:0
            },
            fillpicbored:{
                pic:new Map([
                    [0,["img/Mario/MarioGaming.svg"]]
                ]),
                get trigger(){
                    return [this.t.nomovetimer>300,0,this]
                },
                aniframe:0
            },
            fillpicwrbored:{
                pic:new Map([
                    [0,["img/Mario/MarioGaming.svg"]]
                ]),
                get trigger(){
                    return [this.t.velo[0]>1&&this.t.nomovetimer>300,0,this]
                },
                aniframe:0
            },
        }
        createobjhelper.animation.call(this)
        this.environment = true;
        this.playerphysik = true;
        this.fillbackup = "blue";
        this.dmg = 5;
        this.statsnum = 0;
        this.nokill = 0;
        this.graviins = [0,0];
        this.static = false;
        this.dir = 1;
        this.masse = 300;
        this.velo = [0,0];
        this.falldist = 0;
        this.inwater = false;
        this.umgebung = [[,0],[,0],[,0],[,0]];
        this.stats = stats;
        this.coins = 0;
        createobjhelper.pos.call(this,opt)
        this.sx = typeof(this.x)=="object"?new Float64Array([...this.x]):this.x;
        this.sy = typeof(this.y)=="object"?new Float64Array([...this.y]):this.y;
        this.dx = typeof(this.x)=="object"?new Float64Array([...this.x]):this.x;
        this.dy = typeof(this.y)=="object"?new Float64Array([...this.y]):this.y;
        this.fillstr=this.fill;
        this.shift=false;
        Object.defineProperties(this,{getstats:{get:function(){return this.stats[this.inwater[0]|0][this.shift|0][this.statsnum[0]|0]}}})
        this.inversekinematics = true;
        if(promall[20].res){
            skelett.Mario.call(this)
            createobjhelper.bones.call(this)
        }else{
            Promise.all([promall[20]]).then(()=>{
                skelett.Mario.call(this)
                createobjhelper.bones.call(this)
            })
        }
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
Playerki:function(arr,...opt) {
    let defaultarr=myRect;
    this.keys=[0,0,0,0,0]
    this.controls = {w:0,a:1,s:2,d:3,r:4};
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.havcoll = false;
    this.type="playerai"
    this.fill = "blue";
    this.rotate = 0;
    this.fishtoattack = true;
    this.environment = true;
    this.playerphysik = true;
    this.dmg = 5;
    this.statsnum = 0;
    this.nokill = 0;
    this.graviins = [0,0];
    this.static = false;
    this.dir = 1;
    this.masse = 300;
    this.velo = [0,0];
    this.falldist = 0;
    this.inwater = false;
    this.umgebung = [[,0],[,0],[,0],[,0]];
    this.stats = stats;
    this.coins = 0;
    createobjhelper.pos.call(this,opt)
    this.sx = typeof(this.x)=="object"?new Float64Array([...this.x]):this.x;
    this.sy = typeof(this.y)=="object"?new Float64Array([...this.y]):this.y;
    this.dx = typeof(this.x)=="object"?new Float64Array([...this.x]):this.x;
    this.dy = typeof(this.y)=="object"?new Float64Array([...this.y]):this.y;
    this.fillstr=this.fill;
    this.shift=false;
    Object.defineProperties(this,{getstats:{get:function(){return this.stats[this.inwater[0]|0][this.shift|0][this.statsnum[0]|0]}}})
    //this.inversekinematics = true;
    //skelett.Luigi.call(this)
    //createobjhelper.bones.call(this)
    createobjhelper.convtoshared.call(this)
    createobjhelper.check.call(this,arr,defaultarr)
},
/**@type {createobjfunc}*/
    Sun:function(arr,...opt) {
        let defaultarr=mySun;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = false;
        this.fill = "yellow";
        this.static = true;
        this.blur=15;
        this.lightcolor="rgba(252, 238, 197,1)";
        this.blurcolor="yellow";
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Questionblock:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fill = "Question";
        this.fillbackup = "orange";
        this.option = [["Powerup",{dmg:0,md:1,type:"ki",kitype:0,dir:1}],["Shape",{fill:"black"}]];
        //summonobj(type) summonobj(optionen) summonobj(arr) replaceobj(type) replaceobj(optionen)  replaceobj(arr)

        this.damage={
            t:this,
            collide:function(me){
                if(me.statsnum!=3)return
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
                if(rumble&&me.construck=="Player")keys.vibrate(87,0,1)
                needcolmap=true
            },
        };
        this.static = true;
        this.dir = 0;
        this.reibung = 0.06;
        this.haftreibung = 0.02;
        this.questiontexturdistanz = 2;
        this.questiontexturtextcolor = "white";
        this.questiontexturtextstroke = "orange";
        this.ro = 0;
        this.questiontexturcolor = "yellow";
        this.questiontexturpointcolor = "gray";
        this.questiontexturtext = "?";
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Feuer:function(arr,...opt) {
        let defaultarr=myRect;
        this.equal = true;
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.owner = myRect[0][0];
        this.type = "fire";
        this.winkel = 0;
        this.speed = 4;
        this.webglfill=[1,0,0,1];
        this.static = false;
        this.randomnis = 0.1;
        this.gravimulti = 0.6;
        this.bounce = 0;
        this.bouncelast = false;
        this.bouncemax = 10;
        this.havcoll = false;
        this.fill = "red";
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        this.timer=setTimeout(()=>{
            myRect[loadmap].splice(myRect[loadmap].indexOf(this),1)
            if(renderer==3&&!webglfallback)updatescene=true
        },10000);
        console.log(this.timer)
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Bommerang:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.owner = myRect[0][0];
        this.type = "Boomerang";
        this.thrown = false;
        this.dampening = 0.9;
        this.tension = 0.05;
        this.velo = [0,0];
        this.winkel = 0;
        this.speed = 50;
        this.static = false;
        this.havcoll = false;
        this.fill = "blue";
        this.animation={
            //frames (auch komma werte), bildurl img
            //trigger sol return [bool,importance,this]
            fillpicwl:{
                pic:new Map([
                    [0,["img/Rasenmäher/Rasenmäher1.svg"]],
                    [1,["img/Rasenmäher/Rasenmäher2.svg"]],
                    [2,["img/Rasenmäher/Rasenmäher3.svg"]],
                    [3,["img/Rasenmäher/Rasenmäher4.svg"]],
                    [4,["img/Rasenmäher/Rasenmäher5.svg"]],
                    [5,["img/Rasenmäher/Rasenmäher6.svg"]],
                    [6,["img/Rasenmäher/Rasenmäher7.svg"]],
                ]),
                get trigger(){
                    return [true,0,this]
                },
                aniframe:0
            }
        }
        createobjhelper.animation.call(this)
        this.fillbackup = "blue";
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Waypoint:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fill = "blue";
        this.static = true;
        this.reibung = 0.05;
        this.haftreibung = 0.02;
        this.damage={
            t:this,
            collide:function(me){
                if(me.statsnum!=3)return
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
                if(rumble&&me.construck=="Player")keys.vibrate(87,0,1)
                needcolmap=true
            },
            collideup:function(me){
                me.sx=[...me.x]
                me.sy=[...me.y]
            },
            collideright:function(me){
                me.sx=[...me.x]
                me.sy=[...me.y]
            },
            collidedown:function(me){
                me.sx=[...me.x]
                me.sy=[...me.y]
            },
            collideleft:function(me){
                me.sx=[...me.x]
                me.sy=[...me.y]
            },
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Finish:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fill = "URL";
        this.fillpic = "img/Haus.svg";
        this.fillbackup = "orange";
        this.static = true;
        this.reibung = 0.05;
        this.haftreibung = 0.02;
        this.damage={
            t:this,
            collideup:function(me){
                console.log("finish")
                if(me.construck=="Player"){
                    winscreen()
                    stopmain=false;
                    if(multiplayerstartet&&me1.managefromplayernum==multiplayerid)postMessage({act:"winscreen",id:multiplayerid})
                }
                if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
            },
            collideright:function(me){
                console.log("finish")
                if(me.construck=="Player"){
                    winscreen()
                    stopmain=false;
                    if(multiplayerstartet&&me1.managefromplayernum==multiplayerid)postMessage({act:"winscreen",id:multiplayerid})
                }
                if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
            },
            collidedown:function(me){
                console.log("finish")
                if(me.construck=="Player"){
                    winscreen()
                    stopmain=false;
                    if(multiplayerstartet&&me1.managefromplayernum==multiplayerid)postMessage({act:"winscreen",id:multiplayerid})
                }
                if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
            },
            collideleft:function(me){
                console.log("finish")
                if(me.construck=="Player"){
                    winscreen()
                    stopmain=false;
                    if(multiplayerstartet&&me1.managefromplayernum==multiplayerid)postMessage({act:"winscreen",id:multiplayerid})
                }
                if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
            },
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Gravi:function(arr,...opt) {
        let defaultarr=myGravi;
        this.x = 0;
        this.y = 5000;
        this.w = 3000;
        this.h = 1;
        this.stärke = 10;
        this.abfac = 0.05;
        createobjhelper.pos.call(this,opt)
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Dead:function(arr,...opt){
        let defaultarr=myRect;
        this.nodraw = true;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = false;
        this.fill = "rgba(0,0,0,0)";
        this.dest = false ;
        this.static = true;
        this.damage={
            t:this,
            collide:function(me){
                if (me.dmg[0]>0){
                    if(me.construck=="Player")console.log("kill")
                    me.x.set(me.sx)
                    me.y.set(me.sy)
                    me.dmg[0]--
                    me.nokill=1
                }else{
                    if(me.construck=="Player")console.log("kill no live")
                    me.x.set(me.sx=[...me.dx])
                    me.y.set(me.sy=[...me.dy])
                    me.dmg[0]=5
                    me.nokill=1
                }
                if(me==anime)guistats()
                if("type" in me&&Object.getOwnPropertyNames(neuronetworks).includes(me.type))kidiewin(me)
            }
        };
        createobjhelper.pos.call(this,opt)
        this.fillstr=this.fill;
        createobjhelper.convtoshared.call(this)
        createobjhelper.check.call(this,arr,defaultarr)
    }
}
Object.freeze(createobj)
function checkprop(obj){
    let fehlerteil
    let typeofrec=b=>Array.isArray(b)?"["+b.map(a=>typeofrec(a))+"]":typeof(b)
    let bool=Object.getOwnPropertyNames(obj).some(prop=>{
        let match=Array.isArray(createobjsettings[obj.construck].type[prop])?createobjsettings[obj.construck].type[prop][0]:createobjsettings[obj.construck].type[prop]
        let conv=typeofrec(obj[prop])
        let numberregcheck
        let regexcheck=false
        let convregexcheck=""
        if(Array.isArray(createobjsettings[obj.construck].type[prop])&&createobjsettings[obj.construck].type[prop].length==3){
            if(createobjsettings[obj.construck].type[prop][2] instanceof RegExp){
                convregexcheck=JSON.stringify(prop)
                numberregcheck=convregexcheck.match(createobjsettings[obj.construck].type[prop][2])
                regexcheck=true
            }
        }
        let type=conv.match(match)
        if(type==null||type.index!==0||!createobjsettings[obj.construck].type.hasOwnProperty(prop)||(regexcheck&&(numberregcheck==null||numberregcheck.index!==0))){
            fehlerteil=regexcheck?[prop,obj[prop],typeof(match)=="object"?match.source:match,conv,type,createobjsettings[obj.construck].type[prop][2],convregexcheck,numberregcheck]:[prop,obj[prop],typeof(match)=="object"?match.source:match,conv,type]
            return true
        }
        return false
    })
    if(typeof(obj.fill)!=="undefined"&&!obj.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageData")&&typeof(colorobj)!="undefined"&&!Object.getOwnPropertyNames(colorobj).includes(obj.fill)){
        let e=document.createElement('div');
        e.style.borderColor="";
        e.style.borderColor=obj.fill;
        if ((e.style.borderColor).length==0){bool=true;fehlerteil="fill"}
    }
    if(typeof(colorobj)!="undefined"&&typeof(obj.fillstr)!=="undefined"&&!Object.getOwnPropertyNames(colorobj).includes(obj.fillstr)){
        let e=document.createElement('div');
        e.style.borderColor="";
        e.style.borderColor=obj.fillstr;
        if ((e.style.borderColor).length==0){bool=true;fehlerteil="fillstr"}
    }
    if(bool){
        console.log(obj)
        if(typeof(fehlerteil)=="string"){
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nprop:"+fehlerteil+
                "\n"+new Error().stack))
        }else if(fehlerteil.length==5){
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nprop:"+fehlerteil[0]+
                "\nzeile:"+fehlerteil[1]+
                "\nmatchstr:"+fehlerteil[2]+
                "\nconv:"+fehlerteil[3]+
                "\ntype:"+fehlerteil[4]+
                "\n"+new Error().stack))
        }else if(fehlerteil.length==8){
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nprop:"+fehlerteil[0]+
                "\nzeile:"+fehlerteil[1]+
                "\nmatchstr:"+fehlerteil[2]+
                "\nconv:"+fehlerteil[3]+
                "\ntype:"+fehlerteil[4]+
                "\nmatchstr:"+fehlerteil[5]+
                "\nconv:"+fehlerteil[6]+
                "\ntype:"+fehlerteil[7]+
                "\n"+new Error().stack
                ))
        }
    }else{return true}
}
promallres[1]()