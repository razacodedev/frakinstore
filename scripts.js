
$(document).ready(function () {
    $('.product-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true, // Enable auto-scrolling
        autoplaySpeed: 2000, // Set auto-scrolling speed to 3 seconds
        speed: 600, // Set the speed of scroll to 500ms for smoother transition
        cssEase: 'ease-in-out', // Use ease-in-out for smooth scrolling
        swipe: true, // Enable swiping
        touchThreshold: 100, // Sensitivity for touch interactions
        prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-double-left"></i></button>', // Updated prevArrow
        nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-double-right"></i></button>', // Updated nextArrow
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    autoplay: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            }
        ]
    });
});

document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', function() {
        // Toggle the active class on the content
        this.parentElement.nextElementSibling.classList.toggle('active');
        
        // Toggle the "+" to "-" when the content is open
        this.textContent = this.textContent === "+" ? "−" : "+";
    });
});

//tooltip

// Using jQuery
$(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
});

// for bottom nav
$(document).ready(function() {
    $('.nav-item').on('click', function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });
});

// jump to main image box
$(document).ready(function() {
    // Event handler for thumbnail clicks
    $('.thumbnail').on('click', function() {
        // Get the source of the clicked thumbnail
        var newSrc = $(this).attr('src');
        
        // Update the main image source
        $('#main-image').attr('src', newSrc);
        
        // If using Magic Zoom Plus, reinitialize or refresh if needed
        if (typeof MagicZoomPlus !== 'undefined') {
            MagicZoomPlus.refresh();
        }
    });
});

// image zoom
$(function(){
    $(".zoom-custom").jqZoom({
      selectorWidth: 80,
      selectorHeight: 50,
      viewerWidth: 450,
      viewerHeight: 350
    });
  })

// add to cart
document.addEventListener('DOMContentLoaded', () => {
    const productPriceElement = document.getElementById('product-price');
    const addToCartButton = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('quantity');

    // Check if the productPriceElement exists and extract price
    let productPrice = 0;
    if (productPriceElement) {
        productPrice = parseFloat(productPriceElement.textContent.replace('Rs. ', '').replace(/,/g, ''));
    }

    // Function to format numbers with commas
    function formatNumber(num) {
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Function to update total price
    function updateTotalPrice(totalPrice) {
        document.querySelectorAll('.total-price').forEach(element => {
            element.textContent = formatNumber(totalPrice);
        });
    }

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = 0;

        // Select all cart items containers
        const cartItemsContainers = document.querySelectorAll('.cart-items');

        cartItemsContainers.forEach(cartItemsContainer => {
            cartItemsContainer.innerHTML = '';

            cart.forEach((item, index) => {
                let itemTotal = item.price * item.quantity;
                const cartItem = `
                    <tr data-index="${index}">
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>Rs. ${formatNumber(item.price)}</td>
                        <td>Rs. ${formatNumber(itemTotal)}</td>
                        <td><i class="bi bi-trash-fill text-danger remove-item" data-index="${index}" style="cursor: pointer;"></i></td> <!-- Trash icon -->
                    </tr>`;
                cartItemsContainer.insertAdjacentHTML('beforeend', cartItem);
                totalPrice += itemTotal;
            });
        });

        updateTotalPrice(totalPrice); // Update the total price using the class

        // Add event listeners to trash icons
        document.querySelectorAll('.remove-item').forEach(icon => {
            icon.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeCartItem(index);
            });
        });
    }

    function addToCart() {
        console.log('Add to Cart button clicked'); // Debugging line
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = {
            id: 1, // Adjust ID as needed
            name: 'Interia Dancing Car - Orange Other',
            price: productPrice,
            quantity: quantity
        };
        
        const existingProductIndex = cart.findIndex(p => p.id === product.id);
        
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function removeCartItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart(); // Refresh the cart display
    }

    // Add event listeners only if the relevant elements exist
    if (addToCartButton && quantityInput) {
        addToCartButton.addEventListener('click', addToCart);
        document.getElementById('button-increment')?.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        document.getElementById('button-decrement')?.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }

    // Update the cart if cart items container exists
    if (document.querySelector('.cart-items')) {
        console.log('Updating cart...');
        updateCart();
    } else {
        console.log('Cart items not found on this page.');
    }
});
