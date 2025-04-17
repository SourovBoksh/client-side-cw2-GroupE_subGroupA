$(document).ready(() => {
  // Hamburger Menu Toggle
  $("#hamburger").click(() => {
    $("#nav-menu").toggleClass("show")
  })

  // Fade-in animation for cards
  $(".product-card, .feature").css({ opacity: 0, transform: "translateY(30px)" })

  $(".product-card, .feature").each(function (i) {
    $(this)
      .delay(150 * i)
      .animate(
        {
          opacity: 1,
          transform: "translateY(0)",
          top: 0,
        },
        500,
      )
  })

function initializeDarkMode() {
  const darkModeToggle = $('#dark-mode-toggle');
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Set initial mode
  if (isDarkMode) {
    $('body').addClass('dark-mode');
  }
  
  // Toggle dark mode
  darkModeToggle.on('click', function() {
    $('body').toggleClass('dark-mode');
    const isNowDarkMode = $('body').hasClass('dark-mode');
    localStorage.setItem('darkMode', isNowDarkMode);
  });
}

// Call this when DOM is ready
$(document).ready(function() {
  initializeDarkMode();

});
  $("body").append(toggleBtn)

  toggleBtn.on("click", () => {
    $("body").toggleClass("dark-mode")
  })
})

// Cart functionality
$(document).ready(() => {
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  updateCartCount()

  // Add to Cart button click
  $(document).on("click", ".add-to-cart-btn", function () {
    const productId = $(this).data("id")
    const productName = $(this).data("name")
    const productPrice = Number.parseFloat($(this).data("price"))
    const productImg = $(this).data("img")

    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg,
        quantity: 1,
      })
    }

    // Save cart to localStorage
    saveCart()
    updateCartCount()

    // Show animation
    $(this).text("Added!").addClass("added")
    setTimeout(() => {
      $(this).text("Add to Cart").removeClass("added")
    }, 1500)
  })

  // Cart icon click - redirect to cart page
  $("#cart-icon").click(() => {
    window.location.href = "cart.html"
  })

  // If on cart page, render cart items
  if (window.location.pathname.includes("cart.html")) {
    renderCart()
  }

  // Product filters on products page
  $(".filter-btn").click(function () {
    $(".filter-btn").removeClass("active")
    $(this).addClass("active")

    const filter = $(this).data("filter")

    if (filter === "all") {
      $(".product-card").show()
    } else {
      $(".product-card").hide()
      $(`.product-card[data-category="${filter}"]`).show()
    }
  })

  // Update quantity in cart
  $(document).on("change", ".cart-quantity-input", function () {
    const productId = $(this).data("id")
    const quantity = Number.parseInt($(this).val())

    if (quantity < 1) {
      $(this).val(1)
      updateCartItemQuantity(productId, 1)
    } else {
      updateCartItemQuantity(productId, quantity)
    }
  })

  // Remove item from cart
  $(document).on("click", ".cart-remove-btn", function () {
    const productId = $(this).data("id")
    removeCartItem(productId)
  })

  // Clear cart button
  $("#clear-cart-btn").click(() => {
    cart = []
    saveCart()
    renderCart()
  })

  // Checkout button
  $("#checkout-btn").click(() => {
    alert("Thank you for your order! This is a demo, so no actual payment will be processed.")
    cart = []
    saveCart()
    renderCart()
  })

  // Helper functions
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    $("#cart-count").text(totalItems)
  }

  function updateCartItemQuantity(productId, quantity) {
    const item = cart.find((item) => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveCart()
      renderCart()
    }
  }

  function removeCartItem(productId) {
    cart = cart.filter((item) => item.id !== productId)
    saveCart()
    renderCart()
  }

  function renderCart() {
    if (cart.length === 0) {
      $("#cart-empty-message").show()
      $("#cart-items-container").hide()
      return
    }

    $("#cart-empty-message").hide()
    $("#cart-items-container").show()

    // Clear existing items
    $("#cart-items").empty()

    // Calculate totals
    let subtotal = 0

    // Add each item to the cart
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      subtotal += itemTotal

      $("#cart-items").append(`
        <div class="cart-item">
          <div class="cart-product-info">
            <img src="${item.img}" alt="${item.name}" class="cart-product-image">
            <div class="cart-product-name">${item.name}</div>
          </div>
          <div class="cart-price">£${item.price.toFixed(2)}</div>
          <div class="cart-quantity">
            <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
          </div>
          <div class="cart-total">£${itemTotal.toFixed(2)}</div>
          <div class="cart-remove">
            <button class="cart-remove-btn" data-id="${item.id}">✕</button>
          </div>
        </div>
      `)
    })

    // Calculate shipping and total
    const shipping = subtotal > 0 ? 4.99 : 0
    const total = subtotal + shipping

    // Update summary
    $("#cart-subtotal").text(`£${subtotal.toFixed(2)}`)
    $("#cart-shipping").text(`£${shipping.toFixed(2)}`)
    $("#cart-total").text(`£${total.toFixed(2)}`)
  }
})
