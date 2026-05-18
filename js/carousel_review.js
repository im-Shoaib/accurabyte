// ====== SECTION 3: Testimonials Carousel ======
document.addEventListener('DOMContentLoaded', function() {
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  const dots = document.querySelectorAll('.sec3-dot');
  
  if (!testimonialsGrid || !dots.length) return;
  
  // Store all testimonial cards
  const cards = Array.from(document.querySelectorAll('.sec3-testimonial-card'));
  const cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  
  let currentSlide = 0;
  
  function updateCarousel() {
    const start = currentSlide * cardsPerView;
    const end = start + cardsPerView;
    
    cards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('sec3-dot-active');
      } else {
        dot.classList.remove('sec3-dot-active');
      }
    });
  }
  
  function handleResize() {
    const newCardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    if (newCardsPerView !== cardsPerView) {
      location.reload(); // Simple reload on resize to reset layout
    }
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Initial setup
  updateCarousel();
  
  // Listen for resize
  window.addEventListener('resize', handleResize);
});