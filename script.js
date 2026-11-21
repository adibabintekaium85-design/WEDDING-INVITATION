
const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const petalsContainer = document.getElementById("petals-container");

// PUT YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const scriptURL = "https://script.google.com/macros/s/AKfycbyeZejcVXZlWRjm2YRtuYbnO8evpAJIcrr1h8UJfiSlXn2F96D2w1kDYWKocZsNwJn3/exec";

// Envelope opening
openBtn.addEventListener("click", function () {
    envelope.classList.add("opened");
    openBtn.disabled = true;

    setTimeout(function () {
        cover.style.display = "none";
        invitation.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1100);

    startPetals();
});

// Falling flower petals
function startPetals() {
    const flowers = ["🌸", "🌺", "🌷", "✿"];

    setInterval(function () {
        const petal = document.createElement("span");

        petal.className = "petal";
        petal.textContent =
            flowers[Math.floor(Math.random() * flowers.length)];

        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration =
            (4 + Math.random() * 5) + "s";
        petal.style.fontSize =
            (14 + Math.random() * 15) + "px";

        petalsContainer.appendChild(petal);

        setTimeout(function () {
            petal.remove();
        }, 9500);
    }, 450);
}

// Save RSVP to Google Sheets
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

rsvpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (scriptURL === "PASTE_YOUR_WEB_APP_URL_HERE") {
        rsvpMessage.textContent = "Please connect the Google Sheet URL first.";
        return;
    }

    const submitButton = rsvpForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new URLSearchParams({
        guestName: document.getElementById("guestName").value,
        guestCount: document.getElementById("guestCount").value,
        attendance: document.getElementById("attendance").value,
        guestMessage: document.getElementById("guestMessage").value
    });

    try {
        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: formData
        });

        rsvpMessage.textContent =
            "Thank you! Your RSVP has been submitted.";

        rsvpForm.reset();

    } catch (error) {
        rsvpMessage.textContent =
            "Something went wrong. Please try again.";
    }

    submitButton.disabled = false;
    submitButton.textContent = "Send RSVP ♡";
});
