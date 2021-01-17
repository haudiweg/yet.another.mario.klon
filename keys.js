var keys={
    arr:{
        250:{stärke:0,mode:"axesmouse",sign:"0"},
        251:{stärke:0,mode:"axesmouse",sign:"1"},
        252:{stärke:0,mode:"axesmouse",sign:"2"},
        253:{stärke:0,mode:"axesmouse",sign:"3"},
        254:{stärke:0,mode:"axesmouse",sign:"4"},
        255:{stärke:0,mode:"exitmouse",sign:"0"},
    },//87:{stärke:0,mode:"axes",sign:"+",key:0}
    map:{
        87:[32,87],
        83:[16,83],
        68:[68],
        65:[65],
        27:[27],
        82:[82],


        73:[73],
        74:[74],
        75:[75],
        76:[76],

        587:[587],
        583:[583],
        568:[568],
        565:[565],
        582:[582],
    },//quelle getriggert von
    deadarr:{},
    min:{},
    max:{},
    actmin:{},
    actmax:{},
    keymaps:{
        default:{
            map:{
                87:[32,87],
                83:[16,83],
                68:[68],
                65:[65],
                27:[27],
                82:[82],


                73:[73],
                74:[74],
                75:[75],
                76:[76],
            }
        },
        XBOX:{
            map:{
                27:[309],
                82:[300],
                87:[320,312,301],
                65:[318,314],
                83:[319,313],
                68:[317,315],
            }
        },
        AD_Shift_Space:{
            map:{
                87:[32],
                65:[83],
                83:[16],
                68:[70],
                27:[27],
                82:[82],
            }
        },
        WASD:{
            map:{
                87:[87],
                65:[65],
                83:[83],
                68:[68],
                27:[27],
                82:[82],
            }
        },
        Arrow:{
            map:{
                87:[38],
                65:[37],
                83:[40],
                68:[39],
                27:[27],
                82:[45],
            }
        },
        IJKL:{
            map:{
                87:[73],
                65:[74],
                83:[75],
                68:[76],
                27:[27],
                82:[80],
            }
        },
        ESDF:{
            map:{
                87:[69],
                65:[83],
                83:[68],
                68:[70],
                27:[27],
                82:[84], 
            }
        },
        mouse:{
            map:{
                87:[252],
                83:[253],
                68:[251],
                65:[250],
                27:[255],
                82:[254]
            }
        },
    },
/**@param {number|string} name */
    setkeymap:function(name){
        if(this.keymaps.hasOwnProperty(name)){
            for(let i of keysdisplayarr){
                let name1=Object.keys(keys).find(me=>keys[me]===i)
                if(this.keymaps[name].hasOwnProperty(name1))this[name1]=this.keymaps[name][name1]
            }
        }
    },
/**@param {number} id */
    removecontrollerkeys:function(id){
        for(let i of [...this.arr]){
            if(this.arr[i].gpi==id){
                delete this.arr[i]
            }
        }
        if([...navigator.getGamepads()].findIndex(i=>i!=null)==-1)this.setkeymap("default")
    },
/**@param {number} id */
    addcontrollerkeys:function(id){
        //@ts-expect-error  implicit string in number parsing
        let num=Math.max(...Object.keys(this.arr),300)
        let gp=navigator.getGamepads()[id];
        if(gp.id.includes("Xbox"))this.setkeymap("XBOX")
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",gp.index,gp.id,gp.buttons.length,gp.axes.length);
        for (let i in gp.buttons) {
            this.arr[num++]={stärke:0,mode:"button",key:Number.parseInt(i),gpi:id}
        }
        for (let i in gp.axes) {
            this.arr[num++]={stärke:0,mode:"axes",sign:((i%2)==0?"+":"-"),key:Math.trunc(i/2),gpi:id}
        }
    },
/**
 * @param {number} key
 * @param {number} strong how strong it should vibrate
 * @param {number} weak how strong it should vibrate (faster motor)
*/
    vibrate:function(key,strong=1,weak=1){
        if(rumbletype==0){
            for(let i of this.map[key]){
                if(this.arr.hasOwnProperty(i)&&this.arr[i].hasOwnProperty("gpi")){//test for vibrationActuator
                    navigator.getGamepads()[this.arr[i].gpi].vibrationActuator.playEffect("dual-rumble", {
                        duration: 20,
                        strongMagnitude: strong,
                        weakMagnitude: weak
                    })
                }
            }
        }else if(rumbletype==1){
            window.navigator.vibrate(200)
        }
    },
    resetallnumstärke:function(){
        for(let i in this.arr)this.arr[i].stärke=0
    },
/**
 * @param {number} key
 * @param {number} stärke how strong you need to press
*/
    setnum:function(key,stärke){
        if(typeof(this.arr[key])!="undefined"){
            this.arr[key].stärke=stärke
        }else{
            this.arr[key]={stärke:stärke,mode:"key"}
        }
    },
/**
 * @param {number} key 
 * @param {string} mode the mode you want to use min max avg
 */
    getmapkey:function(key,mode="max",me=null){
        if(me!=null&&"keys" in me)return Math.min(Math.max(me.keys[key],0),1)
        if(!this.map.hasOwnProperty(key))return undefined
        let keyret=0
        if(mode=="avg"){
            let counter=0
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5
                if(!this.max.hasOwnProperty(key+","+i1))this.max[key+","+i1]=1
                let actnum=this.testkey(i1)
                if(actnum==undefined)continue
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                let num=(actnum-this.min[key+","+i1])/(this.max[key+","+i1]-this.min[key+","+i1])
                num=Math.max(Math.min(num,1),0)
                counter++
                keyret+=num
            }
            keyret/=counter
        }else{
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5
                if(!this.max.hasOwnProperty(key+","+i1))this.max[key+","+i1]=1
                let actnum=this.testkey(i1)
                if(actnum==undefined)continue
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                let num=(actnum-this.min[key+","+i1])/(this.max[key+","+i1]-this.min[key+","+i1])
                num=Math.max(Math.min(num,1),0)
                if(mode=="max"){
                    keyret=Math.max(keyret,num)
                }
                if(mode=="min"){
                    keyret=Math.min(keyret,num)
                }
            } 
        }
        return keyret
    },
