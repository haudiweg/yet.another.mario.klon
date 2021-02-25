//@ts-check
'use strict';
const createobjhelper={
    /**@private */
    check:function(arr,defaultarr){
        if(!(this.constructor.name in createobjsettings))createobjsettings[this.constructor.name]={}
        if(typeof(createobjsettings[this.constructor.name].type)=="undefined"){
            Object.create(createobjsettings[this.constructor.name].type=Object.assign({}, createobjsettings.type))//filter hir alle obj raus die namen von obj haben
            if(typeof(createobjsettings.type[this.constructor.name])=="object")Object.assign(createobjsettings[this.constructor.name].type,createobjsettings.type[this.constructor.name])
        }
        if(typeof(createobjsettings[this.constructor.name].notdisplay)=="undefined"){
            Object.create(createobjsettings[this.constructor.name].notdisplay=Object.assign({}, createobjsettings.notdisplay.global))
            if(typeof(createobjsettings.notdisplay[this.constructor.name])=="object")Object.assign(createobjsettings[this.constructor.name].notdisplay,createobjsettings.notdisplay[this.constructor.name])
        }
        //@ts-expect-error
        let languagetemp=language=="auto"?(window.navigator.languages?window.navigator.languages[0]:navigator.language||navigator.browserLanguage||navigator.userLanguage||"en").replace(/[-_].*/,""):language
        if(!createobjsettings.tooltip.hasOwnProperty(languagetemp))languagetemp="en"
        if(typeof(createobjsettings[this.constructor.name].tooltip)=="undefined"){
            Object.create(createobjsettings[this.constructor.name].tooltip=Object.assign({}, createobjsettings.tooltip[languagetemp]))//filter hir alle obj raus die namen von obj haben
            if(typeof(createobjsettings.tooltip[languagetemp][this.constructor.name])=="object")Object.assign(createobjsettings[this.constructor.name].tooltip,createobjsettings.tooltip[languagetemp][this.constructor.name])
        }
        let constr
        if(typeof(arr[0])=="number"||typeof(arr[0])=="symbol"){
            constr=Object.keys(window).find(me=>window[me]===arr[arr.length-1])
        }else if(typeof(arr)=="symbol"){
            constr=Object.keys(window).find(me=>window[me]===defaultarr.constructor.name)
        }else if(arr=="return"){
            constr=Object.keys(window).find(me=>window[me]===defaultarr.constructor.name)
        }else if(arr==undefined){
            constr=Object.keys(window).find(me=>window[me]===defaultarr.constructor.name)
        }else if(typeof(arr)=="object"){
            constr=Object.keys(window).find(me=>window[me]===arr)
        }else{
            constr="error"
        }

        Object.defineProperty(this, 'construckarr', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: constr
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
        //arr=symbol
        //arr=[0,myRect] //zahl=platz in aktuellen myRect array
        //arr=[0,0,myRect] // erste zahl myRect array karten number   zweite zahl number in myRect array
        //arr=[symbol,myRect] 
        //arr=[0,symbol,myRect]

        if(sharedarraybufferallowed)createobjhelper.objcreateworker.call(this)
        if(neatkiworker&&sharedarraybufferallowed)createobjhelper.objcreatesharedworker.call(this)

        
        //refectorn

        if(typeof(arr[0])=="number"||typeof(arr[0])=="symbol"){
            if(arr.length==3){
                if(typeof(arr[1])=="symbol"){
                    let num=arr[2][arr[0]].findIndex(i=>i.id==arr[1])
                    if(num==-1){
                        console.warn("couldnt find symbol")
                        return
                    }
                    this.id=arr[1]
                    arr[2][arr[0]][num]=this
                }else{
                    this.id=Symbol("id")
                    arr[2][arr[0]][arr[1]]=this
                }
            }else{
                if(typeof(arr[0])=="symbol"){
                    let num=arr[1][loadmap].findIndex(i=>i.id==arr[0])
                    if(num==-1){
                        console.warn("couldnt find symbol")
                        return
                    }
                    this.id=arr[0]
                    arr[1][loadmap][num]=this
                }else{
                    this.id=Symbol("id")
                    arr[1][loadmap][arr[0]]=this
                }
            }
        }else if(typeof(arr)=="symbol"){
            let num=defaultarr[loadmap].findIndex(i=>i.id==arr)
            if(num==-1){
                console.warn("couldnt find symbol")
                return
            }
            this.id=arr
            defaultarr[loadmap][num]=this
        }else if(arr=="return"){
            this.id=Symbol("id")
            return this
        }else if(arr==undefined){
            this.id=Symbol("id")
            defaultarr[loadmap].push(this)
        }else if(typeof(arr)=="object"){
            this.id=Symbol("id")
            arr[loadmap].push(this)
        }else{
            console.warn("cant find were to put obj")
        }
    },
    /**@private */
    pos:function(opt){

        //set default values
        //on create there are diferend version how you give the options
        //Shape(x,y,{})
        //Shape({x,y})
        //Shape(x,y,w,h)
        //usw
        if(!Array.isArray(opt))opt=[opt]
        let numt=opt.findIndex(i=>i.constructor.name=="Object")
        if(numt!=-1){
            let temp=opt[numt]
            opt[numt]=undefined
            opt[4]=temp
        }
        for(let i=0;i<4;i++){if(opt[i]==undefined)opt[i]=[this.x,this.y,this.w,this.h][i]}
        Object.assign(this,{x:opt[0],y:opt[1],w:opt[2],h:opt[3]},opt[4])

        if(typeof(this.x)!="object"){
            this.sharedx=new SharedArrayBuffer(4*Float64Array.BYTES_PER_ELEMENT)
            const xtemp=this.x
            this.x=new Float64Array(this.sharedx)
            this.x[0]=xtemp
            this.x[1]=xtemp+this.w
            this.x[2]=xtemp+this.w
            this.x[3]=xtemp
        }else{
            const xtemp=Array.isArray(this.x)?([...this.x]):(Object.values(this.x))
            this.sharedx=new SharedArrayBuffer(xtemp.length*Float64Array.BYTES_PER_ELEMENT)
            this.x=new Float64Array(this.sharedx)
            for(let i=0;i<xtemp.length;i++)this.x[i]=xtemp[i]
        }


        if(typeof(this.y)!="object"){
            this.sharedy=new SharedArrayBuffer(4*Float64Array.BYTES_PER_ELEMENT)
            const ytemp=this.y
            this.y=new Float64Array(this.sharedy)
            this.y[0]=ytemp
            this.y[1]=ytemp
            this.y[2]=ytemp+this.h
            this.y[3]=ytemp+this.h
        }else{
            const ytemp=Array.isArray(this.y)?[...this.y]:Object.values(this.y)
            this.sharedy=new SharedArrayBuffer(ytemp.length*Float64Array.BYTES_PER_ELEMENT)
            this.y=new Float64Array(this.sharedy)
            for(let i=0;i<ytemp.length;i++)this.y[i]=ytemp[i]
        }
        this.w=Math.max(0,Math.max(...this.x)-Math.min(...this.x));
        this.h=Math.max(0,Math.max(...this.y)-Math.min(...this.y));
    

        //get the min x and y pos
        //use getter that i allways have the actuel lowest number
        let minxt=Infinity
        this.minxnum=0
        for(let i in this.x)if(minxt>this.x[i]){minxt=this.x[i];this.minxnum=parseInt(i)}
        Object.defineProperty(this, 'minx', {get:()=>{return this.x[this.minxnum]}});
        
        let minyt=Infinity
        this.minynum=0
        for(let i in this.y)if(minyt>this.y[i]){minyt=this.y[i];this.minynum=parseInt(i)}
        Object.defineProperty(this, 'miny', {get:()=>{return this.y[this.minynum]}});


        Object.defineProperty(this, 'setx', {set:(num)=>{for(let i=0,min=this.minx;i<this.x.length;i++)this.x[i]+=-min+num}});
        Object.defineProperty(this, 'movex', {set:(num)=>{for(let i=0;i<this.x.length;i++)this.x[i]+=num}});
        Object.defineProperty(this, 'sety', {set:(num)=>{for(let i=0,min=this.miny;i<this.y.length;i++)this.y[i]+=-min+num}});
        Object.defineProperty(this, 'movey', {set:(num)=>{for(let i=0;i<this.y.length;i++)this.y[i]+=num}});
        
        if(
           typeof(this.fill)=="string"&&
           /rgba\[(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(0\.[0-9]*|0|1)\]/.test(this.fill)
        ){this.fill=this.fill.replace("[","(").replace("]",")")}
        if(
            typeof(this.fillbackup)=="string"&&
            /rgba\[(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(0\.[0-9]*|0|1)\]/.test(this.fillbackup)
         ){this.fillbackup=this.fillbackup.replace("[","(").replace("]",")")}

         this.objnum=Object.keys(createobj).findIndex(i=>i==this.constructor.name)
    },
    /**@private */
    convtoshared:function(){
        if("dir" in this){
            this.shareddir=new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT)
            const dirtemp=this.dir
            this.dir=new Float64Array(this.shareddir)
            this.dir[0]=dirtemp
        }


        if("velo" in this){
            this.sharedvelo=new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT*this.velo.length)
            const velotemp=[...this.velo]
            this.velo=new Float64Array(this.sharedvelo)
            for(let i=0;i<velotemp.length;i++)this.velo[i]=velotemp[i]
        }

        if("dmg" in this){
            this.shareddmg=new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT)
            const dmgtemp=this.dmg
            this.dmg=new Uint32Array(this.shareddmg)
            this.dmg[0]=dmgtemp
        }

        if("inwater" in this){
            this.sharedinwater=new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT)
            const inwatertemp=this.inwater
            this.inwater=new Uint8Array(this.sharedinwater)
            this.inwater[0]=inwatertemp
        }

        if("statsnum" in this){
            this.sharedstatsnum=new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT)
            const statsnumtemp=this.statsnum
            this.statsnum=new Uint32Array(this.sharedstatsnum)
            this.statsnum[0]=statsnumtemp
        }

        if("graviins" in this){
            this.sharedgraviins=new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT*this.graviins.length)
            const graviinstemp=[...this.graviins]
            this.graviins=new Float64Array(this.sharedgraviins)
            for(let i=0;i<graviinstemp.length;i++)this.graviins[i]=graviinstemp[i]
        }

        if("keys" in this){
            this.sharedkeys=new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT*5)
            const keystemp=[...this.keys]
            this.keys=new Float64Array(this.sharedkeys)
            for(let i=0;i<keystemp.length;i++)this.keys[i]=keystemp[i]
        }


        this.sharedlastupdatetime=new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT)
        this.lastupdatetime=new Float64Array(this.sharedlastupdatetime)
        this.lastupdatetime[0]=performance.now()

        this.sharedupdatet=new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT)
        this.updatet=new Uint8Array(this.sharedupdatet)
        this.updatet[0]=1

        this.sharedcolobjnum=new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT)
        this.colobjnum=new Uint32Array(this.sharedcolobjnum)

        if("coindropdest" in this){
            const tempcoindropdest=this.coindropdest
            this.sharedcoindropdest=new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT)
            this.coindropdest=new Uint32Array(this.sharedcoindropdest)
            this.coindropdest[0]=tempcoindropdest
        }
        if("coins" in this){
            const tempcoins=this.coins
            this.sharedcoins=new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT)
            this.coins=new Uint32Array(this.sharedcoins)
            this.coins[0]=tempcoins
        }
    },
    /**@private */
    objcreateworker:function(){
        if("type" in this&&Object.getOwnPropertyNames(aiobjwebworker).includes(this.type)){
            this.worker=new Worker(window.URL.createObjectURL(new Blob([document.querySelector('#aiki').textContent], { type: "text/javascript" })));
            this.worker.postMessage({
                update:{
                    code:aiobjwebworker[this.type].toString(),
                    objcolmap:objcolsharedmap,
                    objenemymap:objenemysharedmap,
                    x:this.sharedx,
                    y:this.sharedy,
                    dir:this.shareddir,
                    dmg:this.shareddmg,
                    statsnum:this.sharedstatsnum,
                    lastupdatetime:this.sharedlastupdatetime,
                    velo:this.sharedvelo,
                    kitype:this.kitype,
                    graviins:this.sharedgraviins,
                    minx:minx,
                    miny:miny,
                    maxx:maxx,
                    maxy:maxy,
                    objnum:this.objnum,
                    inwater:this.sharedinwater,
                    updatet:this.sharedupdatet,
                    colobjnum:this.sharedcolobjnum
                }
            })
            if(stopmain&&sharedarraybufferallowed){
                let finki=myRect[loadmap].filter(i=>i.construck=="Finish").map(i=>[i.minx+i.w/2,i.miny+i.h/2])
                this.worker.postMessage({update:{finki:finki},start:true})
            }
        }
    },
    spawnedaiworker:{},
    objcreatesharedworker:function(){
        if("type" in this&&Object.getOwnPropertyNames(neuronetworks).includes(this.type)){
            if(!Object.getOwnPropertyNames(createobjhelper.spawnedaiworker).includes(this.type)){
                createobjhelper.spawnedaiworker[this.type]=new Worker(window.URL.createObjectURL(new Blob([document.querySelector('#neuroaiki').textContent], { type: "text/javascript" })));
                let aiprom
                createobjhelper.spawnedaiworker[this.type].prom=new Promise(r=>aiprom=r)
                createobjhelper.spawnedaiworker[this.type].res=false
                let funcarr={}
                for(let i of Object.keys(neuronetworks[this.type])){
                    funcarr[i]=neuronetworks[this.type][i].toString()
                }
                let network=""
                if(importki)network=localStorage.getItem(this.type)
                createobjhelper.spawnedaiworker[this.type].postMessage({
                    update:{
                        neatcode:document.getElementById("neat").innerHTML,
                        code:funcarr,
                        network:network,
                        objcolmap:objcolsharedmap,
                        objenemymap:objenemysharedmap,
                        minx:minx,
                        miny:miny,
                        maxx:maxx,
                        maxy:maxy,
                        keyshared:keyshared,
                        finki:myRect[loadmap].filter(i=>i.construck=="Finish").map(i=>[i.minx+i.w/2,i.miny+i.h/2])
                    }
                })
                createobjhelper.spawnedaiworker[this.type].onmessage=e=>{
                    if("havenetwork" in e.data){
                        if(e.data.havenetwork==true){
                            if(exportki)localStorage.setItem(this.type,e.data.network)
                        }
                        aiprom()
                        createobjhelper.spawnedaiworker[this.type].res=true

                    }

                }//if ki get closed than remove it
            }
            this.worker=createobjhelper.spawnedaiworker[this.type]
            if(stopmain&&neatkiworker&&sharedarraybufferallowed){
                let finki=myRect[loadmap].filter(i=>i.construck=="Finish").map(i=>[i.minx+i.w/2,i.miny+i.h/2])
                this.worker.postMessage({update:{finki:finki},start:true})
            }
            //kucke der wie fielte ich bin mit der ki
        }
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
            //if(temp[i].mode=="loopback"&&typeof(temp[i].dir[0])!="number")temp[i].dir[0]=1
            for(let i1 of temp[i].pic){
                let img = new Image();
                img.src = i1[1][0];
                img.onload=()=>{i1[1][1]=img}
            }
        }
    },
}
//Object.freeze(createobjhelper)
promallres[22]()