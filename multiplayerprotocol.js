function multiplayeraction(pac){
    if(pac.act=="spawn obj"){
        if(createobj.multiplayerallowedspawn.includes(pac.data.construck)){
            if(multiplayeridcheckingonspawn&&!checkids(pac.id))return
            let prop={}
            for(let i1 of createobj.multiplayerallowedobjprop){
                if(pac.data.hasOwnProperty(i1)){
                    prop[i1]=pac.data[i1]
                }
            }
            new createobj[pac.data.construck](myRect,Object.assign({onlineplayernum:pac.data.playerid,onlineplayer:pac.id},prop));
        }
        return
    }
    if(pac.act=="update obj"){
        for(let i of myRect[loadmap]){
            if(i.managefromplayerobjnum==pac.managefromplayerobjnum&&(i.managefromplayernum==pac.id||i.sync)){
                visibilityandcol(i,pac.data)
                //mache shared obj besonders updaten
                for(let i1 of createobj.multiplayerallowedobjprop){
                    if(pac.data.hasOwnProperty(i1)){
                        if("BYTES_PER_ELEMENT" in i[i1]){
                            i[i1].fill(pac.data[i1])
                        }else{
                            i[i1]=pac.data[i1]
                        }
                    }
                }
                break
            }
        }
        return
    }
    if(pac.act=="remove obj"){
        for(let i of myRect[loadmap]){
            if(i.managefromplayerobjnum==pac.managefromplayerobjnum&&((i.managefromplayernum==pac.id||i.sync)|(i.managefromplayernum==pac.data.id||!i.sync))){

            }
        }
        return
    }
    if(stopmain&&pac.act=="winscreen"){
        console.log("finish (multiplayer)")
        stopmain=false;
        winscreen()
        return
    }
    if(pac.act=="sendmap"){//recive map
        if(multiplayerblacklist.has(pac.id))return//wen id auf blacklist dan return
        if(multiplayerwhitelist.has(pac.id)||multiplayeracceptallmaps){// wen auf whitelist dan accepte
            loadarr(pac.obj)
            return
        }
        if(!multiplayerignorenotwitelistet)askfor(1,pac)
        return
    }

    if(stopmain&&pac.act=="player stats update"){
        for(let i of myRect[loadmap]){
            if(i.onlineplayernum==pac.playersendid&&i.onlineplayer==pac.id){
                if(renderer==3&&((typeof(pac.w)=="number"&&i.w!=pac.w)||(typeof(pac.h)=="number"&&i.h!=pac.h))){updatescene=true}
                for(let i1 of createobj.multiplayerallowedprop)if(pac.data.hasOwnProperty(i1)&&i.hasOwnProperty(i1))i[i1]=pac.data[i1]
                return
            }
        }
    }
    if(pac.act=="player join"||pac.act=="player join2"){
        if(multiplayerblacklistgame.has(pac.id))return//wen id auf blacklist dan return
        // wen auf whitelist schon da oder man alle accepten sol dan accepte 
        if(multiplayerwhitelistgame.has(pac.id)||multiplayeracceptallplayer||myRect[loadmap].some(i=>i.onlineplayernum==pac.data.playerid&&i.onlineplayer==pac.id)){
            join(pac)
            return
        }
        if(!myRect[loadmap].some(i=>i.onlineplayernum==pac.data.playerid&&i.onlineplayer==pac.id)&&!multiplayerignorenotwitelistetgame)askfor(0,pac)
        return
    }

    if(pac.act=="player leave"){
        for(let i in myRect[loadmap]){
            if(myRect[loadmap][i].onlineplayernum==pac.data.playerid&&myRect[loadmap][i].onlineplayer==pac.id){
                myRect[loadmap].splice(i,1);
                break
            }
        }
        if(renderer==3)updatescene=true
        return
    }

    if(pac.act=="is player away?"&&pac.awayid==multiplayerid){
        postMessage({act:"im not away",id:multiplayerid})
        return
    }

    if(pac.act=="bye"){
        for(let i in myRect[loadmap]){
            if(myRect[loadmap][i].onlineplayer==pac.id)myRect[loadmap].splice(i,1);
        }
        multiplayermapplayer.delete(pac.id)
        multiplayerafk.delete(pac.id)
        managefromplayer()
        return
    }
    if(pac.act=="dont answered (disconnect)"){
        for(let i in myRect[loadmap]){
            if(myRect[loadmap][i].onlineplayer==pac.awayid)myRect[loadmap].splice(i,1);
        }
        multiplayermapplayer.delete(pac.awayid)
        multiplayerafk.delete(pac.awayid)
        managefromplayer()
        return
    }
    if(pac.act=="player afk"){
        multiplayerafk.add(pac.id)
        managefromplayer()
        return
    }
    if(pac.act=="player not afk"){
        multiplayerafk.delete(pac.id)
        managefromplayer()
        return
    }

    return 1
}
promallres[12]()