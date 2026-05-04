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
    const duration = 2000; // ms
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const easeOutQuart = (t) => 1 - (--t) * t * t * t;

    const counterInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = easeOutQuart(progress);
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

    // Interactive elements logic (Cards & Bars)
    const cards = document.querySelectorAll('.interactive-card');
    const bars = document.querySelectorAll('.interactive-bar');

    // Function to close all reveals
    const closeAll = () => {
        cards.forEach(c => c.classList.remove('active'));
        bars.forEach(b => b.classList.remove('active'));
    };

    // Handle Cards
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const isActive = card.classList.contains('active');
            closeAll();
            if (!isActive) card.classList.add('active');
            e.stopPropagation();
        });
        
        // Accessibility: Keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isActive = card.classList.contains('active');
                closeAll();
                if (!isActive) card.classList.add('active');
            }
        });
    });

    // Handle Bars
    bars.forEach(bar => {
        bar.addEventListener('click', (e) => {
            const isActive = bar.classList.contains('active');
            closeAll();
            if (!isActive) bar.classList.add('active');
            e.stopPropagation();
        });
        
        // Accessibility: Keyboard support
        bar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isActive = bar.classList.contains('active');
                closeAll();
                if (!isActive) bar.classList.add('active');
            }
        });
    });

    // Click outside to close
    document.addEventListener('click', closeAll);
    
    // Add simple scroll reveal for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});