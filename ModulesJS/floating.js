export function initFloating(){
  const graphContainer = document.getElementById('graphContainer');
  const toggleButton = document.getElementById('toggleButtonF');
  const closeIcon = document.getElementById('closeIconGraph');

  // Toggle button
  toggleButton.addEventListener('click', function() {
    graphContainer.style.right = '-18px'; // Slide in graph container
    toggleButton.style.opacity = '0'; // Fade out the button
    toggleButton.style.transform = 'translateX(50px)'; // Move the button to the right
    setTimeout(() => {
        toggleButton.classList.add('hiddenGraph'); // Hide the button after animation
    }, 500); // Adjust timing to match animation duration
  });

  // Close icon
  closeIcon.addEventListener('click', function() {
    if (window.innerWidth > 1200) {
      graphContainer.style.right = 'min(calc(-20vw - 50px), calc(-270px - 30px))'; // Slide out graph container
    } else {
      graphContainer.style.right = 'min(calc(-18.51vw - 50px), calc(-270px - 30px))'; // Slide out graph container
    }
    toggleButton.style.opacity = '1'; // Reset button opacity
    toggleButton.style.transform = 'none'; // Reset button position
    toggleButton.classList.remove('hiddenGraph');
  });
}