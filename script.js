  // Enhanced mobile menu functionality
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
          nav.classList.remove('shadow-lg');
          nav.classList.add('shadow-md');
          return;
      }
      
      if (currentScroll > lastScroll && currentScroll > 80) {
          // Scrolling down & past the header
          nav.classList.add('-translate-y-full');
          nav.classList.add('shadow-lg');
          mobileMenu.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
      } else {
          // Scrolling up
          nav.classList.remove('-translate-y-full');
      }
      
      lastScroll = currentScroll;
  });

  // Close mobile menu on larger screens
  window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
          mobileMenu.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
      }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
              if (entry.target.classList.contains('stat-card')) {
                  animateValue(entry.target.querySelector('.counter'), 0, parseInt(entry.target.dataset.value), 2000);
              }
          }
      });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.fade-in, .scale-in, .slide-in').forEach((element) => {
      observer.observe(element);
  });

  // Counter animation function
  function animateValue(obj, start, end, duration) {
      if (!obj) return;
      
      let startTimestamp = null;
      const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const current = Math.floor(progress * (end - start) + start);
          obj.innerHTML = current;
          if (progress < 1) {
              window.requestAnimationFrame(step);
          }
      };
      window.requestAnimationFrame(step);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
              // Close mobile menu if open
              mobileMenu.classList.add('hidden');
              menuBtn.setAttribute('aria-expanded', 'false');
          }
      });
  });

  // Add parallax effect to floating backgrounds
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      document.querySelectorAll('.floating-bg').forEach((element, index) => {
          const speed = 0.2 + (index * 0.1);
          element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
      });
  });

  // Add hover effect for cards
  document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.classList.add('hover-active');
      });
      
      card.addEventListener('mouseleave', function() {
          this.classList.remove('hover-active');
      });
  });

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
          img.src = img.src;
      });
  } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
  }

  // Form validation (if you add a form)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          // Add your form validation and submission logic here
          console.log('Form submitted');
      });
  });

  // Add preloading for important resources
  window.addEventListener('load', () => {
      // Preload important images
      const imagesToPreload = [
          '/assets/img1.jpg',
          '/assets/img2.jpg',
          '/assets/img3.jpg',
          '/assets/img4.jpg'
      ];
      
      imagesToPreload.forEach(imageSrc => {
          const img = new Image();
          img.src = imageSrc;
      });
  });





// Function to load sections dynamically
function loadSection(sectionId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => document.getElementById(sectionId).innerHTML = html)
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Load sections into the main page


loadSection("hero", "hero.html");
loadSection("features", "features.html");
loadSection("countries", "countries.html");
loadSection("cta", "cta.html");
loadSection("footer", "footer.html");
