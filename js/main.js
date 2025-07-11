// ============================================
// Premium Spices Website - Main JavaScript
// Powered by GSAP for smooth animations
// ============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Global Variables & Configuration
// ============================================
const config = {
  animations: {
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2
  },
  mobile: {
    breakpoint: 768
  }
};

// ============================================
// Utility Functions
// ============================================
const Utils = {
  isMobile: () => window.innerWidth <= config.mobile.breakpoint,
  
  // Debounce function for scroll events
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

  // Random number generator
  random: (min, max) => Math.random() * (max - min) + min,

  // Element selector helper
  select: (selector, parent = document) => parent.querySelector(selector),
  selectAll: (selector, parent = document) => parent.querySelectorAll(selector)
};

// ============================================
// Navigation & Mobile Menu
// ============================================
class Navigation {
  constructor() {
    this.navbar = Utils.select('.navbar');
    this.navLinks = Utils.selectAll('.nav-link');
    this.hamburger = Utils.select('.hamburger');
    this.navMenu = Utils.select('.nav-menu');
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.highlightActiveSection();
  }

  setupScrollEffect() {
    let lastScrollY = window.scrollY;
    
    const handleScroll = Utils.debounce(() => {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class
      if (currentScrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(this.navbar, {
          y: -100,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(this.navbar, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      lastScrollY = currentScrollY;
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }

  setupMobileMenu() {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      // Open menu animation
      gsap.set(this.navMenu, { display: 'flex', x: '100%' });
      gsap.to(this.navMenu, {
        x: '0%',
        duration: 0.4,
        ease: "power3.out"
      });
      
      // Animate hamburger
      gsap.to(this.hamburger.children[0], { rotation: 45, y: 7, duration: 0.3 });
      gsap.to(this.hamburger.children[1], { opacity: 0, duration: 0.3 });
      gsap.to(this.hamburger.children[2], { rotation: -45, y: -7, duration: 0.3 });
      
    } else {
      // Close menu animation
      gsap.to(this.navMenu, {
        x: '100%',
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(this.navMenu, { display: 'none' });
        }
      });
      
      // Reset hamburger
      gsap.to(this.hamburger.children[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(this.hamburger.children[1], { opacity: 1, duration: 0.3 });
      gsap.to(this.hamburger.children[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal links
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = Utils.select(href);
          
          if (target) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: target,
                offsetY: 80
              },
              ease: "power3.inOut"
            });
          }
        }
        
        // Close mobile menu if open
        if (this.isMenuOpen) {
          this.toggleMobileMenu();
        }
      });
    });
  }

  highlightActiveSection() {
    const sections = Utils.selectAll('section[id]');
    
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => this.setActiveLink(section.id),
        onEnterBack: () => this.setActiveLink(section.id)
      });
    });
  }

  setActiveLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }
}

// ============================================
// Hero Animations
// ============================================
class HeroAnimations {
  constructor() {
    this.hero = Utils.select('.hero');
    this.cardamomPods = Utils.selectAll('.cardamom-pod');
    this.spiceParticles = Utils.select('.spice-particles');
    this.ctaButton = Utils.select('.cta-button');
    
    if (this.hero) {
      this.init();
    }
  }

  init() {
    this.animateCardamomPods();
    this.setupCTAInteraction();
    this.createFloatingSpiceEffect();
    this.setupScrollBasedAnimation();
  }

  animateCardamomPods() {
    this.cardamomPods.forEach((pod, index) => {
      // Initial random position
      gsap.set(pod, {
        x: Utils.random(-50, 50),
        y: Utils.random(-30, 30),
        rotation: Utils.random(0, 360),
        scale: Utils.random(0.8, 1.2)
      });

      // Continuous floating animation
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      tl.to(pod, {
        x: `+=${Utils.random(-100, 100)}`,
        y: `+=${Utils.random(-80, 80)}`,
        rotation: `+=${Utils.random(-180, 180)}`,
        duration: Utils.random(4, 8),
        ease: "sine.inOut"
      });

      // Scroll-triggered movement
      ScrollTrigger.create({
        trigger: this.hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: self => {
          const progress = self.progress;
          gsap.set(pod, {
            y: `+=${progress * Utils.random(50, 150)}`,
            x: `+=${progress * Utils.random(-30, 30)}`,
            rotation: `+=${progress * 360}`
          });
        }
      });
    });
  }

