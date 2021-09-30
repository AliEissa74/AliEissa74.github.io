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
var navBarLists = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
//Function to check if an element is Visible in viewport
function InViewport(element) {
  var rect = element.getBoundingClientRect();

  return (
    rect.top >= -200 &&
    rect.left >= 0 &&
    rect.bottom <=
      (1.5 * window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//Function to remove classes

//remove active-nav

function stopNavLinks() {
  let navBar = document.querySelectorAll(".nav__hyperlink");
  navBar.forEach((ele) => {
    ele.classList.remove("active-nav");
  });
}
//remove your-active-class , active

function stopSections() {
  sections.forEach((ele) => {
    ele.classList.remove("your-active-class", "active");
  });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// add the nav
window.addEventListener("load", newNavbar());
// Add class 'active' to section when near top of viewport

function activateNav(SectionId) {
  let navBar = document.querySelectorAll(".nav__hyperlink");

  navBar.forEach((ele) => {
    if (ele.getAttribute("href") == `#${SectionId}`) {
      ele.classList.add("active-nav");
    }
  });
}

function activateSection(currentSection) {
  currentSection.classList.add("your-active-class", "active");

  stopNavLinks();
  activateNav(currentSection.getAttribute("id"));
}
// Scroll to anchor ID using scrollTO event

function scrollToSectionByClick() {
  let navBar = document.querySelectorAll(".nav__hyperlink");
  navBar.forEach((ele) => {
    ele.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(ele.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu Items
function newNavbar() {
  sections.forEach((ele) => {
    let listOfItems = document.createElement("li");
    listOfItems.classList.add("navbar__list__item");
    let sectionName = ele.getAttribute("data-nav");
    let SectionId = ele.getAttribute("id");
    listOfItems.innerHTML = `<a href="#${SectionId}" class="nav__hyperlink">${sectionName}</a>`;
    navBarLists.appendChild(listOfItems);
  });
}

// Set sections in active
window.addEventListener("scroll", function (event) {
  event.preventDefault();

  sections.forEach((ele) => {
    if (InViewport(ele)) {
      stopSections();
      activateSection(ele);
    } else if (window.scrollY == 0) {
      stopSections();
      stopNavLinks();
    }
  }, false);
});

// Scroll to section on link click
scrollToSectionByClick();
