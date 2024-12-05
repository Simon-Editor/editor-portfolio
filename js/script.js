/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  const menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
const typingEffect = new Typed(".typedText", {
  strings: ["Web Designer", "Photographer", "Videographer", "Graphics Designer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

/* ----- SCROLL REVEAL ANIMATION ----- */
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/* HOME SECTION */
sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });

/* PROJECT BOX */
sr.reveal(".project-box", { interval: 200 });

/* HEADINGS */
sr.reveal(".top-header", {});

/* SCROLL REVEAL LEFT-RIGHT ANIMATION */
const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/* ----- HANDLE CONTACT FORM SUBMISSION ----- */
document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.querySelector('#sendButton');

  if (sendButton) {
    sendButton.addEventListener('click', (e) => {
      e.preventDefault();

      // Get form input values
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const message = document.querySelector('#message').value.trim();

      // Select popup elements
      const successPopup = document.getElementById('successPopup');
      const errorPopup = document.getElementById('errorPopup');

      

      // Validation: Check if fields are empty
      if (!name || !email || !message) {
        // Show the error popup
        errorPopup.style.display = 'block';

        // Automatically hide the error popup after 3 seconds
        setTimeout(() => {
          errorPopup.style.display = 'none';
        }, 3000);
        return; // Stop further execution if validation fails
      }

      // Send the form data to the correct backend route
      fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
        .then((response) => {
          if (response.ok) {
            // Show the success popup
            successPopup.style.display = 'block';

            // Automatically hide the success popup after 3 seconds
            setTimeout(() => {
              successPopup.style.display = 'none';
            }, 3000);
          } else {
            response.text().then((err) => {
              console.error(`Error: ${err}`);
            });
          }
        })
        .catch(() => {
          console.error('There was a network error. Please try again.');
        });
    });
  } else {
    console.error('#sendButton element not found');
  }
});


// Add a fade-out class before hiding it
setTimeout(() => {
  successPopup.classList.add('fade-out');
  setTimeout(() => {
    successPopup.style.display = 'none';
    successPopup.classList.remove('fade-out');
  }, 500); // Match the duration of the CSS transition
}, 3000);


// Initialize EmailJS
(function () {
  emailjs.init('tFBG7KYodaSQeWyt1'); // Replace with your actual EmailJS Public Key
})();

// Add event listener to the contact form
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from reloading the page

  // Get references to success and error messages
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Send the form using EmailJS
  emailjs
    .sendForm('service_qgrlu8n', 'template_95s9ood', this, 'tFBG7KYodaSQeWyt1')
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        successMessage.classList.remove('hidden'); // Show success message
        errorMessage.classList.add('hidden'); // Hide error message
        document.getElementById('contactForm').reset(); // Reset form fields
      },
      function (error) {
        console.error('FAILED...', error);
        errorMessage.classList.remove('hidden'); // Show error message
        successMessage.classList.add('hidden'); // Hide success message
      }
    );
});
