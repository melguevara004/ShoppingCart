// Función para cargar y mostrar los productos del carrito desde localStorage
function cargarProductosDesdeLocalStorage() {
    const listaCarritoPage = document.getElementById('lista-carrito');
    listaCarritoPage.addEventListener('click', eliminarElemento);
    let precioTotal = 0;

    // Limpiar la tabla eliminando las filas existentes
    while (listaCarritoPage.firstChild) {
        listaCarritoPage.removeChild(listaCarritoPage.firstChild);
    }

    // Obtener productos almacenados en localStorage
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

    // Mostrar los productos en la tabla
    productosEnCarrito.forEach(producto => {
        const row = document.createElement('tr');
        const subtotal = producto.precio * producto.cantidad;

        row.innerHTML = `
        <td><input type="number" class="cantidad-editable" value="${producto.cantidad}" data-id="${producto.id}"></td>
            <td>
                <img src="${producto.imagen}" width="100" alt="Imagen del producto">
            </td>
            <td>${producto.titulo}</td>
            <td>Q${subtotal}</td>
            <td>
                <a href="#" class="borrar" data-id="${producto.id}">X </a>
            </td>
        `;
        listaCarritoPage.appendChild(row);
        precioTotal += subtotal;
    });

    // Agregar listener de eventos para editar cantidad
    listaCarritoPage.addEventListener('change', editarCantidad);

    // Actualiza el elemento de total en el carrito
    const totalElemento = document.getElementById("total-carrito");
    totalElemento.textContent = `Total: Q${precioTotal.toFixed(2)}`;
}



// Cargar los productos del carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductosDesdeLocalStorage);


function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elementoId = e.target.getAttribute('data-id');
        const productosEnCarrito = obtenerProductosEnCarritoDesdeLocalStorage();
        const productoIndex = productosEnCarrito.findIndex(producto => producto.id === elementoId);

        if (productoIndex !== -1) {
            productosEnCarrito.splice(productoIndex, 1);
            guardarProductosEnLocalStorage(productosEnCarrito);
            cargarProductosDesdeLocalStorage();
        }
    }
}

function obtenerProductosEnCarritoDesdeLocalStorage() {
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    return productosEnCarrito;
}

function guardarProductosEnLocalStorage(productosEnCarrito) {
    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
}


function editarCantidad(e) {
    if (e.target.classList.contains('cantidad-editable')) {
        const nuevaCantidad = parseInt(e.target.value);
        const elementoId = e.target.getAttribute('data-id');
        const productosEnCarrito = obtenerProductosEnCarritoDesdeLocalStorage();
        const productoExistente = productosEnCarrito.find(producto => producto.id === elementoId);

        if (productoExistente && nuevaCantidad > 0) {
            productoExistente.cantidad = nuevaCantidad;
            guardarProductosEnLocalStorage(productosEnCarrito);
            cargarProductosDesdeLocalStorage(); // Vuelve a cargar los productos actualizados
        } else {
            e.target.value = productoExistente.cantidad; // Restaura la cantidad original si la nueva es inválida
        }
    }
}


// Función para realizar la compra
function comprar() {
    // Eliminar contenido del LocalStorage
    localStorage.clear();
    alert("¡Compra confirmada exitosamente!");
}

const comprarButton = document.getElementById("comprarButton");
comprarButton.addEventListener("click", comprar);