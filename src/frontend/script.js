let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function moveSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play carousel
setInterval(() => {
    moveSlide(1);
}, 7000); // Slowed down to 8 seconds

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Email function - open mail client in a new window/tab with a fallback
function openEmail() {
    const to = 'flintpresidents@gmail.com';
    const subject = encodeURIComponent('FLINT Inquiry');
    const body = encodeURIComponent('Hello FLINT team,');
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    /*
    // Try to open in a new tab/window first (some browsers block this)
    const newWindow = window.open(mailto, '_blank');
    if (newWindow) {
        try { newWindow.focus(); } catch (e) {}
        return;
    }

    // Fallback to navigating the current window
    window.location.href = mailto;
    */
}

// Enhanced email helper: copy to clipboard and show a temporary UI change
function copyEmailToClipboard(email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(email);
    }
    // Fallback for older browsers
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            successful ? resolve() : reject();
        } catch (err) {
            document.body.removeChild(textarea);
            reject(err);
        }
    });
}

// Wrapper to call when the Email button is clicked
function handleEmailButtonClick() {
    const email = 'flintpresidents@gmail.com';
    const btn = document.querySelector('.email-btn');
    if (btn) {
        const originalText = btn.textContent;
        // Copy email to clipboard
        copyEmailToClipboard(email).then(() => {
            btn.textContent = 'copied to clip board';
            btn.disabled = true;
            // revert after 10s
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 10000);
        }).catch(() => {
            // If copy fails, still give user feedback
            btn.textContent = 'copied to clip board';
            setTimeout(() => btn.textContent = originalText, 4000);
        });
    }

    // (mail client opening is commented out for now)
    // openEmail();
}

// Parallax effect for cover section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const coverContainer = document.querySelector('.cover-container');
    if (coverContainer) {
        coverContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const links = navbarLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
    }
});