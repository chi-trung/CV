document.addEventListener('DOMContentLoaded', function() {
    // Get all circular progress containers
    const circularProgressContainers = document.querySelectorAll('.circular-progress-container');

    // Create Intersection Observer for circular progress
    const circularProgressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const skillLevel = container.dataset.level;
                const progressBar = container.querySelector('.circular-progress-bar');
                const percentText = container.querySelector('.circular-progress-percent');

                if (skillLevel && progressBar && percentText) {
                    const targetPercent = parseInt(skillLevel);
                    const radius = parseFloat(progressBar.getAttribute('r'));
                    const circumference = 2 * Math.PI * radius;

                    // Set initial state
                    progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
                    progressBar.style.strokeDashoffset = circumference;
                    percentText.textContent = '0%';

                    // Animate progress
                    let currentPercent = 0;
                    const duration = 1500; // 1.5 seconds
                    const startTime = performance.now();

                    function animateProgress(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Sử dụng easeInOutQuad cho đồng bộ với linear-progress
                        const easeInOutQuad = progress < 0.5
                            ? 2 * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                        currentPercent = easeInOutQuad * targetPercent;

                        // Update progress bar
                        const offset = circumference - (currentPercent / 100) * circumference;
                        progressBar.style.strokeDashoffset = offset;
                        // Update percentage text
                        percentText.textContent = `${Math.round(currentPercent)}%`;

                        if (progress < 1) {
                            requestAnimationFrame(animateProgress);
                        } else {
                            percentText.textContent = `${targetPercent}%`;
                        }
                    }

                    requestAnimationFrame(animateProgress);
                }
                circularProgressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set all circular progress to 0% on load
    circularProgressContainers.forEach(container => {
        const progressBar = container.querySelector('.circular-progress-bar');
        const percentText = container.querySelector('.circular-progress-percent');
        if (progressBar && percentText) {
            const radius = parseFloat(progressBar.getAttribute('r'));
            const circumference = 2 * Math.PI * radius;
            progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
            progressBar.style.strokeDashoffset = circumference;
            percentText.textContent = '0%';
        }
        circularProgressObserver.observe(container);
    });
}); 