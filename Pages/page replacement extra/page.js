function search(key, fr) {
    return fr.includes(key);
  }

  function predict(pg, fr, index) {
    for (let i = index - 1; i >= 0; i--) {
      for (let j = 0; j < fr.length; j++) {
        if (fr[j] === pg[i]) {
          return j;
        }
      }
    }
  }
 function mru(pg, fn) { 
const fr = new Array(fn).fill(undefined); // Initialize frames array with fn elements
const array = new Array(20).fill(0);
let hit = 0;
const outputDiv = document.getElementById('output'); // Define outputDiv here
const table = document.createElement('table');
table.className = "table table-bordered";
table.style.width = "80%"; 
table.style.marginLeft = "auto"; 
table.style.marginRight = "auto";

// Create table header
let trHeader = document.createElement('tr');

// Add "Incoming Sequence" to the first cell
let thIncoming = document.createElement('th');
thIncoming.textContent = "Incoming Sequence";
trHeader.appendChild(thIncoming);

// Add headers for each page
for (let i = 0; i < pg.length; i++) {
  let thPage = document.createElement('th');
  thPage.textContent = `${pg[i]}`;
  trHeader.appendChild(thPage);
}
table.appendChild(trHeader);



// Create table rows
for (let j = 0; j < fn; j++) {
  let tr = document.createElement('tr');
  table.appendChild(tr);

  // First cell of the row is the frame number
  let frameCell = document.createElement('td');
  frameCell.textContent = `Frame ${j + 1}`;
  tr.appendChild(frameCell);

  for (let i = 0; i < pg.length; i++) {
    let td = document.createElement('td');
    td.textContent = (fr[j] !== undefined) ? fr[j] : "-"; // Access frame values by index j
    tr.appendChild(td);
  }
}

outputDiv.innerHTML = ''; 
outputDiv.appendChild(table); 

for (let i = 0; i < pg.length; i++) {
  if (search(pg[i], fr)) {
    hit++;
    array[pg[i]]++;
  } else if (fr.includes(undefined)) {
    let index = fr.indexOf(undefined);
    fr[index] = pg[i];
    array[pg[i]]++;
  } else {
    let index = predict(pg, fr, i);
    array[pg[i]]++;
    fr[index] = pg[i];
  }
  for (let j = 0; j < fn; j++) {
      let cell = table.rows[j + 1].cells[i + 1]; 
      cell.textContent = fr[j] !== undefined ? fr[j] : "-"; 
  }}

return {
  hits: hit,
  misses: pg.length - hit
};
}

 function mfu(pg, fn) {
const fr = new Array(fn).fill(undefined); // Initialize frames array with fn elements
const array = new Array(20).fill(0);
let hit = 0;
const outputDiv = document.getElementById('output'); // Define outputDiv here
// const table = document.createElement('table');
// table.className = "table table-bordered";

const table = document.createElement('table');
table.className = "table table-bordered";
table.style.width = "80%"; 
table.style.marginLeft = "auto"; 
table.style.marginRight = "auto";



// Create table header
let trHeader = document.createElement('tr');

// Add "Incoming Sequence" to the first cell
let thIncoming = document.createElement('th');
thIncoming.textContent = "Incoming Sequence";
trHeader.appendChild(thIncoming);

// Add headers for each page
for (let i = 0; i < pg.length; i++) {
  let thPage = document.createElement('th');
  thPage.textContent = `${pg[i]}`;
  trHeader.appendChild(thPage);
}
table.appendChild(trHeader);



// Create table rows
for (let j = 0; j < fn; j++) {
  let tr = document.createElement('tr');
  table.appendChild(tr);

  // First cell of the row is the frame number
  let frameCell = document.createElement('td');
  frameCell.textContent = `Frame ${j + 1}`;
  tr.appendChild(frameCell);

  for (let i = 0; i < pg.length; i++) {
    let td = document.createElement('td');
    td.textContent = (fr[j] !== undefined) ? fr[j] : "-"; // Access frame values by index j
    tr.appendChild(td);
  }
}

outputDiv.innerHTML = ''; // Clear the existing content
outputDiv.appendChild(table); // Append the dynamically generated table

for (let i = 0; i < pg.length; i++) {
  if (search(pg[i], fr)) {
    hit++;
    array[pg[i]]++;
  } else if (fr.includes(undefined)) {
    let index = fr.indexOf(undefined);
    fr[index] = pg[i];
    array[pg[i]]++;
  } else {
    let t = 0;
    let index1 = 0;
    for (let j = 0; j < fr.length; j++) {
        if (array[fr[j]] > t) {
            t = array[fr[j]];
            index1 = j;
        }
    }
    array[pg[i]]++;
    fr[index1] = pg[i];
}
  for (let j = 0; j < fn; j++) {
      let cell = table.rows[j + 1].cells[i + 1]; 
      cell.textContent = fr[j] !== undefined ? fr[j] : "-"; 
  }}

return {
  hits: hit,
  misses: pg.length - hit
};
}
//--------------------------------------------------------------------------------------
function lfu(pg, fn) {
    const fr = new Array(fn).fill(undefined); 
    const array = new Array(20).fill(0);
    let hit = 0;
    const outputDiv = document.getElementById('output'); 
    const table = document.createElement('table');
    table.className = "table table-bordered";
    table.style.width = "80%"; 
    table.style.marginLeft = "auto"; 
    table.style.marginRight = "auto";
// Create table header
let trHeader = document.createElement('tr');

// Add "Incoming Sequence" to the first cell
let thIncoming = document.createElement('th');
thIncoming.textContent = "Incoming Sequence";
trHeader.appendChild(thIncoming);

// Add headers for each page
for (let i = 0; i < pg.length; i++) {
  let thPage = document.createElement('th');
  thPage.textContent = `${pg[i]}`;
  trHeader.appendChild(thPage);
}
table.appendChild(trHeader);

for (let j = 0; j < fn; j++) {
    let tr = document.createElement('tr');
    table.appendChild(tr);
  
    // First cell of the row is the frame number
    let frameCell = document.createElement('td');
    frameCell.textContent = `Frame ${j + 1}`;
    tr.appendChild(frameCell);
  
    for (let i = 0; i < pg.length; i++) {
      let td = document.createElement('td');
      td.textContent = (fr[j] !== undefined) ? fr[j] : "-"; // Access frame values by index j
      tr.appendChild(td);
    }
  }
  
  outputDiv.innerHTML = ''; // Clear the existing content
  outputDiv.appendChild(table); // Append the dynamically generated table
  

    for (let i = 0; i < pg.length; i++) {
        if (search(pg[i], fr)) {
            hit++;
            array[pg[i]]++;
        } else if (fr.includes(undefined)) {
            let index = fr.indexOf(undefined);
            fr[index] = pg[i];
            array[pg[i]]++;
          }  else {
            let t=Number.MAX_SAFE_INTEGER;
            
            let index1=0;
            for (let j=0; j <fr.length; j++){
                if(array[fr[j]]<t){
                    t=array[fr[j]];
                    
                    index1 =j;
                }
            }
            array[pg[i]]++;
            fr[index1] = pg[i];
        }
        for (let j = 0; j < fn; j++) {
            let cell = table.rows[j + 1].cells[i + 1]; 
            cell.textContent = fr[j] !== undefined ? fr[j] : "-"; 
        }}
      
      return {
        hits: hit,
        misses: pg.length - hit
      };
      }
