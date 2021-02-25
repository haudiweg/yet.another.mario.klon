const shader={
    wassertextur:{//obj sol sich um wasser in game draw beschäftigen
        webgl2:true,
        vs:glsl`#version 300 es
precision mediump float;

in vec4 coordinates7;
out vec4 coordinates7o;
uniform vec2 canvashwwebgl;
uniform vec4 offsgl;

vec4 conv4(vec4 cord) {return (vec4((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0,0.0,1.0));}
void main(void) {
    coordinates7o=coordinates7;
    gl_Position = conv4(coordinates7/offsgl.w-vec4(offsgl.xy,0,0));
}
        `,
        fs:glsl`#version 300 es
precision mediump usampler2D;
precision mediump float;

uniform sampler2D wasserheight;
uniform float down;
uniform float schaum;
uniform vec4 wassertexturschaum;
uniform vec4 wassertexturwasser;

out vec4 fragColor;
in vec4 coordinates7o;
in vec2 gl_PointCoord;
void main(void) {
    //kucke ob unter threashhold dan mach die farbe
    if(coordinates7o.y>down+textur(wasserheight,gl_PointCoord).x-schaum){
        fragColor=wassertexturschaum;
    }
    //kucke ob unter threashhold dan mach die farbe
    if(coordinates7o.y>down+textur(wasserheight,gl_PointCoord).x){
        fragColor=wassertexturwasser;
    }
}        
        `
    },
    shadow:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 6
precision mediump float;
precision mediump usampler2D;

in vec4 coordinates2;

in vec4 aColorsun;
in float aKante;

out vec4 aColorsun1;

uniform sampler2D colltexture;
uniform sampler2D suntexture;
uniform float rayres;

uniform vec4 minmax;
uniform vec2 num;
uniform int shadowhighquali;

#define sunabnahme 0.999
#define sunabnahmediv 5.0
#define raytestquali 2.5
#define brightnes 0.5

bool visible(vec2 pos1,vec2 pos2){
    float dist=distance(pos1,pos2);
    float i=dist;
    while(i>=raytestquali){//geht das au ohne for
        for(float i1=i/2.0;i1<=dist;i1+=i){
            if(texture(colltexture,(mix(pos1,pos2,i1/dist)-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0)return false;
        };
        i/=2.0;
    }
    return true;
}
bool visible1(vec2 pos1,vec2 pos2){
    float winkel=atan(pos2.y-pos1.y,pos2.x-pos1.x);
    float dist=distance(pos1,pos2);
    while(dist>-10.0){
        dist--;
        pos1.x+=cos(winkel);
        pos1.y+=sin(winkel);
        if(texture(colltexture,(pos1-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0)return false;
        if(distance(pos1,pos2)<1.0)return true;
    }
    return true;
}
void main(void) {
    aColorsun1=vec4(aColorsun.xyz,1.0);//maximal color of that pixel

    if(aKante<=1.0){//is pixel nothing or kante
        vec3 temp=(texture(suntexture,num/(minmax.zw-minmax.xy)).xyz*pow(sunabnahme,max(1.0,distance(num+minmax.xy,coordinates2.xy)/sunabnahmediv)))/((minmax.z-minmax.x)*(minmax.w-minmax.y)*brightnes);
        if((shadowhighquali==1||any(greaterThan(temp,vec3(0.000000001))))&&visible(num+minmax.xy,coordinates2.xy)){//is sunpoint lighning  and does point see light point
            aColorsun1.xyz+=temp;
        }
    }
}
        `,
        fs:glsl`#version 300 es
#line 65
precision mediump float;
void main(void) {
}
        `,
    },
    shadowkante:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 74
precision mediump float;
precision mediump usampler2D;

in vec4 coordinates5;
out float aKante;

uniform sampler2D colltexture;

uniform vec4 minmax;
void main(void) {
    aKante=0.0;
    if(texture(colltexture,(coordinates5.xy-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0){
        int kante=(
            (texture(colltexture,(coordinates5.xy-minmax.xy+vec2(1,0))/(minmax.zw-minmax.xy)).x>0.0?1:0)+
            (texture(colltexture,(coordinates5.xy-minmax.xy+vec2(0,1))/(minmax.zw-minmax.xy)).x>0.0?1:0)+
            (texture(colltexture,(coordinates5.xy-minmax.xy-vec2(1,0))/(minmax.zw-minmax.xy)).x>0.0?1:0)+
            (texture(colltexture,(coordinates5.xy-minmax.xy-vec2(0,1))/(minmax.zw-minmax.xy)).x>0.0?1:0));
        if(kante==0)aKante=0.0;
        if(kante==1)aKante=1.0;
        if(kante==2)aKante=1.0;
        if(kante==3)aKante=1.0;
        if(kante==4)aKante=2.0;
    }
}
        
        `,
        fs:glsl`#version 300 es
#line 102
precision mediump float;
void main(void) {
}        
        `,
    },
    shadowdraw:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 111
precision highp float;

in vec4 coordinates3;
in vec4 aTexCoord;
uniform vec2 canvashwwebgl;
uniform vec4 offsgl;
out vec2 acanvashwwebgl;
out vec4 vTexCoord;

vec4 conv4(vec4 cord) {return (vec4((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0,0.0,1.0));}
void main(void) {
    acanvashwwebgl=canvashwwebgl;
    vTexCoord=aTexCoord;
    gl_Position = conv4(vec4(coordinates3.xy,0,0)/offsgl.w-vec4(offsgl.xy,0,0));
}  
        `,
        fs:glsl`#version 300 es
#line 129
precision mediump float;
uniform sampler2D uSampler;
uniform vec3 rayminmaxavg;
uniform float light;
uniform vec4 minmax;
uniform int shadowdrawmode;
out vec4 fragColor;
in vec2 acanvashwwebgl;
in vec4 vTexCoord;
#define minlight 0.2
void main(void) {
    //look how mutch stops my shader have
    
    
    if(shadowdrawmode==0){
        fragColor = texture(uSampler,vTexCoord.xy)/vec4(rayminmaxavg.y/light,rayminmaxavg.y/light,rayminmaxavg.y/light,1);
    }
    if(shadowdrawmode==1){
        float x=mix(minmax.x,minmax.z,vTexCoord.x);
        float y=mix(minmax.y,minmax.w,vTexCoord.y);
        float xm=(trunc(x)-minmax.x)/(minmax.z-minmax.x);
        float ym=(trunc(y)-minmax.y)/(minmax.w-minmax.y);
        float yp=( ceil(y)-minmax.y)/(minmax.w-minmax.y);
        float xp=( ceil(x)-minmax.x)/(minmax.z-minmax.x);
        //get the next pixel of textur that is 

        vec4 dist=normalize(vec4(
            distance(vec2(xm,yp),vTexCoord.xy),
            distance(vec2(xp,ym),vTexCoord.xy),
            distance(vec2(xm,ym),vTexCoord.xy),
            distance(vec2(xp,yp),vTexCoord.xy)
        ));
        float deivider=(
            1.0*(1.0-(0.5+dist.x/2.0))+
            1.0*(1.0-(0.5+dist.y/2.0))+
            1.0*(1.0-(0.5+dist.z/2.0))+
            1.0*(1.0-(0.5+dist.w/2.0))
        );
        vec4 color=(
            texture(uSampler, vec2(xm,yp))*(1.0-(0.5+dist.x/2.0))+
            texture(uSampler, vec2(xp,ym))*(1.0-(0.5+dist.y/2.0))+
            texture(uSampler, vec2(xm,ym))*(1.0-(0.5+dist.z/2.0))+
            texture(uSampler, vec2(xp,yp))*(1.0-(0.5+dist.w/2.0))
        )/deivider;
        fragColor = color/vec4(rayminmaxavg.y/light,rayminmaxavg.y/light,rayminmaxavg.y/light,1);
    }
    if(shadowdrawmode==2){
        vec4 color=(
            texture(uSampler,vTexCoord.xy+vec2(-1,-1)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2( 0,-1)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2( 1,-1)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2( 1, 0)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2( 1, 1)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2( 0, 1)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2(-1, 1)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2(-1, 0)/(minmax.zw-minmax.xy))+
            texture(uSampler,vTexCoord.xy+vec2( 0, 0)/(minmax.zw-minmax.xy))*2.0
        )/10.0;
        fragColor = color/vec4(rayminmaxavg.y/light,rayminmaxavg.y/light,rayminmaxavg.y/light,1);
    }
    fragColor.r=mix(minlight,1.0,fragColor.r);
    fragColor.g=mix(minlight,1.0,fragColor.g);
    fragColor.b=mix(minlight,1.0,fragColor.b);
    //fragColor=vec4(dist.xyzw);
}
        `,
    },
    shadowminmax:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 200
precision highp float;

in vec4 coordinates4;

uniform sampler2D uSampler;
uniform vec2 raywh;

out vec3 minmaxinslight1;

void main(void) {
    float infinity = intBitsToFloat(2139095039);
    float insnum=0.0;
    float minnum=infinity;
    float maxnum=0.0;

    for(float x=0.0;x<raywh.x;x++){
        for(float y=0.0;y<raywh.y;y++){
            vec4 c=texture(uSampler, vec2(x,y)/raywh);
            float colvel=(c.r+c.g+c.b)*c.a;
            insnum+=colvel;
            minnum=min(minnum,colvel);
            maxnum=max(maxnum,colvel);
        }
    }
    //double to 2 floats for higher precision on divide
    minmaxinslight1=vec3(minnum,maxnum,insnum);
}  
        `,
        fs:glsl`#version 300 es
#line 230
precision mediump float;
void main(void) {
}
        `,
    },
    sunrender:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 239
precision highp float;
precision mediump usampler2D;

in vec4 coordinates6;

in float aKante;

out vec4 asunarr1;

uniform sampler2D suntexture;
uniform sampler2D shadowtexture;
uniform sampler2D sunorgtexture;

uniform vec4 minmax;
uniform vec3 rayminmaxavg;

void main(void) {
    asunarr1=vec4(0,0,0,1);
    //sun of before
    //problem that it isnt frame perfect because interpolation
    asunarr1=max(asunarr1,texture(suntexture,(coordinates6.xy-minmax.xy)/(minmax.zw-minmax.xy)));
    //transparenz get ignored


    //add reflections of air
    vec4 shadow=texture(shadowtexture,(coordinates6.xy-minmax.xy)/(minmax.zw-minmax.xy))/vec4(rayminmaxavg.y,rayminmaxavg.y,rayminmaxavg.y,1);
    if(aKante==0.0){
        asunarr1=max(asunarr1,shadow*vec4(0.001,0.001,0.001,1));
    }
    //add reflections of obj
    if(aKante==1.0){
        asunarr1=max(asunarr1,shadow*vec4(0.9,0.9,0.9,1));
    }
    //if(aKante==2.0){
    //    //asunarr1=vec4(0,0,0,0);
    //}

    //all light sources get bit darker  (if it wooldnt get darker than removed light souces woold live forever)
    asunarr1*=vec4(0.99999,0.99999,0.99999,1.0);

    //add orginal sun
    asunarr1=max(asunarr1,texture(sunorgtexture,(coordinates6.xy-minmax.xy)/(minmax.zw-minmax.xy)));

    //todo: if obj than look on color of that obj and calculate how mutch color get absorbed and look at how shiny it is
}  
        `,
        fs:glsl`#version 300 es
#line 287
precision mediump float;
void main(void) {
}
        `,
    },
    grass:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 296
//do code of script edit in js to make that the shader use a version that is suportet
precision highp float;

in vec4 coordinates1;     //point from were the grass rotate

in float grassrotation;     //default position were grass look att
in float grassnum;
in vec2 grassstartcord;

in vec2 aVelo;              //grass.velo[0]   grass.velo[1]
in vec3 aWindopt;           //grass.strengthgwind grass.strengthiwind grass.strengthvelo   mach struct daraus das settings beinhaltet
in vec2 aWind;             //input from wind of every grass
in vec4 aWindrandtimer;
in vec4 grasscolor;

uniform vec2 canvashwwebgl;
uniform vec4 offsgl;
uniform int rendermode;
uniform float fps;
uniform vec2 globalwind;   //is the global wind
uniform vec4 objectspos[MAX_NUM_TOTAL_OBJECTS];
uniform vec2 objectsvel[MAX_NUM_TOTAL_OBJECTS];
uniform int objectslength;
uniform vec2 rassenpos[MAX_NUM_TOTAL_OBJECTS];
uniform int rassenlength;

out vec4 grasscolor1;
out vec2 aVelo1;      //output from velo of every grass
out vec2 aWind1;     //output from wind of every grass
out vec4 aWindrandtimer1;  //randomx  randomy

#define timetogrow 800.0
#define velomulti 0.9
#define randtimer 30.0
#define grasswalkmaxdist 2.0
#define grasswalkshrink 0.05
#define grasswalkmaxdistv 5.0
#define grasswalkmaxv 0.5
#define maxvelo 0.5


float mindistpointtofloat(vec2 point,vec4 rectangle){
    vec2 nearestpoint=vec2(0,0);
    if(point.x<=rectangle.x){
        nearestpoint.x=rectangle.x;
    }else if(point.x>=rectangle.x+rectangle.z){
        nearestpoint.x=rectangle.x+rectangle.z;
    }else{
        nearestpoint.x=point.x;
    }
    if(point.y<=rectangle.y){
        nearestpoint.y=rectangle.y;
    }else if(point.y>=rectangle.y+rectangle.w){
        nearestpoint.y=rectangle.y+rectangle.w;
    }else{
        nearestpoint.y=point.y;
    }
    //negativ w h beachen vieleicht
    return distance(point,nearestpoint);
}
vec2 conv2(vec2 cord) {return (vec2((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0));}
vec4 conv4(vec4 cord) {return (vec4((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0,0.0,1.0));}
void main(void) {
    if(rendermode==1){
        //float hoenabhaenigkeit=min(max(1.0,distance(coordinates1.xy,grassstartcord)/20.0),30.0)*grassnum;
        float hoenabhaenigkeit=clamp(distance(coordinates1.xy,grassstartcord)/20.0,1.0,30.0)*grassnum;
        float grassrotc=abs(cos(grassrotation));
        float grassrots=abs(sin(grassrotation));
        grasscolor1=grasscolor;
        float roatation=-atan(
            globalwind.x*grassrotc*hoenabhaenigkeit*aWindopt[0]+
            mix(aWind.x,aWindrandtimer.x,aWindrandtimer.z)*grassrotc*hoenabhaenigkeit*aWindopt[1]+
            sin(grassrotation)+
            (max(abs(aVelo.x),maxvelo)*sign(aVelo.x))*grassrotc*hoenabhaenigkeit*aWindopt[2]+
            0.0
            ,
            globalwind.y*grassrots*hoenabhaenigkeit*aWindopt[0]+
            mix(aWind.y,aWindrandtimer.y,aWindrandtimer.z)*grassrots*hoenabhaenigkeit*aWindopt[1]+
            cos(grassrotation)+
            (max(abs(aVelo.y),maxvelo)*sign(aVelo.y))*grassrots*hoenabhaenigkeit*aWindopt[2]+
            0.0
        );

        vec4 rotatedPosition = vec4(
            cos(roatation) * mix(0.0,coordinates1.x-grassstartcord.x,aWindrandtimer.w) - sin(roatation) * mix(0.0,coordinates1.y-grassstartcord.y,aWindrandtimer.w) + grassstartcord.x,
            sin(roatation) * mix(0.0,coordinates1.x-grassstartcord.x,aWindrandtimer.w) + cos(roatation) * mix(0.0,coordinates1.y-grassstartcord.y,aWindrandtimer.w) + grassstartcord.y,
            coordinates1.z,coordinates1.w
        );
        
        gl_Position = conv4((rotatedPosition)/offsgl.w-vec4(offsgl.xy,0,0));
    }else if(rendermode==0){
        //float hoenabhaenigkeit=min(max(1.0,distance(coordinates1.xy,grassstartcord)/20.0),30.0)*grassnum;
        float hoenabhaenigkeit=clamp(distance(coordinates1.xy,grassstartcord)/20.0,1.0,30.0)*grassnum;
        float grassrotc=abs(cos(grassrotation));
        float grassrots=abs(sin(grassrotation));
        aWind1=aWind;
        aVelo1=aVelo*velomulti*(fps/60.0);
        aWindrandtimer1=aWindrandtimer;
        aWindrandtimer1.w=min(1.0,aWindrandtimer1.w+(60.0/fps)/timetogrow);

        
        //man könnte mit seperaten feedback arbeiten um ds zu setzen immer wieder zu vermeiden
        if(abs(coordinates1.x)<=1.0||abs(coordinates1.y)<=1.0)aWindrandtimer1.z+=(60.0/fps)/randtimer;  //jede 30 sek geht wert +1
        if(aWindrandtimer1.z>=1.0){
            aWind1=aWindrandtimer.xy;  //alter random wind neuer wind
            aWindrandtimer1.z-=1.0;  //was pasiert wen werd -1 oder mehr ist
            //besserer randomgen baun
            float maxnumber=float(~uint(0));
            //mache alle numbern in range von 0-1  und dan in 32 bit range
            uint random=(
                uint(((grassrotation+1.)/2.)                *maxnumber)^
                uint(((normalize(globalwind).x+1.)/2.)      *maxnumber)^
                uint(((normalize(globalwind).y+1.)/2.)      *maxnumber)^
                uint(fract(fps)                             *maxnumber)^
                uint(aWindopt.x                             *maxnumber)^
                uint(aWindopt.y                             *maxnumber)^
                uint(aWindopt.z                             *maxnumber)^
                uint(grasscolor.x                           *maxnumber)^
                uint(grasscolor.y                           *maxnumber)^
                uint(grasscolor.z                           *maxnumber)^
                uint(grasscolor.w                           *maxnumber)^
                uint(((normalize(aWind).x+1.)/2.)           *maxnumber)^
                uint(((normalize(aWind).y+1.)/2.)           *maxnumber)^
                uint(((normalize(aWindrandtimer).x+1.)/2.)  *maxnumber)^
                uint(((normalize(aWindrandtimer).y+1.)/2.)  *maxnumber)
            );

            aWindrandtimer1.xy=vec2(sin(float(random)),sin(float(~random)));
        }
        if(abs(coordinates1.x)>=1.0&&abs(coordinates1.y)>=1.0){
            float roatation=-atan(
                globalwind.x*grassrotc*hoenabhaenigkeit*aWindopt[0]+
                mix(aWind.x,aWindrandtimer.x,aWindrandtimer.z)*grassrotc*hoenabhaenigkeit*aWindopt[1]+
                sin(grassrotation)+
                (max(abs(aVelo.x),maxvelo)*sign(aVelo.x))*grassrotc*hoenabhaenigkeit*aWindopt[2]+
                0.0
                ,
                globalwind.y*grassrots*hoenabhaenigkeit*aWindopt[0]+
                mix(aWind.y,aWindrandtimer.y,aWindrandtimer.z)*grassrots*hoenabhaenigkeit*aWindopt[1]+
                cos(grassrotation)+
                (max(abs(aVelo.y),maxvelo)*sign(aVelo.y))*grassrots*hoenabhaenigkeit*aWindopt[2]+
                0.0
            );

            vec2 rotatedPosition = vec2(
                cos(roatation) * (coordinates1.x-grassstartcord.x) - sin(roatation) * (coordinates1.y-grassstartcord.y) + grassstartcord.x,
                sin(roatation) * (coordinates1.x-grassstartcord.x) + cos(roatation) * (coordinates1.y-grassstartcord.y) + grassstartcord.y
            );

            for(int i=0;i<objectslength;i++){
                aVelo1-=vec2(objectsvel[i].x,-objectsvel[i].y)*min(max(grasswalkmaxdistv-mindistpointtofloat(rotatedPosition.xy,objectspos[i]),0.0),grasswalkmaxv);
                aWindrandtimer1.w=max(0.0,aWindrandtimer1.w-min(1.0,abs(objectsvel[i].x)+abs(objectsvel[i].y))*min(max(grasswalkmaxdist-mindistpointtofloat(rotatedPosition.xy,objectspos[i]),0.0),grasswalkshrink*(60.0/fps)));
            }
            for(int i=0;i<rassenlength;i++){
                aWindrandtimer1.w=mindistpointtofloat(rotatedPosition.xy,vec4(rassenpos[i],0.0,0.0))<15.0?0.0:aWindrandtimer1.w;
            }
        }
    }
}
        `,
        fs:glsl`#version 300 es
#line 458
precision mediump float;
in vec4 grasscolor1;
out vec4 fragColor;
void main(void) {
    fragColor = grasscolor1;
}
        `,
    },
    particle:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 470
precision highp float;
precision mediump usampler2D;
in vec2 aVelop;
in vec2 aPosp;    
in vec2 aLivep;
in vec2 gravi;
in vec4 color;

uniform sampler2D positionTexture;

uniform vec2 canvashwwebgl;
uniform vec4 offsgl;
uniform float fps;
uniform vec2 globalwind;
uniform vec4 minmax;


out vec2 aVelop1;
out vec2 aPosp1;    
out vec2 aLivep1;
out vec4 color1;

vec2 conv2(vec2 cord) {return (vec2((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0));}
vec4 conv4(vec4 cord) {return (vec4((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0,0.0,1.0));}
void main(void) {
    if(aLivep.x>=0.0){
        aLivep1=vec2(aLivep.x-(60.0/fps),aLivep.y);
        aVelop1=aVelop*pow(0.99,60.0/fps)+(gravi+globalwind.xy*-0.05)*(60.0/fps);

        gl_PointSize = min(aLivep1.y,aLivep1.x);
        if(aVelop1.x>=0.0&&(texture(positionTexture,(aPosp+vec2((gl_PointSize/2.0)+aVelop1.x,0.0)-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0||((aPosp.x+aVelop1.x)>=(minmax.x+minmax.z)))){
            aVelop1.x=0.0;
        }
        if(aVelop1.y>=0.0&&(texture(positionTexture,(aPosp+vec2(0.0,(gl_PointSize/2.0)+aVelop1.y)-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0||((aPosp.y+aVelop1.y)>=(minmax.y+minmax.w)))){
            aVelop1.y=0.0;
        }
        if(aVelop1.x<=0.0&&(texture(positionTexture,(aPosp+vec2(-(gl_PointSize/2.0)+aVelop1.x,0.0)-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0||((aPosp.x+aVelop1.x)<=minmax.x))){
            aVelop1.x=0.0;
        }
        if(aVelop1.y<=0.0&&(texture(positionTexture,(aPosp+vec2(0.0,-(gl_PointSize/2.0)+aVelop1.y)-minmax.xy)/(minmax.zw-minmax.xy)).x>0.0||((aPosp.y+aVelop1.y)<=minmax.y))){
            aVelop1.y=0.0;
        }
        aPosp1=aPosp+aVelop1;
        color1=color;
        gl_Position = conv4(vec4(aPosp.xy,0,0)/offsgl.w-vec4(offsgl.xy,0,0));
    }
}
        `,
        fs:glsl`#version 300 es
#line 520
precision mediump float;
in vec4 color1;
out vec4 fragColor;
void main(void) {
    fragColor = color1;
}
        `,
    },
    defaultwebgl2:{
        webgl2:true,
        vs:glsl`#version 300 es
#line 532
//do code of script edit in js to make that the shader use a version that is suportet
precision highp float;
in vec4 coordinates;
in vec4 coordinatesnext;
in vec4 coordinatesbefore;

uniform vec2 canvashwwebgl;
uniform vec4 offsgl;
uniform vec2 translation;
uniform vec4 aColor;
uniform float aPicture;
uniform float blur;
uniform vec2 wh;
uniform vec2 start;


out vec2 vTexCoord;
flat out float vPicture;
out vec4 vColor;
out float zoom;
out vec2 vBlur;

vec2 conv2(vec2 cord) {return (vec2((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0));}
vec4 conv4(vec4 cord) {return (vec4((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0,0.0,1.0));}
void main(void) {
    vColor=aColor;
    vPicture=aPicture;
    zoom=0.0;
    if(offsgl.z>0.0)zoom=1.0;
    zoom=0.0;

    //vec2 distadd=normalize(coordinates.xy-wh/2.0)*blur;
    vec2 distadd=((coordinates.xy/wh)*2.0-1.0)*blur;
    //look in what direction point is and add in that dir the blur
    vBlur=blur/wh;

    vTexCoord=vec2((coordinates.x+distadd.x)/wh.x,1.0-(coordinates.y+distadd.y)/wh.y);
    
    gl_Position = conv4((coordinates+vec4(translation.xy+distadd,0,0))/offsgl.w-vec4(offsgl.xy,0,0));
}
        `,
        fs:glsl`#version 300 es
#line 575
precision mediump float;
in vec4 vColor;
flat in float vPicture;
in vec2 vTexCoord;
in float zoom;
in vec2 vBlur;


uniform vec4 blurcolor;
uniform sampler2D uSampler;


out vec4 fragColor;

void main(void) {
    //bekomme wh
    //durch distanz von punkt und wh kan ich mir kucken wo blur ist
    

    //point sagt wie weit die position wo gedrawt wird von ende entfernt ist
    if(int(vPicture) == 0){
        fragColor = vColor;
    }
    if(int(vPicture) == 1){
        fragColor = texture(uSampler, vTexCoord);
    }
    //hole dist von mitte zu
    //nutze distanze von mitte von vertex und kuck wie weit die beiden sind rechne dan shadow dagegen und schon habe ich distanz
    
    //look if im ousite of obj
    if(vTexCoord.x<0.0||vTexCoord.x>1.0||vTexCoord.y<0.0||vTexCoord.y>1.0){
        fragColor=blurcolor;
        fragColor.a-=distance(clamp(vTexCoord,vec2(0),vec2(1))/vBlur,vTexCoord/vBlur);
    }
    
}
        `,
    },
    default:{
        vs:glsl`
#line 616
attribute vec4 coordinates;
attribute vec2 aTexCoord;

uniform vec2 canvashwwebgl;
uniform vec2 translation;
uniform vec4 offsgl;
uniform vec4 aColor;
uniform float aPicture;

varying vec2 vTexCoord;
varying float vPicture;
varying vec4 vColor;

vec2 conv2(vec2 cord) {return (vec2((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0));}
vec4 conv4(vec4 cord) {return (vec4((cord.x/canvashwwebgl.x)*2.0-1.0,((canvashwwebgl.y-cord.y)/canvashwwebgl.y)*2.0-1.0,0.0,1.0));}
void main(void) {
    vColor=aColor;
    vTexCoord=aTexCoord;
    vPicture=aPicture;
    gl_Position = conv4((coordinates+vec4(translation.xy,0,0))/offsgl.w-vec4(offsgl.xy,0,0));
}
        `,
        fs:glsl`
#line 640
precision mediump float;
varying vec4 vColor;
varying float vPicture;
varying vec2 vTexCoord;
uniform sampler2D uSampler;
void main(void) {
    if(int(vPicture) == 0){
        gl_FragColor = vColor;
    }
    if(int(vPicture) == 1){
        gl_FragColor = texture2D(uSampler, vTexCoord);
    }
}
        `,
    },
}
promallres[24]()