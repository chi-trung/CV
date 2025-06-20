document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'dark'; // Default to dark if not set
            body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
            themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-chevron-left');
            icon.classList.toggle('fa-chevron-right');
        });
    }

    // Scroll to section with title centered
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            // Close the menu on mobile after clicking a link
            if (!navMenu.classList.contains('hidden')) {
                navMenu.classList.add('hidden');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    });

    // Scroll to intro when clicking avatar or name
    const navAvatar = document.querySelector('.nav-avatar');
    const navAvatarName = document.querySelector('.nav-avatar-name');
    if (navAvatar) {
        navAvatar.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('intro');
            navLinks.forEach(l => l.classList.remove('active'));
        });
    }
    if (navAvatarName) {
        navAvatarName.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('intro');
            navLinks.forEach(l => l.classList.remove('active'));
        });
    }

    // Scroll to section function
    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const offset = window.innerHeight / 4; // Adjusted offset to better center the section

            window.scrollTo({
                top: sectionTop - offset,
                behavior: 'smooth'
            });
        }
    }

    // Active section highlight
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let closestSection = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - window.innerHeight / 4);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        const currentId = closestSection ? closestSection.getAttribute('id') : '';

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentId) {
                link.classList.add('active');
            }
        });
    });


    // Skill progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const proficiency = bar.getAttribute('data-proficiency');
            bar.style.width = proficiency + '%';
        });
    };

    const skillsSection = document.getElementById('skills');
    let animated = false;
    window.addEventListener('scroll', () => {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;
        if (sectionPos < screenPos && !animated) {
            animateSkillBars();
            animated = true;
        }
    });

    // Profile image and name fixed on scroll
    const profileImg = document.querySelector('.profile-img');
    const name = document.querySelector('.name');
    const introSection = document.getElementById('intro');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const introBottom = introSection.offsetTop + introSection.offsetHeight;

        if (currentScroll > introBottom) {
            profileImg.classList.add('fixed');
            name.classList.add('fixed');
        } else {
            profileImg.classList.remove('fixed');
            name.classList.remove('fixed');
        }

        if (currentScroll > lastScrollTop) {
            profileImg.style.opacity = '0';
            name.style.opacity = '0';
        } else {
            profileImg.style.opacity = '1';
            name.style.opacity = '1';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScrollTop;
    });

    // Go back function
    window.goBack = function () {
        window.location.href = '../index.html#team';
    };
});