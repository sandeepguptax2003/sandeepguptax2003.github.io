/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");
function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Get current theme
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// Validate if user previously chose a theme
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate/deactivate theme with button
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== CONTACT FORM FUNCTIONALITY ===============*/
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        showToast("Please fill all required fields", "error");
        return;
      }
      
      // Send email using mailto (for demo purposes)
      // In production, integrate with EmailJS or another email service
      const mailtoLink = `mailto:sandeepguptax2003@gmail.com?subject=Portfolio Contact from ${name}&body=${message}%0A%0AContact Email: ${email}`;
      window.location.href = mailtoLink;
      
      // Show success message
      showToast("Message sent successfully! Thank you for reaching out.", "success");
      
      // Reset the form
      contactForm.reset();
    });
  }
  
  // Toast notification function
  function showToast(message, type) {
    if (typeof Toastify === 'function') {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: type === "success" ? "linear-gradient(to right, #9584E6, #7B68EE)" : "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true
      }).showToast();
    } else {
      alert(message);
    }
  }
  
  // Initialize particles.js if available
  if (typeof particlesJS === 'function') {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#9584E6"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#9584E6",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
});

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
// Navigation menu
sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

// Home section with more dynamic animations
sr.reveal(`.home__data`, {
  duration: 1800
});
sr.reveal(`.home__handle`, {
  delay: 100,
  duration: 2000,
  origin: "top"
});
sr.reveal(`.home__social`, {
  delay: 200,
  origin: "left",
  distance: "80px",
});
sr.reveal(`.home__scroll`, {
  delay: 200,
  origin: "right",
  distance: "80px",
});

// About section with directional animations
sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "50px",
  duration: 1800
});
sr.reveal(`.about__data`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "50px",
  duration: 1800
});
sr.reveal(`.about__box`, {
  delay: 300,
  scale: 0.8,
  origin: "bottom",
  distance: "40px",
  interval: 100
});

// Experience section with staggered animations
sr.reveal(`.experience__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "50px",
  interval: 200
});

// Skills section with staggered animations
sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "50px",
  interval: 200
});

// Work section with cascade animations
sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.85,
  origin: "bottom",
  distance: "50px",
  interval: 150
});

// Certifications section with cascade animations
sr.reveal(`.certifications__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "50px",
  interval: 150,
});

// Contact section with opposing direction animations
sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "50px",
});
sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "50px",
});

// Footer
sr.reveal(`.footer__title`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});
sr.reveal(`.footer__list`, {
  delay: 200,
  origin: "bottom",
  distance: "40px",
});
sr.reveal(`.footer__social`, {
  delay: 300,
  scale: 0.8,
  origin: "bottom",
  distance: "30px",
});