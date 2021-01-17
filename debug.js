function debugcol() {
    if(!cleardebugcolmap&&renderer!=0&&renderer!=3){
        window.canvasdeb=document.createElement('canvas');
        canvasdeb.id="debug"
        canvasdeb.style.zIndex=-1
        canvasdeb.style.position="absolute"
        canvasdeb.width=canvas.width
        canvasdeb.height=canvas.height
        document.body.appendChild(canvasdeb)
        window.ctxdeb=canvasdeb.getContext("2d")
        canvarr.push("canvasdeb")
        ctxarr.push("ctxdeb")
    }
    if((cleardebugcolmap&&!debugcolmap&&!debug)&&renderer!=0&&renderer!=3){
        canvasdeb.remove()
        cleardebugcolmap=false
        ctxdeb=null
        canvarr=canvarr.filter(i=>i!="canvasdeb")
        ctxarr=ctxarr.filter(i=>i!="ctxdeb")
        return
    }
    let dctx=(renderer==0||renderer==3?ctxb:ctxdeb)
    if(renderer==1||renderer==2)dctx.clearRect(0, 0, canvas.width, canvas.height)
    if(debugcolmap&&typeof(debugcolmode)=="string"){
        if(fpsav>m4xfps-10)debugbuffercountmax++
        if(fpsav<m4xfps-10)debugbuffercountmax-=2
        if(typeof(debugbuffer)!=="object"||debugbuffer.byteLength!=(maxx-minx)*(maxy-miny)*4){
            debugbuffer=new ArrayBuffer((maxx-minx)*(maxy-miny)*4);
            debugbufferu32=new Uint32Array(debugbuffer)
            debugbufferu8c=new Uint8ClampedArray(debugbuffer)
            debugbuffercountx=0
            debugbuffercounty=0
        }
        let i=debugbuffercountmax
        br:while(true){
            while(true){
                i--
                if(i<0)break br
                debugbuffercounty=Math.trunc(Math.max(rofy*zoomn-20-miny,debugbuffercounty))

                if(debugcolmode=="objcolmap"&&objcolmap[(debugbuffercounty-miny)*(maxx-minx)+(debugbuffercountx-minx)])debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]=1790862145
                if(debugcolmode=="objenemymap"&&objenemymap[(debugbuffercounty-miny)*(maxx-minx)+(debugbuffercountx-minx)])debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]=1790862145
                if(debugcolmode=="fishmap"){
                    debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]=Math.trunc((fishmap[(debugbuffercounty-miny)*(maxx-minx)+(debugbuffercountx-minx)]/Number.MAX_SAFE_INTEGER)*256)
                    if(debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]<255)debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]=debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]|0xFF000000
                }
                if(debugcolmode=="debugkanten"&&debugkanten[(debugbuffercounty-miny)*(maxx-minx)+(debugbuffercountx-minx)])debugbufferu32[debugbuffercountx+debugbuffercounty*(maxx-minx)]=1790862145
                if(debugcolmode=="debugsun"){
                    const ins=Math.trunc(maxx/rayres)-Math.trunc(minx/rayres)
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+0]=debugsun[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+0]*256
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+1]=debugsun[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+1]*256
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+2]=debugsun[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+2]*256
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+3]=debugsun[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+3]*128
                }
                if(debugcolmode=="debugshadow"){
                    const ins=Math.trunc(maxx/rayres)-Math.trunc(minx/rayres)
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+0]=debugshadow[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+0]*256
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+1]=debugshadow[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+1]*256
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+2]=debugshadow[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+2]*256
                    debugbufferu8c[(debugbuffercountx+debugbuffercounty*(maxx-minx))*4+3]=debugshadow[(Math.trunc(debugbuffercountx/rayres)+Math.trunc(debugbuffercounty/rayres)*ins)*4+3]*128
                }
                debugbuffercounty++
                debugbuffercounty%=Math.min(maxy-miny,rofy+canvas.height+20-miny)
                if(debugbuffercounty==0)break
            }
            debugbuffercountx++
            debugbuffercountx%=Math.trunc(Math.min(maxx-minx,rofx+canvas.width+20-minx))
            debugbuffercountx=Math.trunc(Math.max(rofx*zoomn-20-minx,debugbuffercountx))
        }
        dctx.putImageData(new ImageData(debugbufferu8c,maxx-minx),minx/zoomn-(rofx+offcamx),miny/zoomn-(rofy+offcamy),0,0,(maxx-minx)/zoomn,(maxy-miny)/zoomn)
    }
    if(debug){
        let lines=debugtext.split('\n');
        dctx.font="20px Arial";
        dctx.fillStyle = "black";
        let maxlengthdebtext=0
        let maxl=15
        for (let i of lines){
            if(!fastmessuretext){
                maxlengthdebtext=Math.max(i.length*11,maxlengthdebtext)
                maxl=20
            }else{
                let metrics=dctx.measureText(i)

                maxlengthdebtext=Math.max(metrics.width,maxlengthdebtext)
                maxl=Math.max(metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent,maxl)
            }
        }
        debtextvariation+=Math.abs(debtextavg-maxlengthdebtext)
        debtextvariation*=debtextabfac
        debtextavg=debtextavg*debtextavgabfac+maxlengthdebtext*(1-debtextavgabfac)
        if(maxlengthdebtext>debtextlength)debtextlength=maxlengthdebtext
        if(maxlengthdebtext<debtextlength)debtextlength-=1/Math.pow(2,debtextvariation)   // oder 1/debtextvariation 
        let height=canvas.height
        let othersite=false
        for (let i=0,i1=0;i<lines.length;i++,i1++){
            let secend=lines[i].substring(lines[i].indexOf(" "))
            let secendwidth=(!fastmessuretext)?secend.length*10.8:dctx.measureText(secend).width

            if(debugbackground){
                dctx.fillStyle = "rgba(255,255,255,0.8)";
                dctx.fillRect(othersite?canvas.width-debtextlength:0,10+(i1-1)*maxl, debtextlength, maxl);
                dctx.fillStyle = "black";
            }

            dctx.fillText(lines[i].substring(0,lines[i].indexOf(" ")),othersite?canvas.width-debtextlength:0,10+i1*maxl)
            if(!fastmessuretext){
                dctx.fillText(secend,(othersite?canvas.width:debtextlength)-secendwidth,10+i1*maxl)
            }else{
                dctx.fillText(secend,(othersite?canvas.width:debtextlength)-secendwidth,10+i1*maxl)
            }
            if(!othersite&&(height-=maxl)<maxl){othersite=true;i1=0}
        }
        debugtext=""
    }
    cleardebugcolmap=true
}
function guistats(){
    if(statscanvas==undefined||statscanvas.constructor!=OffscreenCanvas||statscanvas.width!=canvas.width||statscanvas.height!=30){
        statscanvas=new OffscreenCanvas(canvas.width,30)
    }
    let ctxstats=statscanvas.getContext("2d")
    ctxstats.clearRect(0, 0, statscanvas.width, statscanvas.height);
    ctxstats.textBaseline = "middle";
    //leben(dmg)
    //coins
    //weldnamen

    let livecounter=anime.dmg[0]
    let livefillcounter=0
    let livefillcountermax=3

    if(HerzVollpic==undefined){
        HerzVollpic=new Image()
        HerzVollpic.src="img/Herz/HerzVoll.svg"
        HerzVollpic.onload=()=>{HerzVollpic.finish=true;guistats()}

        HerzHälftepic=new Image()
        HerzHälftepic.src="img/Herz/HerzHälfte.svg"
        HerzHälftepic.onload=()=>{HerzHälftepic.finish=true;guistats()}

        HerzLeerpic=new Image()
        HerzLeerpic.src="img/Herz/HerzLeer.svg"
        HerzLeerpic.onload=()=>{HerzLeerpic.finish=true;guistats()}

        statscoinpic=new Image()
        statscoinpic.src="img/Münze/Münze1.svg"
        statscoinpic.onload=()=>{statscoinpic.finish=true;guistats()}
    }
    //async  load and than save them

    if(HerzLeerpic.finish&&HerzHälftepic.finish&&HerzVollpic.finish){
        while(livecounter>=2){
            livecounter-=2
            ctxstats.drawImage(HerzVollpic,livefillcounter*30,0,30,30);
            livefillcounter++
        }
        if(livecounter==1){
            ctxstats.drawImage(HerzHälftepic,livefillcounter*30,0,30,30);
            livefillcounter++
        }
        while(livefillcounter<livefillcountermax){
            ctxstats.drawImage(HerzLeerpic,livefillcounter*30,0,30,30);
            livefillcounter++
        }
    }

    ctxstats.textAlign="midle";
    ctxstats.fillText(mapinfo[loadmap].mapname, canvas.width/2, 15);

    if(statscoinpic.finish){
        ctxstats.textAlign="end"
        let imgoff=ctxstats.measureText("x"+anime.coins[0]).width
        ctxstats.drawImage(statscoinpic,statscanvas.width-imgoff-30,0,30,30);
        ctxstats.fillText("x"+anime.coins[0], canvas.width, 15);
    }
}

function debugwebworker(workername){
    let site=`
    <!--html-->
    <html>
        <textarea style="width:100%;height:90%"></textarea>
        <br>
        <input style="width:100%;height:10%">
    </html>
    <!--!html-->	
    `
    var channel = new MessageChannel()
    var popupWindow = window.open('','','width=100,height=100');
    popupWindow.document.write(site);
    let input=popupWindow.document.getElementsByTagName("input")[0]
    let output=popupWindow.document.getElementsByTagName("textarea")[0]
    input.addEventListener('keyup',e=>{
        if(e.key==="Enter"){
            channel.port1.postMessage(input.value);
            input.value=""
        }
    })
    closeonclose.push(popupWindow)
    channel.port1.onmessage=e=>output.value+=e.data+"\n"
    workername.postMessage({debugchanel:channel.port2},[channel.port2])
    //postMessage communication with webworker with creating messageChanel and sending back and forth
    //make it as a shell
}
promallres[13]()