// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
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

    // Add typing effect to role
    const roleElement = document.querySelector('.role');
    const roleText = roleElement.textContent;
    roleElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < roleText.length) {
            roleElement.textContent += roleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);

    // Dynamic Skill Bars - using Intersection Observer
    const skillProgressBars = document.querySelectorAll('.progress');
    if (skillProgressBars.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target;
                    const level = skillLevel.dataset.level; // Get level from data-level attribute
                    if (level) {
                        skillLevel.style.width = level + '%';
                    }
                    observer.unobserve(skillLevel); // Stop observing after animation
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the item is visible

        skillProgressBars.forEach(bar => {
            // Initial width is already set to 0% in CSS
            observer.observe(bar);
        });
    }

    // Project Modal Logic
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const viewDetailButtons = document.querySelectorAll('.view-project-details');

    // Add event listener for the GitHub link within the modal
    modalGithubLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        window.open(this.href, '_blank'); // Open the link in a new tab/window programmatically
    });

    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const image = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const githubLink = this.getAttribute('data-github');

            modalImage.src = image;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalGithubLink.href = githubLink;

            projectModal.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == projectModal) {
            projectModal.style.display = 'none';
        }
    });
}); 