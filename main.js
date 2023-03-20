// Datos de los productos
const productos = [
  { id: 1, nombre: "Producto 1", precio: 100 },
  { id: 2, nombre: "Producto 2", precio: 200 },
  { id: 3, nombre: "Producto 3", precio: 300 },
  { id: 4, nombre: "Producto 4", precio: 400 },
  { id: 5, nombre: "Producto 5", precio: 500 },
];

// Variables
const listaProductos = document.querySelector("#lista-productos");
const listaCarrito = document.querySelector("#lista-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let carrito = [];

// Funciones
function mostrarProductos() {
  productos.forEach((producto) => {
    const { id, nombre, precio } = producto;

    // Crear elemento HTML para el producto
    const productoHTML = `
              <li>
                  <span>${nombre}</span>
                  <span>$${precio}</span>
                  <button class="agregar-carrito" data-id="${id}">Agregar al carrito</button>
              </li>
          `;

    listaProductos.innerHTML += productoHTML;
  });
}

function actualizarCarrito() {
  // Limpiar el HTML del carrito
  listaCarrito.innerHTML = "";

  // Iterar sobre el carrito y agregar el HTML de cada producto
  carrito.forEach((producto) => {
    const { id, nombre, precio, cantidad } = producto;

    const productoHTML = `
              <li>
                  <span>${nombre}</span>
                  <span>$${precio}</span>
                  <span>${cantidad}</span>
                  <span>$${precio * cantidad}</span>
                  <button class="eliminar-producto" data-id="${id}">X</button>
              </li>
          `;

    listaCarrito.innerHTML += productoHTML;
  });

  // Actualizar el total del carrito
  actualizarTotal();
}

function agregarProducto(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    // Obtener el ID del producto
    const productoID = Number(e.target.dataset.id);

    // Buscar el producto en el array de productos
    const productoSeleccionado = productos.find(
      (producto) => producto.id === productoID
    );

    // Agregar el producto al carrito
    if (carrito.some((producto) => producto.id === productoID)) {
      // Si el producto ya está en carrito, aumentar la cantidad
      const carritoActualizado = carrito.map((producto) => {
        if (producto.id === productoID) {
          producto.cantidad++;
          return producto;
        } else {
          return producto;
        }
      });
      carrito = [...carritoActualizado];
    } else {
      // Si el producto no está en carrito, agregarlo
      carrito.push({
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        cantidad: 1,
      });
    }
    // Actualizar el HTML del carrito
    actualizarCarrito();

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}

function eliminarProducto(e) {
  if (e.target.classList.contains("eliminar-producto")) {
    // Obtener el ID del producto
    const productoID = Number(e.target.dataset.id);
    // Filtrar el producto del carrito
    const carritoFiltrado = carrito.filter(
      (producto) => producto.id !== productoID
    );
    carrito = [...carritoFiltrado];

    // Actualizar el HTML del carrito
    actualizarCarrito();

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}

function vaciarCarrito() {
  // Vaciar el carrito
  carrito = [];
  // Actualizar el HTML del carrito
  actualizarCarrito();

  // Guardar el carrito vacío en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarTotal() {
  // Calcular el total del carrito
  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  // Actualizar el HTML del total del carrito
  totalCarrito.innerHTML = `$${total}`;
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar los productos en el HTML
  mostrarProductos();
  // Obtener el carrito del localStorage o inicializar un array vacío
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualizar el HTML del carrito
  actualizarCarrito();
});

listaProductos.addEventListener("click", agregarProducto);
listaCarrito.addEventListener("click", eliminarProducto);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
