// 1. Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 1500);
    }
});

// 2. Tạo hiệu ứng sao lấp lánh (Starry Background)
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

// 3. Cursor Glow Effect
const cursor = document.querySelector('.cursor-glow');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// 4. Header Scroll Change
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// 5. Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

// 6. Testimonial Slider
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

// 7. Form Validation & Local Storage (ĐÃ SỬA LỖI KHỚP HTML)
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu từ các trường (Đảm bảo ID khớp với HTML)
        const name = document.getElementById('name').value;
        const facebook = document.getElementById('facebook').value;
        const bDate = document.getElementById('booking-date').value;
        const bTime = document.getElementById('booking-time').value;
        const service = document.getElementById('service').value;
        
        // Thời gian khách gửi form
        const now = new Date();
        const submittedAt = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');

        const newBooking = { 
            name, 
            facebook, // Đã bỏ email vì HTML bạn đã xóa ô này
            bookingSlot: `${bDate} lúc ${bTime}`, 
            service, 
            date: submittedAt 
        };

        // Lưu vào LocalStorage
        let bookings = JSON.parse(localStorage.getItem('mystic_bookings')) || [];
        bookings.push(newBooking);
        localStorage.setItem('mystic_bookings', JSON.stringify(bookings));

        // Thông báo thành công
        alert(`Cảm ơn ${name}! Astra Mystic đã nhận yêu cầu đặt lịch cho dịch vụ ${service.toUpperCase()}. Chúng tôi sẽ liên hệ qua Facebook/Instagram của bạn sớm nhất.`);
        
        contactForm.reset();
        
        // Cập nhật sự kiện cho trang Admin
        window.dispatchEvent(new Event('storage'));
    });
}

// 8. Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.classList.toggle('ri-sun-line');
        themeToggle.classList.toggle('ri-moon-line');
    });
}

// 9. Parallax Effect cho Hero
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
        heroContent.style.opacity = 1 - (scroll / 600);
    }
});