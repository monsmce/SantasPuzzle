
var rows = 3;
var columns = 3;

var currentTile;//Refernce the tile we click to switch with the blank tile
var otherTile; //blank tile

var turns = 0;
var bestScore = null;

//this is the order we are placing the images in the puzzle box, we can choose where the peaces are going to be placed 
var imgOrder = ["7", "5", "3", "1", "6", "4", "2", "9", "8"];
//var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let emptyTileId = "0-2";

// Function to update displayed turns
function updateTurns() 
{
    document.getElementById("turns").innerText = turns;
}

// Function to update displayed best score
function updateBestScore() 
{
    document.getElementById("bestScore").innerText = bestScore !== null ? bestScore : "-";
}

function resetPuzzle() 
{
    const board = document.getElementById("board");
    board.innerHTML = "";
    turns = 0;
    updateTurns();

    // Reset imgOrder (you can also shuffle here if you want)
    imgOrder = ["7", "5", "3", "1", "6", "4", "2", "9", "8"];

    for (let r=0; r < rows; r++) //a for loop for rows
        {
        for (let c=0; c < columns; c++) //a for loop for colums
            {
            //we are placing for every box a img,
            //example <img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "IMG/image_part_00" + imgOrder.shift() + ".jpg";

            tile.draggable = false;

            //function
            tile.addEventListener("click", moveTile);

            document.getElementById("board").append(tile);
        }
    }
}

window.onload = function() 
{
    resetPuzzle();
    updateBestScore();

    // Load best score from localStorage
    let savedBest = localStorage.getItem("bestScore");
    if (savedBest !== null) {
    bestScore = parseInt(savedBest);
    updateBestScore();
}

    // Connect reset button
    document.getElementById("resetBtn").addEventListener("click", resetPuzzle);
}



function moveTile() 
{
    let tileId = this.id;
    let [r, c] = tileId.split("-").map(Number);
    let [er, ec] = emptyTileId.split("-").map(Number);

    // Check if the tile is adjacent to empty
    let adjacent =
        (r === er && Math.abs(c - ec) === 1) ||
        (c === ec && Math.abs(r - er) === 1);

    if (!adjacent) return;
    

    let emptyTile = document.getElementById(emptyTileId);
    
    // Swap images
    let tempSrc = this.src;
    this.src = emptyTile.src;
    emptyTile.src = tempSrc;

    // Update the empty tile position
    emptyTileId = tileId;

    turns += 1;
    updateTurns();

    checkWin();
}


function checkWin() 
{
    const tiles = document.querySelectorAll("#board img");
    let correct = true;

    let index = 1;
    for (let tile of tiles) 
        {
        const expected = "IMG/image_part_00" + index + ".jpg";
        if (!tile.src.includes(expected)) 
            {
            correct = false;
            break;
        }
        index++;
    }

    if (correct) {
        // Update best score
        if (bestScore === null || turns < bestScore) 
            {
            bestScore = turns;
            updateBestScore();
            // Save best score in localStorage
            localStorage.setItem("bestScore", bestScore);
            }
        showFullImage();
    }
}


function showFullImage() 
{
    const board = document.getElementById("board");
    board.innerHTML = ""; // remove all tiles

    let img = document.createElement("img");
    img.src = "IMG/SantasPuzzle.png"; // WRITE HERE your full picture
    img.classList.add("full-image");

    board.appendChild(img);
}
