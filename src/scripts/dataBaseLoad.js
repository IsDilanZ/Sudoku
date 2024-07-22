
function saveScoreAndReset() {
    const difficultySelected = selectedOptionAsString(); // Obtener la dificultad seleccionada
  
    Swal.fire({
      title: 'Enter your Name to save your score:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please enter your name`);
          return false;
        }
        return name;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const name = result.value;
        const time = getTime(); // Obtener el tiempo transcurrido
        saveScore(name, time, difficultySelected); // Guarda el puntaje con el tiempo transcurrido y la dificultad
        document.getElementById("save-score-button").style.display = "none"; // Oculta el botón después de guardar el puntaje
        resetGame(); // Reinicia el juego o realiza cualquier otra acción necesaria
      }
    });
  }
  

function saveScore(name, time, difficulty) {
    fetch('http://localhost:3000/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, time, difficulty })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        updateScoresTable(); // Actualiza la tabla de puntajes después de guardar el nuevo puntaje
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateScoresTable() {
    fetch('http://localhost:3000/players')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#scores-table tbody');
            tableBody.innerHTML = ''; // Limpiar la tabla existente
            data.data.forEach(player => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.name}</td>
                    <td>${player.time}</td>
                    <td>${player.difficulty}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}
