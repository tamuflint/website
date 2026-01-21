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

// Parallax effect for cover section - adjust background position only
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset || 0;
    const coverContainer = document.querySelector('.cover-container');
    if (coverContainer) {
        // Avoid applying transform to the container element because transforms
        // create a containing block that can change how `position: fixed` behaves
        // (fixed elements become relative to transformed ancestors). Instead,
        // shift the background-position to achieve a subtle parallax effect.
        const basePercent = 20; // matches the CSS default background-position vertical percent
        const offsetPercent = scrolled * 0.02; // tuned factor for gentle movement
        coverContainer.style.backgroundPosition = `center ${basePercent + offsetPercent}%`;
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

    // Detach the nav from any transformed ancestor and move it to document.body
    // This prevents ancestor transforms or stacking contexts from hiding the fixed nav.
    (function detachNavToBody() {
        const nav = document.querySelector('.cover-nav');
        if (!nav) return;
        // If already detached, do nothing
        if (nav.parentElement === document.body) return;

        const navHeight = nav.offsetHeight || 70;
        try {
            document.body.insertBefore(nav, document.body.firstChild);
            // Expose nav height to CSS so content can be offset
            document.documentElement.style.setProperty('--nav-offset', navHeight + 'px');
            document.documentElement.classList.add('nav-detached');
            // Ensure the nav is fixed and topmost
            nav.style.position = 'fixed';
            nav.style.top = '0';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.zIndex = '2147483647';
        } catch (e) {
            // If DOM manipulation fails, silently continue — nav will still function if present.
            console.error('Failed to detach nav to body:', e);
        }
    })();

    // Hide / show navbar on scroll: hide when scrolling down, show when scrolling up
    (function () {
        const nav = document.querySelector('.cover-nav');
        if (!nav) return;

        let lastY = window.pageYOffset || 0;
        let ticking = false;

        function onScroll() {
            const currentY = window.pageYOffset || 0;
            // small threshold to avoid flicker
            const delta = currentY - lastY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (currentY < 60) {
                        // near top always show
                        nav.classList.remove('nav-hidden');
                    } else if (delta > 0) {
                        // any downward scroll: hide
                        nav.classList.add('nav-hidden');
                    } else if (delta < 0) {
                        // any upward scroll: show immediately
                        nav.classList.remove('nav-hidden');
                    }
                    lastY = currentY;
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    })();
});