//--------------------------------------------------------------------------------------
function secondChance(pg, fn) {
  let victim=0;
const fr = new Array(fn).fill(undefined); // Initialize frames array with fn elements
const array = new Array(20).fill(0);
let hit = 0;
const outputDiv = document.getElementById('output'); // Define outputDiv here
const table = document.createElement('table');
table.className = "table table-bordered";
table.style.width = "80%"; 
table.style.marginLeft = "auto"; 
table.style.marginRight = "auto";

// Create table header
let trHeader = document.createElement('tr');

// Add "Incoming Sequence" to the first cell
let thIncoming = document.createElement('th');
thIncoming.textContent = "Incoming Sequence";
trHeader.appendChild(thIncoming);

// Add headers for each page
for (let i = 0; i < pg.length; i++) {
let thPage = document.createElement('th');
thPage.textContent = `${pg[i]}`;
trHeader.appendChild(thPage);
}
table.appendChild(trHeader);



// Create table rows
for (let j = 0; j < fn; j++) {
let tr = document.createElement('tr');
table.appendChild(tr);

// First cell of the row is the frame number
let frameCell = document.createElement('td');
frameCell.textContent = `Frame ${j + 1}`;
tr.appendChild(frameCell);

for (let i = 0; i < pg.length; i++) {
  let td = document.createElement('td');
  td.textContent = (fr[j] !== undefined) ? fr[j] : "-"; // Access frame values by index j
  tr.appendChild(td);
}
}

outputDiv.innerHTML = ''; // Clear the existing content
outputDiv.appendChild(table); // Append the dynamically generated table

for (let i = 0; i < pg.length; i++) {
  let found=0,index;
  for(let t=0;t<fr.length;t++){
      if(pg[i]== fr[t]){
          console.log("hre");
          found=1;
          index=t;
          break;
      }
  }

if (found==1) {
  hit++;
  array[index]=1;
  
} 
else if (fr.includes(undefined)) {
  let index = fr.indexOf(undefined);
  fr[index] = pg[i];
  array[index]=1;
  console.log(victim,array[victim] , fr[victim]);
} else {
  let l = fr.length;
  for (; ; ) {
      console.log(victim,array[victim] , fr[victim]);
      if (array[victim] === 1) {
          array[victim] = 0;
          victim = (victim + 1) % l;
      } else {
          array[victim] = 1;
          fr[victim] = pg[i];
          // console.log(victim);
          // console.log(fr[victim]);
          victim = (victim + 1) % l;
          break; 
      }
  }
}
for (let j = 0; j < fn; j++) {
    let cell = table.rows[j + 1].cells[i + 1]; // Get the cell in the j-th row and i-th column
    cell.textContent = fr[j] !== undefined ? fr[j] : "-"; // Update cell content with fr value or "-"
}}

return {
hits: hit,
misses: pg.length - hit
};
}

