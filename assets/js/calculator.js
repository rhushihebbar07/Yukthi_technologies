/*=========================================================
YUKTHI TECHNOLOGIES
calculator.js
Version : 1.0
Phase   : 1
=========================================================*/

"use strict";

/*=========================================================
DOM ELEMENTS
=========================================================*/

const websiteType = document.querySelector("#website-type");
const hostingPlan = document.querySelector("#hosting-plan");
const totalPrice = document.querySelector("#total-price");
const quoteButton = document.querySelector("#get-quote");

/*=========================================================
BASE PRICES
=========================================================*/

const WEBSITE_PRICES = {

    basic:2999,

    business:5999,

    premium:9999,

    ecommerce:19999

};

const HOSTING_PRICES = {

    none:0,

    basic:999,

    business:2499,

    premium:4999

};

/*=========================================================
CURRENT STATE
=========================================================*/

let calculator = {

    website:"basic",

    hosting:"none",

    pages:5,

    seo:false,

    domain:false,

    maintenance:false,

    ssl:true

};

/*=========================================================
FORMAT PRICE
=========================================================*/

function formatPrice(value){

    return "₹" + value.toLocaleString("en-IN");

}

/*=========================================================
CALCULATE TOTAL
=========================================================*/

function calculatePrice(){

    let total = 0;

    total += WEBSITE_PRICES[calculator.website];

    total += HOSTING_PRICES[calculator.hosting];

    if(calculator.seo){

        total += 2000;

    }

    if(calculator.domain){

        total += 999;

    }

    if(calculator.maintenance){

        total += 2500;

    }

    if(calculator.pages>5){

        total +=

        (calculator.pages-5)*250;

    }

    updatePrice(total);

}

/*=========================================================
UPDATE UI
=========================================================*/

function updatePrice(price){

    if(!totalPrice) return;

    totalPrice.textContent =

    formatPrice(price);

}

/*=========================================================
WEBSITE CHANGE
=========================================================*/

websiteType?.addEventListener(

"change",

function(){

calculator.website=

this.value;

calculatePrice();

});

hostingPlan?.addEventListener(

"change",

function(){

calculator.hosting=

this.value;

calculatePrice();

});

/*=========================================================
INITIAL
=========================================================*/

calculatePrice();

console.log(

"calculator.js Phase 1 Loaded"

);
/*=========================================================
YUKTHI TECHNOLOGIES
calculator.js
Phase 2
Advanced Pricing
=========================================================*/

"use strict";

/*=========================================================
DOM ELEMENTS
=========================================================*/

const pageInput = document.querySelector("#page-count");
const seoOption = document.querySelector("#seo-option");
const domainOption = document.querySelector("#domain-option");
const maintenanceOption = document.querySelector("#maintenance-option");
const sslOption = document.querySelector("#ssl-option");

const couponInput = document.querySelector("#coupon-code");
const applyCoupon = document.querySelector("#apply-coupon");

const gstAmount = document.querySelector("#gst-amount");
const subtotalAmount = document.querySelector("#subtotal-amount");
const finalAmount = document.querySelector("#final-amount");

const resetButton = document.querySelector("#reset-calculator");

/*=========================================================
DISCOUNT CODES
=========================================================*/

const COUPONS = {

    "WELCOME10":10,

    "YUKTHI15":15,

    "STARTUP20":20

};

let discount = 0;

/*=========================================================
UPDATE STATE
=========================================================*/

pageInput?.addEventListener("input",()=>{

    calculator.pages =

    parseInt(pageInput.value)||5;

    calculatePrice();

});

seoOption?.addEventListener("change",()=>{

    calculator.seo = seoOption.checked;

    calculatePrice();

});

domainOption?.addEventListener("change",()=>{

    calculator.domain = domainOption.checked;

    calculatePrice();

});

maintenanceOption?.addEventListener("change",()=>{

    calculator.maintenance =

    maintenanceOption.checked;

    calculatePrice();

});

sslOption?.addEventListener("change",()=>{

    calculator.ssl = sslOption.checked;

    calculatePrice();

});

/*=========================================================
COUPON
=========================================================*/

applyCoupon?.addEventListener("click",()=>{

const code=

couponInput.value.trim().toUpperCase();

if(COUPONS[code]){

discount=COUPONS[code];

alert(

`${discount}% Discount Applied`

);

}else{

discount=0;

alert(

"Invalid Coupon"

);

}

calculatePrice();

});

/*=========================================================
RESET
=========================================================*/

resetButton?.addEventListener("click",()=>{

calculator={

website:"basic",

hosting:"none",

pages:5,

seo:false,

domain:false,

maintenance:false,

ssl:true

};

discount=0;

if(pageInput) pageInput.value=5;

if(seoOption) seoOption.checked=false;

if(domainOption) domainOption.checked=false;

if(maintenanceOption)

maintenanceOption.checked=false;

if(sslOption)

sslOption.checked=true;

if(couponInput)

couponInput.value="";

calculatePrice();

});

/*=========================================================
CALCULATE
=========================================================*/

