// script.js
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
    { id: 4, name: 'Product 4', price: 25 },
  ];

  const productContainer = document.querySelector('.product-list');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalAmountElement = document.querySelector('#total-amount');

  // Render products
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button data-product-id="${product.id}">Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
  });

  // Event listener for adding items to the cart
  productContainer.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
      const productId = parseInt(event.target.dataset.productId);
      const selectedProduct = products.find(product => product.id === productId);
      addToCart(selectedProduct);
    }
  });

  // Cart state
  const cartItems = [];

  // Function to add items to the cart
  function addToCart(product) {
    const existingCartItem = cartItems.find(item => item.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    renderCart();
  }

  // Function to render the cart
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    cartItems.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>Quantity: ${item.quantity}</span>
        <span>$${item.price * item.quantity}</span>
        <button data-product-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);

      totalAmount += item.price * item.quantity;
    });

    totalAmountElement.textContent = totalAmount;
  }

  // Event listener for removing items from the cart
  cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
      const productId = parseInt(event.target.dataset.productId);
      removeFromCart(productId);
    }
  });

  // Function to remove items from the cart
  function removeFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      renderCart();
    }
  }
});
