// @ts-check
'use strict';
switch(language=="auto"?(window.navigator.languages?window.navigator.languages[0]:navigator.language||navigator.browserLanguage||navigator.userLanguage||"en").replace(/[-_].*/,""):language) {
    case "de":
    tooltips={
        start:"zurück",
        ok:"ok",
        true:"wahr",
        false:"falsch",
        loadandsave:{
            reload:"neuladen",
            remove:"löschen",
            duplicate:"verdoppeln",
            save:"speichern",
            save_localstorage:"speichern zu localstorage",
            load_localstorage:"localstorage item zum laden",
        },
        keymap:{
            save:"speichern",
            load:"laden",
            pressedkeys:"Gedrückte tasten",
            custom:"Benutzerdefiniert",
            explain:"alle tasten haben in diesem Spiel eine Zahl, (<a href=\"https://keycode.info\">https://keycode.info</a>), nach der zahl 350 werden controller axen and knöpfe zu einer zahl gemappt axen haben 1 zahl für positiv und 1 zahl für negativ",
            preset:"Vordefiniert",
            keyname:"map  arr  min  max  actmin  actmax",
            placeholder:"drücke eine taste",
            presets:{

            },
            presetsname:{
                default:"Standart",
                AD_Shift_Space:"AD_Shift_Leertaste",
                mouse:"Maus"
            },
            keys:[
                "1key zu vielen tasten mapping",
                "knopf typen",
                "minmum punkte nach dem taste gedrückt ist",
                "maximal punkte für taste gedrückt ist",
                "punkt of keypressing to minimal pres",
                "nicht gedrückt",
                "voll gedrückt"
            ]
        },
        buttom:{
            keymap:"ändert gebrauchte tasten die für das spiel notwändig sind zu anderen tasten oder controller",
            settings:"ändert einstellungen zb wie das spiel aussieht wie es lägt und wie viel",
            save:"speichern und laden von levels und löschen von geladenen levels",
            start:"startet das spiel ich hoffe das du weist wie das spiel functioniert",
            build:"ändern der map (cheater!) und erstellung neuer levels",
            webrtc:"verbinden mit anderen spielern"
        },
        buttomname:{
            keymap:"tastatur layout",
            save:"Laden&Speichern",
            settings:"Einstellungen",
            build:"Baumodus",
            webrtc:"Webrtc"
        },
        settings:{
            nocollision:"kopf durch die wand",
            shadowblurtype:"0ctx.shadowblur 1canvas.style.filter 2ctx.filter"
        },
        settingsname:{
            language:"Sprache",
            imageSmoothingEnabled:"Bildglättung",
            allowedmaxfps:"erlaubte maximal fps stuffen",
            shadows:"Schatten",
            maxshadow:"maximalle schatten länge",
            sunnlineofsight:"Schatten nur anzeigen wen licht nicht geblockt ist",
            rumble:"vibration",
            rumbletype:"Vibrations art",
            camoffsx:"Camera offset x",
            camoffsy:"Camera offset y",
            maxshadowlevel:"maximale schattenqualität",
            maxstaticshadowlevel:"maximale statische schattenqualität",
            enableaudio:"activiere geräusche",
            Fullscreen:"Vollbild",
            maxdistcol:"minimale distanz die spiel kuckt",
            buildmenuboarder:"bau menü bewegungsrand",
            inversekinematics:"Knochenbewegung",
            bonescolor:"Knochentextur anzeigen",
            renderallinstand:"zeiche alles sofort (statt über mehreren frames)",
            debtextabfac:"debug text abnahme factor",
            debtextavgabfac:"debug text durchschnits abnahme factor",
            fishmapreset:"fisch collisions map actualisierungszeit",
            zoom:"Zoom",
            suppixel:"suppixel renderer",
            debug:"Debug",
            wasserphysik:"Wasser physik",
            playertexturanimation:"Spieler textur animation"
        },
    }
    break;
    default:
    tooltips={
        start:"Back",
        ok:"ok",
        loadandsave:{
            save_localstorage:"save to localstorage",
            load_localstorage:"localstorage item to load",
        },
        keymap:{
            custom:"custom",
            explain:"all keys have a number in this game, (<a href=\"https://keycode.info\">https://keycode.info</a>), after number 350 get controller axis and keys to keys gemappt axis have 1 key for positiv and 1 for negativ",
            preset:"presets",
            keyname:"map  min  max  actmin  actmax",
            presets:{
                
            },
            presetsname:{

            },
            keys:[
                "1key to many keys mapping",
                "button types",
                "minmum point after that key is pressed",
                "maximal point for key pressed",
                "point of keypressing to minimal pres",
                "nothing pressed value",
                "full pressed value"
            ]
        },
        buttom:{
            keymap:"edit keys needet for the game to other keys or controllers",
            settings:"edit settings like the game looks how it lags and how mutch its lags",
            save:"save and load maps and dell loadet games",
            start:"start the game hope you know how the game works",
            build:"edit (cheat) and create new levels",
            webrtc:"connect with other players"
        },
        buttomname:{

        },
        settings:{
            renderer:"0 canvas   1 svg   2 html  3 canvas webgl",
            Fullscreen:"toggle fullscreen mode",
            imageSmoothingEnabled:"smoving from scaled pictures",
            suppixel:"render small detailes",
            allowedmaxfps:"array of normaly used hz from monitors",
            m4xfps:"targetet fps from the game and not a bug",
            lenguage:"language of all  deDE enUS auto",
            shadowlimmiter:"no shadows were should be no shadows",
        },
        settingsname:{

        },
    }
}
promallres[9]()