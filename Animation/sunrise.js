document.addEventListener('DOMContentLoaded', function() {
  // Get the current time
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var totalMinutes = hours * 60 + minutes;
  var totalSeconds = totalMinutes * 60 + seconds;
  
  // Calculate the proportion of the current time relative to a full day (24 hours)
  var proportionOfDay = totalSeconds / (24 * 60 * 60);

  // Calculate the start position of the animation based on the current time
  var startOffset = proportionOfDay * 100; // Convert proportion to percentage
  console.log("Seconds: " + seconds + " --- Total: " + totalSeconds);
  console.log("now: " + proportionOfDay);
  console.log("Portion: " + startOffset);
 
  const stars = 500;
  const skyStars = document.getElementById("sky__stars");
  const toggleAnimation = document.getElementById("toggle-animation");

  // Generate stars randomly using absolute position
  function createStars() {
    for (let i = 0; i < stars; i++) {
      let x = Math.floor(Math.random() * 100 + 1);
      let y = Math.floor(Math.random() * 100 + 1);
      const starPoint = document.createElement("div");
      starPoint.style.left = `${x}%`;
      starPoint.style.top = `${y}%`;

      let duration = Math.random() * 10;
      let size = Math.random() * 2;
      starPoint.style.animationDuration = 5 + duration + 's';
      starPoint.style.animationDelay = duration + 's';

      skyStars.appendChild(starPoint);
    }
  }

  // Function to set animation delay based on percentage
  function setAnimationDelay(percentage) {
    const selectors = ['.sky__dawn', '.sky__noon', '.sky__dusk', '.sky__midnight', '.orbit', '.sun', '.moon'];
    const elements = {};
    let delay;

    // Assign query Selector
    selectors.forEach(selector => {
      const key = selector.slice(1);
      elements[key] = document.querySelector(selector);
    });

    // Get original duration 
    const computedStyle = window.getComputedStyle(elements['sky__dawn']);
    const animationDuration = parseFloat(computedStyle.getPropertyValue('animation-duration'));
    const animationDelay = parseFloat(computedStyle.getPropertyValue('animation-delay'));

    // Compute the delay 
    delay = percentage / -100 * animationDuration;

    // Apply styles
    selectors.forEach(selector => {
      const key = selector.slice(1);
      elements[key].style.animationDelay = `${delay}s`;
    });
  }

  createStars();
  setAnimationDelay(startOffset);
});