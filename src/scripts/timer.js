// Variable to store the timer interval
var segundos = 0;
var minutos = 0;
var horas = 0;
var control; 

/*The resetTime function: Resets the time counters (seconds, minutes, hours)
 to zero and updates the user interface to reflect this change.*/
function resetTime() {
    segundos = 0;
    minutos = 0;
    horas = 0;
    document.getElementById("Horas").innerText = "00";
    document.getElementById("Minutos").innerText = ":00";
    document.getElementById("Segundos").innerText = ":00";
}

/*The getTime function: Returns the current stopwatch
 time in hours:minutes:seconds format. */
function getTime() {
    return horas + ":" + minutos + ":" + segundos;  
}

/*The stopwatch function: Increments the stopwatch time in
 one-second intervals, updates the user interface to show elapsed time,
  and handles switching from seconds to minutes and from minutes to hours.*/
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