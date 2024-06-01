function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomGradient() {
  const gradientTypes = ["circle at", "ellipse at"];
  const gradientPositions = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
  ];
  const gradientSizes = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
  ];

  const gradients = Array.from({ length: 3 }, () => {
    const type = gradientTypes[getRandomInt(0, gradientTypes.length - 1)];
    const xPos =
      gradientPositions[getRandomInt(0, gradientPositions.length - 1)];
    const yPos =
      gradientPositions[getRandomInt(0, gradientPositions.length - 1)];
    const startColor = getRandomColor();
    const endColor = getRandomColor();
    const startSize = gradientSizes[getRandomInt(0, gradientSizes.length - 1)];
    const endSize = gradientSizes[getRandomInt(0, gradientSizes.length - 1)];
    return `radial-gradient(${type} ${xPos} ${yPos}, ${startColor} ${startSize}, ${endColor} ${endSize})`;
  });

  return gradients.join(", ");
}

function applyRandomGradient() {
  const gradientElement = document.querySelector(".gradient");
  const gradient = generateRandomGradient();
  gradientElement.style.background = gradient;
}

document.addEventListener("DOMContentLoaded", applyRandomGradient);

const backgroundElement = document.querySelector(".background"); // Get the background element

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

  `background: radial-gradient(
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

  `background: radial-gradient(
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

  `background: radial-gradient(
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

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgroundOptions.length);
  backgroundElement.style.background = backgroundOptions[randomIndex];
}

// Call the function to set a random background on page load
setRandomBackground();
