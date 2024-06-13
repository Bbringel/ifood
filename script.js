document.getElementById('menu-bar').addEventListener('click', function() {
  document.querySelector('.navbar').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
  const menuBar = document.getElementById('menu-bar');
  const navbar = document.querySelector('.navbar');

  // Toggle navigation menu on hamburger menu click
  menuBar.addEventListener('click', function() {
    navbar.classList.toggle('active');
  });

  // Close navigation menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navbar.contains(event.target);
    const isClickOnMenuButton = menuBar.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton) {
      navbar.classList.remove('active');
    }
  });
});
  
  updateCartTotal();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Button functionality:
  const plusBtns = document.querySelectorAll('.plus-btn');
  const minusBtns = document.querySelectorAll('.minus-btn');

  plusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const quantityElement = cartItem.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateCartItemTotal(cartItem);
      updateCartTotal();
    });
  });

  minusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const quantityElement = cartItem.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateCartItemTotal(cartItem);
        updateCartTotal();
      }
    });
  });

  const orderButtons = document.querySelectorAll('.order-btn');

  orderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const image = this.getAttribute('data-image');

      // Store selected item details in sessionStorage
      sessionStorage.setItem('cartItemTitle', title);
      sessionStorage.setItem('cartItemImage', image);

      // Redirect to cart.html
      window.location.href = 'cart.html';
    });
  });

  function updateCartItemTotal(cartItem) {
    const priceElement = cartItem.querySelector('.price');
    const quantityElement = cartItem.querySelector('.quantity');
    const itemTotalElement = cartItem.querySelector('.item-total span');

    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const quantity = parseInt(quantityElement.textContent);
    const itemTotal = price * quantity;

    itemTotalElement.textContent = itemTotal.toFixed(2);
  }

  function updateCartTotal() {
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalItems = 0;
    let totalPrice = 0;

    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
      const quantityElement = item.querySelector('.quantity');
      const priceElement = item.querySelector('.price');

      const quantity = parseInt(quantityElement.textContent);
      const price = parseFloat(priceElement.textContent.replace('$', ''));
      
      totalItems += quantity;
      totalPrice += (price * quantity);
    });

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

