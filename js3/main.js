document.addEventListener("DOMContentLoaded", () => {
    const comprarBtn = document.getElementById("comprarBtn");
    const tipoInvitacion = document.getElementById("tipoInvitacion");
    const opcionInvitacion = document.getElementById("opcionInvitacion");
    const tablaInvitacionesBody = document.getElementById("tabla-invitaciones-body");
    const subtotalElement = document.getElementById("subtotal");
    const descuentoElement = document.getElementById("descuento");
    const totalElement = document.getElementById("total");
    
    let subtotal = 0;
    let invitacionesCompradas = [];

    comprarBtn.addEventListener("click", () => {
        const invitacion = tipoInvitacion.value;
        const precioBase = obtenerPrecioBase(invitacion);
        const opcion = parseInt(opcionInvitacion.value);

        const invitacionNueva = new Invitacion(invitacion, precioBase, opcion);

        const costoTotal = invitacionNueva.precioTotal;
        subtotal += costoTotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${invitacionNueva.tipo}</td>
            <td>$${precioBase}</td>
            <td>${opcion}</td>
            <td>$${costoTotal}</td>
        `;
        tablaInvitacionesBody.appendChild(fila);

        subtotalElement.textContent = `Subtotal: $${subtotal}`;

        invitacionesCompradas.push(invitacionNueva);

        if (subtotal > 5000) {
            const descuento = calcularPorcentaje(subtotal, 20);
            subtotal -= descuento;
            descuentoElement.textContent = `Descuento: -$${descuento}`;
        } else {
            descuentoElement.textContent = "Descuento: $0";
        }

        totalElement.textContent = `Total: $${subtotal}`;

        guardarInvitacionesEnLocalStorage();

    });

    
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

    function calcularPorcentaje(valor, porcentaje) {
        return (valor * porcentaje) / 100;
    }

    const obtenerPrecioBase = (tipo) => {
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
    };
    const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    while (tablaInvitacionesBody.firstChild) {
        tablaInvitacionesBody.removeChild(tablaInvitacionesBody.firstChild);
    }

    // Restablece el subtotal, descuento y total a 0
    subtotal = 0;
    descuentoElement.textContent = "Descuento: $0";
    subtotalElement.textContent = "Subtotal: $0";
    totalElement.textContent = "Total: $0";

    // Limpia el array de invitaciones compradas
    invitacionesCompradas = [];

    guardarInvitacionesEnLocalStorage();
});



function guardarInvitacionesEnLocalStorage() {
    // Convierte el array en formato JSON
    const invitacionesJSON = JSON.stringify(invitacionesCompradas);
    // Almacena el JSON en el localStorage
    localStorage.setItem("invitaciones", invitacionesJSON);
}
function cargarInvitacionesDesdeLocalStorage() {
    // Obtiene el JSON almacenado en el localStorage
    const invitacionesJSON = localStorage.getItem("invitaciones");
    // Convierte el JSON en un array
    invitacionesCompradas = JSON.parse(invitacionesJSON) || [];
}

});
//Donde va esto?
cargarInvitacionesDesdeLocalStorage();



