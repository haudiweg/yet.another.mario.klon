// @ts-check
'use strict';
async function getsha(text){
    const digestHex = await digestMessage(text);
    console.log("sha-256 key lautet:")
    console.log(digestHex);
    console.log("bitte vergleiche key mit key den man dir gegeben hat\n wen keys nicht gleich sind probiere datei neu runterzuladen bzw überprüffe datei")
    return digestHex
}
function loadarr(me){
    let temp
    let cha=getsha(me)
    if(!(/^[a-zA-Z0-9\:\,\.\"\{\[\]\}\/\-#öäü%]*$/.test(me))){console.log("not allowed carackter");return}
    let check="[^a-zA-Z0-9](function|this|self|window|set|get)[^a-zA-Z0-9]"
    for(let i in this) {try {if((typeof this[i]).toString()=="function"){check+="|"+i}}catch(e){}}//alle functionen sind nicht erlaubt
    if(RegExp(check).test(me)){console.log("not allowed name");return}
    try {temp=JSON.parse(me)}catch (e){console.log("broken dateierror");return}
    myFire[loadmap]=[]
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
                new (createobj[temp[i][i1].construck])(window[temp[i][i1].construckarr],0,0,0,0,temp[i][i1])
            }
        }
    }
    if(renderer==3)updatescene=true
    if(renderer==0)renderbackground=true
}
async function savearr(mode=0){
    const prom=prompt("name?","")
    if(prom=="")return
    const temp=[myFire[loadmap],myRect[loadmap],mySun[loadmap],myGravi[loadmap]]
    let temp1=[]
    for(let i in temp){
        temp1[i]=temp[i].map(a=>({...a}))
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

        }
    }
    temp1[4]={
        mapname:mapinfo[loadmap].mapname,
        date:[...mapinfo[loadmap].date,new Date().getTime()],
        cha:mapinfo[loadmap].cha
    }
    const text=JSON.stringify(temp1)
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
}
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
function allfiles(me){
    let promises=[]
    let promisesr=[]
    for(let i=0;i<me.target.files.length;i++){
        if(me.target.files[i].name.match(/.(txt)$/i)){
            promises.push(new Promise((r)=>{promisesr.push(r)}))
            let fr=new FileReader();
            fr.onload=(e)=>loadarr(e.target.result)
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