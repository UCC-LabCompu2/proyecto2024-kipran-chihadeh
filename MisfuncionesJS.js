/**
 *@method = Actualizar
 * @param ={number} valor- valor del precio de los componentes
 * @param= {number} valor- valor del consumo de los componentes
 * @return = suma de los precios y consumos seleccionados
 */
const seleccionar = document.getElementsByClassName('select');
const preciototal = document.getElementById('total');
const consumototal = document.getElementById('consumo');

const Actualizar = () => {
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

    document.getElementById("result").textContent = `
        <p>Cuello de botella principal: ${result.cuelloDeBotella}</p>
        <p>Puntaje ajustado de CPU: ${result.CPU}</p>
        <p>Puntaje ajustado de GPU: ${result.GPU}</p>
        <p>Diferencia porcentual: ${result.diferencia}%</p>
    `;
};

Actualizar();
/**
 * Función para agregar un producto al carrito.
 * @param= {number} valor- precio del producto.
 * @param= {string}- nombre del producto.
 * @param={number}- id del producto
 */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarCarrito = (elemento) => {
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
    mostrar();

};
/**
 * Función para mostrar los productos en el carrito.
 */
const mostrar = () => {
    const carritodiv = document.getElementsByClassName("carrito")[0];
    const elementos = document.getElementById('total');

    if (!carritodiv || !elementos) {
        console.error('Elemento .carrito o elementos no encontrado');
        return;
    }

    let total = 0;
    let html = '';

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        html += `<li class="producto"><span>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad} = $${subtotal.toFixed(2)}</span></li>`;
        total += subtotal;
    });
    carritodiv.innerHTML = '<ul>${html}</ul>'
    elementos.textContent = total.toFixed(2);

};
/**
 * Función para vaciar los productos en el carrito.
 */

const deshacerCompra = () => {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrar();
    alert("Se ha vaciado el carrito.");
};
/**
 * Función para completar la compra de los productos.
 */

const comprado = () => {
    localStorage.removeItem('carrito');
    carrito = [];
    mostrar();
    alert("Los productos se compraron correctamente.");
};

mostrar();
