// --- ANIMATED LOADER ---
let loadingProgress = 0;
const loadingBar = document.querySelector('.loading-bar');
const loadingPercent = document.getElementById('loading-percent');
const loaderWrapper = document.querySelector('.loader-wrapper');

function startLoadingAnimation() {
    const interval = setInterval(() => {
        loadingProgress += Math.random() * 30;
        if (loadingProgress > 90) loadingProgress = 90;
        
        loadingBar.style.width = loadingProgress + '%';
        loadingPercent.textContent = Math.floor(loadingProgress);
    }, 300);
    
    return interval;
}

window.addEventListener('load', () => {
    const interval = startLoadingAnimation();
    
    // Complete the loading bar
    setTimeout(() => {
        clearInterval(interval);
        loadingBar.style.width = '100%';
        loadingPercent.textContent = '100';
        
        // Hide loader after animations
        setTimeout(() => {
            loaderWrapper.classList.add('hide');
            setTimeout(() => loaderWrapper.style.display = 'none', 600);
        }, 800);
    }, 2000);
});

// --- THEME TOGGLE ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('tripTraceTheme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    
    // Update icon and save preference
    themeIcon.classList.toggle('fa-moon', !isLight);
    themeIcon.classList.toggle('fa-sun', isLight);
    localStorage.setItem('tripTraceTheme', isLight ? 'light' : 'dark');
});

