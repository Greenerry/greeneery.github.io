// Scroll zoom effect
const minScale = 0.6; // Less zoomed out
const maxScale = 1.5;

const title = document.getElementById('title');
const sections = document.querySelectorAll('.content-section');
const totalSections = sections.length;
const scrollHint = document.querySelector('.scroll-hint');

// Function to update sections based on scroll
function updateSections(scrollTop) {
    const windowHeight = window.innerHeight;
    const titleThreshold = windowHeight * 0.8; // Scroll past this to see sections
    
    // Update title
    if (scrollTop < titleThreshold) {
        title.style.opacity = '1';
        const scrollProgress = Math.min(scrollTop / titleThreshold, 1);
        const titleScale = minScale + (scrollProgress * (maxScale - minScale));
        title.style.transform = `translate(-50%, -50%) scale(${titleScale})`;
    } else {
        title.style.opacity = '0';
    }
    
    // Only show sections after scrolling past the title
    if (scrollTop < titleThreshold) {
        sections.forEach((section) => {
            section.style.opacity = '0';
            section.style.transform = `scale(${minScale})`;
        });
        return;
    }
    
    // Update each section (only after title threshold)
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenterY = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenterY);
        
        // Calculate visibility and scale based on distance from viewport center
        const maxDistance = windowHeight * 0.8;
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        
        // Show section if it's near viewport
        if (progress > 0.05) {
            section.classList.add('visible');
            section.style.opacity = Math.min(progress * 1.2, 1);
            
            // Calculate scale - zoom in as it approaches center
            const scale = minScale + (progress * (maxScale - minScale));
            section.style.transform = `scale(${scale})`;
        } else {
            section.style.opacity = '0';
            section.style.transform = `scale(${minScale})`;
        }
    });
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    updateSections(scrollTop);
    
    // Hide scroll hint after scrolling starts
    if (scrollTop > 50) {
        scrollHint.style.opacity = '0';
    } else {
        scrollHint.style.opacity = '0.6';
    }
});

// Initialize
updateSections(0);

// Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    
    // Close all other dropdowns
    allDropdowns.forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('active');
}

