const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
    });
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.classList.add("transparent");
    } else {
        nav.classList.remove("transparent");
    }
});

const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adds the class when it enters the screen
            entry.target.classList.add('reveal');
        } else {
            // Removes the class when it leaves the screen
            entry.target.classList.remove('reveal');
        }
    });
}, {
    threshold: 0.1 // Triggers as soon as even 10% of it is visible
});

document.querySelectorAll('.image-wrapper').forEach(quote => {
    quoteObserver.observe(quote);
});

/* ----- Here its about the Waitlist ----- */

function sendOrder() {
    // 1. Grab the email the user typed
    const typedEmail = document.getElementById('userEmail').value;

    // 2. Prepare the "Order Form"
    const myOrder = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: typedEmail,
            waitlist_id: 32285 // i put my id
        })
    };

    // 3. Send the Waiter (fetch) to the Kitchen (API)
    fetch("https://getwaitlist.com/api/v1/signup", myOrder)
        .then(response => response.json()) // Wait for the note back
        .then(data => {
            // 4. Do something with the answer
            alert("Success! Your referral link is: " + data.referral_link);
        })
        .catch(error => {
            // If the waiter tripped on the way (no internet, etc.)
            console.log("Something went wrong", error);
        });
}