// form-validation.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const successMsg = document.getElementById("formSuccess");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Basic Validation
      if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        subject.value.trim() === "" ||
        message.value.trim() === ""
      ) {
        alert("Please fill in all fields.");
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Show success message
      successMsg.style.display = "block";
      form.reset();
    });
  });
  