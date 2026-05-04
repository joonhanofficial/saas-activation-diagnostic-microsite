document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Number counter animation for the hero stat
    const counterElement = document.getElementById('activation-rate');
    const targetValue = 50.92;
    const duration = 1500; // ms
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const easeOutQuad = (t) => t * (2 - t);

    const counterInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = easeOutQuad(progress);
        const currentValue = (targetValue * easedProgress).toFixed(2);
        
        if (counterElement) {
            counterElement.textContent = currentValue + '%';
        }

        if (currentStep >= steps) {
            clearInterval(counterInterval);
            if (counterElement) {
                counterElement.textContent = '50.92%';
            }
        }
    }, stepTime);

    // Mobile tap handling for interactive cards and bars
    if (window.matchMedia("(hover: none)").matches) {
        // Handle Cards
        const cards = document.querySelectorAll('.interactive-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                cards.forEach(c => {
                    if (c !== card) c.classList.remove('active');
                });
                card.classList.toggle('active');
                e.stopPropagation();
            });
        });

        // Handle Bars
        const bars = document.querySelectorAll('.interactive-bar');
        bars.forEach(bar => {
            bar.addEventListener('click', (e) => {
                bars.forEach(b => {
                    if (b !== bar) b.classList.remove('active');
                });
                bar.classList.toggle('active');
                e.stopPropagation();
            });
        });

        // Click outside to close
        document.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            bars.forEach(b => b.classList.remove('active'));
        });
    }
});