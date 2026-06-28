console.log('Yukthi Technologies');/*=========================================================
YUKTHI TECHNOLOGIES
main.js
Version : 1.0
Phase   : 1
=========================================================*/

"use strict";

/*=========================================================
DOM ELEMENTS
=========================================================*/

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const scrollTop = document.querySelector(".scroll-top");
const progressBar = document.querySelector(".scroll-progress");

/*=========================================================
PAGE LOADER
=========================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".page-loader");

    if(loader){

        setTimeout(()=>{

            loader.classList.add("hide");

        },700);

    }

});

/*=========================================================
STICKY HEADER
=========================================================*/

function stickyHeader(){

    if(window.scrollY > 80){

        header?.classList.add("scrolled");

    }else{

        header?.classList.remove("scrolled");

    }

}

/*=========================================================
SCROLL PROGRESS
=========================================================*/

function scrollProgress(){

    if(!progressBar) return;

    const scrollTopPos = document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTopPos / height) * 100;

    progressBar.style.width = progress + "%";

}

/*=========================================================
BACK TO TOP
=========================================================*/

function toggleScrollButton(){

    if(!scrollTop) return;

    if(window.scrollY > 500){

        scrollTop.classList.add("active");

    }else{

        scrollTop.classList.remove("active");

    }

}

scrollTop?.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================================
MOBILE MENU
=========================================================*/

function openMenu(){

    mobileMenu?.classList.add("active");

    overlay?.classList.add("active");

}

function closeMenu(){

    mobileMenu?.classList.remove("active");

    overlay?.classList.remove("active");

}

menuToggle?.addEventListener("click",()=>{

    if(mobileMenu.classList.contains("active")){

        closeMenu();

    }else{

        openMenu();

    }

});

overlay?.addEventListener("click",closeMenu);

/*=========================================================
SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

        closeMenu();

    });

});

/*=========================================================
SCROLL EVENTS
=========================================================*/

window.addEventListener("scroll",()=>{

    stickyHeader();

    scrollProgress();

    toggleScrollButton();

});

/*=========================================================
ACTIVE NAVIGATION
=========================================================*/

const sections=document.querySelectorAll("section[id]");
const navLinks=document.querySelectorAll(".nav-links a");

function activeMenu(){

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        const height=section.offsetHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll",activeMenu);

/*=========================================================
REVEAL ON SCROLL
=========================================================*/

const revealItems=document.querySelectorAll(

".reveal,.reveal-left,.reveal-right,.reveal-scale"

);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{

threshold:.15

});

revealItems.forEach(item=>observer.observe(item));

/*=========================================================
CONSOLE
=========================================================*/

console.log(

"%cYUKTHI TECHNOLOGIES",

"color:#2563EB;font-size:20px;font-weight:bold"

);

console.log(

"Website Initialized Successfully"

);
/*=========================================================
YUKTHI TECHNOLOG=========
FAQ ACCORDION
=========================================================*/

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {

    const header = item.querySelector(".accordion-header");

    header?.addEventListener("click", () => {

        accordionItems.forEach(acc => {

            if(acc !== item){
                acc.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});

/*=========================================================
TABS
=========================================================*/

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        tabs.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        tab.classList.add("active");

        document
            .getElementById(target)
            ?.classList.add("active");

    });

});

/*=========================================================
COUNTER ANIMATION
=========================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let count = 0;

const speed = target / 120;

const update = () => {

count += speed;

if(count < target){

counter.innerText = Math.ceil(count);

requestAnimationFrame(update);

}else{

counter.innerText = target.toLocaleString();

}

};

update();

counterObserver.unobserve(counter);

}

});

},{threshold:.5});

counters.forEach(counter=>counterObserver.observe(counter));

/*=========================================================
LIGHTBOX
=========================================================*/

const galleryImages=document.querySelectorAll("[data-lightbox]");
const lightbox=document.querySelector(".lightbox");

if(lightbox){

const lightboxImage=lightbox.querySelector("img");

galleryImages.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.classList.add("active");

lightboxImage.src=image.src;

});

});

lightbox.addEventListener("click",()=>{

lightbox.classList.remove("active");

});

}

/*=========================================================
LAZY LOADING
=========================================================*/

const lazyImages=document.querySelectorAll("img[data-src]");

const lazyObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.src=img.dataset.src;

img.removeAttribute("data-src");

lazyObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>lazyObserver.observe(img));

