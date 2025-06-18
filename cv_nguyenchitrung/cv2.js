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

    // Enhanced Skill Bars Animation with Intersection Observer
    const skillBars = document.querySelectorAll('.progress-bar .progress');
    const skillSection = document.querySelector('#skills');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(skillBar => {
                    const level = skillBar.getAttribute('data-level');
                    const skillLevel = skillBar;
                    
                    // Trigger animation bằng cách set width
                    setTimeout(() => {
                        skillLevel.style.width = level + '%';
                        
                        // Update percent text
                        const percentSpan = skillLevel.querySelector('.progress-percent');
                        if (percentSpan) {
                            let currentPercent = 0;
                            const targetPercent = parseInt(level);
                            const duration = 1500;
                            const startTime = performance.now();
                            
                            function updatePercent(currentTime) {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                
                                // Ease out quad function
                                const easeProgress = 1 - Math.pow(1 - progress, 2);
                                currentPercent = Math.floor(easeProgress * targetPercent);
                                
                                percentSpan.textContent = currentPercent + '%';
                                
                                if (progress < 1) {
                                    requestAnimationFrame(updatePercent);
                                }
                            }
                            
                            requestAnimationFrame(updatePercent);
                        }
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Bắt đầu animation khi 20% của section xuất hiện
    });

    if (skillSection) {
        skillObserver.observe(skillSection);
    }

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

    document.querySelectorAll('.book').forEach(book => {
        const cover = book.querySelector('.cover');
        if (cover && cover.querySelector('.gun-button')) {
            let shootInterval = null;
            book.addEventListener('mouseenter', function() {
                shootInterval = setInterval(() => {
                    cover.classList.add('shooting');
                    setTimeout(() => cover.classList.remove('shooting'), 250);
                }, 400);
            });
            book.addEventListener('mouseleave', function() {
                clearInterval(shootInterval);
                cover.classList.remove('shooting');
            });
        }
    });

    // Audio Player
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-button');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const playIcon = playButton.querySelector('.play-icon svg');

    // Format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update progress bar
    function updateProgress() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }

    // Update total time when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    // Play/Pause
    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>';
            playButton.querySelector('span').textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playIcon.innerHTML = '<path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>';
            playButton.querySelector('span').textContent = 'Click to Play';
        }
    });

    // Update progress bar while playing
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Click on progress bar to seek
    progressBar.addEventListener('click', (e) => {
        const percent = (e.offsetX / progressBar.offsetWidth);
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });

    // Handle audio end
    audioPlayer.addEventListener('ended', () => {
        playIcon.innerHTML = '<path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>';
        playButton.querySelector('span').textContent = 'Click to Play';
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });

    // Animate education progress circle only when in view
    (function() {
        const progressVisual = document.querySelector('.progress-visual');
        if (!progressVisual) return;
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    // Animate progress circle (phiên bản đầu: easeOutCubic, 2.5s)
                    const circle = progressVisual.querySelector('.progress-ring-circle');
                    const radius = circle.r.baseVal.value;
                    const circumference = radius * 2 * Math.PI;
                    const progressNumber = progressVisual.querySelector('.progress-number');
                    const value = 70; // Số tín chỉ tích lũy
                    const total = 120; // Tổng số tín chỉ
                    circle.style.strokeDasharray = `${circumference} ${circumference}`;
                    circle.style.strokeDashoffset = circumference;
                    let current = 0;
                    const duration = 2500; // 2.5 giây
                    const startTime = performance.now();
                    function animate(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Easing: easeOutCubic (nhanh lúc đầu, chậm về cuối)
                        const ease = 1 - Math.pow(1 - progress, 3);
                        current = Math.round(ease * value);
                        const offset = circumference - ((current / total) * circumference);
                        circle.style.strokeDashoffset = offset;
                        progressNumber.textContent = current;
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            progressNumber.textContent = value;
                        }
                    }
                    requestAnimationFrame(animate);
                    observer.unobserve(progressVisual);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(progressVisual);
    })();

    // Progress Ring Circle Animation with Intersection Observer
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    const progressRingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const level = circle.closest('.circular-progress-container').getAttribute('data-level');
                const circumference = 2 * Math.PI * 40; // r = 40 from SVG
                
                // Set initial state
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
                
                // Animate to target value
                setTimeout(() => {
                    const percentSpan = circle.closest('.circular-progress-container').querySelector('.circular-progress-percent');
                    if (percentSpan) {
                        let currentPercent = 0;
                        const targetPercent = parseInt(level);
                        const duration = 800; // Faster animation
                        const startTime = performance.now();
                        
                        function updateProgress(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // Ease out quad function for smoother animation
                            const easeProgress = 1 - Math.pow(1 - progress, 2);
                            currentPercent = Math.floor(easeProgress * targetPercent);
                            
                            // Update both number and circle simultaneously
                            percentSpan.textContent = currentPercent + '%';
                            const offset = circumference - (currentPercent / 100) * circumference;
                            circle.style.strokeDashoffset = offset;
                            
                            if (progress < 1) {
                                requestAnimationFrame(updateProgress);
                            }
                        }
                        
                        requestAnimationFrame(updateProgress);
                    }
                }, 100);
                
                progressRingObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    progressRings.forEach(ring => {
        progressRingObserver.observe(ring);
    });
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