
document.addEventListener("DOMContentLoaded", function () {
    const ubicacionElemento = document.getElementById("ubicacion");

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            // Hacer solicitud a la API de Nominatim de OpenStreetMap
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`)
                .then(response => response.json())
                .then(data => {
                    const country = data.address ? data.address.country : "País no encontrado";

                    const ubicacionTexto = `Tu ubicación: ${country}`;
                    ubicacionElemento.textContent = ubicacionTexto;
                })
                .catch(error => {
                    ubicacionElemento.textContent = "Error al obtener información del país.";
                    console.error(error);
                });
        }, function (error) {
            ubicacionElemento.textContent = "No se pudo obtener la ubicación del usuario.";
            console.error(error);
        });
    } else {
        ubicacionElemento.textContent = "La geolocalización no es compatible con este navegador.";
    }

});

/*
// Función para cargar y mostrar los productos del carrito desde localStorage
function cargarProductosDesdeLocalStorage() {
    const listaCarritoPage = document.getElementById('lista-carrito');
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
            <td>${producto.cantidad}</td>
            <td>
                <img src="${producto.imagen}" width="100" alt="Imagen del producto">
            </td>
            <td>${producto.titulo}</td>
            <td>Q${subtotal}</td>
        `;
        listaCarritoPage.appendChild(row);
        precioTotal += subtotal;
    });

}*/


function cargarProductosDesdeLocalStorage() {
    const listaCarritoPage = document.getElementById('lista-carrito');
    let precioTotal = 0;

    // Limpiar la tabla eliminando las filas existentes
    while (listaCarritoPage.firstChild) {
        listaCarritoPage.removeChild(listaCarritoPage.firstChild);
    }

    // Obtener productos almacenados en localStorage
    const productosEnCarrito = obtenerProductosEnCarritoDesdeLocalStorage();
    
    console.log("Contenido del array:", productosEnCarrito);
    console.log(typeof productosEnCarrito)

    // Verificar si productosEnCarrito es un array válido
    if (Array.isArray(productosEnCarrito)) {
        // Mostrar los productos en la tabla
        productosEnCarrito.forEach(producto => {
            const row = document.createElement('tr');
            const subtotal = producto.precio * producto.cantidad;

            row.innerHTML = `
                <td>${producto.cantidad}</td>
                <td>
                    <img src="${producto.imagen}" width="100" alt="Imagen del producto">
                </td>
                <td>${producto.titulo}</td>
                <td>Q${subtotal}</td>
            `;
            listaCarritoPage.appendChild(row);
            precioTotal += subtotal;
        });
        console.log("Contenido del array:", productosEnCarrito);
    } else {
        console.log("Los productos en el carrito no son válidos.");
        console.log("ARRAY:", productosEnCarrito);
    }
}


function obtenerProductosEnCarritoDesdeLocalStorage() {
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    console.log("Productos en carrito desde localS",productosEnCarrito)
    if (productosEnCarrito) {
        try {
            return productosEnCarrito;
        } catch (error) {
            console.error("Error al parsear los datos del carrito:", error);
            return [];
        }
    } else {
        return [];
    }
}



// Cargar los productos del carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductosDesdeLocalStorage);


