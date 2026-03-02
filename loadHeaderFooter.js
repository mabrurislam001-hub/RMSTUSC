// loadHeaderFooter.js
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        
        // Re-attach mobile menu event listeners after header is loaded
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
          mobileMenu.onclick = function() {
            document.querySelector('.nav-links').classList.toggle('active');
          };
        }
        
        // Run header adjustment scripts
        adjustBodyPadding();
        setupDropdowns();
      }
    })
    .catch(error => console.error('Error loading header:', error));

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      }
    })
    .catch(error => console.error('Error loading footer:', error));
});

function adjustBodyPadding() {
  const header = document.querySelector('header');
  const body = document.body;
  if (header && body) {
    body.style.paddingTop = header.offsetHeight + 'px';
  }
  
  window.addEventListener('resize', function() {
    if (header && body) {
      body.style.paddingTop = header.offsetHeight + 'px';
    }
  });
}

function setupDropdowns() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle("open");

        // Close other dropdowns
        document.querySelectorAll(".dropdown").forEach(drop => {
          if (drop !== parent) drop.classList.remove("open");
        });
      }
    });
  });

  // Close dropdowns if clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach(drop => {
        drop.classList.remove("open");
      });
    }
  });
}