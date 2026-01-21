/* ===========================================
   Anne-Gaëlle GRÈZE - Artiste Peintre
   Main JavaScript
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Gallery carousel
    initCarousel();
    
    // Event modal
    initEventModal();
});

/* ===========================================
   Mobile Menu
   =========================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Handle dropdown on mobile
        const dropdownParents = document.querySelectorAll('nav > ul > li.has-dropdown');
        dropdownParents.forEach(function(parent) {
            const dropdown = parent.querySelector('.dropdown');
            if (dropdown) {
                parent.querySelector(':scope > a').addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        parent.classList.toggle('dropdown-open');
                    }
                });
            }
        });
        
        // Handle submenu on mobile
        const submenuParents = document.querySelectorAll('nav .dropdown li.has-submenu');
        submenuParents.forEach(function(parent) {
            parent.querySelector(':scope > a').addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    parent.classList.toggle('submenu-open');
                }
            });
        });
    }
}

/* ===========================================
   Gallery Carousel
   =========================================== */
let currentThemeArtworks = [];
let currentArtworkIndex = 0;

function initCarousel() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    const carouselOverlay = document.getElementById('carouselOverlay');
    
    if (!carouselOverlay) return;
    
    artworkCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const theme = this.dataset.theme;
            const index = parseInt(this.dataset.index);
            
            // Get all artworks from the same theme
            currentThemeArtworks = Array.from(document.querySelectorAll(`.artwork-card[data-theme="${theme}"]`));
            currentArtworkIndex = index;
            
            openCarousel();
        });
    });
    
    // Close button
    const closeBtn = carouselOverlay.querySelector('.carousel-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCarousel);
    }
    
    // Navigation buttons
    const prevBtn = carouselOverlay.querySelector('.carousel-prev');
    const nextBtn = carouselOverlay.querySelector('.carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigateCarousel(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigateCarousel(1);
        });
    }
    
    // Close on overlay click
    carouselOverlay.addEventListener('click', function(e) {
        if (e.target === carouselOverlay) {
            closeCarousel();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!carouselOverlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeCarousel();
        } else if (e.key === 'ArrowLeft') {
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            navigateCarousel(1);
        }
    });
}

function openCarousel() {
    const carouselOverlay = document.getElementById('carouselOverlay');
    carouselOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCarouselDisplay();
}

function closeCarousel() {
    const carouselOverlay = document.getElementById('carouselOverlay');
    carouselOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateCarousel(direction) {
    currentArtworkIndex += direction;
    
    if (currentArtworkIndex < 0) {
        currentArtworkIndex = currentThemeArtworks.length - 1;
    } else if (currentArtworkIndex >= currentThemeArtworks.length) {
        currentArtworkIndex = 0;
    }
    
    updateCarouselDisplay();
}

function updateCarouselDisplay() {
    const carouselImage = document.getElementById('carouselImage');
    const carouselTitle = document.getElementById('carouselTitle');
    const carouselDetails = document.getElementById('carouselDetails');
    
    if (!currentThemeArtworks[currentArtworkIndex]) return;
    
    const currentCard = currentThemeArtworks[currentArtworkIndex];
    const imgSrc = currentCard.querySelector('img').src;
    const title = currentCard.dataset.title;
    const details = currentCard.dataset.details;
    
    carouselImage.src = imgSrc;
    carouselTitle.textContent = title;
    carouselDetails.textContent = details;
}

/* ===========================================
   Event Modal
   =========================================== */
function initEventModal() {
    const eventCards = document.querySelectorAll('.event-card');
    const eventModal = document.getElementById('eventModal');
    
    if (!eventModal) return;
    
    eventCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const eventData = {
                title: this.dataset.title,
                dates: this.dataset.dates,
                location: this.dataset.location,
                venue: this.dataset.venue,
                hours: this.dataset.hours,
                description: this.dataset.description,
                image: this.querySelector('img').src
            };
            
            openEventModal(eventData);
        });
    });
    
    // Close button
    const closeBtn = eventModal.querySelector('.event-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeEventModal);
    }
    
    // Close on overlay click
    eventModal.addEventListener('click', function(e) {
        if (e.target === eventModal) {
            closeEventModal();
        }
    });
    
    // Keyboard close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && eventModal.classList.contains('active')) {
            closeEventModal();
        }
    });
}

function openEventModal(eventData) {
    const eventModal = document.getElementById('eventModal');
    
    document.getElementById('modalEventImage').src = eventData.image;
    document.getElementById('modalEventTitle').textContent = eventData.title;
    document.getElementById('modalEventDates').textContent = eventData.dates;
    document.getElementById('modalEventLocation').textContent = eventData.location;
    document.getElementById('modalEventVenue').textContent = eventData.venue || '';
    document.getElementById('modalEventHours').textContent = eventData.hours || '';
    document.getElementById('modalEventDescription').textContent = eventData.description || '';
    
    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const eventModal = document.getElementById('eventModal');
    eventModal.classList.remove('active');
    document.body.style.overflow = '';
}
