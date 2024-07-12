let solution, originalGrid;

document.addEventListener("DOMContentLoaded", function() {
    newGame();
});


function newGame() {
    const sudokuGrid = document.getElementById("sudoku-grid");
    sudokuGrid.innerHTML = ''; // Clear existing grid
    const grid = generateSudoku();
    originalGrid = grid.map(row => row.slice());
    solution = solveSudoku(grid.map(row => row.slice()));//rebanada slice

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
}

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

    if (correct) {
        stopTimer();
        alert("Congratulations! You've solved the Sudoku.");
        saveScore(secondsElapsed, 'Medium'); // Assuming 'Medium' difficulty for this example
    } else {
        alert("There are errors in your solution. Please try again.");
    }
}
function generateSudoku() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(board);
    removeCells(board, 40);
    return board;
}

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

function findEmptyCells(board) {
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) emptyCells.push([row, col]);
        }
    }
    return emptyCells;
}

function isValidMove(board, row, col, num) {
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === num) return false;
    }

    for (let r = 0; r < 9; r++) {
        if (board[r][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] === num) return false;
        }
    }

    return true;
}

function removeCells(board, count) {
    while (count > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {
            board[row][col] = 0;
            count--;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
