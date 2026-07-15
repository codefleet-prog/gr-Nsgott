document.addEventListener('DOMContentLoaded', () => {
    // Loader Logic
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            loaderOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1800); // 1.8s matches the loading bar animation
    }

    // Custom cursor glow effect
    const cursorGlow = document.getElementById('cursor-glow');
    const ctaBtn = document.getElementById('cta-btn');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    ctaBtn.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '600px';
        cursorGlow.style.height = '600px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(209, 226, 196, 0.25) 0%, rgba(209, 226, 196, 0) 70%)';
    });

    ctaBtn.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(209, 226, 196, 0.15) 0%, rgba(209, 226, 196, 0) 70%)';
    });

    // Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Logo Shrink, Slide & Parallax Animation on Scroll
    const heroLogo = document.getElementById('hero-logo');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Phase 1: Shrink and Fade (0 to 50vh)
        let phase1Progress = scrollY / (windowHeight * 0.5);
        if (phase1Progress > 1) phase1Progress = 1;
        
        // Phase 2: Slide left (50vh to 100vh)
        let phase2Progress = (scrollY - (windowHeight * 0.5)) / (windowHeight * 0.5);
        if (phase2Progress < 0) phase2Progress = 0;
        if (phase2Progress > 1) phase2Progress = 1;
        
        // Apply easing functions for buttery smooth feel
        const easePhase1 = 1 - Math.pow(1 - phase1Progress, 3); // Cubic ease-out
        const easePhase2 = Math.pow(phase2Progress, 3); // Cubic ease-in
        
        // Phase 1 updates
        const scale = 1 - (easePhase1 * 0.4);
        const opacity = 1 - (easePhase1 * 1.5);
        
        // Phase 2 updates (sliding LEFT is negative translateX)
        const translateX = -(easePhase2 * 100); // move left by 100vw
        
        if (heroLogo) {
            heroLogo.style.transform = `translateX(${translateX}vw) scale(${scale})`;
        }
        
        if (heroContent) {
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${easePhase1 * -50}px)`; 
        }
        
        // Parallax effect on abstract shapes tied to scroll
        document.getElementById('shape-1').style.transform = `translateY(${scrollY * 0.2}px)`;
        document.getElementById('shape-2').style.transform = `translateY(${scrollY * -0.1}px)`;
        document.getElementById('shape-3').style.transform = `translateY(${scrollY * 0.15}px)`;
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-element').forEach(el => {
        revealObserver.observe(el);
    });
});
