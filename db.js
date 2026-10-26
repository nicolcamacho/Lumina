// BASE DE DATOS LOCAL EN JAVASCRIPT (2 Tablas)


// TABLA 1: Inventario de Productos
const tablaProductos = [
  { id: 1, nombre: 'Sérum Facial Illuminating', precio: 25000 },
  { id: 2, nombre: 'Crema Rejuvenecedora Rose', precio: 32000 },
  { id: 3, nombre: 'Bálsamo Humectante Nude', precio: 15000 }
];


// TABLA 2: Carrito (LocalStorage)
function obtenerTablaCarrito() {
  const data = localStorage.getItem('db_lumina_carrito');
  return data ? JSON.parse(data) : [];
}


function guardarTablaCarrito(carrito) {
  localStorage.setItem('db_lumina_carrito', JSON.stringify(carrito));
  actualizarContadorHeader();
}


// LÓGICA DE NEGOCIO
function agregarAlCarrito(idProducto, nombre, precio) {
  let carrito = obtenerTablaCarrito();
  let item = carrito.find(p => p.id === idProducto);


  if (item) {
    item.cantidad += 1;
    item.subtotal = item.cantidad * item.precio;
  } else {
    carrito.push({
      id: idProducto,
      nombre: nombre,
      precio: precio,
      cantidad: 1,
      subtotal: precio
    });
  }


  guardarTablaCarrito(carrito);
  alert("${nombre} se agregó a tu bolsa.");
}


function mostrarCarrito() {
  const carrito = obtenerTablaCarrito();
  const tablaBody = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');


  if (!tablaBody) return;


  tablaBody.innerHTML = '';
  let total = 0;


  if (carrito.length === 0) {
    tablaBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px; color: #888;">Tu carrito está vacío.</td></tr>';
  } else {
    carrito.forEach(item => {
      total += item.subtotal;
      tablaBody.innerHTML += `
        <tr>
          <td><strong>${item.nombre}</strong></td>
          <td>$${item.precio.toLocaleString()}</td>
          <td>${item.cantidad}</td>
          <td>$${item.subtotal.toLocaleString()}</td>
        </tr>
      `;
    });
  }


  if (totalSpan) {
    totalSpan.textContent = total.toLocaleString();
  }
}


function vaciarCarrito() {
  localStorage.removeItem('db_lumina_carrito');
  mostrarCarrito();
  actualizarContadorHeader();
}


function finalizarCompra() {
  const carrito = obtenerTablaCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra en Lumina ✨! Procesaremos tu pedido de inmediato.");
  vaciarCarrito();
}


function actualizarContadorHeader() {
  const countSpan = document.getElementById('cart-count');
  if (countSpan) {
    const carrito = obtenerTablaCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    countSpan.textContent = totalItems;
  }
}


document.addEventListener('DOMContentLoaded', actualizarContadorHeader);