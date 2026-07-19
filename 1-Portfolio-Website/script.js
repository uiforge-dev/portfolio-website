/*=========================================
    UIForge Portfolio Website
    script.js
=========================================*/

// ==========================
// Typing Effect
// ==========================

const typingElement = document.getElementById("typing");

const words = [
    "Frontend Developer",
    "HTML Developer",
    "CSS Designer",
    "JavaScript Developer",
    "Responsive Web Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();


// ==========================
// Scroll To Top
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// Hide button initially

topBtn.style.display = "none";


// ==========================
// Smooth Navigation
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ==========================
// Dark Mode
// ==========================

const themeBtn = document.querySelector(".theme-toggle");

let darkMode = true;

themeBtn.addEventListener("click",()=>{

    if(darkMode){

        document.body.style.background="#f5f5f5";
        document.body.style.color="#111";

        darkMode=false;

    }else{

        document.body.style.background="#0f172a";
        document.body.style.color="#fff";

        darkMode=true;

    }

});


// ==========================
// Reveal Animation
// ==========================

const revealElements =
document.querySelectorAll(
".service-card,.project-card,.skill-card"
);

function reveal(){

    revealElements.forEach(item=>{

        const top=item.getBoundingClientRect().top;

        const windowHeight=window.innerHeight;

        if(top<windowHeight-100){

            item.style.opacity="1";

            item.style.transform="translateY(0)";

        }

    });

}

revealElements.forEach(item=>{

    item.style.opacity="0";

    item.style.transform="translateY(60px)";

    item.style.transition=".8s";

});

window.addEventListener("scroll",reveal);

reveal();


// ==========================
// Custom Cursor
// ==========================

const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});


// ==========================
// Navbar Background
// ==========================

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.style.background="rgba(15,23,42,.95)";

    }else{

        header.style.background="rgba(15,23,42,.65)";

    }

});


// ==========================
// Active Navigation
// ==========================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


// ==========================
// Mobile Menu
// ==========================

const menuBtn=document.querySelector(".menu-btn");

const navMenu=document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navMenu.classList.toggle("show");

});


// ==========================
// Contact Form
// ==========================

const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();

});


// ==========================
// Console Message
// ==========================

console.log(
"%cWelcome to UIForge Portfolio",
"color:#06b6d4;font-size:20px;font-weight:bold;"
);