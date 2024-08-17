
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

