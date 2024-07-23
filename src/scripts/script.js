let solution, originalGrid;

/*This function() sets up some UI elements and calls additional functions to initialize 
a new game and update the scoreboard when the page fully loads using DOMContentLoaded. */

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("save-score-button").style.display = "none";
    newGame();
    updateScoresTable(); 
});



/*The newGame function resets the timer, enables the start and reset buttons,
 generates and displays a new Sudoku puzzle in the UI, and hides the save score button. */

function newGame() {
    if (control) {
        clearInterval(control); 
    }
    resetTime();  
    control = setInterval(cronometro, 1000);  
    document.getElementById("inicio").disabled = false;
    document.getElementById("reinicio").disabled = false;

    const sudokuGrid = document.getElementById("sudoku-grid");  
    sudokuGrid.innerHTML = '';  

    const grid = generateSudoku();  
    originalGrid = grid.map(row => row.slice());  
    solution = solveSudoku(grid.map(row => row.slice()));  

/*This code block fills the Sudoku grid in the UI by looping over each row and cell
 of the generated grid. For each cell, it creates a text input element (input).
  If the cell is not empty (cell !== 0), it sets the input value, adds a CSS class 
  of "pre-filled", and disables the input field so that it cannot be edited. It then 
  adds the input element to the Sudoku grid in the DOM. */


    grid.forEach((row, rowIndex) => {  
        row.forEach((cell, cellIndex) => {  
            const input = document.createElement("input");  
            input.type = "text";  
            input.maxLength = "1";  

            if (cell !== 0) {  
                input.value = cell;  
                input.classList.add("pre-filled");  
                input.disabled = true;  
            }

            sudokuGrid.appendChild(input);  
        });
    });

    document.getElementById("save-score-button").style.display = "none";  
}


/* The checkSolution function checks whether the solution entered by the
 user into the Sudoku grid is correct, changes the background colors of the cells
  depending on whether they are correct or incorrect, and displays appropriate
   messages and actions based on the result of the check.*/

function checkSolution() {
    const sudokuGrid = document.getElementById("sudoku-grid"); 
    const inputs = sudokuGrid.querySelectorAll("input"); 
    let correct = true; 

    inputs.forEach((input, index) => { 
        const row = Math.floor(index / 9); 
        const col = index % 9; 

        if (input.value != solution[row][col]) {
            input.style.backgroundColor = "#ffdddd"; 
            correct = false; 
        } else {
            input.style.backgroundColor = "#ddffdd"; 
        }
    });

    /* In this code block If all cells are correct, it stops the timer, displays a
     congratulatory message, and displays the save score button. In addition,
      true or false conditionals will be displayed with alerts according to their constraints.*/
    
      if (correct) {
        clearInterval(control); 
        alert("Congratulations! You have solved the Sudoku."); 
        document.getElementById("save-score-button").style.display = "block"; 
    } else {
        alert("It seems you haven't solved the puzzle yet. Keep trying! :)"); 
    }
}


/* The generateSudoku function creates a complete and valid Sudoku grid, 
removes a specified number of cells to create a puzzle, and then returns the resulting grid.*/
function generateSudoku() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0)); 
    fillBoard(board); 
    removeCells(board, 40); 
    return board; 
}


/*The fillBoard function attempts to fill a Sudoku grid recursively using backtracking.
 It searches for empty cells, attempts to fill them with numbers from 1 to 9 in random order,
 and checks whether the move is valid. If it finds a complete solution, it returns true; otherwise,
 it undoes the last move and continues searching.*/

function fillBoard(board) {
    const emptyCells = findEmptyCells(board); 
    if (emptyCells.length === 0) return true; 

    const [row, col] = emptyCells[0]; 
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); 

    for (let num of numbers) { 
        if (isValidMove(board, row, col, num)) { 
            board[row][col] = num; 
            if (fillBoard(board)) return true; 
            board[row][col] = 0; 
        }
    }

    return false;
}


/* The solveSudoku function attempts to solve a Sudoku grid recursively using backtracking.
 It searches for empty cells, attempts to fill them with numbers from 1 to 9, and checks
  whether the move is valid. If it finds a complete solution, it returns the solved grid; 
  otherwise, it undoes the last move and continues searching.*/

function solveSudoku(board) {
    const emptyCells = findEmptyCells(board); 
    if (emptyCells.length === 0) return board; 

    const [row, col] = emptyCells[0]; 

    for (let num = 1; num <= 9; num++) { 
        if (isValidMove(board, row, col, num)) { 
            board[row][col] = num; 
            if (solveSudoku(board)) return board; 
            board[row][col] = 0; 
        }
    }

    return false; 
}

/*The findEmptyCells function finds all empty cells (cells with value 0) 
in a Sudoku grid and returns a list of these cells. */

function findEmptyCells(board) {
    const emptyCells = [];  
    for (let row = 0; row < 9; row++) {  
        for (let col = 0; col < 9; col++) {  
            if (board[row][col] === 0) emptyCells.push([row, col]);  
        }
    }
    return emptyCells;  
}

/*The isValidMove function checks whether a number can be placed in a
 specific position in a Sudoku grid without violating the rules of Sudoku.*/

function isValidMove(board, row, col, num) {
    for (let c = 0; c < 9; c++) {  
        if (board[row][c] === num) return false;  
    }

    for (let r = 0; r < 9; r++) {  
        if (board[r][col] === num) return false;  
    }
  //This code block indicates the 3x3 subgrid to which the position (row, col) 
  //being iterated belongs.
    const startRow = Math.floor(row / 3) * 3;  
    const startCol = Math.floor(col / 3) * 3;  
    for (let r = startRow; r < startRow + 3; r++) {  
        for (let c = startCol; c < startCol + 3; c++) {  
            if (board[r][c] === num) return false;  
        }
    }

    return true;  
}

/*The removeCells function removes a specific number of cells from the Sudoku grid,
 replacing them with zeros to create the puzzle that the user will solve. */
function removeCells(board, count) {
    while (count > selectedOption()) { 
        const row = Math.floor(Math.random() * 9); 
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) { 
            board[row][col] = 0; 
            count--; 
        }
    }
}


//The shuffleArray function randomly shuffles the elements of an array using the algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array; 
}


function resetGame() {
    resetTime(); // Reset time values
    document.getElementById("sudoku-grid").innerHTML = '';
    document.getElementById("inicio").disabled = false;
    document.getElementById("reinicio").disabled = true;
    document.getElementById("save-score-button").style.display = "none";// Hide the save score button when restarting the game
}


