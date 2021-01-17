function setting(){
    let but=[]
    let obj=[]
    let settingsarray=function(a,num){
        if(Array.isArray(a)){
            let div=document.createElement("DIV")
            div.style.display="contents"
            div.className="settingclass"
            
            for(let i in a){
                for(let i1 of settingsarray(a[i],num+1))div.appendChild(i1)
            }
            if(div.children.length>=2){
                let spans=div.querySelectorAll('span,button.func')
                let first=spans[0]
                let secend=spans[spans.length-1]
                if(secend.nextSibling!=null){
                    first.nextSibling.style.boxSizing="border-box"
                    secend.nextSibling.style.boxSizing="border-box"

                    first.style.borderTop=(first.style.borderTop==""?1:parseInt(first.style.borderTopWidth,10)+1)+"px solid black"
                    secend.style.borderBottom=(secend.style.borderBottomWidth==""?1:parseInt(secend.style.borderBottomWidth,10)+1)+"px solid black"
                    secend.style.marginBottom="2px"
                    if(secend.nextSibling.tagName=="INPUT"||secend.nextSibling.tagName=="BUTTON")secend.nextSibling.style.marginBottom="2px"
                }
            }
            return [...[div]]
        }else{
            if(!checksettings.hasOwnProperty(a)){
                let i1=document.createElement("BUTTON")
                i1.className="func"
                i1.style.width="100%"
                i1.textContent="error: "+a+" not exist in checksettings"
                i1.style.gridColumn="1/span 2";
                if(renderer==3&&desynchronized)i1.style.backgroundColor="white"
                return [i1]
            }
            let type=Array.isArray(checksettings[a])?checksettings[a][1]:checksettings[a]
            if(type=="function"){
                let i1=document.createElement("BUTTON")
                i1.className="func"
                i1.style.width="100%"
                i1.textContent=tooltips.hasOwnProperty("settingsname")&&tooltips.settingsname.hasOwnProperty(a)?tooltips.settingsname[a]:a
                i1.style.gridColumn="1/span 2";
                i1.onclick=event=>{window[a]()}
                i1.onblur=event=>{if(Array.isArray(checksettings[a])&&checksettings[a].length==4)checksettings[a][3]()}
                i1.title=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty(a)?tooltips.settings[a]:""
                if(renderer!=0)i1.style.backgroundColor="white"
                return [i1]
            }else if(type.match("number|string|object")){
                let i1=document.createElement("SPAN")
                let i2=document.createElement("INPUT")
                i2.placeholder="put something in it! (pls a "+type+")"
                if(type=="number"&&navigator.userAgent.indexOf("Firefox")==-1){i2.type="number"}else{i2.type="text"}//wen net firefox
                if(type=="number"){i2.pattern="^[-+]?[0-9]*[.,]?[0-9]*$"}
                i2.value=type=="object"?JSON.stringify(window[a]):window[a]
                i2.onclick=event=>menuallowedtomove=false
                i2.onblur=event=>{
                    if(Array.isArray(checksettings[a])&&checksettings[a].length==4)checksettings[a][3]()
                    menuallowedtomove=true
                    i2.style.color=""
                    i2.value=type=="object"?JSON.stringify(window[a]):window[a]
                }
                i2.oninput=event=>{
                    if(event.target.value==""){
                        i2.style.color="red"
                        return false
                    }
                    let parse
                    if(type=="object")parse=JSON.parse(event.target.value)
                    if(type=="string")parse=event.target.value
                    if(type=="number")parse=Number.parseFloat(event.target.value)
                    if(checksetting(a,parse)){
                        window[a]=parse
                        i2.style.color=""
                        return true
                    }
                    console.log("red")
                    i2.style.color="red"
                    return false
                }
                i1.textContent=tooltips.hasOwnProperty("settingsname")&&tooltips.settingsname.hasOwnProperty(a)?tooltips.settingsname[a]:a
                i1.style.borderLeft="inherit"
                i1.style.gridColumn="1/1";
                i2.style.gridColumn="2/2";
                i1.title=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty(a)?tooltips.settings[a]:""
                if(renderer==3&&desynchronized)i1.style.backgroundColor="white"
                return [i1,i2]
            }else if(type=="boolean"){
                let i1=document.createElement("SPAN")
                let i2=document.createElement("BUTTON")
                i2.value=window[a]
                i2.textContent=tooltips.hasOwnProperty(window[a])?tooltips[window[a]]:window[a]
                i2.onclick=event=>{
                    if(Array.isArray(checksettings[a])&&checksettings[a].length==4)checksettings[a][3]()
                    let a1=event.target.value=="true"?false:true
                    i2.value=a1
                    window[a]=a1
                    i2.textContent=tooltips.hasOwnProperty(a1)?tooltips[a1]:a1
                }
                i1.textContent=tooltips.hasOwnProperty("settingsname")&&tooltips.settingsname.hasOwnProperty(a)?tooltips.settingsname[a]:a
                i1.style.borderLeft="inherit"
                i1.style.gridColumn="1/1";
                i2.style.gridColumn="2/2";
                i1.title=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty(a)?tooltips.settings[a]:""
                if(renderer==3&&desynchronized)i1.style.backgroundColor="white"
                return [i1,i2]
            }else{
                console.warn(window[a])
            }
        }
    }


    obj.push(...settings)
    if(cheats)obj.push([...cheatsettings])
    if(noob){
        let finish=false
        let search=function(i){
            if(finish)return
            for(let i1 of i){
                if(Array.isArray(i1)){
                    search(i1)
                }else if(i1=="noob"){
                    i.push(...noobsettings)
                    finish=true
                }
            }
        }
        search(obj)//hoffe das das so geht wen net breuchte ich array das sich pfad merkt
    }

    but.push(document.createElement("h1"))
    but[but.length-1].style.overflow="initial"
    but[but.length-1].style.gridColumn="1/span 2";
    but[but.length-1].textContent=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty("presets")?tooltips.settings.preset:"presets"

    for(let i of Object.keys(profilesettings)){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="1/span 2";
        but[but.length-1].textContent=tooltips.hasOwnProperty("settingspresetsname")&&tooltips.settingspresetsname.hasOwnProperty(a)?tooltips.settingspresetsname[i]:i
        but[but.length-1].title=tooltips.hasOwnProperty("settingspresets")&&tooltips.settingspresets.hasOwnProperty(a)?tooltips.settingspresets[i]:""
        but[but.length-1].onclick=()=>{
            for(let i1 of Object.keys(profilesettings[i])){
                window[i1]=profilesettings[i][i1]
            }
        }
    }

    but.push(document.createElement("h1"))
    but[but.length-1].style.overflow="initial"
    but[but.length-1].style.gridColumn="1/span 2";
    but[but.length-1].textContent=tooltips.hasOwnProperty("settings")&&tooltips.settings.hasOwnProperty("settings")?tooltips.settings.settings:"settings"

    but.push(...settingsarray(obj,0))

    but.push(document.createElement("BUTTON"))
    but[but.length-1].style.gridColumn="1/span 2";
    but[but.length-1].textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    but[but.length-1].onclick=(event)=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());mvis();event.target.remove()}
    for (let i of but)i.className="preset func"
    for (let i of but)document.body.appendChild(i)
}
function checksetting(settingname,obj){
    if(!checksettings.hasOwnProperty(settingname)){
        console.error(new SyntaxError(
            "setting not found:"+
            "\nsetting:"+settingname+
            "\n"+new Error().stack))
        return false
    }
    let typeofrec=b=>Array.isArray(b)?"["+b.map(a=>typeofrec(a))+"]":typeof(b)
    let match=Array.isArray(checksettings[settingname])?checksettings[settingname][0]:checksettings[settingname]
    let conv=typeofrec(obj)
    let numberregcheck
    let regexcheck=false
    let convregexcheck=""
    if(Array.isArray(checksettings[settingname])&&checksettings[settingname].length>=3){
        if(checksettings[settingname][2] instanceof RegExp){
            convregexcheck=JSON.stringify(obj)
            numberregcheck=convregexcheck.match(checksettings[settingname][2])
            regexcheck=true
        }else{
            console.error(new SyntaxError(
                "setting invalide(3param is not regex or string):"+
                "\nsetting:"+settingname+
                "\n"+new Error().stack))
            return false
        }
    }
    if(Array.isArray(checksettings[settingname])&&checksettings[settingname].length==4){
        if(!(checksettings[settingname][3] instanceof Function)){//mach function check ob save ist
            console.error(new SyntaxError(
                "setting invalide(4param is not function):"+
                "\nsetting:"+settingname+
                "\n"+new Error().stack))
            return false
        }
    }
    let type=conv.match(match)
    if(type==null||type.index!==0||(regexcheck&&(numberregcheck==null||numberregcheck.index!==0))){
        if(regexcheck){
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nsetting:"+settingname+
                "\nmatchstr:"+typeof(match)=="object"?match.source:match+
                "\nconv:"+conv+
                "\ntype:"+type+
                "\nmatchstr:"+checksettings[settingname][2]+
                "\nconv:"+convregexcheck+
                "\ntype:"+numberregcheck+
                "\n"+new Error().stack))
        }else{
            console.error(new SyntaxError(
                "values are not corect:"+
                "\nsetting:"+settingname+
                "\nmatchstr:"+typeof(match)=="object"?match.source:match+
                "\nconv:"+conv+
                "\ntype:"+type+
                "\n"+new Error().stack))
        }
        return false
    }
    return true
}
function menu(){
    let but=[]
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("save")?tooltips.keymap.save:"save"
    but[but.length-1].onclick=()=>{
        for(let i of keysdisplayarr){
            console.log(Object.keys(keys).find(me=>keys[me]===i)+"="+JSON.stringify(i))
            document.cookie=Object.keys(keys).find(me=>keys[me]===i)+"="+JSON.stringify(i)
            localStorage.setItem(Object.keys(keys).find(me=>keys[me]===i),JSON.stringify(i))
        }
        console.log(document.cookie)
    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("load")?tooltips.keymap.load:"load"
    but[but.length-1].onclick=()=>{
        for (let i of document.cookie.split('; ')){
            if(keys.getOwnPropertyNames(i.split('=')[0]))keys[i.split('=')[0]]=JSON.parse(i.split('=')[1])
        }
        for (let i of Object.keys(localStorage)){
            if(keys.getOwnPropertyNames(i))keys[i]=JSON.parse(localStorage.getItem(i))
        }
        document.querySelectorAll('.preset').forEach((me)=>me.remove())
        menu()
    }

    but.push(document.createElement("H1"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("pressedkeys")?tooltips.keymap.pressedkeys:"pressedkeys"

    but.push(document.createElement("TEXTAREA"))
    but[but.length-1].readOnly=true
    but[but.length-1].rows="6"
    but[but.length-1].style.resize="none"
    but[but.length-1].style.overflow="auto"
    but[but.length-1].style.height="min-content"
    but[but.length-1].style.textAlign="center"
    but[but.length-1].placeholder=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("placeholder")?tooltips.keymap.placeholder:"press a key"
    let pressedkeys = [window.setInterval(myCallback, 100),but[but.length-1]]
    function myCallback() {
        if(!document.documentElement.contains(pressedkeys[1]))window.clearInterval(pressedkeys[0])
        pressedkeys[1].textContent=""
        keys.actualizekeys()
        for(let i of Object.keys(keys.arr)){
            let str=i.toString()
            if(Math.abs(keys.arr[i].stärke)>0.2)pressedkeys[1].textContent+="\n"+(" ".repeat(5-str.length))+str+" "+keys.arr[i].stärke.toPrecision(3)
        }
    }

    but.push(document.createElement("H1"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("preset")?tooltips.keymap.preset:"preset"
    
    for(let i of Object.keys(keys.keymaps)){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].id=i
        but[but.length-1].onclick=()=>{
            keys.setkeymap(i)
            document.querySelectorAll('.preset').forEach((me)=>me.remove())
            menu()
        }
    }
    for(let i of but.filter(i1=>i1 instanceof HTMLButtonElement&&i1.hasAttribute("id"))){
        i.textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("presetsname")&&tooltips.keymap.presetsname.hasOwnProperty(i.id)?tooltips.keymap.presetsname[i.id]:i.id
        i.title=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("presets")&&tooltips.keymap.presets.hasOwnProperty(i.id)?tooltips.keymap.presets[i.id]:""
    }

    but.push(document.createElement("H1"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("custom")?tooltips.keymap.custom:""

    but.push(document.createElement("SPAN"))
    but[but.length-1].innerHTML=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("explain")?tooltips.keymap.explain:""


    but.push(document.createElement("H3"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("keyname")?tooltips.keymap.keyname:""


    for (let i in keysdisplayarr) {
        but.push(document.createElement("TEXTAREA"))
        but[but.length-1].value=JSON.stringify(keysdisplayarr[i]).replace(/((?:[\]\}0-9],)|(?:^{))("[0-9])/g,"$1\n $2").replace(/([^{])(})$/,"$1\n$2")
        but[but.length-1].title=tooltips.hasOwnProperty("keymap")&&tooltips.keymap.hasOwnProperty("keys")?tooltips.keymap.keys[i]:""
        but[but.length-1].style.overflowY="visible";
        but[but.length-1].style.resize="none"
        but[but.length-1].style.overflow="hidden"
        but[but.length-1].style.minHeight="1vh"
        but[but.length-1].spellcheck=false
        but[but.length-1].autocorrect="off"
        but[but.length-1].autocapitalize="off"
        but[but.length-1].autocomplete="off"
        but[but.length-1].onclick=event=>{
            i=JSON.parse(event.target.value)
            event.target.style.height=0;
            event.target.style.height=event.target.scrollHeight+"px";
            menuallowedtomove=false
        }
        but[but.length-1].onblur=event=>{
            event.target.style.height="";
            menuallowedtomove=true
        }
        
    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    but[but.length-1].onclick=(event)=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());mvis()}
    for (let i of but)i.className="preset"
    for(let i of but)document.body.appendChild(i)
}

function loadandsave() {//gib an wie datei heisen sol    bei load werden dan alle datein angezeigt
    let but=[]
    for(let i=0;i<mapinfo.length;i++){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="1/span 3";
        but[but.length-1].textContent=mapinfo[i].mapname
        if(loadmap==i)but[but.length-1].style.background="lightgray"
        but[but.length-1].onclick=()=>{
            loadmap=i;
            if(renderer==3)updatescene=true
            if(renderer==0)renderbackground=true
        }
        if(mapinfo[i].static){
            but.push(document.createElement("BUTTON"))
            but[but.length-1].style.gridColumn="4/4";
            but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("reload")?tooltips.loadandsave.reload:"reload"
            but[but.length-1].onclick=()=>{defaultarrload(i)}
        }else{
            but.push(document.createElement("BUTTON"))
            but[but.length-1].style.gridColumn="4/4";
            but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("remove")?tooltips.loadandsave.remove:"remove"
            but[but.length-1].onclick=()=>{
                mapinfo=mapinfo.splice(i,1)
                myRect=myRect.splice(i,1)
                mySun=mySun.splice(i,1)
                myGravi=myGravi.splice(i,1)
                if(loadmap==i){
                    loadmap--
                    if(renderer==3)updatescene=true
                    if(renderer==0)renderbackground=true
                }
                if(loadmap>i)loadmap--
                document.querySelectorAll('.preset').forEach((me)=>me.remove());
                loadandsave()
            }
        }
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn="5/5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("duplicate")?tooltips.loadandsave.duplicate:"duplicate"
        but[but.length-1].onclick=()=>{
            mapinfo[mapinfo.length]=mapinfo[i]
            myRect[mapinfo.length-1]=[...myRect[i]]
            mySun[mapinfo.length-1]=[...mySun[i]]
            myGravi[mapinfo.length-1]=[...myGravi[i]]
            document.querySelectorAll('.preset').forEach((me)=>me.remove());
            loadandsave()
        }
        if(multiplayerstartet){
            but.push(document.createElement("BUTTON"))
            but[but.length-1].style.gridColumn="6/6";
            but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("upload")?tooltips.loadandsave.duplicate:"upload"
            but[but.length-1].onclick=()=>{
                mapinfo[mapinfo.length]=mapinfo[i]
                postMessage({act:"sendmap",obj:savearr(2)})
                document.querySelectorAll('.preset').forEach((me)=>me.remove());
                loadandsave()
            }
        }
    }

    if(promall[4].res){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("save")?tooltips.loadandsave.save:"save"
        but[but.length-1].onclick=()=>savearr(0)

        but.push(document.createElement("INPUT"))
        but[but.length-1].style.gridColumn="1/1";
        but[but.length-1].onchange=(m)=>{allfiles(m).then(()=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()})}
        but[but.length-1].type="file"
        but[but.length-1].name="client-folder"
        but[but.length-1].id="get-files"
        but[but.length-1].webkitdirectory="webkitdirectory"
        but[but.length-1].directory="directory"

        but.push(document.createElement("INPUT"))
        but[but.length-1].style.gridColumn="3/3";
        but[but.length-1].onchange=(m)=>{allfiles(m).then(()=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()})}
        but[but.length-1].type="file"
        but[but.length-1].name="client-file"
        but[but.length-1].id="get-files"
        but[but.length-1].accept=".txt"
        but[but.length-1].multiple="multiple"

        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("save_localstorage")?tooltips.loadandsave.save_localstorage:"save_localstorage"
        but[but.length-1].onclick=()=>savearr(1)

        but.push(document.createElement("BUTTON"))
        but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
        but[but.length-1].onclick=(m)=>{loadstorage(window.prompt("",""));document.querySelectorAll('.preset').forEach((me)=>me.remove());loadandsave()}
        but[but.length-1].name="client-localstorage"
        but[but.length-1].textContent=tooltips.hasOwnProperty("loadandsave")&&tooltips.loadandsave.hasOwnProperty("load_localstorage")?tooltips.loadandsave.load_localstorage:"load_localstorage"
    }

    but.push(document.createElement("BUTTON"))
    but[but.length-1].style.gridColumn=multiplayerstartet?"1/span 6":"1/span 5";
    but[but.length-1].textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    but[but.length-1].onclick=(event)=>{document.querySelectorAll('.preset').forEach((me)=>me.remove());event.target.remove();mvis()}
    for (let i of but)i.className="preset"
    for (let i of but)document.body.appendChild(i)
}
promallres[14]()