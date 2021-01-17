// @ts-check
'use strict';
//loading scripts
const scriptload=[
    "main.js",
    "createobj.js",
    "ai.js",
    "textur.js",
    "save.js",
    "build.js",
    "game.js",
    "events.js",
    "maps.js",
    "language.js",
    "multiplayer.js",
    "multiplayerlow.js",
    "multiplayerprotocol.js",
    "debug.js",
    "menues.js",
    "renderer0.js",
    "renderer3.js",
    "shadows.js",
    "webglgrass.js",
    "webglparticle.js",
    "skelett.js",
    "webglbuffer.js",
    "createobjhelper.js",
    "createobjsettings.js",
    "shader.js",
]
const scriptloadinportant=[
    "main.js",
    "createobj.js",
    "game.js",
    "maps.js",
    "menues.js",
    "renderer0.js",
    "renderer3.js",
    "createobjhelper.js",
    "createobjsettings.js",
    "shader.js",
]

const webglnames=[["webgl","experimental-webgl","moz-webgl","webkit-3d"],["webgl2"]]
const fpscontrollarr=[
    "webglshadowsallowed",
    "shadowlimmiter",
    "sunnlineofsight",
    "shadows",
    "suppixel",
    "inversekinematics",
    "playertexturanimation",
    "webglgrassani",
    "wasserphycollision",
    "wasserphysik",
    "textureantialiasingscaling",
    "fastmessuretext"
]
const idlength=64
const randomcaracterid="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+-;<=>?@^_`{|}~"

var oldhash=""

var weather=false
var useipapi=true
var weatherapikey="043b260d044fc7d7e4c48dd2bbdceae9"
var weaterinfo

var devicedirection=0

var shadowhighquali=false
var raydebug=false
var before=["","","","","","","","","","","",""]
var rayminmaxavg
var shadowrendermode=0
var shadowupdatemax=30
var shadowupdatecounter=0
var shadowstomemorypbo=true
var shadowfencesync=null
var shadowtexture
var suntexture
var sunorgtexture
var webglshadowsallowed=false
var webglshadowsnum=0
var webglshadowseach=224000//400000
var webglshadowseachadd=0
var webglshadowseachinshader=0
var debugkanten
var debugsun
var debugshadow
var rayres=1
var webglshadowsdrawmode="randomadd"
var shadowdrawmode=0

var failedkis={}

var webglneedtocleareveryframe=false

var statscanvas
var HerzLeerpic
var HerzHälftepic
var HerzVollpic
var statscoinpic

var oldscreenx=0
var oldscreeny=0
var veloscreenx=0
var veloscreeny=0
var closeonclose=[]
var neatkiworker=true
var gamespeedup=1
var gamespeedupcounter=0
var importki=false//import is false
var exportki=false
var basicinfo=true
var kiinfo=false
var sharedarraybufferallowed="SharedArrayBuffer" in window
var conectionpromise=[]
var conectionpromiseres=[]
var conectionpromiserej=[]
for(let i=0;i<3;i++){
    conectionpromise[i]=new Promise((r,j)=>[conectionpromiseres[i],conectionpromiserej[i]]=[r,j]);
    conectionpromise[i].res=false
    conectionpromise[i].then(()=>{conectionpromise[i].res=true},()=>{console.warn("networkerror")})
}
//bc,webrtc,websockeds
var enablemultiplayer=[false,true,true]
//make that program want to use prefered conection type
var preferemultiplayer=[3,2,1]
var preferemultiplayershortcut=["bc","webrtc","ws"]

var kiworker=true
var origin=(location.origin).replace(/file:\/\//g,"")
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
var multiplayeridcheckingonsdisplay=true
var multiplayeridcheckingonspawn=true
var multiplayerafk=new Set()
var afktimeasktime=60000
var afktimeanswere=2000
var playertimeout=true
var fastmessuretext=true
var multiplayerafktimer=[]
var bc
var websocket
var broadcastchanelname="game"
var multiplayerwebsocketurl="ws://192.168.136.116:8080/chat/php-socket.php"
var multiplayer=false
var multiplayerwebsocket=true
/** @global */
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
var allowedmaxfps=[60,100,120,144,200,240,360]
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
var debugmultiplayer=true
var walkdebug=false
var debugwinkel=false
var shadowdebug=false
var debugdebug=false
var gravidebug=false
var mousedebug=false
var distancedebug=false
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
var fishmapreset=10
var colmap=[]
var gravicache=true
var gravimap=[]
var gravisharedmap
var cancolmap=true
var objcolmap=[]
var objenemymap=[]
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
var debugbackground=false
var debugcolmap=false
var debugbuffer
var debugbufferu32
var debugbufferu8c
var debugbuffercountx=0
var debugbuffercounty=0
var debugbuffercountmax=10
var cleardebugcolmap=false
var debugcolmode="debugsun"
var suppixel=false
var imageSmoothingEnabled="none"
var idletime=0
var idletimeanpassung=0.9
var maxshadow=6000
var sunnlineofsight=false
var collupdate=false
var collwebworkershared=true
var collwebworkersharedsend=false
var colsharedmap
var objcolsharedmap
var objenemysharedmap
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
var myGravi=[]
var maxdistcol=30
var menuboarder=60
var exitborder=40
var shaderProgram=[]
var updatescene=true
var updatetextur=false
var objvertecys=[]
var webglfallback=true
var webglstartdisablechecks=false
var colltexture

var enableparticle=false
var particlegravimulti=2
var particlelivemulti=100
var particleliveadd=-0.5
var particlesizemulti=5
var particlesizeadd=0.1
var particleposxmulti=100
var particleposxadd=-0.5
var particleposymulti=100
var particleposyadd=-0.5
var particleveloxmulti=1
var particleveloxadd=-0.5
var particleveloymulti=1
var particleveloyadd=-0.5
var particlecount=0
var maxparticle=500

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
var webglgrassani=false
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
var disablevideos=true
var disablepics=false
var disabletexturs=false
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
var playertexturanimation=true
var bonescolor=true
var instandzoom=true
var idlecallbackactiv=false
var collmapnowebworker=false
var wasserphysik=false
var checkedfps=false
var fpschecktime=5000
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
var keyshared="SharedArrayBuffer" in window?new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT*1000):new ArrayBuffer(Float64Array.BYTES_PER_ELEMENT*1000)
var keysharedarr=new Float64Array(keyshared)
const glsl = x => x;