function calculatePrice(){

let subtotal=0;

subtotal+=

WEBSITE_PRICES[calculator.website];

subtotal+=

HOSTING_PRICES[calculator.hosting];

if(calculator.pages>5){

subtotal+=

(calculator.pages-5)*250;

}

if(calculator.seo){

subtotal+=2000;

}

if(calculator.domain){

subtotal+=999;

}

if(calculator.maintenance){

subtotal+=2500;

}

if(!calculator.ssl){

subtotal+=500;

}

const discountAmount=

subtotal*(discount/100);

subtotal-=discountAmount;

const gst=subtotal*0.18;

const total=subtotal+gst;

updateSummary(

subtotal,

gst,

total

);

}

/*=========================================================
UPDATE SUMMARY
=========================================================*/

function updateSummary(

subtotal,

gst,

total

){

subtotalAmount &&

(subtotalAmount.innerHTML=

formatPrice(

Math.round(subtotal)

));

gstAmount &&

(gstAmount.innerHTML=

formatPrice(

Math.round(gst)

));

finalAmount &&

(finalAmount.innerHTML=

formatPrice(

Math.round(total)

));

updatePrice(

Math.round(total)

);

}

/*=========================================================
ANIMATE TOTAL
=========================================================*/

function animateValue(target){

if(!totalPrice) return;

let current=0;

const step=

target/60;

const timer=

setInterval(()=>{

current+=step;

if(current>=target){

current=target;

clearInterval(timer);

}

totalPrice.innerHTML=

formatPrice(

Math.round(current)

);

},16);

}

/*=========================================================
OVERRIDE
=========================================================*/

function updatePrice(price){

animateValue(price);

}

/*=========================================================
END PHASE 2
=========================================================*/

console.log("calculator.js Phase 2 Loaded");
/*=========================================================
YUKTHI TECHNOLOGIES
calculator.js
Phase 3
Professional Quote System
=========================================================*/

"use strict";

/*=========================================================
QUOTE DETAILS
=========================================================*/

function getQuoteData(){

    return {

        website: calculator.website,

        hosting: calculator.hosting,

        pages: calculator.pages,

        seo: calculator.seo,

        domain: calculator.domain,

        maintenance: calculator.maintenance,

        ssl: calculator.ssl,

        total: finalAmount?.textContent || totalPrice?.textContent,

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString()

    };

}

/*=========================================================
SAVE QUOTE
=========================================================*/

function saveQuote(){

    const quote = getQuoteData();

    let quotes = JSON.parse(

        localStorage.getItem("yt-quotes") || "[]"

    );

    quotes.push(quote);

    localStorage.setItem(

        "yt-quotes",

        JSON.stringify(quotes)

    );

    showToast?.("Quote Saved");

}

/*=========================================================
DOWNLOAD JSON
=========================================================*/

function downloadQuote(){

    const quote = getQuoteData();

    const blob = new Blob(

        [JSON.stringify(quote,null,2)],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =

    "website-quotation.json";

    link.click();

    URL.revokeObjectURL(url);

}

/*=========================================================
PRINT
=========================================================*/

function printQuote(){

    window.print();

}

/*=========================================================
WHATSAPP
=========================================================*/

function sendWhatsApp(){

    const quote = getQuoteData();

    const message =

`Hello Yukthi Technologies,

I would like a quotation.

Website : ${quote.website}
Hosting : ${quote.hosting}
Pages : ${quote.pages}
SEO : ${quote.seo ? "Yes":"No"}
Domain : ${quote.domain ? "Yes":"No"}
Maintenance : ${quote.maintenance ? "Yes":"No"}

Estimated Price :
${quote.total}`;

    window.open(

`https://wa.me/918747007011?text=${encodeURIComponent(message)}`,

"_blank"

    );

}

/*=========================================================
EMAIL
=========================================================*/

function sendEmail(){

const quote=getQuoteData();

const subject=

encodeURIComponent(

"Website Quote Request"

);

const body=

encodeURIComponent(

`Website : ${quote.website}

Hosting : ${quote.hosting}

Pages : ${quote.pages}

SEO : ${quote.seo}

Domain : ${quote.domain}

Maintenance : ${quote.maintenance}

Estimated :

${quote.total}`

);

window.location.href=

`mailto:rhushihebbar22@gmail.com?subject=${subject}&body=${body}`;

}

/*=========================================================
PACKAGE RECOMMENDATION
=========================================================*/

function recommendPackage(){

const recommendation=

document.querySelector(

"#recommended-package"

);

if(!recommendation) return;

let packageName="Basic";

if(calculator.website==="business"){

packageName="Business";

}

if(calculator.website==="premium"){

packageName="Premium";

}

if(calculator.website==="ecommerce"){

packageName="E-Commerce";

}

recommendation.innerHTML=

packageName;

}

/*=========================================================
BUTTON EVENTS
=========================================================*/

document

.querySelector("#download-quote")

?.addEventListener(

"click",

downloadQuote

);

document

.querySelector("#print-quote")

?.addEventListener(

"click",

printQuote

);

document

.querySelector("#save-quote")

?.addEventListener(

"click",

saveQuote

);

document

.querySelector("#whatsapp-quote")

?.addEventListener(

"click",

sendWhatsApp

);

document

.querySelector("#email-quote")

?.addEventListener(

"click",

sendEmail

);

/*=========================================================
UPDATE
=========================================================*/

const originalCalculate = calculatePrice;

calculatePrice = function(){

    originalCalculate();

    recommendPackage();

};

/*=========================================================
END OF CALCULATOR.JS
=========================================================*/

console.log(

"%cCalculator Ready",

"color:#10B981;font-size:16px;font-weight:bold;"

);