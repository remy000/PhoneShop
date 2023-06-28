"use strict";

const btnscroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section_1");
const nav = document.querySelector(".nav");
const phoneContainer = document.querySelector(".phone__tab-container");
const phoneTab = document.querySelectorAll(".phones__tab");
const productList = document.querySelectorAll(".products--list");
const header = document.querySelector(".header");

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".nav_links");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  nav.classList.toggle("activenav");
};
btnscroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav_links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav_link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
// nav link hovering
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    siblings.forEach((el) => {
      if (link !== el) el.style.opacity = 0.5;
    });
  }
});
nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    siblings.forEach((el) => {
      if (link !== el) el.style.opacity = 1;
    });
  }
});

// add and removing active tabs on menus
phoneContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".phones__tab");
  if (!clicked) return;
  phoneTab.forEach((p) => p.classList.remove("phones__tab--active"));
  productList.forEach((cont) => cont.classList.remove("products--list-active"));

  clicked.classList.add("phones__tab--active");
  document
    .querySelector(`.products--list--${clicked.dataset.tab}`)
    .classList.add("products--list-active");
});

//sticky navigation

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    nav.classList.remove("sticky");
  } else {
    nav.classList.add("sticky");
  }
};
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

//reveal sections

const sections = document.querySelectorAll(".section");
const sectionReveal = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// slides

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotCont = document.querySelector(".dots");
let currentSlide = 0;
const maxSlide = slides.length;

const toSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
toSlide(0);
const createDot = function () {
  slides.forEach((_, i) => {
    dotCont.insertAdjacentHTML(
      "beforeend",
      ` <button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDot();
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  toSlide(currentSlide);
  activateDot(currentSlide);
};
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  toSlide(currentSlide);
  activateDot(currentSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    previousSlide();
  } else {
    return;
  }
});

dotCont.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slid = e.target.dataset.slide;
    toSlide(slid);
    activateDot(slid);
  }
});
