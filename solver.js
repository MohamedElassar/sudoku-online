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

function isPossibleSol(num, row, col, board){
	for(var j = 0; j < COLS; j++){
		if(board[row][j] == num && j != col){
			return false;
		}
	}

	for(var j = 0; j < ROWS; j++){
		if(board[j][col] == num && j != row){
			return false;
		}
	}

	var row_lower_bound;
	var row_upper_bound;
	var col_lower_bound;
	var col_upper_bound;

	var row_remainder = row % 3;
	var col_remainder = col % 3;
	
	if(row_remainder === 0){
		row_lower_bound = row + 1;
		row_upper_bound = row + 2;
	} else if(row_remainder === 1) {
		row_lower_bound = row - 1;
		row_upper_bound = row + 1;
	} else if(row_remainder === 2) {
		row_lower_bound = row - 1;
		row_upper_bound = row - 2;
	}
	
	if(col_remainder === 0){
		col_lower_bound = col + 1;
		col_upper_bound = col + 2;
	} else if(col_remainder === 1) {
		col_lower_bound = col - 1;
		col_upper_bound = col + 1;
	} else if(col_remainder === 2) {
		col_lower_bound = col - 1;
		col_upper_bound = col - 2;
	}	

	if( num === board[row_lower_bound][col_lower_bound] ||
		num === board[row_lower_bound][col_upper_bound] ||	 
		num === board[row_upper_bound][col_lower_bound] ||	 
		num === board[row_upper_bound][col_upper_bound]	) {

			return false;	
	}

	return true;
}