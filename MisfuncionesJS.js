const actualizar = () => {
    const seleccionar = document.getElementsByClassName('select');
    const preciototal = document.getElementById('total');
    const consumototal = document.getElementById('consumo');

    let total = 0;
    let consumo = 0;
    let fuente = 0;

    for (let i = 0; i < seleccionar.length; i++) {
        const select = seleccionar[i];
        const opcion = select.options[select.selectedIndex];

        if (opcion) {
            total += parseFloat(opcion.getAttribute('data-precio')) || 0;
            consumo += parseFloat(opcion.getAttribute('data-consumo')) || 0;

            if (select.id === 'fuentedealimentacion') {
                fuente = parseFloat(opcion.getAttribute('data-capacidad')) || 0;
            }
        }
    }

    if (preciototal) preciototal.textContent = total.toFixed(2);
    if (consumototal) consumototal.textContent = consumo.toFixed(2);

    if (fuente > 0 && fuente < consumo) {
        alert('La fuente ingresada no es suficiente para la selección deseada');
    }

    animacion(total);
};

const animacion = (preciototal) => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#fff";

    let precio = 0;
    let increment = preciototal / 100;

    const Animado = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(precio.toFixed(2), 50, 100);

        if (precio < preciototal) {
            precio += increment;
            requestAnimationFrame(Animado);
        }
    };

    Animado(preciototal);
};
const calcularCuelloDeBotella = (GPU, CPU, RESOLUCION) => {
    const MediaDeseada = 25;
    const puntajeCPU = CPU / RESOLUCION;
    const puntajeGPU = GPU;
    const dif = Math.abs(puntajeCPU - puntajeGPU);
    const media = (puntajeCPU + puntajeGPU) / 2;
    const diferencia = (dif / media) * 100;

    let cuelloDeBotella;
    if (diferencia > MediaDeseada) {
        cuelloDeBotella = puntajeCPU < puntajeGPU ? "CPU" : "GPU";
    } else {
        cuelloDeBotella = "Media Correcta";
    }

    return {
        cuelloDeBotella,
        CPU: puntajeCPU.toFixed(2),
        GPU: puntajeGPU.toFixed(2),
        diferencia: diferencia.toFixed(2),
    };
};

const Boton = () => {
    const CPU = parseFloat(document.getElementById("procesador").value) || 0;
    const GPU = parseFloat(document.getElementById("placa").value) || 0;
    const RESOLUCION = parseFloat(document.getElementById("resolution").value) || 1;

    const result = calcularCuelloDeBotella(GPU, CPU, RESOLUCION);

    document.getElementById("result").innerHTML = `
                <p>Cuello de botella principal: ${result.cuelloDeBotella}</p>
                <p>Puntaje ajustado de CPU: ${result.CPU}</p>
                <p>Puntaje ajustado de GPU: ${result.GPU}</p>
                <p>Diferencia porcentual: ${result.diferencia}%</p>
            `;
};

    Boton();
