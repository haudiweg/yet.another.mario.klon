// @ts-check
'use strict';
/**
 * @param {string|number} num 
 */
function defaultarrload(num="all"){
    console.groupCollapsed("mapload")
    if(num==0||num==="all"){
        namemap(0,"debug")
        new createobj.Gravi(myGravi,-2000, 5000, 4800, 1);
        new createobj.Sun(mySun,300, 10, 500, 10);
        new createobj.Player(myRect,20,660, 25, 25);
        //new createobj.Player(myRect,-100,660, 25, 25,{controls:{w:73,a:74,s:75,d:76}});

        new createobj.Grass(myRect,[1000,1100,1200], [720,400,720],{texturrichtung:[0,1,2]})

        new createobj.Pipe(myRect,200,670,30,20,{wx:650,wy:695,ro:0});
        new createobj.Pipe(myRect,300,700,30,20,{wx:650,wy:695,ro:1});
        new createobj.Pipe(myRect,400,700,30,20,{wx:650,wy:695,ro:2});
        new createobj.Pipe(myRect,500,700,30,20,{wx:650,wy:695,ro:3});
        new createobj.Grass(myRect,-2000, 720, 3500, 1);

        new createobj.Grass(myRect,1500, 0, 0, 600);
        new createobj.Grass(myRect,1500, 720, 0, 1800);


        new createobj.Shape(myRect,-500, 600, 300, 1);
        new createobj.Shape(myRect,-501, 300, 1, 300);
        new createobj.Shape(myRect,-500, 299, 300, 1);
        new createobj.Shape(myRect,-200, 300, 1, 300);

        new createobj.Shape(myRect,[-200,-250,-200], [550,600,600]);
        new createobj.Shape(myRect,[-500,-450,-500], [550,600,600]);

        new createobj.Shape(myRect,[-250,-200,-200], [300,350,300]);
        new createobj.Shape(myRect,[-450,-500,-500], [300,300,350]);




        new createobj.Questionblock(myRect,-360, 560, 20, 20,{questiontexturtext:"right",option:[["Gravi",{x:5000,y:0,w:1,h:2800},[0,myGravi]],]})
        new createobj.Questionblock(myRect,-480, 440, 20, 20,{questiontexturtext:"down",option:[["Gravi",{x:0,y:5000,w:2800,h:1},[0,myGravi]],]})
        new createobj.Questionblock(myRect,-360, 320, 20, 20,{questiontexturtext:"left",option:[["Gravi",{x:-5000,y:0,w:1,h:2800},[0,myGravi]],]})
        new createobj.Questionblock(myRect,-250, 440, 20, 20,{questiontexturtext:"up",option:[["Gravi",{x:0,y:-5000,w:2800,h:1},[0,myGravi]],]})

        new createobj.Pipe(myRect,-390,600,20,2,{wx:-390,wy:695,ro:2});
        new createobj.Pipe(myRect,-330,720,20,20,{wx:-330,wy:565,ro:2});

        new createobj.Questionblock(myRect,-400, 560, 20, 20,{questiontexturtext:"middle",option:[["Gravi",{x:-349,y:449,w:2,h:2,stärke:0.1},[0,myGravi]],]})

        new createobj.Pipe(myRect,-360,440,20,20,{wx:-360,wy:610,ro:0});
        new createobj.Questionblock(myRect,-360, 640, 20, 20,{questiontexturtext:"down",option:[["Gravi",{x:0,y:5000,w:2800,h:1},[0,myGravi]],]})


        new createobj.Questionblock(myRect,1400, 670, 20, 20,{questiontexturtext:"b-hole",option:[["Gravi",{x:3000,y:800,w:1,h:1,abfac:0.001},[0,myGravi]],]})
        new createobj.Pipe(myRect,900,700,30,20,{wx:1200,wy:700,ro:2});
        new createobj.Pipe(myRect,1200,700,30,20,{wx:900,wy:700,ro:2});

        new createobj.Pipe(myRect,0,700,30,20,{wx:0,wy:1340,ro:2});


        new createobj.Grass(myRect,-2000, 1420, 4000, 1);
        new createobj.Pipe(myRect,0,1400,30,20,{wx:50,wy:2140,ro:2});
        new createobj.Pipe(myRect,50,1400,30,20,{wx:0,wy:640,ro:2});
        new createobj.Wasser(myRect,200, 1000, 1000, 420,{phy:true});

        new createobj.Shape(myRect,-1001,1000,1,390);
        new createobj.Wasser(myRect,-1000, 1000, 600, 420,{phy:false,allblue:true});
        new createobj.Shape(myRect,-401,1000,1,390);
        //new createobj.Enemy(myRect,-601,1200,20,20,{type:"fish",kitype:4});


        new createobj.Grass(myRect,0, 2120, 5001, 10);
        new createobj.Pipe(myRect,50,2100,30,20,{wx:0,wy:1340,ro:2});


        new createobj.Specialblock(myRect,-1500, 690, 100, 10, {type:"breakingblock",static:false,option:[5,5]});
        new createobj.Specialblock(myRect,-1300, 690, 100, 10, {type:"movingblock",static:false,option:[-1300, 690,-1100, 690]});
        console.info("loaded map 0")
    }
    if(num==1||num=="all"){
        namemap(1,"empty map")
        new createobj.Gravi(myGravi,0, 5000, 2800, 1);
        new createobj.Player(myRect,20,660, 10, 15);
        new createobj.Grass(myRect,0, 720, 100, 10);

        new createobj.Grass(myRect,2500,710,300,10);
        new createobj.Finish(myRect,2600,610,100,100);
        console.info("loaded map 1")
    }
    if(num==2||num=="all"){
        namemap(2,"grasstest")
        new createobj.Gravi(myGravi,0, 5000, 2800, 1);
        new createobj.Sun(mySun,300, -100, 500, 50);
        new createobj.Player(myRect,20,660, 10, 15);
        new createobj.Grass(myRect,0, 710, 1000, 10);
        new createobj.Grassani(myRect,0, 20, 1000, 1);
        new createobj.Grassani(myRect,0, 40, 1000, 1);
        new createobj.Grassani(myRect,0, 60, 1000, 1);
        new createobj.Grassani(myRect,0, 80, 1000, 1);
        new createobj.Grassani(myRect,0, 100, 1000, 1);
        new createobj.Grassani(myRect,0, 120, 1000, 1);
        new createobj.Grassani(myRect,0, 140, 1000, 1);
        new createobj.Grassani(myRect,0, 160, 1000, 1);
        new createobj.Grassani(myRect,0, 180, 1000, 1);
        new createobj.Grassani(myRect,0, 200, 1000, 1);
        new createobj.Grassani(myRect,0, 220, 1000, 1);
        new createobj.Grassani(myRect,0, 240, 1000, 1);
        new createobj.Grassani(myRect,0, 260, 1000, 1);
        new createobj.Grassani(myRect,0, 280, 1000, 1);
        new createobj.Grassani(myRect,0, 300, 1000, 1);
        new createobj.Grassani(myRect,0, 320, 1000, 1);
        new createobj.Grassani(myRect,0, 340, 1000, 1);
        new createobj.Grassani(myRect,0, 360, 1000, 1);
        new createobj.Grassani(myRect,0, 380, 1000, 1);
        new createobj.Grassani(myRect,0, 400, 1000, 1);
        new createobj.Grassani(myRect,0, 420, 1000, 1);
        new createobj.Grassani(myRect,0, 440, 1000, 1);
        new createobj.Grassani(myRect,0, 460, 1000, 1);
        new createobj.Grassani(myRect,0, 480, 1000, 1);
        new createobj.Grassani(myRect,0, 500, 1000, 1);
        new createobj.Grassani(myRect,0, 520, 1000, 1);
        new createobj.Grassani(myRect,0, 540, 1000, 1);
        new createobj.Grassani(myRect,0, 560, 1000, 1);
        new createobj.Grassani(myRect,0, 580, 1000, 1);
        new createobj.Grassani(myRect,0, 600, 1000, 1);
        new createobj.Grassani(myRect,0, 620, 1000, 1);
        new createobj.Grassani(myRect,0, 640, 1000, 1);
        new createobj.Grassani(myRect,0, 660, 1000, 1);
        new createobj.Grassani(myRect,0, 680, 1000, 1);
        new createobj.Grassani(myRect,0, 700, 1000, 1);
        new createobj.Grassani(myRect,0, 720, 1000, 1);
        new createobj.Grassani(myRect,0, 740, 1000, 1);
        new createobj.Grassani(myRect,0, 760, 1000, 1);
        new createobj.Grassani(myRect,0, 780, 1000, 1);
        console.info("loaded map 2")
    }
    if(num==3||num=="all"){
        namemap(3,"small grass")
        new createobj.Gravi(myGravi,0, 5000, 2800, 1);
        new createobj.Sun(mySun,300, 10, 500, 50);
        new createobj.Player(myRect,20,660, 10, 15);
        new createobj.Grass(myRect,-200, 710, 600, 10);
        new createobj.Grassani(myRect,100, 709, 200, 1);
    }
    if(num==4||num=="all"){
        namemap(4,"demo")
        new createobj.Gravi(myGravi,0, 5000, 2800, 1);
        new createobj.Sun(mySun,300, 10, 500, 50);
        new createobj.Player(myRect,20,660, 10, 15);
        new createobj.Grass(myRect,0, 710, 200, 10);
        new createobj.Grassani(myRect,0, 709, 200, 1);

        new createobj.Grass(myRect,200, 690, 500, 30);
        new createobj.Grassani(myRect,200, 689, 500, 1);
        new createobj.Grass(myRect,700, 710, 300, 10);
        new createobj.Grassani(myRect,700, 709, 300, 1);
        new createobj.Shape(myRect,400, 650, 100, 10, {fill:"gray",dest:true});
        new createobj.Shape(myRect,500, 650, 100, 10, {fill:"#333"});
        new createobj.Grass(myRect,1000, 710, 100, 10);
        new createobj.Grassani(myRect,1000, 709, 100, 1);

        new createobj.Grass(myRect,[1100,1100,1150,1400,1500,1500,1100], [720,710,705,500,500,720,720],{texturrichtung:[0,1,2,3,4]})
        new createobj.Grassani(myRect,[1100,1100,1150,1400,1500,1500], [720,710,705,500,500,720],{texturrichtung:[0,1,2,3,4]});
        new createobj.Specialblock(myRect,1500, 500, 100, 10, {type:"breakingblock",static:false,option:[5,5]});
        new createobj.Grass(myRect,1600,500,100,10);
        new createobj.Grassani(myRect,1600, 499, 100, 1);
        new createobj.Shape(myRect,1500,710,200,10,{fill:"#333"});
        new createobj.Pipe(myRect,1670,690,30,20,{wx:900,wy:670,ro:2});
        new createobj.Grass(myRect,1700,500,300,220);
        new createobj.Grassani(myRect,1700, 499, 300, 1);
        new createobj.Questionblock(myRect,1750, 440, 30, 30)
        new createobj.Shape(myRect,1800,440,30,30,{fill:"Blue",type:"waypoint"});
        new createobj.Grass(myRect,2000,710,400,10);
        new createobj.Grassani(myRect,2000, 709, 400, 1);
        new createobj.Enemy(myRect,2200,680,20,20,{fill:"Red",md:2,kitype:1,dir:1});
        new createobj.Dead(myRect,2400,719,100,1);
        new createobj.Grass(myRect,2500,710,300,10);
        new createobj.Grassani(myRect,2500, 710, 300, 1);
        new createobj.Finish(myRect,2600,610,100,100);
        console.info("loaded map 3")
    }
    canrungame=true
    console.groupEnd()
}
function namemap(num,name){
    myRect[num]=[]
    mySun[num]=[]
    myFire[num]=[]
    myGravi[num]=[]
    mapinfo[num]={
        mapname:name,
        static:true,
        cha:[],
        date:[]
    }
    loadmap=num
}
promallres[8]()