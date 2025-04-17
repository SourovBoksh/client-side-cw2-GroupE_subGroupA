$(document).ready(function () {
    let cartItems = [];

    // Load cart from `localStorage` on page load
    function loadCart() {
        let storedCart = localStorage.getItem("cart");
        cartItems = storedCart ? JSON.parse(storedCart) : [];
        updateCart();
    }

    // Save cart to `localStorage`
    function setCart() {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    // Update Cart UI & Icon Count
    function updateCart() {
        setCart();
        $("#cart-count").text(cartItems.length);

        let cartList = $("#cart-items");
        cartList.empty();
        let tot_qty = 0;

        $.each(cartItems, function (index, item) {
            let listItem = $("<li></li>").text(item.name + " - $" + item.price);
            let txt = $("<div></div>");
            let qtyDisplay = $("<span class='quantity'> x" + item.quantity + " </span>");
            let increaseBtn = $("<button class='increase-qty'>+</button>");
            let decreaseBtn = $("<button class='decrease-qty'>−</button>");
            let removeBtn = $("<button class='remove-item'>&#128465;</button>");

            // Increase quantity handler
            increaseBtn.click(function () {
                cartItems[index].quantity++;
                updateCart();
            });

            // Decrease quantity handler
            decreaseBtn.click(function () {
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else {
                    cartItems.splice(index, 1); // Remove item if quantity reaches 0
                }
                updateCart();
            });

            // Remove item handler
            removeBtn.click(function () {
                cartItems.splice(index, 1);
                updateCart();
            });
            txt.append(increaseBtn).append(qtyDisplay).append(decreaseBtn).append(removeBtn);
            listItem.append(txt);
            cartList.append(listItem);
            tot_qty = tot_qty + cartItems[index].quantity;
        });

        // Update total quantity
        let totalQty = tot_qty;//cartItems.reduce((sum, item) => sum + item.quantity, 0);
        $("#total-quantity").text("Total Quantity: " + totalQty);
    }

    // Add item to cart
    $(document).on('click', '.add-to-cart', function () {
        let product = $(this).data("product");

        // Prevent duplicates
        let existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
            showToast(product.name + " quantity updated!");
        } else {
            cartItems.push({ ...product, quantity: 1 });
            showToast(product.name + " added to cart!");
        }
        updateCart();
    });

    // Toggle Cart Modal display
    $(document).on('click', '#cart-icon', function () {
        loadCart();
        $("#cart-modal").slideToggle(300);
    });
    // Toggle Cart Modal display
    $(document).on('click', '#close-cart', function () {
        loadCart();
        $("#cart-modal").fadeOut(300);
    });
    

    // Clear Cart
    $(document).on('click', '#clear-cart', function () {
        cartItems = [];
        setCart();
        updateCart();
    });

    // Toast message function
    function showToast(message, state = "") {
        let toast = $("<div class='toast " + state + "'></div>").text(message);
        $("body").append(toast);
        setTimeout(function () {
            toast.fadeOut(300, function () {
                $(this).remove();
            });
        }, 2000);
    }

    // Load cart on page ready
    loadCart();
});
