// =================================================================
// ASONYX - Main Script (index.html)
// Handles smooth scrolling, scroll animations, mobile menu,
// hero section parallax, and the booking flip card effect.
// =================================================================

'use strict';

// --- Global Constants ---
const DURATION = 500; // Duration for the booking flip animation in milliseconds

/**
 * Smoothly scrolls to the target section when an anchor link is clicked.
 */
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

/**
 * Updates the 'active' class on navigation links based on the current scroll position.
 */
const updateActiveNavLink = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    // Determine the currently visible section
    sections.forEach(section => {
        // Offset is adjusted to activate the link slightly before the section hits the top
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    // Apply 'active' class to the corresponding navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's href contains the current section ID
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

/**
 * Initializes a subtle parallax effect on the background gradient blobs in the hero section.
 */
const initParallax = () => {
    const blobs = document.querySelectorAll('.gradient-blob');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        blobs.forEach((blob, index) => {
            // Different speeds for a layered parallax effect
            const speed = 0.5 + (index * 0.1);
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
};

/**
 * Initializes an Intersection Observer to trigger 'animate-on-scroll' effects.
 * Elements with the class 'animate-on-scroll' will gain the 'visible' class
 * when they enter the viewport.
 */
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1, // Start animation when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Load elements a bit early
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once the element has been animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.service-card, .portfolio-item, .stat-card, .contact-card, .section-title, .animate-on-scroll').forEach(el => {
        // Ensure the class is present for the observer to pick it up
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
};

/**
 * Handles the opening and closing of the mobile navigation menu.
 */
const initMobileMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('open'));
    });

    // Close menu when a navigation link is clicked
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
};

/**
 * Initializes the testimonial carousel preview on the home page.
 * It dynamically loads the testimonial data from portfolio.js.
 */
const initTestimonialCarousel = () => {
    const testimonialCardPreview = document.getElementById('testimonialCardPreview');

    if (!testimonialCardPreview) return;

    // Dynamically load portfolio.js to access the 'testimonials' data array
    // This is done to keep the testimonial data in one place (portfolio.js)
    const script = document.createElement('script');
    script.src = 'portfolio.js';
    document.head.appendChild(script);

    script.onload = () => {
        // Check if the 'testimonials' array is available after loading
        if (typeof testimonials !== 'undefined' && testimonials.length > 0) {
            let currentTestimonialIndex = 0;

            const renderTestimonial = (index) => {
                const testimonial = testimonials[index];

                testimonialCardPreview.innerHTML = `
                    <div class="testimonial-quote">
                        <p>"${testimonial.quote}"</p>
                    </div>
                    <div class="testimonial-author-info">
                        <div class="author-name-preview">${testimonial.author}</div>
                        <div class="author-role-preview">${testimonial.role} at ${testimonial.company}</div>
                    </div>
                `;
                testimonialCardPreview.classList.add('active');
            };

            const nextTestimonial = () => {
                testimonialCardPreview.classList.remove('active');
                // Wait for the fade-out transition before changing content
                setTimeout(() => {
                    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                    renderTestimonial(currentTestimonialIndex);
                }, 500);
            };

            // Start the carousel
            renderTestimonial(currentTestimonialIndex);
            // Cycle through testimonials every 8 seconds
            setInterval(nextTestimonial, 8000);
        }
    };
};

/**
 * Initializes the complex scroll-based animation for the hero section,
 * including header movement, card scaling/rotation, and logo scaling.
 */
const initHeroScrollAnimation = () => {
    const heroSection = document.getElementById('hero');
    const scrollHeader = document.querySelector('.scroll-header');
    const scrollCard = document.querySelector('.scroll-card');
    const floatingElement = document.querySelector('.floating-element');

    if (!heroSection || !scrollHeader || !scrollCard || !floatingElement) return;

    const updateScrollAnimation = () => {
        const scrollY = window.scrollY;
        const startScroll = heroSection.offsetTop;
        // Animation ends when the hero section is scrolled past the viewport
        const endScroll = heroSection.offsetHeight - window.innerHeight;

        let scrollProgress = 0;
        if (scrollY > startScroll) {
            // Calculate scroll progress (0 to 1) within the hero section
            scrollProgress = (scrollY - startScroll) / endScroll;
        }

        // Clamp the progress between 0 and 1
        scrollProgress = Math.min(1, Math.max(0, scrollProgress));

        // 1. Header transform (moves up)
        const translateY = -(scrollProgress * 200);
        scrollHeader.style.transform = `translateY(${translateY}px)`;

        // 2. Card transform (scales down and rotates in 3D)
        const scaleEnd = 0.8;
        const scale = 1 - (scrollProgress * (1 - scaleEnd));
        const rotateX = scrollProgress * 10;
        scrollCard.style.transform = `scale(${scale}) rotateX(${rotateX}deg)`;

        // 3. Floating logo transform (scales up and moves forward in 3D)
        const logoScaleEnd = 2;
        const logoScale = 1 + (scrollProgress * (logoScaleEnd - 1));
        const translateZ = scrollProgress * 350;
        // Disable the CSS animation while scroll is active
        floatingElement.style.animation = 'none';
        floatingElement.style.transform = `scale(${logoScale}) translateZ(${translateZ}px)`;
    };

    // Use requestAnimationFrame for performant scroll handling (throttling)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollAnimation();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Run once on load to set initial state
    updateScrollAnimation();
};

