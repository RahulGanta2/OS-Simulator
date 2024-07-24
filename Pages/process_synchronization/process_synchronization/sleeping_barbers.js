let barberStatus = 'Sleeping';
let waitingCustomers = 0;
let limit=5;

function updateBarberStatus() {
    document.getElementById('barberStatus').innerText = barberStatus;
}

function updateWaitingCustomers() {
    document.getElementById('waitingCustomers').innerText = waitingCustomers;
}

function addCustomer() {
    if (waitingCustomers >= limit) {
        document.getElementById('status').innerHTML += '<p>Waiting customers reached limit. Customers need to leave.</p>';
        waitingCustomers--; // Reduce waiting customers by 1 since they need to leave
        updateWaitingCustomers();
        return;
    }
    waitingCustomers++;
    updateWaitingCustomers();
    document.getElementById('status').innerHTML += '<p>Customer added to waiting room.</p>';
}

function startBarber() {
 if (waitingCustomers > 0) {
        barberStatus = 'Cutting hair';
        waitingCustomers--;
        updateBarberStatus();
        updateWaitingCustomers();
        document.getElementById('status').innerHTML += '<p>Barber started cutting hair.</p>';
    } else {
        barberStatus = 'Sleeping';
        updateBarberStatus();
        document.getElementById('status').innerHTML += '<p>No customers to serve. Barber goes back to sleep.</p>';
    }
}
