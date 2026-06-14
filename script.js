document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // NAVBAR MOBILE ACTION
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATION (Intersection Observer)
    // ==========================================
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    animatedElements.forEach(element => appearanceObserver.observe(element));

    // ==========================================
    // HERO STATS COUNTER ACTION
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 40;

    const runCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText.replace(/[+%]/, '');
            const increment = Math.ceil(target / counterSpeed);

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target + (target === 98 ? "%" : "+");
            }
        };
        updateCount();
    };

    const statsBlock = document.querySelector('.hero-stats-container');
    if (statsBlock) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => runCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsBlock);
    }

    // ==========================================
    // MOUSE PARALLAX INTERACTION (Desktop Only)
    // ==========================================
    const productCard = document.querySelector('.premium-card-upgrade');
    const heroArea = document.querySelector('.hero');

    if (productCard && heroArea && window.innerWidth > 992) {
        heroArea.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            productCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.025)`;
        });

        heroArea.addEventListener('mouseleave', () => {
            productCard.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
            productCard.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        });

        heroArea.addEventListener('mouseenter', () => {
            productCard.style.transition = "none";
        });
    }

    // ==========================================
    // AUTOMATIC TESTIMONIAL SLIDER
    // ==========================================
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlideIndex = 0;
    let sliderTimer;

    if (slider && slides.length > 0) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => switchSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const switchSlide = (index) => {
            currentSlideIndex = index;
            slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlideIndex].classList.add('active');
            restartSliderTimer();
        };

        const autoNextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            switchSlide(currentSlideIndex);
        };

        const startSliderTimer = () => { sliderTimer = setInterval(autoNextSlide, 4500); };
        const restartSliderTimer = () => { clearInterval(sliderTimer); startSliderTimer(); };

        startSliderTimer();
    }

    // ==========================================
    // FAQ ACCORDION INTERACTION (Smooth)
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const answer = this.nextElementSibling;
            
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Top Header Transition on Scroll
    const headerNav = document.querySelector('.navbar');
    if (headerNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                headerNav.style.padding = '12px 0';
                headerNav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                headerNav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)';
            } else {
                headerNav.style.padding = '20px 0';
                headerNav.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                headerNav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.02)';
            }
        });
    }
});