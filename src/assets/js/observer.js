const counter = document.getElementById("counter");
const titles = document.body.querySelectorAll("#title");
const texts = document.body.querySelectorAll("#text");
const ulContact = document.getElementById("ul-contact");
//observer 1 --------
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp();
        }
    })

}, {
    threshold: 1
}
);

observer.observe(counter);

//observer 2 ------
const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("title-animation");
        }
    })

}, {
    threshold: 1
}
);

titles.forEach(title => {
    observer2.observe(title);
})

//observer 3 ---------
const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("text-animation");
        }
    })

}, {
    threshold: 1
}
);

texts.forEach(text => {
    observer3.observe(text);
});


//counter

const targetNumber = 120;
const element = document.getElementById('counter');
let currentNumber = 3000;
let delay = 100; // Initial delay
let maxSpeed = 10; // Minimum delay (max speed)
let easeOutPoint = targetNumber * 3; // Start easing out when 80% of target is reached

function countUp() {
    // Increase the current number by a random value between 1 and 10
    currentNumber -= Math.floor(Math.random() * 30) + 1;

    // Ensure we don't go over the target number
    if (currentNumber < targetNumber) {
        currentNumber = targetNumber;
    }

    // Update the counter element
    element.textContent = `$${currentNumber}`;

    // Stop if we've reached the target number
    if (currentNumber > targetNumber) {
        // Adjust the delay to ramp up (reduce delay) and ease out (increase delay)
        if (currentNumber > easeOutPoint) {
            // Accelerate
            delay = Math.max(maxSpeed, delay - 50); // Reduce delay, but not below maxSpeed
        } else {
            // Decelerate as we approach the target
            delay += 10; // Increase delay to slow down
        }

        // Continue the animation with adjusted delay
        setTimeout(countUp, delay);
    }
}