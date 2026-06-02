// ========================================
// PAGE NAVIGATION LOGIC
// ========================================

let currentPage = 1;
const totalPages = 8;

// Array of funny/cute messages for hitting the cat
const hitMessages = [
    "Ouch! 😭",
    "That hurts! 💔",
    "Please stop... 😢",
    "I'm already sad enough! 😞",
    "Why are you like this? 😭",
    "That was mean! 💔",
    "Oof! 😩",
    "I deserved that... 😔",
    "Again? 💔",
    "Okay, I get it... 😢",
    "Your anger is valid 😞",
    "I had it coming 😭",
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    setupPageButtons();
    setupHitCat();
    setupRunAwayButton();
    setupFinalButtons();
    setupImageFallbacks();
});

// Special buttons on Page 1
document.addEventListener('DOMContentLoaded', function() {
    const readBtn = document.querySelector('.read-letter-btn');
    const whyBtn = document.querySelector('.why-btn');

    if (readBtn) readBtn.addEventListener('click', () => goToPage(3));
    if (whyBtn) whyBtn.addEventListener('click', () => goToPage(2));
});

// ========================================
// NAVIGATION SETUP
// ========================================

function initializeNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const pageNumber = parseInt(this.getAttribute('data-page'));
            goToPage(pageNumber);
        });
    });
}

function updateNavDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach((dot, index) => {
        if (index + 1 === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
        return;
    }

    // Hide current page
    const currentPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }

    // Update current page
    currentPage = pageNumber;

    // Show new page
    const newPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
    if (newPageElement) {
        newPageElement.classList.add('active');
    }

    // Update navigation dots
    updateNavDots();

    // Immediately show the new page from the top
    if (newPageElement) {
        newPageElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
}

// ========================================
// PAGE BUTTON SETUP
// ========================================

function setupPageButtons() {
    // Next buttons
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach((button) => {
        button.addEventListener('click', function() {
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    });

    // Back buttons
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach((button) => {
        button.addEventListener('click', function() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    });
}

// ========================================
// PAGE 5: HIT THE CAT
// ========================================

function setupHitCat() {
    const catImage = document.getElementById('hitCat');
    if (!catImage) return;

    let hitCount = 0;

    catImage.addEventListener('click', function() {
        // Add shake animation
        this.classList.remove('hit-animation');
        void this.offsetWidth; // Trigger reflow
        this.classList.add('hit-animation');

        // Increment counter
        hitCount++;
        document.getElementById('hitCount').textContent = hitCount;

        // Show random message
        showHitMessage();

        // Spawn emoji burst
        spawnEmojiBurst(this);

        // Remove animation class after it completes
        setTimeout(() => {
            this.classList.remove('hit-animation');
        }, 300);
    });
}

function spawnEmojiBurst(elem) {
    const emojis = ['😭','👊','✊','🤛','🤜','🩴','💣','💢'];
    const wrapper = elem.closest('.cat-wrapper') || elem.parentElement;
    if (!wrapper) return;

    // create 6 emojis randomly
    for (let i = 0; i < 6; i++) {
        const span = document.createElement('span');
        span.className = 'floating-emoji';
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // random offsets so each emoji travels different path
        const randX = (Math.random() - 0.5) * 120; // -60 to 60
        const randY = - (80 + Math.random() * 120); // -80 to -200
        span.style.setProperty('--x', randX + 'px');
        span.style.setProperty('--y', randY + 'px');

        wrapper.appendChild(span);

        // remove after animation
        setTimeout(() => {
            span.remove();
        }, 1200 + Math.random() * 800);
    }
}

function showHitMessage() {
    const messagesContainer = document.getElementById('hitMessages');
    if (!messagesContainer) return;

    const randomMessage = hitMessages[Math.floor(Math.random() * hitMessages.length)];
    const messageElement = document.createElement('p');
    messageElement.className = 'hit-message';
    messageElement.textContent = randomMessage;

    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(messageElement);

    // Remove message after 2 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 2000);
}

// ========================================
// PAGE 6: RUN AWAY BUTTON
// ========================================

function setupRunAwayButton() {
    const runAwayBtn = document.querySelector('.run-away-btn');
    if (!runAwayBtn) return;

    document.addEventListener('mousemove', function(e) {
        const rect = runAwayBtn.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
        );

        // If mouse is within 150px of button, make it run away
        if (distance < 150) {
            const angle = Math.atan2(buttonCenterY - mouseY, buttonCenterX - mouseX);
            const moveDistance = 100;
            const newX = Math.cos(angle) * moveDistance;
            const newY = Math.sin(angle) * moveDistance;

            runAwayBtn.style.transform = `translate(${newX}px, ${newY}px)`;
        } else {
            runAwayBtn.style.transform = 'translate(0, 0)';
        }
    });

    // Keep button within viewport
    runAwayBtn.addEventListener('click', function(e) {
        e.preventDefault();
    });
}

// ========================================
// PAGE 8: FINAL BUTTONS
// ========================================

function setupFinalButtons() {
    const yesFinalBtn = document.querySelector('.yes-final-btn');
    const thinkBtn = document.querySelector('.think-btn');
    const finalResponse = document.getElementById('finalResponse');

    if (yesFinalBtn) {
        yesFinalBtn.addEventListener('click', function() {
            if (finalResponse) {
                finalResponse.innerHTML = `
                    <p class="final-response-text">
                        ❤️ I love you so much. Thank you for giving me another chance. 
                        <br><br>
                        I promise to make this right. Let's start over, together.
                    </p>
                `;
                finalResponse.classList.add('show');
            }
        });
    }

    if (thinkBtn) {
        thinkBtn.addEventListener('click', function() {
            if (finalResponse) {
                finalResponse.innerHTML = `
                    <p class="final-response-text">
                        I understand. Take all the time you need. 
                        <br><br>
                        I'll be here, waiting and hoping. 🤍
                    </p>
                `;
                finalResponse.classList.add('show');
            }
        });
    }
}

function getFallbackSvgDataUri(type) {
    const svgContent = type === 'crying'
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f3edf3"/><circle cx="200" cy="180" r="140" fill="#c8d4e8" stroke="#ffffff" stroke-width="16"/><circle cx="150" cy="160" r="22" fill="#3a3a3a"/><circle cx="250" cy="160" r="22" fill="#3a3a3a"/><path d="M140 240 Q200 300 260 240" stroke="#3a3a3a" stroke-width="18" fill="none"/><path d="M130 220 Q140 240 150 220" stroke="#5b6e96" stroke-width="12" fill="none"/><path d="M250 220 Q260 240 270 220" stroke="#5b6e96" stroke-width="12" fill="none"/><text x="50%" y="360" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="32" fill="#5b6e96">Crying cat</text></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f8efe7"/><circle cx="200" cy="180" r="140" fill="#f1c2b3" stroke="#ffffff" stroke-width="16"/><circle cx="150" cy="150" r="22" fill="#3a3a3a"/><circle cx="250" cy="150" r="22" fill="#3a3a3a"/><path d="M140 260 Q200 220 260 260" stroke="#3a3a3a" stroke-width="18" fill="none"/><text x="50%" y="360" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="32" fill="#8b5a53">Sad cat</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
}

function setupImageFallbacks() {
    const images = document.querySelectorAll('img.cat-image, img.hit-cat-image');
    images.forEach((img) => {
        img.addEventListener('error', function() {
            if (this.dataset.fallbackDone) return;
            this.dataset.fallbackDone = '1';
            const altText = (this.alt || '').toLowerCase();
            const fallbackType = altText.includes('cry') ? 'crying' : 'sad';
            this.src = getFallbackSvgDataUri(fallbackType);
        }, { once: false });
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll polyfill for older browsers
function smoothScroll(element, target) {
    const start = element.scrollTop;
    const difference = target - start;
    const duration = 300;
    let start_time = null;

    function step(timestamp) {
        if (!start_time) start_time = timestamp;
        const progress = (timestamp - start_time) / duration;

        if (progress < 1) {
            element.scrollTop = start + difference * easeInOutQuad(progress);
            window.requestAnimationFrame(step);
        } else {
            element.scrollTop = target;
        }
    }

    window.requestAnimationFrame(step);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ========================================
// PRELOAD IMAGES
// ========================================

function preloadImages() {
    const images = ['Sad-Cat.webp', 'cry cat.webp'];
    images.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

// Start preloading when page loads
window.addEventListener('load', preloadImages);

// ========================================
// PREVENT SCROLL JUMP
// ========================================

document.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {
        // Scrolling down
    }
}, { passive: true });
