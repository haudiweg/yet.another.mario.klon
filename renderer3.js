function webglstart(i){
    //net immer neu compile 
    //dynamisch neues hinzufügen lassen
    createshader(i,0,webgl2?"defaultwebgl2":"default")

    if(webgl2){
        WEBGLmultidraw=gl.getExtension("WEBGL_multi_draw")
        WEBGLdisjointtimer=gl.getExtension('EXT_disjoint_timer_query_webgl2');

        createshader(i,1,"grass",true)
        transformFeedback[i+0] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i+0])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[1], ['aVelo1','aWind1','aWindrandtimer1'], window[ctxarr[i]].SEPARATE_ATTRIBS)



        createshader(i,2,"particle",true)
        transformFeedback[i+1] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i+1])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[2], ['aVelop1','aPosp1','aLivep1'], window[ctxarr[i]].SEPARATE_ATTRIBS)


        createshader(i,3,"shadow",true)
        transformFeedback[i+2] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i+2])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[3], ['aColorsun1'], window[ctxarr[i]].SEPARATE_ATTRIBS)
        //reinfolge fixen


        createshader(i,4,"shadowdraw")

        createshader(i,5,"shadowminmax")
        transformFeedback[i+5] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i+5])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[5], ['minmaxinslight1'], window[ctxarr[i]].SEPARATE_ATTRIBS)

        createshader(i,6,"shadowkante")
        transformFeedback[i+6] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i+6])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[6], ['aKante'], window[ctxarr[i]].SEPARATE_ATTRIBS)


        createshader(i,7,"sunrender")
        transformFeedback[i+7] = window[ctxarr[i]].createTransformFeedback()
        window[ctxarr[i]].bindTransformFeedback(window[ctxarr[i]].TRANSFORM_FEEDBACK, transformFeedback[i+7])
        window[ctxarr[i]].transformFeedbackVaryings(shaderProgram[7], ['asunarr1'], window[ctxarr[i]].SEPARATE_ATTRIBS)

    }else{
        WEBGLoes=gl.getExtension("OES_vertex_array_object");
    }

    for(let i1 in shaderProgram){
        window[ctxarr[i]].linkProgram(shaderProgram[i1])
        if (!webglstartdisablechecks&&!window[ctxarr[i]].getProgramParameter(shaderProgram[i1], window[ctxarr[i]].LINK_STATUS)) {
            console.log("Error linking shaders:" +i1+" "+ window[ctxarr[i]].getProgramInfoLog(shaderProgram[i1]));
        }
    }

    //window[ctxarr[i]].blendFunc(window[ctxarr[i]].SRC_ALPHA, window[ctxarr[i]].ONE_MINUS_SRC_ALPHA);
    //window[ctxarr[i]].enable(window[ctxarr[i]].BLEND)

    new webglbuffer.creategroup({name:"obj",shader:shaderProgram[0]})
    new webglbuffer.createbuffer("obj",{buffername:"coordinates"})
    new webglbuffer.createuniform("obj","canvashwwebgl")
    new webglbuffer.createuniform("obj","offsgl")
    new webglbuffer.createuniform("obj","translation")
    new webglbuffer.createuniform("obj","aColor")
    new webglbuffer.createuniform("obj","aPicture")
    new webglbuffer.createuniform("obj","uSampler")
    new webglbuffer.createuniform("obj","blur")
    new webglbuffer.createuniform("obj","blurcolor")
    new webglbuffer.createuniform("obj","wh")
    new webglbuffer.addvaotogroup("obj")
    if(webgl2){
        if(webglgrassani){
            new webglbuffer.creategroup({name:"grass",shader:shaderProgram[1]})
            new webglbuffer.createbuffer("grass",{buffername:"coordinates1"})
            new webglbuffer.createbuffer("grass",{buffername:"grasscolor",bufferlength:4})
            new webglbuffer.createbuffer("grass",{buffername:"grassnum",bufferlength:1})
            new webglbuffer.createbuffer("grass",{buffername:"grassrotation",bufferlength:1})
            new webglbuffer.createbuffer("grass",{buffername:"aWindopt",bufferlength:3})
            new webglbuffer.createbuffer("grass",{buffername:"grassstartcord"})

            new webglbuffer.createfeedbackbuffer("grass",{buffername:"aVelo"})
            new webglbuffer.createfeedbackbuffer("grass",{buffername:"aWind"})
            new webglbuffer.createfeedbackbuffer("grass",{buffername:"aWindrandtimer",bufferlength:4})


            new webglbuffer.createuniform("grass","canvashwwebgl")
            new webglbuffer.createuniform("grass","offsgl")
            new webglbuffer.createuniform("grass","rendermode")
            new webglbuffer.createuniform("grass","fps")
            new webglbuffer.createuniform("grass","globalwind")
            new webglbuffer.createuniform("grass","objectspos")
            new webglbuffer.createuniform("grass","objectsvel")
            new webglbuffer.createuniform("grass","objectslength")
            new webglbuffer.createuniform("grass","rassenpos")
            new webglbuffer.createuniform("grass","rassenlength")
            new webglbuffer.addvaotogroup("grass")
        }




        if(enableparticle){
            new webglbuffer.creategroup({name:"break",shader:shaderProgram[2]})
            new webglbuffer.createbuffer("break",{buffername:"gravi"})
            new webglbuffer.createbuffer("break",{buffername:"color",bufferlength:4})
            
            new webglbuffer.createfeedbackbuffer("break",{buffername:"aVelop"})
            new webglbuffer.createfeedbackbuffer("break",{buffername:"aPosp"})
            new webglbuffer.createfeedbackbuffer("break",{buffername:"aLivep"})
            
            
            new webglbuffer.createuniform("break","canvashwwebgl")
            new webglbuffer.createuniform("break","offsgl")
            new webglbuffer.createuniform("break","fps")
            new webglbuffer.createuniform("break","globalwind")
            new webglbuffer.createuniform("break","minmax")
            new webglbuffer.addvaotogroup("break")
        }


        if(webglshadowsallowed){
            new webglbuffer.creategroup({name:"rays",shader:shaderProgram[3]})
            new webglbuffer.createbuffer("rays",{buffername:"coordinates2"})
            new webglbuffer.createbuffer("rays",{buffername:"aKante",bufferlength:1})

            new webglbuffer.createfeedbackbuffer("rays",{buffername:"aColorsun",bufferlength:4})

            new webglbuffer.createuniform("rays","minmax")
            new webglbuffer.createuniform("rays","suntexture")
            new webglbuffer.createuniform("rays","colltexture")
            new webglbuffer.createuniform("rays","num")
            new webglbuffer.createuniform("rays","rayres")
            new webglbuffer.createuniform("rays","shadowhighquali")
            new webglbuffer.addvaotogroup("rays")


            new webglbuffer.creategroup({name:"raydraw",shader:shaderProgram[4]})
            new webglbuffer.createbuffer("raydraw",{buffername:"coordinates3"})
            new webglbuffer.createbuffer("raydraw",{buffername:"aTexCoord"})

            new webglbuffer.createuniform("raydraw","backtexture")
            new webglbuffer.createuniform("raydraw","canvashwwebgl")
            new webglbuffer.createuniform("raydraw","offsgl")
            new webglbuffer.createuniform("raydraw","minmax")
            new webglbuffer.createuniform("raydraw","uSampler")
            new webglbuffer.createuniform("raydraw","shadowdrawmode")
            new webglbuffer.createuniform("raydraw","rayminmaxavg")
            new webglbuffer.createuniform("raydraw","light")
            new webglbuffer.addvaotogroup("raydraw")



            //option das mehrere obj kleichen buffer nehmen und net unterschedliche


            new webglbuffer.creategroup({name:"raykante",shader:shaderProgram[6]})
            new webglbuffer.createbuffer("raykante",{buffername:"coordinates5",buffer:webglbuffers.rays.buffer.coordinates2.buffer})

            new webglbuffer.createuniform("raykante","minmax")
            new webglbuffer.createuniform("raykante","colltexture")
            new webglbuffer.addvaotogroup("raykante")


            new webglbuffer.creategroup({name:"rayminmax",shader:shaderProgram[5],buffersize:10})
            new webglbuffer.createbuffer("rayminmax",{buffername:"coordinates4"})

            new webglbuffer.createfeedbackbuffer("rayminmax",{buffername:"minmaxinslight",bufferlength:3,noin:true})//make buffersize to 1

            new webglbuffer.createuniform("rayminmax","raywh")
            new webglbuffer.createuniform("rayminmax","uSampler")
            new webglbuffer.addvaotogroup("rayminmax")


            new webglbuffer.creategroup({name:"raysunrender",shader:shaderProgram[7]})
            new webglbuffer.createbuffer("raysunrender",{buffername:"coordinates6",buffer:webglbuffers.rays.buffer.coordinates2.buffer})
            new webglbuffer.createbuffer("raysunrender",{buffername:"aKante",bufferlength:1,buffer:webglbuffers.rays.buffer.aKante.buffer})
            new webglbuffer.createfeedbackbuffer("raysunrender",{buffername:"asunarr",bufferlength:4,noin:true})//make buffersize to 1

            new webglbuffer.createuniform("raysunrender","suntexture")
            new webglbuffer.createuniform("raysunrender","shadowtexture")
            new webglbuffer.createuniform("raysunrender","sunorgtexture")
            new webglbuffer.createuniform("raysunrender","minmax")
            new webglbuffer.createuniform("raysunrender","rayminmaxavg")
            new webglbuffer.addvaotogroup("raysunrender")
        }
    }
    if(webgl2&&WEBGLdisjointtimer){
        WEBGLdisjointtimerquery=gl.createQuery()
    }
}
function createshader(canvasref,shaderProgramnum,shadername,mesure=false){
    let vertShader=window[ctxarr[canvasref]].createShader(window[ctxarr[canvasref]].VERTEX_SHADER);
    if(mesure){
        window[ctxarr[canvasref]].shaderSource(vertShader,maxarrinshader(shader[shadername].vs[0],window[ctxarr[canvasref]].getParameter(window[ctxarr[canvasref]].MAX_VERTEX_UNIFORM_VECTORS),shaderProgramnum));
    }else{
        window[ctxarr[canvasref]].shaderSource(vertShader,shader[shadername].vs[0]);
    }
    window[ctxarr[canvasref]].compileShader(vertShader);
    let fragShader=window[ctxarr[canvasref]].createShader(window[ctxarr[canvasref]].FRAGMENT_SHADER);
    window[ctxarr[canvasref]].shaderSource(fragShader, shader[shadername].fs[0]);
    window[ctxarr[canvasref]].compileShader(fragShader);

    if (!webglstartdisablechecks&&!window[ctxarr[canvasref]].getShaderParameter(vertShader,  window[ctxarr[canvasref]].COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " +  window[ctxarr[canvasref]].getShaderInfoLog(vertShader));
    }
    if (!webglstartdisablechecks&&!window[ctxarr[canvasref]].getShaderParameter(fragShader,  window[ctxarr[canvasref]].COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " +  window[ctxarr[canvasref]].getShaderInfoLog(fragShader));
    }

    shaderProgram[shaderProgramnum]=window[ctxarr[canvasref]].createProgram();
    window[ctxarr[canvasref]].attachShader(shaderProgram[shaderProgramnum], vertShader);
    window[ctxarr[canvasref]].attachShader(shaderProgram[shaderProgramnum], fragShader);
}
function maxarrinshader(text,max,shaderProgramnum){
    const regex=/uniform ((vec[2-4])|(mat[2-4])|int|float)/
    let text1=text.split("\n").filter(i1=>regex.test(i1))
    let uniforms=0
    let divider=0
    if(!webglstartdisablechecks){
        console.groupCollapsed("shadercompile("+shaderProgramnum+")")
        console.log(text)
        console.log(text1)
    }
    for(let i1=0;i1<text1.length;i1++){
        let t=text1[i1].match(/(vec[1-4]|int|float)|(\[(?:MAX_NUM_TOTAL_OBJECTS|[0-9]*)\])/g)
        if(!webglstartdisablechecks)console.log(t)
        if(t.length==1){
            if(t[0]=="int")uniforms+=1
            if(t[0]=="float")uniforms+=1
            if(t[0]=="vec2")uniforms+=2
            if(t[0]=="vec3")uniforms+=3
            if(t[0]=="vec4")uniforms+=4
            if(t[0]=="mat2")uniforms+=4
            if(t[0]=="mat3")uniforms+=9
            if(t[0]=="mat4")uniforms+=16
        }else if(t.length==2){
            if(t[1]=="[MAX_NUM_TOTAL_OBJECTS]"){
                if(t[0]=="int")divider+=1
                if(t[0]=="float")divider+=1
                if(t[0]=="vec2")divider+=2
                if(t[0]=="vec3")divider+=3
                if(t[0]=="vec4")divider+=4
                if(t[0]=="mat2")divider+=4
                if(t[0]=="mat3")divider+=9
                if(t[0]=="mat4")divider+=16
            }else{
                if(t[0]=="int")uniforms+=1*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="float")uniforms+=1*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="vec2")uniforms+=2*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="vec3")uniforms+=3*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="vec4")uniforms+=4*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="mat2")uniforms+=4*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="mat3")uniforms+=9*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
                if(t[0]=="mat4")uniforms+=16*Number.parseFloat(t[1].replace(/[^0-9]/g,""))
            }
        }else{
            console.warn("arsing error"+t+" "+text+" "+i1)
        }
    }
    console.groupEnd()
    maxgrassobjects=Math.trunc((max-uniforms)/divider)
    return text.replace(/MAX_NUM_TOTAL_OBJECTS/g,""+maxgrassobjects)
}
async function repaint3(x=0,y=0,time=0){
    //ctx.clear(ctx.DEPTH_BUFFER_BIT | ctx.COLOR_BUFFER_BIT);
    //ctx.clearColor(0.0, 0.0, 0.0, 0.0);
    //ctx.clear(ctx.COLOR_BUFFER_BIT|ctx.DEPTH_BUFFER_BIT);


    if(updatescene||inversekinematicsold!=inversekinematics){//wen spieler was geupdatet werden muss oder game neu gestartet ist draw
        updatescene=false
        updatetextur=true
        if(basicinfo)console.log("updatescene")
        if(webglmultisampling!==1){
            gl.enable(gl.SAMPLE_COVERAGE);
            gl.sampleCoverage(webglmultisampling, true); 
        }else{
            gl.disable(gl.SAMPLE_COVERAGE)
        }
        if(inversekinematicsold!=inversekinematics){
            inversekinematicsold=inversekinematics
            if(typeof(ctxb)!="undefined")ctxb.clearRect(0,0,canvas.width,canvas.height);
        }


        webgldrawarr=[...mySun[loadmap],...myRect[loadmap]].filter(i=>(!webglfallback||!i.equal)&&(!webglfallback||!i.webglcantdraw)&&!(inversekinematics&&promall[3].res&&i.inversekinematics==true)&&!("animation" in i&&playertexturanimation))


        /**@type {number[]} objvertices */
        let objvertices=[]
        objvertecys[0]=[]

        for (let i of webgldrawarr){
            objvertecys[0].push(objvertices.length)
            for (let i1=0;i1<i.x.length;i1++){
                objvertices.push(i.x[i1]-i.minx)
                objvertices.push(i.y[i1]-i.miny)
            }
        }
        objvertecys[0].push(objvertices.length)
        

        webglbuffer.testbufferoverflow("obj",objvertices.length*Float32Array.BYTES_PER_ELEMENT)

        gl.bindBuffer(gl.ARRAY_BUFFER, webglbuffers.obj.buffer.coordinates.buffer);				
        gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(objvertices));

    }
    if(updatetextur){
        gl.activeTexture(gl.TEXTURE0)
        updatetextur=false
        let pics=0
        for (let i of webgldrawarr){
            if("blurcolor" in i){
                let colorctx = new OffscreenCanvas(1,1).getContext('2d');
                colorctx.fillStyle = i.blurcolor;
                colorctx.fillRect(0, 0, 1, 1);
                i.webglblurcolor=colorctx.getImageData(0, 0, 1, 1).data.map(i1=>i1/=255)
            }

            let texturerror=false
            let texturerrorobj=""
            let loadedtexture=false
            if(i.nodraw||i.invisible){
                i.webglfill=[0,0,0,0]
            }else{
                if((Array.isArray(i.fill)||i.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement"))&&i.webglcantdraw!=true){
                    if(typeof(i.texture)=="undefined"||!gl.isTexture(i.texture))i.texture=gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, i.texture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
                    try{
                        if(Array.isArray(i.fill)){
                            //for(let i1 in i.fill)gl.texImage2D(gl.TEXTURE_2D, parseInt(i1), gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, i.fill[i1])
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, i.fill[0])
                            //why does lod dont work
                        }else{
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, i.fill)
                        }
                        loadedtexture=true
                    }catch(e){
                        if(webglfallback){
                            i.webglcantdraw=true
                            updatescene=true
                        }
                        gl.deleteTexture(i.texture)
                        delete i.texture
                        texturerror=true
                        texturerrorobj=
                        "cant load texture"+
                        "\nconstr: "+i.construck+
                        "\nerror: "+e+
                        "\nimg/video: "+(typeof(i.fillvideo)!="undefined"?i.fillvideo:"")+(typeof(i.fillpic)!="undefined"?i.fillpic:"")+
                        (webglfallback?"\nusing canvas for it":"")
                    }
                    gl.bindTexture(gl.TEXTURE_2D, null);
                    pics++
                }
                if(typeof(i.fill)=="string"){
                    let colorctx = new OffscreenCanvas(1,1).getContext('2d');
                    if(Object.keys(colorobj).includes(i.fill)){
                        colorctx.fillStyle = i.fillbackup
                    }else{
                        colorctx.fillStyle = i.fill;
                    }
                    colorctx.fillRect(0, 0, 1, 1);
                    let compcolor=[...colorctx.getImageData(0, 0, 1, 1).data]
                    for (let i1 in compcolor)compcolor[i1]/=255
                    i.webglfill=compcolor
                }else{
                    texturerrorobj="no texture"+i.construck
                    texturerror=true
                }
                if(texturerror){
                    if(!loadedtexture)i.webglcantdrawfillbackup=true//wen schon bild geladen ist ist es net schlim wen man noch default textur nimmt
                    let colorctx = new OffscreenCanvas(1,1).getContext('2d');
                    colorctx.fillStyle = typeof(i.fillbackup)=="string"?i.fillbackup:"black";
                    colorctx.fillRect(0, 0, 1, 1);
                    let compcolor=[...colorctx.getImageData(0, 0, 1, 1).data]
                    for (let i1 in compcolor)compcolor[i1]/=255
                    i.webglfill=compcolor
                    if(!loadedtexture&&basicinfo){
                        console.groupCollapsed("texture webgl info")
                        console.info("texturerror: "+texturerrorobj)
                        console.groupEnd()
                    }
                }
            }
        }
    }

    gl.viewport(0, 0, canvas.width, canvas.height)
    if(grasstogpuwebgl2mode==0&&webgl2&&webglgrassani&&fpsav+10>m4xfps&&fps+10>m4xfps){
        if(updategrass||updatetgrass>updatewebglgrass||(updatetgrass>0&&fpsav+2>m4xfps&&fps+5>m4xfps)){
            grasstogpuwebgl2mode=1
            if('requestIdleCallback' in window){window.requestIdleCallback(grasstogpuwebgl2)}else{grasstogpuwebgl2(false)}
        }
    }
    if(debug)debugtext+="\nwebglgrassquali "+webglgrassquali

    if(WEBGLdisjointtimer){
        if(WEBGLdisjointtimermode==1&&!gl.isQuery(WEBGLdisjointtimerquery)){WEBGLdisjointtimermode=0;console.warn("query error reset mode")}//fallsave wen net resetet worden
        if(WEBGLdisjointtimermode==1&&gl.getQueryParameter(WEBGLdisjointtimerquery, gl.QUERY_RESULT_AVAILABLE)) {
            rendertime=gl.getQueryParameter(WEBGLdisjointtimerquery, gl.QUERY_RESULT)/1000000
            rendertimeavg=rendertimeavg*rendertimeabfac+rendertime*(1-rendertimeabfac)
            WEBGLdisjointtimermode=0
            
        }
        if(WEBGLdisjointtimermode==0)gl.beginQuery(WEBGLdisjointtimer.TIME_ELAPSED_EXT, WEBGLdisjointtimerquery);
    }
    if(debug)debugtext+=""+
        "\nrendertime: "+rendertime.toFixed(5)+
        "\nrendertimeavg: "+rendertimeavg.toFixed(5)+
        "\nhowmutchgrass: "+howmutchgrass+
        "\ngrasstorender: "+grasstorender+
        "\nupdatetgrass: "+updatetgrass+
        "\ngrasstogpuwebgl2mode: "+grasstogpuwebgl2mode+
        "\ngrasslimitact: "+grasslimitact+
        "\nwebglgrasscut: "+webglgrasscut

    if(webglneedtocleareveryframe){
        //gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)//some need to clear every frame
    }
    if(webglshadowsallowed&&rayminmaxavg[1]!=0)webglshadowsdraw(x,y)
    webgldraw(x,y,time)
    if(raydebug&&fps<=50){
        console.log(shadowrendermode+" "+fps)
        console.log(before)
    }
    if(fps>m4xfps-5&&fpsav>m4xfps-5&&webglshadowsallowed&&(shadowfencesync==null||gl.clientWaitSync(shadowfencesync, gl.SYNC_FLUSH_COMMANDS_BIT, 0)==gl.ALREADY_SIGNALED)){
        if(shadowfencesync!=null){
            gl.deleteSync(shadowfencesync);
            shadowfencesync=null
        }
        if(raydebug){
            before.shift()
            before.push(shadowrendermode)
        }
        if(shadowrendermode==51){
            webglshadowaddsunread()
        }else if(shadowrendermode==5){
            webglshadowaddsun()
        }else if(shadowrendermode==4){
            webglshadowsswapbuffers()
        }else if(shadowrendermode==31){
            webglshadowsminmaxread()
        }else if(shadowrendermode==3){
            webglshadowsminmaxcolor()
        }else if(shadowrendermode==21){
            webglshadowsremovetransformread()
        }else if(shadowrendermode==2){
            webglshadowsremovetransform()
        }else if(shadowrendermode==1){
            webglshadowsrender()
        }else if(shadowrendermode==0){
            webglshadowsaddtransform()
        }
    }
    if(webglshadowsallowed&&debug)debugtext+=""+
        "\nwebglshadowseach: "+webglshadowseach+
        "\nwebglshadowsnum: "+webglshadowsnum+
        "\nwebglshadowseachinshader: "+webglshadowseachinshader+
        "\nwebglshadowseachadd: "+webglshadowseachadd+
        "\nshadowupdatecounter: "+Math.trunc(shadowupdatecounter)+
        "\nshadowrendermode: "+shadowrendermode+
        "\nraymin: "+rayminmaxavg[0]+
        "\nraymax: "+rayminmaxavg[1]+
        "\nrayins: "+rayminmaxavg[2]

    if(webgl2&&webglgrassani)grassdrawwebgl2(x,y,time)
    if(webgl2&&enableparticle)objbreakwebgl2(x,y)

    if(WEBGLdisjointtimer&&WEBGLdisjointtimermode==0){
        gl.endQuery(WEBGLdisjointtimer.TIME_ELAPSED_EXT)
        WEBGLdisjointtimermode=1
    }

    if(ctxb!=undefined){
        ctxb.clearRect(0,0,canvas.width,canvas.height)
        if(statscanvas!=undefined)ctxb.drawImage(statscanvas,0,0,statscanvas.width,statscanvas.height)
    }
    if(inversekinematics&&promall[3].res&&webglfallback)canvasdrawbones(ctxb,x,y)
    if(webglfallback)for(let i of [...mySun[loadmap],...myRect[loadmap]])if(("animation" in i&&playertexturanimation&&!(inversekinematics&&promall[3].res&&i.inversekinematics==true))||i.equal||i.webglcantdraw)canvasdrawimage(ctxb,i,x,y)

}
function webgldraw(x=0,y=0,time=0){
    gl.useProgram(shaderProgram[0]);
    webglbuffer.bindvertexarray("obj")
    gl.uniform2f(webglbuffers.obj.uniform.canvashwwebgl,canvas.width,canvas.height);
    gl.uniform4f(webglbuffers.obj.uniform.offsgl,x,y,zoom,zoomn);
    gl.uniform1i(webglbuffers.obj.uniform.uSampler, 0)
    gl.activeTexture(gl.TEXTURE0)
    let i=-1
    let timewebgldraw=performance.now()
    for (let i1 of webgldrawarr){
        i++
        if(i1.nodraw||i1.invisible)continue//wen obj unsichtbar oder net gedrawt werden sol net drawn
        if(objvertecys[0][i+1]-objvertecys[0][i]<=0)continue//wen obj keine vertecys hat net draw
        if(!(rofx*zoomn-20<i1.minx+i1.w&&
            i1.minx/zoomn<rofx+canvas.width+20&&
            rofy*zoomn-20<i1.miny+i1.h&&
            i1.miny/zoomn<rofy+canvas.height+20))continue//wen unsichtbar nicht draw

        if("blur" in i1){
            gl.uniform1f(webglbuffers.obj.uniform.blur,i1.blur)
            if("webglblurcolor" in i1){
                gl.uniform4f(webglbuffers.obj.uniform.blurcolor,...i1.webglblurcolor)
            }else{
                gl.uniform4f(webglbuffers.obj.uniform.blurcolor,-1,-1,-1,-1)
            }
        }else{
            gl.uniform1f(webglbuffers.obj.uniform.blur,0)
        }
        gl.uniform2f(webglbuffers.obj.uniform.wh,i1.w,i1.h)
        if("velo" in i1){
            gl.uniform2f(webglbuffers.obj.uniform.translation,
                i1.minx+(timewebgldraw-i1.lastupdatetime[0])/1000*i1.velo[0]*60,
                i1.miny+(timewebgldraw-i1.lastupdatetime[0])/1000*i1.velo[1]*60,
            );
        }else{
            gl.uniform2f(webglbuffers.obj.uniform.translation,i1.minx,i1.miny);
        }

        gl.uniform1f(webglbuffers.obj.uniform.aPicture, 0);
        if((Array.isArray(i1.fill)||i1.fill.constructor.name.match("OffscreenCanvas|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement"))&&!i1.webglcantdrawfillbackup){
            gl.uniform1f(webglbuffers.obj.uniform.aPicture, 1);
            gl.bindTexture(gl.TEXTURE_2D, i1.texture);
            
            if(((i1.phy==true&&i1.construck=="Wasser")||i1.fill.constructor.name.match("HTMLVideoElement"))&&!i1.webglcantdraw){
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
                
                gl.texSubImage2D(gl.TEXTURE_2D, 0,0,0, gl.RGBA,gl.UNSIGNED_BYTE, i1.fill) 
            }
            
        }else if(Array.isArray(i1.webglfill)){
            gl.uniform4f(webglbuffers.obj.uniform.aColor, ...i1.webglfill);
        }
        gl.drawArrays(gl.TRIANGLE_FAN, objvertecys[0][i]/2, (objvertecys[0][i+1]-objvertecys[0][i])/2)
    }
    if(webgl2){
        gl.bindVertexArray(null)
    }else if(WEBGLoes){
        WEBGLoes.bindVertexArrayOES(null)
    }else{
        gl.bindBuffer(gl.ARRAY_BUFFER,null)
    }
}
promallres[16]()