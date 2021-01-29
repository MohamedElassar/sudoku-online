/*
Solver.js is a file that is dedicated to finding a solution to the sudoku puzzle that was
obtained from https://sugoku.herokuapp.com. The functions in this file are called after the 
puzzle is displayed to the user. This is done to minimize the wait time before the user can
see the puzzle.
*/

/*
A backtracking algorithm is used to find a solution to the puzzle. The getSol(arr) method starts by
looping through arr (which is the puzzle in a 2D Array structure with empty fields represented as 0).
If it lands on a field that equates to 0 (meaning that a value needs to be obtained for this field), 
it will start by making a guess for the possible solution, starting with 1. It then calls the
isPossible method and passes the guess, the row and column of the field at question, and the whole puzzle.
The operation of that method is explained in the comments above it. It returns "true" if the guess
meets the criteria, and "false" otherwise. If true is returned, the guess is a valid one (for now) and 
that field in the puzzle (arr[i][j]) is set to that guess. The getSol method is then recursively
called and it repeats all the previous steps using the updated puzzle with the guess added. If at some
point no valid guesses can be made for a given field, that means that the combination of guesses we chose
isn't correct and the getSol function resets the incorrect fields to 0, and then recalls itself recursively
*/
function getSol(arr){
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLS; j++){
			if(arr[i][j] == 0){
				for(var guess = 1; guess < 10; guess++){
					if(isPossibleSol(guess, i, j, arr)){
						arr[i][j] = guess;
						if(getSol(arr)){
							arr[i][j] = 0;
						} else{
							return 0;
						}
					}
				}
				return 1;
			}
		}	
	}
	return 0;
}

/*
The isPossibleSol method checks if a guess made in getSol is a valid one. It does that by testing
the solution according to the following sudoku rules:
1) Each of the 9 rows must not have any duplicate numbers
2) Each of the 9 columns must not have any duplicate numbers
3) Each of the 9 "boxes" must not have any duplicate numbers
Note: An example of a "box" would be the one formed by the intersection of the
first 3 rows and first 3 columns
*/
function isPossibleSol(num, row, col, board){
	//checking if the guess already exists in its column
	for(var j = 0; j < COLS; j++){
		if(board[row][j] == num && j != col){
			return false;
		}
	}

	//checkinf if the guess already exists in its row
	for(var j = 0; j < ROWS; j++){
		if(board[j][col] == num && j != row){
			return false;
		}
	}

	/*
	checking if the guess already exists in its box. This involves comparing the guess with only
	4 other fields in the box, and not all 8. This is because when we previously checked the 
	field's row and column (and assuming that these tests passed), we eliminated the other 4 
	fields in the same box as our guess, leaving us with only 4 fields to check agianst.
	*/
	var row_lower_bound;
	var row_upper_bound;
	var col_lower_bound;
	var col_upper_bound;

	var row_remainder = row % 3;
	var col_remainder = col % 3;
	
	if(row_remainder === 0){ // check if our guess is in row 0, 3, or 6
		row_lower_bound = row + 1;
		row_upper_bound = row + 2;
	} else if(row_remainder === 1) { // check if our guess is in row 1, 4, or 7
		row_lower_bound = row - 1;
		row_upper_bound = row + 1;
	} else if(row_remainder === 2) { // check if our guess is in row 2, 5, or 8
		row_lower_bound = row - 1;
		row_upper_bound = row - 2;
	}
	
	if(col_remainder === 0){ // check if our guess is in col 0, 3, or 6
		col_lower_bound = col + 1;
		col_upper_bound = col + 2;
	} else if(col_remainder === 1) { // check if our guess is in col 1, 4, or 7
		col_lower_bound = col - 1;
		col_upper_bound = col + 1;
	} else if(col_remainder === 2) { // check if our guess is in col 2, 5, or 8
		col_lower_bound = col - 1;
		col_upper_bound = col - 2;
	}	

	if( num === board[row_lower_bound][col_lower_bound] ||
		num === board[row_lower_bound][col_upper_bound] ||	 
		num === board[row_upper_bound][col_lower_bound] ||	 
		num === board[row_upper_bound][col_upper_bound]	) { //check if guess already exists in its box
			return false;	
	}
	return true; // returns true if all the tests pass, indicating that our guess is valid (for now)
}