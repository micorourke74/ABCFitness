document.addEventListener("DOMContentLoaded", () => {
  
  document.getElementById('mobileNavToggle')?.addEventListener('click', function () {
    document.querySelector('.nav-links')?.classList.toggle('active');
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsList = document.getElementById("cart-items");
  const viewCartBtn = document.getElementById("view-cart-btn");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const processOrderBtn = document.getElementById("process-order-btn");

  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  function saveCart() {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cartItemsList.innerHTML = "";
    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      return;
    }
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartItemsList.appendChild(li);
    });
  }

  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product-item");
      if (!product) return;

      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = product.dataset.price;

      cart.push({ id, name, price });
      saveCart();
      alert("Item added.");
    });
  });

  viewCartBtn.addEventListener("click", () => {
    renderCart();
    cartModal.classList.add("active");
    cartModal.classList.remove("hidden");
    cartModal.setAttribute("aria-hidden", "false");
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("active");
    cartModal.classList.add("hidden");
    cartModal.setAttribute("aria-hidden", "true");
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    alert("Cart cleared!");
  });

  processOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before processing your order.");
      return;
    }
    alert("Thank you for your order.");
    cart = [];
    saveCart();
    renderCart();
    cartModal.classList.remove("active");
    cartModal.classList.add("hidden");
    cartModal.setAttribute("aria-hidden", "true");
  });

  document.getElementById('subscribeForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (email) {
      alert(`Thanks for subscribing, ${email}!`);
      document.getElementById('email').value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });

  document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (name && email && message) {
      localStorage.setItem('contactData', JSON.stringify({ name, email, message }));
      alert(`Thank you, ${name}, for reaching out! We’ll get back to you soon.`);
      this.reset();
    } else {
      alert('Please fill out all fields.');
    }
  });
});
