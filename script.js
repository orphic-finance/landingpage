function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple authentication logic
  if (username === 'armand' && password === 'morin') {
      // Store a token in localStorage
      localStorage.setItem('auth', 'true');
      // Redirect to the secured page
      window.location.href = '/secured-page.html';
  } else {
      alert('Invalid username or password');
  }
}

// Check if already logged in
if (localStorage.getItem('auth') === 'true') {
//   window.location.href = '/secured-page.html';
// 
}

// Redirect to login page if not authenticated
if (localStorage.getItem('auth') !== 'true') {
  console.log('Not authenticated, redirecting to login page.');
  window.location.href = '/auth/index.html';
} else {
  console.log('Authenticated, staying on the page.');
}

// Function to apply a random background gradient
function setRandomBackground() {
  const backgroundElement = document.querySelector(".background"); // Get the background element
  console.log('Background element:', backgroundElement);

  const backgroundOptions = [
    `radial-gradient(
      50% 50% at 50% 50%,
      #d5e2b2 16.67%,
      rgba(144, 224, 255, 0) 48.34%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(236, 170, 122, 0.1) 50.74%,
      rgba(169, 96, 238, 0)
    ),
    radial-gradient(50% 50% at 50% 50%, #ffcb57 31.7%, rgba(238, 117, 92, 0)),
    radial-gradient(
      50% 50% at 50% 50%,
      #ffcb57 41.18%,
      rgba(183, 120, 225, 0) 71.99%
    ),
    radial-gradient(50% 50% at 50% 50%, #a960ee, rgba(199, 136, 203, 0.62) 90.5%)`,

    `radial-gradient(
      circle at 20% 20%, 
      #e0f7fa 20%, 
      rgba(224, 247, 250, 0) 40%
    ),
    radial-gradient(
      circle at 80% 30%, 
      rgba(255, 138, 101, 0.3) 30%, 
      rgba(255, 138, 101, 0) 60%
    ),
    radial-gradient(
      circle at 50% 70%, 
      #fbc02d 40%, 
      rgba(251, 192, 45, 0) 70%
    ),
    radial-gradient(
      circle at 50% 50%, 
      #8e24aa 60%, 
      rgba(142, 36, 170, 0.3) 90%
    ),
    radial-gradient(
      circle at 50% 50%, 
      #3949ab, 
      rgba(57, 73, 171, 0.5) 100%
    )`,

    `radial-gradient(
      circle at 30% 30%,
      #ff9a9e 20%,
      rgba(255, 154, 158, 0) 50%
    ),
    radial-gradient(
      circle at 70% 40%,
      rgba(129, 207, 224, 0.3) 25%,
      rgba(129, 207, 224, 0) 55%
    ),
    radial-gradient(circle at 60% 80%, #fbc2eb 30%, rgba(251, 194, 235, 0) 70%),
    radial-gradient(
      circle at 50% 50%,
      #a1c4fd 40%,
      rgba(161, 196, 253, 0.3) 80%
    ),
    radial-gradient(circle at 50% 50%, #c3cfe2, rgba(195, 207, 226, 0.5) 100%)`,

    `radial-gradient(
      circle at 20% 40%, 
      #ffb6c1 20%, 
      rgba(255, 182, 193, 0) 50%
    ),
    radial-gradient(
      circle at 80% 30%, 
      rgba(123, 104, 238, 0.3) 25%, 
      rgba(123, 104, 238, 0) 55%
    ),
    radial-gradient(
      circle at 60% 70%, 
      #f9fb98 30%, 
      rgba(152, 251, 152, 0) 70%
    ),
    radial-gradient(
      circle at 50% 50%, 
      #ff7f50 40%, 
      rgba(255, 127, 80, 0.3) 80%
    ),
    radial-gradient(
      circle at 50% 50%, 
      #eeec77, 
      rgba(202, 235, 135, 0.5) 100%
    )`,
  ];

  if (backgroundElement) {
    const randomIndex = Math.floor(Math.random() * backgroundOptions.length);
    backgroundElement.style.background = backgroundOptions[randomIndex];
    console.log('Applied background:', backgroundOptions[randomIndex]);
  }
}

// Apply the random background after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setRandomBackground);
