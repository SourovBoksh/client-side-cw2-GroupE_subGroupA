// cart.js

document.addEventListener("DOMContentLoaded", function () {
  // 🔹 ADD TO CART (runs on products.html)
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        const price = this.getAttribute("data-price");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
      });
    });
  }

  // 🔹 CART PAGE LOGIC (only runs on cart.html)
  const cartItemsContainer = document.getElementById("cartItems");
  const clearCartBtn = document.getElementById("clearCart");

  if (cartItemsContainer && clearCartBtn) {
    function loadCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is currently empty.</p>";
        return;
      }

      cartItemsContainer.innerHTML = "";
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <h4>${item.name}</h4>
          <p>Price: £${item.price}</p>
          <button class="removeItem" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
      });
    }

    cartItemsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("removeItem")) {
        const index = e.target.getAttribute("data-index");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      }
    });

    clearCartBtn.addEventListener("click", function () {
      localStorage.removeItem("cart");
      loadCart();
    });

    loadCart();
  }
});
