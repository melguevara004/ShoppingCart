const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
var totalSum = 0;

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    // Cargar productos del carrito desde localStorage al cargar la página
    document.addEventListener('DOMContentLoaded', cargarProductosDesdeLocalStorage);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: parseFloat(elemento.querySelector('.precio').textContent.replace('Q', '')),
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    console.log("Insertando desde leerDatosElemento",infoElemento)
    insertarCarrito(infoElemento);
}


function drag(event) {
    const productId = event.target.getAttribute('data-id');
    console.log('Arrastrando producto con ID:', productId);
    event.dataTransfer.setData("text", productId);
}

// Función para permitir el soltar en la cesta
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    const productId = event.dataTransfer.getData('text'); // Obtén el ID del producto desde los datos de transferencia
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);

    if (productElement) {
        const productInfo = {
            imagen: productElement.querySelector('img').src,
            titulo: productElement.querySelector('h3').textContent,
            precio: parseFloat(productElement.querySelector('.precio').textContent.replace('Q', '')),
            id: productId
        };

        insertarCarrito(productInfo);
        console.log("Insertando desde drop.",productInfo)
       // guardarProductosEnLocalStorage(productInfo); // Pasar productInfo al guardarProductosEnLocalStorage
    } else {
        console.log("Producto no encontrado.");
    }
}



function insertarCarrito(elemento) {
    const productosEnCarrito = obtenerProductosEnCarritoDesdeLocalStorage();

    // Verificar si el producto ya está en el carrito
    const productoExistente = productosEnCarrito.find(producto => producto.id === elemento.id);

    if (productoExistente) {
        // Si el producto ya existe en el carrito, aumenta su cantidad
        productoExistente.cantidad += 1;
        alert("Producto añadido al carrito!");
    } else {
        // Si el producto no existe en el carrito, agrega una nueva entrada
        elemento.cantidad = 1;
        productosEnCarrito.push(elemento);
        alert("Producto añadido al carrito!");
    }

    guardarProductosEnLocalStorage(productosEnCarrito);
}


document.addEventListener("DOMContentLoaded", () => {
    const cesta = document.getElementById("img-carrito");
    cesta.addEventListener("dragover", allowDrop);
    cesta.addEventListener("drop", drop);
});

/*
function vaciarCarrito() {
    localStorage.removeItem('productosEnCarrito');
    actualizarCarrito();
}*/

function obtenerProductosEnCarritoDesdeLocalStorage() {
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    return productosEnCarrito;
}


function guardarProductosEnLocalStorage(productosEnCarrito) {
    console.log('Guardando en localStorage:', productosEnCarrito);
    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
}


/*function cargarProductosDesdeLocalStorage() {
    //const productosEnCarrito = obtenerProductosEnCarritoDesdeLocalStorage();
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    console.log('Recuperando desde localStorage:', productosEnCarrito);

    productosEnCarrito.forEach(producto => {
        insertarCarrito(producto);
    });
}*/





