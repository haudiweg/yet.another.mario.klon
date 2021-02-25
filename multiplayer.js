function genid(){
    let str
    while(true){
        str=""
        for(let i=0;i<idlength;i++)str+=randomcaracterid[Math.round(Math.random()*(randomcaracterid.length-1))]
        if(checkids(str))break//mache id gen bis id valid ist
    }
    multiplayerid=str
}
function checkids(id){
    if(id.length!=idlength){console.log("length from id is false");return}
    if(RegExp("[^"+randomcaracterid+"]").test(id)){console.log("not allowed carackter in id");return}

    let check="(function|this|self|window|set|get"
    for(let i in this)if((typeof this[i])=="function"||(typeof this[i])=="symbol"||(typeof this[i])=="object")check+="|"+i//alle functionen sind nicht erlaubt
    for(let i in document)check+="|"+i
    check+=")"
    if(RegExp(check).test(id)){console.log("not allowed name in id");return}

    return true //wen erlaubt
}

 
function postMessage(message,direct=null){
    //console.log("send:"+JSON.stringify(message))
    //multiplayermapplayer
    //direct nachrichten zulassen
    let origin=""
    message.id=multiplayerid//pakete kryptografisch unterschreiben
    if(direct==null){
        if(enablemultiplayer[0]&&conectionpromise[0].res){
            bc.postMessage(message,origin)
        }
        if(enablemultiplayer[1]&&conectionpromise[1].res){//promise beachten
            const messagestr=JSON.stringify(message)
            for(i of webrtcChannel){i.send(messagestr)}
        }
        if(enablemultiplayer[2]&&conectionpromise[2].res){
            const messagestr1=JSON.stringify({
                //chat_user:"bot<3 ",
                chat_user:"bot<3 "+multiplayerid,
                chat_message:"@bot<3 "+JSON.stringify(message)
            })
            websocket.send(messagestr1);
        }
    }else{
        const temp=multiplayermapplayer.get(direct)
        if(typeof(temp)=="undefined"){console.log(direct)}

        if(temp.webrtc){
            const messagestr=JSON.stringify(message)
            webrtcChannel[temp.webrtcid].send(messagestr,origin)
        }else if(temp.bc){
            try{bc.postMessage(message,origin)}catch(e){console.warn(e);console.log(message)}
        }else if(temp.ws){
            const messagestr1=JSON.stringify({
                //chat_user:"bot<3 ",
                chat_user:"bot<3 "+multiplayerid,
                chat_message:"@bot<3 "+JSON.stringify(message)
            })
            websocket.send(messagestr1,origin)
        
        }else{
            console.log("no route to player id:"+direct)
        }
    }
}

function resetmultiplayer(){
    multiplayerstartet=false
    //multiplayerwhitelist=new Set()
    //multiplayerwhitelistgame=new Set()
    //multiplayerblacklist=new Set()
    //multiplayerblacklistgame=new Set()
    multiplayerafk=new Set()
    multiplayermapplayer.clear()
    console.log("resetet multiplayer")
    managefromplayer()
}
function multiplayerconnect(){
    postMessage({act:"hi?!",id:multiplayerid});
    setTimeout(()=>{
        postMessage({act:"give me friends",id:multiplayerid});
        //frage wer wie andere verbunden sind
        //und frage spieler ob man mit einen unbekannten connecten möchte
    },5000)//5sek
}

