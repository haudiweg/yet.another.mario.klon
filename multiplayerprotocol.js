function multiplayeraction(a){
    if(a.act=="spawn obj"){
        if(createobj.multiplayerallowedspawn.includes(a.data.construck)){
            if(multiplayeridcheckingonspawn&&!checkids(a.id))return
            let prop=[]
            for(let i1 of createobj.multiplayerallowedobjprop)if(a.data.hasOwnProperty(i1))prop[i1]=a.data[i1]
            new createobj[a.data.construck](myRect,{onlineplayernum:a.data.playerid,onlineplayer:a.id,...prop})
        }
        return
    }
    if(a.act=="update obj"){
        for(let i of myRect[loadmap]){
            if(i.managefromplayerobjnum==a.managefromplayerobjnum&&(i.managefromplayernum==a.id||i.sync)){
                visibilityandcol(i,a.data)
                //mache shared obj besonders updaten
                for(let i1 of createobj.multiplayerallowedobjprop){
                    if(a.data.hasOwnProperty(i1)){
                        if("BYTES_PER_ELEMENT" in i[i1]){
                            i[i1].fill(a.data[i1])
                        }else{
                            i[i1]=a.data[i1]
                        }
                    }
                }
                break
            }
        }
        return
    }
    if(a.act=="remove obj"){
        for(let i of myRect[loadmap]){
            if(i.managefromplayerobjnum==a.managefromplayerobjnum&&((i.managefromplayernum==a.id||i.sync)|(i.managefromplayernum==a.data.id||!i.sync))){

            }
        }
        return
    }
    if(stopmain&&a.act=="winscreen"){
        console.log("finish (multiplayer)")
        stopmain=false;
        winscreen()
        return
    }
    if(a.act=="sendmap"){//recive map
        if(multiplayerblacklist.has(a.id))return//wen id auf blacklist dan return
        if(multiplayerwhitelist.has(a.id)||multiplayeracceptallmaps){// wen auf whitelist dan accepte
            loadarr(a.obj)
            return
        }
        if(!multiplayerignorenotwitelistet)askfor(1,a)
        return
    }

    if(stopmain&&a.act=="player stats update"){
        for(let i of myRect[loadmap]){
            if(i.onlineplayernum==a.playersendid&&i.onlineplayer==a.id){
                if(renderer==3&&((typeof(a.w)=="number"&&i.w!=a.w)||(typeof(a.h)=="number"&&i.h!=a.h))){updatescene=true}
                for(let i1 of createobj.multiplayerallowedprop)if(a.data.hasOwnProperty(i1)&&i.hasOwnProperty(i1))i[i1]=a.data[i1]
                return
            }
        }
    }
    if(a.act=="player join"||a.act=="player join2"){
        if(multiplayerblacklistgame.has(a.id))return//wen id auf blacklist dan return
        // wen auf whitelist schon da oder man alle accepten sol dan accepte 
        if(multiplayerwhitelistgame.has(a.id)||multiplayeracceptallplayer||myRect[loadmap].some(i=>i.onlineplayernum==a.data.playerid&&i.onlineplayer==a.id)){
            join(a)
            return
        }
        if(!myRect[loadmap].some(i=>i.onlineplayernum==a.data.playerid&&i.onlineplayer==a.id)&&!multiplayerignorenotwitelistetgame)askfor(0,a)
        return
    }

    if(a.act=="player leave"){
        for(let i in myRect[loadmap]){
            if(myRect[loadmap][i].onlineplayernum==a.data.playerid&&myRect[loadmap][i].onlineplayer==a.id){
                myRect[loadmap].splice(i,1);
                break
            }
        }
        if(renderer==3)updatescene=true
        return
    }

    if(a.act=="is player away?"&&a.awayid==multiplayerid){
        postMessage({act:"im not away",id:multiplayerid})
        return
    }

    if(a.act=="bye"){
        for(let i in myRect[loadmap]){
            if(myRect[loadmap][i].onlineplayer==a.id)myRect[loadmap].splice(i,1);
        }
        multiplayermapplayer.delete(a.id)
        multiplayerafk.delete(a.id)
        managefromplayer()
        return
    }
    if(a.act=="dont answered (disconnect)"){
        for(let i in myRect[loadmap]){
            if(myRect[loadmap][i].onlineplayer==a.awayid)myRect[loadmap].splice(i,1);
        }
        multiplayermapplayer.delete(a.awayid)
        multiplayerafk.delete(a.awayid)
        managefromplayer()
        return
    }
    if(a.act=="player afk"){
        multiplayerafk.add(a.id)
        managefromplayer()
        return
    }
    if(a.act=="player not afk"){
        multiplayerafk.delete(a.id)
        managefromplayer()
        return
    }

    return 1
}
promallres[12]()