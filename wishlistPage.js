// wishlistpage.js

function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function displayWishlist() {
  const wishlist = getWishlist();
  const container = document.getElementById('wishlistContainer');
  container.innerHTML = ''; // Clear existing

  if (wishlist.length === 0) {
    container.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }

  wishlist.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button class="btn" onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
      <button class="wishlist" onclick="removeFromWishlist(${item.id})">Remove</button>
    `;
    container.appendChild(card);
  });
}

function removeFromWishlist(id) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(item => item.id !== id);
  saveWishlist(wishlist);
  displayWishlist();
  updateWishlistStatus();
}

function updateWishlistStatus() {
  const wishlist = getWishlist();
  const link = document.getElementById('wishlistLink');
  if (link) {
    link.textContent = `♡ Wishlist (${wishlist.length})`;
  }
}

function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, name, price, image });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}
