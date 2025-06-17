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
    
    // Only run typewriter effect on the main CV page
    if (titleElement) {
        setTimeout(typeWriter, 1000);
    }

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

    // Collapsible skill section functionality
    const skillsToggle = document.querySelector('#skills .collapse-toggle');
    const skillsContent = document.querySelector('.skills-collapsible-content');

    if (skillsToggle && skillsContent) {
        // Initialize based on screen size: collapsed on small screens
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            skillsContent.classList.remove('expanded');
            skillsToggle.classList.remove('rotated');
        } else {
            skillsContent.classList.add('expanded');
            skillsToggle.classList.add('rotated'); // Arrow up for expanded state
        }

        // Add event listener for toggle button
        skillsToggle.addEventListener('click', () => {
            skillsContent.classList.toggle('expanded');
            skillsToggle.classList.toggle('rotated');
        });

        // Add event listener for window resize to adjust initial state
        window.addEventListener('resize', () => {
            const currentIsMobile = window.matchMedia('(max-width: 768px)').matches;
            if (currentIsMobile) {
                // If transitioning to mobile, ensure it's collapsed unless it was explicitly expanded
                if (!skillsContent.classList.contains('expanded')) {
                    skillsContent.classList.remove('expanded');
                    skillsToggle.classList.remove('rotated');
                }
            } else {
                // If transitioning to desktop, ensure it's expanded
                skillsContent.classList.add('expanded');
                skillsToggle.classList.add('rotated');
            }
        });
    }
});

// Function to handle theme toggle for all pages
function initializeThemeToggle() {
    const themeCheckbox = document.getElementById('checkbox');
    const body = document.body;

    // Set initial theme based on localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeCheckbox.checked = (savedTheme === 'dark-mode');
    } else {
        // Default to light mode if no theme saved
        body.classList.remove('dark-mode');
        themeCheckbox.checked = false;
    }

    // Add event listener for theme changes
    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
}

// Call the theme toggle initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeThemeToggle);

// Smooth scroll for side menu links (already merged above)
// document.querySelectorAll('.side-menu a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// Menu toggle functionality for mobile
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');

if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open'); // Toggle class on body
    });

    // Close menu when a link inside is clicked
    sideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            document.body.classList.remove('menu-open'); // Remove class from body when menu closes
        });
    });
}

// Close menu when clicking anywhere on the page
document.addEventListener('click', (event) => {
    if (sideMenu && sideMenu.classList.contains('active')) {
        // Check if the click is outside the menu and not on the toggle button
        if (!sideMenu.contains(event.target) && event.target !== menuToggle) {
            sideMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
}); 