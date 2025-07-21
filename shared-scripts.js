// Shared JavaScript for Advitiya Bharat

// Mobile menu toggle functionality
function initializeMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// Ripple effect for buttons and interactive elements
function addRippleEffect(element) {
  element.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
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
}

// Page load animation
function initializePageLoadAnimation() {
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
}

// Form validation and submission handling
function initializeFormHandling() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        
        // Add loading state
        submitBtn.textContent = 'Processing...';
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = 'Success!';
          submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.style.background = 'linear-gradient(45deg, #E67E22, #D35400)';
            form.reset();
          }, 2000);
        }, 1500);
      }
    });
  });
}

// Enhanced card interactions
function initializeCardInteractions() {
  document.querySelectorAll('.card, .content-card, .team-member, .highlight-item').forEach(card => {
    card.addEventListener('click', function() {
      // Add click animation
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });

    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.6s ease';
    });
  });
}

// Parallax effect for backgrounds
function initializeParallaxEffect() {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Typing effect for text elements
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect for elements with typing-effect class
function initializeTypingEffect() {
  document.querySelectorAll('.typing-effect').forEach(element => {
    const originalText = element.textContent;
    setTimeout(() => {
      typeWriter(element, originalText, 50);
    }, 2000);
  });
}

// Floating particles effect
function createFloatingParticles() {
  const particleCount = 10;
  const container = document.body;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: fixed;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(230, 126, 34, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
      z-index: -1;
    `;
    container.appendChild(particle);
  }
}

// Add CSS for floating particles
function addFloatingParticlesCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% { 
        transform: translateY(0px) rotate(0deg); 
        opacity: 0.3; 
      }
      50% { 
        transform: translateY(-30px) rotate(180deg); 
        opacity: 1; 
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize all shared functionality
function initializeSharedFunctionality() {
  // Initialize mobile menu
  initializeMobileMenu();
  
  // Initialize scroll animations
  initializeScrollAnimations();
  
  // Initialize smooth scrolling
  initializeSmoothScrolling();
  
  // Initialize page load animation
  initializePageLoadAnimation();
  
  // Initialize form handling
  initializeFormHandling();
  
  // Initialize card interactions
  initializeCardInteractions();
  
  // Initialize parallax effect
  initializeParallaxEffect();
  
  // Initialize typing effect
  initializeTypingEffect();
  
  // Create floating particles
  createFloatingParticles();
  addFloatingParticlesCSS();
  
  // Add ripple effects to buttons
  document.querySelectorAll('button, .btn, .login-btn, .submit-btn').forEach(btn => {
    addRippleEffect(btn);
  });
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSharedFunctionality();
});

// Export functions for use in other scripts
window.AdvitiyaBharat = {
  initializeMobileMenu,
  addRippleEffect,
  initializeScrollAnimations,
  initializeSmoothScrolling,
  initializePageLoadAnimation,
  initializeFormHandling,
  initializeCardInteractions,
  initializeParallaxEffect,
  typeWriter,
  initializeTypingEffect,
  createFloatingParticles,
  initializeSharedFunctionality
}; 