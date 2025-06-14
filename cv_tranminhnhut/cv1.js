// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
}

// Load saved theme
function loadTheme() {
    const savedTheme = 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Back navigation
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        try {
            window.location.href = '../';
        } catch (e) {
            alert('Không thể quay lại trang trước. Vui lòng sử dụng nút Back của trình duyệt.');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadTheme();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
        });
    });

    document.querySelector('.profile-img').addEventListener('click', function () {
        this.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    });
});