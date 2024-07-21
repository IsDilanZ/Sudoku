let solution, originalGrid;

var segundos = 0;
var minutos = 0;
var horas = 0;
var control; // Variable para almacenar el intervalo del cronómetro

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("save-score-button").style.display = "none"; // Ocultar el botón de guardar puntaje al cargar la página
    newGame(); // Llama a la función newGame cuando el contenido del documento se ha cargado completamente
});

function newGame() {
    if (control) {
        clearInterval(control); // Detener el cronómetro existente si hay uno
    }
    resetTime(); // Reiniciar los valores de tiempo
    control = setInterval(cronometro, 1000); // Intervalo cada segundo (1000 milisegundos)
    document.getElementById("inicio").disabled = false;
    document.getElementById("reinicio").disabled = false;

    const sudokuGrid = document.getElementById("sudoku-grid"); // Obtiene el elemento del DOM con el id "sudoku-grid"
    sudokuGrid.innerHTML = ''; // Limpia el contenido existente del grid

    const grid = generateSudoku(); // Genera un nuevo Sudoku y lo almacena en la variable grid
    originalGrid = grid.map(row => row.slice()); // Copia el grid original para poder comparar más tarde
    solution = solveSudoku(grid.map(row => row.slice())); // Resuelve el Sudoku generado y almacena la solución

    grid.forEach((row, rowIndex) => { // Itera sobre cada fila del grid
        row.forEach((cell, cellIndex) => { // Itera sobre cada celda de la fila
            const input = document.createElement("input"); // Crea un nuevo elemento input
            input.type = "text"; // Establece el tipo del input como texto
            input.maxLength = "1"; // Establece la longitud máxima del input a 1 carácter

            if (cell !== 0) { // Si la celda no está vacía
                input.value = cell; // Establece el valor del input con el valor de la celda
                input.classList.add("pre-filled"); // Añade la clase "pre-filled" al input
                input.disabled = true; // Deshabilita el input para que no se pueda editar
            }

            sudokuGrid.appendChild(input); // Añade el input al grid de Sudoku en el DOM
        });
    });

    document.getElementById("save-score-button").style.display = "none"; // Ocultar el botón de guardar puntaje al iniciar un nuevo juego
}

function checkSolution() {
    const sudokuGrid = document.getElementById("sudoku-grid"); // Obtiene el elemento del DOM con el id "sudoku-grid"
    const inputs = sudokuGrid.querySelectorAll("input"); // Obtiene todos los elementos input dentro del grid
    let correct = true; // Inicializa una variable para rastrear si la solución es correcta

    inputs.forEach((input, index) => { // Itera sobre cada input en el grid
        const row = Math.floor(index / 9); // Calcula la fila del input actual
        const col = index % 9; // Calcula la columna del input actual

        if (input.value != solution[row][col]) { // Compara el valor del input con la solución
            input.style.backgroundColor = "#ffdddd"; // Si el valor es incorrecto, cambia el fondo del input a rojo claro
            correct = false; // Marca la solución como incorrecta
        } else {
            input.style.backgroundColor = "#ddffdd"; // Si el valor es correcto, cambia el fondo del input a verde claro
        }
    });

    if (correct) { // Si todos los valores son correctos
        clearInterval(control); // Detener el cronómetro
        alert("¡Felicidades! Has resuelto el Sudoku."); // Muestra una alerta de felicitación
        document.getElementById("save-score-button").style.display = "block"; // Muestra el botón de guardar puntaje
    } else {
        alert("Hay errores en tu solución. Por favor, inténtalo de nuevo."); // Muestra una alerta indicando que hay errores
    }
}

function resetTime() {
    segundos = 0;
    minutos = 0;
    horas = 0;
    document.getElementById("Horas").innerText = "00";
    document.getElementById("Minutos").innerText = ":00";
    document.getElementById("Segundos").innerText = ":00";
}

function generateSudoku() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0)); // Crea una cuadrícula de 9x9 rellena de ceros
    fillBoard(board); // Llama a la función para llenar la cuadrícula con un Sudoku válido
    removeCells(board, 40); // Llama a la función para eliminar 40 celdas de la cuadrícula
    return board; // Devuelve la cuadrícula generada
}

function fillBoard(board) {
    const emptyCells = findEmptyCells(board); // Encuentra todas las celdas vacías en la cuadrícula
    if (emptyCells.length === 0) return true; // Si no hay celdas vacías, la cuadrícula está completa y válida

    const [row, col] = emptyCells[0]; // Toma la primera celda vacía encontrada
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Baraja los números del 1 al 9

    for (let num of numbers) { // Itera sobre cada número barajado
        if (isValidMove(board, row, col, num)) { // Verifica si el número se puede colocar en la celda
            board[row][col] = num; // Coloca el número en la celda
            if (fillBoard(board)) return true; // Llama recursivamente para llenar la siguiente celda
            board[row][col] = 0; // Si no se puede completar, vacía la celda y prueba con el siguiente número
        }
    }

    return false; // Si no se puede colocar ningún número válido, devuelve false
}

