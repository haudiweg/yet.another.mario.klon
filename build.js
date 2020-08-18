'use strict';
function addtobuildmenu(i){
    let div=document.createElement("BUTTON")
    div.class="presetobj"
    div.id="presetobj"+i
    div.draggable=true
    div.style.tabindex=""+i
    div.addEventListener('click',()=>{
        let me=presetobj[i]
        me.x+=rofx+canvas.width/2
        me.y+=rofy+canvas.height/2
        let construcktoarr=me.construckarr
        let construckt=me.construck
        console.log(me)
        new (createobj[construckt])(window[construcktoarr],me.x,me.y,me.w,i.h,me)
        let meo=window[construcktoarr][window[construcktoarr].length-1]
        delete meo.name
        delete meo.picture
        if(renderer==3)updatescene=true
        if(renderer==0&&meo.static)renderbackground=true
        if(typeof(colorobj)=="undefined"){if(typeof(meo.fillbackup)!="undefined")meo.fill=meo.fillbackup}
        else if(Object.getOwnPropertyNames(colorobj).includes(meo.fill))colorobj[meo.fill](meo.x,meo.y,meo,meo.w,meo.h)
        meo.shadow=[]
        mesureminmax(meo)
    });
    div.addEventListener('dragstart',event=>event.dataTransfer.setData("text",JSON.stringify(presetobj[i])))
    div.style.textAlign="center"
    div.style.height="100%"
    div.style.width="10vw"
    let span=document.createElement("SPAN")
    span.innerText=presetobj[i].name
    let img=document.createElement("IMG")
    img.src=presetobj[i].picture
    div.appendChild(span)
    div.appendChild(img)
    document.getElementById("buildmenu").appendChild(div)
}
function savetopreset(event,obj){
    let temp=[obj].map(a=>({...a}))[0]
    let arrayfrom=[myFire[loadmap],myRect[loadmap],mySun[loadmap]].find(me=>me.includes(obj))
    if(typeof(temp.fill)=="object"){temp.fill=temp.fillstr}
    delete temp.shadow
    delete temp.shadowadd
    delete temp.fillstr
    delete temp.graviins
    delete temp.gravirich
    delete temp.rich4
    delete temp.rich4arr
    delete temp.rich2
    delete temp.rich2arr
    //mit null überschreiben
    let temp1=new createobj[temp.construck]("return")
    for(let i in Object.keys(temp1)){
        let key=Object.keys(temp2)[i2]
        if(JSON.stringify(temp[key])==JSON.stringify(temp1[key]))delete temp[key]
    }
    if(typeof(temp.x)=="object"){
        let minxg=Math.min(...temp.x)
        let minyg=Math.min(...temp.y)
        temp.x=temp.x.map(me=>me-minxg)
        temp.y=temp.y.map(me=>me-minyg)
    }else{temp.x=temp.y=0}
    temp.picture=""
    temp.name="my preset "+(presetobj.length-1)
    console.log(temp)
    presetobj.push(temp)
    addtobuildmenu(presetobj.length-1)
}
function dragspawn(event){
    let me=JSON.parse(event.dataTransfer.getData("text"))
    if(typeof(me.x)=="object"){
        for(let i in me.x){
            me.x[i]+=Math.round((event.x-me.w/2+rofx)/zoomn)
            me.y[i]+=Math.round((event.y-me.h/2+rofy)/zoomn)
        }
    }else{
        me.x+=Math.round((event.x-me.w/2+rofx)/zoomn)
        me.y+=Math.round((event.y-me.h/2+rofy)/zoomn)
    }
    //achtung bei obj mit mehrere  punkte
    let construcktoarr=me.construckarr
    let construckt=me.construck
    delete me.name
    delete me.construckarr
    delete me.picture
    delete me.construck
    new (createobj[construckt])(window[construcktoarr],me.x,me.y,me.w,me.h,me)
    let meo=window[construcktoarr][loadmap][window[construcktoarr].length-1]
    if(renderer==3)updatescene=true
    if(renderer==0&&meo.static)renderbackground=true
    if(typeof(colorobj)=="undefined"){if(typeof(meo.fillbackup)!="undefined")meo.fill=meo.fillbackup}
    else if(Object.getOwnPropertyNames(colorobj).includes(meo.fill))colorobj[meo.fill](meo.x,meo.y,meo,meo.w,meo.h)
    meo.shadow=[]
    mesureminmax(meo)
    collisionmap(false,true)
}
async function build(){
    for (let me of [...myRect[loadmap],...mySun[loadmap],...myFire[loadmap]]) {mesureminmax(me)}
    await collisionmap(true,true)
    canvas.addEventListener('drop',dragspawn);
    canvas.addEventListener('dragover',me=>me.preventDefault());
    let mdiv=document.createElement("DIV")
    //mdiv.addEventListener('drop',dragspawn);
    mdiv.addEventListener('dragover',me=>me.preventDefault());
    mdiv.id="buildmenu"
    mdiv.onmouseover=()=>disableszoom+=1
    mdiv.onmouseout=()=>disableszoom-=1
    document.body.appendChild(mdiv)
    for (let i in presetobj)addtobuildmenu(i)
    window.requestAnimationFrame(ani1)
}
function stopbuildf(){
    canvas.style.cursor = "pointer";
    canvas.removeEventListener('drop',dragspawn);
    canvas.removeEventListener('dragover',me=>me.preventDefault());
    const myNode = document.getElementById("buildmenu");
    while (myNode.firstChild) {myNode.removeChild(myNode.firstChild);}
    myNode.remove()
    const myNode1 = document.getElementById("optionmenu");
    if(myNode1!==null){
        while (myNode1.firstChild) {myNode1.removeChild(myNode1.firstChild);}
        myNode1.remove()
    }
}
function ani1(time1){
    fps=Math.max(1/((time1-timeo)/1e3),0)
    if(debug)debugtext+="\nfps "+fps+
    "\nfocused "+focused+
    "\ndirectionx "+directionx+
    "\ndirectiony "+directiony+
    "\nwhatmenu "+whatmenu+
    "\nmousex "+mousex+
    "\nmousey "+mousey+
    "\nmousexc "+mousexc+
    "\nmouseyc "+mouseyc+
    "\ndoublecklick "+doublecklick+
    "\nclickedonobj "+clickedonobj+
    "\nfocusedobj "+focusedobj+
    "\nmovebuild "+movebuild+
    "\nresizebuild "+resizebuild+
    "\nbuildscale "+buildscale+
    "\nrofx "+rofx+
    "\nrofy "+rofy

    //esc
    if (keys.getkeyovermin(27)){
        stopbuildf()
        stopbuild=false;
        debug=false
        mvis()
    }
    //keysteuerung
    if (keys.getkeyovermin(87))directiony+=keys.getmapkey(87)/10
    if (keys.getkeyovermin(83))directiony-=keys.getmapkey(83)/10
    if (keys.getkeyovermin(65))directionx-=keys.getmapkey(65)/10
    if (keys.getkeyovermin(68))directionx+=keys.getmapkey(68)/10
    if(keys.keytoggle(306)){
        whatmenu^=1;
        directionx=0
        directiony=0
    }

    //controllersteuerung menü
    let objfoc=[...document.querySelectorAll(whatmenu?"#buildmenu button":"#optionmenu div :not(br):not(span), button")]
    if(objfoc.length!=0){
        let ind=objfoc.findIndex(me=>me===document.activeElement)
        if(ind<0)ind=0
        if(!whatmenu&&directiony<=-1){ind++;directiony=0}
        if(!whatmenu&&directiony>=1){ind--;directiony=0}
        if(whatmenu&&directionx<=-1){ind++;directionx=0}
        if(whatmenu&&directionx>=1){ind--;directionx=0}
        if(ind<0)ind+=objfoc.length
        if(ind>=objfoc.length)ind-=objfoc.length
        if(keys.keytoggle(82))objfoc[ind].click()
        try{objfoc[ind].focus()}catch{}
    }


    //mache screen bewegen
    if(focused&&clickedonobj!=undefined){
        //wen obj gefocust wurde
        rofx-=(rofx-(((typeof(clickedonobj.x)=="object")?clickedonobj.x.reduce((a,b)=>a+b)/zoomn/clickedonobj.x.length:clickedonobj.x/zoomn+clickedonobj.w/zoomn/2)-canvas.width/   2))/20
        rofy-=(rofy-(((typeof(clickedonobj.y)=="object")?clickedonobj.y.reduce((a,b)=>a+b)/zoomn/clickedonobj.y.length:clickedonobj.y/zoomn+clickedonobj.h/zoomn/2)-canvas. height/2))/20
        if(renderer==0)renderbackground=true
    }else if(mousex!==null||mousey!==null){
        //wen ich an want klicke
        rofx-=Math.max(menuboarder-mousex,0)
        rofx+=Math.max(menuboarder-(canvas.width*zoomn-mousex),0)
        rofy-=Math.max(menuboarder-mousey,0)
        rofy+=Math.max(menuboarder-(document.getElementById("buildmenu").offsetTop*zoomn-mousey),0)
        if(renderer==0)renderbackground=true
    }
    
    if(!whatmenu&&directionx>=1){
        let obj=([...myRect[loadmap],...mySun[loadmap],...myFire[loadmap]].map(i=>[(typeof(i.x)=="object")?i.x.reduce((a,b)=>a+b)/i.x.length:i.x+i.w/2,i])).sort((a,b)=>a[0]-b[0])
        let objnum=obj.findIndex(i=>i[1]==clickedonobj)
        focusedobj=clickedonobj=obj[objnum+1>=obj.length?0:objnum+1][1]
        directionx=0
        focused=true
        doublecklick=2
        const myNode1 = document.getElementById("optionmenu");
        if(myNode1!=null){
            while (myNode1.firstChild) {myNode1.removeChild(myNode1.firstChild);}
            myNode1.remove()
        }
        spawnmenü(obj[objnum+1>=obj.length?0:objnum+1][1])
    }
    if(!whatmenu&&directionx<=-1){
        let obj=([...myRect[loadmap],...mySun[loadmap],...myFire[loadmap]].map(i=>[(typeof(i.x)=="object")?i.x.reduce((a,b)=>a+b)/i.x.length:i.x+i.w/2,i])).sort((a,b)=>a[0]-b[0])
        let objnum=obj.findIndex(i=>i[1]==clickedonobj)
        focusedobj=clickedonobj=obj[objnum-1<=0?obj.length-1:objnum-1][1]
        directionx=0
        focused=true
        doublecklick=2
        const myNode1 = document.getElementById("optionmenu");
        if(myNode1!=null){
            while (myNode1.firstChild) {myNode1.removeChild(myNode1.firstChild);}
            myNode1.remove()
        }
        spawnmenü(obj[objnum-1<=0?obj.length-1:objnum-1][1])
    }

    let clicked=0
    if(mousex!=null&&mousey!=null)clicked=objcolmap[Math.trunc(mousey+rofy*zoomn-miny)*(maxx-minx)+Math.trunc(mousex+rofx*zoomn-minx)]
    if(clicked==undefined)clicked=0
    if(clicked!=0)clickedonobj=colobjarr[clicked-1]
    if(!focused&&clicked!=0)focusedobj=clickedonobj
    debugtext+="\nclicked "+clicked
    
    if(!focused&&clicked!=0){
        spawnmenü(clickedonobj)
        doublecklick=1
        focused=true
    }
    if(mousex!=null&&mousey!=null&&((focusedobj!=clickedonobj&&!resizebuild&&focused)||(clicked==0&&doublecklick==2))){
        if(Array.isArray(backupmove))(typeof(focusedobj.wasserphysa)=="object")?[focusedobj.x,focusedobj.y,focusedobj.w,focusedobj.h,focusedobj.wasserphysa]:[focusedobj.x,focusedobj.y,focusedobj.w,focusedobj.h]=backupmove
        backupmove=null
        focusedobj=null
        clickedonobj=null
        focused=false
        doublecklick=0
        const myNode1 = document.getElementById("optionmenu");
        if(myNode1!=null){
            while (myNode1.firstChild) {myNode1.removeChild(myNode1.firstChild);}
            myNode1.remove()
        }
    }
    if(!focused){
        doublecklick=0
    }
    if(doublecklick==1&&(mousex==null&&mousey==null))doublecklick=2
    if(doublecklick==2&&(mousex!=null&&mousey!=null)){
        if(focusedobj==clickedonobj){
            backupmove=(typeof(focusedobj.wasserphysa)=="object")?[focusedobj.x,focusedobj.y,focusedobj.w,focusedobj.h,[...focusedobj.wasserphysa]]:[focusedobj.x,focusedobj.y,focusedobj.w,focusedobj.h]
            buildscale=wantscale(clickedonobj,mousexc+rofx*zoomn,mouseyc+rofy*zoomn)
            if(buildscale!=false){
                resizebuild=true
                doublecklick=3
                movedcordx=mousex
                movedcordy=mousey
            }else{
                movebuild=true
                doublecklick=3
                movedcordx=mousex
                movedcordy=mousey
            }
        }else{
            focusedobj=null
            clickedonobj=null
            focused=false
            doublecklick=0
        }
    }
    if(doublecklick==3){
        if(resizebuild)resizeobj(focusedobj,buildscale.between,buildscale.winkelt)
        if(movebuild)moveobj(focusedobj)
        movedcordx=mousexc
        movedcordy=mouseyc
    }
    if(resizebuild&&doublecklick==3&&(mousex==null&&mousey==null)){
        resizebuild=false
        doublecklick=2
        collisionmap(false,true)
        resizetextur(focusedobj)
    }
    if(movebuild&&doublecklick==3&&(mousex==null&&mousey==null)){
        movebuild=false
        doublecklick=2
        collisionmap(false,true)
    }
    if(doublecklick<3)canvas.style.cursor = "default";
    if(doublecklick==0&&objcolmap[Math.trunc(mouseyc+rofy*zoomn-miny)*(maxx-minx)+Math.trunc(mousexc+rofx*zoomn-minx)]>0)canvas.style.cursor="pointer"
    if(doublecklick==2&&focusedobj==colobjarr[objcolmap[Math.trunc(mouseyc+rofy*zoomn-miny)*(maxx-minx)+Math.trunc(mousexc+rofx*zoomn-minx)]-1]){
        let wantscalevar=wantscale(focusedobj,mousexc+rofx*zoomn,mouseyc+rofy*zoomn)
        if(wantscalevar==false){
            canvas.style.cursor="move"
        }else{
            switch (Math.round(wantscalevar.winkel/(Math.PI/4))+2) {
                case 0:
                case 4:
                    canvas.style.cursor="ns-resize"
                break;
                case 2:
                case 6:
                    canvas.style.cursor="ew-resize"
                break;
                case 1:
                case 5:
                    canvas.style.cursor="nwse-resize"
                break;
                case 3:
                case 7:
                    canvas.style.cursor="nesw-resize"
                break;
            }
        }
    }

    const x=rofx+offcamx
    const y=rofy+offcamy
    if(renderer==0){
        hadrenderbackground=false
        if(renderbackground||oldxcam!=x||oldycam!=y)repaintb(suppixel?x:Math.trunc(x),suppixel?y:Math.trunc(y))
    }
    repaint(x,y)
    oldxcam=x
    oldycam=y
    timeo=time1
    if (stopbuild){window.requestAnimationFrame(ani1)}
    if(debugcolmap||cleardebugcolmap||debug)debugcol()
}
//eingabe 
function moveobj(i){
    if(typeof(i.x)=="object"){
        for(let x of i.x)x+=(mousexc-movedcordx)
        for(let y of i.y)y+=(mouseyc-movedcordy)
    }else{
        i.x+=(mousexc-movedcordx)
        i.y+=(mouseyc-movedcordy)
    }
    if(i.static&&renderer==0)renderbackground=true
    if(renderer)updatescene=true
}
function resizeobj(i,between,winkelt){
    if(typeof(i.x)=="object"){
        i.x[between[0]]+=(mousexc-movedcordx)*Math.abs(Math.cos(winkelt))
        i.y[between[0]]+=(mouseyc-movedcordy)*Math.abs(Math.sin(winkelt))
        i.x[between[1]]+=(mousexc-movedcordx)*Math.abs(Math.cos(winkelt))
        i.y[between[1]]+=(mouseyc-movedcordy)*Math.abs(Math.sin(winkelt))
        i.w=Math.max(...i.x)-Math.min(...i.x)
        i.h=Math.max(...i.y)-Math.min(...i.y)
    }else{
        if(between[0]==0){
            i.y+=mouseyc-movedcordy
            i.h=Math.max(i.h-mouseyc+movedcordy,1)
        }
        if(between[0]==1){
            i.w=Math.max(i.w+mousexc-movedcordx,1)
        }
        if(between[0]==2){
            i.h=Math.max(i.h+mouseyc-movedcordy,1)
        }
        if(between[0]==3){
            i.x+=mousexc-movedcordx
            i.w=Math.max(i.w-mousexc+movedcordx,1)
        }
    }
    if(i.static&&renderer==0)renderbackground=true
    if(renderer)updatescene=true
}
/**@return {boolean|{clickx:number,clicky:number,between:[number,number],winkel:number}} wantscale */
function wantscale(i,x,y){
    let ele=[]
    if(typeof(i.x)=="object"){
        for (let i1=0;i1<i.x.length;i1++)ele[i1]=[i.x[i1],i.y[i1]]
    }else{
        ele=[
            [i.x,i.y],
            [i.x+i.w,i.y],
            [i.x+i.w,i.y+i.h],
            [i.x,i.y+i.h]]
    }
    let mindist=Infinity
    let distxy=false
    for(let i1=0,i2=1;i1<ele.length;i1++,i2=(i1+1)%ele.length){
        const x1=ele[i1][0]
        const y1=ele[i1][1]
        const x2=ele[i2][0]
        const y2=ele[i2][1]
        const A=x-x1;
        const B=y-y1;
        const C=x2-x1;
        const D=y2-y1;
        const dot=A*C+B*D;
        const len_sq=C*C+D*D;
        let param=-1;
        if (len_sq!=0)param=dot/len_sq;
        let xx, yy;
        if (param<0) {
            xx=x1
            yy=y1
        }else if (param>1) {
            xx=x2
            yy=y2
        }else {
            xx=x1+param*C;
            yy=y1+param*D;
        }
        const dx=x-xx
        const dy=y-yy
        if(mindist>Math.sqrt(dx*dx+dy*dy)&&Math.sqrt(dx*dx+dy*dy)<buildmodusresizeborder){
            mindist=Math.sqrt(dx*dx+dy*dy)
            let winkelt=Math.atan2(x1-x2,y1-y2)
            distxy={clickx:xx,clicky:yy,between:[i1,i2],winkel:winkelt}
        }
    }
    return distxy
}
function spawnmenü(i){
    let textarea=[]
    let mdiv=document.createElement("DIV")
    mdiv.id="optionmenu"
    mdiv.style.overflowX="none"
    mdiv.style.borderLeft="1px solid gray"
    mdiv.onmouseover=()=>disableszoom+=1
    mdiv.onmouseout=()=>disableszoom-=1
    for (let mek of Object.keys(i)) {
        if(Object.values(createobj[i.construck].notdisplay).includes(mek))continue
        let div=document.createElement("DIV")
        div.style.textAlign="center"
        let span=document.createElement("SPAN")
        span.innerText=mek
        let inptype=Array.isArray(createobj[i.construck].type[mek])?createobj[i.construck].type[mek][1]:createobj[i.construck].type[mek]||"error"
        let input
        if(inptype.match("object")){
            input=document.createElement("TEXTAREA")
            input.value=JSON.stringify(i[mek], null, 1)
            input.style.resize="none";
            input.style.overflowY="visible";
            input.style.spellcheck="false"
            input.style.whiteSpace="nowrap"
            textarea.push(input)
            input.onclick=event=>{
                event.target.style.height=0;
                event.target.style.height=event.target.scrollHeight+"px";
                const backup=i[mek]
                try{
                    i[mek]=JSON.parse(event.target.value)
                }catch{console.log("parse error")}
                if(!checkprop(i))i[mek]=backup
                resizetextur(i)
            }
        }
        else if(inptype.match("number")){
            input=document.createElement("INPUT")
            input.type="text"
            input.pattern="[0-9.]+"
            input.value=i[mek]
            input.onclick=event=>{
                const backup=i[mek]
                try{
                    i[mek]=Number.parseInt(event.target.value)
                }catch{console.log("parse error")}
                if(!checkprop(i))i[mek]=backup
                resizetextur(i)
            }
        }
        else if(inptype.match("boolean")){
            input=document.createElement("BUTTON")
            input.type="button"
            input.value=i[mek]
            input.textContent=tooltips[i[mek]]
            input.style.paddingLeft="0"
            input.style.textAlign="left"
            input.onclick=event=>{
                event.target.value=event.target.value=="true"?false:true
                console.log(event)
                const backup=i[mek]
                i[mek]=event.target.value=="true"?true:false
                if(!checkprop(i))i[mek]=backup
                event.target.textContent=tooltips[i[mek]]
                resizetextur(i)
            }
        }
        else if(inptype.match("string")){
            input=document.createElement("INPUT")
            input.type="text"
            input.value=i[mek]
            input.onclick=event=>{
                const backup=i[mek]
                i[mek]=event.target.value
                if(!checkprop(i))i[mek]=backup
                if(mek=="fillstr")i.fill=i.fillstr
                resizetextur(i)
            }
        }
        else{
            console.log("type not found: "+mek)
            continue
        }
        if(createobj[i.construck].tooltip.hasOwnProperty(mek))div.title=createobj[i.construck].tooltip[mek]
        input.style.width="100%";
        input.style.width="-moz-available";
        input.style.width="-webkit-fill-available";
        input.style.width="fill-available";
        div.appendChild(span)
        div.appendChild(document.createElement("BR"))
        div.appendChild(input)
        mdiv.appendChild(div)
    }
    if(typeof(colorobj)!="undefined"&&Object.getOwnPropertyNames(colorobj).includes(i.fillstr)){
        let texturgen=document.createElement("BUTTON")
        texturgen.onclick=event=>{
            colorobj[i.fillstr](i.x,i.y,i,i.w,i.h,false,false)
            if(renderer==3)updatescene=true
            if(renderer==0&&i.static)renderbackground=true
        }
        texturgen.textContent="new gen textur"
        mdiv.appendChild(texturgen)
    }
    let saveto=document.createElement("BUTTON")
    saveto.onclick=event=>{savetopreset(event,i)}
    saveto.textContent="save to preset"
    let removeobj=document.createElement("BUTTON")
    removeobj.onclick=event=>{
        window[i.construckarr][loadmap].splice(window[i.construckarr][loadmap].findIndex(it=>it==i),1)//hä
    }
    removeobj.textContent="remove"
    mdiv.appendChild(saveto)
    mdiv.appendChild(removeobj)
    document.body.appendChild(mdiv)
    for(let area of textarea){area.style.height=0;area.style.height=area.scrollHeight+"px";}
}