//--------------------------------------------------------------------------------------
function binaryToDecimal(binaryArray, size) {
  let decimalValue = 0;
  for (let i = 0; i < size; i++) {
    if (binaryArray[i] === 1) {
      decimalValue += Math.pow(2, size-i-1);
    }
  }
  return decimalValue;
}

function addRef(pg, fn) {
  let victim=0;
const fr = new Array(fn).fill(undefined); 
var grid = [];
for (var i = 0; i < fr.length; i++) {
grid[i] = [];
for (var j = 0; j < 4; j++) {
  grid[i][j] = 0; 
}
}
console.log(JSON.parse(JSON.stringify(grid)), "INITIAL");

// console.log("grid length:", grid.length);
let hit = 0;
const outputDiv = document.getElementById('output'); // Define outputDiv here
const table = document.createElement('table');
table.className = "table table-bordered";
table.style.width = "80%"; 
table.style.marginLeft = "auto"; 
table.style.marginRight = "auto";

// Create table header
let trHeader = document.createElement('tr');

// Add "Incoming Sequence" to the first cell
let thIncoming = document.createElement('th');
thIncoming.textContent = "Incoming Sequence";
trHeader.appendChild(thIncoming);

// Add headers for each page
for (let i = 0; i < pg.length; i++) {
let thPage = document.createElement('th');
thPage.textContent = `${pg[i]}`;
trHeader.appendChild(thPage);
}
table.appendChild(trHeader);



// Create table rows
for (let j = 0; j < fn; j++) {
let tr = document.createElement('tr');
table.appendChild(tr);

// First cell of the row is the frame number
let frameCell = document.createElement('td');
frameCell.textContent = `Frame ${j + 1}`;
tr.appendChild(frameCell);

for (let i = 0; i < pg.length; i++) {
  let td = document.createElement('td');
  td.textContent = (fr[j] !== undefined) ? fr[j] : "-"; // Access frame values by index j
  tr.appendChild(td);
}
}

outputDiv.innerHTML = ''; // Clear the existing content
outputDiv.appendChild(table); // Append the dynamically generated table

for (let i = 0; i < pg.length; i++) { 
// console.log(i, grid,"fir");
  let found=0,index;
  for(let t=0;t<fr.length;t++){
      if(pg[i]== fr[t]){
          found=1;
          index=t;
          break;
      }
  }

if (found==1) {
  console.log(i,JSON.parse(JSON.stringify(grid)));
  hit++;
  for(let v=0;v<fr.length;v++){
    for(let t=2;t>-1;t--){
    grid[v][t+1]=JSON.parse(JSON.stringify(grid))[v][t];
    }
    grid[v][0]=0;
  }
 
  grid[index][0]=1;
  
} 
else if (fr.includes(undefined)) {
  console.log(i,JSON.parse(JSON.stringify(grid)));
  let index = fr.indexOf(undefined);
  fr[index] = pg[i];
  // array[index]=1;

  for(let v=0;v<fr.length;v++){
    for(let t=2;t>-1;t--){
    grid[v][t+1]=grid[v][t];
    }
    grid[v][0]=0;
  }

  grid[index][0]=1;
} 
else {
  console.log(i,JSON.parse(JSON.stringify(grid)));
    let value=Number.POSITIVE_INFINITY,victim=0;
    for (let t = 0; t < fr.length; t++) {
      console.log(grid[t], "----", binaryToDecimal(JSON.parse(JSON.stringify(grid[t])), 4), "---------");
      if (value > binaryToDecimal(JSON.parse(JSON.stringify(grid[t])), 4)) {
          value = binaryToDecimal(JSON.parse(JSON.stringify(grid[t])), 4);
          victim = t;
      }
  }
  
    fr[victim]=pg[i];

    for(let v=0;v<fr.length;v++){
      for(let t=2;t>-1;t--){
      grid[v][t+1]=JSON.parse(JSON.stringify(grid))[v][t];
      }
      grid[v][0]=0;
    }
    // for(let t=0;t<4;t++){
    //   grid[victim][t]=0;
    // }
    grid[victim][0]=1;
}
// console.log(i);console.log(i, grid);
for (let j = 0; j < fn; j++) {
    let cell = table.rows[j + 1].cells[i + 1]; 
    cell.textContent = fr[j] !== undefined ? fr[j] : "-"; 
}}

return {
hits: hit,
misses: pg.length - hit
};
}
//--------------------------------------------------------------------------------------

