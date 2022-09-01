"use strict";

const burgerIcon = document.querySelector(".header__burger-icon");
const dropMenu = document.querySelector(".header__navigation-menu--mobile");
const nav = document.querySelector(".header__navigation-list");

let displayMenu = false;

document.addEventListener("click", (e) => {
  if (displayMenu === true && e.target !== burgerIcon) {
    dropMenu.classList.add("display-none");
    burgerIcon.src = "./IMG/hamburger (1).png";
    return (displayMenu = false);
  }
});

burgerIcon.addEventListener("click", (e) => {
  if (displayMenu === false) {
    e.target.src = "./IMG/header-close-icon.svg";
    dropMenu.classList.remove("display-none");
    return (displayMenu = true);
  }
  e.target.src = "./IMG/hamburger (1).png";
  dropMenu.classList.add("display-none");
  return (displayMenu = false);
});
