var segundos = 0;
var minutos = 0;
var horas = 0;
var control; // Variable para almacenar el intervalo del cronómetro

function resetTime() {
    segundos = 0;
    minutos = 0;
    horas = 0;
    document.getElementById("Horas").innerText = "00";
    document.getElementById("Minutos").innerText = ":00";
    document.getElementById("Segundos").innerText = ":00";
}

function getTime() {
    return horas + ":" + minutos + ":" + segundos; // Devuelve el tiempo en formato HH:MM:SS
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