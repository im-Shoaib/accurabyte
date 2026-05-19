// ====== SECTION 2: Filtered Platforms Tabs ======
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.sec2-filter-btn');
  const cards = document.querySelectorAll('.sec2-card');

  function filterCards(category) {
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('sec2-filter-active'));
      // Add active class to clicked button
      this.classList.add('sec2-filter-active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      filterCards(filterValue);
    });
  });
});