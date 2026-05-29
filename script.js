let botones = document.querySelectorAll('.btn')
let turnos = document.querySelector('.turnos')
let jugador1 = []
let jugador2 = []
let pintarCombinacion = []
let contadorGanador = 0
let bandera = false
const combinacionesGanadoras = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
];
let contador = 0

let desabilitarTodo = (bandera) => {
    botones.forEach(boton => {
        if (!boton.classList.contains('reiniciar')) {
            if (bandera) {
                boton.classList.add('bg-danger')
            }
            boton.disabled = true
        }
    })
}

let pintar = (pintarCombinacion) => {
    botones.forEach(boton => {
        if (pintarCombinacion.includes(boton.id)) {
            boton.classList.add('bg-success')
        } else if(!boton.classList.contains('reiniciar')){
            boton.classList.add('bg-danger')
        }
    })
}

let ganador = (jugador, mensaje) => {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        for (let j = 0; j < combinacionesGanadoras[i].length; j++) {
            if (jugador.includes(combinacionesGanadoras[i][j])) {
                contadorGanador++
                pintarCombinacion.push(combinacionesGanadoras[i][j])
            }
        }
        if (contadorGanador == 3) {
            pintar(pintarCombinacion)
            desabilitarTodo()
            turnos.textContent = `El ganador es: ${mensaje}`
        } else {
            contadorGanador = 0
            pintarCombinacion = []
        }
    }
    if (contadorGanador == 0 && contador == 9) {
        turnos.textContent = 'Empate'
        bandera = true
        desabilitarTodo(bandera)
    }
}

botones.forEach(boton => {
    boton.addEventListener('click', (event) => {
        contador++
        if (event.target.classList.contains('reiniciar')) {
            location.reload()
        } else {
            if (contador % 2 == 0) {
                boton.textContent = 'X'
                turnos.textContent = 'Turno del jugador 1 (O)'
                jugador2.push(event.target.id)
                ganador(jugador2, 'Jugador 2')

            } else {
                boton.textContent = 'O'
                turnos.textContent = 'Turno del jugador 2 (X)'
                jugador1.push(event.target.id)
                ganador(jugador1, 'Jugador 1')
            }
            boton.disabled = true
        }
    })
})

