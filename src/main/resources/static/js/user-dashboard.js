let products = [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
    currentUser = requireAuth();
    if (!currentUser) return;
    
    if (currentUser.role !== 'USER') {
        window.location.href = '/admin-dashboard.html';
        return;
    }
    
    updateWelcome();
    initLogout();
    initProfileDropdown();
    loadProducts();
    initSearch();
    initFilters();
});

function updateWelcome() {
    const title = document.querySelector('.hero-content h1');
    if (title && currentUser.firstName) {
        title.textContent = `Welcome, ${currentUser.firstName}!`;
    }
}

async function loadProducts() {
    try {
        products = await apiRequest('/products');
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}


function renderProducts(productList) {
    const container = document.getElementById("product-container");
    container.innerHTML = productList.length === 0 ? "<p>No products found.</p>" : "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <div class="category-container">
                <button class="btn-category">${product.category}</button>
            </div>
            
            <img src="http://localhost:8080/images/${product.image}" alt="${product.name}">
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">$${product.price}</p>
            </div>
            <div class="product-actions">
                <button class="btn-details">View Details</button>
                <button class="btn-add">Add to Cart</button>
            </div>
        `;

        card.querySelector('.btn-add').addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });

        container.appendChild(card);
    });
}

async function addToCart(productId) {
    try {
        await apiRequest(`/cart/${currentUser.id}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        alert('Item added to cart!');
    } catch (error) {
        alert('Failed to add item to cart');
    }
}

function initSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", filterProducts);
    searchInput.addEventListener("keyup", (e) => e.key === "Enter" && filterProducts());
}

function filterProducts() {
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
    
    if (!searchTerm) {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

function initFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const category = button.dataset.category;
            const filtered = category === "all" ? products : 
                products.filter(p => p.category.toLowerCase() === category.toLowerCase());
            renderProducts(filtered);
        });
    });
    
    document.querySelector('[data-category="all"]').classList.add("active");
}