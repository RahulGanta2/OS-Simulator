let numPhilosophers = 5; // Default number of philosophers
let chopstick = new Array(numPhilosophers).fill(1); // 1 represents available, 0 represents in use
let isEating = new Array(numPhilosophers).fill(false); // To track if each philosopher is eating
let outputDiv = document.getElementById("output");
let eatingDiv = document.getElementById("eating");

function wait(x) {
    if (x > 0) {
        x--;
        return;
    }
}

function signal(x) {
    x++;
}

function updateEatingList() {
    let eatingList = "Currently Eating:<br>";
    for (let i = 0; i < numPhilosophers; i++) {
        if (isEating[i]) {
            eatingList += "Philosopher " + (i + 1) + "<br>";
        }
    }
    eatingDiv.innerHTML = eatingList;
}

function Philosopher(i, y) {
    if (y == 1) {
        // If the philosopher is already eating, display a message and return
        if (isEating[i]) {
            outputDiv.innerHTML = "Philosopher " + (i + 1) + " is already eating";
            return;
        }
 
        // Check if both chopsticks are available
        if (chopstick[i] == 0 || chopstick[(i + 1) % numPhilosophers] == 0) {
            outputDiv.innerHTML = "Cannot eat";
            return;
        }

        chopstick[i] = 0; // Mark the chopsticks as in use
        chopstick[(i + 1) % numPhilosophers] = 0;
        isEating[i] = true;

        outputDiv.innerHTML = "Philosopher " + (i + 1) + " is eating";
    } else {
        // If the philosopher is already not eating, display a message and return
        if (!isEating[i]) {
            outputDiv.innerHTML = "Philosopher " + (i + 1) + " is currently not eating";
            return;
        }

        // Mark the chopsticks as available
        chopstick[i] = 1;
        chopstick[(i + 1) % numPhilosophers] = 1;
        isEating[i] = false;

        outputDiv.innerHTML = "Philosopher " + (i + 1) + " stopped eating";
    }
    updateEatingList(); // Update the list of currently eating philosophers
}

function performAction(philosopher, action) {
    Philosopher(philosopher, action);
}
