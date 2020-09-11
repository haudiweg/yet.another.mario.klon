// @ts-check
'use strict';
const webglnames=[["webgl","experimental-webgl","moz-webgl","webkit-3d"],["webgl2"]]
const settings=[
    ["noob"],
    ["broadcastchanelname","resetmultiplayer","multiplayer","multiplayerwhitelist","multiplayerblacklist","multiplayerignorenotwitelistet","multiplayerjustlisten","multiplayerinversekinematic","multiplayerconnect","debugmultiplayer","playertimeout","multiplayernoice"],
    "language","renderer","usewebgl2ifcan","Fullscreen",
    ["disablevideos","disablepics"],
    [
        ["antialias","desynchronized"],
        ["webglmultisampling","webglfallback"],
        ["textureantialiasing","texturquali","textureantialiasingscaling","imageSmoothingEnabled","suppixel"],
        ["camoffsx","camoffsy","camfocusallplayer"]
    ],[
        ["allowedmaxfps","fpsanpassung","m4xfps"],
        ["shadows","shadowblur","shadowblurtype","maxshadow","shadowlimmiter","maxshadowlevel","maxstaticshadowlevel","sunnlineofsight","shadowtimeanpassung"]
    ],
    ["zoom","minzoom","maxzoom"],
    ["rumble","rumbletype"],
    ["enableaudio","soundHRTF","soundcam","soundvalues"],
    "debug","fishmapreset","idletimeanpassung","maxdistcol",
    ["menuboarder","exitborder"],
    ["debtextabfac","debtextavgabfac"],
    "inversekinematics","bonescolor","playertexturanimation","collmapnowebworker",
    ["wasserphysik","wasserphycollision","wasserphyplayerwave"],
    "fpscontroll","renderallinstand","disablemenucontrolls",
    [
        ["webglgrassani","webglgrasssun","webglmingrassquali","webglmaxgrassquali","grassrenderall","webglgrasswantetpoligons","webglgrassfpsstabilisation"],
        "windsmove","windrange","windreset"
    ],
    ["texturgenbuffertime","texturgenmaxstartgentime","texturgenmaxwaittime"]
]
const cheatsettings=["cheats","fly","nocollision","nokill","debug","shadowrand","shadowstroke","debugcolmap","debugcolmode"]
const fpscontrollarr=["shadowlimmiter","sunnlineofsight","shadows","suppixel","inversekinematics","playertexturanimation","wasserphycollision","wasserphysik"]
const noobsettings=["noobtarget",["nokill","inflive"],["tp","tptofinish"],["newstart","lastwaypoint"],"clearenemy",["playerplus1live","playerplus1statsnum"]]
const bpe=Float32Array.BYTES_PER_ELEMENT
/**
 * a const that checks all variables if they are corect
 * @namespace
 */
const checksettings={
    camfocusallplayer:"boolean",
    cheats:"boolean",
    noob:"boolean",
    noobtarget:[/number/,"number",/[0-9]*/],
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
    soundHRTF:"boolean",
    soundcam:"boolean",
    soundvalues:"object",
    debug:"boolean",
    debugmultiplayer:"boolean",
    fishmapreset:"number",
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
    windsmove:[/number/,"number",/0|1|(0.[0-9]*)/],
    windrange:[/object/,"object",/\[(0|1|(0.[0-9]*)),(0|1|(0.[0-9]*))\]/],
    windreset:"number",
    texturgenbuffertime:[/number/,"number",/[0-5]?[0-9](.[0-9]*)?/],
    texturgenmaxstartgentime:[/number/,"number|string",/([0-9]*(,[0-9]*)?)|Infinity/],
    texturgenmaxwaittime:[/number/,"number|string",/([0-9]*(,[0-9]*)?)|Infinity/],
    fly:"boolean",
    nocollision:"boolean",
    nokill:"boolean",
    shadowrand:"boolean",
    shadowstroke:"boolean",
    debugcolmap:"boolean",
    debugcolmode:"string",
    inflive:"boolean",
    tp:"boolean",
    tptofinish:"boolean",
    newstart:"boolean",
    lastwaypoint:"boolean",
    clearenemy:"boolean",
    playerplus1live:"boolean",
    playerplus1statsnum:"boolean",
    webglgrassani:"boolean",
    webglgrasssun:"boolean",
    webglmingrassquali:[/number/,"number",/[0-4]/],
    webglmaxgrassquali:[/number/,"number",/[0-9]|10/],
    webglgrasswantetpoligons:[/number/,"number",/[0-9]{1-7}/],
    updatewebglgrass:"number",
    webglgrassfpsstabilisation:"boolean",
    grassrenderall:"boolean",
    usewebgl2ifcan:"boolean",
    disablevideos:"boolean",
    disablepics:"boolean",
    webglfallback:"boolean",
    multiplayer:"boolean",
    multiplayerwhitelist:[/\[(number,)*number\]/,"object",/\[([0-9]*,)*[0-9]*\]/],
    multiplayerblacklist:[/\[(number,)*number\]/,"object",/\[([0-9]*,)*[0-9]*\]/],
    multiplayerignorenotwitelistet:"boolean",
    multiplayerjustlisten:"boolean",
    multiplayerinversekinematic:"boolean",
    broadcastchanelname:[/string/,"string",/\w{0,32}/,()=>{bc.close();bc=new BroadcastChannel(broadcastchanelname);bc.onmessage=multiplayerstart}],
    resetmultiplayer:"function",
    multiplayerconnect:"function",
    playertimeout:"boolean",
    multiplayernoice:"boolean"
}

