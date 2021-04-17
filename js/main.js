'use strict';

// Make Navbar transparent when it is on the top
const navbar = document.querySelector ('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener ('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add ('navbar__dark')
    }
    else {
        navbar.classList.remove('navbar__dark')
    }
});


// Handle Scrolling when clicking the navbar menu
const navbarMenu = document.querySelector('.nav__menu');
navbarMenu.addEventListener ('click', (event)=> {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView (link)
    navbarMenu.classList.remove ('open');
    selectNavItem (target);
})

// Navbar toggle btn for small screen
const navbarToggleBtn = document.querySelector ('.navbar__toggle-btn')
navbarToggleBtn.addEventListener ('click', () => {
    navbarMenu.classList.toggle ('open');
})


// Handle click on "contact me" btn on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener ('click', () => {
    scrollIntoView ("#contact")
})

// Make home slowly fade to transparent
const home = document.querySelector (".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener ('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})

// Show arrow up when scrolling down
const arrowUp = document.querySelector (".arrow-up")
document.addEventListener ('scroll', () => {
    if (window.scrollY > homeHeight / 2 ) {
        arrowUp.classList.add ('visible');
    }
    else {
        arrowUp.classList.remove ('visible');

    }
})

// Handle click on the "arrow up" button
arrowUp.addEventListener ('click', () => {
    scrollIntoView ('.home');
})

// Project
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector ('.work__projects');
const projects = document.querySelectorAll ('.project')

workBtnContainer.addEventListener ('click', (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // Remove the selection from the previous and select the new one
    const selected = document.querySelector(".category__btn.selected")
    selected.classList.remove ('selected');
    const target = e.target.nodeName === "BUTTON" ? e.target: e.target.parentNode;
    target.classList.add ('selected');
    
    projectContainer.classList.add ('anima-out')
    setTimeout (() => {
        projects.forEach ((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove ('invisible'); 
            }
            else {
                project.classList.add ('invisible'); 
            }
        });
        projectContainer.classList.remove ('anima-out')
    }, 300);
    
})


// Change section when scroll down

const sectionIds = [
    '.home', '#about', '#contributions', '#work', '#testimonial', '#contact'
]

const sections = sectionIds.map (id => document.querySelector (id));
const navItems = sectionIds.map (id => document.querySelector (`[data-link="${id}"]`))

let selectedNavIndex = 0;
let selectedNavItem = navItems [0]
function selectNavItem (selected) {
    selectedNavItem.classList.remove ('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add ('active');
    if (window.scrollY < navbarHeight + 10) {
        selectedNavItem.classList.remove ('active');
    }
}

function scrollIntoView (selector) {
    const scrollTo = document.querySelector (selector);
    scrollTo.scrollIntoView ({behavior: "smooth"});
    selectNavItem (navItems[sectionIds.indexOf(selector)]);
}

const observerOption = {
    root: null,
    rootmargin: "0px",
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index -1;
            }
        }
    })
}
const observer = new IntersectionObserver (observerCallback, observerOption)
sections.forEach (section => observer.observe(section))


window.addEventListener ('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) 
    {selectedNavIndex = navItems.length - 1;}
    selectNavItem(navItems[selectedNavIndex]);
})