/*=========================================================
YUKTHI TECHNOLOGIES
theme.js
Version : 1.0
Phase   : 1
=========================================================*/

"use strict";

/*=========================================================
DOM ELEMENTS
=========================================================*/

const html = document.documentElement;

const themeToggle = document.querySelector("#theme-toggle");

const themeIcon = document.querySelector("#theme-icon");

/*=========================================================
AVAILABLE THEMES
=========================================================*/

const THEMES = {

    LIGHT: "light",

    DARK: "dark"

};

/*=========================================================
GET SAVED THEME
=========================================================*/

function getSavedTheme(){

    return localStorage.getItem("yt-theme");

}

/*=========================================================
SAVE THEME
=========================================================*/

function saveTheme(theme){

    localStorage.setItem(

        "yt-theme",

        theme

    );

}

/*=========================================================
SET THEME
=========================================================*/

function setTheme(theme){

    html.setAttribute(

        "data-theme",

        theme

    );

    saveTheme(theme);

    updateIcon(theme);

}

/*=========================================================
UPDATE ICON
=========================================================*/

function updateIcon(theme){

    if(!themeIcon) return;

    if(theme===THEMES.DARK){

        themeIcon.innerHTML="☀️";

    }

    else{

        themeIcon.innerHTML="🌙";

    }

}

/*=========================================================
TOGGLE
=========================================================*/

function toggleTheme(){

    const current=

    html.getAttribute("data-theme");

    const next=

    current===THEMES.DARK

    ?THEMES.LIGHT

    :THEMES.DARK;

    setTheme(next);

}

/*=========================================================
SYSTEM PREFERENCE
=========================================================*/

function systemTheme(){

    return window.matchMedia(

        "(prefers-color-scheme: dark)"

    ).matches

    ?THEMES.DARK

    :THEMES.LIGHT;

}

/*=========================================================
INITIALIZE
=========================================================*/

function initTheme(){

    const saved=getSavedTheme();

    if(saved){

        setTheme(saved);

    }

    else{

        setTheme(systemTheme());

    }

}

/*=========================================================
BUTTON
=========================================================*/

themeToggle?.addEventListener(

"click",

toggleTheme

);

/*=========================================================
SYSTEM CHANGE
=========================================================*/

window.matchMedia(

"(prefers-color-scheme: dark)"

).addEventListener(

"change",

(event)=>{

if(!getSavedTheme()){

setTheme(

event.matches

?THEMES.DARK

:THEMES.LIGHT

);

}

}

);

/*=========================================================
LOAD
=========================================================*/

document.addEventListener(

"DOMContentLoaded",

initTheme

);

/*=========================================================
END
=========================================================*/

