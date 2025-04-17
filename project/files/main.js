window.onload = function() {
  setTimeout(function() {
    document.getElementById("loader").style.display = "none";
  }, 1200); // 1000 milliseconds = 1 second
};

// Simple toast notification
function showToast(message,state="") {
  let toast = $("<div class='toast "+ state+"'></div>").text(message);
  $("body").append(toast);
  toast.fadeIn(400).delay(1500).fadeOut(400, function () {
    $(this).remove();
  });
}
$(document).ready(function () {
  // Hamburger Menu Toggle
  $('#hamburger').click(function () {
    $('#nav-menu').toggleClass('active');
  });

  // Fade-in animation for cards
  $('.product-card, .feature').css({ opacity: 0, transform: 'translateY(30px)' });

  $('.product-card, .feature').each(function (i) {
    $(this).delay(150 * i).animate({
      opacity: 1,
      transform: 'translateY(0)',
      top: 0
    }, 500);
  });

  // Dark Mode Toggle Button
  const toggleBtn = $('<button>', {
    text: '🌙 Toggle Dark Mode',
    class: 'btn',
    css: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }
  });

  $('body').append(toggleBtn);

  toggleBtn.on('click', function () {
    $('body').toggleClass('dark-mode');
  });
  
  // Checkout button logic
  $("form button.btn").on("click", function (e) {
    e.preventDefault(); // Prevent the form from submitting immediately
    let flag = 0;
    if ($('form#contactForm input#name').val()=="") {
      $('form#contactForm input#name').attr('style','border:1px solid red');
      showToast("Please enter your name the red marked information!","danger");
      flag=1;
    }
    if ($('form#contactForm input#email').val()=="") {
      $('form#contactForm input#email').attr('style','border:1px solid red');
      showToast("Please enter your email in the red marked information!","danger");
      flag=1;
    }
    if ($('form#contactForm textarea#message').val()=="") {
      $('form#contactForm textarea#message').attr('style','border:1px solid red');
      showToast("Please write your message in the red marked information!","danger");
      flag=1;
    }
    if (flag==1) return;
    else {
      // Display a confirmation alert
      showToast("Thank you for your message, "+$('input#name').val()+"!","success");

      setTimeout(function () {
          $("form#contactForm").submit();
      }, 2000);
    }
  });
});
