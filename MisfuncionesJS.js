/**
 * @method actualizar
 * @description Actualiza el precio total y consumo de productos seleccionados, y verifica la capacidad de una fuente de alimentación.
 */
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

/**
 * @method animacion
 * @description Realiza una animación de incremento en un canvas, mostrando el precio total animado.
 * @param {number} preciototal - El precio total a animar.
 */
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

/**
 * @method calcularCuelloDeBotella
 * @description Calcula el cuello de botella entre CPU y GPU dado su puntaje y resolución.
 * @param {number} GPU - Puntaje de la GPU.
 * @param {number} CPU - Puntaje de la CPU.
 * @param {number} RESOLUCION - Resolución utilizada para ajuste del puntaje.
 * @returns {Object} Objeto con información sobre el cuello de botella.
 */
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

/**
 * @method Boton
 * @description Calcula y muestra el cuello de botella principal entre CPU y GPU según los valores ingresados.
 */
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

/**
 * @method agregarCarrito
 * @description Agrega un producto al carrito de compras y guarda en localStorage.
 * @param {HTMLElement} elemento - Elemento HTML que representa el producto a agregar.
 */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarCarrito(elemento) {
    const producto = elemento.parentElement;
    const id = producto.getAttribute('data-id');
    const nombre = producto.getAttribute('data-nombre');
    const precio = parseFloat(producto.getAttribute('data-precio'));

    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({id, nombre, precio, cantidad: 1});
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${nombre} se agregó al carrito correctamente`);
}

/**
 * @method mostrar
 * @description Muestra los productos actuales en el carrito y calcula el total.
 */
const mostrar = () => {
    const carritodiv = document.getElementsByClassName("carrito")[0];
    let total = 0;
    let html = '';

    if (carrito.length === 0) {
        carritodiv.innerHTML = `<p>El Carrito está Vacío</p>`;
    } else {
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            html += `<div class="producto"><span>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}</span></div>`;
            total += subtotal;
        });
        carritodiv.innerHTML = html;
    }

    document.getElementById('total').textContent = total.toFixed(2);
};

/**
 * @method deshacerCompra
 * @description Vacía el carrito de compras y elimina los datos de localStorage.
 */
const deshacerCompra = () => {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrar();
    alert("Se ha vaciado el carrito.");
};

/**
 * @method comprado
 * @description Marca los productos como comprados, vaciando el carrito y eliminando los datos de localStorage.
 */
const comprado = () => {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrar();
    alert("Los productos se compraron correctamente.");
};

