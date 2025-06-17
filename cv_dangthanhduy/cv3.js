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
    const sectionObserverOptions = {
        rootMargin: '0px 0px -70% 0px', // Top 30% of the viewport is the active zone
        threshold: 0.1 // A small threshold to make sure it's actually visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        // Apply fade-in animation for sections only once
        entries.forEach(entry => {
            if (entry.target.tagName === 'SECTION') {
                if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('fade-in');
                }
            }
        });
    }, sectionObserverOptions);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Observe side-menu items for their own slide-in animation
    const sideMenuObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sideMenuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-left-active');
            }
        });
    }, sideMenuObserverOptions);

    document.querySelectorAll('.side-menu li').forEach(item => {
        sideMenuObserver.observe(item);
    });

    // Function to handle active side menu item on scroll
    function highlightSideMenuOnScroll() {
        const sections = document.querySelectorAll('section');
        const sideMenuLinks = document.querySelectorAll('.side-menu a');
        let currentActiveSectionId = 'contact-info'; // Default active section ID

        // Define a scroll offset to consider a section "active"
        const offset = 100; // pixels from the top of the viewport

        // Find the section that is currently visible at or near the top of the viewport
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();

            // If the section is largely in view near the top of the viewport
            if (rect.top <= offset && rect.bottom > offset) {
                currentActiveSectionId = section.id;
                break; // Found the active section, so no need to check further
            }
        }

        // Special handling for the very bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50); // 50px buffer
        if (isAtBottom) {
            currentActiveSectionId = 'social-media';
        }

        // Handle the case when scrolled to the very top and no section meets the criteria yet
        if (window.scrollY < offset && currentActiveSectionId !== 'contact-info') {
             currentActiveSectionId = 'contact-info';
        }

        // Remove active class from all links
        sideMenuLinks.forEach(link => {
            link.classList.remove('side-menu-active-pulse');
        });

        // Add active class to the current active link
        if (currentActiveSectionId) {
            const activeLink = document.querySelector(`.side-menu a[href="#${currentActiveSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('side-menu-active-pulse');
            }
        }
    }

    // Attach the scroll listener
    window.addEventListener('scroll', highlightSideMenuOnScroll);

    // Call it once on load to set the initial active item
    highlightSideMenuOnScroll();

    // Add hover effects to skills (adjusting for new structure)
    // The previous hover effect on .skills li is removed as per new structure
    // and new effects will be handled by CSS or new JS if needed.

    // Add click effect to contact info
    document.querySelectorAll('.contact-info li').forEach(contact => {
        contact.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Theme Toggle (moved here)
    const themeCheckbox = document.getElementById('checkbox');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeCheckbox.checked = (savedTheme === 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        themeCheckbox.checked = false;
    }

    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.dataset.level; // Get data-level attribute
        if (level) {
            bar.style.setProperty('--skill-level', `${level}%`); // Set CSS variable
        }
    });

    // Add animation for skill bars when they come into view
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.dataset.level;
                if (level) {
                    skillBar.style.width = `${level}%`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0';
        skillBarObserver.observe(bar);
    });

    // Observe the social media section for animation
    const socialMediaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                socialMediaObserver.unobserve(entry.target); // Unobserve after animation
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger earlier
    });

    const socialMediaSection = document.getElementById('social-media');
    if (socialMediaSection) {
        socialMediaObserver.observe(socialMediaSection);
    }

    // Add any interactive features here
    console.log('CV page loaded');
});

// Smooth scroll for side menu links (already merged above)
// document.querySelectorAll('.side-menu a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// }); 