// No search bar functionality needed anymore. 

document.addEventListener('DOMContentLoaded', function() {
  // Menu tab switching
  const tabs = document.querySelectorAll('.menu-tabs .tab');
  const sliders = document.querySelectorAll('.menu-slider');
  const menuSections = document.querySelectorAll('.menu-items');
  const drinksSubtabs = document.querySelector('.drinks-subtabs');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide drinks sub-tabs
      if (this.getAttribute('data-category') === 'drinks') {
        drinksSubtabs.style.display = 'flex';
      } else {
        drinksSubtabs.style.display = 'none';
      }
      
      sliders.forEach((slider, sidx) => slider.style.display = 'none');
      menuSections.forEach(section => section.style.display = 'none');
      
      const category = this.getAttribute('data-category');
      if (category === 'drinks') {
        // Show coffee by default when drinks tab is clicked
        const coffeeSection = document.querySelector(`.menu-items[data-category="coffee"]`);
        const coffeeSlider = coffeeSection ? coffeeSection.closest('.menu-slider') : null;
        if (coffeeSlider) {
          coffeeSlider.style.display = 'flex';
          coffeeSection.style.display = 'flex';
        }
      } else {
        const activeSection = document.querySelector(`.menu-items[data-category="${category}"]`);
        const activeSlider = activeSection ? activeSection.closest('.menu-slider') : null;
        if (activeSlider) {
          activeSlider.style.display = 'flex';
          activeSection.style.display = 'flex';
        }
      }
      
      // Reset slider to first items
      resetSlider(activeSection);
      // Show/hide arrows based on item count
      updateArrows();
      setTimeout(attachMenuHandlers, 0);
    });
  });

  // Drinks sub-tab switching
  const subtabs = document.querySelectorAll('.subtab');
  subtabs.forEach(subtab => {
    subtab.addEventListener('click', function() {
      subtabs.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      
      const subcategory = this.getAttribute('data-subcategory');
      const targetSection = document.querySelector(`.menu-items[data-category="${subcategory}"]`);
      const targetSlider = targetSection ? targetSection.closest('.menu-slider') : null;
      
      // Hide all drink sliders
      document.querySelectorAll('.menu-slider').forEach(slider => {
        if (slider.querySelector('.menu-items[data-category="coffee"]') || 
            slider.querySelector('.menu-items[data-category="non-coffee"]')) {
          slider.style.display = 'none';
        }
      });
      
      // Show target slider
      if (targetSlider) {
        targetSlider.style.display = 'flex';
        targetSection.style.display = 'flex';
        resetSlider(targetSection);
        updateArrows();
      }
      setTimeout(attachMenuHandlers, 0);
    });
  });

  // Slider logic
  document.querySelectorAll('.menu-slider').forEach(slider => {
    const itemsContainer = slider.querySelector('.menu-items');
    const items = itemsContainer ? Array.from(itemsContainer.children).filter(child => child.classList.contains('menu-item')) : [];
    let startIdx = 0;
    const visibleCount = items.length <= 6 ? items.length : 3; // Show all if 6 or fewer items
    
    function showItems() {
      items.forEach((item, idx) => {
        if (items.length <= 6) {
          // Show all items if 6 or fewer
          item.style.display = '';
        } else {
          // Use pagination only for more than 6 items
          item.style.display = (idx >= startIdx && idx < startIdx + visibleCount) ? '' : 'none';
        }
      });
    }
    showItems();
    slider.querySelector('.menu-arrow.left').addEventListener('click', function() {
      if (items.length > 6 && startIdx > 0) {
        startIdx--;
        showItems();
      }
    });
    slider.querySelector('.menu-arrow.right').addEventListener('click', function() {
      if (items.length > 6 && startIdx < items.length - visibleCount) {
        startIdx++;
        showItems();
      }
    });
    // Expose reset for tab switch
    slider.resetSlider = function() {
      startIdx = 0;
      showItems();
    };
    // Expose arrow update for tab switch
    slider.updateArrows = function() {
      const leftArrow = slider.querySelector('.menu-arrow.left');
      const rightArrow = slider.querySelector('.menu-arrow.right');
      if (items.length <= 6) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
      } else {
        leftArrow.style.display = '';
        rightArrow.style.display = '';
      }
    };
    slider.updateArrows();
  });
  function resetSlider(activeSection) {
    // Find the parent .menu-slider and call its resetSlider
    if (!activeSection) return;
    let slider = activeSection.closest('.menu-slider');
    if (slider && slider.resetSlider) slider.resetSlider();
  }
  function updateArrows() {
    sliders.forEach(slider => {
      if (slider.style.display !== 'none' && slider.updateArrows) slider.updateArrows();
    });
  }

  // Quantity selector logic and add-to-cart
  if (!window.menuHandlersInitialized) {
    window.menuHandlersInitialized = true;
    attachMenuHandlers();
  }

  // After any tab or subtab change, call attachMenuHandlers()
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      setTimeout(attachMenuHandlers, 0);
    });
  });
  subtabs.forEach(subtab => {
    subtab.addEventListener('click', function() {
      setTimeout(attachMenuHandlers, 0);
    });
  });

  // Contact form success message
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const successMsg = document.getElementById('contact-success');
      feedbackForm.style.display = 'none';
      successMsg.style.display = 'block';
      setTimeout(() => {
        feedbackForm.reset();
        feedbackForm.style.display = '';
        successMsg.style.display = 'none';
      }, 3500);
    });
  }

  // Scroll to top functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