console.log("theme.js Phase 1 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
theme.js
Phase 2
Accent Colors & Theme Settings
=========================================================*/

"use strict";

/*=========================================================
COLOR PALETTE
=========================================================*/

const COLORS = {

    blue: "#2563EB",
    purple: "#7C3AED",
    green: "#10B981",
    red: "#EF4444",
    orange: "#F97316",
    cyan: "#06B6D4",
    pink: "#EC4899",
    indigo: "#4F46E5"

};

/*=========================================================
SET ACCENT COLOR
=========================================================*/

function setAccentColor(color){

    document.documentElement.style.setProperty(

        "--primary",

        color

    );

    document.documentElement.style.setProperty(

        "--primary-light",

        color

    );

    saveAccent(color);

}

/*=========================================================
SAVE ACCENT
=========================================================*/

function saveAccent(color){

    localStorage.setItem(

        "yt-accent",

        color

    );

}

/*=========================================================
GET ACCENT
=========================================================*/

function getAccent(){

    return localStorage.getItem(

        "yt-accent"

    );

}

/*=========================================================
LOAD SAVED COLOR
=========================================================*/

function loadAccent(){

    const saved=getAccent();

    if(saved){

        setAccentColor(saved);

    }

}

/*=========================================================
COLOR BUTTONS
=========================================================*/

document.querySelectorAll("[data-color]")

.forEach(button=>{

button.addEventListener("click",()=>{

setAccentColor(

button.dataset.color

);

});

});

/*=========================================================
RESET SETTINGS
=========================================================*/

function resetTheme(){

localStorage.removeItem("yt-theme");

localStorage.removeItem("yt-accent");

location.reload();

}

/*=========================================================
RESET BUTTON
=========================================================*/

document

.querySelector("#reset-theme")

?.addEventListener(

"click",

resetTheme

);

/*=========================================================
SMOOTH TRANSITION
=========================================================*/

function smoothTransition(){

document.body.classList.add(

"theme-transition"

);

setTimeout(()=>{

document.body.classList.remove(

"theme-transition"

);

},400);

}

document

.querySelector("#theme-toggle")

?.addEventListener(

"click",

smoothTransition

);

/*=========================================================
THEME PANEL
=========================================================*/

const settingsPanel=

document.querySelector(

".theme-panel"

);

const settingsToggle=

document.querySelector(

"#theme-settings"

);

settingsToggle?.addEventListener(

"click",

()=>{

settingsPanel?.classList.toggle(

"active"

);

});

/*=========================================================
CLICK OUTSIDE PANEL
=========================================================*/

document.addEventListener(

"click",

(event)=>{

if(

settingsPanel &&

!settingsPanel.contains(event.target) &&

event.target!==settingsToggle

){

settingsPanel.classList.remove(

"active"

);

}

});

/*=========================================================
LOAD SAVED ACCENT
=========================================================*/

document.addEventListener(

"DOMContentLoaded",

loadAccent

);

/*=========================================================
END PHASE 2
=========================================================*/

console.log(

"theme.js Phase 2 Loaded"

);
/*=========================================================
YUKTHI TECHNOLOGIES
theme.js
Phase 3
Final Theme Engine
=========================================================*/

"use strict";

/*=========================================================
AUTO THEME BY TIME
=========================================================*/

function autoThemeByTime(){

    const hour = new Date().getHours();

    if(getSavedTheme()) return;

    if(hour >= 18 || hour <= 6){

        setTheme(THEMES.DARK);

    }else{

        setTheme(THEMES.LIGHT);

    }

}

/*=========================================================
EXPORT SETTINGS
=========================================================*/

function exportTheme(){

    const settings = {

        theme: getSavedTheme() || THEMES.LIGHT,

        accent: getAccent() || COLORS.blue,

        exported: new Date().toISOString()

    };

    const blob = new Blob(

        [JSON.stringify(settings,null,2)],

        {type:"application/json"}

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "yukthi-theme.json";

    a.click();

    URL.revokeObjectURL(url);

}

/*=========================================================
IMPORT SETTINGS
=========================================================*/

function importTheme(file){

    const reader = new FileReader();

    reader.onload = function(e){

        try{

            const settings = JSON.parse(e.target.result);

            if(settings.theme){

                setTheme(settings.theme);

            }

            if(settings.accent){

                setAccentColor(settings.accent);

            }

            showToast?.("Theme Imported Successfully");

        }

        catch{

            alert("Invalid Theme File");

        }

    };

    reader.readAsText(file);

}

/*=========================================================
IMPORT BUTTON
=========================================================*/

const importInput =

document.querySelector("#theme-import");

importInput?.addEventListener("change",function(){

    if(this.files.length){

        importTheme(this.files[0]);

    }

});

/*=========================================================
EXPORT BUTTON
=========================================================*/

document

.querySelector("#theme-export")

?.addEventListener(

"click",

exportTheme

);

/*=========================================================
THEME PRESETS
=========================================================*/

const presets = {

    ocean:{
        accent:"#06B6D4",
        theme:"light"
    },

    midnight:{
        accent:"#4F46E5",
        theme:"dark"
    },

    emerald:{
        accent:"#10B981",
        theme:"light"
    },

    sunset:{
        accent:"#F97316",
        theme:"light"
    }

};

document.querySelectorAll("[data-preset]")

.forEach(button=>{

button.addEventListener("click",()=>{

const preset = presets[button.dataset.preset];

if(!preset) return;

setAccentColor(preset.accent);

setTheme(preset.theme);

});

});

/*=========================================================
SYSTEM THEME WATCHER
=========================================================*/

const mediaQuery =

window.matchMedia(

"(prefers-color-scheme: dark)"

);

mediaQuery.addEventListener(

"change",

(event)=>{

if(!getSavedTheme()){

setTheme(

event.matches

?THEMES.DARK

:THEMES.LIGHT

);

}

});

/*=========================================================
THEME UTILITIES
=========================================================*/

window.Theme={

setTheme,

toggleTheme,

setAccentColor,

getSavedTheme,

exportTheme,

resetTheme

};

/*=========================================================
INITIALIZATION
=========================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

autoThemeByTime();

loadAccent();

console.log(

"%cTheme Engine Ready",

"color:#2563EB;font-size:16px;font-weight:bold;"

);

});

/*=========================================================
END OF THEME.JS
=========================================================*/