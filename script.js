// theme-switcher.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.textContent = '🌜 Night'; // Switch to Night Mode
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.textContent = '🌞 Day'; // Switch to Day Mode
        }
    });
});