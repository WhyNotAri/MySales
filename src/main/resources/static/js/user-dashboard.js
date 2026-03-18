let products = [];

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    initSearch();
    initCategoryFilters();
});

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:8080/products");
        
        if (!response.ok) {
            throw new Error("Server response error");
        }

        products = await response.json();
        renderProducts(products);

    } catch (error) {
        console.error("Error loading products:", error);
    }
}


function renderProducts(productList) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
        <img src="http://localhost:8080/images/${product.image}" alt="${product.name}">
        <div class="product-info">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-price">$${product.price}</p>
            <button class="btn-category">${product.category}</button>
        </div>
        <div class="product-actions">
            <button class="btn-details">View Details</button>
            <button class="btn-add">Add to Cart</button>
        </div>
    `;

    card.addEventListener("click", () => {
        console.log("Card click, ir a producto:", product.id);
        window.location.href = `/product/${product.id}`;
    });

    document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-details") || e.target.closest(".btn-cart") || e.target.closest(".btn-category")) {
        e.stopPropagation();
    }
});

    container.appendChild(card);
    });
}

function initSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", filterProducts);

    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            filterProducts();
        }
    });
}

function filterProducts() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    renderProducts(filtered);
}

function initCategoryFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            
            filterButtons.forEach(btn => btn.classList.remove("active"));
            
            button.classList.add("active");
            
            filterByCategory(category);
        });
    });
    
    document.querySelector('[data-category="all"]').classList.add("active");
}

function filterByCategory(category) {
    if (category === "all") {
        renderProducts(products);
    } else {
        const filtered = products.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
        renderProducts(filtered);
    }
}

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector("#searchBtn");
const input = document.querySelector("#searchInput");

searchBtn.addEventListener("click", () => {

  searchBox.classList.toggle("active");

  if (searchBox.classList.contains("active")) {
    input.focus();
  }

});

document.addEventListener("click", (e) => {

  if (!searchBox.contains(e.target)) {
    searchBox.classList.remove("active");
  }

});

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

profileBtn.addEventListener("click", function(e) {
    e.preventDefault();
    profileMenu.classList.toggle("show");

    document.addEventListener("click", function(e) {

    if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove("show");
    }
});
});