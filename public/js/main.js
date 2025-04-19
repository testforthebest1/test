document.addEventListener('DOMContentLoaded', function() {
  // Toggle mobile navigation
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileNavToggle && nav) {
    mobileNavToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
  
  // Close mobile navigation when clicking outside
  document.addEventListener('click', function(event) {
    if (nav && nav.classList.contains('active') && !event.target.closest('.nav') && !event.target.closest('.mobile-nav-toggle')) {
      nav.classList.remove('active');
    }
  });
  
  // Theme toggler
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.body.classList.toggle('theme-dark');
      
      // Update theme in URL
      const url = new URL(window.location);
      url.searchParams.set('theme', newTheme);
      window.history.replaceState({}, '', url);
      
      // Update theme toggle icon
      updateThemeIcon(newTheme);
    });
    
    // Set initial theme icon based on current theme
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    updateThemeIcon(currentTheme);
  }
  
  // Language switcher
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
      const newLang = currentLang === 'ar' ? 'en' : 'ar';
      
      document.body.classList.toggle('ar');
      
      // Update language in URL
      const url = new URL(window.location);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url);
      
      // Update language toggle text
      langToggle.textContent = newLang === 'ar' ? 'English' : 'العربية';
    });
  }
  
  // Favorite buttons
  const favoriteButtons = document.querySelectorAll('.favorite-button');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const icon = this.querySelector('svg');
      const isFavorite = this.getAttribute('data-favorite') === 'true';
      
      if (isFavorite) {
        this.setAttribute('data-favorite', 'false');
        icon.innerHTML = '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>';
      } else {
        this.setAttribute('data-favorite', 'true');
        icon.innerHTML = '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>';
      }
    });
  });
  
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          const errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.textContent = document.body.classList.contains('ar') ? 'هذا الحقل مطلوب' : 'This field is required';
          
          // Remove existing error message if any
          const existingError = field.parentElement.querySelector('.error-message');
          if (existingError) {
            existingError.remove();
          }
          
          field.parentElement.appendChild(errorMessage);
        }
      });
      
      if (!isValid) {
        event.preventDefault();
      }
    });
  });
  
  // Remove error class on input
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const errorMessage = this.parentElement.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  });
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('slide-in');
        element.classList.remove('animate-on-scroll');
      }
    });
  };
  
  // Run animation check on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});

// Helper function to update theme toggle icon
function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('svg');
  if (!icon) return;
  
  if (theme === 'dark') {
    icon.innerHTML = '<circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  } else {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}

// Motorcycle listings filter functionality
const filterForm = document.getElementById('filter-form');
if (filterForm) {
  filterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // In a real application, this would filter results from the server
    // For this template, we'll just simulate a loading state
    const motorcyclesGrid = document.querySelector('.motorcycles-grid');
    if (motorcyclesGrid) {
      motorcyclesGrid.style.opacity = '0.5';
      
      setTimeout(() => {
        motorcyclesGrid.style.opacity = '1';
        
        // Show a message about applied filters
        const filterMessage = document.createElement('div');
        filterMessage.className = 'filter-message';
        filterMessage.textContent = document.body.classList.contains('ar') ? 'تم تطبيق الفلاتر' : 'Filters applied';
        filterMessage.style.textAlign = 'center';
        filterMessage.style.padding = '10px';
        filterMessage.style.marginBottom = '20px';
        filterMessage.style.backgroundColor = 'var(--accent)';
        filterMessage.style.color = 'white';
        filterMessage.style.borderRadius = '4px';
        
        const existingMessage = document.querySelector('.filter-message');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        motorcyclesGrid.parentElement.insertBefore(filterMessage, motorcyclesGrid);
        
        // Auto-hide the message after 3 seconds
        setTimeout(() => {
          filterMessage.style.opacity = '0';
          filterMessage.style.transition = 'opacity 0.5s';
          
          setTimeout(() => {
            filterMessage.remove();
          }, 500);
        }, 3000);
      }, 500);
    }
  });
}