// Sample memory blocks
let memoryBlocks = [
    { size: 100, allocated: false, allocatedProcesses: [], allocatedSize: 0 },
    { size: 200, allocated: false, allocatedProcesses: [], allocatedSize: 0 },
    { size: 50, allocated: false, allocatedProcesses: [], allocatedSize: 0 },
    { size: 300, allocated: false, allocatedProcesses: [], allocatedSize: 0 },
];

// Function to display memory blocks
function displayMemoryBlocks() {
    const memoryBlocksContainer = document.getElementById('memoryBlocks');
    memoryBlocksContainer.innerHTML = '';
    let totalInternalFragmentation = 0;
    memoryBlocks.forEach((block, index) => {
        const blockDiv = document.createElement('div');
        const allocatedProcesses = block.allocatedProcesses.length > 0 ? ` (Processes ${block.allocatedProcesses.join(', ')})` : '';
        const internalFragmentation = block.size - block.allocatedSize;
        totalInternalFragmentation += internalFragmentation;
        blockDiv.textContent = `Block ${index + 1}: Size ${block.size}, Allocated: ${block.allocated ? 'Yes' : 'No'}${allocatedProcesses}, Internal Fragmentation: ${internalFragmentation}`;
        memoryBlocksContainer.appendChild(blockDiv);
    });
    const fragmentationDiv = document.createElement('div');
    fragmentationDiv.textContent = `Total Internal Fragmentation: ${totalInternalFragmentation}`;
    memoryBlocksContainer.appendChild(fragmentationDiv);
}

// Function to handle memory allocation
function allocateMemory(processSizes) {
    for (let i = 0; i < processSizes.length; i++) {
        const processSize = processSizes[i];
        let maxFragmentationIndex = -1;
        let maxFragmentation = -Infinity;
        for (let j = 0; j < memoryBlocks.length; j++) {
            if (memoryBlocks[j].size - memoryBlocks[j].allocatedSize >= processSize) {
                const fragmentation = memoryBlocks[j].size - memoryBlocks[j].allocatedSize - processSize;
                if (fragmentation > maxFragmentation) {
                    maxFragmentation = fragmentation;
                    maxFragmentationIndex = j;
                }
            }
        }
        if (maxFragmentationIndex !== -1) {
            memoryBlocks[maxFragmentationIndex].allocated = true;
            memoryBlocks[maxFragmentationIndex].allocatedProcesses.push(i + 1);
            memoryBlocks[maxFragmentationIndex].allocatedSize += processSize;
        } else {
            console.log(`Process ${i + 1} of size ${processSize} could not be allocated.`);
        }
    }
    displayMemoryBlocks();
}

// Function to handle form submission
const processesForm = document.getElementById('processesForm');
processesForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const processCountInput = document.getElementById('processCount');
    const processCount = parseInt(processCountInput.value);
    if (!isNaN(processCount) && processCount > 0) {
        renderProcessInputs(processCount);
    }
});

// Function to render process size input fields
function renderProcessInputs(processCount) {
    const processesInput = document.getElementById('processesInput');
    processesInput.innerHTML = '';
    for (let i = 0; i < processCount; i++) {
        const processLabel = document.createElement('label');
        processLabel.textContent = `Enter size of Process ${i + 1}:`;
        const processInput = document.createElement('input');
        processInput.setAttribute('type', 'number');
        processInput.setAttribute('required', true);
        processInput.classList.add('processInput');
        processesInput.appendChild(processLabel);
        processesInput.appendChild(processInput);
        processesInput.appendChild(document.createElement('br'));
    }
    const allocateButton = document.createElement('button');
    allocateButton.textContent = 'Allocate Memory';
    allocateButton.addEventListener('click', function() {
        const processInputs = document.querySelectorAll('.processInput');
        const processSizes = Array.from(processInputs).map(input => parseInt(input.value));
        allocateMemory(processSizes);
    });
    processesInput.appendChild(allocateButton);
}

// Function to initialize the page
function init() {
    displayMemoryBlocks();
}

// Call the init function to initialize the page
init();