//mache verbinden starten und protokolire von wo was war
function multiplayerconnecting(a){
    multiplayerstartet=true
    //id collision
    if(multiplayerid==a.id){
        genid()
        resetmultiplayer()
        console.log("oh a other player have my multiplayer id is that posible?")
    }//sowas von unwarscheinlich aber man solte halt checken und wen dan alles resetten


    //wen es id noch nicht gibt in map dan erstell eintrag
    if(!multiplayermapplayer.has(a.id)){
        multiplayermapplayer.set(a.id,{})
        let temp=multiplayermapplayer.get(a.id)
        temp.webrtc=false
        temp.bc=false
        temp.ws=false
        temp.webrtcid=""
        temp.bcid=""
        temp.wsid=""
    }
    //schreibe con wo spieler connectet ist  (später mal noch mehr connection methoden machen)
    let temp=multiplayermapplayer.get(a.id)
    if(a.con.constructor.name=="BroadcastChannel"){
        temp.bc=true
        temp.bcid=a.con.name  //nice to have pfals mal multi chanel suport eingebaut wird
    }
    if(a.con.constructor.name=="WebSocket"){
        temp.ws=true
        temp.wsid=a.con.url  //nice to have pfals mal multi chanel suport eingebaut wird
    }
    if(a.con.constructor.name=="RTCDataChannel"){
        temp.webrtc=true
        temp.webrtcid=webrtcChannel.findIndex(i=>i==a.con)  //voll unperformant geht das net besser in dem man webrtc chanel jeden chanel ein param namenns webrtcid gibt
    }

    //finde was am höchten ist und activirt ist
    let imp=-1
    for(let i=0;i<preferemultiplayer.length;i++)if(temp[preferemultiplayershortcut[i]])imp=Math.max(imp,preferemultiplayer[i])
    //mache alle wo von priorität drunter sind deactiviren
    for(let i=0;i<preferemultiplayer.length;i++)if(preferemultiplayer[i]<imp&&temp[preferemultiplayershortcut[i]]){
        if(preferemultiplayershortcut[i]=="bc"){
            temp.bc=false
        }
        if(preferemultiplayershortcut[i]=="webrtc"){
            let num=webrtcChannel.findIndex(i=>i==a.con)
            webrtcChannel[num].close()
            webrtcConnection[num].close()
            temp.webrtc=false
        }
        if(preferemultiplayershortcut[i]=="ws"){
            temp.ws=false
            console.log("deactivate ws for player")
        }
    }


    if(a.act=="hi?!"){
        postMessage({act:"hi<3"})
        return
    }

    //spieler schickt frage zu andere spieler
    //die antworten in dm mit liste von freunden
    //spieler schickt zu anderen spieler liste von id die er nicht kennt
    //anderer spieler conectet einen

    //man könnte client sofort liste senden lassen aber mag ich das?   lass liste sync user fragen ober er das mag
    if(a.act=="give me friends"){
        postMessage({act:"my friends",friends:[...multiplayermapplayer.keys()],toid:a.id},a.id)
        return
    }
    if(a.act=="my friends"&&a.toid==multiplayerid){
        let detailspls=[]
        for(let i of a.friends)if(!multiplayermapplayer.has(i)&&i!=multiplayerid)detailspls.push(i)
        if(detailspls.length!=0)postMessage({act:"give me friends details pls",friends:detailspls,toid:a.id},a.id)
        return
    }
    if(a.act=="give me friends details pls"&&a.toid==multiplayerid){//connecten lassen
        //wen nicht beide bc verbunden sind mach conection
        console.log(a.friends)
        for (let i of a.friends)if(!multiplayermapplayer.get(a.id).bc||!multiplayermapplayer.get(i).bc)multiplayertoconnect.push([a.id,i])
        console.log(multiplayertoconnect)
        webrtcfriendsconnect()
        return
    }

    return 1
}
function multiplayerdisconect(channel){
    console.log(channel)
    let num=webrtcChannel.findIndex(i=>i==channel.target)
    for(let i of [...multiplayermapplayer.keys()]){
        let temp=multiplayermapplayer.get(i)
        if(temp.webrtcid==num){
            if(!temp.bc){
                multiplayermapplayer.delete(i)
                managefromplayer()
            }//wen er net anders conectet is dan dc spieler
            temp.webrtc=false
            temp.webrtcid=undefined
            break
        }
    }
    webrtcChannel[num].close()
    webrtcConnection[num].close()
}


function multiplayermain(a){
    //debugmultiplayer  print all messages
    //multiplayerjustlisten  dont play game just hear all mesages  from connectet clients
    if(debugmultiplayer||multiplayerjustlisten)console.log(a)
    if(multiplayerjustlisten)return
    if(a.act=="new Connection"){
        if(a.hop){
            a.hop=false
            a.toid=a.toid1
            delete a.toid1
            delete a.con
            postMessage(a,a.toid)
        }else{
            multiplayerfriendsconect(a)
        }
        return
    }
    if(a.act=="new Connection finish"){
        webrtcfriendsconnect()
        return
    }


    if(multiplayerconnecting(a)!=1)return
    if(!multiplayermapplayer.has(a.id))return
    if(multiplayeraction(a)!=1)return
}



