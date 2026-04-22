document.addEventListener('DOMContentLoaded', () => {
    initProfileDropdown();
    initLogout();

    const form = document.getElementById('addProductForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const productData = {
            productName: document.getElementById('productName').value.trim(),
            productDescription: document.getElementById('productDescription').value.trim(),
            productPrice: parseFloat(document.getElementById('productPrice').value),
            productStock: parseInt(document.getElementById('productStock').value),
            productImage: document.getElementById('productImage').value.trim(),
            productCategory: document.getElementById('productCategory').value
        };

        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }

            const createdProduct = await response.json();
            alert(`Product "${createdProduct.productName}" created successfully!`);
            
            form.reset();
            
            window.location.href = '/admin-dashboard.html';
            
        } catch (error) {
            console.error('Error creating product:', error);
            alert(`Error: ${error.message}`);
        }
    });
});
