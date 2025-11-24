
var rows = 3;
var columns = 3;

var currentTile;//Refernce the tile we click to switch with the blank tile
var otherTile; //blank tile

var turns = 0;

//this is the order we are placing the images in the puzzle box, we can choose where the peaces are going to be placed 
var imgOrder = ["7", "5", "3", "1", "6", "4", "2", "9", "8"];

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


            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);


        }
    }
}

function dragStart() 
{
    currTile = this; //this refers to the img tile being dragged
}

//this function allows browser to dropp the img, and the tile can accept a drop
function dragOver(e) 
{
    e.preventDefault();
}
//again a function to allow dropping
function dragEnter(e) 
{
    e.preventDefault();
}

function dragLeave() 
{

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

//the final destination to any dragged image should only be in the empty img
function dragEnd() 
{
    if (!otherTile.src.includes("003.jpg")) 
        {
           return;
        }

        //we are taking the id coordonates from the dragged img, turning into an array 
    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"], also its removes the "-" between
    let r = parseInt(currCoords[0]);// takes the first string value and turns into a int index stored in r
    let c = parseInt(currCoords[1]);//then the second string value

        //same thing here 
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    //check for adjacency, so we can only move the img to a nearby box
    let moveLeft = r == r2 && c2 == c-1;//to move left you need to be placed in the same r and -1 for colums
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) 
        {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
        }
}


