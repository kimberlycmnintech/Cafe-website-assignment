
        let quantity = 1;
        const basePrice = 19;
        let isDelivery = true;
        function updatePrices() {
            const cartTotal = basePrice * quantity;
            const taxAmount = (cartTotal * 0.06).toFixed(2);
            const deliveryFee = isDelivery ? 3 : 0;
            const subtotal = (cartTotal + parseFloat(taxAmount) + deliveryFee).toFixed(2);
            document.getElementById('itemPrice').textContent = cartTotal;
            document.getElementById('cartTotal').textContent = cartTotal;
            document.getElementById('taxAmount').textContent = taxAmount;
            document.getElementById('deliveryFee').textContent = deliveryFee;
            document.getElementById('subtotal').textContent = subtotal;
            document.getElementById('deliveryRow').style.display = isDelivery ? '' : 'none';
        }
        function increaseQuantity() {
            quantity++;
            document.getElementById('quantity').textContent = quantity;
            updatePrices();
        }
        function decreaseQuantity() {
            if (quantity > 1) {
                quantity--;
                document.getElementById('quantity').textContent = quantity;
                updatePrices();
            }
        }
        function removeItem() {
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                document.getElementById('cartItem').style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.getElementById('cartItem').style.display = 'none';
                    quantity = 0;
                    updatePrices();
                }, 300);
            }
        }
        function selectDelivery() {
            isDelivery = true;
            document.getElementById('deliveryBtn').classList.add('active');
            document.getElementById('dineInBtn').classList.remove('active');
            updatePrices();
        }
        function selectDineIn() {
            isDelivery = false;
            document.getElementById('deliveryBtn').classList.remove('active');
            document.getElementById('dineInBtn').classList.add('active');
            updatePrices();
        }
        function checkout() {
            const total = document.getElementById('subtotal').textContent;
            const location = document.getElementById('locationField').value.trim();
            if (!location) {
                alert('Please enter your location before checking out.');
                document.getElementById('locationField').focus();
            return;
    }
    alert(`Proceeding to checkout with total: $${total}\nDelivery Location: ${location}`);
}
        function goBack() {
            if (history.length > 1) {
                history.back();
            } else {
                window.location.href = '/';
            }
        }
        // Add fade out animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(-20px); }
            }
        `;
        document.head.appendChild(style);
        // Initial calculation
        updatePrices();
    