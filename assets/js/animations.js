// Header Scroll Effect
const header = document.getElementById('header');
if (header) {
    const updateHeaderState = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

if (mobileMenuBtn && navLinks) {
    const links = navLinks.querySelectorAll('a');
    const menuIcon = mobileMenuBtn.querySelector('i');

    const openMobileMenu = () => {
        navLinks.classList.add('active');
        navBackdrop?.classList.add('active');
        document.body.classList.add('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');

        if (!menuIcon) return;
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    };

    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        navBackdrop?.classList.remove('active');
        document.body.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        if (!menuIcon) return;
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    };

    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');

    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    links.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    navBackdrop?.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Parallax Effect for Hero
const heroBg = document.getElementById('heroBg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (scroll < window.innerHeight) {
            heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
        }
    });
}

// Scroll Reveal Animation using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length && 'IntersectionObserver' in window) {
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));
} else {
    revealElements.forEach(el => el.classList.add('active'));
}
