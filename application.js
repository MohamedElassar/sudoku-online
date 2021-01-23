const puzzle_HTML = document.getElementById("puzzle");

class Square {
/*
	constructor(id){
		this.button = document.createElement("button");	
		this.button.setAttribute('class', 'buttons');
		this.button.setAttribute('id', id);
		this.button.innerHTML = "";
	}

	setValue(value){
		this.button.innerHTML = value;
	}
	
	getButton(){
		return this.button;
	}
*/

	constructor(id)	{
		this.inp = document.createElement("input");	
		this.inp.setAttribute('class', 'buttons');
		this.inp.setAttribute('id', id);
		this.inp.innerHTML = "";
	}

	setValue(value){
		this.inp.innerHTML = value;
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
		for(let i = 0; i < this.row; i++){
			var temp = [];
			for(let j = 0; j < this.col; j++){
				let unique_id = this.row * i + j;
				let tempSquare = new Square(unique_id);
				tempSquare.getButton().addEventListener("input",
					this.handleClicks);
				temp.push(tempSquare);
			}
			this.squares.push(temp);
		}
	}
	
	handleClicks(){
		this.style.backgroundColor = "red";
		console.log(this.id);
	}

	updateSquares(stats){
		for(let i = 0; i < this.row; i++){
			for(let j = 0; j < this.col; j++){
				this.squares[i][j].setValue(stats[i][j]);
			}
		}
	}


	generateGrid(){
		let table = document.createElement("table");
		table.setAttribute('class', 'puzzle');
		for(var i = 0; i < this.row; i++){
			var div = document.createElement("tr");
			div.setAttribute('id', 'row-' + i);
			div.setAttribute('class', 'row');
			for(var j = 0; j < this.col; j++){
				let entry = document.createElement("td");
				entry.appendChild(this.squares[i][j].getButton());
				div.appendChild(entry);
			}
			puzzle_HTML.appendChild(div);
		}
	}

}



/*
	generateGrid(){
		for(var i = 0; i < this.row; i++){
			var div = document.createElement("div");
			div.setAttribute('id', 'row-' + i);
			div.setAttribute('class', 'row');
			for(var j = 0; j < this.col; j++){
				let button_div = document.createElement("div");
				button_div.setAttribute('class', 'buttons');
				button_div.appendChild(this.squares[i][j].getButton());
				div.appendChild(button_div);
			}
			puzzle_HTML.appendChild(div);
		}
	}

}
*/

const grid = new Grid(9, 9);
grid.generateGrid();
