// Add smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add typing effect to title
    const titleElement = document.querySelector('.title');
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < titleText.length) {
            titleElement.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-before-reveal');
        observer.observe(section);
    });

    // Add hover effects to skills
    document.querySelectorAll('.skills li').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click effect to contact info
    document.querySelectorAll('.contact-info li').forEach(contact => {
        contact.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Add any interactive features here
    console.log('CV page loaded');
}); 