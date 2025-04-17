// main.js - General enhancements and effects

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for nav links (if anchor links are used)
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // Fade-in animation for product cards or features on load
    const animatedSections = document.querySelectorAll(".feature, .product-card, .cart-item");
    animatedSections.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
      setTimeout(() => {
        el.style.transition = "all 0.6s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 100 * i);
    });
  
    // Dark mode toggle (optional bonus feature)
    const darkToggle = document.createElement("button");
    darkToggle.innerText = "🌙 Toggle Dark Mode";
    darkToggle.className = "btn";
    darkToggle.style.position = "fixed";
    darkToggle.style.bottom = "20px";
    darkToggle.style.right = "20px";
    document.body.appendChild(darkToggle);
  
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  });..