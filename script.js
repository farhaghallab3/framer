
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
  gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;

      // next card slides up & fades in above the current card
      gsap.fromTo(next,
        { y: 100, opacity: 0, zIndex: i + 1 },
        {
          y: 0,
          opacity: 1,
          zIndex: i + 5,       // ensure new card is always on top
          scrollTrigger:{
            trigger: next,
            start: "top 70%",
            end: "top 40%",
            scrub: true
          }
        }
      );

      // current card fades to 50% while next comes forward
      ScrollTrigger.create({
        trigger: next,
        start: "top 70%",
        end: "top 40%",
        scrub: true,
        onUpdate: self => {
          card.style.opacity = 1 - self.progress * 0.5; // fade to 0.5
        },
        onLeaveBack: () => card.style.opacity = 1 // restore on scroll up
      });
    });