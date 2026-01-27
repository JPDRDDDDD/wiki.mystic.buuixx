document.addEventListener('DOMContentLoaded', () => {
    
    // --- SCROLL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });


    // --- ACCORDION ---
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            accordions.forEach(a => a.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // --- CART SYSTEM ---
    let cart = [];
    const product = {
        id: 1,
        name: 'Curso DevStart Completo',
        price: 97.90,
        image: '<i class="fas fa-code"></i>'
    };

    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total-value');
    const cartCountEl = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('#add-to-cart-btn');

    // Open/Close Cart
    function toggleCart() {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
        checkoutModal.classList.remove('active');
    });

    // Add to Cart Logic
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart();
            toggleCart();
        });
    });

    function addToCart() {
        // Simple logic: Only one product type allowed, quantity increases? 
        // Or since it's a course, usually quantity 1 is max per user.
        // Let's check if already in cart.
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            alert('Este curso já está no seu carrinho!');
            return;
        }

        cart.push(product);
        updateCartUI();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Seu carrinho está vazio</div>';
            cartCountEl.textContent = '0';
        } else {
            cart.forEach(item => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                // Inline styles for cart item just for simplicity in JS or add to CSS
                itemEl.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; background: #111; padding: 10px; border-radius: 5px;';
                
                itemEl.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 40px; height: 40px; background: #222; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: #e50914;">
                            ${item.image}
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 0.9rem;">${item.name}</div>
                            <div style="color: #b3b3b3; font-size: 0.8rem;">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #666; cursor: pointer;"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
            cartCountEl.textContent = cart.length;
        }

        cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        
        // Expose remove function globally
        window.removeFromCart = removeFromCart;
    }


    // --- CHECKOUT SYSTEM ---
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout');
    const paymentMethodSelect = document.getElementById('payment-method');
    const pixArea = document.getElementById('pix-area');
    const cardArea = document.getElementById('card-area');
    const paymentForm = document.getElementById('payment-form');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        cartSidebar.classList.remove('open');
        checkoutModal.classList.add('active');
        overlay.classList.add('active'); // Keep overlay
    });

    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        overlay.classList.remove('active');
    });

    paymentMethodSelect.addEventListener('change', (e) => {
        if (e.target.value === 'pix') {
            pixArea.classList.remove('hidden');
            cardArea.classList.add('hidden');
        } else {
            pixArea.classList.add('hidden');
            cardArea.classList.remove('hidden');
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate processing
        const btn = paymentForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Processando...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Compra realizada com sucesso! Verifique seu e-mail.');
            cart = [];
            updateCartUI();
            checkoutModal.classList.remove('active');
            overlay.classList.remove('active');
            btn.innerText = originalText;
            btn.disabled = false;
        }, 2000);
    });

    // --- MOBILE MENU ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        // Toggle display or add class. Let's add inline style for simplicity or class
        // Since CSS hides it on mobile, we need a class to show it.
        // Let's append a mobile-nav class logic if needed, but for now just simple toggle:
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = '#0a0a0a';
            navMenu.style.padding = '20px';
            navMenu.style.zIndex = '999';
        }
    });

});