/**
 * @param {number} key 
 * @param {string} mode the mode you want to use min max avg
 */
    getkeyovermin:function(key,mode="max",me=null){
        if(me!=null&&"keys" in me)return me.keys[key]>0
        if(!this.map.hasOwnProperty(key)&&!this.arr.hasOwnProperty(key))return 0
        if(mode=="avg"){
            let keyret=0
            let counter=0
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5

                let actnum=this.testkey(i1)
                if(actnum==undefined){continue}
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                counter++
                keyret+=(actnum>this.min[key+","+i1]?1:0)
            }
            keyret/=counter
            return keyret>0
        }else{
            for(let i1 of this.map[key]){
                if(!this.actmin.hasOwnProperty(key+","+i1))this.actmin[key+","+i1]=[0,0]
                if(!this.actmax.hasOwnProperty(key+","+i1))this.actmax[key+","+i1]=[1,1]
                if(!this.min.hasOwnProperty(key+","+i1))this.min[key+","+i1]=0.5

                let actnum=this.testkey(i1)
                if(actnum==undefined){continue}
                if(actnum<this.actmin[key+","+i1][0])actnum=this.actmin[key+","+i1][1]
                if(actnum>this.actmax[key+","+i1][0])actnum=this.actmax[key+","+i1][1]
                if(mode=="max"&&actnum>this.min[key+","+i1])return true
                if(mode=="min"&&actnum<this.min[key+","+i1])return false
            }
            return mode=="max"?false:true
        }
    },