function attachMenuHandlers() {
    console.log('Attaching handlers to visible menu items');
    // Remove all previous handlers for all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        const addBtn = item.querySelector('.add-to-cart');
        const incBtn = item.querySelector('.increase');
        const decBtn = item.querySelector('.decrease');
        if (addBtn) addBtn.onclick = null;
        if (incBtn) incBtn.onclick = null;
        if (decBtn) decBtn.onclick = null;
    });
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('.menu-slider').forEach(slider => {
        if (slider.style.display === 'none') return;
        slider.querySelectorAll('.menu-item').forEach((item, idx) => {
            const addBtn = item.querySelector('.add-to-cart');
            const qtySpan = item.querySelector('.quantity');
            const incBtn = item.querySelector('.increase');
            const decBtn = item.querySelector('.decrease');
            const name = item.querySelector('h3').textContent.trim();
            let cartItem = cart.find(i => i.name === name);
            let quantity = cartItem ? cartItem.quantity : 0;
            qtySpan.textContent = quantity;
            item.setAttribute('data-quantity', quantity);
            // Function to update button state based on quantity
            function updateButtonState() {
                let q = parseInt(item.getAttribute('data-quantity')) || 0;
                if (q === 0) {
                    addBtn.disabled = true;
                    addBtn.style.opacity = '0.5';
                    addBtn.style.cursor = 'not-allowed';
                } else {
                    addBtn.disabled = false;
                    addBtn.style.opacity = '1';
                    addBtn.style.cursor = 'pointer';
                }
            }
            
            // Initial button state
            updateButtonState();
            
            incBtn.onclick = function() {
                let q = parseInt(item.getAttribute('data-quantity')) || 0;
                q++;
                item.setAttribute('data-quantity', q);
                qtySpan.textContent = q;
                updateButtonState();
            };
            decBtn.onclick = function() {
                let q = parseInt(item.getAttribute('data-quantity')) || 0;
                if (q > 0) {
                    q--;
                    item.setAttribute('data-quantity', q);
                    qtySpan.textContent = q;
                    updateButtonState();
                }
            };
            addBtn.onclick = function(event) {
                event.stopPropagation();
                let q = parseInt(item.getAttribute('data-quantity')) || 0;
                if (q === 0) {
                    alert('Please select a quantity greater than 0');
                    return;
                }
                const priceText = item.querySelector('p').textContent;
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                const img = item.querySelector('img').getAttribute('src');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(i => i.name !== name);
                cart.push({ name, price, img, quantity: q });
                localStorage.setItem('cart', JSON.stringify(cart));
                qtySpan.textContent = q;
                alert(`${name} added to cart!`);
            };
        });
    });
} 