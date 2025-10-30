// Function to create a continuous stream of confetti/stars
function startContinuousConfetti() {
    // Check if confetti library is loaded
    if (typeof confetti !== 'undefined') {
        const duration = 15 * 1000; // 15 seconds
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration); // Gradually reduce particle count
            // since particles fall down, we can restrict them to the top of the canvas
            confetti(Object.assign({}, defaults, { 
                particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250); // Har 250ms mein confetti trigger hoga
    }
}

// Jab Surprise Page load ho, tab confetti shuru karo
// Hum check karenge ki current page surprise.html hai ya nahi
if (window.location.pathname.includes('surprise.html')) {
    startContinuousConfetti();
}
// Agar aapka countdown wala script bhi isi file mein hai, toh usko yahan bhi add kar sakte ho
// Jaise: document.addEventListener('DOMContentLoaded', function() { countdownFunction(); });







// Function to handle the Time-Based Personalized Welcome Message
function updateWelcomeMessage() {
    // 1. Current Hour nikalte hain (0-23)
    const currentHour = new Date().getHours();
    let welcomeMessage;

    // 2. Samay (Time) ke hisaab se personalized message set karte hain
    if (currentHour >= 5 && currentHour < 12) {
        // 5 AM se 11:59 AM
        welcomeMessage = "Good Morning, Madam Ji! Rise and shine. Hope you have a wonderful day! ☀️";
    } else if (currentHour >= 12 && currentHour < 17) {
        // 12 PM se 4:59 PM
        welcomeMessage = "Good Afternoon, Madam Ji! Time for a little break. You are amazing! 😊";
    } else {
        // 5 PM se 4:59 AM (Shaam aur Raat)
        welcomeMessage = "Good Evening, Madam Ji! Relax and smile. Thinking of you always! 🌙";
    }

    // 3. HTML mein ID="special-welcome" wale element ko dhoond kar text badalte hain
    const headerElement = document.getElementById('special-welcome');

    // Agar element mila, to uska content badal do
    if (headerElement) {
        headerElement.textContent = welcomeMessage;
    }
}

// Page load hote hi function ko call karein taaki message turant dikhe
updateWelcomeMessage();