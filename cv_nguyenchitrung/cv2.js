// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add click effect to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 100);
        });
    });

    // Enhanced typing effect for role
    const roleElement = document.querySelector('.role');
    const roleText = roleElement.textContent;
    roleElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < roleText.length) {
            roleElement.textContent += roleText.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 100 + 50); // Random typing speed
        }
    }
    
    setTimeout(typeWriter, 1000);

    // Enhanced Skill Bars Animation
    const skillProgressBars = document.querySelectorAll('.progress');
    if (skillProgressBars.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target;
                    const level = skillLevel.dataset.level;
                    if (level) {
                        // Animate with easing
                        let currentWidth = 0;
                        const targetWidth = parseInt(level);
                        const duration = 1500; // 1.5 seconds
                        const startTime = performance.now();

                        function animate(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // Easing function
                            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                            currentWidth = easeOutQuart * targetWidth;
                            
                            skillLevel.style.width = currentWidth + '%';
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        }
                        
                        requestAnimationFrame(animate);
                    }
                    observer.unobserve(skillLevel);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        skillProgressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Enhanced Project Modal
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const viewDetailButtons = document.querySelectorAll('.view-project-details');

    // Add parallax effect to modal image
    modalImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = modalImage.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        modalImage.style.transform = `
            perspective(1000px)
            rotateY(${(x - 0.5) * 10}deg)
            rotateX(${(y - 0.5) * -10}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });

    modalImage.addEventListener('mouseleave', () => {
        modalImage.style.transform = 'none';
    });

    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const image = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const githubLink = this.getAttribute('data-github');

            // Fade in modal
            projectModal.style.display = 'flex';
            projectModal.style.opacity = '0';
            
            // Load content with delay
            setTimeout(() => {
                modalImage.src = image;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modalGithubLink.href = githubLink;
                
                // Fade in content
                projectModal.style.opacity = '1';
            }, 100);
        });
    });

    // Xử lý sự kiện cho nút GitHub
    modalGithubLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default behavior temporarily
        const githubUrl = this.href; // Store the URL
        
        // Open GitHub link in new tab
        window.open(githubUrl, '_blank');
        
        // Close modal after a short delay
        setTimeout(() => {
            projectModal.style.opacity = '0';
            setTimeout(() => {
                projectModal.style.display = 'none';
            }, 300);
        }, 100);
    });

    closeButton.addEventListener('click', function() {
        projectModal.style.opacity = '0';
        setTimeout(() => {
            projectModal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', function(event) {
        if (event.target == projectModal) {
            projectModal.style.opacity = '0';
            setTimeout(() => {
                projectModal.style.display = 'none';
            }, 300);
        }
    });

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.card, .project, .skill-category');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        document.documentElement.classList.add(storedTheme);
        if (storedTheme === 'light-mode') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('light-mode');
        if (document.documentElement.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });
}); 