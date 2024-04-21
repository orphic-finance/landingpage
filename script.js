// theme-switcher.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.textContent = '🌞 Day'; // Sun emoji for day mode
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.textContent = '🌜 Night'; // Moon emoji for night mode
        }
    });
});


