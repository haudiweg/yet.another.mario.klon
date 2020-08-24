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
    /**array that defines every variable in the obj*/

    //[regex(numbers strings etc get convertet to typeof object),type,regex]
    type:{
        x:[/^\[(number,)*number\]$|^number$/,"object"],
        y:[/^\[(number,)*number\]$|^number$/,"object"],
        w:"number",
        h:"number",
        static:"boolean",
        shadow:[/^\[(,?\[(object,)*(object)?\])+\]|\[undefined\]|\[\]$/,"object"],
        shadowadd:"object",
        fill:"string|object",
        fillstr:"string",
        fillbackup:"string",
        phy:"boolean",
        allblue:"boolean",
        übergang:"number",
        stärke:"number",
        stärkemit:"number",
        smovnes:"number",
        stärke1:"number",
        stärkemit1:"number",
        einpendelphasse:"number",
        down:"number",
        schaum:"number",
        Spread:"number",
        j:"number",
        TargetHeight:"number",
        dampening:"number",
        tension:"number",
        wasserfps:"number",
        construck:"string",
        construckarr:"string",
        reibung:"number",
        haftreibung:"number",
        dmg:"number",
        md:"number",
        dir:"number",
        type:[/string|(\[(string,)*string\])/,"object"],
        statsnum:"number",
        sx:"number",
        sy:"number",
        velo:[/\[number,number\]/,"object"],
        falldist:"number",
        inwater:"boolean",
        masse:"number",
        nokill:"number",
        owner:"object",
        winkel:"number",
        speed:"number",
        bounce:"number",
        bouncemax:"number",
        bouncelast:"number",
        wasserphysa:[/\[object,object\]/,"object"],
        wasserphycollision:"boolean",
        wasserphyplayerwave:"boolean",
        dest:"boolean",
        ro:"number",
        wx:"number",
        wy:"number",
        gennumbers:[/(\[\[(number,?)*\],(\[(number,)*number\]|number),(\[(number,)*number\]|number),number,number\])/,"object"],
        havcoll:"boolean",
        kitype:"number",
        graviins:[/\[number,number\]/,"object"],
        gravirich:"number",
        rich4:"number",
        rich4arr:[/\[number,number,number,number\]/,"object"],
        rich2:[/\[number,number\]/,"object"],
        rich2arr:[/\[number,number\]/,"object"],
        abfac:"number",
        dx:"number",
        dy:"number",
        abnahmeheight:"number",
        filtersmove:"number",
        offsetheight:"number",
        randomnis:"number",
        texturrichtung:[/\[(number,)*number\]/,"object"],
        überlagerung:"number",
        savemin:"number",
        fillpic:"string",
        blur:"number",
        blurcolor:"string",
        stats:[/\[(\[((\[(object,)*object\],)*(\[(object,)*object\]))\],)*(\[((\[(object,)*object\],)*(\[(object,)*object\]))\])\]/,"object"],
        pipetexturtop:"number",
        pipetexturside:"number",
        pipetextur1r:"number",
        pipetextur1g:"number",
        pipetextur1b:"number",
        pipetextur1a:"number",
        pipetextur2a:"number",
        grassstone:"number",
        grasstexturgrass:[/\[(\[number,number\],){3}number\]/,"object"],
        grasstexturdirt:[/\[(\[number,number\],){3}number\]/,"object"],
        grasstexturstone:[/\[(\[number,number\],){3}number\]/,"object"],
        grassfilter:"number",
        snowstone:"number",
        snowtextursnow:[/\[(\[number,number\],){3}number\]/,"object"],
        snowtexturdirt:[/\[(\[number,number\],){3}number\]/,"object"],
        snowtexturstone:[/\[(\[number,number\],){3}number\]/,"object"],
        snowfilter:"number",
        wassertexturschaum:"number",
        wassertexturwasser:"number",
        questiontexturdistanz:"number",
        questiontexturtextcolor:"string",
        questiontexturtextstroke:"string",
        questiontexturcolor:"string",
        questiontexturpointcolor:"string",
        questiontexturtext:"string",
        inversekinematics:"boolean",
        picoff:[/\[number,number\]/,"object"],
        rotate:"number",
        bones:[/\[(object,)*object\]/,"object"],
        animation:"object",
        damage:"object",
        nodraw:"boolean",
        fishtoattack:"boolean",
        texture:"object",
        webglfill:[/\[(number,){3}number\]/,"object"],//hir noch werte eingrenzen
        grassrandomfactor:"number",
        Questionblock:{
            option:[/(\[(\[string(,object)?(,\[\[object\]\]|(,\[number,\[\[object\]\]\])|(,\[number,number,\[\[object\]\]\]))?\])?,?(\[string(,object)?(,\[\[object\]\]|(,\[number,\[\[object\]\]\])|(,\[number,number,\[\[object\]\]\]))?\])?\])/,"object"]
        },
        Specialblock:{
            option:[/(\[(number,)*number\])|number/,"object"]
        },
        Grassani:{
            grass:[/\[((object,)*object)?\]/,"object"],
            grassspawn:"function"
        },
        Player:{
            environment:"boolean",
            playerphysik:"boolean",
            getstats:"object",
            shift:"boolean",
            nomove:"number",
            umgebung:[/^\[(\[(object|number)?,number\],){3}\[(object|number)?,number\]\]$/,"object"],
            disto:[/^\[(\[((object,)*boolean)?\],){3}\[((object,)*boolean)?\]\]$/,"object"],
            distd:[/^\[(\[((number,)*number)?\],){3}\[((number,)*number)?\]\]$/,"object"],
            controls:"object"
        }
    },
    /**dont show it in debug*/
    notdisplay:{
        global:[
            "shadow",
            "shadowadd",
            "static",
            "construck",
            "construckarr",
            "wasserphysa",
            "gennumbers",
            "rich4",
            "rich4arr",
            "rich2",
            "rich2arr",
            "gravirich",
            "graviins",
            "getstats",
            "animation",
            "bones",
            "umgebung",
            "shift",
            "nomove",
            "damage",
            "disto",
            "distd",
            "grassspawn"
        ]
    },
    savedell:[
        "shadow",
        "shadowadd",
        "graviins",
        "gravirich",
        "rich4",
        "rich4arr",
        "rich2",
        "rich2arr",
        "damage",
        "nomove",
        "shift",
        "umgebung",
        "bones",
        "animation",
        "disto",
        "texture",
        "webglfill",
        "grassspawn"
    ],
    tooltip:{
        en:{
            x:"cordinate <> of player"
        },
        de:{
            x:"cordinaten <> von Spieler" 
        }
    },
    /**@private */
    check:function(arr,defaultarr){
        if(typeof(createobj[this.constructor.name].type)=="undefined"){
            Object.create(createobj[this.constructor.name].type={...createobj.type})//filter hir alle obj raus die namen von obj haben
            if(typeof(createobj.type[this.constructor.name])=="object")Object.assign(createobj[this.constructor.name].type,createobj.type[this.constructor.name])
        }
        if(typeof(createobj[this.constructor.name].notdisplay)=="undefined"){
            Object.create(createobj[this.constructor.name].notdisplay={...createobj.notdisplay.global})
            if(typeof(createobj.notdisplay[this.constructor.name])=="object")Object.assign(createobj[this.constructor.name].notdisplay,createobj.notdisplay[this.constructor.name])
        }
        //@ts-expect-error
        let languagetemp=language=="auto"?(window.navigator.languages?window.navigator.languages[0]:navigator.language||navigator.browserLanguage||navigator.userLanguage||"en").replace(/[-_].*/,""):language
        if(!createobj.tooltip.hasOwnProperty(languagetemp))languagetemp="en"
        if(typeof(createobj[this.constructor.name].tooltip)=="undefined"){
            Object.create(createobj[this.constructor.name].tooltip={...createobj.tooltip[languagetemp]})//filter hir alle obj raus die namen von obj haben
            if(typeof(createobj.tooltip[languagetemp][this.constructor.name])=="object")Object.assign(createobj[this.constructor.name].tooltip,createobj.tooltip[languagetemp][this.constructor.name])
        }
        Object.defineProperty(this, 'construckarr', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: (arr=="return")?defaultarr.constructor.name:Object.keys(window).find(me=>window[me]===((typeof(arr[0])=="number")?arr[arr.length-1]:(arr!==undefined?arr:defaultarr.constructor.name)))
        });
        Object.defineProperty(this, 'construck', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: this.constructor.name
        });
        if(!checkprop(this))return
        //arr="return"
        //arr=myRect
        //arr=[0,myRect] //zahl=platz in aktuellen myRect array
        //arr=[0,0,myRect] // erste zahl myRect array karten number   zweite zahl number in myRect array
        if(typeof(arr[0])=="number"){
            if(arr.length==3){
                arr[2][arr[0]][arr[1]]=this
            }else{
                arr[1][loadmap][arr[0]]=this
            }
        }else{
            if(arr=="return"){
                return this
            }else{
                if(arr==undefined){
                    defaultarr[loadmap].push(this)
                }else{
                    arr[loadmap].push(this)
                }
            }
        }
    },
    /**@private */
    pos:function(opt){
        let numt=opt.findIndex(i=>i.constructor.name=="Object")
        if(numt!=-1){
            let temp=opt[numt]
            opt[numt]=undefined
            opt[4]=temp
        }
        for(let i=0;i<4;i++){if(opt[i]==undefined)opt[i]=[this.x,this.y,this.w,this.h][i]}
        Object.assign(this,{x:opt[0],y:opt[1],w:opt[2],h:opt[3]},opt[4])
        if(typeof(this.x)=="object")this.w=Math.max(0,Math.max(...this.x)-Math.min(...this.x));
        if(typeof(this.y)=="object")this.h=Math.max(0,Math.max(...this.y)-Math.min(...this.y));
    },
    /**@private */
    bones:function(){
        for(let i of this.bones){
            i.wait=true
            i.t=this
            let obj=Object.keys(i).filter(me=>typeof(i[me])=="object"&&i[me]!=this)
            for(let i1 of obj){
                i[i1].t=this
                Object.defineProperty(i[i1], 'len2',{get: function() {return i[i1].len**2}});
            }
            for(let i1=0;typeof(i["segment"+i1])!="undefined";i1++){
                i["segment"+i1].x=0
                i["segment"+i1].y=0
            }
        }
    },
    /**@private */
    animation:function(){
        let temp=this.animation
        temp.reset=null
        let obj=Object.keys(this.animation).filter(me=>typeof(temp[me])=="object"&&me.includes("fillpic"))
        for(let i of obj){
            temp[i].t=this
            if(typeof(temp[i].aniframe)=="undefined")temp[i].aniframe=0
            if(typeof(temp[i].mode)=="undefined")temp[i].mode="loopjump"
            if(temp[i].mode=="loopback"&&typeof(temp[i].dir)!="number")temp[i].dir=1
            for(let i1 of temp[i].pic){
                let img = new Image();
                img.src = i1[1][0];
                img.onload=()=>{i1[1][1]=img}
            }
        }
    },