/*=========================================================
COPY TO CLIPBOARD
=========================================================*/

document.querySelectorAll("[data-copy]").forEach(button=>{

button.addEventListener("click",()=>{

const value=button.dataset.copy;

navigator.clipboard.writeText(value);

button.innerText="Copied!";

setTimeout(()=>{

button.innerText="Copy";

},2000);

});

});

/*=========================================================
PRICING SWITCH
=========================================================*/

const pricingSwitch=document.querySelector("#pricing-switch");

pricingSwitch?.addEventListener("change",()=>{

document.querySelectorAll("[data-monthly]").forEach(price=>{

const monthly=price.dataset.monthly;
const yearly=price.dataset.yearly;

price.innerText=
pricingSwitch.checked
? yearly
: monthly;

});

});

/*=========================================================
SEARCH FILTER
=========================================================*/

const searchInput=document.querySelector("#template-search");

searchInput?.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".template-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=
text.includes(value)
?"block"
:"none";

});

});

/*=========================================================
ACTIVE YEAR
=========================================================*/

const year=document.querySelector("#year");

if(year){

year.innerText=new Date().getFullYear();

}

/*=========================================================
CONSOLE
=========================================================*/

console.log("Interactive Components Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
main.js
Phase 3
Premium UI Components
=========================================================*/

"use strict";

/*=========================================================
PORTFOLIO FILTER
=========================================================*/

const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioItems.forEach(item=>{

            if(filter==="all"){

                item.style.display="block";

                return;

            }

            if(item.dataset.category===filter){

                item.style.display="block";

            }else{

                item.style.display="none";

            }

        });

    });

});

/*=========================================================
AUTO TESTIMONIAL SLIDER
=========================================================*/

const testimonialContainer=document.querySelector(".testimonial-grid");

let testimonialIndex=0;

function autoTestimonial(){

    if(!testimonialContainer) return;

    const cards=testimonialContainer.children;

    if(cards.length<2) return;

    testimonialIndex++;

    if(testimonialIndex>=cards.length){

        testimonialIndex=0;

    }

    testimonialContainer.scrollTo({

        left:cards[testimonialIndex].offsetLeft,

        behavior:"smooth"

    });

}

setInterval(autoTestimonial,5000);

/*=========================================================
LOGO SLIDER PAUSE
=========================================================*/

const logoSlider=document.querySelector(".logo-slider");

if(logoSlider){

    logoSlider.addEventListener("mouseenter",()=>{

        logoSlider.style.animationPlayState="paused";

    });

    logoSlider.addEventListener("mouseleave",()=>{

        logoSlider.style.animationPlayState="running";

    });

}

/*=========================================================
HERO TYPEWRITER
=========================================================*/

const typingElement=document.querySelector(".typing-text");

if(typingElement){

const words=[

"Professional Websites",

"Business Solutions",

"Responsive Design",

"SEO Optimized",

"Fast Hosting"

];

let word=0;

let char=0;

let deleting=false;

function typeEffect(){

const current=words[word];

if(!deleting){

typingElement.textContent=current.substring(0,char++);

if(char>current.length){

deleting=true;

setTimeout(typeEffect,1500);

return;

}

}else{

typingElement.textContent=current.substring(0,char--);

if(char===0){

deleting=false;

word=(word+1)%words.length;

}

}

setTimeout(typeEffect,deleting?50:100);

}

typeEffect();

}

/*=========================================================
FLOATING WHATSAPP
=========================================================*/

const whatsapp=document.querySelector(".whatsapp-btn");

window.addEventListener("scroll",()=>{

if(!whatsapp) return;

if(window.scrollY>400){

whatsapp.style.opacity="1";

whatsapp.style.transform="scale(1)";

}else{

whatsapp.style.opacity=".8";

}

});

/*=========================================================
CONTACT FORM VALIDATION
=========================================================*/

const contactForm=document.querySelector("#contact form");

contactForm?.addEventListener("submit",function(e){

e.preventDefault();

const required=this.querySelectorAll("[required]");

let valid=true;

required.forEach(input=>{

if(input.value.trim()===""){

valid=false;

input.style.borderColor="#ef4444";

}else{

input.style.borderColor="#22c55e";

}

});

if(valid){

alert("Thank you! Your message has been received.");

this.reset();

}

});

/*=========================================================
KEYBOARD SHORTCUTS
=========================================================*/

