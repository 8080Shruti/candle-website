// script.js

let wishlist = [];

// === Add to Cart ===
function addToCart(productId, productName, productPrice, productImage) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Update cart count
  document.getElementById('cartCount').textContent = cartItems.length;
  alert(`${productName} added to cart!`);
}

// === Add to Wishlist ===
function addToWishlist(productId, productName) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    alert(`${productName} added to your wishlist!`);
  } else {
    alert(`${productName} is already in your wishlist.`);
  }
}

// === Search Handler ===
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query) {
        alert(`Searching for: "${query}"`);
        // window.location.href = `products.html?search=${query}`;
      } else {
        alert("Please enter a search term.");
      }
    });
  }

  // === Cart Page Initialization ===
  if (document.getElementById('cartItems')) {
    displayCartItems();
  }

  // === Update cart icon on all pages ===
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
});

// === Display Cart Items ===
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('subtotal');

  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <div>
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}">
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);

    subtotal += item.price * item.quantity;
  });

  if (subtotalEl) {
    subtotalEl.textContent = subtotal.toFixed(2);
  }

  attachCartEvents();
}

// === Update Quantity or Remove from Cart ===
function attachCartEvents() {
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const newQty = parseInt(e.target.value);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const item = cart.find(p => p.id === id);
      if (item) {
        item.quantity = newQty > 0 ? newQty : 1;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
    });
  });
}
