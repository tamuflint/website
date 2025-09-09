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

// Email function
function openEmail() {
    window.location.href = 'mailto:flintpresidents@tamu.edu?subject=FLINT Inquiry&body=Hello FLINT team,';
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