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

    // FUNKCJONALNOŚĆ 4: Quiz z walidacją i wynikiem końcowym + Przycisk powrotu na górę
    const quizForm = document.getElementById('parisQuiz');
    const quizResult = document.getElementById('quizResult');
    const resetQuizBtn = document.getElementById('resetQuizBtn');

    const correctAnswers = {
        q1: 'b', // Nad Sekwaną
        q2: 'a', // W 1889 roku
        q3: 'b'  // 20 dzielnic
    };

    if (quizForm && quizResult) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(quizForm);
            const userQ1 = formData.get('q1');
            const userQ2 = formData.get('q2');
            const userQ3 = formData.get('q3');

            if (!userQ1 || !userQ2 || !userQ3) {
                quizResult.textContent = 'Zaznacz odpowiedź w każdym z 3 pytań przed sprawdzeniem wyniku!';
                quizResult.className = 'quiz-result visible warning';
                return;
            }

            let score = 0;
            if (userQ1 === correctAnswers.q1) score++;
            if (userQ2 === correctAnswers.q2) score++;
            if (userQ3 === correctAnswers.q3) score++;

            if (score === 3) {
                quizResult.textContent = `Brawo! Twój wynik to ${score}/3 pkt. Jesteś prawdziwym ekspertem od Paryża!`;
                quizResult.className = 'quiz-result visible success';
            } else {
                quizResult.textContent = `Twój wynik to ${score}/3 pkt. Przeczytaj uważnie nasz przewodnik powyżej i spróbuj jeszcze raz!`;
                quizResult.className = 'quiz-result visible warning';
            }
        });

        if (resetQuizBtn) {
            resetQuizBtn.addEventListener('click', () => {
                quizResult.className = 'quiz-result';
                quizResult.textContent = '';
            });
        }
    }

    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});