/**@type {createobjfunc}*/
    Shape:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fill = "grey";
        this.dest = false;
        this.static = true;
        this.reibung = 0.1;
        this.haftreibung = 0.3;
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
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
        this.md = 1;
        this.nodraw = true;
        this.havcoll = false;
        this.dest = false;
        this.static = true;
        this.reibung = 0.1;
        this.haftreibung = 0.3;
        this.grassrandomfactor = 0.8;//0.8
        this.texturrichtung = [0,1];
        this.grassspawn=function(...opt){
            let gen={}
            gen.x=0
            gen.y=0
            gen.w=1
            gen.h=10
            gen.rotation=0
            gen.randomwind=Math.random()*2-1
            gen.windsmove=0.93+(Math.random()*0.1-0.05)
            gen.range=0.8+(Math.random()*0.1-0.05)
            gen.velo=[0,0]
            gen.spitze=Math.random()>=0.5
            gen.color=[0+Math.random()*0.2,1-Math.random()*0.2,0+Math.random()*0.2,1]

            const keys=Object.keys(gen)
            if(Array.isArray(opt)){
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
                            for(i1 of keys)if(opt[i].includes(i1))gen[i1]=opt[i][i1]
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
        this.grass = [];
        this.damage={
            t:this,
            collide:function(me){
                if(renderer==3&&!webgl2&&webglgrassani){
                    const mingx=typeof(this.t.x)=="object"?Math.min(...this.t.x):this.t.x
                    const mingy=typeof(this.t.y)=="object"?Math.min(...this.t.y):this.t.y
                    for(let i of this.t.grass){
                        let i1=(me.x+me.w/2-(mingx+i.x))*(me.x+me.w/2-(mingx+i.x))+(me.y+me.h/2-(mingy+i.y))*(me.y+me.h/2-(mingy+i.y))
                        if (i1<100){
                            i.velo[0]=-me.velo[0]*((400-i1)/25)
                            i.velo[1]=-me.velo[1]*((400-i1)/25)
                        }
                    }
                }
            },
        };
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
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
        createobj.pos.call(this,opt)
        this.gennumbers=[[],0,0,0,0]
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
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
        this.snowstone = 50;
        this.snowtextursnow = [[30,205],[30,205],[20,225],255];
        this.snowtexturdirt = [[50,102],[50,102],[50,102],255];
        this.snowtexturstone = [[100,39],[100,-31],[50,-16],255];
        this.snowfilter = 1;
        createobj.pos.call(this,opt)
        this.gennumbers=[[],0,0,0,0]
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
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
        createobj.pos.call(this,opt)
        this.wasserphysa=[new Float32Array(this.w),new Float64Array(this.w)]
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Powerup:function(arr,...opt) {
        let defaultarr=myRect;
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
        this.static = true;
        this.damage={
            t:this,
            jump:function(me){
                if (me.getstats.powerup.includes(this.t.md)){me.statsnum=this.t.md}
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
            },
            collide:function(me){
                if (me.getstats.powerup.includes(this.t.md)){me.statsnum=this.t.md}
                myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1)
                if(renderer==3)updatescene=true
            },
        };
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Enemy:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.type = "ki";
        this.havcoll = false;
        this.fill = "gray";
        this.dmg = 0;
        this.md = 0;
        this.kitype = 0;
        this.dir = 0;
        this.static = false;
        this.damage={
            t:this,
            fire:function(){
                if(this.t.dmg>0)this.t.dmg--
                if(this.t.dmg==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            jump:function(){
                if(this.t.dmg>0)this.t.dmg--
                if(this.t.dmg==0){
                    myRect[loadmap].splice(myRect[loadmap].indexOf(this.t),1);
                    if(renderer==3)updatescene=true
                }
            },
            collide:function(me,nokill){
                if(nokill)return
                if (me.statsnum>0){
                    console.log("dmg")
                    me.statsnum=me.getstats.minus
                    me.nokill=1
                }else if (me.dmg>0){
                    console.log("kill")
                    me.x=me.sx
                    me.y=me.sy
                    me.dmg--
                    me.nokill=1
                    if(renderer==0)renderbackground=true
                }else{
                    console.log("kill no live")
                    me.x=me.sx=me.dx
                    me.y=me.sy=me.dy
                    me.dmg=5
                    me.nokill=1
                    if(renderer==0)renderbackground=true
                }
                if(renderer==3)updatescene=true
            }
        };
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Koopa:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.type = "kikoopa";
        this.havcoll = false;
        this.fill = "gray";
        this.dmg = 1;
        this.md = 0;
        this.kitype = 0;
        this.dir = 0;
        this.static = false;
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Specialblock:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fill = "orange";
        this.dir = 0;
        this.option = 0;
        this.reibung = 0.06;
        this.haftreibung = 0.02;
        this.static = false;
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Pipe:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.type="pipe";
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
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Player:function(arr,...opt) {
        let defaultarr=myRect;
        this.inversekinematics = true;
        this.bones=
            [
                {
                phy:true,
                bewegung:-1,
                get fussklippe(){return this.t.inwater&&this.t.falldist>10?16:18},
                origin:{
                    get x(){
                        if(this.t.inwater&&this.t.falldist>10){
                            if(this.t.velo[0]>0)return this.t.x
                            if(this.t.velo[0]<0)return this.t.x+this.t.w
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.x
                            if(this.t.rich4arr[0]==0)return this.t.x+this.t.w/2-2
                            if(this.t.rich4arr[0]==1)return this.t.x
                            if(this.t.rich4arr[0]==2)return this.t.x+this.t.w/2-2
                            if(this.t.rich4arr[0]==3)return this.t.x+this.t.w
                        }
                    },
                    get y(){
                        if(this.t.inwater&&this.t.falldist>10){
                            return this.t.y+this.t.h/2-4
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.y+(this.t.h/4)*3
                            if(this.t.rich4arr[0]==0)return this.t.y+(this.t.h/4)*3
                            //if(this.t.rich4arr[0]==1)return this.t.y+this.t.h/2-4
                            //if(this.t.rich4arr[0]==2)return this.t.y+this.t.h
                            //if(this.t.rich4arr[0]==3)return this.t.y+this.t.h/2-4
                        }
                    }
                },
                pointer:{
                    get x(){
                        if(this.t.inwater&&this.t.falldist>10){
                            if(this.t.velo[0]<0)return this.t.x+this.t.w+20
                            if(this.t.velo[0]>0)return this.t.x-20
                        }else{
                            return this.t.x+this.t.w/2-2
                        }
                    },
                    get y(){
                        if(this.t.inwater&&this.t.falldist>10){
                            return this.t.y+this.t.h/2-4
                        }else{
                            return this.t.y+this.t.h
                        }
                    }
                },
                segment0:{
                    phy:true,
                    get next(){return this.t.bones[0].segment1},
                    get origin(){return this.t.bones[0].origin},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8+1}
                },
                segment1:{
                    phy:true,
                    get origin(){return this.t.bones[0].segment0},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8}
                }
            },{
                phy:true,
                bewegung:-6,
                get fussklippe(){return this.t.inwater&&this.t.falldist>10?16:8},
                origin:{
                    get x(){
                        if(this.t.inwater&&this.t.falldist>10){
                            if(this.t.velo[0]>0)return this.t.x
                            if(this.t.velo[0]<0)return this.t.x+this.t.w
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.x
                            if(this.t.rich4arr[0]==0)return this.t.x+this.t.w/2+2
                            if(this.t.rich4arr[0]==1)return this.t.x
                            if(this.t.rich4arr[0]==2)return this.t.x+this.t.w/2+2
                            if(this.t.rich4arr[0]==3)return this.t.x+this.t.w
                        }
                    },
                    get y(){
                        if(this.t.inwater&&this.t.falldist>10){
                            return this.t.y+this.t.h/2+4
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.y+(this.t.h/4)*3
                            if(this.t.rich4arr[0]==0)return this.t.y+(this.t.h/4)*3
                            //if(this.t.rich4arr[0]==1)return this.t.y+this.t.h/2+4
                            //if(this.t.rich4arr[0]==2)return this.t.y+this.t.h
                            //if(this.t.rich4arr[0]==3)return this.t.y+this.t.h/2+4
                        }
                    }
                },
                pointer:{
                    get x(){
                        if(this.t.inwater&&this.t.falldist>10){
                            if(this.t.velo[0]<0)return this.t.x+this.t.w+20
                            if(this.t.velo[0]>0)return this.t.x-20
                        }else{
                            return this.t.x+this.t.w/2+2
                        }
                    },
                    get y(){
                        if(this.t.inwater&&this.t.falldist>10){
                            return this.t.y+this.t.h/2-4
                        }else{
                            return this.t.y+this.t.h
                        }
                    }
                },
                segment0:{
                    phy:true,
                    get next(){return this.t.bones[1].segment1},
                    get origin(){return this.t.bones[1].origin},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8+1},
                },
                segment1:{
                    phy:true,
                    get origin(){return this.t.bones[1].segment0},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8}
                }
            },{
                phy:false,
                segment0:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.bones[0].segment1.x+((this.t.dir==1)?2:-2),y:this.t.bones[0].segment1.y} 
                        return {x:this.t.bones[0].segment1.x+((this.t.dir==1)?0.5:-0.5),y:this.t.bones[0].segment1.y+((this.t.dir==1)?0.5:-0.5)-2}
                    },
                    get finish(){
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.bones[0].segment1.x,y:this.t.bones[0].segment1.y} 
                        return {x:this.t.bones[0].segment1.x+((this.t.dir==1)?0.5:-0.5),y:this.t.bones[0].segment1.y}
                    },
                    width:5,
                    fillpic0:"img/Mario/MarioRFuß.svg",
                    fillpic1:"img/Mario/MarioLFuß.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    len:7,
                },
                segment1:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.bones[1].segment1.x+((this.t.dir==1)?2:-2),y:this.t.bones[1].segment1.y} 
                        return {x:this.t.bones[1].segment1.x+((this.t.dir==1)?0.5:-0.5),y:this.t.bones[1].segment1.y+((this.t.dir==1)?0.5:-0.5)-2}
                    },
                    get finish(){
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.bones[1].segment1.x,y:this.t.bones[1].segment1.y} 
                        return {x:this.t.bones[1].segment1.x+((this.t.dir==1)?0.5:-0.5),y:this.t.bones[1].segment1.y}
                    },
                    width:5,
                    fillpic0:"img/Mario/MarioRFuß.svg",
                    fillpic1:"img/Mario/MarioLFuß.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    len:7,
                },
                segment2:{
                    phy:false,
                    get origin(){//umdrehn von körpr mit dir
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.bones[0].segment0.x+(this.t.dir==1?10:-10),y:this.t.y+this.t.h/2}
                        return {x:this.t.x+this.t.w/2,y:this.t.y+this.t.h/3}
                    },
                    get finish(){
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.bones[0].segment0.x,y:this.t.y+this.t.h/2}
                        return {x:this.t.x+this.t.w/2,y:this.t.y+(this.t.h/4)*3}
                    },
                    width:10,
                    fillpic0:"img/Mario/MarioKörper.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment3:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater&&this.t.falldist>10)return {x:this.t.x+(this.t.dir==1?this.t.w:0),y:this.t.y+this.t.h/2}
                        return {x:this.t.x+this.t.w/2+1*Math.sin(this.winkel),y:this.t.y}
                    },
                    get finish(){
                        return this.t.bones[2].segment2.origin
                    },
                    width:10,
                    fillpic0:"img/Mario/MarioRKopf.svg",
                    fillpic1:"img/Mario/MarioLKopf.svg",
                    get fillconfig(){return this.t.dir==1?this.fill0:this.fill1},
                    len:7,
                    winkel:0
                },
                segment4:{
                    phy:false,
                    get origin(){return {x:this.t.x+this.t.w/2-this.t.bones[2].segment2.width/2,y:this.t.bones[2].segment2.origin.y}},
                    get finish(){return {x:this.t.x+this.t.w/2-this.t.bones[2].segment2.width/2,y:this.t.y+this.t.h*(2.5/4)}},
                    width:2,
                    fillpic0:"img/Mario/MarioLArm.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment5:{
                    phy:false,
                    get origin(){return {x:this.t.x+this.t.w/2+this.t.bones[2].segment2.width/2,y:this.t.bones[2].segment2.origin.y}},
                    get finish(){return {x:this.t.x+this.t.w/2+this.t.bones[2].segment2.width/2,y:this.t.y+this.t.h*(2.5/4)}},
                    width:2,
                    fillpic0:"img/Mario/MarioRArm.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment6:{
                    phy:false,
                    get origin(){return {x:this.t.bones[2].segment4.finish.x,y:this.t.bones[2].segment4.finish.y-2}},
                    get finish(){return {x:this.t.bones[2].segment4.finish.x,y:this.t.bones[2].segment4.finish.y+2}},
                    width:2,
                    fillpic0:"img/Mario/MarioLHand.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment7:{
                    phy:false,
                    get origin(){return {x:this.t.bones[2].segment5.finish.x,y:this.t.bones[2].segment5.finish.y-2}},
                    get finish(){return {x:this.t.bones[2].segment5.finish.x,y:this.t.bones[2].segment5.finish.y+2}},
                    width:2,
                    fillpic0:"img/Mario/MarioRHand.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
            }
        ]
        this.controls = {w:87,a:65,s:83,d:68,r:82};
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.havcoll = true;
        this.fill = "blue";
        this.rotate = 0;
        this.fishtoattack = true;

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
                mode:"loopback",
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
        }
        createobj.animation.call(this)
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
        createobj.pos.call(this,opt)
        this.sx = this.x;
        this.sy = this.y;
        this.dx = this.x;
        this.dy = this.y;
        this.fillstr=this.fill;
        this.shift=false;
        Object.defineProperties(this,{getstats:{get:function(){return this.stats[this.inwater|0][this.shift|0][this.statsnum|0]}}})
        //console.log(this)
        //this.getstats=function(){return this.stats[this.inwater][this.shift][this.statsnum]}
        createobj.bones.call(this)
        createobj.check.call(this,arr,defaultarr)
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
        this.blur=5;
        this.blurcolor="yellow";
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
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
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Feuer:function(arr,...opt) {
        let defaultarr=myFire;
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.owner = myRect[0];
        this.winkel = 0;
        this.speed = 32;
        this.static = false;
        this.bounce = 0;
        this.bouncemax = 10;
        this.bouncelast = -1;
        this.havcoll = false;
        this.fill = "red";
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        setTimeout(()=>{myFire[loadmap].splice(myFire[loadmap].indexOf(this),1);if(renderer==3)updatescene=true},10000);
        createobj.check.call(this,arr,defaultarr)
    },
