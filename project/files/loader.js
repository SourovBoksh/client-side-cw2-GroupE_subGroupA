
function loadPage(txt) {
  // Remove 'active' class from all links
  $('nav ul#nav-menu.nav-menu').find('li a').removeClass("active");
  $('nav ul#nav-menu.nav-menu li a#'+txt).addClass("active");

  $("title").text("ElectroGadget | " + txt);
  $("head").find("link#ACS").remove();
  $("head").append('<link rel="stylesheet" id="ACS" href="files/'+txt+'.css" type="text/css">');
  // Load content with error handling
  if (txt=="Products") {
    window.location.href = window.location.href+"products.html";
  } else {
    if(window.location.href.includes("products.html")) {
      let currentUrl = window.location.href;
      let newUrl = currentUrl.replace("products.html", "");
      window.history.replaceState(null, "", newUrl);
    }
  }
  $("article").load(txt + ".html", function(response, status, xhr) {
    if (status == "error") {
      $("article").html("<p>Error loading content. Please try again!</p>");
    }
  }); 
}

$(document).on("click", "nav ul#nav-menu.nav-menu li a", function(event) {
  event.preventDefault(); // Stops default navigation
  
  let txt = $(this).text();
  loadPage(txt);
  
});
