$(document).ready(function () {
  let cartItems = [];

  // Function to load cart data from localStorage
  function loadCart() {
    let storedCart = localStorage.getItem("cart"); // Retrieve data from localStorage
    cartItems = storedCart ? JSON.parse(storedCart) : []; // Parse the data or set as an empty array
    updateCart(); // Update cart UI
  }

  // Function to save cart data to localStorage
  function setCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Store cart items in localStorage
  }

  // Function to update the Cart UI
  function updateCart() {
    setCart(); // Save current cart state to localStorage
    $("#cart-count").text(cartItems.length); // Update cart item count badge

    let cartList = $("#cart-items"); // Target cart items container
    cartList.empty(); // Clear existing content
    let tot_total = 0, tot = 0, tot_qty = 0;
    
    $("div.cart").find("div.border-bottom").remove();

    // Loop through cart items and dynamically add them to the UI
    $.each(cartItems, function (index, item) {
      let productItem = $("<div class='border-bottom'></div>");
      let row = $("<div class='row inline-row'></div>");
      let imageCol = $("<div class='inline-col col-2'></div>").append(
        $("<img class='img-fluid'>").attr("src", item.image).attr("alt", item.name)
      );

      let detailsCol = $("<div class='inline-col col-4'></div>")
        .append($("<h5></h5>").text("Category: "+item.category))
        .append($("<h4></h4>").text(item.name))
        .append($("<h3></h3>").text("$"+item.price));

      let controlsCol = $("<div class='inline-col col-4 text-center'></div>");
      let decreaseBtn = $("<button class='btn btn-success'>-</button>");
      let quantitySpan = $("<span class='border'>"+cartItems[index].quantity+"</span>");
      let increaseBtn = $("<button class='btn btn-danger'>+</button>");

      // Add handlers for increment/decrement buttons
      increaseBtn.click(function () {
        let currentQuantity = parseInt(quantitySpan.text(), 10);
        quantitySpan.text(currentQuantity + 1);
        cartItems[index].quantity++; // Increment quantity
        updateCart(); // Update cart UI and save changes
      });

      decreaseBtn.click(function () {
        let currentQuantity = parseInt(quantitySpan.text(), 10);
        if (currentQuantity > 1) {
          quantitySpan.text(currentQuantity - 1);
          cartItems[index].quantity--; // Decrement quantity
        } else {
          cartItems.splice(index, 1); // Remove item if quantity is 0
        }
        updateCart(); // Update cart UI and save changes
      });
      
      tot = parseInt(quantitySpan.text(), 10) * Number(item.price);
      tot_total = tot_total + tot;
      tot_qty = tot_qty + parseInt(quantitySpan.text(), 10);
      controlsCol.append(decreaseBtn).append(quantitySpan).append(increaseBtn);
      let remove = $("<span class='close-btn text-danger' style='cursor: pointer;'>×</span>");
      let priceCol = $("<div class='inline-col col-2 text-end'></div>")
        .append($("<span></span>").text("$"+tot))
        .append(remove);

      // Add remove functionality
      priceCol.find(".close-btn.text-danger").click(function () {
        productItem.remove(); // Removes the product item from the DOM
        cartItems.splice(index, 1);
        updateCart();
      });

      // Append all columns to the row
      row.append(imageCol).append(detailsCol).append(controlsCol).append(priceCol);

      // Append the row to the productItem container
      productItem.append(row);

      // Append the product item to a container in the DOM
      $("div.cart").find("div.back-to-shop").before(productItem);
    });

    // Update total quantity display
    let totalQty = tot_qty;//cartItems.reduce((sum, item) => sum + item.quantity, 0);
    $("#item_qty").text(totalQty);
    $("#sub_total").text(tot_total);
    $("#total").text(tot_total+Number($('select#delivery').val()));
    $("input[name=total]").val(tot_total+Number($('select#delivery').val()));
    $("#total-quantity").text("Total Quantity: " + totalQty);
  }

  // Clear the cart completely
  $(document).on('click', '#clear-cart', function () {
    cartItems = []; // Reset cart items
    setCart(); // Save empty cart to localStorage
    updateCart(); // Update cart UI
    showToast("Cart cleared!", "success");
  });
  // Clear the cart completely
  $(document).on('change', '#delivery', function (e) {
    $("#total").text(Number($("#sub_total").text())+Number($(this).val()));
    $("input[name=total]").val(tot_total+Number($(this).val()));
  });

  // Toast notification function
  function showToast(message, state = "") {
    let toast = $("<div class='toast " + state + "'></div>").text(message); // Create toast element
    $("body").append(toast); // Add toast to body
    setTimeout(function () {
      toast.fadeOut(300, function () {
        $(this).remove(); // Remove toast after fade out
      });
    }, 2000);
  }

  // Checkout button logic
  $(".btn.btn-dark").on("click", function (e) {
    e.preventDefault(); // Prevent the form from submitting immediately
    let flag = 0;
    if ($("#item_qty").text()=="0") {
      showToast("Please add some products!","danger");
      flag=1;
    }
    if ($('form#shipping input[name=full_name]').val()=="") {
      $('form#shipping input[name=full_name]').attr('style','border:1px solid red');
      showToast("Please enter your name in the red marked information!","danger");
      flag=1;
    }
    if ($('form#shipping input[name=phone]').val()=="") {
      $('form#shipping input[name=phone]').attr('style','border:1px solid red');
      showToast("Please enter a phone number the red marked information!","danger");
      flag=1;
    }
    if ($('form#shipping input[name=email]').val()=="") {
      $('form#shipping input[name=email]').attr('style','border:1px solid red');
      showToast("Please enter an email in the red marked information!","danger");
      flag=1;
    }
    if ($('form#shipping textarea[name=address]').val()=="") {
      $('form#shipping textarea[name=address]').attr('style','border:1px solid red');
      showToast("Please add an address in the red marked information!","danger");
      flag=1;
    }
    if (flag==1) return;
    else {
      // Display a confirmation alert
      showToast("Thank you for your order!","success");
      // Clear the cart from localStorage
      localStorage.removeItem("cart");

      // Reset cart-related UI elements
      $("#item_qty").text("0");
      $("#sub_total").text("$0.00");
      $("#total").text("$0.00");

      // Optionally, you can clear the cart display area
      $("div.cart").find("div.border-bottom").remove();
      setTimeout(function () {
          $("form#shipping").submit();
      }, 2000);
    }
    
  });

  // Load cart on page ready
  loadCart(); // Initialize cart data on page load
});
