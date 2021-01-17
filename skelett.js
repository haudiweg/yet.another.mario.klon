const skelett={
    Mario:function(){
        this.bones=
            [
                {
                phy:true,
                bewegung:-1,
                get fussklippe(){return this.t.inwater[0]&&this.t.falldist>10?16:18},
                origin:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]>0)return this.t.minx
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.minx
                            if(this.t.rich4arr[0]==0)return this.t.minx+this.t.w/2-2
                            if(this.t.rich4arr[0]==1)return this.t.minx
                            if(this.t.rich4arr[0]==2)return this.t.minx+this.t.w/2-2
                            if(this.t.rich4arr[0]==3)return this.t.minx+this.t.w
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2-4
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.miny+(this.t.h/4)*3
                            if(this.t.rich4arr[0]==0)return this.t.miny+(this.t.h/4)*3
                            //if(this.t.rich4arr[0]==1)return this.t.miny+this.t.h/2-4
                            //if(this.t.rich4arr[0]==2)return this.t.miny+this.t.h
                            //if(this.t.rich4arr[0]==3)return this.t.miny+this.t.h/2-4
                        }
                    }
                },
                pointer:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w+20
                            if(this.t.velo[0]>0)return this.t.minx-20
                        }else{
                            return this.t.minx+this.t.w/2-2
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2-4
                        }else{
                            return this.t.miny+this.t.h
                        }
                    }
                },
                segment0:{
                    phy:true,
                    get next(){return this.t.bones[0].segment1},
                    get origin(){return this.t.bones[0].origin},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8+1}
                },
                segment1:{
                    phy:true,
                    get origin(){return this.t.bones[0].segment0},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8}
                }
            },{
                phy:true,
                bewegung:-6,
                get fussklippe(){return this.t.inwater[0]&&this.t.falldist>10?16:8},
                origin:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]>0)return this.t.minx
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.minx
                            if(this.t.rich4arr[0]==0)return this.t.minx+this.t.w/2+2
                            if(this.t.rich4arr[0]==1)return this.t.minx
                            if(this.t.rich4arr[0]==2)return this.t.minx+this.t.w/2+2
                            if(this.t.rich4arr[0]==3)return this.t.minx+this.t.w
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2+4
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.miny+(this.t.h/4)*3
                            if(this.t.rich4arr[0]==0)return this.t.miny+(this.t.h/4)*3
                            //if(this.t.rich4arr[0]==1)return this.t.miny+this.t.h/2+4
                            //if(this.t.rich4arr[0]==2)return this.t.miny+this.t.h
                            //if(this.t.rich4arr[0]==3)return this.t.miny+this.t.h/2+4
                        }
                    }
                },
                pointer:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w+20
                            if(this.t.velo[0]>0)return this.t.minx-20
                        }else{
                            return this.t.minx+this.t.w/2+2
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2-4
                        }else{
                            return this.t.miny+this.t.h
                        }
                    }
                },
                segment0:{
                    phy:true,
                    get next(){return this.t.bones[1].segment1},
                    get origin(){return this.t.bones[1].origin},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8+1},
                },
                segment1:{
                    phy:true,
                    get origin(){return this.t.bones[1].segment0},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Mario/MarioLBein.svg",
                    fillpic1:"img/Mario/MarioRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8}
                }
            },{
                phy:false,
                segment0:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment1.x+((this.t.dir[0]==1)?2:-2),y:this.t.bones[0].segment1.y} 
                        return {x:this.t.bones[0].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[0].segment1.y+((this.t.dir[0]==1)?0.5:-0.5)-2}
                    },
                    get finish(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment1.x,y:this.t.bones[0].segment1.y} 
                        return {x:this.t.bones[0].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[0].segment1.y}
                    },
                    width:5,
                    fillpic0:"img/Mario/MarioRFuß.svg",
                    fillpic1:"img/Mario/MarioLFuß.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    len:7,
                },
                segment1:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[1].segment1.x+((this.t.dir[0]==1)?2:-2),y:this.t.bones[1].segment1.y} 
                        return {x:this.t.bones[1].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[1].segment1.y+((this.t.dir[0]==1)?0.5:-0.5)-2}
                    },
                    get finish(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[1].segment1.x,y:this.t.bones[1].segment1.y} 
                        return {x:this.t.bones[1].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[1].segment1.y}
                    },
                    width:5,
                    fillpic0:"img/Mario/MarioRFuß.svg",
                    fillpic1:"img/Mario/MarioLFuß.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    len:7,
                },
                segment2:{
                    phy:false,
                    get origin(){//umdrehn von körpr mit dir
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment0.x+(this.t.dir[0]==1?10:-10),y:this.t.miny+this.t.h/2}
                        return {x:this.t.minx+this.t.w/2,y:this.t.miny+this.t.h/3}
                    },
                    get finish(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment0.x,y:this.t.miny+this.t.h/2}
                        return {x:this.t.minx+this.t.w/2,y:this.t.miny+(this.t.h/4)*3}
                    },
                    width:10,
                    fillpic0:"img/Mario/MarioKörper.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment3:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.minx+(this.t.dir[0]==1?this.t.w:0),y:this.t.miny+this.t.h/2}
                        return {x:this.t.minx+this.t.w/2+1*Math.sin(this.winkel),y:this.t.miny}
                    },
                    get finish(){
                        return this.t.bones[2].segment2.origin
                    },
                    width:10,
                    fillpic0:"img/Mario/MarioRKopf.svg",
                    fillpic1:"img/Mario/MarioLKopf.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    len:7,
                    winkel:0
                },
                segment4:{
                    phy:false,
                    get origin(){return {x:this.t.minx+this.t.w/2-this.t.bones[2].segment2.width/2,y:this.t.bones[2].segment2.origin.y}},
                    get finish(){return {x:this.t.minx+this.t.w/2-this.t.bones[2].segment2.width/2,y:this.t.miny+this.t.h*(2.5/4)}},
                    width:2,
                    fillpic0:"img/Mario/MarioLArm.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment5:{
                    phy:false,
                    get origin(){return {x:this.t.minx+this.t.w/2+this.t.bones[2].segment2.width/2,y:this.t.bones[2].segment2.origin.y}},
                    get finish(){return {x:this.t.minx+this.t.w/2+this.t.bones[2].segment2.width/2,y:this.t.miny+this.t.h*(2.5/4)}},
                    width:2,
                    fillpic0:"img/Mario/MarioRArm.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment6:{
                    phy:false,
                    get origin(){return {x:this.t.bones[2].segment4.finish.x,y:this.t.bones[2].segment4.finish.y-2}},
                    get finish(){return {x:this.t.bones[2].segment4.finish.x,y:this.t.bones[2].segment4.finish.y+2}},
                    width:2,
                    fillpic0:"img/Mario/MarioLHand.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment7:{
                    phy:false,
                    get origin(){return {x:this.t.bones[2].segment5.finish.x,y:this.t.bones[2].segment5.finish.y-2}},
                    get finish(){return {x:this.t.bones[2].segment5.finish.x,y:this.t.bones[2].segment5.finish.y+2}},
                    width:2,
                    fillpic0:"img/Mario/MarioRHand.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
            }
        ]
    },
    Luigi:function(){
        this.bones=
            [
                {
                phy:true,
                bewegung:-1,
                get fussklippe(){return this.t.inwater[0]&&this.t.falldist>10?16:18},
                origin:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]>0)return this.t.minx
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.minx
                            if(this.t.rich4arr[0]==0)return this.t.minx+this.t.w/2-2
                            if(this.t.rich4arr[0]==1)return this.t.minx
                            if(this.t.rich4arr[0]==2)return this.t.minx+this.t.w/2-2
                            if(this.t.rich4arr[0]==3)return this.t.minx+this.t.w
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2-4
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.miny+(this.t.h/4)*3
                            if(this.t.rich4arr[0]==0)return this.t.miny+(this.t.h/4)*3
                            //if(this.t.rich4arr[0]==1)return this.t.miny+this.t.h/2-4
                            //if(this.t.rich4arr[0]==2)return this.t.miny+this.t.h
                            //if(this.t.rich4arr[0]==3)return this.t.miny+this.t.h/2-4
                        }
                    }
                },
                pointer:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w+20
                            if(this.t.velo[0]>0)return this.t.minx-20
                        }else{
                            return this.t.minx+this.t.w/2-2
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2-4
                        }else{
                            return this.t.miny+this.t.h
                        }
                    }
                },
                segment0:{
                    phy:true,
                    get next(){return this.t.bones[0].segment1},
                    get origin(){return this.t.bones[0].origin},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Luigi/LuigiLBein.svg",
                    fillpic1:"img/Luigi/LuigiRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8+1}
                },
                segment1:{
                    phy:true,
                    get origin(){return this.t.bones[0].segment0},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Luigi/LuigiLBein.svg",
                    fillpic1:"img/Luigi/LuigiRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8}
                }
            },{
                phy:true,
                bewegung:-6,
                get fussklippe(){return this.t.inwater[0]&&this.t.falldist>10?16:8},
                origin:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]>0)return this.t.minx
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.minx
                            if(this.t.rich4arr[0]==0)return this.t.minx+this.t.w/2+2
                            if(this.t.rich4arr[0]==1)return this.t.minx
                            if(this.t.rich4arr[0]==2)return this.t.minx+this.t.w/2+2
                            if(this.t.rich4arr[0]==3)return this.t.minx+this.t.w
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2+4
                        }else{
                            if(typeof(this.t.rich4arr)=="undefined")return this.t.miny+(this.t.h/4)*3
                            if(this.t.rich4arr[0]==0)return this.t.miny+(this.t.h/4)*3
                            //if(this.t.rich4arr[0]==1)return this.t.miny+this.t.h/2+4
                            //if(this.t.rich4arr[0]==2)return this.t.miny+this.t.h
                            //if(this.t.rich4arr[0]==3)return this.t.miny+this.t.h/2+4
                        }
                    }
                },
                pointer:{
                    get x(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            if(this.t.velo[0]<0)return this.t.minx+this.t.w+20
                            if(this.t.velo[0]>0)return this.t.minx-20
                        }else{
                            return this.t.minx+this.t.w/2+2
                        }
                    },
                    get y(){
                        if(this.t.inwater[0]&&this.t.falldist>10){
                            return this.t.miny+this.t.h/2-4
                        }else{
                            return this.t.miny+this.t.h
                        }
                    }
                },
                segment0:{
                    phy:true,
                    get next(){return this.t.bones[1].segment1},
                    get origin(){return this.t.bones[1].origin},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Luigi/LuigiLBein.svg",
                    fillpic1:"img/Luigi/LuigiRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8+1},
                },
                segment1:{
                    phy:true,
                    get origin(){return this.t.bones[1].segment0},
                    get finish(){return this},
                    width:2.5,
                    fillpic0:"img/Luigi/LuigiLBein.svg",
                    fillpic1:"img/Luigi/LuigiRBein.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    get len(){return this.t.h/8}
                }
            },{
                phy:false,
                segment0:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment1.x+((this.t.dir[0]==1)?2:-2),y:this.t.bones[0].segment1.y} 
                        return {x:this.t.bones[0].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[0].segment1.y+((this.t.dir[0]==1)?0.5:-0.5)-2}
                    },
                    get finish(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment1.x,y:this.t.bones[0].segment1.y} 
                        return {x:this.t.bones[0].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[0].segment1.y}
                    },
                    width:5,
                    fillpic0:"img/Luigi/LuigiRFuß.svg",
                    fillpic1:"img/Luigi/LuigiLFuß.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    len:7,
                },
                segment1:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[1].segment1.x+((this.t.dir[0]==1)?2:-2),y:this.t.bones[1].segment1.y} 
                        return {x:this.t.bones[1].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[1].segment1.y+((this.t.dir[0]==1)?0.5:-0.5)-2}
                    },
                    get finish(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[1].segment1.x,y:this.t.bones[1].segment1.y} 
                        return {x:this.t.bones[1].segment1.x+((this.t.dir[0]==1)?0.5:-0.5),y:this.t.bones[1].segment1.y}
                    },
                    width:5,
                    fillpic0:"img/Luigi/LuigiRFuß.svg",
                    fillpic1:"img/Luigi/LuigiLFuß.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    len:7,
                },
                segment2:{
                    phy:false,
                    get origin(){//umdrehn von körpr mit dir
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment0.x+(this.t.dir[0]==1?10:-10),y:this.t.miny+this.t.h/2}
                        return {x:this.t.minx+this.t.w/2,y:this.t.miny+this.t.h/3}
                    },
                    get finish(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.bones[0].segment0.x,y:this.t.miny+this.t.h/2}
                        return {x:this.t.minx+this.t.w/2,y:this.t.miny+(this.t.h/4)*3}
                    },
                    width:10,
                    fillpic0:"img/Luigi/LuigiKörper.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment3:{
                    phy:false,
                    get origin(){
                        if(this.t.inwater[0]&&this.t.falldist>10)return {x:this.t.minx+(this.t.dir[0]==1?this.t.w:0),y:this.t.miny+this.t.h/2}
                        return {x:this.t.minx+this.t.w/2+1*Math.sin(this.winkel),y:this.t.miny}
                    },
                    get finish(){
                        return this.t.bones[2].segment2.origin
                    },
                    width:10,
                    fillpic0:"img/Luigi/LuigiRKopf.svg",
                    fillpic1:"img/Luigi/LuigiLKopf.svg",
                    get fillconfig(){return this.t.dir[0]==1?this.fill0:this.fill1},
                    len:7,
                    winkel:0
                },
                segment4:{
                    phy:false,
                    get origin(){return {x:this.t.minx+this.t.w/2-this.t.bones[2].segment2.width/2,y:this.t.bones[2].segment2.origin.y}},
                    get finish(){return {x:this.t.minx+this.t.w/2-this.t.bones[2].segment2.width/2,y:this.t.miny+this.t.h*(2.5/4)}},
                    width:2,
                    fillpic0:"img/Luigi/LuigiLArm.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment5:{
                    phy:false,
                    get origin(){return {x:this.t.minx+this.t.w/2+this.t.bones[2].segment2.width/2,y:this.t.bones[2].segment2.origin.y}},
                    get finish(){return {x:this.t.minx+this.t.w/2+this.t.bones[2].segment2.width/2,y:this.t.miny+this.t.h*(2.5/4)}},
                    width:2,
                    fillpic0:"img/Luigi/LuigiRArm.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment6:{
                    phy:false,
                    get origin(){return {x:this.t.bones[2].segment4.finish.x,y:this.t.bones[2].segment4.finish.y-2}},
                    get finish(){return {x:this.t.bones[2].segment4.finish.x,y:this.t.bones[2].segment4.finish.y+2}},
                    width:2,
                    fillpic0:"img/Luigi/LuigiLHand.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
                segment7:{
                    phy:false,
                    get origin(){return {x:this.t.bones[2].segment5.finish.x,y:this.t.bones[2].segment5.finish.y-2}},
                    get finish(){return {x:this.t.bones[2].segment5.finish.x,y:this.t.bones[2].segment5.finish.y+2}},
                    width:2,
                    fillpic0:"img/Luigi/LuigiRHand.svg",
                    get fillconfig(){return this.fill0},
                    len:7,
                },
            }
        ]
    }
}
promallres[20]()