let selectedAlgorithm="MFU";
document.getElementById('runBtn').addEventListener('click', function () {
    const frames = parseInt(document.getElementById('frames').value);
    const streamInput = document.getElementById('stream').value.trim();
    const stream = streamInput.split(' ').map(Number);
    if (selectedAlgorithm === "MRU") {
        var result = mru(stream, frames);
    }
    else if (selectedAlgorithm === "MFU") {
        var result = mfu(stream, frames);
    }
    else if (selectedAlgorithm === "LFU") {
        var result = lfu(stream, frames);
    }
    else if (selectedAlgorithm === "SecChanc") {
      var result = secondChance(stream, frames);
  }
  else if (selectedAlgorithm === "AddRef") {
    var result = addRef(stream, frames);
}
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `
      <p>No. of hits = ${result.hits}</p>
      <p>No. of misses = ${result.misses}</p>
    `;
});

document.addEventListener("click", function(event) {
    if (event.target.matches(".algorithm_dropdown li a")) {
        event.preventDefault();
        selectedAlgorithm = event.target.getAttribute("calcStyle");
        console.log("vannu njan");
        
        document.getElementById('algorithm_button').innerHTML = selectedAlgorithm + ' <span class="caret"></span>';

        if (selectedAlgorithm === "MRU") {
            console.log("MRU algorithm selected");
          
        } else if (selectedAlgorithm === "MFU") {
            console.log("MFU algorithm selected");
        }
        else if (selectedAlgorithm === "LFU") {
            console.log("LFU algorithm selected");
        }
        else if (selectedAlgorithm === "SecChanc") {
          console.log("SecChanc selected");
      }
      else if (selectedAlgorithm === "AddRef") {
        console.log("AddRef selected");
    }

    }
});

// Function to update the output