function playergotafk(id){
    if(multiplayerafk.has(id))return
    postMessage({act:"is player away?",awayid:id,id:multiplayerid})
    multiplayerafktimer[id]=setTimeout(playerisafk,afktimeanswere+Math.random()*10,id)
}
function playerisafk(id){
    postMessage({act:"dont answered (disconnect)",awayid:id})
}
function visibilityandcol(me,a){
    if(renderer==3&&((typeof(a.w)=="number"&&me.w!=a.w)||(typeof(a.h)=="number"&&me.h!=a.h)))updatescene=true
    if((typeof(a.invisible)=="boolean"&&a.invisible!=me.invisible)||(typeof(a.nodraw)=="boolean"&&a.nodraw!=me.nodraw)){
        const vis=typeof(a.invisible)=="boolean"?a.invisible:me.invisible
        const nodraw=typeof(a.nodraw)=="boolean"?a.nodraw:me.nodraw
        if(((vis||nodraw)||(!vis&&!nodraw))&&renderer==3)updatetextur=true
        if((vis||nodraw)&&me.havcoll){
            const menum=colobjarr.findIndex(i=>i==me)+1
            for(let i=me.x-2;i<=me.x+me.w+2;i++)for(let i1=me.y-2;i1<=me.y+me.h+2;i1++){
                let i2=Math.trunc(i1-miny)*(maxx-minx)+Math.trunc(i)-minx
                if(objcolmap[i2]==menum)objcolmap[i2]=0
            }
        }
        if(!vis&&!nodraw&&me.havcoll){
            const menum=colobjarr.findIndex(i=>i==me)+1
            for(let i=me.x;i<me.x+me.w;i++)for(let i1=me.y;i1<me.y+me.h;i1++){
                let i2=Math.trunc(i1-miny)*(maxx-minx)+Math.trunc(i)-minx
                if(objcolmap[i2]==0)objcolmap[i2]=menum
            }
        }
    }
}
function join(a){
    if(!myRect[loadmap].some(i=>i.onlineplayernum==a.data.playerid&&i.onlineplayer==a.id)){
        if(multiplayeridcheckingonspawn&&!checkids(a.id))return
        let i={}
        for(let i1 of createobj.multiplayerallowedprop)if(a.data.hasOwnProperty(i1))i[i1]=a.data[i1]
        new createobj.Multiplayer(myRect,Object.assign({onlineplayernum:a.data.playerid,onlineplayer:a.id},i))
        bonescolorf(myRect[loadmap][myRect[loadmap].length-1])
    }else{
        for(let i of myRect[loadmap]){
            if(i.onlineplayernum==a.data.playerid&&i.onlineplayer==a.id){
                for(let i1 of createobj.multiplayerallowedprop)if(a.data.hasOwnProperty(i1))i[i1]=a.data[i1]
                break
            }
        }
    }
    if(a.act=="player join"){
        let i1=-1
        for(let i of myRect[loadmap]){
            if(i.playerphysik){
                postMessage({act:"player join2",data:{playerid:++i1,x:i.x,y:i.y,w:i.w,h:i.h},id:multiplayerid})
                i.playersendid=i1
            }
        }
    }
    if(renderer==3)updatescene=true
}
function managefromplayer(){
    let player=[multiplayerid,...multiplayermapplayer.keys()].sort()
    player=player.filter(i=>!multiplayerafk.has(i))
    let obj=myRect[loadmap].filter(i=>i.managefromplayer==true)
    let i=0
    for(let i1 in obj){
        obj[i1].managefromplayernum=player[i]
        obj[i1].managefromplayerobjnum=parseInt(i1)
        if((++i)>=player.length)i=0
    }
}
/**
 * Add two numbers.
 * @param {number} mode
 * @param {*} a
 */
