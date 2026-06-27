/*=========================================================
YUKTHI TECHNOLOGIES
animations.js
Version : 1.0
Phase   : 1
=========================================================*/

"use strict";

/*=========================================================
REVEAL ANIMATION
=========================================================*/

const revealElements = document.querySelectorAll(
".reveal,.reveal-left,.reveal-right,.reveal-scale"
);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{
threshold:.15
});

revealElements.forEach(element=>{

revealObserver.observe(element);

});

/*=========================================================
FADE IN
=========================================================*/

const fadeElements =
document.querySelectorAll(".fade");

const fadeObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-in");

}

});

},{
threshold:.2
});

fadeElements.forEach(item=>{

fadeObserver.observe(item);

});

/*=========================================================
STAGGER EFFECT
=========================================================*/

document.querySelectorAll(".stagger")

.forEach(container=>{

const children = [...container.children];

children.forEach((child,index)=>{

child.style.transitionDelay =
`${index * 120}ms`;

});

});

/*=========================================================
ZOOM IN
=========================================================*/

const zoomElements =
document.querySelectorAll(".zoom");

const zoomObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("zoom-in");

}

});

},{
threshold:.25
});

zoomElements.forEach(item=>{

zoomObserver.observe(item);

});

/*=========================================================
ROTATE IN
=========================================================*/

const rotateElements =
document.querySelectorAll(".rotate");

const rotateObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("rotate-in");

}

});

},{
threshold:.2
});

rotateElements.forEach(item=>{

rotateObserver.observe(item);

});

/*=========================================================
FLOAT ANIMATION
=========================================================*/

document.querySelectorAll(".float")

.forEach(item=>{

item.style.animationPlayState="running";

});

/*=========================================================
HOVER GLOW
=========================================================*/

document.querySelectorAll(".glow")

.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.classList.add("active");

});

card.addEventListener("mouseleave",()=>{

card.classList.remove("active");

});

});

/*=========================================================
PAGE TRANSITION
=========================================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

/*=========================================================
END PHASE 1
=========================================================*/

console.log("animations.js Phase 1 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
animations.js
Phase 2
Premium Motion Effects
=========================================================*/

"use strict";

/*=========================================================
PARALLAX SCROLL
=========================================================*/

const parallaxItems = document.querySelectorAll("[data-parallax]");

window.addEventListener("scroll", () => {

    const scroll = window.pageYOffset;

    parallaxItems.forEach(item => {

        const speed = parseFloat(item.dataset.parallax) || 0.2;

        item.style.transform =
            `translateY(${scroll * speed}px)`;

    });

});

/*=========================================================
FLOATING BLOBS
=========================================================*/

const blobs = document.querySelectorAll(".hero-blob");

window.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    blobs.forEach((blob, index) => {

        const factor = (index + 1) * 0.5;

        blob.style.transform =
            `translate(${x * factor}px, ${y * factor}px)`;

    });

});

/*=========================================================
HERO PARTICLE MOTION
=========================================================*/

const particles = document.querySelectorAll(".hero-particle");

particles.forEach((particle,index)=>{

    let angle = index * 60;

    function animate(){

        angle += 0.01;

        particle.style.transform =

        `translateY(${Math.sin(angle)*15}px)
         translateX(${Math.cos(angle)*15}px)`;

        requestAnimationFrame(animate);

    }

    animate();

});

/*=========================================================
MAGNETIC CARDS
=========================================================*/

