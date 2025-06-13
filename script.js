// script.js

// Simulate cart and wishlist
let cartCount = 0;
let wishlist = [];

// Handle cart
function addToCart(productId, productName) {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  alert(`${productName} added to cart!`);
}

// Handle wishlist
function addToWishlist(productId, productName) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    alert(`${productName} added to your wishlist!`);
  } else {
    alert(`${productName} is already in your wishlist.`);
  }
}

// Handle search
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query) {
        alert(`Searching for: "${query}"`);
        // In real site, redirect or filter products
        // window.location.href = `products.html?search=${query}`;
      } else {
        alert("Please enter a search term.");
      }
    });
  }
});
