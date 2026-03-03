
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 1500);
    }
});


const createStars = () => {
    const container = document.getElementById('stars-container');
    if (!container) return;
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
        container.appendChild(star);
    }
};
createStars();


const cursor = document.querySelector('.cursor-glow');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}


window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});


const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));


const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}


const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
      
        const name = document.getElementById('name').value;
        const facebook = document.getElementById('facebook').value;
        const bDate = document.getElementById('booking-date').value;
        const bTime = document.getElementById('booking-time').value;
        const service = document.getElementById('service').value;
        
      
        const otherDetails = document.getElementById('other-details').value; 
        
        const now = new Date();
        const submittedAt = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');

      
        const newBooking = { 
            name, 
            facebook, 
            bookingSlot: `${bDate} lúc ${bTime}`, 
            service, 
            otherDetails, 
            date: submittedAt 
        };

       
        let bookings = JSON.parse(localStorage.getItem('mystic_bookings')) || [];
        bookings.push(newBooking);
        localStorage.setItem('mystic_bookings', JSON.stringify(bookings));

       
        const serviceDisplay = service === 'other' ? (otherDetails || 'Yêu cầu khác') : service.toUpperCase();
        alert(`Cảm ơn ${name}! Astra Mystic đã nhận yêu cầu cho dịch vụ: ${serviceDisplay}. Chúng tôi sẽ liên hệ bạn sớm nhất.`);
        
       
        contactForm.reset();
        const otherServiceWrapper = document.getElementById('other-service-wrapper');
        if(otherServiceWrapper) otherServiceWrapper.style.display = 'none';
        
    
        window.dispatchEvent(new Event('storage'));
    });
}


const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.classList.toggle('ri-sun-line');
        themeToggle.classList.toggle('ri-moon-line');
    });
}


window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
        heroContent.style.opacity = 1 - (scroll / 600);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const serviceSelect = document.getElementById('service');
    const otherServiceWrapper = document.getElementById('other-service-wrapper');
    const otherDetailsInput = document.getElementById('other-details');

    serviceSelect.addEventListener('change', function() {
        if (this.value === 'other') {
          
            otherServiceWrapper.style.display = 'block';
            otherDetailsInput.setAttribute('required', 'required');
        } else {
            
            otherServiceWrapper.style.display = 'none';
            otherDetailsInput.removeAttribute('required');
        }
    });
});