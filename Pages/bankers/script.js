function generateInputs() {
    var numProcesses = parseInt(document.getElementById("processes").value);
    var numResources = parseInt(document.getElementById("resources").value);
    var allocationTable = document.getElementById("allocation-table");
    var maxTable = document.getElementById("max-table");
    var availableTable = document.getElementById("available-table");

    if (!isNaN(numProcesses) && !isNaN(numResources)) {
        // Hide the output area if it's currently visible
        document.getElementById("output-area").style.display = "none";
        // Display the input area for max, allocated, and available resources
        document.getElementById("input-max-allocated-available").style.display = "block";

        // Generate input fields for allocation resources
        generateTable(allocationTable, numProcesses, numResources, "Allocation");

        // Generate input fields for max resources
        generateTable(maxTable, numProcesses, numResources, "Max");

        // Generate input fields for available resources
        generateAvailableTable(availableTable, numResources);
    }
}

// Function to generate table dynamically
function generateTable(table, numRows, numCols, label) {
    table.innerHTML = ""; // Clear existing content

    // Create table header row
    var headerRow = document.createElement("tr");
    for (var j = 0; j <= numCols; j++) {
        var th = document.createElement("th");
        if (j === 0) {
            th.textContent = "";
        } else {
            th.textContent = "R" + (j - 1);
        }
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create table rows with input fields
    for (var i = 0; i < numRows; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j <= numCols; j++) {
            var cell = document.createElement("td");
            if (j === 0) {
                cell.textContent = "P" + i;
                cell.style.fontWeight = "bold"; // Bold process numbers
            } else {
                var input = document.createElement("input");
                input.type = "text";
                input.id = label.toLowerCase() + "-" + i + "-" + (j - 1);
                input.required = true;
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Function to generate available table without process numbers
function generateAvailableTable(table, numCols) {
    table.innerHTML = ""; // Clear existing content

    // Create table header row
    var headerRow = document.createElement("tr");
    for (var j = 0; j < numCols; j++) {
        var th = document.createElement("th");
        th.textContent = "R" + j;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create single row with input fields for available resources
    var row = document.createElement("tr");
    for (var j = 0; j < numCols; j++) {
        var cell = document.createElement("td");
        var input = document.createElement("input");
        input.type = "text";
        input.id = "available-" + j;
        input.required = true;
        cell.appendChild(input);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function calculateBankers() {
    var numProcesses = parseInt(document.getElementById("processes").value);
    var numResources = parseInt(document.getElementById("resources").value);
    var maxResources = [];
    var allocatedResources = [];
    var availableResources = [];

    // Retrieve max resources
    for (var i = 0; i < numProcesses; i++) {
        var maxRow = [];
        for (var j = 0; j < numResources; j++) {
            maxRow.push(parseInt(document.getElementById(`max-${i}-${j}`).value));
        }
        maxResources.push(maxRow);
    }

    // Retrieve allocated resources
    for (var i = 0; i < numProcesses; i++) {
        var allocatedRow = [];
        for (var j = 0; j < numResources; j++) {
            allocatedRow.push(parseInt(document.getElementById(`allocation-${i}-${j}`).value));
        }
        allocatedResources.push(allocatedRow);
    }

    // Retrieve available resources
    for (var i = 0; i < numResources; i++) {
        availableResources.push(parseInt(document.getElementById(`available-${i}`).value));
    }

    // Run Banker's Algorithm
    var work = availableResources.slice(); // copy available resources
    var finish = Array(numProcesses).fill(false);
    var safeSequence = [];
    var count = 0;

    while (count < numProcesses) {
        var found = false;
        for (var i = 0; i < numProcesses; i++) {
            if (!finish[i]) {
                var need = true;
                for (var j = 0; j < numResources; j++) {
                    if (maxResources[i][j] - allocatedResources[i][j] > work[j]) {
                        need = false;
                        break;
                    }
                }
                if (need) {
                    for (var j = 0; j < numResources; j++) {
                        work[j] += allocatedResources[i][j];
                    }
                    safeSequence.push("P" + i); // Convert index to process ID
                    finish[i] = true;
                    found = true;
                    count++;
                }
            }
        }
        if (!found) {
            break; // System is in unsafe state
        }
    }

    var outputArea = document.getElementById("output-area");
    if (count < numProcesses) {
        outputArea.innerHTML = "System is in an unsafe state";
    } else {
        outputArea.innerHTML = "Safe sequence: " + safeSequence.join(" -> ");
    }
    outputArea.style.display = "block"; // Display the output area
}