/** @param {number} key */
    testkey:function(key){
        if(typeof(this.arr[key])=="undefined"||!this.arr[key].hasOwnProperty("mode"))return undefined
        if(this.arr[key].mode=="button"){
            return (navigator.getGamepads()[this.arr[key].gpi]).buttons[this.arr[key].key].value;
        }
        if(this.arr[key].mode=="axes"){
            if(!this.arr[key].hasOwnProperty("sign"))return undefined
            if(this.arr[key].sign=="+"){
                return Math.max((navigator.getGamepads()[this.arr[key].gpi]).axes[this.arr[key].key],0)
            }
            if(this.arr[key].sign=="-"){
                return Math.max(-((navigator.getGamepads()[this.arr[key].gpi]).axes[this.arr[key].key]),0)
            }
        }
        if(this.arr[key].mode=="sharedarr")return keysharedarr[this.arr[key].key];
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="0")return mousex!=null?Math.max(1-mousex/(canvas.width/2),0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="1")return mousex!=null?Math.max(mousex/(canvas.width/2)-1,0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="2")return mousey!=null?Math.max(1-mousey/(canvas.height/2),0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="3")return mousey!=null?Math.max(mousey/(canvas.height/2)-1,0):0
        if(this.arr[key].mode=="axesmouse"&&this.arr[key].sign=="4")return mousex!=null&&mousey!=null?1-Math.sqrt(Math.pow(Math.abs(canvas.height/2-mousey),2)+Math.pow(Math.abs(canvas.width/2-mousex),2))/Math.sqrt(Math.pow(canvas.height/2,2)+Math.pow(canvas.width/2,2)):0
        if(this.arr[key].mode=="exitmouse"&&this.arr[key].sign=="0")return mousex!=null&&mousey!=null&&exitborder>mousex&&exitborder>mousey?1:0
        if(this.arr[key].mode=="key"){
            return this.arr[key].stärke
        }
    },
    actualizekeys:function(){
        for(let i of Object.keys(this.arr)){
            if(this.arr[i].mode=="button")this.arr[i].stärke=(navigator.getGamepads()[this.arr[i].gpi]).buttons[this.arr[i].key].value;
            if(this.arr[i].mode=="axes"&&this.arr[i].sign=="+")this.arr[i].stärke=Math.max((navigator.getGamepads()[this.arr[i].gpi]).axes[this.arr[i].key],0)
            if(this.arr[i].mode=="axes"&&this.arr[i].sign=="-")this.arr[i].stärke=Math.max(-((navigator.getGamepads()[this.arr[i].gpi]).axes[this.arr[i].key]),0)
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="0")this.arr[i].stärke=mousex!=null?Math.max(1-mousex/(canvas.width/2),0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="1")this.arr[i].stärke=mousex!=null?Math.max(mousex/(canvas.width/2)-1,0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="2")this.arr[i].stärke=mousey!=null?Math.max(1-mousey/(canvas.height/2),0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="3")this.arr[i].stärke=mousey!=null?Math.max(mousey/(canvas.height/2)-1,0):0
            if(this.arr[i].mode=="axesmouse"&&this.arr[i].sign=="4")this.arr[i].stärke=mousex!=null&&mousey!=null?1-Math.sqrt(Math.pow(Math.abs(canvas.height/2-mousey),2)+Math.pow(Math.abs(canvas.width/2-mousex),2))/Math.sqrt(Math.pow(canvas.height/2,2)+Math.pow(canvas.width/2,2)):0
            if(this.arr[i].mode=="exitmouse"&&this.arr[i].sign=="0")this.arr[i].stärke=mousex!=null&&mousey!=null&&exitborder>mousex&&exitborder>mousey?1:0
        }
    },
/** @param {number} key */
    keytoggle:function(key){
        let erg=this.getkeyovermin(key)
        if(erg==true&&!this.deadarr[key]){this.deadarr[key]=true;return 1}
        if(erg==false&&this.deadarr[key]){this.deadarr[key]=false}
        return 0
    },
/**
 * @param {number} key 
 * @param {...number} key1
 */
    setverzweigung:function(key,...key1){
        if(this.map.hasOwnProperty(key)){
            this.map[key].push(...key1)
        }
    },
/**
 * @param {number} key 
 * @param {number} key1
 */
    remverzweigung:function(key,key1){
        this.map[key]=this.map[key].filter((i)=>{i!=key1})
    },
    resetverzweigung:function(){
        this.map={}
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setmin:function(key,key1,stärke){
        this.min[key+","+key1]=stärke
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setmax:function(key,key1,stärke){
        this.max[key+","+key1]=stärke
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setactmin:function(key,key1,stärke){
        this.actmin[key+","+key1]=stärke
    },
/**
 * @param {number} key 
 * @param {...number} key1
 * @param {number} stärke how strong you need to press
 */
    setactmax:function(key,key1,stärke){
        this.actmax[key+","+key1]=stärke
    },
    mousemove:function(){
        let bound=canvas.getBoundingClientRect();
        mousexc=(event.clientX-bound.left-canvas.clientLeft)*zoomn;
        mouseyc=(event.clientY-bound.top-canvas.clientTop)*zoomn;
    },
    mousedown:function(){
        let bound=canvas.getBoundingClientRect();
        mousex=(event.clientX-bound.left-canvas.clientLeft)*zoomn;
        mousey=(event.clientY-bound.top-canvas.clientTop)*zoomn;
    },
    mouseup:function(){
        mousex=null
        mousey=null
    },
}
let keysdisplayarr=[keys.map,keys.arr,keys.min,keys.max,keys.actmin,keys.actmax]