const webglbuffer={
    createbuffer:function(groupname,opt){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        this.group=group
        this.buffername="coordinates"
        this.bufferlength=2
        this.divisor=0
        this.drawtype=group.gl.DYNAMIC_DRAW
        this.buffertype=group.gl.ARRAY_BUFFER
        this.numbertype=group.gl.FLOAT
        this.normalized=false
        this.stride=0
        this.offset=0
        webglbuffer.addpro.call(this,opt)
        this.pointer=group.gl.getAttribLocation(group.shader, this.buffername)

        if("buffer" in opt){
            this.buffer=opt.buffer
        }else{//if there is no buffer
            this.buffer=group.gl.createBuffer()
            group.gl.bindBuffer(group.gl.ARRAY_BUFFER,this.buffer);
            group.gl.bufferData(this.buffertype,group.buffersize*Float32Array.BYTES_PER_ELEMENT*this.bufferlength,this.drawtype)
            group.gl.bindBuffer(group.gl.ARRAY_BUFFER,null)
        }

        group.buffer[this.buffername]=this
    },
    createfeedbackbuffer:function(groupname,opt){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        let this0={}
        let this1={}

        this.group=group
        this.buffername="coordinates"
        this.bufferlength=2
        this.divisor=0
        this.drawtype=navigator.userAgent.indexOf("Firefox")!==-1?group.gl.STREAM_READ:group.gl.DYNAMIC_DRAW
        this.buffertype=group.gl.TRANSFORM_FEEDBACK_BUFFER
        this.numbertype=group.gl.FLOAT
        this.normalized=false
        this.stride=0
        this.offset=0
        this.noout=false
        this.noin=false
        webglbuffer.addpro.call(this,opt)
        this.pointer=group.gl.getAttribLocation(group.shader, this.buffername)//man solte jetzt kucken wen da1 in name steht
        if(!("noin" in opt)||!opt.noin){
            webglbuffer.addproall.call(this0,this)
            this0.buffer=group.gl.createBuffer()
            group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,this0.buffer);
            group.gl.bufferData(group.gl.TRANSFORM_FEEDBACK_BUFFER,group.buffersize*Float32Array.BYTES_PER_ELEMENT*this.bufferlength,this.drawtype)
            group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,null)
            group.feedbackbuffer[this.buffername]=this0
        }
        if(!("noout" in opt)||!opt.noout){
            webglbuffer.addproall.call(this1,this)
            this1.buffer=group.gl.createBuffer()
            group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,this1.buffer);
            group.gl.bufferData(group.gl.TRANSFORM_FEEDBACK_BUFFER,group.buffersize*Float32Array.BYTES_PER_ELEMENT*this.bufferlength,this.drawtype)
            group.gl.bindBuffer(group.gl.TRANSFORM_FEEDBACK_BUFFER,null)
            group.feedbackbuffer[this.buffername+"1"]=this1
        }
    },
    creategroup:function(opt){
        this.name="newBuffer"
        if(typeof(opt.name)=="string")this.name=opt.name
        this.gl=ctx
        this.shader=shaderProgram[0]
        this.buffersize=500//500000
        webglbuffer.addpro.call(this,opt)
        webglbuffers[this.name]=this
        webglbuffers[this.name].buffer={}
        webglbuffers[this.name].feedbackbuffer={}
        webglbuffers[this.name].uniform={}
        webglbuffers[this.name].framebuffer={}
        webglbuffers[this.name].renderbuffer={}
    },
    createuniform:function(groupname,name){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        group.uniform[name]=group.gl.getUniformLocation(group.shader,name)
    },
    createframebuffer:function(groupname,name){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        group.framebuffer[name]=group.gl.createFramebuffer()
    },
    createrenderbuffer:function(groupname,name){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        group.renderbuffer[name]=group.gl.createRenderbuffer()
    },

    addvaotogroup:function(groupname){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        for(let i of Object.keys(group.buffer)){
            group.gl.bindBuffer(group.gl.ARRAY_BUFFER,group.buffer[i].buffer);
            group.gl.bufferData(group.buffer[i].buffertype,group.buffersize*Float32Array.BYTES_PER_ELEMENT*group.buffer[i].bufferlength,group.buffer[i].drawtype)
        }
        if(webgl2){
            group.vao=group.gl.createVertexArray();
            group.gl.bindVertexArray(group.vao)
        }else if(WEBGLoes){
            group.vao=WEBGLoes.createVertexArrayOES();
            WEBGLoes.bindVertexArrayOES(group.vao)
        }else{
            console.log("novao")
            return
        }
        for(let i of Object.keys(group.buffer)){
            group.gl.bindBuffer(group.gl.ARRAY_BUFFER,group.buffer[i].buffer);
            group.gl.enableVertexAttribArray(group.buffer[i].pointer)
            group.gl.vertexAttribPointer(group.buffer[i].pointer,group.buffer[i].bufferlength,group.buffer[i].numbertype,group.buffer[i].normalized,group.buffer[i].stride,group.buffer[i].offset);
        }
        for(let i of Object.keys(group.feedbackbuffer)){
            if(!group.feedbackbuffer[i].noin)group.gl.enableVertexAttribArray(group.feedbackbuffer[i].pointer)
        }
        if(webgl2){
            group.gl.bindVertexArray(null)
        }else if(WEBGLoes){
            WEBGLoes.bindVertexArrayOES(null)
        }
    },
    bindvertexarray:function(groupname){
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
        if(webgl2){
            group.gl.bindVertexArray(group.vao)
        }else if(WEBGLoes){
            WEBGLoes.bindVertexArrayOES(group.vao)
        }else{
            for(let i of Object.keys(group.buffer)){
                group.gl.bindBuffer(group.gl.ARRAY_BUFFER,group.buffer[i].buffer);
                group.gl.enableVertexAttribArray(group.buffer[i].pointer)
                group.gl.vertexAttribPointer(group.buffer[i].pointer,group.buffer[i].bufferlength,group.buffer[i].numbertype,group.buffer[i].normalized,group.buffer[i].stride,group.buffer[i].offset);
            }
        }
    },
    bindandpointbuffer:function(obj){
        obj.group.gl.bindBuffer(obj.buffertype,obj.buffer)
        obj.group.gl.vertexAttribPointer(obj.pointer,obj.bufferlength,obj.numbertype,obj.normalized,obj.stride,obj.offset);
    },
    addproall:function(opt){
        for(let i of Object.keys(opt)){
            if(!this.hasOwnProperty(i))this[i]=opt[i]
        }
    },
    addpro:function(opt){
        for(let i of Object.keys(this)){
            if(opt.hasOwnProperty(i))this[i]=opt[i]
        }
    },
    testbufferoverflow:function(groupname,objlength){
        //suche welche buffer enabled sind
        let group
        if(webglbuffers.hasOwnProperty(groupname))group=webglbuffers[groupname]
        if(group==undefined){console.warn("nogroup");return}
    
        if(group.buffersize<objlength*Float32Array.BYTES_PER_ELEMENT+100){//||group.buffersize>objlength*Float32Array.BYTES_PER_ELEMENT+400
            const buffersizeold=group.buffersize
            let multi=Math.pow(10,(Math.log(objlength*Float32Array.BYTES_PER_ELEMENT)*Math.LOG10E+1|0)-1)
            if(group.buffersize==Math.ceil((objlength*Float32Array.BYTES_PER_ELEMENT)/multi)*multi)return
            group.buffersize=Math.ceil((objlength*Float32Array.BYTES_PER_ELEMENT)/multi)*multi
    
            if(debug){
                console.groupCollapsed("bufferresize")
                console.info("buffer to smal update size\nfrom: "+Number((buffersizeold).toFixed(1)).toLocaleString()+"\nto: "+Number((group.buffersize).toFixed(1)).toLocaleString()+"\nname: "+group.name)
                console.groupEnd()
            }
    
            for(let i of Object.keys(group.buffer)){
                group.gl.bindBuffer(group.buffer[i].buffertype, group.buffer[i].buffer);
                if(webgl2){
                    var arrBuffer = new ArrayBuffer(buffersizeold*Float32Array.BYTES_PER_ELEMENT*group.buffer[i].bufferlength);
                    gl.getBufferSubData(group.buffer[i].buffertype, 0, new Int8Array(arrBuffer));
                }
                group.gl.bufferData(group.buffer[i].buffertype, group.buffersize*Float32Array.BYTES_PER_ELEMENT*group.buffer[i].bufferlength, group.buffer[i].drawtype);
                if(webgl2){
                    group.gl.bufferSubData(group.buffer[i].buffertype,0, arrBuffer)
                }
            }
            for(let i of Object.keys(group.feedbackbuffer)){
                group.gl.bindBuffer(group.feedbackbuffer[i].buffertype, group.feedbackbuffer[i].buffer);
                if(webgl2){
                    var arrBuffer = new ArrayBuffer(buffersizeold*Float32Array.BYTES_PER_ELEMENT*group.feedbackbuffer[i].bufferlength);
                    gl.getBufferSubData(group.feedbackbuffer[i].buffertype, 0, new Int8Array(arrBuffer));
                }
                group.gl.bufferData(group.feedbackbuffer[i].buffertype, group.buffersize*Float32Array.BYTES_PER_ELEMENT*group.feedbackbuffer[i].bufferlength,group.feedbackbuffer[i].drawtype)
                if(webgl2){
                    group.gl.bufferSubData(group.feedbackbuffer[i].buffertype,0, arrBuffer)
                }
            }
        }
    }
}
promallres[21]()