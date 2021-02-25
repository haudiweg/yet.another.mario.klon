// @ts-check
'use strict';
function loadarr(me,mode=false){
    let temp
    let cha=digestMessage(me)
    console.log("bitte vergleiche key mit key den man dir gegeben hat\n wen keys nicht gleich sind probiere datei neu runterzuladen bzw überprüffe datei")
    if(!mode){
        try{if(!(/^[a-zA-Z0-9\:\,\.\"\{\[\]\}\-#öäü]*$/.test(me))){
            console.log("not allowed carackter")
            console.log(/[^a-zA-Z0-9\:\,\.\"\{\[\]\}\/\-#öäü]/.exec(me))
            return
        }}catch(e){console.log("to big for regex: "+e);return}
        let check="[^a-zA-Z0-9](function|this|self|window|set|get|javascript|undefined|html|document"
        for(let i in this)if((typeof this[i])=="function"||(typeof this[i])=="symbol"||(typeof this[i])=="object")check+="|"+i//alle functionen sind nicht erlaubt
        for(let i in document)check+="|"+i //alle propertys von document (damit onclick usw rausgefiltert wird)
        check=check.replace("|myRect","").replace("|mySun","").replace("|myGravi","").replace("|dir","")
        check+=")[^a-zA-Z0-9]"//das forne und dahinter macht das zb amath erlaubt ist aber  Math.a net
        try{if(RegExp(check).test(me)){
            console.log("not allowed name")
            console.log(RegExp(check).exec(me))
            return
        }}catch(e){console.log("to big for regex: "+e);return}
        //wen ein punkt vorkommt und dafor oder dahinter kein num kommt
        //wen man auf string zugreift
        //array zugreifen
        //#bei keiner farbe
        //kein :: (wen das gibt ist irgendwas wierd)
        //da ist was wierd
        //lehrer string
        //array das sofort string hat ohne " dafor
        let checkjsfun=/([^0-9]\.[^0-9])|(\"\[)|(\]\[)|(#[^0-9a-fA-F])|::|:,|""|\[[^0-9\[\{\]\-"]/
        try{if(checkjsfun.test(me)){
            console.log("not allowed name (jsfun)")
            console.log(checkjsfun.exec(me))
            return
        }}catch(e){console.log("to big for regex: "+e);return}
    }
    try {
        temp=mode?JSON.parse(me,(k,v)=>{if(typeof(v)==="string"&&v.startsWith("/Function(")&&v.endsWith(")/")){v=v.substring(10,v.length-2);return (0,eval)("("+v+")");}return v;}):JSON.parse(me)
    }catch(e){console.log("broken dateierror");return}
    myRect[loadmap]=[]
    mySun[loadmap]=[]
    myGravi[loadmap]=[]
    mapinfo[loadmap]={}
    for(let i in temp){
        if(i==4){
            mapinfo[loadmap].cha=temp[i].cha
            cha.then((i)=>{mapinfo[loadmap].cha.push(i)})
            mapinfo[loadmap].mapname=temp[i].mapname
            mapinfo[loadmap].date=temp[i].date
            mapinfo[loadmap].static=false
        }else{
            for(let i1 in temp[i]){
                if(typeof(createobj[temp[i][i1].construck])!=="function"||typeof(window[temp[i][i1].construckarr])!=="object")continue
                new (createobj[temp[i][i1].construck])(window[temp[i][i1].construckarr],temp[i][i1])
            }
        }
    }
    if(renderer==3)updatescene=true
    if(renderer==0)renderbackground=true
}
async function savearr(mode=0){
    let modes=false
    let prom="bla"
    if(mode!=2){
        prom=prompt("name?","")
        modes=confirm("unsecure save?")
        if(prom=="")return
    }
    const temp=[myRect[loadmap],mySun[loadmap],myGravi[loadmap]]
    let temp1=[]
    for(let i in temp){
        temp1[i]=temp[i].map(a=>Object.assign({}, a))
        //temp1[i]=temp[i].map(a=>({...a}))
        for(let i1 in temp1[i]){
            if(temp1[i][i1]=="undefined")continue
            if(typeof(temp1[i][i1].fill)=="object"&&temp1[i][i1].fill.constructor.name=="HTMLImageElement"){
                temp1[i][i1].fillpic=temp1[i][i1].fill.getAttribute("src")
                temp1[i][i1].fillstr="URL"
            }
            if(typeof(temp1[i][i1].fill)=="object"){temp1[i][i1].fill=temp1[i][i1].fillstr}
            for (let i2 of createobj.savedell)delete temp1[i][i1][i2]
            let temp2=new createobj[temp1[i][i1].construck]("return")
            for(let i2 in Object.keys(temp1[i][i1])){
                let key=Object.keys(temp1[i][i1])[i2]
                if(key=="construck")continue
                if(JSON.stringify(temp1[i][i1][key])==JSON.stringify(temp2[key]))delete temp1[i][i1][key]
            }
            if(
                typeof(temp1[i][i1].fill)=="string"&&
                /rgba\((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(0\.[0-9]*|0|1)\)/.test(temp1[i][i1].fill)
            ){temp1[i][i1].fill=temp1[i][i1].fill.replace("(","[").replace(")","]")}
            if(
                typeof(temp1[i][i1].fillstr)=="string"&&
                /rgba\((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(0\.[0-9]*|0|1)\)/.test(temp1[i][i1].fillstr)
            ){temp1[i][i1].fillstr=temp1[i][i1].fillstr.replace("(","[").replace(")","]")}
            if(
                typeof(temp1[i][i1].fillbackup)=="string"&&
                /rgba\((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]),(0\.[0-9]*|0|1)\)/.test(temp1[i][i1].fillbackup)
            ){temp1[i][i1].fillbackup=temp1[i][i1].fillbackup.replace("(","[").replace(")","]")}

        }
    }
    temp1[4]={
        mapname:mapinfo[loadmap].mapname,
        date:[...mapinfo[loadmap].date,new Date().getTime()],
        cha:mapinfo[loadmap].cha
    }
    const text=modes?JSON.stringify(temp1,(k,v)=>{if(typeof(v)==="function"){return "/Function("+v.toString()+")/"};return v}):JSON.stringify(temp1)
    console.log(temp1)
    const digestHex = await digestMessage(text);
    console.log("dein sha-256 key lautet")
    console.log(digestHex);
    console.log("pfals du deine map irgendjemand anderes gibst gib bitte den hash mit dazu damit man sehen kan ob die datei kaput oder verendert wurde")
    if(mode==0){
        const a=document.createElement("a");
        let file=new Blob([text], {type: 'application/json'});
        a.href=URL.createObjectURL(file);
        a.download=prom+".txt";
        a.click();
    }
    if(mode==1){
        localStorage.setItem(prom,text);
    }
    if(mode==2){
        return text
    }
}
function allfiles(me){
    let promises=[]
    let promisesr=[]
    for(let i=0;i<me.target.files.length;i++){
        if(me.target.files[i].name.match(/.(txt)$/i)){
            promises.push(new Promise((r)=>{promisesr.push(r)}))
            const mode=confirm("unsecure load?")
            let fr=new FileReader();
            fr.onload=(e)=>loadarr(e.target.result,mode)
            fr.onloadend=()=>{promisesr[i]()}
            loadmap=mapinfo.length//mach neuen eintrag
            fr.readAsText(me.target.files[i]);
        }
    }
    return Promise.all([...promises])
}
function loadstorage(me){
    if (localStorage.getItem(me)===null)return
    loadmap=mapinfo.length
    loadarr(localStorage.getItem(me))
}
promallres[4]()