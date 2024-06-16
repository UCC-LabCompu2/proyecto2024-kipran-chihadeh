const resolution= {
    "1080p":1.0,
    "1440p":1.5,
    "4k": 2.0
}
function calcularCuellodeBotella(GPU, CPU, RESOLUCION){
    const puntajeCPU= CPU/RESOLUCION;
    const puntajeGPU= GPU;
    const dif= Math.abs (puntajeCPU - puntajeCPU);
    const media= (puntajeCPU- puntajeGPU)/2;
    const diferencia = (dif-media)*100;
    let cuelloDeBotella;
    if (diferencia>25){
        cuelloDeBotella= puntajeGPU< puntajeGPU ? "CPU" : "GPU";
    }else{
        cuelloDeBotella= "Media Correcta";
    }
    let total= (GPU+CPU)/2;
    document.getElementById('total').textContent = total.toFixed(2);
    document.getElementById('componente').textContent = cuelloDeBotella;
    document.getElementById('resultado').style.display = 'block';
}

const form = document.getElementById('cuellodebotella');
form.addEventListener('submit', calcularCuellodeBotella);