function solveSudoku(board) {
    const emptyCells = findEmptyCells(board); // Encuentra todas las celdas vacías en la cuadrícula
    if (emptyCells.length === 0) return board; // Si no hay celdas vacías, la cuadrícula está resuelta y se devuelve

    const [row, col] = emptyCells[0]; // Toma la primera celda vacía encontrada

    for (let num = 1; num <= 9; num++) { // Itera sobre los números del 1 al 9
        if (isValidMove(board, row, col, num)) { // Verifica si el número se puede colocar en la celda
            board[row][col] = num; // Coloca el número en la celda
            if (solveSudoku(board)) return board; // Llama recursivamente para resolver la siguiente celda, si se resuelve, devuelve la cuadrícula
            board[row][col] = 0; // Si no se puede resolver, vacía la celda y prueba con el siguiente número
        }
    }

    return false; // Si no se puede colocar ningún número válido, devuelve false indicando que no se puede resolver desde esta configuración
}

function findEmptyCells(board) {
    const emptyCells = []; // Crea un array vacío para almacenar las celdas vacías
    for (let row = 0; row < 9; row++) { // Itera sobre cada fila del tablero
        for (let col = 0; col < 9; col++) { // Itera sobre cada columna del tablero
            if (board[row][col] === 0) emptyCells.push([row, col]); // Si la celda está vacía (es 0), añade sus coordenadas al array
        }
    }
    return emptyCells; // Devuelve el array con las celdas vacías
}

function isValidMove(board, row, col, num) {
    for (let c = 0; c < 9; c++) { // Itera sobre cada columna de la fila
        if (board[row][c] === num) return false; // Si el número ya está en la fila, devuelve false
    }

    for (let r = 0; r < 9; r++) { // Itera sobre cada fila de la columna
        if (board[r][col] === num) return false; // Si el número ya está en la columna, devuelve false
    }

    const startRow = Math.floor(row / 3) * 3; // Calcula el inicio de la subcuadrícula 3x3
    const startCol = Math.floor(col / 3) * 3; // Calcula el inicio de la subcuadrícula 3x3
    for (let r = startRow; r < startRow + 3; r++) { // Itera sobre las filas de la subcuadrícula
        for (let c = startCol; c < startCol + 3; c++) { // Itera sobre las columnas de la subcuadrícula
            if (board[r][c] === num) return false; // Si el número ya está en la subcuadrícula, devuelve false
        }
    }

    return true; // Si no hay conflictos, devuelve true
}

function selectionOption(){
    switch (getSelectionOption()){
        case 'veryEasy':
            difficultySelected = difficulty.veryeasy;
            break;
        case 'easy':
            difficultySelected = difficulty.easy;
            break;   
        case 'hard':
            difficultySelected = difficulty.hard;
            break; 
        case 'expert':
            difficultySelected = difficulty.expert;
            break;
        case 'insane':
            difficultySelected = difficulty.insane;
            break;
        case 'hiHuman':
            difficultySelected = difficulty.hiHuman;
            break;
        default:
            difficultySelected = difficulty.medium;                              
    }
    return difficultySelected;
}

function removeCells(board, count) {
    while (count > selectionOption()) { // Mientras queden celdas por eliminar
        const row = Math.floor(Math.random() * 9); // Genera una fila aleatoria
        const col = Math.floor(Math.random() * 9); // Genera una columna aleatoria

        if (board[row][col] !== 0) { // Si la celda no está vacía
            board[row][col] = 0; // Vacía la celda
            count--; // Decrementa el contador de celdas por eliminar
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { // Itera desde el final del array hasta el principio
        const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos en los índices i y j
    }
    return array; // Devuelve el array barajado
}

function saveScoreAndReset() {
    const difficultySelected = selectionOption(); // Obtener la dificultad seleccionada
    const name = prompt("Introduce tu nombre para guardar el puntaje:"); // Solicita el nombre del jugador
    saveScore(name, getTime(), difficultySelected); // Guarda el puntaje con el tiempo transcurrido y la dificultad
    document.getElementById("save-score-button").style.display = "none"; // Oculta el botón después de guardar el puntaje
    resetGame(); // Reinicia el juego o realiza cualquier otra acción necesaria
}

function getTime() {
    return horas + ":" + minutos + ":" + segundos; // Devuelve el tiempo en formato HH:MM:SS
}

function saveScore(name, time, difficulty) {
    const scoresTable = document.getElementById("scores-table").querySelector("tbody");
    const newRow = scoresTable.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = time;
    newRow.insertCell(2).innerText = difficulty;
}

function resetGame() {
    resetTime(); // Reiniciar los valores de tiempo
    document.getElementById("sudoku-grid").innerHTML = '';
    document.getElementById("inicio").disabled = false;
    document.getElementById("reinicio").disabled = true;
    document.getElementById("save-score-button").style.display = "none"; // Ocultar el botón de guardar puntaje al reiniciar el juego
}

function cronometro() {
    segundos++;

    if (segundos < 10) {
        document.getElementById("Segundos").innerHTML = ":0" + segundos;
    } else {
        document.getElementById("Segundos").innerHTML = ":" + segundos;
    }

    if (segundos == 60) {
        segundos = 0;
        minutos++;

        if (minutos < 10) {
            document.getElementById("Minutos").innerHTML = ":0" + minutos;
        } else {
            document.getElementById("Minutos").innerHTML = ":" + minutos;
        }

        if (minutos == 60) {
            minutos = 0;
            horas++;

            if (horas < 10) {
                document.getElementById("Horas").innerHTML = "0" + horas;
            } else {
                document.getElementById("Horas").innerHTML = horas;
            }
        }
    }
}