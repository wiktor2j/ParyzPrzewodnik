document.addEventListener('DOMContentLoaded', () => {

    // FUNKCJONALNOŚĆ 1: Rozwijane menu na urządzeniach mobilnych
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // FUNKCJONALNOŚĆ 2: Przełącznik motywu (Jasny / Ciemny) z zapisem wyboru
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('parisTheme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = 'Tryb jasny';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            if (isDark) {
                themeToggle.textContent = 'Tryb jasny';
                localStorage.setItem('parisTheme', 'dark');
            } else {
                themeToggle.textContent = 'Tryb ciemny';
                localStorage.setItem('parisTheme', 'light');
            }
        });
    }

    // FUNKCJONALNOŚĆ 3: Rozwijane sekcje typu FAQ (Ciekawostki)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');

        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.toggle('open');
                questionBtn.setAttribute('aria-expanded', isOpen);
                if (icon) {
                    icon.textContent = isOpen ? '−' : '+';
                }
            });
        }
    });

});