// =================================================================
// BOOKING FLIP ANIMATION (FLIP Principle)
// Handles the transition between the overview and detail card.
// =================================================================

const elApp = document.querySelector('#app');
const elDetailCard = document.querySelector('#detail-card');
const elRestaurant = document.querySelector('#restaurant'); // Renamed to elBookingCard for clarity in HTML
const elCloseBtn = document.querySelector('.close-btn');
const elWhatsappLink = document.querySelector('#whatsapp-link');

if (elApp) {
    // Set CSS variable for transition duration
    elApp.style.setProperty('--duration', `${DURATION}ms`);
}

/**
 * Activates a new state for the FLIP container.
 * @param {string} state - The new state ('overview' or 'details').
 */
function activate(state) {
    if (!elApp) return;
    elApp.dataset.prevState = elApp.dataset.state;
    elApp.dataset.state = state;

    // Reset active state on all view elements
    document.querySelectorAll(`#app [data-active]`)
        .forEach(el => delete el.dataset.active);
    // Set active state on elements matching the new state
    document.querySelectorAll(`#app [data-view="${state}"]`)
        .forEach(el => el.dataset.active = true);
}

/**
 * Performs the FLIP (First, Last, Invert, Play) animation.
 * @param {HTMLElement} el - The element in the 'First' state.
 * @param {HTMLElement} nextEl - The element in the 'Last' state.
 * @param {function} layoutFn - Function to execute to transition to the 'Last' state.
 */
function flip(el, nextEl = el, layoutFn = function(){}) {
    if (!elApp) return;

    // 1. FIRST: Get the bounding box of the element in the initial state
    const rect = el.getBoundingClientRect();

    // 2. LAST: Execute the layout change function
    layoutFn();

    // 3. INVERT: Get the bounding box of the element in the final state
    const lastRect = nextEl.getBoundingClientRect();

    // Calculate the difference (Invert)
    const dx = lastRect.x - rect.x;
    const dy = lastRect.y - rect.y;
    const dw = rect.width / lastRect.width;
    const dh = rect.height / lastRect.height;

    // Set CSS variables for the transform
    nextEl.style.setProperty('--dx', dx);
    nextEl.style.setProperty('--dy', dy);
    nextEl.style.setProperty('--dw', dw);
    nextEl.style.setProperty('--dh', dh);

    // 4. PLAY: Apply the animation
    requestAnimationFrame(() => {
        nextEl.dataset.move = "pending"; // Prepare for animation

        requestAnimationFrame(() => {
            nextEl.dataset.move = "moving"; // Start the animation

            setTimeout(() => {
                delete nextEl.dataset.move; // Clean up after animation
            }, DURATION);
        });
    });
}

/**
 * Handles the click event for the booking card to flip to details view.
 */
const handleBookingCardClick = () => {
    if (!elRestaurant) return; // Using elRestaurant for now, will update HTML later

    elRestaurant.addEventListener('click', () => {
        activate('details');
        elApp.dataset.transitioning = true;

        // Small delay to ensure layout is updated before FLIP calculation
        setTimeout(() => {
            flip(elRestaurant, elDetailCard, ()=>{
                delete elApp.dataset.transitioning;
            });
        }, 10);
    });
};

/**
 * Handles the click event for the close button to flip back to overview.
 */
const handleCloseButtonClick = () => {
    if (!elCloseBtn) return;

    elCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        activate('overview');
        elApp.dataset.transitioning = true;

        // Small delay to ensure layout is updated before FLIP calculation
        setTimeout(() => {
            flip(elDetailCard, elRestaurant, ()=>{
                delete elApp.dataset.transitioning;
            });
        }, 10);
    });
};

/**
 * Handles the click event for the WhatsApp link.
 */
const handleWhatsappLinkClick = () => {
    if (!elWhatsappLink) return;

    elWhatsappLink.addEventListener('click', (e) => {
        e.preventDefault();

        // The phone number and message are hardcoded here, should be dynamic if possible
        const phoneNumber = '96176629850';
        const message = encodeURIComponent('Hello, I want to book a website with you');
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappURL, '_blank');

        // Automatically close the detail card after opening WhatsApp
        if (elCloseBtn) {
            elCloseBtn.click();
        }
    });
};

// =================================================================
// INITIALIZATION
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Run initial setup functions
    initSmoothScrolling();
    initParallax();
    initScrollAnimations();
    initMobileMenu();
    initTestimonialCarousel();
    initHeroScrollAnimation();

    // Booking FLIP setup
    handleBookingCardClick();
    handleCloseButtonClick();
    handleWhatsappLinkClick();
    activate('overview'); // Set initial state

    // Track scroll events for active link and hero animation
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run once on load to set initial active link

    console.log('✓ Asonyx website loaded successfully!');
});
