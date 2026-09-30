import { initFloating } from "./floating.js";
// Navbar Module
export function loadNavbar(option) {
  fetch('ModulesHTML/navbar.html')
      .then(response => response.text())
      .then(data => {
          const navbarContainer = document.getElementById('navbarContainer');
          navbarContainer.innerHTML = data;
          addToggleMenuScript();

          if(option === "dynamic"){
            addEventListener();
          }else if(option === "static"){
            staticNavbar();
          }
      })
      .catch(error => console.error('Error fetching navbar:', error));
}

// Function to add event listeners for navbar behavior
export function addEventListeners() {
  // Check scroll position and add sticky class if necessary
  window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      const scrollUpBtn = document.querySelector('.scroll-up-btn');
      if (window.scrollY > 20) {
          navbar.classList.add('sticky');
      } else {
          navbar.classList.remove('sticky');
      }
      if (window.scrollY > 500) {
          scrollUpBtn.classList.add('show');
      } else {
          scrollUpBtn.classList.remove('show');
      }
  });
  
  // Function to scroll to the top when scroll-up-btn is clicked
  const scrollUpBtn = document.querySelector('.scroll-up-btn');
  scrollUpBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function staticNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('sticky');
}  

// Function to add toggle menu/navbar script
function addToggleMenuScript() {
  $('.menu-btn').click(function(){
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
  });
}

// Footer Module
export function loadFooter() {
  fetch('ModulesHTML/footer.html')
      .then(response => response.text())
      .then(data => {
          const container = document.getElementById('footerContainer');
          container.innerHTML = data;
      })
      .catch(error => console.error('Error fetching footer:', error));
}

// ProfilePopUp Module
export function loadProfilePopUp() {
  fetch('ModulesHTML/profilePopUp.html')
      .then(response => response.text())
      .then(data => {
          const container = document.getElementById('profilePopUpContainer');
          container.innerHTML = data;
      })
      .catch(error => console.error('Error fetching ProfilePopUp:', error));
}


// SideBar floating Module
export function loadFloating() {
    fetch('ModulesHTML/floating.html')
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('floatingContainerGraph');
            container.innerHTML = data;

            initFloating();
        })
        .catch(error => console.error('Error fetching floating:', error));
  }

  // ProfilePopUp Module
export function loadEarthAnimation() {
    fetch('Animation/earth.html')
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('earthContainer');
            container.innerHTML = data;
        })
        .catch(error => console.error('Error fetching earth animation:', error));
}