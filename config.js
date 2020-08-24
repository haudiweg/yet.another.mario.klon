// @ts-check
'use strict';
var timeo=0,
scale=1,
rofx=0,
rofy=0,
maxx=-Infinity,
maxy=-Infinity,
minx=0,
miny=0,
debug=false,
stopmain=true,
stopbuild=true,
language="auto",
timeout="",
/** 
 * @property {Any} ctx a
*/
ctx,
ctxb,
ctxshadow,
ctxbshadow,
debugtext="",
shadowqualli=0.0,
shadowstaticqualli=0.0,
oldshadowstaticqualli=0.0,
canvas,
canvasb,
canvasshadow,
canvasbshadow,
canvarr=["canvas","canvasb"],
ctxarr=["ctx","ctxb"],
shadowrand=false,
shadowstroke=false,
listener,
m4xfps=60,
fps=60,
fpsav=60,
fpsanpassung=0.99,
mousex=null,
mousey=null,
mousexc=0,
mouseyc=0,
presetobj=[],
zoom=0,
minzoom=-5,
maxzoom=5,
zoomn=1,
disableszoom=true,
menunode=[],
menuupdatekeys=true,
menuallowedtomove=true,
audioCtx,
panner=[],
fishmap=[],
canfishmap=true,
fishmaptimer=0,
fishmapreset=1,
colmap=[],
cancolmap=true,
colmaptimer=0,
colmapreset=30,
objcolmap=[],
workerpk=[],
workercol=[],
needfishmap=false,
needcolmap=true,
wassertime=0,
wassertimeanpassung=0.9,
wasserphycollision=true,
wasserphyplayerwave=true,
nokill=false,
toupdateshadow=new Set(),
staticshadowtime=0,
dynamicshadowtime=0,
shadowtimeanpassung=0.9,
offcamx=0,
offcamy=0,
oldxcam=0,
oldycam=0,
camoffsx=0,
camoffsy=0.91,
renderbackground=true,
hadrenderbackground=true,
rumble=false,
rumbletype=0,
enableaudio=false,
colobjarr=[],
debugcolmap=false,
cleardebugcolmap=false,
debugcolmode="fishmap",
suppixel=false,
imageSmoothingEnabled="none",
idletime=0,
idletimeanpassung=0.9,
allowedmaxfps=[30,60,100,120,144,200,240,360],
maxshadow=6000,
sunnlineofsight=false,
collupdate=false,
cheats=false,
fly=false,
nocollision=false,
shadowlimmiter=false,
aniframe=0,
maxshadowlevel=0.8,
maxstaticshadowlevel=0.2,
loadmap=0,
mapinfo=[],
gl=ctx,
/** Class representing my obj. */
myRect=[],
mySun=[],
myFire=[],
myGravi=[],
maxdistcol=30,
menuboarder=60,
exitborder=40,
shaderProgram=[],
updatescene=true,
updatetextur=false,
objvertecys=[],
webglbuffers=[],
WEBGLmultidraw,
WEBGLdisjointtimer,
WEBGLdisjointtimerquery,
WEBGLdisjointtimeravailable=true,
grassmaxobjtorender=0,
antialias=false,
textureantialiasing=1,
textureantialiasingscaling=true,
webglmultisampling=1,
texturquali=1,
desynchronized=true,
disablemenucontrolls='ontouchstart' in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,
settings=["noob","language","renderer","usewebgl2ifcan","Fullscreen",[["antialias","desynchronized"],"webglmultisampling","textureantialiasing","texturquali","textureantialiasingscaling","imageSmoothingEnabled","suppixel",["camoffsx","camoffsy"]],[["allowedmaxfps","fpsanpassung","m4xfps"],["shadows","shadowblur","shadowblurtype","maxshadow","shadowlimmiter","maxshadowlevel","maxstaticshadowlevel","sunnlineofsight","shadowtimeanpassung"]],"zoom","minzoom","maxzoom",["rumble","rumbletype"],"enableaudio","debug","fishmapreset","colmapreset","idletimeanpassung","maxdistcol",["menuboarder","exitborder"],["debtextabfac","debtextavgabfac"],"inversekinematics","bonescolor","playertexturanimation","collmapnowebworker",["wasserphysik","wasserphycollision","wasserphyplayerwave"],"fpscontroll","renderallinstand","disablemenucontrolls",["webglgrassani","webglgrasssun","webglmingrassquali","webglmaxgrassquali","webglgrasswantetpoligons","webglgrassfpsstabilisation","windsmove","windrange","windreset"],["texturgenbuffertime","texturgenmaxstartgentime","texturgenmaxwaittime"]],
cheatsettings=["fly","nocollision","nokill","debug","shadowrand","shadowstroke","debugcolmap","debugcolmode"],
noob=false,
noobsettings=[["nokill","inflive"],["tp","tptofinish"],["newstart","lastwaypoint"],"clearenemy",["playerplus1live","playerplus1statsnum"]],
lastwaypoint=false,
inflive=false,
tp=false,
newstart=false,
tptofinish=false,
clearenemy=false,
playerplus1live=false,
playerplus1statsnum=false,
tooltips={},
canrungame=false,
debtextabfac=0.8,
debtextavg=0,
debtextavgabfac=0.8,
debtextvariation=0,
debtextlength=0,
texturupdatet=false,
repaintbtime=0,
todrawb=[[],[]],
shadows=false,
shadowblur=15,
shadowblurtype=0,
inversekinematics=navigator.userAgent.indexOf("Chrome")!==-1?true:false,
playertexturanimation=navigator.userAgent.indexOf("Chrome")!==-1?false:true,
bonescolor=true,
instandzoom=true,
idlecallbackactiv=false,
collmapnowebworker=false,
wasserphysik=true,
fpscontroll=true,
renderer=3,
fpscontrollarr=["shadowlimmiter","sunnlineofsight","shadows","suppixel","inversekinematics","playertexturanimation","wasserphycollision","wasserphysik"],
renderallinstand=false,
windsmove=0.9,
wind=0,
newwind=0,
windtimer=0,
windreset=30,
windrange=0.9,
webglgrassani=true,
webglgrasssun=true,
bpe=Float32Array.BYTES_PER_ELEMENT,
webgldrawarr,
webglgrassdrawarr=[],
webglgrassquali=4,
webglmingrassquali=0,
webglmaxgrassquali=10,
webglgrasswantetpoligons=1000,
maxgrassobjects=0,
webglgrassfpsstabilisation=false,
grassrandommovefuncall=true,
transformFeedback=[],
webgl2=false,
usewebgl2ifcan=true,
updatewebglgrass=500000,
updatetgrass=0,
updategrass=false,
texturgenbuffertime=0.2,//0.2
texturgenmaxwaittime=Infinity,//10000
texturgenmaxstartgentime=Infinity,//10000
buildmodusresizeborder=10,
clickedonobj=null,
whatmenu=0,
directionx=0,
directiony=0,
focused=false,
buildscale=null,
doublecklick=0,
resizebuild=false,
focusedobj=null,
backupmove,
movedcordx,
movedcordy,
movebuild=false,
inversekinematicsold=true,
checksettings={
    noob:"boolean",
    language:"string",
    renderer:[/number/,"number",/[0-3]/],
    Fullscreen:"function",
    antialias:"boolean",
    desynchronized:"boolean",
    imageSmoothingEnabled:"string",
    webglmultisampling:[/number/,"number",/0|1|(0.[0-9]*)/],
    textureantialiasing:[/number/,"number",/[1-9]/],
    texturquali:[/number/,"number",/[1-9]/],
    textureantialiasingscaling:"boolean",
    suppixel:"boolean",
    camoffsx:"number",
    camoffsy:"number",
    allowedmaxfps:[/\[(number,)*number\]/,"object",/\[([0-9]{1-3},)*[0-9]{1-3}\]/],
    fpsanpassung:[/number/,"number",/0|1|(0.[0-9]*)/],
    m4xfps:[/number/,"number",/[0-9]{3}/],
    shadows:"boolean",
    shadowblur:[/number/,"number",/([0-9]{0-2})|100/],
    shadowblurtype:[/number/,"number",/[0-2]/],
    maxshadow:[/number/,"number",/[0-9]{0-5}/],
    shadowlimmiter:"boolean",
    maxshadowlevel:[/number/,"number",/(0.[0-9]{0-3})|0/],
    maxstaticshadowlevel:[/number/,"number",/(0.[0-9]{0-3})|0/],
    sunnlineofsight:"boolean",
    shadowtimeanpassung:[/number/,"number",/(0.[0-9]{0-3})|0/],
    zoom:"number",//könte man noch besser spezifizieren
    minzoom:"number",
    maxzoom:"number",
    rumble:"boolean",
    rumbletype:[/number/,"number",/[0-1]/],
    enableaudio:"boolean",
    debug:"boolean",
    fishmapreset:"number",
    colmapreset:"number",
    idletimeanpassung:[/number/,"number",/(0.[0-9]{0-3})|0/],
    maxdistcol:[/number/,"number",/[0-9]{0-3}/],
    menuboarder:[/number/,"number",/[0-9]{0-3}/],
    exitborder:[/number/,"number",/[0-9]{0-3}/],
    debtextabfac:[/number/,"number",/0|1|(0.[0-9]*)/],
    debtextavgabfac:[/number/,"number",/0|1|(0.[0-9]*)/],
    inversekinematics:"boolean",
    bonescolor:"boolean",
    playertexturanimation:"boolean",
    collmapnowebworker:"boolean",
    wasserphysik:"boolean",
    wasserphycollision:"boolean",
    wasserphyplayerwave:"boolean",
    fpscontroll:"boolean",
    renderallinstand:"boolean",
    disablemenucontrolls:"boolean",
    webglgrassani:"boolean",
    webglgrasssun:"boolean",
    windsmove:[/number/,"number",/0|1|(0.[0-9]*)/],
    windrange:[/number/,"number",/0|1|(0.[0-9]*)/],
    windreset:"number",
    texturgenbuffertime:[/number/,"number",/[0-5]?[0-9](.[0-9]*)?/],
    texturgenmaxstartgentime:"number",
    texturgenmaxwaittime:"number",
    fly:"boolean",
    nocollision:"boolean",
    nokill:"boolean",
    debug:"boolean",
    shadowrand:"boolean",
    shadowstroke:"boolean",
    debugcolmap:"boolean",
    debugcolmode:"string",
    nokill:"boolean",
    inflive:"boolean",
    tp:"boolean",
    tptofinish:"boolean",
    newstart:"boolean",
    lastwaypoint:"boolean",
    clearenemy:"boolean",
    playerplus1live:"boolean",
    playerplus1statsnum:"boolean",
    webglmingrassquali:[/number/,"number",/[0-4]/],
    webglmaxgrassquali:[/number/,"number",/[0-9]|10/],
    webglgrasswantetpoligons:[/number/,"number",/[0-9]{1-7}/],
    updatewebglgrass:"number",
    webglgrassfpsstabilisation:"boolean",
    usewebgl2ifcan:"boolean"
},
keys={
    arr:{
        250:{stärke:0,mode:"axesmouse",sign:"0"},
        251:{stärke:0,mode:"axesmouse",sign:"1"},
        252:{stärke:0,mode:"axesmouse",sign:"2"},
        253:{stärke:0,mode:"axesmouse",sign:"3"},
        254:{stärke:0,mode:"axesmouse",sign:"4"},
        255:{stärke:0,mode:"exitmouse",sign:"0"},

    },//87:{stärke:0,mode:"axes",sign:"+",key:0}
    map:{
        87:[32,87],
        83:[16,83],
        68:[68],
        65:[65],
        27:[27],
        82:[82],


        73:[73],
        74:[74],
        75:[75],
        76:[76],
    },//quelle getriggert von
    deadarr:{},
    min:{},
    max:{},
    actmin:{},
    actmax:{},
    keymaps:{
        default:{
            map:{
                87:[32,87],
                83:[16,83],
                68:[68],
                65:[65],
                27:[27],
                82:[82],


                73:[73],
                74:[74],
                75:[75],
                76:[76],
            }
        },
        XBOX:{
            map:{
                27:[309],
                82:[300],
                87:[320,312,301],
                65:[318,314],
                83:[319,313],
                68:[317,315],
            }
        },
        AD_Shift_Space:{
            map:{
                87:[32],
                65:[83],
                83:[16],
                68:[70],
                27:[27],
                82:[82],
            }
        },
        WASD:{
            map:{
                87:[87],
                65:[65],
                83:[83],
                68:[68],
                27:[27],
                82:[82],
            }
        },
        Arrow:{
            map:{
                87:[38],
                65:[37],
                83:[40],
                68:[39],
                27:[27],
                82:[45],
            }
        },
        IJKL:{
            map:{
                87:[73],
                65:[74],
                83:[75],
                68:[76],
                27:[27],
                82:[80],
            }
        },
        ESDF:{
            map:{
                87:[69],
                65:[83],
                83:[68],
                68:[70],
                27:[27],
                82:[84], 
            }
        },
        mouse:{
            map:{
                87:[252],
                83:[253],
                68:[251],
                65:[250],
                27:[255],
                82:[254]
            }
        },
    },
    setkeymap:function(name){
        if(this.keymaps.hasOwnProperty(name)){
            for(let i of keysdisplayarr){
                let name1=Object.keys(keys).find(me=>keys[me]===i)
                if(this.keymaps[name].hasOwnProperty(name1))this[name1]=this.keymaps[name][name1]
            }
        }
    },
    removecontrollerkeys:function(id){
        for(let i of [...this.arr]){
            if(this.arr[i].gpi==id){
                delete this.arr[i]
            }
        }
        if([...navigator.getGamepads()].findIndex(i=>i!=null)==-1)this.setkeymap("default")
    },
    addcontrollerkeys:function(id){
        //@ts-expect-error  implicit string in number parsing
        let num=Math.max(...Object.keys(this.arr),300)
        let gp=navigator.getGamepads()[id];
        if(gp.id.includes("Xbox"))this.setkeymap("XBOX")
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",gp.index,gp.id,gp.buttons.length,gp.axes.length);
        for (let i in gp.buttons) {
            this.arr[num++]={stärke:0,mode:"button",key:Number.parseInt(i),gpi:id}
        }
        for (let i in gp.axes) {
            this.arr[num++]={stärke:0,mode:"axes",sign:((i%2)==0?"+":"-"),key:Math.trunc(i/2),gpi:id}
        }
    },
    vibrate:function(key,strong){
        if(rumbletype==0){
            for(let i of this.map[key]){
                if(this.arr.hasOwnProperty(i)&&this.arr[i].hasOwnProperty("gpi")){
                    navigator.getGamepads()[this.arr[i].gpi].vibrationActuator.playEffect("dual-rumble", {
                        duration: 20,
                        strongMagnitude: 1*strong,
                        weakMagnitude: 1
                    })
                }
            }
        }else if(rumbletype==1){
            window.navigator.vibrate(200)
        }
    },
    resetallnumstärke:function(){
        for(let i in this.arr)this.arr[i].stärke=0
    },
    setnum:function(key,stärke){
        if(typeof(this.arr[key])!="undefined"){
            this.arr[key].stärke=stärke
        }else{
            this.arr[key]={stärke:stärke,mode:"key"}
        }
    },
    getmapkey:function(key,mode="max"){
        if(!this.map.hasOwnProperty(key))return undefined
        let keyret=0
        if(mode=="avg"){
            let counter=0
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5
                if(!this.max.hasOwnProperty(key+","+i1))this.max[key+","+i1]=1
                let actnum=this.testkey(i1)
                if(actnum==undefined)continue
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                let num=(actnum-this.min[key+","+i1])/(this.max[key+","+i1]-this.min[key+","+i1])
                num=Math.max(Math.min(num,1),0)
                counter++
                keyret+=num
            }
            keyret/=counter
        }else{
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5
                if(!this.max.hasOwnProperty(key+","+i1))this.max[key+","+i1]=1
                let actnum=this.testkey(i1)
                if(actnum==undefined)continue
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                let num=(actnum-this.min[key+","+i1])/(this.max[key+","+i1]-this.min[key+","+i1])
                num=Math.max(Math.min(num,1),0)
                if(mode=="max"){
                    keyret=Math.max(keyret,num)
                }
                if(mode=="min"){
                    keyret=Math.min(keyret,num)
                }
            } 
        }
        return keyret
    },
    getkeyovermin:function(key,mode="max"){
        if(!this.map.hasOwnProperty(key)&&!this.arr.hasOwnProperty(key))return 0
        if(mode=="avg"){
            let keyret=0
            let counter=0
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5

                let actnum=this.testkey(i1)
                if(actnum==undefined){continue}
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                counter++
                keyret+=(actnum>this.min[key+","+i1]?1:0)
            }
            keyret/=counter
            return keyret>0
        }else{
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5

                let actnum=this.testkey(i1)
                if(actnum==undefined){continue}
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                if(mode=="max"&&actnum>this.min[key+","+i1])return true
                if(mode=="min"&&actnum<this.min[key+","+i1])return false
            }
            return mode=="max"?false:true
        }
    },
    testkey:function(key){
        if(typeof(this.arr[key])=="undefined"||!this.arr[key].hasOwnProperty("mode"))return undefined
        if(this.arr[key].mode=="button"){
            return (navigator.getGamepads()[this.arr[key].gpi]).buttons[this.arr[key].key].value;
        }
        if(this.arr[key].mode=="axes"){
            if(!this.arr[key].hasOwnProperty("sign"))return undefined
            if(this.arr[key].sign=="+"){
                return Math.max((navigator.getGamepads()[this.arr[key].gpi]).axes[this.arr[key].key],0)
            }
            if(this.arr[key].sign=="-"){
                return Math.max(-((navigator.getGamepads()[this.arr[key].gpi]).axes[this.arr[key].key]),0)
            }
        }
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="0")return mousex!=null?Math.max(1-mousex/(canvas.width/2),0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="1")return mousex!=null?Math.max(mousex/(canvas.width/2)-1,0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="2")return mousey!=null?Math.max(1-mousey/(canvas.height/2),0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="3")return mousey!=null?Math.max(mousey/(canvas.height/2)-1,0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="4")return mousex!=null&&mousey!=null?1-Math.sqrt(Math.pow(Math.abs(canvas.height/2-mousey),2)+Math.pow(Math.abs(canvas.width/2-mousex),2))/Math.sqrt(Math.pow(canvas.height/2,2)+Math.pow(canvas.width/2,2)):0
        if(this.arr[key].mode=="exitmouse"&&this.arr[key].sign=="0")return mousex!=null&&mousey!=null&&exitborder>mousex&&exitborder>mousey?1:0
        if(this.arr[key].mode=="key"){
            return this.arr[key].stärke
        }
    },
    actualizekeys:function(){
        for(let i of Object.keys(this.arr)){
            if(this.arr[i].mode=="button")this.arr[i].stärke=(navigator.getGamepads()[this.arr[i].gpi]).buttons[this.arr[i].key].value;
            if(this.arr[i].mode=="axes"&&this.arr[i].sign=="+")this.arr[i].stärke=Math.max((navigator.getGamepads()[this.arr[i].gpi]).axes[this.arr[i].key],0)
            if(this.arr[i].mode=="axes"&&this.arr[i].sign=="-")this.arr[i].stärke=Math.max(-((navigator.getGamepads()[this.arr[i].gpi]).axes[this.arr[i].key]),0)
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="0")this.arr[i].stärke=mousex!=null?Math.max(1-mousex/(canvas.width/2),0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="1")this.arr[i].stärke=mousex!=null?Math.max(mousex/(canvas.width/2)-1,0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="2")this.arr[i].stärke=mousey!=null?Math.max(1-mousey/(canvas.height/2),0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="3")this.arr[i].stärke=mousey!=null?Math.max(mousey/(canvas.height/2)-1,0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="4")this.arr[i].stärke=mousex!=null&&mousey!=null?1-Math.sqrt(Math.pow(Math.abs(canvas.height/2-mousey),2)+Math.pow(Math.abs(canvas.width/2-mousex),2))/Math.sqrt(Math.pow(canvas.height/2,2)+Math.pow(canvas.width/2,2)):0
            if(this.arr[i].mode=="exitmouse"&&this.arr[i].sign=="0")this.arr[i].stärke=mousex!=null&&mousey!=null&&exitborder>mousex&&exitborder>mousey?1:0
        }
    },
    keytoggle:function(key){
        let erg=this.getkeyovermin(key)
        if(erg==true&&!this.deadarr[key]){this.deadarr[key]=true;return 1}
        if(erg==false&&this.deadarr[key]){this.deadarr[key]=false}
        return 0
    },
    setverzweigung:function(key,...key1){
        if(this.map.hasOwnProperty(key)){
            this.map[key].push(...key1)
        }
    },
    remverzweigung:function(key,key1){
        this.map[key]=this.map[key].filter((i)=>{i!=key1})
    },
    resetverzweigung:function(){
        this.map={}
    },
    setmin:function(key,key1,stärke){
        this.min[key+","+key1]=stärke
    },
    setmax:function(key,key1,stärke){
        this.max[key+","+key1]=stärke
    },
    setactmin:function(key,key1,stärke){
        this.actmin[key+","+key1]=stärke
    },
    setactmax:function(key,key1,stärke){
        this.actmax[key+","+key1]=stärke
    },
    mousemove:function(e){
        let bound=canvas.getBoundingClientRect();
        mousexc=(event.clientX-bound.left-canvas.clientLeft)*zoomn;
        mouseyc=(event.clientY-bound.top-canvas.clientTop)*zoomn;
    },
    mousedown:function(e){
        let bound=canvas.getBoundingClientRect();
        mousex=(event.clientX-bound.left-canvas.clientLeft)*zoomn;
        mousey=(event.clientY-bound.top-canvas.clientTop)*zoomn;
    },
    mouseup:function(e){
        mousex=null
        mousey=null
    },
},
keysdisplayarr=[keys.map,keys.arr,keys.min,keys.max,keys.actmin,keys.actmax],
stats=[
    [
        [
            {wiederstand:0.07,gravimulti:0.08,w:10,h:15,sg:.6,sa:.09,jh:4.0,wj:{x:8.0,y:4.0},lj:{x:2.5,y:3.1},dest:false,minus:0,powerup:[1,2]},
            {wiederstand:0.07,gravimulti:0.08,w:25,h:25,sg:.6,sa:.09,jh:4.0,wj:{x:8.0,y:4.0},lj:{x:2.5,y:3.1},dest:true,minus:0,powerup:[2]},
            {wiederstand:0.07,gravimulti:0.08,w:25,h:25,sg:.6,sa:.09,jh:4.0,wj:{x:8.0,y:4.0},lj:{x:2.5,y:3.1},dest:true,minus:1,powerup:[]}
        ],[
            {wiederstand:0.07,gravimulti:0.08,w:10,h:15,sg:.6,sa:.09,jh:4.0,wj:{x:8.0,y:4.0},lj:{x:2.5,y:3.1},dest:false,minus:0,powerup:[1,2]},
            {wiederstand:0.07,gravimulti:0.08,w:25,h:10,sg:.6,sa:.09,jh:4.0,wj:{x:8.0,y:4.0},lj:{x:2.5,y:3.1},dest:true,minus:0,powerup:[2]},
            {wiederstand:0.07,gravimulti:0.08,w:25,h:10,sg:.6,sa:.09,jh:4.0,wj:{x:8.0,y:4.0},lj:{x:2.5,y:3.1},dest:true,minus:1,powerup:[]}
        ]
    ],[
        [
            {wiederstand:0.4,gravimulti:0.02,w:15,h:10,sg:.7,sa:.5,jh:1.4,wj:{x:1,y:1.0},lj:{x:0,y:0},dest:false,minus:0,powerup:[1,2]},
            {wiederstand:0.4,gravimulti:0.01,w:25,h:25,sg:.7,sa:.5,jh:1.4,wj:{x:1,y:1.0},lj:{x:0,y:0},dest:true,minus:0,powerup:[2]},
            {wiederstand:0.4,gravimulti:0.01,w:25,h:25,sg:.7,sa:.5,jh:1.4,wj:{x:1,y:1.0},lj:{x:0,y:0},dest:true,minus:1,powerup:[]}
        ],[
            {wiederstand:0.4,gravimulti:0.02,w:10,h:25,sg:.7,sa:.5,jh:1.4,wj:{x:1,y:1.0},lj:{x:0,y:0},dest:false,minus:0,powerup:[1,2]},
            {wiederstand:0.4,gravimulti:0.01,w:10,h:25,sg:.7,sa:.5,jh:1.4,wj:{x:1,y:1.0},lj:{x:0,y:0},dest:true,minus:0,powerup:[2]},
            {wiederstand:0.4,gravimulti:0.02,w:10,h:25,sg:.7,sa:.5,jh:1.4,wj:{x:1,y:1.0},lj:{x:0,y:0},dest:true,minus:1,powerup:[]}
        ]
    ]
]
//[me.inwater][shift][me.statsnum]