/**@type {createobjfunc}*/
    Finish:function(arr,...opt) {
        let defaultarr=myRect;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.type = "finish";
        this.havcoll = true;
        this.fill = "URL";
        this.fillpic = "img/Haus.svg";
        this.fillbackup = "orange";
        this.static = true;
        this.reibung = 0.05;
        this.haftreibung = 0.02;
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
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
        createobj.pos.call(this,opt)
        createobj.check.call(this,arr,defaultarr)
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
        this.md = 1;
        this.dest = false ;
        this.static = true;
        this.damage={
            t:this,
            jump:function(me){
                if (me.dmg>0){
                    console.log("kill")
                    me.x=me.sx
                    me.y=me.sy
                    me.dmg--
                    me.nokill=1
                    if(renderer==3)updatescene=true
                }else{
                    console.log("kill no live")
                    me.x=me.sx=me.dx
                    me.y=me.sy=me.dy
                    me.dmg=5
                    me.nokill=1
                    if(renderer==0)renderbackground=true
                    if(renderer==3)updatescene=true
                }
            },
            collide:function(me){
                if (me.dmg>0){
                    console.log("kill")
                    me.x=me.sx
                    me.y=me.sy
                    me.dmg--
                    me.nokill=1
                    if(renderer==3)updatescene=true
                }else{
                    console.log("kill no live")
                    me.x=me.sx=me.dx
                    me.y=me.sy=me.dy
                    me.dmg=5
                    me.nokill=1
                    if(renderer==0)renderbackground=true
                    if(renderer==3)updatescene=true
                }
            },
        };
        createobj.pos.call(this,opt)
        this.fillstr=this.fill;
        createobj.check.call(this,arr,defaultarr)
    }
}
Object.freeze(createobj)
function checkprop(obj){
    let fehlerteil
    let typeofrec=b=>Array.isArray(b)?"["+b.map(a=>typeofrec(a))+"]":typeof(b)
    let bool=Object.getOwnPropertyNames(obj).some(prop=>{
        let match=Array.isArray(createobj[obj.construck].type[prop])?createobj[obj.construck].type[prop][0]:createobj[obj.construck].type[prop]
        let conv=typeofrec(obj[prop])
        let numberregcheck
        let regexcheck=false
        let convregexcheck=""
        if(Array.isArray(createobj[obj.construck].type[prop])&&createobj[obj.construck].type[prop].length==3){
            if(createobj[obj.construck].type[prop][2] instanceof RegExp){
                convregexcheck=JSON.stringify(prop)
                numberregcheck=convregexcheck.match(createobj[obj.construck].type[prop][2])
                regexcheck=true
            }
        }
        let type=conv.match(match)
        if(type==null||type.index!==0||!createobj[obj.construck].type.hasOwnProperty(prop)||(regexcheck&&(numberregcheck==null||numberregcheck.index!==0))){
            fehlerteil=regexcheck?[prop,obj[prop],typeof(match)=="object"?match.source:match,conv,type,createobj[obj.construck].type[prop][2],convregexcheck,numberregcheck]:[prop,obj[prop],typeof(match)=="object"?match.source:match,conv,type]
            return true
        }
        return false
    })
    if(typeof(obj.fill)!=="undefined"&&!obj.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|ImageData")&&typeof(colorobj)!="undefined"&&!Object.getOwnPropertyNames(colorobj).includes(obj.fill)){
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
const webglbuffer={
    createbuffer:function(groupname,opt){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        this.group=group
        this.buffername="coordinates"
        this.bufferlength=2
        this.divisor=0
        this.drawtype=group.gl.DYNAMIC_DRAW
        this.buffertype=group.gl.ARRAY_BUFFER
        this.numbertype=group.gl.FLOAT
        this.normalized=false
        this.stride=0
        this.offset=0
        webglbuffer.addpro.call(this,opt)
        this.pointer=group.gl.getAttribLocation(group.shader, this.buffername)
        this.buffer=group.gl.createBuffer()
        group.gl.bindBuffer(group.gl.ARRAY_BUFFER,this.buffer);
        group.gl.bufferData(this.buffertype,group.buffersize*bpe*this.bufferlength,this.drawtype)
        group.gl.bindBuffer(group.gl.ARRAY_BUFFER,null)
        group.buffer[this.buffername]=this
    },
    createfeedbackbuffer:function(groupname,opt){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        let this0={}
        let this1={}
        this.group=group
        this.buffername="coordinates"
        this.bufferlength=2
        this.divisor=0
        this.drawtype=group.gl.DYNAMIC_DRAW
        this.buffertype=group.gl.TRANSFORM_FEEDBACK_BUFFER
        this.numbertype=group.gl.FLOAT
        this.normalized=false
        this.stride=0
        this.offset=0
        webglbuffer.addpro.call(this,opt)
        this.pointer=group.gl.getAttribLocation(group.shader, this.buffername)//man solte jetzt kucken wen da1 in name steht
        webglbuffer.addproall.call(this0,this)
        webglbuffer.addproall.call(this1,this)
        this0.buffer=group.gl.createBuffer()
        group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,this0.buffer);
        group.gl.bufferData(group.gl.TRANSFORM_FEEDBACK_BUFFER,group.buffersize*bpe*this.bufferlength,this.drawtype)
        group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,null)
        group.feedbackbuffer[this.buffername]=this0

        this1.buffer=group.gl.createBuffer()
        group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,this1.buffer);
        group.gl.bufferData(group.gl.TRANSFORM_FEEDBACK_BUFFER,group.buffersize*bpe*this.bufferlength,this.drawtype)
        group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,null)
        group.feedbackbuffer[this.buffername+"1"]=this1
    },
    creategroup:function(opt){
        this.name="newBuffer"
        if(typeof(opt.name)=="string")this.name=opt.name
        this.gl=ctx
        this.shader=shaderProgram[0]
        this.buffersize=500//500000
        webglbuffer.addpro.call(this,opt)
        webglbuffers[this.name]=this
        webglbuffers[this.name].buffer={}
        webglbuffers[this.name].feedbackbuffer={}
        webglbuffers[this.name].uniform={}
    },
    createuniform:function(groupname,name){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        group.uniform[name]=group.gl.getUniformLocation(group.shader,name)
    },
    addvaotogroup:function(groupname){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        for(let i of Object.keys(group.buffer)){
            group.gl.bindBuffer(group.gl.ARRAY_BUFFER,group.buffer[i].buffer);
            group.gl.bufferData(group.buffer[i].buffertype,group.buffersize*bpe*group.buffer[i].bufferlength,group.buffer[i].drawtype)
        }
        group.vao=group.gl.createVertexArray();
        group.gl.bindVertexArray(group.vao)
        for(let i of Object.keys(group.buffer)){
            group.gl.bindBuffer(group.gl.ARRAY_BUFFER,group.buffer[i].buffer);
            group.gl.enableVertexAttribArray(group.buffer[i].pointer)
            group.gl.vertexAttribPointer(group.buffer[i].pointer,group.buffer[i].bufferlength,group.buffer[i].numbertype,group.buffer[i].normalized,group.buffer[i].stride,group.buffer[i].offset);
        }
        for(let i of Object.keys(group.feedbackbuffer)){
            group.gl.enableVertexAttribArray(group.feedbackbuffer[i].pointer)
        }
        group.gl.bindVertexArray(null);
    },
    bindandpointbuffer:function(obj){
        obj.group.gl.bindBuffer(obj.buffertype,obj.buffer)
        obj.group.gl.vertexAttribPointer(obj.pointer,obj.bufferlength,obj.numbertype,obj.normalized,obj.stride,obj.offset);
    },
    addproall:function(opt){
        for(let i of Object.keys(opt)){
            if(!this.hasOwnProperty(i))this[i]=opt[i]
        }
    },
    addpro:function(opt){
        for(let i of Object.keys(this)){
            if(opt.hasOwnProperty(i))this[i]=opt[i]
        }
    },
    testbufferoverflow:function(groupname,objlength){
        //suche welche buffer enabled sind
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
    
        if(group.buffersize<objlength*bpe+100){
            const buffersizeold=group.buffersize
            let multi=Math.pow(10,(Math.log(objlength*bpe)*Math.LOG10E+1|0)-1)
            group.buffersize=Math.ceil((objlength*bpe)/multi)*multi
    
            if(group.name=="obj")updatescene=true
            if(debug)console.log("buffer to smal update size\nfrom: "+Number((buffersizeold).toFixed(1)).toLocaleString()+"\nto: "+Number((group.buffersize).toFixed(1)).toLocaleString()+"\nname: "+group.name)
    
            for(let i of Object.keys(group.buffer)){
                group.gl.bindBuffer(group.buffer[i].buffertype, group.buffer[i].buffer);
                group.gl.bufferData(group.buffer[i].buffertype, group.buffersize*bpe*group.buffer[i].bufferlength, group.buffer[i].drawtype);
            }
            for(let i of Object.keys(group.feedbackbuffer)){
                group.gl.bindBuffer(group.feedbackbuffer[i].buffertype, group.feedbackbuffer[i].buffer);
                group.gl.bufferData(group.feedbackbuffer[i].buffertype, group.buffersize*bpe*group.feedbackbuffer[i].bufferlength,group.feedbackbuffer[i].drawtype)
            }
        }
    }
}
promallres[1]()