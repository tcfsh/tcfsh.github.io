// Interactive Stars System
const starsContainer = document.getElementById('stars');
const heroSection = document.getElementById('hero');

if (starsContainer && heroSection) {
    const stars = [];
    const numStars = 100;

    // Create stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        star.dataset.x = x;
        star.dataset.y = x;
        
        starsContainer.appendChild(star);
        stars.push(star);
    }

    // Mouse interaction with stars
    let mouseX = 0;
    let mouseY = 0;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        
        stars.forEach(star => {
            const starX = parseFloat(star.dataset.x);
            const starY = parseFloat(star.dataset.y);
            
            const dx = mouseX - starX;
            const dy = mouseY - starY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 15) {
                const force = (15 - distance) / 15;
                const moveX = -dx * force * 2;
                const moveY = -dy * force * 2;
                
                star.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`;
                star.style.opacity = Math.min(1, 0.5 + force * 0.5);
            } else if (distance < 25) {
                const force = (25 - distance) / 25;
                const moveX = -dx * force * 0.5;
                const moveY = -dy * force * 0.5;
                
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                star.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        stars.forEach(star => {
            star.style.transform = 'translate(0, 0) scale(1)';
            star.style.opacity = Math.random() * 0.5 + 0.3;
        });
    });
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        const dx = cursorX - followerX;
        const dy = cursorY - followerY;
        
        followerX += dx * 0.15;
        followerY += dy * 0.15;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .cta-button, .contact-card, .about-card, .team-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Optimized Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});