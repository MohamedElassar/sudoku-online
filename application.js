const puzzle_HTML = document.getElementById("puzzle");
const easy_button_HTML = document.getElementById("easy");
const medium_button_HTML = document.getElementById("medium");
const hard_button_HTML = document.getElementById("hard");
const verify_button_HTML = document.getElementById("verify");

easy_button_HTML.addEventListener("click", setURL);
medium_button_HTML.addEventListener("click", setURL);
hard_button_HTML.addEventListener("click", setURL);

var url = "https://sugoku.herokuapp.com/board?difficulty=";

const ROWS = 9;
const COLS = 9;

/*
The class Square is used to create an Input element at each cell in the sudoku table
Even though an input element is created for every cell in the puzzle, cells with
fixed values forming the puzzle to be solved are set to readonly.

The value for the input elements is updated when the user enters a number. An eventListener
is added to each input element to perform some checks on the input, ensuring that it is an integer
falling between 1 and 9, inclusive. The callback function for this event listener is handleClicks,
which can be found in the Grid class.
*/
class Square {
	constructor(id) {
		this.inp = document.createElement("input");	
		this.inp.setAttribute('class', 'inputs');
		this.inp.setAttribute('type', 'number');
		this.inp.setAttribute('min', 1);
		this.inp.setAttribute('max', 9);
		this.inp.setAttribute('id', id);
		this.inp.setAttribute('readonly', true);
	}
	
	setReadOnly(bool){
		if(bool) {
			this.inp.setAttribute('readonly', bool);	
		} else {
			this.inp.removeAttribute('readonly');
		}
	}
	
	getButton(){
		return this.inp;
	}
}

class Grid {
	/*
	Initializing a grid instance. Square instances are created and are stored in the 2D array
	this.squares. this.squares[0] would represent the Square elements in the first row of the 
	grid, and this.squares[0][0] would represent the Square element in the top left corner of the grid.

	this.puzzle is an array that stores the solved version of the sudoku puzzle. The solution is obtained
	through the getSol method of this class, which calls functions in the file solver.js.
	*/ 
	constructor(row, col){
		this.row = row;
		this.col = col;
		this.squares = [];	
		this.initializeSquaresArray();
		this.puzzle = [];
	}

	/*
	This method initializes this.squares by creating i*j instances of the Squares class and
	storing them in the arary. Event listener is added to each Square element that handles the change
	in input by calling this.handleClicks. This method ensures that the value entered by the user is 
	a valid entry, and updates the UI based on that result. 
	*/
	initializeSquaresArray(){
		for(let i = 0; i < this.row; i++){
			var temp = [];
			for(let j = 0; j < this.col; j++) {
				let unique_id = this.row * i + j;
				let tempSquare = new Square(unique_id);
				tempSquare.getButton().addEventListener("change", this.handleClicks);
				temp.push(tempSquare);
			}
			this.squares.push(temp);
		}
	}

	/*
	Callback function to the event listener associated with the Squares elements. 
	Ensures that the input value is a valid entry between 1 and 9
	If the input is not valid, an alert message is displayed to the user and the value of the
	input element is restored to an empty string
	*/
	handleClicks(){
		if(this.value >= 1 && this.value <= 9){
			this.style.color = '#679D64';
		} else {
			alert("Please enter a number between 1 and 9, inclusive");
			this.value = "";
		}
				
	}

	/*
	This method updates the grid by adding the values obtained from the puzzle. The value of each Square element
	in this.squares is updated to the corresponding value from the puzzle. If the corresponding
	value is 0 (meaning that this is an unknown field that the user should input), the Square element's
	readonly attribute is set to false, meaning that the user can edit this field. If the corresponding value
	is a that is part of the puzzle and isn't supposed to change, the square element's readonly
	attribute is set to true 
	*/
	beginNewArray(newArray) {
		for(let i = 0; i < this.row; i++){
			for(let j = 0; j < this.col; j++){
				if(newArray[i][j] === 0) {
					this.squares[i][j].setReadOnly(false);
					this.squares[i][j].getButton().value = "";
				} else {
					this.squares[i][j].getButton().value = newArray[i][j];
					this.squares[i][j].setReadOnly(true);
				}
			}
		}
	}

	generateGrid(){
		let table = document.createElement("table");

		for(var i = 0; i < this.row; i++){

			var div = document.createElement("tr");
			div.setAttribute('id', 'row-' + i);
			div.setAttribute('class', 'row');

			for(var j = 0; j < this.col; j++){
				var entry = document.createElement("td");
				
				var c = document.createElement("label");
				c.setAttribute('for', i*ROWS + j);
				entry.appendChild(c);

				entry.appendChild(this.squares[i][j].getButton());

				if(j%3 === 0) {
					entry.style.borderLeft = '3px solid #747C7B';
				} else if (j == this.col - 1) {
					entry.style.borderRight = '3px solid #747C7B';
				}

				if(i%3 === 0) {
					entry.style.borderTop = '3px solid #747C7B';
				} else if (i == this.row - 1) {
					entry.style.borderBottom = '3px solid #747C7B';
				}

				div.appendChild(entry);
			}
			table.appendChild(div);
		}
		puzzle.appendChild(table);
	}

	setSol(puzzle_copy){
		for(let i = 0; i < ROWS; i++){
			var temp = [];
			for(let j = 0; j < COLS; j++){
				temp.push(puzzle_copy[i][j]);
			}
			this.puzzle.push(temp);
		}
	}

	/* 
	This method is executed when the Verify button is clicked. This method will loop through the grid
	and compare each value against the correct value stored in this.puzzle (which stores the solved version
	of the puzzle). If the user's value is correct, no change is made to the element. If the user
	inputted an incorrect value, the background of the element is changed to pink indicating that this is an
	incorrect entry. If no discrepancies are found, an alert message appears saying "Good Job!"
	*/
	verify(){
		let ctr = 0;
		for(let i = 0; i < ROWS; i++){
			for(let j = 0; j < COLS; j++){
				if(this.squares[i][j].getButton().value != this.puzzle[i][j]){
					this.squares[i][j].getButton().style.backgroundColor = '#ffcccc';
					ctr += 1;
				} else {
					this.squares[i][j].getButton().style.backgroundColor = '#E9F8F7';
				}
			}
		}
 
		if(ctr === 0) {
			alert("Good Job!")
		}

	}

}

function setURL(){
	var temp_url = url + this.innerHTML;
	console.log(temp_url);
	getPuzzle(temp_url);	
}

function getPuzzle(temp_url){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", temp_url, true);
	xmlhttp.send();		

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var str = this.responseText;
			var json = JSON.parse(str);			
			
			var puzzle = json["board"];
			var puzzle_copy = [];

			for(var i = 0; i < ROWS; i++){
				var temp = [];
				for(var j = 0; j < COLS; j++){
					temp.push(puzzle[i][j]);					
				}	
				puzzle_copy.push(temp);
			}

			grid.beginNewArray(puzzle);
			
			getSol(puzzle_copy);
			grid.setSol(puzzle_copy);
		}
	};
}

const grid = new Grid(ROWS, COLS);
grid.generateGrid();

verify_button_HTML.addEventListener("click", function(){grid.verify();});