// --- MOBILE MENU ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// --- SCROLL REVEAL ANIMATION ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- TRIP PLANNER LOGIC ---
function generatePlan() {
    const from = document.getElementById('fromLoc').value;
    const to = document.getElementById('toLoc').value;
    const budget = document.getElementById('maxBudget').value;
    const resultDiv = document.getElementById('planner-result');

    if (!from || !to || !budget) {
        alert("Please fill in all details to plan your trip!");
        return;
    }

    // Check minimum budget requirement
    const budgetAmount = parseFloat(budget);
    if (budgetAmount < 1000) {
        resultDiv.innerHTML = `
            <div class="summary-card" style="text-align: center; padding: 40px;">
                <h3><i class="fas fa-times-circle" style="color: #ef4444;"></i> Travel is Not Possible</h3>
                <p style="color: var(--text-muted); margin-top: 15px; font-size: 1.1rem;">
                    Minimum budget required for a trip is <strong>₹1000</strong>. 
                    <br><br>Your current budget is <strong>₹${budgetAmount}</strong>
                </p>
            </div>
        `;
        resultDiv.classList.remove('hidden');
        return;
    }

    // Dynamic calculations for the "Smart" feel
    const estCost = Math.floor(budgetAmount * 0.85);
    const transport = Math.floor(estCost * 0.4);
    const food = Math.floor(estCost * 0.3);
    const stays = Math.floor(estCost * 0.3);

    // Show loading state
    resultDiv.innerHTML = `<div class="loader" style="margin: auto;"></div>`;
    resultDiv.classList.remove('hidden');

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="summary-card">
                <h3><i class="fas fa-check-circle"></i> Optimized Route Found</h3>
                <div class="summary-item">
                    <p><strong>Route:</strong> ${from} ➔ Central Hub ➔ ${to}</p>
                </div>
                <div class="summary-item">
                    <p><strong>Estimated Total:</strong> ₹${estCost}</p>
                </div>
                <div class="summary-item">
                    <p><strong>Suggested Allocation:</strong></p>
                    <small>Transport: ₹${transport} | Food: ₹${food} | Stays: ₹${stays}</small>
                </div>
                <div class="summary-item">
                    <p><strong>Travel Tip:</strong> Best time to depart is 5:00 AM to avoid heavy traffic on the expressway.</p>
                </div>
                <button class="btn-primary" style="background: white; color: var(--primary); margin-top: 10px;" onclick="window.print()">Download Itinerary</button>
            </div>
        `;
    }, 1500);
}

// --- DESTINATION DATA ---
const destinationData = {
    ooty: {
        title: 'Ooty - The Queen of Hill Stations',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=60',
        budget: '₹2,500 - ₹4,000',
        duration: '3 Days, 2 Nights',
        distance: '264 km from Bangalore',
        bestTime: 'April to June, September to November',
        description: 'Ooty is a picturesque hill station nestled in the Nilgiri Mountains of Tamil Nadu. Known for its pleasant climate, lush gardens, and scenic beauty, Ooty is a perfect destination for nature lovers and those seeking a peaceful retreat from city life.',
        attractions: [
            'Ooty Lake - A serene artificial lake perfect for boating',
            'Botanical Gardens - Beautiful gardens with exotic plants',
            'Doddabetta Peak - Highest peak in Nilgiris with panoramic views',
            'Coonoor - Nearby hill town known for tea gardens',
            'Ooty Railway Station - Historic station with scenic train rides',
            'Emerald Lake - A secluded gem surrounded by forests'
        ],
        itinerary: [
            { day: 'Day 1', content: 'Arrive in Ooty, check-in to hotel, visit Ooty Lake for boating, evening stroll at Botanical Gardens' },
            { day: 'Day 2', content: 'Trek to Doddabetta Peak early morning, visit Coonoor tea gardens, shopping at local markets' },
            { day: 'Day 3', content: 'Visit Emerald Lake, toy train ride to Coonoor, shopping and departure' }
        ],
        tips: [
            'Carry warm clothes - it gets chilly at night',
            'Book accommodations in advance during peak season',
            'The toy train offers a unique scenic experience',
            'Best to visit during off-peak seasons to avoid crowds'
        ]
    },
    munnar: {
        title: 'Munnar - The Tea Garden Paradise',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=500&q=60',
        budget: '₹5,000 - ₹7,000',
        duration: '4 Days, 3 Nights',
        distance: '130 km from Kochi',
        bestTime: 'September to May',
        description: 'Munnar is a stunning hill station in Kerala, famous for its vast tea plantations, rolling hills, and cool climate. Nestled at the confluence of three mountain streams, Munnar offers breathtaking views and is a haven for trekking enthusiasts.',
        attractions: [
            'Anamudi Peak - Highest peak in South India',
            'Tea Gardens - Visit working tea plantations and factories',
            'Eravikulam National Park - Home to endangered Nilgiri Tahr',
            'Kundala Lake - Perfect for boating and photography',
            'Mattupetty Dam - Beautiful dam with scenic surroundings',
            'Echo Point - Named for its natural echo effect'
        ],
        itinerary: [
            { day: 'Day 1', content: 'Arrive in Munnar, visit Eravikulam National Park, explore local tea gardens' },
            { day: 'Day 2', content: 'Trek to Anamudi Peak (challenging) or visit Mattupetty Dam, tea factory tour' },
            { day: 'Day 3', content: 'Boating at Kundala Lake, visit Echo Point, local spice markets' },
            { day: 'Day 4', content: 'Morning nature walk, visit Kundalayogam, shopping and departure' }
        ],
        tips: [
            'Trek to Anamudi requires good fitness level',
            'Hire a local guide for better experience',
            'Don\'t miss the fresh tea at local plantations',
            'Weather can be unpredictable - carry rain gear'
        ]
    },
    kochi: {
        title: 'Kochi - The Gateway to Kerala',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=60',
        budget: '₹2,000 - ₹3,500',
        duration: '2 Days, 2 Nights',
        distance: '580 km from Bangalore (via Bangalore or air travel)',
        bestTime: 'September to March',
        description: 'Kochi is a historic port city in Kerala, known for its rich cultural heritage, Chinese fishing nets, spice markets, and backwaters. The blend of history, culture, and natural beauty makes Kochi a fascinating destination.',
        attractions: [
            'Chinese Fishing Nets - Iconic structure and symbol of Kochi',
            'Fort Kochi - Historic area with colonial architecture',
            'Jewish Synagogue - One of the oldest in India',
            'Mattancherry Palace - Historic palace with murals',
            'Backwater Cruise - Experience the serene backwaters',
            'Spice Markets - Fragrant spice markets in Mattancherry'
        ],
        itinerary: [
            { day: 'Day 1', content: 'Arrive in Kochi, visit Chinese Fishing Nets at sunset, explore Fort Kochi colonial architecture' },
            { day: 'Day 2', content: 'Backwater cruise, visit Mattancherry Palace, spice market exploration and shopping' }
        ],
        tips: [
            'Visit fishing nets early morning or sunset for best views',
            'Hire a houseboat for a memorable backwater experience',
            'Sample local Kerala cuisine - appam, stew, and fish curry',
            'Best explored on foot in Fort Kochi area'
        ]
    }
};

// --- DESTINATION MODAL FUNCTIONS ---
function openDestinationModal(destination) {
    const modal = document.getElementById('destinationModal');
    const modalBody = document.getElementById('modalBody');
    const data = destinationData[destination];

    if (!data) return;

    const itineraryHTML = data.itinerary.map(item => `
        <div class="itinerary-day">
            <div class="itinerary-day-title">${item.day}</div>
            <div class="itinerary-day-content">${item.content}</div>
        </div>
    `).join('');

    const attractionsHTML = data.attractions.map(attr => `<li>${attr}</li>`).join('');
    const tipsHTML = data.tips.map(tip => `<li>${tip}</li>`).join('');

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-img" style="background-image: url('${data.image}');"></div>
            <h2 class="modal-title">${data.title}</h2>
        </div>
        <p class="modal-description">${data.description}</p>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-item-label">📅 Duration</div>
                <div class="info-item-value">${data.duration}</div>
            </div>
            <div class="info-item">
                <div class="info-item-label">💰 Budget</div>
                <div class="info-item-value">${data.budget}</div>
            </div>
            <div class="info-item">
                <div class="info-item-label">📍 Distance</div>
                <div class="info-item-value">${data.distance}</div>
            </div>
            <div class="info-item">
                <div class="info-item-label">🌤️ Best Time</div>
                <div class="info-item-value">${data.bestTime}</div>
            </div>
        </div>

        <div class="attractions-section">
            <h4>🎯 Top Attractions</h4>
            <ul class="attractions-list">
                ${attractionsHTML}
            </ul>
        </div>

        <div class="itinerary-section">
            <h4>📋 Suggested Itinerary</h4>
            ${itineraryHTML}
        </div>

        <div class="tips-section">
            <h4>💡 Travel Tips</h4>
            <ul class="tips-list">
                ${tipsHTML}
            </ul>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDestinationModal() {
    const modal = document.getElementById('destinationModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('destinationModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDestinationModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDestinationModal();
        }
    });
});

// --- ACTIVE LINK ON SCROLL ---
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});