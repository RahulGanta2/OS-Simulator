// Shared resources
let sharedData = ''; // Shared data being read/written
let readersCount = 0; // Number of active readers
let writersCount = 0; // Number of active writers

// Function to update the readers output
function updateReadersOutput() {
  document.getElementById('readersOutput').innerText = `Active Readers: ${readersCount}`;
}

// Function to update the writers output
function updateWritersOutput() {
  document.getElementById('writersOutput').innerText = `Active Writers: ${writersCount}`;
}

function displayErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = message;
    document.getElementById('errorMessage').appendChild(errorMessage);
  }
  
  // Function to clear error messages
  function clearErrorMessages() {
    document.getElementById('errorMessage').innerHTML = '';
  }

// Function to perform a read operation by a reader
function performRead(readerNumber) {
    if (writersCount > 0) { // Check if any writer is writing or waiting
        displayErrorMessage('A writer is currently writing. Readers cannot read.');
        return;
      }
  readersCount++; // Increment active readers count
  updateReadersOutput();

  // Simulate reading operation (e.g., reading sharedData)
  const readData = `Reader ${readerNumber} read: ${sharedData}`;
  document.getElementById('readersData').innerText = readData;
 // Decrement active readers count after reading
  updateReadersOutput();
}
function performReadOver(readerNumber){
    readersCount--;
    updateReadersOutput();
}
// Function to perform a write operation by a writer
function performWrite(writerNumber) {
    if(readersCount>0){
        displayErrorMessage('A reader is currently reading. Writers cannot write.');
        return;
    }
    if(writersCount>0){
        displayErrorMessage('A writer is currently writing. Writers cannot write')
    } // Increment active writers count
    writersCount++;
  updateWritersOutput();

  // Simulate writing operation (e.g., updating sharedData)
  sharedData = `Data written by Writer ${writerNumber}`;
  document.getElementById('writersData').innerText = sharedData;
}
function performWriteOver(writerNumber){
    writersCount--;
    updateWritersOutput();
}