var webrtcguiclipboard=true
var multiplayertoconnectmode={}
var multiplayertoconnect=[]//aray rein wo immer id von partner zu conecten hingehört
var multiplayerid
var multiplayernoice=false
//https://gist.github.com/sagivo/3a4b2f2c7ac6e1b5267c2f1f59ac6c6b
var RTCPEERConfignoice={iceServers:[]}
var RTCPeerConfig={iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
]}
var promall=[]
var promallres=[]
var promallrej=[]
var multiplayerafk=new Set()
var afktimeasktime=60000
var afktimeanswere=2000
var playertimeout=true
var multiplayerafktimer=[]
var broadcastchanelname="game"
var bc=new BroadcastChannel(broadcastchanelname)
var multiplayer=true
var multiplayerstartet=false
var multiplayerjustlisten=false
var listenforplayer=false
var multiplayerwhitelist=new Set()
var multiplayerblacklist=new Set()
var multiplayerignorenotwitelistet=false
var multiplayerwhitelistgame=new Set([0,1])
var multiplayerblacklistgame=new Set()
var multiplayerignorenotwitelistetgame=false
var multiplayeraskforarr=[]
var multiplayertimer
var multiplayeracceptallplayer=false
var multiplayeracceptallmaps=false
var multiplayerinversekinematic=true
var webrtcConnection=[]
var webrtcChannel=[]
var multiplayermapplayer=new Map()
var multipleplayer=false //if on 1 map are multible players (not multiplayer)
var timeo=0
var allowedmaxfps=[30,60,100,120,144,200,240,360]
var disablemenucontrolls='ontouchstart' in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0
var scale=1
var rofx=0
var rofy=0
var camfocusallplayer=false
var minplayerposx=Infinity
var minplayerposy=Infinity
var maxplayerposx=-Infinity
var maxplayerposy=-Infinity
var maxx=-Infinity
var maxy=-Infinity
var minx=0
var miny=0
var debug=false
var debugmultiplayer=false
var stopmain=false
var stopbuild=false
var language="auto"
/**@type {CanvasRenderingContext2D}*/
var ctx
/**@type {CanvasRenderingContext2D}*/
var ctxb
/**@type {CanvasRenderingContext2D}*/
var ctxshadow
/**@type {CanvasRenderingContext2D}*/
var ctxbshadow
var debugtext=""
var shadowqualli=0.0
var shadowstaticqualli=0.0
var oldshadowstaticqualli=0.
/**@type {HTMLCanvasElement}*/
var canvas
/**@type {HTMLCanvasElement}*/
var canvasb
/**@type {HTMLCanvasElement}*/
var canvasshadow
/**@type {HTMLCanvasElement}*/
var canvasbshadow
/**@type {Array<string>}*/
var canvarr=[]
/**@type {Array<string>}*/
var ctxarr=[]
var shadowrand=false
var shadowstroke=false
var listener
var m4xfps=60
var fps=60
var fpsav=60
var fpsanpassung=0.99
var fpslimit=Infinity
var mousex=null
var mousey=null
var mousexc=0
var mouseyc=0
var presetobj=[]
var zoom=0
var minzoom=-5
var maxzoom=5
var zoomn=1
var disableszoom=true
/**@type {Array.<HTMLElement>}*/
var menunode=[]
var menuupdatekeys=true
var menuallowedtomove=true
var audioctx
var sound={}
var soundvalues={}
var soundHRTF=false
var soundcam=false
var fishmap=[]
var canfishmap=true
var fishmaptimer=0
var fishmapreset=1
var colmap=[]
var cancolmap=true
var objcolmap=[]
/**@type {Worker}*/
var workerpk
/**@type {Worker}*/
var workercol
var needfishmap=false
var needcolmap=true
var wassertime=0
var wassertimeanpassung=0.9
var wasserphycollision=true
var wasserphyplayerwave=true
var nokill=false
var toupdateshadow=new Set()
var staticshadowtime=0
var dynamicshadowtime=0
var shadowtimeanpassung=0.9
var offcamx=0
var offcamy=0
var oldxcam=0
var oldycam=0
var camoffsx=0
var camoffsy=0.91
var renderbackground=true
var hadrenderbackground=true
var rumble=false
var rumbletype=0
var enableaudio=false
var colobjarr=[]
var debugcolmap=false
var cleardebugcolmap=false
var debugcolmode="objcolmap"//"fishmap"
var suppixel=false
var imageSmoothingEnabled="none"
var idletime=0
var idletimeanpassung=0.9
var maxshadow=6000
var sunnlineofsight=false
var collupdate=false
var cheats=false
var fly=false
var nocollision=false
var shadowlimmiter=false
var aniframe=0
var maxshadowlevel=0.8
var maxstaticshadowlevel=0.2
var loadmap=0
var mapinfo=[]
/** @type {WebGL2RenderingContext}*/
var gl
/** Class representing my obj. */
var myRect=[]
var mySun=[]
var myFire=[]
var myGravi=[]
var maxdistcol=30
var menuboarder=60
var exitborder=40
var shaderProgram=[]
var updatescene=true
var updatetextur=false
var objvertecys=[]
var webglfallback=true
var webglstartdisablechecks=true
var webglbuffers=[]
var WEBGLmultidraw
var WEBGLdisjointtimer
var WEBGLdisjointtimerquery
var WEBGLoes
var WEBGLcbufferfloat
var WEBGLdisjointtimermode=0
var rendertime=0
var howmutchgrass=0
var rendertimeopt=9
var rendertimeavg=5
var rendertimeabfac=0.99
var grasshalm=[]
var updatewebglgrass=5000000
var updatetgrass=0
var grassrenderall=false
var updategrass=false
var webglgrassani=true
var webglgrasssun=true
var webglgrassdrawarr={firsts:[],counts:[],num:[],xy:[]}
var webglgrassquali=4
var webglmingrassquali=0
var webglmaxgrassquali=10
var webglgrasswantetpoligons=1000
var webglgrasscut=1000
var grasstogpuwebgl2time=[1.1,1.1,1.1,1.1]
var grasstogpuwebgl2timeminus=0.00000001
var grasstogpuwebgl2timeabfac=0.9
var grasstorender=0
var grasslimitact=false
var grasstogpuwebgl2mode=0
var anime
var maxgrassobjects=0
var webglgrassfpsstabilisation=false
var grassrandommovefuncall=true
var antialias=false
var textureantialiasing=1
var textureantialiasingscaling=true
var webglmultisampling=1
var texturquali=1
var desynchronized=true
var disablevideos=false
var disablepics=false
var noob=false
var noobtarget=0
var noobpic=false
var lastwaypoint=false
var inflive=false
var tp=false
var newstart=false
var tptofinish=false
var clearenemy=false
var playerplus1live=false
var playerplus1statsnum=false
var tooltips={}
var canrungame=false
var debtextabfac=0.8
var debtextavg=0
var debtextavgabfac=0.8
var debtextvariation=0
var debtextlength=0
var texturupdatet=false
var repaintbtime=0
var todrawb=[[],[]]
var shadows=false
var shadowblur=15
var shadowblurtype=0
var inversekinematics=navigator.userAgent.indexOf("Chrome")!==-1?true:false
var playertexturanimation=navigator.userAgent.indexOf("Chrome")!==-1?false:true
var bonescolor=true
var instandzoom=true
var idlecallbackactiv=false
var collmapnowebworker=false
var wasserphysik=true
var fpscontroll=true
var renderer=3
var renderallinstand=false
var windsmove=0.95
var wind=[0,0]
var newwind=[0,0]
var windtimer=0
var windreset=30
var windrange=[0.9,0.1]
var gpuacceleratedgame=true
var framebufferread=false
var webgldrawarr
/** @type {Array.<WebGLTransformFeedback>}*/
var transformFeedback=[]
var webgl2=true
var usewebgl2ifcan=true
var texturgenbuffertime=0.2//0.2
var texturgenmaxwaittime=Infinity//10000
var texturgenmaxstartgentime=Infinity//10000
var buildmodusresizeborder=10
var clickedonobj=null
var whatmenu=0
var directionx=0
var directiony=0
var focused=false
var buildscale=null
var doublecklick=0
var resizebuild=false
var focusedobj=null
var backupmove
var movedcordx
var movedcordy
var movebuild=false
var inversekinematicsold=true
var keys={
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
/**@param {number|string} name */
    setkeymap:function(name){
        if(this.keymaps.hasOwnProperty(name)){
            for(let i of keysdisplayarr){
                let name1=Object.keys(keys).find(me=>keys[me]===i)
                if(this.keymaps[name].hasOwnProperty(name1))this[name1]=this.keymaps[name][name1]
            }
        }
    },
/**@param {number} id */
    removecontrollerkeys:function(id){
        for(let i of [...this.arr]){
            if(this.arr[i].gpi==id){
                delete this.arr[i]
            }
        }
        if([...navigator.getGamepads()].findIndex(i=>i!=null)==-1)this.setkeymap("default")
    },
/**@param {number} id */
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
/**
 * @param {number} key
 * @param {number} strong how strong it should vibrate
*/
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
/**
 * @param {number} key
 * @param {number} stärke how strong you need to press
*/
    setnum:function(key,stärke){
        if(typeof(this.arr[key])!="undefined"){
            this.arr[key].stärke=stärke
        }else{
            this.arr[key]={stärke:stärke,mode:"key"}
        }
    },
/**
 * @param {number} key 
 * @param {string} mode the mode you want to use min max avg
 */
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
/**
 * @param {number} key 
 * @param {string} mode the mode you want to use min max avg
 */
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
/** @param {number} key */
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
/** @param {number} key */
    keytoggle:function(key){
        let erg=this.getkeyovermin(key)
        if(erg==true&&!this.deadarr[key]){this.deadarr[key]=true;return 1}
        if(erg==false&&this.deadarr[key]){this.deadarr[key]=false}
        return 0
    },
/**
 * @param {number} key 
 * @param {...number} key1
 */
    setverzweigung:function(key,...key1){
        if(this.map.hasOwnProperty(key)){
            this.map[key].push(...key1)
        }
    },
/**
 * @param {number} key 
 * @param {number} key1
 */
    remverzweigung:function(key,key1){
        this.map[key]=this.map[key].filter((i)=>{i!=key1})
    },
    resetverzweigung:function(){
        this.map={}
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setmin:function(key,key1,stärke){
        this.min[key+","+key1]=stärke
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setmax:function(key,key1,stärke){
        this.max[key+","+key1]=stärke
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setactmin:function(key,key1,stärke){
        this.actmin[key+","+key1]=stärke
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setactmax:function(key,key1,stärke){
        this.actmax[key+","+key1]=stärke
    },
    mousemove:function(){
        let bound=canvas.getBoundingClientRect();
        mousexc=(event.clientX-bound.left-canvas.clientLeft)*zoomn;
        mouseyc=(event.clientY-bound.top-canvas.clientTop)*zoomn;
    },
    mousedown:function(){
        let bound=canvas.getBoundingClientRect();
        mousex=(event.clientX-bound.left-canvas.clientLeft)*zoomn;
        mousey=(event.clientY-bound.top-canvas.clientTop)*zoomn;
    },
    mouseup:function(){
        mousex=null
        mousey=null
    },
}
let keysdisplayarr=[keys.map,keys.arr,keys.min,keys.max,keys.actmin,keys.actmax]
let stats=[
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