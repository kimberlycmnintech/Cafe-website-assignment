function validateForm() {
    // Form validation logic can be added here
    return true;
}

function renderOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.price * item.quantity;
    });
    const taxAmount = (cartTotal * 0.06).toFixed(2);
    
    const deliveryFee = 3;
    const subtotal = (cartTotal + parseFloat(taxAmount) + deliveryFee).toFixed(2);
    document.getElementById('order-summary').innerHTML = `
        <div class="section-title">Order Summary</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>Cart Total</span><span>RM ${cartTotal.toFixed(2)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>Tax (6%)</span><span>RM ${taxAmount}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>Delivery</span><span>RM ${deliveryFee}</span></div>
        <div style="border-top:1.5px solid #e6eaf7;margin:12px 0 8px 0;"></div>
        <div style="display:flex;justify-content:space-between;font-weight:bold;font-size:1.2rem;"><span>Total to Pay</span><span>RM ${subtotal}</span></div>
    `;
}

function handlePlaceOrder(e) {
    e.preventDefault();
    alert('Thank You for your order!');
    window.location.href = 'index.html';
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render the order summary
    renderOrderSummary();
    
    // Set up place order button event listener
    const placeOrderBtn = document.querySelector('.place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }
});