function updateOutput(result) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
      <p style="margin-left":100px;>No. of hits = ${result.hits}</p>
      <p>No. of misses = ${result.misses}</p>
  `;
  outputDiv.style.display = 'flex';
  outputDiv.style.justifyContent = 'center';
  outputDiv.style.alignItems = 'center';
}





// Event listener for algorithm information button
document.getElementById('algorithmInfoBtn').addEventListener('click', function() {
  let algorithmInfo = document.getElementById('algorithmInfo');
  // If the algorithm description is currently visible, hide it
  if (algorithmInfo.style.display === 'block') {
    algorithmInfo.style.display = 'none';
  } else {
    // Get the algorithm description based on the selectedAlgorithm
    let algorithmDescription = getAlgorithmDescription(selectedAlgorithm);
    // Display the algorithm description
    algorithmInfo.innerHTML = algorithmDescription;
    algorithmInfo.style.display = 'block';
  }
});
// Function to get the description of the selected algorithm
function getAlgorithmDescription(selectedAlgorithm) {
  let description = "";
  switch (selectedAlgorithm) {
      case "MFU":
        description = "<div><h3>Most Frequently Used (MFU) algorithm</h3><p>The MFU (Most Frequently Used) algorithm is a page replacement strategy in operating systems for virtual memory management. It is a Counting Based Page Replacement Algorithm (replaces the page based on count i.e. number of times the page is accessed in the past) It aims to replace the page in memory that has been accessed the most times in the past.</br><h4>Overview</h4><ul><li>Goal: Evict the page that's been used the most, assuming it will likely be needed again soon.</li><li>Selection: When a page fault occurs (needed page not in memory), MFU identifies the most frequently accessed page currently in memory.</li><li>Replacement: The MFU page is swapped out to secondary storage, and the new page is loaded into memory.</li><li>Challenge: While intuitive, MFU is impractical for real-world systems. Accurately tracking most frequently used pages is complex and expensive.</li></ul></div>";

          break;
      case "MRU":
          description = "<div><h3>Most Recently Used (MRU) algorithm</h3><p> It's one of the most common and effective page replacement strategies in operating systems.</p></br><h4>Overview</h4><ul><li>Goal: Replace the page that has been accessed the least recently.</li><li>Selection: When a page fault occurs, LRU identifies the page in memory that hasn't been used for the longest time.</li><li>Replacement: The least recently used page is swapped out to secondary storage, and the new page is loaded into memory.</li><li>Advantage: LRU is relatively simple to implement and performs well for workloads with some locality of reference.</li><li>Disadvantage: LRU might evict a page that was recently used but might not be used again soon, leading to additional page faults if the access pattern is highly erratic.</li></ul></div>";
          break;
      case "LFU":
          description = "<div><h3>Least Frequently Used (LFU) algorithm</h3><p>The LFU (Least Frequently Used) algorithm is a page replacement strategy in operating systems for virtual memory management. It is a Counting Based Page Replacement Algorithm (replaces the page based on count i.e. number of times the page is accessed in the past). LFU aims to keep the pages that are accessed the least frequently out of memory.</p></br><h4>Overview</h4><ul><li>Goal: Replace the page that has been referenced the least number of times overall.</li><li>Selection: When a page fault occurs, LFU identifies the page with the lowest access count in memory.</li><li>Replacement: The least frequently used page is swapped out to secondary storage, and the new page is loaded into memory.</li><li>Advantage: LFU can be effective for workloads with a mix of frequently and infrequently accessed pages.</li><li>Disadvantage: Tracking access counts for all pages can be complex. LFU might evict a page that was recently accessed but not very frequently before, leading to additional page faults.</li></ul></div>";
          break;
      case "AddRef":
          description = "<div><h3>Additional Reference Bit algorithm (LRU Approximation)</h3><p> The Additional Reference Bits Algorithm is a clever approach to approximate the Least Recently Used (LRU) page replacement strategy. It uses a limited number of bits associated with each page in memory to track reference history and identify candidates for eviction, offering a balance between accuracy and complexity.</p></br><h4>Overview</h4><ul><li>Goal: Approximate LRU (Least Recently Used) for page replacement.</li><li>Method: Use a few reference bits per page (e.g., 2, 4). On access, shift bits right, set rightmost to 1 (tracks recent use). Evict page with the lowest reference bit value (most zeros).</li><li>Benefit: Simpler than LRU, better than FIFO (First-In, First-Out).</li><li>Advantage: LRU is relatively simple to implement and performs well for workloads with some locality of reference.</li><li>Disadvantage: More reference bits provide a more accurate approximation, but also increase storage overhead.</li></ul></div>";
          break;
      case "SecChanc":
          description = "<div><h3>Second Chance algorithm (LRU Approximation)</h3><p>The Second Chance (or Clock) algorithm is a page replacement strategy designed approximate  Least Recently Used (LRU) page replacement strategy at the same time being simpler than LRU.</p></br><h4>Overview</h4><ul><li>Goal: Evict the least recently used page in memory.</li><li>Method: Tracks recently used pages with a single reference bit per page. A circular pointer scans pages like a clock hand. On a page access, its reference bit is set to 1.</li><li>Replacement: The pointer scans for a page with a reference bit of 0 (not recently used). This page is evicted. If all reference bits are 1, the pointer advances, giving each page a second chance.</li><li>Benefit: Simpler implementation compared to LRU, avoids throwing out recently used pages immediately.</li><li>Drawback:Can behave like FIFO (First-In, First-Out) if reference bits are frequently reset.</li></ul></div>";
          break;
      default:
          description = "No information available.";
          break;
  }
  return description;
}


