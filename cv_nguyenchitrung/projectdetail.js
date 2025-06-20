// Get project details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const projectData = {
    title: urlParams.get('title'),
    tech: urlParams.get('tech'),
    description: urlParams.get('description'),
    github: urlParams.get('github'),
    images: urlParams.get('images')?.split(',') || []
};

// Update page content
document.getElementById('projectTitle').textContent = projectData.title;
document.getElementById('projectDescription').textContent = projectData.description;
document.getElementById('githubLink').href = projectData.github;

// Add tech badges
const techStack = document.getElementById('projectTech');
projectData.tech?.split('•').forEach(tech => {
    if (tech.trim()) {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech.trim();
        techStack.appendChild(badge);
    }
});

// Add images to gallery
const gallery = document.getElementById('projectGallery');
projectData.images.forEach(image => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = projectData.title;
    img.className = 'project-image';
    gallery.appendChild(img);
});

// Image modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        setTimeout(() => modal.classList.add('active'), 10);
    });
});

function closeImageModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

closeModal.addEventListener('click', closeImageModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeImageModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeImageModal();
    }
}); 