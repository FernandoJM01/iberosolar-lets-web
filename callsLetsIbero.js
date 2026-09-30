// callModules.js
import { loadNavbar, addEventListeners, loadFooter, loadProfilePopUp, loadFloating, loadEarthAnimation } from './ModulesJS/modules.js';

$(document).ready(function(){
  // Typing animation script
  var typed = new Typed(".typing", {
    strings: ["Térmica", "Solar"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed = new Typed(".typing-2", {
    strings: ["Innovación", "Investigación", "Agente de Cambio", "Evolución"],
    typeSpeed: 90,
    backSpeed: 50,
    loop: true
  });

  // Owl carousel script
  $('.carousel').owlCarousel({
    margin: 20, 
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0:{
        items: 1,
        nav: false
      },
      600:{
        items: 2,
        nav: false
      },
      1000:{
        items: 3,
        nav: false
      }
    }
  });
  
  // Load other modules
  loadNavbar();
  addEventListeners();
  loadFooter();
  loadProfilePopUp();
  loadFloating();
  loadEarthAnimation();
});