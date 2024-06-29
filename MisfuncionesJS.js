/**
 *@method = Actualizar
 * @param ={number} valor- valor del precio de los componentes
 * @param= {number} valor- valor del consumo de los componentes
 * @return = suma de los precios y consumos seleccionados
 */
const seleccion = document.getElementsByClassName('select');
const preciototal = document.getElementById('total');
const consumototal = document.getElementById('consumo');

const Actualizar = () => {
    let total = 0;
    let consumo = 0;
    let fuente = 0;

    for (let i = 0; i < seleccion.length; i++) {

        const select = seleccion[i];
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
        alert('La fuente ingresada no es suficiente para la seleccion deseada');
    }
};

/**
 *@method = calcularCuelloDeBotella
 * @param ={number} valor- puntaje de rendimiento del CPU
 * @param= {number} valor- puntaje de rendimiento de la GPU
 * @param= {number} valor- tipo de resolucion que se desea
 * @return = diferencia porcentual entre el CPU y GPU, para saber el cuello de botella, y que componente lo genera
 */
const MediaDeseada = 25
const calcularCuelloDeBotella = (GPU, CPU, RESOLUCION) => {
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

const componentes = () => {
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

Actualizar();
