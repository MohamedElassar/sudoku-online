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

class Square {
	constructor(id) {
		this.inp = document.createElement("input");	
		this.inp.setAttribute('class', 'inputs');
		this.inp.setAttribute('type', 'number');
		this.inp.setAttribute('min', 1);
		this.inp.setAttribute('max', 9);
		//this.inp.setAttribute('maxlength', 1);
		this.inp.setAttribute('id', id);
		this.inp.setAttribute('readonly', true);
	}
	
	getValue(){
		return this.inp.value;
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
	constructor(row, col){
		this.row = row;
		this.col = col;
		this.stats = Array.from(Array(this.row), () => new Array(this.col));
		this.squares = [];	
		this.initializeSquaresArray();
		this.puzzle = [];
	}

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


	handleClicks(){
		if(this.value >= 1 && this.value <= 9){
			this.style.color = '#679D64';
			//this.style.color = 'white';
		} else {
			alert("Please enter a number between 1 and 9, inclusive");
			this.value = "";
		}
				
	}


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


