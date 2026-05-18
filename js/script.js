(function() {
    // DOM elements
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Helper: Close mobile menu if open
    function closeMobileMenu() {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }

    // Helper: Open mobile menu
    function openMobileMenu() {
      navMenu.classList.add('open');
      mobileToggleBtn.classList.add('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    // Toggle mobile menu with button click
    function toggleMobileMenu() {
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    // Event listener for hamburger
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    // Helper: set active link based on current page URL
    function setActiveLinkBasedOnURL() {
      const currentPath = window.location.pathname;
      const currentPage = currentPath.split('/').pop() || 'index.html';
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // When any nav link is clicked - close mobile menu and let navigation happen naturally
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        // Only close mobile menu, don't prevent default navigation
        if (navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    });

    // Set active link based on current page
    setActiveLinkBasedOnURL();

    // Optional: if you click outside the menu on mobile, close it
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isToggleButton = mobileToggleBtn ? mobileToggleBtn.contains(event.target) : false;
      const isMenuOpen = navMenu.classList.contains('open');
      
      if (isMenuOpen && !isClickInsideMenu && !isToggleButton) {
        closeMobileMenu();
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
        if (window.innerWidth > 768 && document.body.style.overflow === 'hidden') {
          document.body.style.overflow = '';
        }
      }, 150);
    });
    
    // Close mobile menu on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  })();