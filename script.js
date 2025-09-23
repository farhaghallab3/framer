AOS.init({ duration: 1200, once: true });
const menuIcon = document.getElementById('menuIcon');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

menuIcon.addEventListener('click', () => {
mobileMenu.classList.add('active');
overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
mobileMenu.classList.remove('active');
overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
mobileMenu.classList.remove('active');
overlay.classList.remove('active');
});

        const counterElements = document.querySelectorAll('.counter-val');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.dataset.target;
                    let count = 0;
                    const step = target / 100;
                    const increment = Math.ceil(target / 100);

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.textContent = count;
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target;
                            if (counter.parentElement.querySelector('p').textContent.includes('Projects')) {
                                counter.textContent += '+';
                            }
                            if (counter.parentElement.querySelector('p').textContent.includes('retention')) {
                                counter.textContent += '%';
                            }
                            if (counter.parentElement.querySelector('p').textContent.includes('revenue')) {
                                counter.textContent = '$' + counter.textContent + 'M';
                            }
                        }
                    };

                    setTimeout(() => {
                        requestAnimationFrame(updateCount);
                    }, entry.target.parentElement.dataset.aosDelay || 0);

                    observer.unobserve(counter);
                }
            });
        }, options);

        counterElements.forEach(counter => {
            observer.observe(counter);
        });

        // Interactive process cards
        const processCards = document.querySelectorAll('.process-card');
        const processContainer = document.querySelector('.process-cards-container');

        processCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                processCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        processContainer.addEventListener('mouseleave', () => {
            processCards.forEach(c => c.classList.remove('active'));
            document.querySelector('.process-card:first-child').classList.add('active');

        });


        //====================
         // Initialize AOS library for animations
    AOS.init();

    // Get all the process cards


    // Add a click event listener to each card
    processCards.forEach(card => {
        card.addEventListener('click', () => {
            // Check if it's a mobile screen based on the media query breakpoint
            if (window.innerWidth <= 768) {
                // Toggle the 'active' class on the clicked card
                card.classList.toggle('active');
            } else {
                // On desktop, remove 'active' from all cards and add it to the clicked one
                processCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            }
        });
    }); 
// Interactive services accordion
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        serviceItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

        // --- GSAP Scroll Logic for Cards ---
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.card');
        const stackWrapper = document.querySelector('.stack-wrapper');

        // Set initial positions and scale for the cards
        gsap.set(cards, {
            y: (i) => i * 15,
            scale: (i) => 1 - (i * 0.05),
            transformOrigin: '50% bottom'
        });

        // Create the single timeline for the entire animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stackWrapper,
                pin: true,
                start: "top top",
                end: `+=${cards.length * window.innerHeight * 0.5}`,
                scrub: 1,
            }
        });

        cards.forEach((card, i) => {
            const nextCard = cards[i + 1];
            if (!nextCard) return;

            // Animate the current card away and the next one into place
            tl.to(card, {
                y: -window.innerHeight * 0.5,
                opacity: 0,
                scale: 0.9,
                ease: "power2.inOut"
            }, `card-${i}-start`)
            .fromTo(nextCard, {
                y: window.innerHeight * 0.5,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power2.inOut"
            }, `card-${i}-start`);
        });
        document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector(".footer").style.opacity = 1;
});

document.addEventListener('DOMContentLoaded', () => {
    const stackWrapper = document.querySelector('.stack-wrapper');
    const cards = document.querySelectorAll('.card');

    window.addEventListener('scroll', () => {
        // Calculate the scroll progress within the stack-wrapper
        const scrollProgress = (window.scrollY - stackWrapper.offsetTop) / (stackWrapper.scrollHeight - window.innerHeight);

        cards.forEach((card, index) => {
            // This multiplier creates a staggered effect
            const offset = (index) * 0.1;
            const cardProgress = Math.min(1, Math.max(0, scrollProgress - offset));

            // Move the card up as we scroll
            const translateY = -cardProgress * 100;

            // Scale the card down slightly as it moves away
            const scale = 1 - cardProgress * 0.05;

            // Rotate the card slightly for a 3D effect
            const rotateX = cardProgress * 5;

            // Change the z-index to ensure correct layering
            const zIndex = cards.length - index;

            // Apply the transformations and z-index
            card.style.transform = `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
            card.style.zIndex = zIndex;
        });
    });
});
    