presetobj.push({name:"Grass",picture:"",construck:"Grass",construckarr:"myRect",x:0,y:0,w:10,h:10})
presetobj.push({name:"Wasser",picture:"",construck:"Wasser",construckarr:"myRect",x:0,y:0,w:100,h:100})
presetobj.push({name:"Player",picture:"",construck:"Player",construckarr:"myRect",x:0,y:0,w:25,h:25})
presetobj.push({name:"Shape",picture:"",construck:"Shape",construckarr:"myRect",x:0,y:0,w:25,h:25})
presetobj.push({name:"Shape dest",picture:"",construck:"Shape",construckarr:"myRect",x:0,y:0,w:25,h:25,fill:"gray",dest:true})
presetobj.push({name:"Pipe",picture:"",construck:"Pipe",construckarr:"myRect",x:0,y:0,w:25,h:25})
presetobj.push({name:"Questionblock",picture:"",construck:"Questionblock",construckarr:"myRect",x:0,y:0,w:25,h:25})
presetobj.push({name:"Specialblock move",picture:"",construck:"Specialblock",construckarr:"myRect",x:0,y:0,w:25,h:25,type:"movingblock",option:[0,0,10,10]})
presetobj.push({name:"Specialblock break",picture:"",construck:"Specialblock",construckarr:"myRect",x:0,y:0,w:25,h:25,type:"breakingblock",option:[10,10]})
presetobj.push({name:"Finish",picture:"",construck:"Finish",construckarr:"myRect",x:0,y:0,w:25,h:25})
presetobj.push({name:"Waypoint",picture:"",construck:"Shape",construckarr:"myRect",x:0,y:0,w:25,h:25,type:"waypoint"})

promallres[5]()