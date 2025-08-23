// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Timeline animation on scroll
function animateTimeline() {
    const experienceSection = document.querySelector('#experience-education');
    if (!experienceSection) return;

    const timelines = [
        {
            container: experienceSection.querySelector('.flex-1:nth-child(1)'), // Experience timeline
            line: experienceSection.querySelector('.flex-1:nth-child(1) .timeline-line'),
            items: experienceSection.querySelectorAll('.flex-1:nth-child(1) .timeline-item')
        },
        {
            container: experienceSection.querySelector('.flex-1:nth-child(2)'), // Education timeline
            line: experienceSection.querySelector('.flex-1:nth-child(2) .timeline-line'),
            items: experienceSection.querySelectorAll('.flex-1:nth-child(2) .timeline-item')
        }
    ];

    const sectionTop = experienceSection.offsetTop;
    const sectionHeight = experienceSection.offsetHeight;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    timelines.forEach(timeline => {
        if (!timeline.container || !timeline.line) return;

        // Calculate progress through the timeline section
        const sectionProgress = Math.max(0, Math.min(1,
            (scrollTop + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        ));

        // Update timeline line progress
        timeline.line.style.setProperty('--progress', `${sectionProgress * 100}%`);

        // Animate timeline items
        timeline.items.forEach((item, index) => {
            const itemTop = item.offsetTop;
            const itemTrigger = sectionTop + itemTop - windowHeight * 0.8;

            if (scrollTop >= itemTrigger) {
                item.classList.add('animate');
            }
        });
    });
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / docHeight) * 100;

    document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
}

// Throttled scroll handler for better performance
let ticking = false;
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateTimeline();
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
}

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    animateTimeline();
    updateScrollProgress();
});

// Intersection Observer for better performance (alternative approach)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

const seeMoreBtn = document.getElementById('see-more-btn');
        const exp3 = document.getElementById('exp-3');
        const exp4 = document.getElementById('exp-4');

        seeMoreBtn.addEventListener('click', () => {
            exp3.classList.toggle('hidden');
            exp4.classList.toggle('hidden');
            seeMoreBtn.textContent = exp3.classList.contains('hidden') ? 'See More' : 'See Less';
        });