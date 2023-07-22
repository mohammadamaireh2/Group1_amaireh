const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', ()=> {
  navLinks.classList.toggle('nav-active');
});

document.addEventListener("DOMContentLoaded", function () {
    const startButtons = document.querySelectorAll(".start-button");
  
    startButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        alert("click on start Now");
      });
    });
  });