let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
    currentUser = requireAuth();
    if (!currentUser) return;
    
    initLogout();
    initProfileDropdown();
    loadCart();
});

async function loadCart() {
    try {
        const cart = await apiRequest(`/cart/${currentUser.id}`);
        renderCart(cart);
    } catch (error) {
        document.getElementById('cartContent').innerHTML = `
            <div class="empty-cart">
                <h2>Error loading cart</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function renderCart(cart) {
    const cartContent = document.getElementById('cartContent');
    
    if (!cart.items || cart.items.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="user-dashboard.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.items.map(item => `
                <div class="cart-item" data-item-id="${item.id}">
                    <img src="http://localhost:8080/images/placeholder.jpg" 
                         alt="${item.productName}"
                         onerror="this.src='images/placeholder.jpg'">
                    <div class="item-info">
                        <h3>${item.productName}</h3>
                        <p>Price: $${item.price}</p>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total:</span>
                <span>$${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" disabled style="opacity: 0.5; cursor: not-allowed;">Proceed to Checkout</button>
        </div>
    `;
    
    // Setup clear cart button
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
}

async function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return removeItem(itemId);
    
    try {
        await apiRequest(`/cart/${currentUser.id}/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQuantity })
        });
        loadCart();
    } catch (error) {
        alert('Failed to update quantity');
    }
}

async function removeItem(itemId) {
    if (!confirm('Remove this item from cart?')) return;
    
    try {
        await apiRequest(`/cart/${currentUser.id}/items/${itemId}`, { method: 'DELETE' });
        loadCart();
    } catch (error) {
        alert('Failed to remove item');
    }
}

async function clearCart() {
    if (!confirm('Clear entire cart?')) return;
    
    try {
        await apiRequest(`/cart/${currentUser.id}`, { method: 'DELETE' });
        loadCart();
    } catch (error) {
        alert('Failed to clear cart');
    }
}

// Checkout function removed - feature disabled for now
// async function checkout() {
//     if (!confirm('Proceed with checkout?')) return;
//     
//     try {
//         const order = await apiRequest(`/cart/${currentUser.id}/checkout`, { method: 'POST' });
//         alert(`Order placed successfully! Order ID: ${order.id}`);
//         loadCart();
//     } catch (error) {
//         alert('Checkout failed: ' + error.message);
//     }
// }