document.querySelectorAll(".magnetic-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

card.style.transform =

`rotateY(${x/20}deg)
 rotateX(${-y/20}deg)
 scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*=========================================================
CURSOR SCALE
=========================================================*/

const cursorGlow = document.querySelector(".cursor-glow");

document.querySelectorAll("a,.btn,.card")

.forEach(item=>{

item.addEventListener("mouseenter",()=>{

if(cursorGlow){

cursorGlow.style.transform="scale(2)";

}

});

item.addEventListener("mouseleave",()=>{

if(cursorGlow){

cursorGlow.style.transform="scale(1)";

}

});

});

/*=========================================================
SCROLL PROGRESS GLOW
=========================================================*/

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll",()=>{

if(progressBar){

const hue =

(window.scrollY/15)%360;

progressBar.style.boxShadow=

`0 0 20px hsl(${hue},100%,60%)`;

}

});

/*=========================================================
BUTTON FLOAT
=========================================================*/

document.querySelectorAll(".btn")

.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform=

"translateY(-4px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="";

});

});

/*=========================================================
IMAGE TILT
=========================================================*/

document.querySelectorAll(".image-tilt")

.forEach(image=>{

image.addEventListener("mousemove",(e)=>{

const rect=image.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateX=

-(y-rect.height/2)/20;

const rotateY=

(x-rect.width/2)/20;

image.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

});

image.addEventListener("mouseleave",()=>{

image.style.transform="";

});

});

/*=========================================================
COUNTER FADE
=========================================================*/

document.querySelectorAll(".counter")

.forEach(counter=>{

counter.addEventListener("animationend",()=>{

counter.classList.add("finished");

});

});

/*=========================================================
AUTO FLOATING ICONS
=========================================================*/

document.querySelectorAll(".floating-icon")

.forEach((icon,index)=>{

icon.style.animationDelay=

`${index*0.4}s`;

});

/*=========================================================
END PHASE 2
=========================================================*/

console.log("animations.js Phase 2 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
animations.js
Phase 3
Final Animation Engine
=========================================================*/

"use strict";

/*=========================================================
SPARKLE EFFECT
=========================================================*/

const sparkleContainer = document.querySelector(".sparkle-container");

if(sparkleContainer){

document.addEventListener("mousemove",(e)=>{

const sparkle=document.createElement("span");

sparkle.className="sparkle";

sparkle.style.left=e.pageX+"px";
sparkle.style.top=e.pageY+"px";

sparkleContainer.appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},700);

});

}

/*=========================================================
SECTION HOVER LIFT
=========================================================*/

document.querySelectorAll("section")

.forEach(section=>{

section.addEventListener("mouseenter",()=>{

section.classList.add("section-hover");

});

section.addEventListener("mouseleave",()=>{

section.classList.remove("section-hover");

});

});

/*=========================================================
WAVE BACKGROUND
=========================================================*/

const waves=document.querySelectorAll(".wave");

let waveOffset=0;

function animateWave(){

waveOffset+=0.5;

waves.forEach((wave,index)=>{

wave.style.backgroundPositionX=

`${waveOffset*(index+1)}px`;

});

requestAnimationFrame(animateWave);

}

if(waves.length){

animateWave();

}

/*=========================================================
SCROLL SNAP ANIMATION
=========================================================*/

const snapSections=document.querySelectorAll(".snap-section");

const snapObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("snap-active");

}

});

},{

threshold:.4

});

snapSections.forEach(section=>{

snapObserver.observe(section);

});

/*=========================================================
HERO BACKGROUND ROTATION
=========================================================*/

const heroBackground=document.querySelector(".hero-bg");

let rotate=0;

function rotateBackground(){

if(heroBackground){

rotate+=0.02;

heroBackground.style.transform=

`rotate(${rotate}deg)`;

}

requestAnimationFrame(rotateBackground);

}

rotateBackground();

/*=========================================================
FLOATING SHAPES
=========================================================*/

document.querySelectorAll(".floating-shape")

.forEach((shape,index)=>{

let angle=index*40;

function move(){

angle+=0.01;

shape.style.transform=

`translate(
${Math.cos(angle)*18}px,
${Math.sin(angle)*18}px)`;

requestAnimationFrame(move);

}

move();

});

/*=========================================================
PAGE TRANSITION
=========================================================*/

window.addEventListener("beforeunload",()=>{

document.body.classList.add(

"page-exit"

);

});

/*=========================================================
REDUCED MOTION SUPPORT
=========================================================*/

const reduceMotion=

window.matchMedia(

"(prefers-reduced-motion: reduce)"

);

if(reduceMotion.matches){

document.querySelectorAll("*")

.forEach(element=>{

element.style.animation="none";
element.style.transition="none";

});

}

/*=========================================================
PERFORMANCE
=========================================================*/

const animatedElements=

document.querySelectorAll(

".float,.hero-particle,.floating-icon"

);

window.addEventListener("blur",()=>{

animatedElements.forEach(item=>{

item.style.animationPlayState="paused";

});

});

window.addEventListener("focus",()=>{

animatedElements.forEach(item=>{

item.style.animationPlayState="running";

});

});

/*=========================================================
ANIMATION UTILITIES
=========================================================*/

function addAnimation(

element,

animation

){

element.classList.add(animation);

}

function removeAnimation(

element,

animation

){

element.classList.remove(animation);

}

window.AnimationUtils={

addAnimation,

removeAnimation

};

/*=========================================================
FPS LOGGER (DEV)
=========================================================*/

let lastTime=performance.now();

let frames=0;

function fpsCounter(){

frames++;

const now=performance.now();

if(now-lastTime>=1000){

console.log(

`FPS: ${frames}`

);

frames=0;

lastTime=now;

}

requestAnimationFrame(fpsCounter);

}

if(location.hostname==="localhost"){

fpsCounter();

}

/*=========================================================
END OF ANIMATIONS.JS
=========================================================*/

console.log(

"%cAnimations Engine Ready",

"color:#7C3AED;font-size:16px;font-weight:bold;"

);