document.addEventListener("keydown",(e)=>{

// ESC closes mobile menu

if(e.key==="Escape"){

closeMenu();

}

// HOME key

if(e.key==="Home"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

/*=========================================================
BUTTON LOADING
=========================================================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",()=>{

if(button.dataset.loading==="true"){

button.disabled=true;

const original=button.innerHTML;

button.innerHTML="Loading...";

setTimeout(()=>{

button.innerHTML=original;

button.disabled=false;

},1200);

}

});

});

/*=========================================================
RANDOM QUOTES
=========================================================*/

const quoteElement=document.querySelector(".daily-quote");

if(quoteElement){

const quotes=[

"Building the Future, One Website at a Time.",

"Your Business Deserves a Premium Website.",

"Designed for Growth. Built for Success.",

"Transforming Ideas into Digital Reality."

];

quoteElement.innerHTML=

quotes[Math.floor(Math.random()*quotes.length)];

}

/*=========================================================
PAGE VISITS
=========================================================*/

const visitCounter=document.querySelector("#visit-count");

if(visitCounter){

let visits=localStorage.getItem("yt-visits");

visits=visits?parseInt(visits)+1:1;

localStorage.setItem("yt-visits",visits);

visitCounter.innerHTML=visits;

}

/*=========================================================
END OF PHASE 3
=========================================================*/

console.log("main.js Phase 3 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
main.js
Phase 4
Advanced UX
=========================================================*/

"use strict";

/*=========================================================
AUTO HIDE HEADER
=========================================================*/

let lastScroll = 0;

window.addEventListener("scroll", () => {

    if (!header) return;

    const current = window.pageYOffset;

    if (current <= 0) {
        header.classList.remove("hide");
        return;
    }

    if (current > lastScroll && current > 120) {

        header.classList.add("hide");

    } else {

        header.classList.remove("hide");

    }

    lastScroll = current;

});

/*=========================================================
HEADER BLUR
=========================================================*/

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("glass");

    } else {

        header.classList.remove("glass");

    }

});

/*=========================================================
CURSOR GLOW
=========================================================*/

const cursor = document.querySelector(".cursor-glow");

if (cursor) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

}

/*=========================================================
BUTTON RIPPLE
=========================================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*=========================================================
MAGNET BUTTONS
=========================================================*/

document.querySelectorAll(".magnet").forEach(button => {

    button.addEventListener("mousemove", function (e) {

        const rect = this.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform =
            `translate(${x * 0.15}px,${y * 0.15}px)`;

    });

    button.addEventListener("mouseleave", function () {

        this.style.transform = "";

    });

});

/*=========================================================
PARALLAX
=========================================================*/

window.addEventListener("mousemove", (e) => {

    document.querySelectorAll("[data-parallax]").forEach(item => {

        const speed = item.dataset.parallax;

        const x = (window.innerWidth / 2 - e.clientX) * speed / 100;
        const y = (window.innerHeight / 2 - e.clientY) * speed / 100;

        item.style.transform =
            `translate(${x}px,${y}px)`;

    });

});

/*=========================================================
READING PROGRESS
=========================================================*/

const readingBar = document.querySelector(".reading-progress");

window.addEventListener("scroll", () => {

    if (!readingBar) return;

    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / total) * 100;

    readingBar.style.width = progress + "%";

});

/*=========================================================
SECTION HIGHLIGHT
=========================================================*/

const revealSections =
    document.querySelectorAll("section");

const sectionObserver =
new IntersectionObserver(entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("section-visible");

}

});

}, {

threshold: .2

});

revealSections.forEach(section => {

sectionObserver.observe(section);

});

/*=========================================================
COPY EMAIL
=========================================================*/

const emailLinks =
document.querySelectorAll(".copy-email");

emailLinks.forEach(link => {

link.addEventListener("click", (e) => {

e.preventDefault();

navigator.clipboard.writeText(

link.innerText

);

alert("Email copied!");

});

});

/*=========================================================
SMOOTH IMAGE APPEAR
=========================================================*/

const images =
document.querySelectorAll("img");

const imgObserver =
new IntersectionObserver(entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("fade-in");

imgObserver.unobserve(entry.target);

}

});

});

images.forEach(img => {

imgObserver.observe(img);

});

/*=========================================================
BACK TO TOP TOOLTIP
=========================================================*/

scrollTop?.setAttribute(

"title",

"Back To Top"

);

