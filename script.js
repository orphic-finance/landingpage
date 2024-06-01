function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomGradient() {
    const gradientTypes = ['circle at', 'ellipse at'];
    const gradientPositions = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'];
    const gradientSizes = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

    const gradients = Array.from({ length: 3 }, () => {
        const type = gradientTypes[getRandomInt(0, gradientTypes.length - 1)];
        const xPos = gradientPositions[getRandomInt(0, gradientPositions.length - 1)];
        const yPos = gradientPositions[getRandomInt(0, gradientPositions.length - 1)];
        const startColor = getRandomColor();
        const endColor = getRandomColor();
        const startSize = gradientSizes[getRandomInt(0, gradientSizes.length - 1)];
        const endSize = gradientSizes[getRandomInt(0, gradientSizes.length - 1)];
        return `radial-gradient(${type} ${xPos} ${yPos}, ${startColor} ${startSize}, ${endColor} ${endSize})`;
    });

    return gradients.join(', ');
}

function applyRandomGradient() {
    const gradientElement = document.querySelector('.gradient');
    const gradient = generateRandomGradient();
    gradientElement.style.background = gradient;
}

document.addEventListener('DOMContentLoaded', applyRandomGradient);
