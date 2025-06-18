let isUserClickScrolling = false;

// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links li a'); // Ensure navLinks is accessible
    const sections = document.querySelectorAll('section[id]'); // Ensure sections is accessible

    // Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Set the flag to true
            isUserClickScrolling = true;

            // Immediately highlight the clicked link
            navLinks.forEach(link => { // Use the already defined navLinks
                link.classList.remove('active');
            });
            this.classList.add('active');

            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // After a sufficiently long delay, reset the flag.
            // The scroll event listener will naturally trigger highlightNavLink once isUserClickScrolling is false.
            setTimeout(() => {
                isUserClickScrolling = false;
                // No direct call to highlightNavLink here.
            }, 800); // Adjust delay as needed, 800ms is a safe bet for smooth scroll
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

    // Linear Progress Bar Animation Logic
    const handleLinearProgressIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const level = skillLevel.dataset.level;
                if (level) {
                    let currentWidth = 0;
                    const targetWidth = parseInt(level);
                    const duration = 1500;
                    const startTime = performance.now();

                    function animateLinearProgress(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        currentWidth = easeOutQuart * targetWidth;
                        skillLevel.style.width = currentWidth + '%'
                        
                        const percentSpan = skillLevel.querySelector('.progress-percent');
                        if (percentSpan) {
                            percentSpan.textContent = `${Math.round(currentWidth)}%`;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(animateLinearProgress);
                        }
                    }
                    requestAnimationFrame(animateLinearProgress);
                }
                observer.unobserve(entry.target);
            }
        });
    };

    // Create Intersection Observer for linear progress
    const linearProgressObserver = new IntersectionObserver(handleLinearProgressIntersection, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe linear progress bars
    skillProgressBars.forEach(bar => {
        linearProgressObserver.observe(bar);
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

    // Add image zoom functionality (for cv2.html)
    const imageModal = document.getElementById('imageModal');
    const closeModal = document.getElementById('closeModal');

    // Add click event to all project images
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', function() {
            imageModal.style.display = 'flex';
            modalImage.src = this.src;
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'flex') {
            imageModal.style.display = 'none';
        }
    });

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Thêm sự kiện click cho nút project-link SPACE
    document.querySelectorAll('.btn.project-link').forEach(btn => {
        btn.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    });

    const contactItems = document.querySelectorAll('.contact-item');
    setTimeout(() => {
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100); // 100ms delay between each item
        });
    }, 1000); // 1000ms (1 second) delay before the animation starts

    // Menu Active State
    // navLinks and sections are already defined at the top of DOMContentLoaded
    
    // Highlight active section in menu
    function highlightNavLink() {
        // Only update based on scroll if not currently scrolling due to a user click
        if (isUserClickScrolling) {
            return; // Skip update if a click-initiated scroll is ongoing
        }

        const scrollY = window.pageYOffset;
        const headerOffset = 100; // Consistent with smooth scroll offset
        let activeSectionId = null;

        // Remove 'active' class from all nav links
        // IMPORTANT: Only remove if the current active link is NOT the one that was just clicked
        // This is handled by the isUserClickScrolling flag.
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Determine which section is currently active
        // Iterate in reverse order to prioritize sections higher up when scrolling down
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop - headerOffset; // Top of section relative to the scrolled position, considering header
            const sectionBottom = sectionTop + section.offsetHeight;

            // If the current scroll position is within the section's boundaries
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                activeSectionId = section.getAttribute('id');
                break; // Found the active section
            }
        }

        // Special case for the very top of the page
        // If no section is found active, and we are near the top, activate 'about'
        if (!activeSectionId && scrollY < 200) { // Threshold for 'near top'
            activeSectionId = 'about';
        }

        // Apply the 'active' class to the corresponding nav link
        if (activeSectionId) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${activeSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Call highlightNavLink initially on page load
    highlightNavLink();

    // Add scroll event listener
    window.addEventListener('scroll', highlightNavLink);

    // Circular progress cho phần education-progress
    function animateEducationProgress() {
        const container = document.querySelector('.education-progress .circular-progress-container');
        if (!container) return;
        const percent = parseInt(container.getAttribute('data-level'));
        const circle = container.querySelector('.circular-progress-bar');
        const percentSpan = container.querySelector('.circular-progress-percent');
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        let current = 0;
        function animate() {
            current += 1;
            if (current > percent) current = percent;
            const offset = circumference - (current / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            percentSpan.textContent = current + '%';
            if (current < percent) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }
    animateEducationProgress();

    // Animate education progress bar (rectangular)
    function animateEducationRectProgress() {
        const container = document.querySelector('.education-progress-rect');
        if (!container) return;
        const value = parseInt(container.querySelector('.progress-value').textContent);
        const total = parseInt(container.querySelector('.progress-total').textContent);
        const percent = Math.round((value / total) * 100);
        const bar = container.querySelector('.progress-bar-inner');
        const percentSpan = container.querySelector('.progress-percent');
        let current = 0;
        function animate() {
            current += 1;
            if (current > percent) current = percent;
            bar.style.width = current + '%';
            percentSpan.textContent = current;
            if (current < percent) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }
    animateEducationRectProgress();

    // Education Progress Animation
    function initEducationProgress() {
        const circle = document.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const progressNumber = document.querySelector('.progress-number');
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        function setProgress(percent) {
            const offset = circumference - (percent / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        }
        
        function animateValue(obj, start, end, duration) {
            const range = end - start;
            const minTimer = 50;
            const stepTime = Math.abs(Math.floor(duration / range));
            const timer = Math.max(stepTime, minTimer);
            const startTime = new Date().getTime();
            const endTime = startTime + duration;
            let timerID;

            function run() {
                const now = new Date().getTime();
                const remaining = Math.max((endTime - now) / duration, 0);
                const value = Math.round(end - (remaining * range));
                obj.innerHTML = value;
                if (value === end) {
                    clearInterval(timerID);
                }
            }

            timerID = setInterval(run, timer);
            run();
        }
        
        // Animate progress circle
        setTimeout(() => {
            setProgress((70/120) * 100);
            animateValue(progressNumber, 0, 70, 2000);
        }, 500);
    }

    // Call the function when the page loads
    initEducationProgress();
});

// Contact Form Email Sending
function sendEmail(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:nguyenchitrung2702@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Tên: ${name}\nEmail: ${email}\n\nNội dung tin nhắn:\n${message}`
    )}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Clear form
    document.getElementById('contactForm').reset();
    
    // Show success message
    alert('Cảm ơn bạn đã liên hệ! Vui lòng kiểm tra email của bạn để hoàn tất việc gửi tin nhắn.');
    
    return false;
} 