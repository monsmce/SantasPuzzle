
var rows = 3;
var columns = 3;

var currentTile;//Refernce the tile we click to switch with the blank tile
var otherTile; //blank tile

var turns = 0;

//this is the order we are placing the images in the puzzle box, we can choose where the peaces are going to be placed 

var imgOrder = ["7", "5", "3", "1", "6", "4", "2", "9", "8"];
let emptyTileId = "0-2";

window.onload = function() //this function makes sure that the page finished loading first and then the function will run 
{
    //we are placing the images from the previos Array

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
        document.getElementById("turns").innerText = turns;
}