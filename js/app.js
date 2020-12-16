/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let navbar = document.querySelector('#navbar__list');
let navHead = document.querySelector('.page__header');
let scrollTop = document.getElementById("scrollTop");
let sections = document.querySelectorAll('section');


//functions which need scroll event listener
onscroll = () => {
    navTimeOut();
    sectionsLoop();
    buttonDisplay();
}

// loop on sections then link each one with its element in navbar by using the href and id of sections and lists
function sectionsLoop(){
    sections.forEach((section) => {
        
        let elTop = section.getBoundingClientRect().top;
        let elBottom = section.getBoundingClientRect().bottom;
        let currentId = section.attributes.id.value;
        // link between section and li element
        let selectEl = `ul li[href="#${currentId}"]`;
        let elNav = document.querySelector(selectEl);

        elId(elTop, elBottom, section, elNav);
        autoScrolling(section, elNav);
    
    })
}


// make navbar hidden after scrolling down and visible after scrolling up
// by checking if the new PageYOffset is smaller or greater than the previous one 
// and checked if the new one equal 0 to make sure that navbar doesn't hide in the top of the page
function navVisibilte() {
    let lastScroll = 0;
    document.addEventListener('scroll', function () {
        
        let navScroll = window.pageYOffset;
        if (lastScroll == 0) {
            navHead.style.cssText = 'visibility: visible'
        } else if (navScroll > lastScroll) {
            navHead.style.cssText = 'visibility: hidden; opacity: 0; transition: visibility 0s linear 0.33s, opacity 0.33s linear'
        } else if (navScroll < lastScroll) {
            navHead.style.cssText = 'visibility: visible; opacity: 1; transition: opacity 1s'
        }
        lastScroll = navScroll;

    })

}

//check if the user stoped scrolling to hide navbar after 4 seconds
function navTimeOut(){
    let Scrolling;
    window.clearTimeout(Scrolling);
    Scrolling = setTimeout(() => {
        navHead.style.cssText = 'visibility: hidden; opacity: 0; transition: visibility 0s linear 0.33s, opacity 0.33s linear'
    }, 4000);
}


//checking section viewport
//change li style acourding to the section in the viewport
//make the section active
function elId(elTop, elBottom, section, elNav) {

    if (elTop <= 150 && elBottom >= 150) {
        elNav.style.cssText = "background: green;border: 1px black;border-radius: 100px"
        section.classList.add("your-active-class");
    } else {
        elNav.style.cssText = "";
    }
}

// build the navbar
function addNav() {
    for (let i = 1; i <= 4; i++) {
        navbar.insertAdjacentHTML('beforeend', `<li id="nav${i}" href="#section${i}" class="nav-sect">section${i}</li>`);
    };
}

//making the topButton hide in the top of the page
//Or visible in the rest of the page
function buttonDisplay() {
    let toTopRect = document.documentElement.scrollTop;
    if (toTopRect > 50) {
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
}

//going to the top of the page by clicking it
function toTop() {
    let toTop = document.documentElement;
    scrollTop.addEventListener('click', () => {
        toTop.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })



}





// Scroll to section after clicking li element
function autoScrolling(section, elNav) {
    elNav.onclick = () => {
        section.scrollIntoView();
    }
}

//excute function
addNav();
navVisibilte();
toTop();
