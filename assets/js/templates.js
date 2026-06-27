/*=========================================================
YUKTHI TECHNOLOGIES
templates.js
Version : 1.0
Phase   : 1
=========================================================*/

"use strict";

/*=========================================================
DOM
=========================================================*/

const templateCards =
document.querySelectorAll(".template-card");

const searchInput =
document.querySelector("#template-search");

const filterButtons =
document.querySelectorAll("[data-category]");

const sortSelect =
document.querySelector("#template-sort");

/*=========================================================
SEARCH
=========================================================*/

searchInput?.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

templateCards.forEach(card=>{

const title=
card.querySelector(".template-title")
?.innerText.toLowerCase()||"";

const description=
card.querySelector("p")
?.innerText.toLowerCase()||"";

card.style.display=

title.includes(value)||
description.includes(value)

?"block"

:"none";

});

});

/*=========================================================
CATEGORY FILTER
=========================================================*/

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>

btn.classList.remove("active")

);

button.classList.add("active");

const category=

button.dataset.category;

templateCards.forEach(card=>{

if(

category==="all"||

card.dataset.category===category

){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

});

/*=========================================================
SORT
=========================================================*/

sortSelect?.addEventListener("change",()=>{

const grid=document.querySelector(".template-grid");

const cards=[...templateCards];

cards.sort((a,b)=>{

const option=sortSelect.value;

if(option==="price"){

return Number(

a.dataset.price

)-Number(

b.dataset.price

);

}

if(option==="name"){

return a.dataset.name.localeCompare(

b.dataset.name

);

}

if(option==="popular"){

return Number(

b.dataset.popular

)-Number(

a.dataset.popular

);

}

return 0;

});

cards.forEach(card=>{

grid.appendChild(card);

});

});

console.log("templates.js Phase 1 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
templates.js
Phase 2
Favorites & Preview
=========================================================*/

"use strict";

/*=========================================================
FAVORITES
=========================================================*/

let favorites = JSON.parse(

localStorage.getItem("yt-favorites") || "[]"

);

document.querySelectorAll(".favorite-btn")

.forEach(button=>{

button.addEventListener("click",()=>{

const card=

button.closest(".template-card");

const id=

card.dataset.id;

if(favorites.includes(id)){

favorites=favorites.filter(

item=>item!==id

);

button.classList.remove("active");

}else{

favorites.push(id);

button.classList.add("active");

}

localStorage.setItem(

"yt-favorites",

JSON.stringify(favorites)

);

});

});

/*=========================================================
LOAD FAVORITES
=========================================================*/

document.querySelectorAll(".template-card")

.forEach(card=>{

const id=card.dataset.id;

if(favorites.includes(id)){

card.querySelector(".favorite-btn")

?.classList.add("active");

}

});

/*=========================================================
QUICK PREVIEW
=========================================================*/

const previewModal=

document.querySelector("#template-preview");

const previewImage=

document.querySelector("#preview-image");

const previewTitle=

document.querySelector("#preview-title");

const previewDescription=

document.querySelector("#preview-description");

document.querySelectorAll(".preview-btn")

.forEach(button=>{

button.addEventListener("click",()=>{

const card=

button.closest(".template-card");

previewImage.src=

card.querySelector("img").src;

previewTitle.innerHTML=

card.dataset.name;

previewDescription.innerHTML=

card.dataset.description;

previewModal.classList.add("active");

});

});

document.querySelector("#preview-close")

?.addEventListener("click",()=>{

previewModal.classList.remove("active");

});

/*=========================================================
RECENTLY VIEWED
=========================================================*/

function saveRecent(card){

let recent=

JSON.parse(

localStorage.getItem(

"yt-recent"

)||"[]");

const id=

card.dataset.id;

recent=

recent.filter(item=>item!==id);

recent.unshift(id);

recent=recent.slice(0,8);

localStorage.setItem(

"yt-recent",

JSON.stringify(recent)

);

}

document.querySelectorAll(".template-card")

.forEach(card=>{

card.addEventListener("click",()=>{

saveRecent(card);

});

});

/*=========================================================
COPY DEMO LINK
=========================================================*/

document.querySelectorAll(".copy-link")

.forEach(button=>{

button.addEventListener("click",()=>{

const url=

button.dataset.url;

navigator.clipboard.writeText(url);

alert("Demo Link Copied");

});

});

/*=========================================================
SHARE
=========================================================*/

document.querySelectorAll(".share-btn")

.forEach(button=>{

button.addEventListener("click",async()=>{

const card=

button.closest(".template-card");

const title=

card.dataset.name;

const url=

button.dataset.url;

if(navigator.share){

try{

await navigator.share({

title,

url

});

}catch(e){

console.log(e);

}

}else{

navigator.clipboard.writeText(url);

alert("Link Copied");

}

});

});

/*=========================================================
FEATURED BADGE
=========================================================*/

document.querySelectorAll(".template-card")

.forEach(card=>{

if(Number(card.dataset.popular)>=90){

const badge=

document.createElement("span");

badge.className="featured-badge";

badge.innerHTML="🔥 Featured";

card.appendChild(badge);

}

});

/*=========================================================
RATINGS
=========================================================*/

document.querySelectorAll(".rating")

.forEach(rating=>{

const value=

Number(

rating.dataset.rating||5

);

let stars="";

for(let i=1;i<=5;i++){

stars+=

i<=value

?"★"

:"☆";

}

rating.innerHTML=stars;

});

/*=========================================================
END PHASE 2
=========================================================*/

console.log(

"templates.js Phase 2 Loaded"

);
/*=========================================================
YUKTHI TECHNOLOGIES
templates.js
Phase 3
Marketplace Pro Features
=========================================================*/

"use strict";

/*=========================================================
COMPARE TEMPLATES
=========================================================*/

let compareList = [];

const compareButtons =
document.querySelectorAll(".compare-btn");

compareButtons.forEach(button=>{

button.addEventListener("click",()=>{

const card = button.closest(".template-card");

const id = card.dataset.id;

if(compareList.includes(id)){

compareList = compareList.filter(item=>item!==id);

button.classList.remove("active");

}else{

if(compareList.length>=3){

alert("You can compare up to 3 templates.");

return;

}

compareList.push(id);

button.classList.add("active");

}

localStorage.setItem(

"yt-compare",

JSON.stringify(compareList)

);

updateCompareCounter();

});

});

function updateCompareCounter(){

const counter = document.querySelector("#compare-count");

if(counter){

counter.innerHTML = compareList.length;

}

}

/*=========================================================
TRENDING BADGE
=========================================================*/

document.querySelectorAll(".template-card")

.forEach(card=>{

const popularity =

Number(card.dataset.popular || 0);

if(popularity>=95){

const badge =

document.createElement("div");

badge.className="trending-badge";

badge.innerHTML="🔥 Trending";

card.appendChild(badge);

}

});

/*=========================================================
AI RECOMMENDATION
=========================================================*/

function recommendTemplate(){

let recommendation = "Business Website";

if(window.innerWidth<768){

recommendation="Mobile Optimized Template";

}

const box=document.querySelector(

"#ai-recommendation"

);

if(box){

box.innerHTML=

recommendation;

}

}

recommendTemplate();

/*=========================================================
VIEW COUNTER
=========================================================*/

document.querySelectorAll(".template-card")

.forEach(card=>{

const id = card.dataset.id;

let views = Number(

localStorage.getItem(

"view-"+id

)||0

);

card.addEventListener("click",()=>{

views++;

localStorage.setItem(

"view-"+id,

views

);

});

});

/*=========================================================
DISCOUNT BADGES
=========================================================*/

document.querySelectorAll(".template-card")

.forEach(card=>{

const price=

Number(card.dataset.price);

if(price>5000){

const sale=

document.createElement("span");

sale.className="discount-badge";

sale.innerHTML="10% OFF";

card.appendChild(sale);

}

});

/*=========================================================
PRICE RANGE FILTER
=========================================================*/

const priceFilter=

document.querySelector("#price-filter");

priceFilter?.addEventListener("input",()=>{

const max=

Number(priceFilter.value);

templateCards.forEach(card=>{

const price=

Number(card.dataset.price);

card.style.display=

price<=max

?"block"

:"none";

});

});

/*=========================================================
RESET FILTERS
=========================================================*/

document.querySelector("#reset-filters")

?.addEventListener("click",()=>{

searchInput.value="";

priceFilter.value=50000;

templateCards.forEach(card=>{

card.style.display="block";

});

});

/*=========================================================
MARKET ANALYTICS
=========================================================*/

const analytics={

views:0,

favorites:favorites.length,

compares:compareList.length

};

console.table(analytics);

/*=========================================================
RECENTLY VIEWED
=========================================================*/

const recentContainer=

document.querySelector("#recently-viewed");

if(recentContainer){

const recent=

JSON.parse(

localStorage.getItem(

"yt-recent"

)||"[]"

);

recentContainer.innerHTML=

recent.join(", ");

}

/*=========================================================
SCROLL TO TOP
=========================================================*/

const scrollTemplates=

document.querySelector(

"#scroll-templates"

);

scrollTemplates?.addEventListener(

"click",

()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*=========================================================
INITIALIZATION
=========================================================*/

updateCompareCounter();

recommendTemplate();

/*=========================================================
END OF FILE
=========================================================*/

console.log(

"%cTemplates Engine Ready",

"color:#2563EB;font-size:18px;font-weight:bold;"

);