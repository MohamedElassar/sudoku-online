const puzzle_HTML = document.getElementById("puzzle");
const easy_button_HTML = document.getElementById("easy");
const medium_button_HTML = document.getElementById("medium");
const hard_button_HTML = document.getElementById("hard");

easy_button_HTML.addEventListener("click", setURL);
medium_button_HTML.addEventListener("click", setURL);
hard_button_HTML.addEventListener("click", setURL);

var url = "https://sugoku.herokuapp.com/board?difficulty=";

class Square {
	constructor(id)	{
		this.inp = document.createElement("input");	
		this.inp.setAttribute('class', 'inputs');
		this.inp.setAttribute('id', id);
		this.inp.value = "";
	}

	setValue(value){
		if(value !== 0){
			this.inp.value = value;
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
	}

	initializeSquaresArray(){
		for(let i = 0; i < this.row; i++){
			var temp = [];
			for(let j = 0; j < this.col; j++){
				let unique_id = this.row * i + j;
				let tempSquare = new Square(unique_id);
				tempSquare.getButton().addEventListener("input",this.handleClicks);
				temp.push(tempSquare);
			}
			this.squares.push(temp);
		}
	}


	beginNewArray(newArray) {
		this.clearGrid();
		for(let i = 0; i < this.row; i++){
			for(let j = 0; j < this.col; j++){
				this.squares[i][j].setValue(newArray[i][j]);
			}
		}
	}


	clearGrid() {
		for(let i = 0; i < this.row; i++){
			for(let j = 0; j < this.col; j++){
				this.squares[i][j].setValue("");
			}
		}		
	}

	handleClicks(){
		this.style.backgroundColor = "red";
		console.log(this.id);
	}

	updateSquares(stats){

	}


	generateGrid(){

		let table = document.createElement("table");

		for(var i = 0; i < this.row; i++){

			var div = document.createElement("tr");
			div.setAttribute('id', 'row-' + i);
			div.setAttribute('class', 'row');

/*
			if(i%3 === 0) {
				div.style.borderTop = '3px solid red';
			} else if (i === this.row - 1) {
				div.style.borderBottom = '3px solid red';
			}
*/

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

/*
				if(j%3 === 0) {
					div.style.borderLeft = '3px solid red';
				} else if (j === this.col - 1) {
					div.style.borderRight = '3px solid red';
				}
*/

				div.appendChild(entry);
			}
			table.appendChild(div);
			//puzzle.appendChild(div);
		}
		puzzle.appendChild(table);
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
			grid.beginNewArray(json["board"]);

		}
	};
}

const grid = new Grid(9, 9);
grid.generateGrid();


