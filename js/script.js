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
        document.body.style.overflow = '';  // restore scrolling
      }
    }

    // Helper: Open mobile menu
    function openMobileMenu() {
      navMenu.classList.add('open');
      mobileToggleBtn.classList.add('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent background scroll when menu open
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

    // Helper: set active link based on clicked link, also update underline/active color.
    function setActiveLink(activeElement) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      activeElement.classList.add('active');
    }

    // When any nav link is clicked -> update active state, and close mobile menu (if open)
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();   // prevent actual page jump for demo (client can later set real href)
        
        // Update active class
        setActiveLink(this);
        
        // If mobile menu is open, close it after navigation
        if (navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
        
        // Optional: you can add additional logic here to scroll to sections or update URL.
        // For simulation we just log
        const navText = this.innerText;
        console.log(`Navigation to: ${navText} (active indicator updated)`);
      });
    });

    // Optional: if you click outside the menu on mobile, close it (enhance UX)
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isToggleButton = mobileToggleBtn.contains(event.target);
      const isMenuOpen = navMenu.classList.contains('open');
      
      if (isMenuOpen && !isClickInsideMenu && !isToggleButton) {
        closeMobileMenu();
      }
    });

    // Handle window resize: if resizing to desktop while menu is open, force close to avoid layout glitches
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
        // ensure body overflow reset when menu not needed
        if (window.innerWidth > 768 && document.body.style.overflow === 'hidden') {
          document.body.style.overflow = '';
        }
      }, 150);
    });
    
    // Initial setup: ensure that if any link reflects active class from server, but we have "Home" active by default.
    // match spec: "Home" as active with underline + blue color
    // confirm active class already on .nav-link.active from HTML – perfect.
    // But also double-check if any click on active? we prevent default.
    // Also smooth underline ensures perfect spec: active bottom border line.
    
    // For extra robustness: if user clicks on the same active link, menu closes if needed but nothing breaks.
    // Additionally meet accessibility: close mobile on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
    
    // small tweak: when menu is closed by resize, remove inline overflow
    // also clean up event side-effect safety
  })();