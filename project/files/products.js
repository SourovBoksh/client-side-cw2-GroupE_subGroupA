$(document).ready(function () {
    // Global Variables
    window.products = window.products || [];
    window.categories = window.categories || [];
    let currentPage = 1;
    const itemsPerPage = 24;
    const productsContainer = $("#productsContainer");

    // **Fetch Data from JSON**
    function loadProductsFromJson() {
        $.getJSON("files/products.json")
            .done(function (data) {
                products = data.products || [];
                categories = data.categories || [];

                // Populate category filter dynamically
                categories.forEach(category => {
                    $("#filterCategory").append(
                        `<option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>`
                    );
                });

                loadProducts(currentPage);
            })
            .fail(function () {
                console.error("Error loading products.json");
            });
    }

    // **Function to Display Products**
    function loadProducts(page) {
        productsContainer.empty();
        let start = (page - 1) * itemsPerPage;
        let displayedProducts = products.slice(start, start + itemsPerPage);

        displayedProducts.forEach(product => {
            let productHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="btn add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                </div>
            `;
            productsContainer.append(productHTML);
        });
    }

    // **Search by Name**
    $("#searchInput").on("input", function () {
        let query = $(this).val().toLowerCase();
        productsContainer.empty();
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        filteredProducts.forEach(product => {
            let productHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="btn add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                </div>`;
            productsContainer.append(productHTML);
        });
    });

    // **Sort by Price**
    $("#sortPrice").change(function () {
        let sortValue = $(this).val();
        let sortedProducts = [...products]; // Clone array before sorting

        if (sortValue === "low-high") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === "high-low") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        productsContainer.empty();
        sortedProducts.slice(0, itemsPerPage).forEach(product => {
            let productHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="btn add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                </div>`;
            productsContainer.append(productHTML);
        });
    });

    // **Filter by Category**
    $("#filterCategory").change(function () {
        let selectedCategory = $(this).val();
        productsContainer.empty();
        let filteredProducts = selectedCategory === "all"
            ? products
            : products.filter(product => product.category === selectedCategory);

        filteredProducts.forEach(product => {
            let productHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="btn add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                </div>`;
            productsContainer.append(productHTML);
        });
    });

    // **Load More Products**
    $("#loadMore").click(function () {
        let totalPages = Math.ceil(products.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadProducts(currentPage);
        } else {
            showToast("You've reached the last product!");
        }
    });

    // **Scroll for Loading More**
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 10) {
            let totalPages = Math.ceil(products.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadProducts(currentPage);
            } else {
                showToast("No more products to load!"); // Optional feedback
            }
        }
    });

    // **Toast Message Function**
    function showToast(message) {
        let toast = $("<div class='toast'></div>").text(message);
        $("body").append(toast);
        setTimeout(function () {
            toast.fadeOut(300, function () {
                $(this).remove();
            });
        }, 2000);
    }

    // **Initial Load**
    loadProductsFromJson();
});
