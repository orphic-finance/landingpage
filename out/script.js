document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const dynamicText = document.querySelector('.dynamic-color');

    function updateGradientAngle() {
        const baseAngle = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--angle'), 10);
        document.documentElement.style.setProperty('--angle', `${baseAngle + 1}deg`);
    }

    setInterval(updateGradientAngle, 100);  // Update the gradient every 100 milliseconds

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.textContent = '🌜 Night';
            updateThemeColors('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.textContent = '🌞 Day';
            updateThemeColors('dark');
        }
    });

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeColors(initialTheme);
});
