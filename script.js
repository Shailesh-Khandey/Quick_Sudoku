var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

function clearBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = '';
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let clear = document.getElementById('clearPuzzle')
let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy') //api fetching
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}



SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isValid( board, i, j, num, n){
	//Row check (column will vary)
	for (let x = 0; x < n;x++){
	   if(board[i][x]==num){
		   return false;
	   }
	}
	//col check (row will vary)
	for (let x = 0; x < n;x++){
	   if(board[x][j]==num){
		   return false;
	   }
	}
	
	//submatrix or subgrid check
	let rn = Math.sqrt(n); // rn = root n;
	let si = i - i % rn; // using formula (startof i = i-i% root n) becoz we need start index of that submatrix;
	let sj = j - j % rn;

	for (let x = si; x < si + rn; x++){
		for (let y = sj; y < sj + rn; y++){
			 if(board[x][y]==num){
				 return false;
			 }
		}
	}
	return true;
}

function SudokuSolver( board, i, j, n){
	//Base case
	if(i==n){
		// Print(board, n);
		FillBoard(board);
		return true;
	}

	// if j is reached max limit i.e we are outside the board---> increment i && reset j to 0;  
	if(j==n){    //corner case 1
		return SudokuSolver(board, i + 1, 0, n);
	}

	// if cell is already filled --> just move ahead
	if (board[i][j] != 0)   //corner case 2
	{
	   return SudokuSolver(board, i, j + 1, n);
   }


	//we will try to fill the cell with an appropriate number.
	for (let num = 1; num <= 9;num++){
	  //check if the num can be filled
	   if(isValid(board,i,j,num,n)){
		   board[i][j] = num;
		   let subAns = SudokuSolver(board, i, j + 1, n);
		   if(subAns){
			   return true;
		   }
		   //Backtracking ---> undo the change and check for other valid numbers
		   board[i][j] = 0;
	   }
	}
	return false;
}

clear.onclick = () => {
	clearBoard(board);
}