  setupCTAInteraction() {
    if (this.ctaButton) {
      // Hover animation
      this.ctaButton.addEventListener('mouseenter', () => {
        gsap.to(this.ctaButton, {
          scale: 1.05,
          y: -3,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      this.ctaButton.addEventListener('mouseleave', () => {
        gsap.to(this.ctaButton, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Click animation
      this.ctaButton.addEventListener('click', () => {
        gsap.to(this.ctaButton, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });

        // Scroll to spices section
        const spicesSection = Utils.select('.spices-showcase');
        if (spicesSection) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: spicesSection,
              offsetY: 80
            },
            ease: "power3.inOut"
          });
        }
      });
    }
  }

  createFloatingSpiceEffect() {
    if (this.spiceParticles) {
      // Continuous particle animation
      gsap.to(this.spiceParticles, {
        backgroundPosition: "0px -2000px",
        duration: 30,
        ease: "none",
        repeat: -1
      });
    }
  }

  setupScrollBasedAnimation() {
    // Parallax effect for hero content
    ScrollTrigger.create({
      trigger: this.hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress;
        gsap.set('.hero-content', {
          y: progress * 100,
          opacity: 1 - progress * 0.5
        });
      }
    });
  }
}

// ============================================
// Spice Showcase Animations
// ============================================
class SpiceShowcase {
  constructor() {
    this.spiceSections = Utils.selectAll('.spice-section');
    this.spiceVisuals = Utils.selectAll('.spice-visual');
    
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.createSpiceParticleEffects();
  }

  setupScrollAnimations() {
    this.spiceSections.forEach((section, index) => {
      // Main section reveal animation
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: config.animations.duration,
            ease: config.animations.ease
          });
        }
      });

      // Staggered content animation
      const spiceInfo = section.querySelector('.spice-info');
      const spiceVisual = section.querySelector('.spice-visual');
      
      if (spiceInfo && spiceVisual) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });

        // Determine animation direction based on layout
        const isReverse = section.querySelector('.spice-content.reverse');
        const infoX = isReverse ? -50 : 50;
        const visualX = isReverse ? 50 : -50;

        tl.fromTo([spiceInfo, spiceVisual], {
          opacity: 0,
          x: index % 2 === 0 ? infoX : visualX
        }, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });

        // Animate detail items
        const detailItems = section.querySelectorAll('.detail-item');
        tl.fromTo(detailItems, {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.3");
      }
    });
  }

  setupHoverEffects() {
    this.spiceVisuals.forEach(visual => {
      const spiceImage = visual.querySelector('.spice-image');
      
      if (spiceImage) {
        visual.addEventListener('mouseenter', () => {
          gsap.to(visual, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(spiceImage, {
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out"
          });
        });

        visual.addEventListener('mouseleave', () => {
          gsap.to(visual, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(spiceImage, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        });
      }
    });
  }

  createSpiceParticleEffects() {
    this.spiceVisuals.forEach(visual => {
      // Create floating particles on hover
      visual.addEventListener('mouseenter', () => {
        this.createParticleBurst(visual);
      });
    });
  }

  createParticleBurst(container) {
    const particleCount = 8;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-green);
        border-radius: 50%;
        pointer-events: none;
        top: 50%;
        left: 50%;
        z-index: 10;
      `;
      
      container.appendChild(particle);
      particles.push(particle);

      // Animate particle
      gsap.set(particle, { scale: 0 });
      gsap.to(particle, {
        scale: 1,
        x: Utils.random(-100, 100),
        y: Utils.random(-100, 100),
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        }
      });
    }
  }
}

// ============================================
// Quality Section Animations
// ============================================
class QualityAnimations {
  constructor() {
    this.qualityItems = Utils.selectAll('.quality-item');
    this.init();
  }

  init() {
    this.setupRevealAnimation();
    this.setupHoverEffects();
  }

  setupRevealAnimation() {
    if (this.qualityItems.length > 0) {
      ScrollTrigger.create({
        trigger: '.quality-section',
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(this.qualityItems, {
            opacity: 0,
            y: 50,
            scale: 0.9
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
          });
        }
      });
    }
  }

  setupHoverEffects() {
    this.qualityItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
}

// ============================================
// Timeline Animations (About Page)
// ============================================
class TimelineAnimations {
  constructor() {
    this.timelineItems = Utils.selectAll('.timeline-item');
    this.init();
  }

  init() {
    if (this.timelineItems.length > 0) {
      this.setupTimelineReveal();
    }
  }

  setupTimelineReveal() {
    this.timelineItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        onEnter: () => {
          const isEven = index % 2 === 0;
          const startX = isEven ? -100 : 100;
          
          gsap.fromTo(item, {
            opacity: 0,
            x: startX,
            y: 30
          }, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          });

          // Animate marker
          const marker = item.querySelector('.timeline-marker');
          if (marker) {
            gsap.fromTo(marker, {
              scale: 0,
              rotation: -180
            }, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay: 0.3
            });
          }
        }
      });
    });
  }
}

// ============================================
// Contact Form Enhancements
// ============================================
class ContactForm {
  constructor() {
    this.form = Utils.select('#contactForm');
    this.formInputs = Utils.selectAll('.form-group input, .form-group select, .form-group textarea');
    this.submitButton = Utils.select('.submit-button');
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.setupFormAnimations();
    this.setupFormValidation();
    this.setupFloatingSpices();
  }

  setupFormAnimations() {
    // Reveal animation
    ScrollTrigger.create({
      trigger: '.contact-section',
      start: "top 70%",
      onEnter: () => {
        const contactContainers = Utils.selectAll('.contact-form-container, .contact-info-container');
        
        gsap.fromTo(contactContainers, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });

    // Input focus animations
    this.formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });
  }

  setupFormValidation() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  handleFormSubmit() {
    // Animate submit button
    gsap.to(this.submitButton, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Simulate form submission
        this.showSuccessMessage();
      }
    });
  }

  showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
      <div style="
        background: var(--primary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        text-align: center;
        margin-top: 1rem;
        opacity: 0;
        transform: translateY(20px);
      ">
        ✓ Thank you! Your message has been sent successfully.
      </div>
    `;
    
    this.form.appendChild(successDiv);
    
    // Animate success message
    gsap.to(successDiv.firstElementChild, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // Reset form after delay
    setTimeout(() => {
      this.form.reset();
      successDiv.remove();
    }, 3000);
  }

  setupFloatingSpices() {
    const spiceElements = Utils.selectAll('.floating-spices .spice-element');
    
    spiceElements.forEach((spice, index) => {
      gsap.to(spice, {
        y: Utils.random(-20, 20),
        x: Utils.random(-15, 15),
        rotation: Utils.random(-45, 45),
        duration: Utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });
    });
  }
}

// ============================================
// Performance Optimizations
// ============================================
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.optimizeAnimations();
    this.setupIntersectionObserver();
  }

  setupLazyLoading() {
    // Lazy load background images
    const lazyElements = Utils.selectAll('[data-bg]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bg = element.dataset.bg;
          element.style.backgroundImage = `url(${bg})`;
          element.removeAttribute('data-bg');
          imageObserver.unobserve(element);
        }
      });
    });

    lazyElements.forEach(el => imageObserver.observe(el));
  }

  optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      gsap.globalTimeline.timeScale(0.7);
    }

    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    });
  }

  setupIntersectionObserver() {
    // Only animate elements when they're visible
    const animatedElements = Utils.selectAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => animationObserver.observe(el));
  }
}

