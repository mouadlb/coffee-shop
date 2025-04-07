// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!event.target.closest('#menu-toggle') && !event.target.closest('#mobile-menu')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't process if it's just "#"
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu when clicking a nav link
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to the element with a slight offset for the fixed header
                const headerHeight = 80; // Approximate height of the header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state to menu category links when scrolling
    if (window.location.pathname.includes('menu.html')) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.container .hide-scrollbar a');

        window.addEventListener('scroll', function() {
            let current = '';
            let scrollPosition = window.pageYOffset + 200; // Adding offset for better UX
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-amber-700', 'bg-gray-100');
                link.classList.add('text-gray-700');
                
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.remove('text-gray-700');
                    link.classList.add('text-amber-700', 'bg-gray-100');
                }
            });
        });
    }

    // Add hover effect to all menu item cards
    document.querySelectorAll('.rounded-xl.border').forEach(card => {
        card.classList.add('menu-item');
    });

    // Disable pinch-zoom on mobile
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey
        if(isPinching) e.preventDefault()
    }, { passive: false });

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
});