/*=========================================================
WINDOW RESIZE
=========================================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 1024) {

        closeMenu();

    }

});

/*=========================================================
END PHASE 4
=========================================================*/

console.log("main.js Phase 4 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
main.js
Phase 5
Final Engine
=========================================================*/

"use strict";

/*=========================================================
TOAST NOTIFICATION
=========================================================*/

function showToast(message, type = "success") {

    const container =
        document.querySelector(".toast-container");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = message;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 4000);

}

/*=========================================================
ONLINE / OFFLINE STATUS
=========================================================*/

window.addEventListener("online", () => {

    showToast("Internet connection restored.", "success");

});

window.addEventListener("offline", () => {

    showToast("You are currently offline.", "warning");

});

/*=========================================================
PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("Page Hidden");

    } else {

        console.log("Page Visible");

    }

});

/*=========================================================
IDLE DETECTION
=========================================================*/

let idleTimer;

function resetIdleTimer() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {

        console.log("User Idle");

    }, 300000);

}

["mousemove","keydown","scroll","touchstart"].forEach(event => {

    window.addEventListener(event, resetIdleTimer);

});

resetIdleTimer();

/*=========================================================
SESSION STORAGE HELPERS
=========================================================*/

function saveSession(key, value){

    sessionStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getSession(key){

    const value = sessionStorage.getItem(key);

    return value ? JSON.parse(value) : null;

}

/*=========================================================
LOCAL STORAGE HELPERS
=========================================================*/

function saveLocal(key, value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getLocal(key){

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;

}

/*=========================================================
COPY TEXT HELPER
=========================================================*/

async function copyText(text){

    try{

        await navigator.clipboard.writeText(text);

        showToast("Copied to Clipboard");

    }

    catch{

        showToast("Copy Failed","error");

    }

}

/*=========================================================
EMAIL VALIDATION
=========================================================*/

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/*=========================================================
PHONE VALIDATION
=========================================================*/

function validatePhone(phone){

    return /^[0-9]{10}$/.test(phone);

}

/*=========================================================
SCROLL TO ELEMENT
=========================================================*/

function scrollToElement(id){

    const element = document.querySelector(id);

    if(element){

        element.scrollIntoView({

            behavior:"smooth"

        });

    }

}

/*=========================================================
GLOBAL ERROR HANDLER
=========================================================*/

window.addEventListener("error",(event)=>{

    console.error(

        "Application Error:",

        event.message

    );

});

/*=========================================================
UNHANDLED PROMISES
=========================================================*/

window.addEventListener(

"unhandledrejection",

event=>{

console.error(

"Unhandled Promise:",

event.reason

);

});

/*=========================================================
NETWORK INFORMATION
=========================================================*/

if(navigator.connection){

console.log(

"Connection:",

navigator.connection.effectiveType

);

}

/*=========================================================
PERFORMANCE
=========================================================*/

window.addEventListener("load",()=>{

const timing=

performance.now().toFixed(0);

console.log(

`Loaded in ${timing} ms`

);

});

/*=========================================================
UTILITY HELPERS
=========================================================*/

const $ = selector =>
document.querySelector(selector);

const $$ = selector =>
document.querySelectorAll(selector);

/*=========================================================
APP INITIALIZER
=========================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

console.log(

"%cYukthi Technologies",

"color:#2563EB;font-size:18px;font-weight:bold;"

);

console.log(

"Website Ready."

);

});

/*=========================================================
EXPORTS
=========================================================*/

window.Yukthi={

showToast,

saveLocal,

getLocal,

saveSession,

getSession,

copyText,

scrollToElement,

validateEmail,

validatePhone

};

/*=========================================================
MAINTENANCE POPUP
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("maintenanceOverlay");
    const closeBtn = document.getElementById("closePopup");
    const continueBtn = document.getElementById("continueBtn");

    // If popup doesn't exist, do nothing
    if (!popup) return;

    function closePopup() {
        popup.style.opacity = "0";
        popup.style.pointerEvents = "none";

        setTimeout(() => {
            popup.style.display = "none";
        }, 500);

        localStorage.setItem("yt_popup_seen", "true");
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closePopup);
    }

    if (continueBtn) {
        continueBtn.addEventListener("click", closePopup);
    }

    // Auto close after 10 seconds
    setTimeout(closePopup, 10000);

});
/*=========================================================
END OF MAIN.JS
=========================================================*/