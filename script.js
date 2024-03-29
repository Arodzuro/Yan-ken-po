document.addEventListener('DOMContentLoaded', function() {
    let seleccionJugador;

    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            // Remover la clase seleccionada de todas las imágenes
            imagenes.forEach(img => img.classList.remove('seleccionada'));
            // Añadir la clase seleccionada solo a la imagen seleccionada
            imagen.classList.add('seleccionada');
            seleccionJugador = imagen.id;
        });
    });

    function match(eleccionUsuario) {
        const opciones = ["piedra", "papel", "tijera"];
        const eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];

        return [eleccionUsuario, eleccionMaquina];
    }

    function mostrarResultado(resultado) {
        const [eleccionUsuario, eleccionMaquina] = resultado;
        const resultadoDiv = document.getElementById('resultado');

        // Mostrar las imágenes de las selecciones de los jugadores
        resultadoDiv.innerHTML = `
            <img src="./images/${eleccionUsuario}.JPG" class="seleccionada">
            <img src="./images/${eleccionMaquina}.JPG">
        `;

        // Determinar el ganador y mostrarlo en texto
        if (eleccionUsuario === eleccionMaquina) {
            resultadoDiv.innerHTML += "<h2>¡Empate! Una más?</h2>";
        } else if (
            (eleccionMaquina === "piedra" && eleccionUsuario === "tijera") ||
            (eleccionMaquina === "papel" && eleccionUsuario === "piedra") ||
            (eleccionMaquina === "tijera" && eleccionUsuario === "papel")
        ) {
            resultadoDiv.innerHTML += `<h2>¡Perdiste! La máquina sacó ${eleccionMaquina}.</h2>`;
        } else {
            resultadoDiv.innerHTML += `<h2>¡Ganaste! La máquina sacó ${eleccionMaquina}.</h2>`;
        }
    }

    function jugar() {
        if (!seleccionJugador) {
            alert("Por favor selecciona una opción antes de jugar.");
            return;
        }

        const resultado = match(seleccionJugador);
        mostrarResultado(resultado);

        // Restablecer selección después de jugar
        seleccionJugador = null;
        imagenes.forEach(img => img.classList.remove('seleccionada'));
    }

    document.getElementById('button').addEventListener('click', jugar);
});

