function calcularCuelloDeBotella(GPU, CPU, RESOLUCION) {
    const puntajeCPU = CPU / RESOLUCION;
    const puntajeGPU = GPU;
    const dif = Math.abs(puntajeCPU - puntajeGPU);
    const media = (puntajeCPU + puntajeGPU) / 2;
    const diferencia = (dif / media) * 100;

    let cuelloDeBotella;
    if (diferencia > 25) {
        cuelloDeBotella = puntajeCPU < puntajeGPU ? "CPU" : "GPU";
    } else {
        cuelloDeBotella = "Media Correcta";
    }

    return {
        cuelloDeBotella: cuelloDeBotella,
        CPU: puntajeCPU.toFixed(2),
        GPU: puntajeGPU,
        diferencia: diferencia.toFixed(2),
    };
}

document.getElementById("boton").addEventListener("click", function(event) {
    event.preventDefault();
    const CPU = parseFloat(document.getElementById("procesador").value);
    const GPU = parseFloat(document.getElementById("placa").value);
    const RESOLUCION = parseFloat(document.getElementById("resolution").value);

    const result = calcularCuelloDeBotella(GPU, CPU, RESOLUCION);

    document.getElementById("result").innerHTML = `
        <p>Cuello de botella principal: ${result.cuelloDeBotella}</p>
        <p>Puntaje ajustado de CPU: ${result.CPU}</p>
        <p>Puntaje ajustado de GPU: ${result.GPU}</p>
        <p>Diferencia porcentual: ${result.diferencia}%</p>
    `;
});
