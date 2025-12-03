// ============================================
// INITIALIZE AOS ANIMATIONS
// ============================================
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// TYPEWRITER EFFECT FOR HERO SECTION
// ============================================
const typewriterElement = document.querySelector('.typewriter');
const texts = [
    'Front-End Developer',
    'Web Designer',
    'UI Enthusiast',
    'Problem Solver',
    'Creative Coder'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
if (typewriterElement) {
    setTimeout(typeWriter, 1000);
}

// ============================================
// ANIMATED COUNTER FOR STATS
// ============================================
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (target === 100 ? '%' : '+');
            }
        };
        
        updateCounter();
    });
    
    hasAnimated = true;
};

// Intersection Observer for counter animation
const counterSection = document.querySelector('.about');
if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(counterSection);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FORMSPREE CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon-svg');
        const originalText = btnText.textContent;
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.style.animation = 'spin 1s linear infinite';
        formStatus.innerHTML = '';
        
        try {
            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                btnText.textContent = 'Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
                
                // Show success message
                formStatus.innerHTML = `
                    <div class="form-message form-success">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p>Thanks, <strong>${name}</strong>! Your message has been sent successfully. I'll get back to you soon! 🚀</p>
                    </div>
                `;
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.style.background = '';
                    btnIcon.style.animation = '';
                }, 3000);
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error handling
            btnText.textContent = 'Failed ✗';
            submitBtn.style.background = 'linear-gradient(135deg, #ff2e97, #ff0000)';
            
            formStatus.innerHTML = `
                <div class="form-message form-error">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <p>Oops! Something went wrong. Please try again or email me directly at <a href="mailto:your.email@example.com">your.email@example.com</a></p>
                </div>
            `;
            
            console.error('Formspree Error:', error);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
            
        } finally {
            submitBtn.disabled = false;
            btnIcon.style.animation = '';
        }
    });
}

// Add spin animation for loading icon
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for just "#"
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Portfolio loaded successfully!');
});

// ============================================
// FLOATING PARTICLES (OPTIONAL)
// ============================================
function createHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesCount = 20;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--primary);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%`;
        particle.style.bottom = '0';
        particle.style.animation = `particleFloat ${15 + Math.random() * 10}s infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        hero.appendChild(particle);
    }
}

// Uncomment to enable particles
// createHeroParticles();

// ============================================
// 3D TILT EFFECT ON PROFILE IMAGE (OPTIONAL)
// ============================================
const imageContainer = document.querySelector('.image-container');

if (imageContainer) {
    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    imageContainer.addEventListener('mouseleave', () => {
        imageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace('2025', currentYear);
        }
    });
};

updateFooterYear();

// ============================================
// CONSOLE MESSAGE (FUN EASTER EGG)
// ============================================
console.log('%c👋 Hello Developer!', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%c✨ Welcome to my portfolio!', 'color: #7b61ff; font-size: 16px;');
console.log('%c🚀 Interested in the code? Let\'s connect!', 'color: #ff2e97; font-size: 14px;');
console.log('%c📧 Contact: your.email@example.com', 'color: #00d4ff; font-size: 12px;');

// ============================================
// KEYBOARD SHORTCUTS (BONUS FEATURE)
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'P' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images when they come into view
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ============================================
// FINISH
// ============================================
console.log('%c✅ All scripts loaded successfully!', 'color: #00ff00; font-size: 12px; font-weight: bold;');