// ============================================
// Smooth Scroll Polyfill for better browser support
// ============================================
function setupSmoothScrollPolyfill() {
  if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for older browsers
    const links = Utils.selectAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = Utils.select(`#${targetId}`);
        
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: "power2.inOut"
          });
        }
      });
    });
  }
}

// ============================================
// Page Loader
// ============================================
class PageLoader {
  constructor() {
    this.init();
  }

  init() {
    // Create minimal loader
    const loader = document.createElement('div');
    loader.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--cream);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
      " id="pageLoader">
        <div style="
          width: 50px;
          height: 50px;
          border: 3px solid var(--beige);
          border-top: 3px solid var(--primary-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    
    document.body.appendChild(loader);

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
      const loaderElement = Utils.select('#pageLoader');
      if (loaderElement) {
        gsap.to(loaderElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loaderElement.remove();
          }
        });
      }
    });
  }
}

// ============================================
// Main Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize page loader
  new PageLoader();
  
  // Initialize core components
  new Navigation();
  new HeroAnimations();
  new SpiceShowcase();
  new QualityAnimations();
  new TimelineAnimations();
  new ContactForm();
  new PerformanceOptimizer();
  
  // Setup polyfills
  setupSmoothScrollPolyfill();
  
  // Refresh ScrollTrigger after everything is loaded
  ScrollTrigger.refresh();
});

// ============================================
// Window Resize Handler
// ============================================
window.addEventListener('resize', Utils.debounce(() => {
  ScrollTrigger.refresh();
}, 250));

// ============================================
// Error Handling
// ============================================
window.addEventListener('error', (e) => {
  console.warn('Animation error caught:', e.error);
  // Graceful degradation - continue without animations if needed
});

// ============================================
// Export for potential external use
// ============================================
window.SpicesWebsite = {
  Navigation,
  HeroAnimations,
  SpiceShowcase,
  QualityAnimations,
  TimelineAnimations,
  ContactForm,
  Utils
};