function askfor(mode,a){
    if(multiplayeridcheckingonsdisplay&&!checkids(a.id))return
    [...document.getElementsByClassName("ask")].forEach(me=>me.style.display="none");
    let main=document.createElement("div")
    main.className="ask"
    main.style.display="grid"
    main.style.position="fixed"
    main.style.top="0"
    main.style.bottom="0"
    main.style.left="0"
    main.style.right="0"
    main.setAttribute('mode',""+mode)
    let but=[]
    but.push(document.createElement("SPAN"))
    if(mode==0)but[but.length-1].textContent=(tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("playerwanttojoin")?tooltips.multiplayer.playerwanttojoin:"player want to join:")+"\n"+a.id
    if(mode==1)but[but.length-1].textContent=(tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("downloadmapfromplayer")?tooltips.multiplayer.downloadmapfromplayer:"download map from player:")+"\n"+a.id
    but[but.length-1].style.backgroundColor="white"
    but[but.length-1].style.display="flex"
    but[but.length-1].style.alignItems="center"
    but[but.length-1].style.justifyContent="center"
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("accept")?tooltips.multiplayer.accept:"accept"
    but[but.length-1].onclick=()=>{
        if(mode==0){
            join(a)
        }
        if(mode==1)loadarr(a.obj)
        /** @type {Array.<HTMLDivElement>} */
        let t=[...document.getElementsByClassName("ask")]
        but.forEach((me)=>me.remove())
        if(t.length>0){
            t[0].style.display="grid"
            t[t.length-1].remove()
        }
    }
    but[but.length-1].className="accept "
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("acceptsek")?tooltips.multiplayer.acceptsek:"accept (30sek)"
    but[but.length-1].onclick=()=>{
        if(mode==0){
            multiplayeracceptallplayer=true
            window.setTimeout(()=>multiplayeracceptallplayer=false, 30000)
            join(a)
        }
        if(mode==1){
            multiplayeracceptallmaps=true
            window.setTimeout(()=>multiplayeracceptallmaps=false, 30000)
            loadarr(a.obj)
        }
        /** @type {Array.<HTMLDivElement>} */
        let t=[...document.getElementsByClassName("ask")]
        but.forEach((me)=>me.remove())
        if(t.length>0){
            t[0].style.display="grid"
            t[t.length-1].remove()
        }
        t=[...document.getElementsByClassName("ask")]
        for(let i in t){
            if(t[0].getAttribute('mode')=="0"&&multiplayeracceptallplayer)t[i].querySelectorAll("accept")[0].click()
            if(t[0].getAttribute('mode')=="1"&&multiplayeracceptallmaps)t[i].querySelectorAll("accept")[0].click()
        }
    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("deny")?tooltips.multiplayer.deny:"deny"
    but[but.length-1].onclick=()=>{
        but.forEach((me)=>me.remove())
        /** @type {Array.<HTMLDivElement>} */
        let t=[...document.getElementsByClassName("ask")]
        if(t.length>0){
            t[0].style.display="grid"
            t[t.length-1].remove()
        }

    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("addtowhitelist")?tooltips.multiplayer.addtowhitelist:"add to whitelist"
    but[but.length-1].onclick=()=>{
        if(mode==0)multiplayerwhitelistgame.add(a.id)
        if(mode==1)multiplayerwhitelist.add(a.id)
    }
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("addtoblacklist")?tooltips.multiplayer.addtoblacklist:"add to blacklist"
    but[but.length-1].onclick=()=>{
        if(mode==0)multiplayerblacklistgame.add(a.id)
        if(mode==1)multiplayerblacklist.add(a.id)
    }
    for (let i of but){i.className+="presetask"}
    for (let i of but)main.appendChild(i)
    document.body.appendChild(main)
    //menuupdatekeys=true
    //if(!disablemenucontrolls)menucontrolls()
}

//mache conect über send message machen und über multiplayermain
//multiplayertoconnect
function multiplayerfriendsconect(a){
    if(a.act1=="start0"){
        multiplayertoconnectmode.con=new RTCPeerConnection(multiplayernoice?RTCPEERConfignoice:RTCPeerConfig);
        multiplayertoconnectmode.candidate=""
        multiplayertoconnectmode.con.onicecandidate=e=>{if(e.candidate)multiplayertoconnectmode.candidate+=JSON.stringify(e.candidate)+"\n"}
        postMessage({
            act:"new Connection",
            act1:"start1",
            hop:true,
            hopid:a.hopid,
            sender:multiplayerid,
            toid:a.hopid,
            toid1:a.sender,
        },a.hopid)
        multiplayertoconnectmode.dc=multiplayertoconnectmode.con.createDataChannel("sendChannel");
        multiplayertoconnectmode.dc.onopen=()=>multiplayertoconnectmode={};
        multiplayertoconnectmode.dc.onclose=multiplayerdisconect;
        multiplayertoconnectmode.dc.onmessage=webrtcmessage

        multiplayertoconnectmode.con.createOffer().then(offer=>{
            multiplayertoconnectmode.con.setLocalDescription(offer)
            postMessage({
                act:"new Connection",
                act1:"offer0",
                data:JSON.stringify(offer),
                hop:true,
                hopid:a.hopid,
                sender:multiplayerid,
                toid:a.hopid,
                toid1:a.sender,
            },a.hopid)
        })
        conectionpromiseres[1]()
        webrtcConnection.push(multiplayertoconnectmode.con)
        webrtcChannel.push(multiplayertoconnectmode.dc)
        return
    }
    if(a.act1=="start1"){
        multiplayertoconnectmode.con=new RTCPeerConnection(multiplayernoice?RTCPEERConfignoice:RTCPeerConfig);
        multiplayertoconnectmode.candidate=""
        multiplayertoconnectmode.con.onicecandidate=e=>{if(e.candidate)multiplayertoconnectmode.candidate+=JSON.stringify(e.candidate)+"\n"}//candidaate solten erst gesendet werden wen da
        multiplayertoconnectmode.con.ondatachannel=event=>{
            multiplayertoconnectmode.dc=event.channel;
            webrtcConnection.push(multiplayertoconnectmode.con)
            webrtcChannel.push(multiplayertoconnectmode.dc)
            let num=webrtcChannel.push(multiplayertoconnectmode.dc)-1
    
            multiplayertoconnectmode.dc.onopen=()=>multiplayertoconnectmode={}
            multiplayertoconnectmode.dc.onclose=multiplayerdisconect
            multiplayertoconnectmode.dc.onmessage=webrtcmessage
            postMessage({
                act:"new Connection finish",
                toid:a.hopid
            },a.hopid)
        }
        return
    }
    if(a.act1=="offer0"){
        console.log(a.data)
        multiplayertoconnectmode.con.setRemoteDescription(new RTCSessionDescription(JSON.parse(a.data)))
        multiplayertoconnectmode.con.createAnswer().then((answere)=>{
            multiplayertoconnectmode.con.setLocalDescription(answere)
            console.log(multiplayertoconnectmode.con.localDescription)
            console.log(answere)
            postMessage({
                act:"new Connection",
                act1:"offer1",
                //data:JSON.stringify(multiplayertoconnectmode.con.localDescription),
                data:JSON.stringify(answere),
                hop:true,
                hopid:a.hopid,
                sender:multiplayerid,
                toid:a.hopid,
                toid1:a.sender,
            },a.hopid)
        })
        return
    }
    if(a.act1=="offer1"){
        console.log(a.data)
        multiplayertoconnectmode.con.setRemoteDescription(new RTCSessionDescription(JSON.parse(a.data)))
        postMessage({//das kan man reinfolge auch endern
            act:"new Connection",
            act1:"candidate0",
            data:multiplayertoconnectmode.candidate,
            hop:true,
            hopid:a.hopid,
            sender:multiplayerid,
            toid:a.hopid,
            toid1:a.sender,
        },a.hopid)
        return
    }
    if(a.act1=="candidate0"){
        console.log(a.data)
        for(let i of a.data.replace(/}(\n)?{/,"}}{{").split("}{"))multiplayertoconnectmode.con.addIceCandidate(new RTCIceCandidate(JSON.parse(i))).catch(e=>console.log(e))
        try{multiplayertoconnectmode.con.addIceCandidate(null)}catch(e){}//laut spec sol mans machen aber naja
        postMessage({
            act:"new Connection",
            act1:"candidate1",
            data:multiplayertoconnectmode.candidate,
            hop:true,
            hopid:a.hopid,
            sender:multiplayerid,
            toid:a.hopid,
            toid1:a.sender,
        },a.hopid)
        return
    }
    if(a.act1=="candidate1"){
        console.log(a.data)
        for(let i of a.data.replace(/}(\n)?{/,"}}{{").split("}{"))multiplayertoconnectmode.con.addIceCandidate(new RTCIceCandidate(JSON.parse(i))).catch(e=>console.log(e))
        try{multiplayertoconnectmode.con.addIceCandidate(null)}catch(e){}
        return
    }
}
function webrtcfriendsconnect(){
    //mache conection anstossen und wen fertig mit con sind las es der func winnen
    if(multiplayertoconnect.length==0)return
    let players=multiplayertoconnect.pop()
    postMessage({
        act:"new Connection",
        act1:"start0",
        hop:false,
        hopid:multiplayerid,
        sender:players[0],
        toid:players[1],
    },players[1])
    //mache warten
}

function webrtcgui(){
    let but=[]
    let main=document.createElement("div")
    main.style.display="grid"
    main.style.position="fixed"
    main.style.top="0"
    main.style.bottom="0"
    main.style.left="0"
    main.style.right="0"
    let subdiv=document.createElement("div")
    subdiv.style.display="contents"
    let sendChannel
    let localConnection
    let but1=[]
    let but2=[]

    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("player1")?tooltips.multiplayer.player1:"player1"
    but[but.length-1].onclick=e=>{
        document.querySelectorAll('.presetguiopt').forEach((me)=>me.remove())
        for(let i of but1)subdiv.appendChild(i)

        localConnection=new RTCPeerConnection(multiplayernoice?RTCPEERConfignoice:RTCPeerConfig);
        localConnection.onicecandidate=e=>{
            console.log(e)
            if(e.candidate){
                document.getElementById("candidate").textContent+=JSON.stringify(e.candidate)+"\n"
            }
        }
        sendChannel=localConnection.createDataChannel("sendChannel");
        sendChannel.onopen=e=>{
            webrtcConnection.push(localConnection)
            webrtcChannel.push(sendChannel)
            console.log(e)
            if(document.getElementById("isopen"))document.getElementById("isopen").style.display="flex"
            document.querySelectorAll('.presetgui:not(#isopen),.presetguiopt:not(#isopen)').forEach((me)=>me.remove())
        };
        sendChannel.onclose=e=>{
            multiplayerdisconect(e)
            if(document.getElementById("isclose"))document.getElementById("isclose").style.display="flex"
            document.querySelectorAll('.presetgui:not(#isclose),.presetguiopt:not(#isclose)').forEach((me)=>me.remove())
        };
        localConnection.createOffer().then(offer=>{
            localConnection.setLocalDescription(offer)
            document.getElementById("sdp").textContent+=JSON.stringify(offer)
        })
        sendChannel.onmessage=webrtcmessage
    }
    but1.push(document.createElement("TEXTAREA"))
    but1[but1.length-1].id="sdp"
    but1[but1.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("sdp")?tooltips.multiplayer.sdp:"sdp"
    but1[but1.length-1].onclick=e=>{if(webrtcguiclipboard)clipwrite(e)}
    but1[but1.length-1].readonly=true
    but1[but1.length-1].spellcheck=false
    but1[but1.length-1].autocorrect="off"
    but1[but1.length-1].autocapitalize="off"
    but1[but1.length-1].autocomplete="off"


    but1.push(document.createElement("TEXTAREA"))
    but1[but1.length-1].id="sdpo"
    but1[but1.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("sdpo")?tooltips.multiplayer.sdpo:"sdp from other player"
    but1[but1.length-1].onclick=e=>{menuallowedtomove=false;if(webrtcguiclipboard)clipread(e)}
    but1[but1.length-1].onblur=()=>menuallowedtomove=true
    but1[but1.length-1].spellcheck=false
    but1[but1.length-1].autocorrect="off"
    but1[but1.length-1].autocapitalize="off"
    but1[but1.length-1].autocomplete="off"


    but1.push(document.createElement("BUTTON"))
    but1[but1.length-1].textContent=tooltips.hasOwnProperty("ok")?tooltips.ok:"ok"
    but1[but1.length-1].id="sdpconnect"
    but1[but1.length-1].onclick=e=>{
        e.target.remove()
        localConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(document.getElementById("sdpo").value)))
        document.getElementById("sdp").style.display="none"
        document.getElementById("sdpo").style.display="none"

        document.getElementById("candidate").style.display=""
        document.getElementById("candidateo").style.display=""
        document.getElementById("candidateconnect").style.display=""
    }


    but1.push(document.createElement("TEXTAREA"))
    but1[but1.length-1].id="candidate"
    but1[but1.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("candidate")?tooltips.multiplayer.candidate:"candidate"
    but1[but1.length-1].onclick=e=>{if(webrtcguiclipboard)clipwrite(e)}
    but1[but1.length-1].readonly=true
    but1[but1.length-1].style.display="none"
    but1[but1.length-1].spellcheck=false
    but1[but1.length-1].autocorrect="off"
    but1[but1.length-1].autocapitalize="off"
    but1[but1.length-1].autocomplete="off"

    but1.push(document.createElement("TEXTAREA"))
    but1[but1.length-1].id="candidateo"
    but1[but1.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("candidateo")?tooltips.multiplayer.candidateo:"candidate from other player"
    but1[but1.length-1].style.display="none"
    but1[but1.length-1].onclick=e=>{menuallowedtomove=false;if(webrtcguiclipboard)clipread(e)}
    but1[but1.length-1].onblur=()=>menuallowedtomove=true
    but1[but1.length-1].spellcheck=false
    but1[but1.length-1].autocorrect="off"
    but1[but1.length-1].autocapitalize="off"
    but1[but1.length-1].autocomplete="off"

    but1.push(document.createElement("BUTTON"))
    but1[but1.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("connect")?tooltips.multiplayer.connect:"connect"
    but1[but1.length-1].id="candidateconnect"
    but1[but1.length-1].onclick=e=>{
        for(let i of document.getElementById("candidateo").value.replace(/}(\n)?{/,"}}{{").split("}{"))localConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(i))).catch(e=>console.log(e))
        try{localConnection.addIceCandidate(null)}catch(e){}
    }
    but1[but1.length-1].style.display="none"

    but1.push(document.createElement("SPAN"))
    but1[but1.length-1].id="isopen"
    but1[but1.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("open")?tooltips.multiplayer.open:"open"
    but1[but1.length-1].style.backgroundColor="white"
    but1[but1.length-1].style.alignItems="center"
    but1[but1.length-1].style.justifyContent="center"
    but1[but1.length-1].style.display="none"

    but1.push(document.createElement("SPAN"))
    but1[but1.length-1].id="isclose"
    but1[but1.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("close")?tooltips.multiplayer.open:"close"
    but1[but1.length-1].style.backgroundColor="white"
    but1[but1.length-1].style.alignItems="center"
    but1[but1.length-1].style.justifyContent="center"
    but1[but1.length-1].style.display="none"


    if(webrtcConnection.length==0){
        but.push(document.createElement("BUTTON"))
        but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("player2")?tooltips.multiplayer.player1:"player2"
        but[but.length-1].onclick=e=>{
            document.querySelectorAll('.presetguiopt').forEach((me)=>me.remove())
            for(let i of but2)subdiv.appendChild(i)

            localConnection=new RTCPeerConnection(multiplayernoice?RTCPEERConfignoice:RTCPeerConfig);
            localConnection.onicecandidate=e=>{
                console.log(e)
                if(e.candidate){
                    document.getElementById("candidate").textContent+=JSON.stringify(e.candidate)+"\n"
                }
            }
            localConnection.ondatachannel=event=>{
                let receiveChannel=event.channel;
                receiveChannel.onopen=e=>{
                    console.log(e)
                    webrtcConnection.push(localConnection)
                    webrtcChannel.push(receiveChannel)
                    if(document.getElementById("isopen"))document.getElementById("isopen").style.display="flex"
                    document.querySelectorAll('.presetgui:not(#isopen),.presetguiopt:not(#isopen)').forEach((me)=>me.remove())
                }
                receiveChannel.onclose=e=>{
                    multiplayerdisconect(e)
                    if(document.getElementById("isclose"))document.getElementById("isclose").style.display="flex"
                    document.querySelectorAll('.presetgui:not(#isclose),.presetguiopt:not(#isclose)').forEach((me)=>me.remove())
                }
                receiveChannel.onmessage=webrtcmessage
            }
        }
        but2.push(document.createElement("TEXTAREA"))
        but2[but2.length-1].id="sdp"
        but2[but2.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("sdp")?tooltips.multiplayer.sdp:"sdp"
        but2[but2.length-1].onclick=e=>{if(webrtcguiclipboard)clipwrite(e)}
        but2[but2.length-1].readonly=true
        but2[but2.length-1].style.display="none"
        but2[but2.length-1].spellcheck=false
        but2[but2.length-1].autocorrect="off"
        but2[but2.length-1].autocapitalize="off"
        but2[but2.length-1].autocomplete="off"

        but2.push(document.createElement("TEXTAREA"))
        but2[but2.length-1].id="sdpo"
        but2[but2.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("sdpo")?tooltips.multiplayer.sdpo:"sdp from other player"
        but2[but2.length-1].onclick=e=>{menuallowedtomove=false;if(webrtcguiclipboard)clipread(e)}
        but2[but2.length-1].onblur=()=>menuallowedtomove=true
        but2[but2.length-1].spellcheck=false
        but2[but2.length-1].autocorrect="off"
        but2[but2.length-1].autocapitalize="off"
        but2[but2.length-1].autocomplete="off"

        but2.push(document.createElement("BUTTON"))
        but2[but2.length-1].textContent=tooltips.hasOwnProperty("ok")?tooltips.ok:"ok"
        but2[but2.length-1].id="sdpconnect"
        but2[but2.length-1].onclick=e=>{
            e.target.remove()
            localConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(document.getElementById("sdpo").value)))
            .then(()=>localConnection.setLocalDescription(localConnection.createAnswer()))
            .then(()=>{document.getElementById("sdp").textContent+=JSON.stringify(localConnection.localDescription)+"\n"})
            document.getElementById("sdp").style.display=""
            document.getElementById("sdpo").style.display="none"

            document.getElementById("candidate").style.display=""
            document.getElementById("candidateo").style.display=""
            document.getElementById("candidateconnect").style.display=""
        }

        but2.push(document.createElement("TEXTAREA"))
        but2[but2.length-1].id="candidate"
        but2[but2.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("candidate")?tooltips.multiplayer.candidate:"candidate"
        but2[but2.length-1].style.display="none"
        but2[but2.length-1].onclick=e=>{if(webrtcguiclipboard)clipwrite(e)}
        but2[but2.length-1].readonly=true
        but2[but2.length-1].spellcheck=false
        but2[but2.length-1].autocorrect="off"
        but2[but2.length-1].autocapitalize="off"
        but2[but2.length-1].autocomplete="off"

        but2.push(document.createElement("TEXTAREA"))
        but2[but2.length-1].id="candidateo"
        but2[but2.length-1].placeholder=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("candidateo")?tooltips.multiplayer.candidateo:"candidate from other player"
        but2[but2.length-1].style.display="none"
        but2[but2.length-1].onclick=e=>{menuallowedtomove=false;if(webrtcguiclipboard)clipread(e)}
        but2[but2.length-1].onblur=()=>menuallowedtomove=true
        but2[but2.length-1].spellcheck=false
        but2[but2.length-1].autocorrect="off"
        but2[but2.length-1].autocapitalize="off"
        but2[but2.length-1].autocomplete="off"

        but2.push(document.createElement("BUTTON"))
        but2[but2.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("connect")?tooltips.multiplayer.connect:"connect"
        but2[but2.length-1].id="candidateconnect"
        but2[but2.length-1].style.display="none"
        but2[but2.length-1].onclick=e=>{
            for(let i of document.getElementById("candidateo").value.replace(/}(\n)?{/,"}}{{").split("}{"))localConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(i))).catch(e=>console.log(e))
            try{localConnection.addIceCandidate(null)}catch(e){}
        }
        but2.push(document.createElement("SPAN"))
        but2[but2.length-1].id="isopen"
        but2[but2.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("open")?tooltips.multiplayer.open:"open"
        but2[but2.length-1].style.backgroundColor="white"
        but2[but2.length-1].style.alignItems="center"
        but2[but2.length-1].style.justifyContent="center"
        but2[but2.length-1].style.display="none"

        but2.push(document.createElement("SPAN"))
        but2[but2.length-1].id="isclose"
        but2[but2.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("close")?tooltips.multiplayer.open:"close"
        but2[but2.length-1].style.backgroundColor="white"
        but2[but2.length-1].style.alignItems="center"
        but2[but2.length-1].style.justifyContent="center"
        but2[but2.length-1].style.display="none"
    }



    /*
    but.push(document.createElement("BUTTON"))
    but[but.length-1].textContent=tooltips.hasOwnProperty("multiplayer")&&tooltips.multiplayer.hasOwnProperty("addviabc")?tooltips.multiplayer.addviabc:"add via broadcast"
    but[but.length-1].onclick=e=>{
        document.querySelectorAll('.presetguiopt').forEach((me)=>me.remove())
        console.log("not jet implimentet")
    }
    let but3=[]
    */

    for (let i of [...but1,...but2])i.className="presetgui"
    for (let i of but)i.className="presetguiopt"
    for(let i of but)subdiv.appendChild(i)
    main.appendChild(subdiv)
    let exit=document.createElement("BUTTON")
    exit.textContent=tooltips.hasOwnProperty("start")?tooltips.start:"start"
    exit.onclick=e=>{document.querySelectorAll('.presetgui,.presetguiopt').forEach((me)=>me.remove());subdiv.remove();e.target.remove();main.remove();mvis()}
    main.appendChild(exit)
    document.body.appendChild(main)
}
//fange mit localan danach remote und das immer hin und her


promallres[10]()