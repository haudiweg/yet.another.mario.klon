function initializeconnections(){
    if(enablemultiplayer[0]){
        bc=new BroadcastChannel(broadcastchanelname)
        bc.onmessageerror = function(event){
            enablemultiplayer[0]=false
            console.log("bc error close")
        }
        bc.onmessage=e=>{
            //console.log(e)
            if(!("data" in e)||e.data==null||e.data==undefined||typeof(e.data)!=="object")return
            if("toid" in e.data&&typeof(e.data.toid)!=="undefined"&&e.data.toid!=multiplayerid){console.log("del");return}
            e.data.con=e.currentTarget
            multiplayermain(e.data)
        }
        conectionpromiseres[0]()
        conectionpromise[0].res=true
        multiplayerconnect()
    }
    if(enablemultiplayer[2]){
        websocket=new WebSocket(multiplayerwebsocketurl); 
        websocket.onclose = function(event){
            enablemultiplayer[2]=false
            console.log("websocket close close")
        }
        websocket.onerror = function(event){
            enablemultiplayer[2]=false
            console.log("websocket error close")
        }
        websocket.onmessage=e=>{
            let parse=JSON.parse(e.data)
            console.log(parse)
            if(parse.message_type!=="chat-box-html")return
            let temp={}
            try{temp=JSON.parse(parse.raw.replace("@bot<3 ",""))}catch(e){return}
            if(temp==null)return
            if(temp.id==multiplayerid)return
            //console.log(temp)
            if("toid" in temp&&typeof(temp.toid)!=="undefined"&&temp.toid!=multiplayerid){console.log("del");return}
            temp.con=e.currentTarget
            multiplayermain(temp)
        }
        websocket.onopen = function(event) { 
            conectionpromiseres[2]()
            conectionpromise[2].res=true
            console.log("enabled websocket")
            multiplayerconnect()
        }
    }
}

function webrtcmessage(e){
    let temp=JSON.parse(e.data)
    if(typeof(temp.toid)!=="undefined"&&temp.toid!=multiplayerid)return
    temp.con=e.currentTarget
    multiplayermain(temp)
}

promallres[11]()