document.addEventListener('DOMContentLoaded', function () {
    const seleccion = document.querySelectorAll('.select');
    const precioTotal = document.getElementById('total');
    const consumoTotal = document.getElementById('consumo');
    const calculo = document.getElementById('calcular');

    function Actualizar() {
        let total = 0;
        let consumo = 0;
        let fuente = 0;

        seleccion.forEach(select => {
            const opcion = select.options[select.selectedIndex];
            total += parseFloat(opcion.getAttribute('data-precio')) || 0;
            consumo += parseFloat(opcion.getAttribute('data-consumo')) || 0;
            if (select.id === 'fuentedealimentacion') {
                fuente = parseFloat(opcion.getAttribute('data-capacidad')) || 0;
            }
        });

        consumoTotal.textContent = consumo.toFixed(2);
        precioTotal.textContent = total.toFixed(2);

        if (fuente > 0 && consumo > fuente) {
            alert("La fuente de alimentación seleccionada no es suficiente para el consumo total.");
        }
    }


    if (calculo) {
        calculo.addEventListener('click', Actualizar);
    }

    Actualizar();
});


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(elemento) {
    const producto = elemento.parentElement;
    const id = producto.getAttribute('data-id');
    const precio = producto.getAttribute('data-precio');
    const nombre = producto.getAttribute('data-nombre');
    const item = { id, nombre, precio };
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${nombre} se agregó al carrito`);
    mostrar();
}

document.addEventListener('DOMContentLoaded', () => {
    const carroguardado = localStorage.getItem("carrito");
    if (carroguardado) {
        carrito = JSON.parse(carroguardado);
    }
    mostrar();
});

function mostrar() {
    const carritoDiv = document.querySelector(".carrito");
    carritoDiv.innerHTML = '';
    let total=0
    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `<span>${item.nombre} - $${item.precio}</span>`;
            carritoDiv.appendChild(productoDiv);
            total += parseFloat(item.precio);
        });

    }
    document.getElementById('total').textContent = total.toFixed(3);
}

function deshacerCompra() {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrar();
}

function comprado() {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrar();
    alert("Los productos se compraron correctamente");
}


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



