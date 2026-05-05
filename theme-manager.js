// theme-manager.js

(function() {
    const ThemeManager = {
        init() {
            // Check local storage for saved theme
            const savedTheme = localStorage.getItem('benchcore-theme') || 'default';
            this.setTheme(savedTheme);
        },

        toggleTheme() {
            const currentTheme = this.getCurrentTheme();
            const newTheme = currentTheme === 'default' ? 'crimson' : 'default';
            this.setTheme(newTheme);
            
            // Dispatch a custom event in case components need to redraw immediately
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        },

        setTheme(themeName) {
            document.body.setAttribute('data-theme', themeName);
            localStorage.setItem('benchcore-theme', themeName);
            
            // Update toggle switch UI if it exists
            const toggleIcon = document.getElementById('theme-toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = themeName === 'default' ? 'CYAN' : 'CRIMSON';
            }
        },

        getCurrentTheme() {
            return document.body.getAttribute('data-theme') || 'default';
        }
    };

    // Expose to window
    window.themeManager = ThemeManager;

    // Auto-init on load
    window.addEventListener('DOMContentLoaded', () => {
        ThemeManager.init();
        
        // Bind the toggle switch
        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => ThemeManager.toggleTheme());
        }
    });
})();
