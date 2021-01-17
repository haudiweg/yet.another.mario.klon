const settings=[
    "webglneedtocleareveryframe",
    "gamespeedup",
    "gravicache",
    ["webglshadowsallowed","webglshadowsallowed","webglshadowseach","webglshadowsdrawmode","shadowstomemorypbo","raydebug","shadowupdatemax","rayres","shadowhighquali","shadowdrawmode"],
    ["neatkiworker","importki","exportki"],
    "basicinfo",
    ["noob"],
    ["broadcastchanelname","resetmultiplayer","multiplayer","multiplayerwebsocket","BroadcastChannelallowed","multiplayerwebsocketurl","multiplayerwhitelist","multiplayerblacklist","multiplayerignorenotwitelistet","multiplayerjustlisten","multiplayerinversekinematic","multiplayerconnect","debugmultiplayer","walkdebug","debugwinkel","shadowdebug","debugdebug","gravidebug","mousedebug","distancedebug","playertimeout","multiplayernoice","multiplayeridcheckingonsdisplay","multiplayeridcheckingonspawn"],
    "language","renderer","usewebgl2ifcan","Fullscreen",
    ["disablevideos","disablepics","disabletexturs"],
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
    "debug","debugbackground","walkdebug","debugwinkel","fishmapreset","idletimeanpassung","maxdistcol",
    ["menuboarder","exitborder"],
    ["debtextabfac","debtextavgabfac"],
    "inversekinematics","bonescolor","playertexturanimation","collmapnowebworker","collwebworkershared",
    ["wasserphysik","wasserphycollision","wasserphyplayerwave"],
    "fpscontroll","renderallinstand","disablemenucontrolls",
    [
        ["webglgrassani","webglgrasssun","webglmingrassquali","webglmaxgrassquali","grassrenderall","webglgrasswantetpoligons","webglgrassfpsstabilisation"],
        "windsmove","windrange","windreset"
    ],
    ["texturgenbuffertime","texturgenmaxstartgentime","texturgenmaxwaittime"],
    "fastmessuretext",
    "kiworker",
    ["enableparticle","particlegravimulti","particlelivemulti","particleliveadd","particlesizemulti","particlesizeadd","particleposxmulti","particleposxadd","particleposymulti","particleposyadd","particleveloxmulti","particleveloxadd","particleveloymulti","particleveloyadd","particlecount","maxparticle"]
]
const cheatsettings=["cheats","fly","nocollision","nokill","debug","shadowrand","shadowstroke","debugcolmap","debugcolmode"]
const noobsettings=["noobtarget",["nokill","inflive"],["tp","tptofinish"],["newstart","lastwaypoint"],"clearenemy",["playerplus1live","playerplus1statsnum"]]

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
    walkdebug:"boolean",
    debugwinkel:"boolean",
    shadowdebug:"boolean",
    debugdebug:"boolean",
    gravidebug:"boolean",
    mousedebug:"boolean",
    distancedebug:"boolean",
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
    collwebworkershared:"boolean",
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
    disabletexturs:"boolean",
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
    multiplayernoice:"boolean",
    multiplayeridcheckingonsdisplay:"boolean",
    multiplayeridcheckingonspawn:"boolean",
    multiplayerwebsocket:"boolean",
    multiplayerwebsocketurl:"string",
    BroadcastChannelallowed:"boolean",
    fastmessuretext:"boolean",
    kiworker:"boolean",
    enableparticle:"boolean",
    particlegravimulti:"number",
    particlelivemulti:"number",
    particleliveadd:"number",
    particlesizemulti:"number",
    particlesizeadd:"number",
    particleposxmulti:"number",
    particleposxadd:"number",
    particleposymulti:"number",
    particleposyadd:"number",
    particleveloxmulti:"number",
    particleveloxadd:"number",
    particleveloymulti:"number",
    particleveloyadd:"number",
    particlecount:"number",
    maxparticle:"number",
    basicinfo:"boolean",
    importki:"boolean",
    exportki:"boolean",
    gamespeedup:"number",
    walkdebug:"boolean",
    debugwinkel:"boolean",
    gravicache:"boolean",
    neatkiworker:"boolean",
    webglneedtocleareveryframe:"boolean",
    webglshadowsallowed:"boolean",
    webglshadowseach:"number",
    webglshadowsdrawmode:"string",
    shadowstomemorypbo:"boolean",
    raydebug:"boolean",
    shadowupdatemax:"boolean",
    rayres:"number",
    shadowhighquali:"boolean",
    shadowdrawmode:"number",
    debugbackground:"boolean"
}
const profilesettings={
    noonline:{
        weather:false,
        enablemultiplayer:[false,false,false],
        multiplayer:false,
    },
    badpc:{
        webglshadowsallowed:false,
        shadowlimmiter:false,
        sunnlineofsight:false,
        shadows:false,
        suppixel:false,
        inversekinematics:false,
        playertexturanimation:false,
        webglgrassani:false,
        wasserphycollision:false,
        wasserphysik:false,
        textureantialiasingscaling:false,
        fastmessuretext:false,
    },
    notextures:{
        disablevideos:true,
        disablepics:true,
        disabletexturs:true,
    },
    moredebug:{
        debug:true,
        walkdebug:true,
        debugmultiplayer:true,
    },
}