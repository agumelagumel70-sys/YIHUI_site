// Main JavaScript file for Wan Yihui's personal website
// Contains common functionality and utilities

// Utility functions
const utils = {
    // Smooth scroll to element
    scrollTo: (element, offset = 0) => {
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Debounce function for search/input
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format date to Chinese format
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animate element when it comes into viewport
    animateOnScroll: (selector, animation) => {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        ...animation,
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }
};

// Navigation functionality
const navigation = {
    init: () => {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    utils.scrollTo(target, 80); // 80px offset for fixed nav
                }
            });
        });

        // Active nav link highlighting
        navigation.highlightActiveLink();
    },

    highlightActiveLink: () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('text-blue-800', 'font-medium', 'border-b-2', 'border-blue-800', 'pb-1');
                link.classList.remove('text-gray-600');
            }
        });
    }
};

// Search functionality
const search = {
    init: (inputSelector, itemsSelector, searchFields) => {
        const searchInput = document.querySelector(inputSelector);
        const searchItems = document.querySelectorAll(itemsSelector);
        
        if (!searchInput || !searchItems.length) return;

        searchInput.addEventListener('input', utils.debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            search.filterItems(searchItems, searchTerm, searchFields);
        }, 300));
    },

    filterItems: (items, searchTerm, searchFields) => {
        items.forEach(item => {
            let matches = false;
            
            if (!searchTerm) {
                matches = true;
            } else {
                searchFields.forEach(field => {
                    const element = item.querySelector(field);
                    if (element && element.textContent.toLowerCase().includes(searchTerm)) {
                        matches = true;
                    }
                });
            }
            
            if (matches) {
                item.style.display = 'block';
                anime({
                    targets: item,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            } else {
                item.style.display = 'none';
            }
        });
    }
};

// Filter functionality
const filter = {
    init: (filterBtnsSelector, itemsSelector, filterAttribute) => {
        const filterBtns = document.querySelectorAll(filterBtnsSelector);
        const filterItems = document.querySelectorAll(itemsSelector);
        
        if (!filterBtns.length || !filterItems.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                const filterValue = btn.dataset.filter;
                filterItems.forEach(item => {
                    const itemValue = item.dataset[filterAttribute];
                    
                    if (filterValue === 'all' || itemValue === filterValue) {
                        item.style.display = 'block';
                        anime({
                            targets: item,
                            opacity: [0, 1],
                            scale: [0.9, 1],
                            duration: 400,
                            easing: 'easeOutQuad'
                        });
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
};

// Expandable content functionality
const expandable = {
    init: (triggerSelector, contentSelector) => {
        const triggers = document.querySelectorAll(triggerSelector);
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const content = trigger.closest('.award-item, .practice-item, .paper-item, .teaching-item, .project-item, .conference-item, .timeline-item')
                    .querySelector(contentSelector);
                const icon = trigger.querySelector('i');
                
                if (content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                    if (icon) {
                        icon.setAttribute('data-feather', 'chevron-down');
                        feather.replace();
                    }
                } else {
                    content.classList.add('expanded');
                    if (icon) {
                        icon.setAttribute('data-feather', 'chevron-up');
                        feather.replace();
                    }
                }
            });
        });
    }
};

// Contact functionality
const contact = {
    init: () => {
        // Email copy functionality
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const email = link.getAttribute('href').replace('mailto:', '');
                contact.copyToClipboard(email);
                contact.showNotification('邮箱地址已复制到剪贴板');
            });
        });

        // Phone click functionality
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default on desktop
                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    e.preventDefault();
                    const phone = link.getAttribute('href').replace('tel:', '');
                    contact.showNotification(`电话号码：${phone}`);
                }
            });
        });
    },

    copyToClipboard: (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    },

    showNotification: (message) => {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Scroll to top functionality
const scrollTop = {
    init: () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i data-feather="arrow-up" class="w-6 h-6"></i>';
        scrollBtn.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-40 hover:bg-blue-700';
        scrollBtn.id = 'scroll-top-btn';
        
        document.body.appendChild(scrollBtn);
        feather.replace();
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
            } else {
                scrollBtn.style.opacity = '0';
            }
        });
        
        // Scroll to top when clicked
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// Loading animation
const loading = {
    init: () => {
        // Hide loading screen when page is loaded
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            if (loader) {
                anime({
                    targets: loader,
                    opacity: [1, 0],
                    duration: 500,
                    easing: 'easeOutQuad',
                    complete: () => {
                        loader.style.display = 'none';
                    }
                });
            }
        });
    }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize common functionality
    navigation.init();
    contact.init();
    scrollTop.init();
    loading.init();
    
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize animations on scroll
    utils.animateOnScroll('.card-hover', {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
    });
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'research.html':
            // Initialize research page functionality
            expandable.init('.expand-btn', '.expandable-content');
            break;
        case 'teaching.html':
            // Initialize teaching page functionality
            filter.init('.filter-btn', '.timeline-item', 'category');
            expandable.init('.expand-btn', '.expandable-content');
            break;
        case 'awards.html':
            // Initialize awards page functionality
            filter.init('.filter-btn', '.award-item, .practice-item, .year-section', 'filter');
            expandable.init('.expand-btn', '.expandable-content');
            break;
    }
});

// Export utilities for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        navigation,
        search,
        filter,
        expandable,
        contact,
        scrollTop,
        loading
    };
}