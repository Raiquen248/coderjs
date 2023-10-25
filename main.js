document.addEventListener("DOMContentLoaded", () => {
    // Obtén elementos del DOM por su ID
    const comprarBtn = document.getElementById("comprarBtn");
    const tipoInvitacion = document.getElementById("tipoInvitacion");
    const opcionInvitacion = document.getElementById("opcionInvitacion");
    const tablaInvitacionesBody = document.getElementById("tabla-invitaciones-body");
    const subtotalElement = document.getElementById("subtotal");
    const descuentoElement = document.getElementById("descuento");
    const totalElement = document.getElementById("total");
    const finaBtn = document.getElementById("finalizarBtn");
    const resetBtn = document.getElementById("resetBtn");
  
    // Inicializa variables
    let subtotal = 0;
    let invitacionesCompradas = [];
  
    // Función para calcular un porcentaje de un valor
    function calcularPorcentaje(valor, porcentaje) {
      return (valor * porcentaje) / 100;
    }
  
    // Función para obtener el precio base de una invitación según su tipo
    function obtenerPrecioBase(tipo) {
      switch (tipo) {
        case "BODA":
          return 2000;
        case "QUINCE":
          return 1500;
        case "INFANTIL":
          return 1000;
        default:
          return 0;
      }
    }
  
    // Define una clase para representar una invitación
    class Invitacion {
      constructor(tipo, precioBase, opcion) {
        this.tipo = tipo;
        this.precioBase = precioBase;
        this.opcion = opcion;
        this.precioTotal = this.calcularPrecioTotal();
      }
  
      calcularPrecioTotal() {
        return this.precioBase * this.opcion;
      }
    }
  
    // Agrega un evento de escucha al botón "comprar"
    comprarBtn.addEventListener("click", () => {
      // Obtiene el tipo de invitación y su precio base
      const invitacion = tipoInvitacion.value;
      const precioBase = obtenerPrecioBase(invitacion);
      // Obtiene la opción de la invitación como un número
      const opcion = parseInt(opcionInvitacion.value);
  
      // Crea una nueva instancia de la clase Invitacion
      const invitacionNueva = new Invitacion(invitacion, precioBase, opcion);
  
      // Calcula el costo total de la invitación y actualiza el subtotal
      const costoTotal = invitacionNueva.precioTotal;
      subtotal += costoTotal;
  
      // Crea una fila en la tabla y la agrega al DOM
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${invitacionNueva.tipo}</td>
        <td>$${precioBase}</td>
        <td>${opcion}</td>
        <td>$${costoTotal}</td>
      `;
      tablaInvitacionesBody.appendChild(fila);
  
      // Actualiza el elemento de subtotal en el DOM
      subtotalElement.textContent = `Subtotal: $${subtotal}`;
  
      // Agrega la nueva invitación a la lista de invitaciones compradas
      invitacionesCompradas.push(invitacionNueva);
  
      // Calcula el nuevo total considerando descuentos
      let nuevoTotal = subtotal;
      if (subtotal > 5000) {
        // Calcula el descuento del 20% si el subtotal es mayor a $5000
        const descuento = calcularPorcentaje(subtotal, 20);
        nuevoTotal -= descuento;
        descuentoElement.textContent = `Descuento: -$${descuento}`;
      } else {
        // Si el subtotal no alcanza el umbral de $5000, no hay descuento
        descuentoElement.textContent = "Descuento: $0";
      }
  
      // Actualiza el elemento de total en el DOM
      totalElement.textContent = `Total: $${nuevoTotal}`;
  
      // Guarda los datos de las invitaciones en el almacenamiento local
      guardarInvitacionesEnLocalStorage();
  
      // Muestra un mensaje de éxito con SweetAlert2
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al carrito!',
        showConfirmButton: false,
        timer: 1500
      });
  
      // Actualiza el carrito en el DOM
      actualizarCarritoEnDOM();
    });
  
    // Función para guardar los datos de las invitaciones en el almacenamiento local
    function guardarInvitacionesEnLocalStorage() {
      const datosGuardados = {
        invitaciones: invitacionesCompradas,
        subtotal: subtotal,
        descuento: descuentoElement.textContent,
        total: totalElement.textContent
      };
  
      // Convierte los datos a formato JSON y los guarda en el almacenamiento local
      const datosJSON = JSON.stringify(datosGuardados);
      localStorage.setItem("datos", datosJSON);
    }
  
    // Función para cargar datos desde el almacenamiento local y actualizar el DOM
    function mostrarDatosDesdeLocalStorage() {
      const datosJSON = localStorage.getItem("datos");
  
      if (datosJSON) {
        // Parsea los datos guardados desde JSON
        const datosGuardados = JSON.parse(datosJSON);
  
        // Actualiza variables y elementos en el DOM con los datos guardados
        subtotal = datosGuardados.subtotal;
        descuentoElement.textContent = datosGuardados.descuento;
        totalElement.textContent = datosGuardados.total;
  
        // Borra las filas existentes en la tabla de invitaciones
        while (tablaInvitacionesBody.firstChild) {
          tablaInvitacionesBody.removeChild(tablaInvitacionesBody.firstChild);
        }
  
        // Itera sobre las invitaciones guardadas y las agrega a la tabla
        datosGuardados.invitaciones.forEach((invitacionNueva) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${invitacionNueva.tipo}</td>
            <td>$${invitacionNueva.precioBase}</td>
            <td>${invitacionNueva.opcion}</td>
            <td>$${invitacionNueva.precioTotal}</td>
          `;
          tablaInvitacionesBody.appendChild(fila);
        });
      }
    }
  
    // Llama a la función para mostrar datos desde el almacenamiento local al cargar la página
    mostrarDatosDesdeLocalStorage();
  
    // Agrega un evento de escucha al botón "finalizar"
    finaBtn.addEventListener("click", () => {
      // Muestra una confirmación con SweetAlert2
      let timerInterval;
      Swal.fire({
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: 'rgba(0,0,123,0.4) url("https://sweetalert2.github.io/images/nyan-cat.gif") left top no-repeat',
        title: 'Gracias a IA ya tenemos tus datos bancarios $$',
        html: ' ¡Look at the cat now! <b></b>',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          // Borra las filas de la tabla, reinicia variables y elementos en el DOM
          while (tablaInvitacionesBody.firstChild) {
            tablaInvitacionesBody.removeChild(tablaInvitacionesBody.firstChild);
          }
          subtotal = 0;
          descuentoElement.textContent = "Descuento: $0";
          subtotalElement.textContent = "Subtotal: $0";
          totalElement.textContent = "Total: $0";
          invitacionesCompradas = [];
  
          // Guarda la información actualizada en el almacenamiento local
          guardarInvitacionesEnLocalStorage();
          console.log('I was closed by the timer');
        }
      });
    });
  
    // Agrega un evento de escucha al botón "reset" para reiniciar la compra
    resetBtn.addEventListener("click", () => {
      // Muestra una confirmación con SweetAlert2
      Swal.fire({
        title: '¿Estás Seguro?',
        text: '¿Deseas borrar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Borra las filas de la tabla, reinicia variables y elementos en el DOM
          while (tablaInvitacionesBody.firstChild) {
            tablaInvitacionesBody.removeChild(tablaInvitacionesBody.firstChild);
          }
          subtotal = 0;
          descuentoElement.textContent = 'Descuento: $0';
          subtotalElement.textContent = 'Subtotal: $0';
          totalElement.textContent = 'Total: $0';
          invitacionesCompradas = [];
  
          // Guarda la información actualizada en el almacenamiento local
          guardarInvitacionesEnLocalStorage();
        }
      });
    });
  });
  