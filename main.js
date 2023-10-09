
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
        console.log(invitacionNueva);
        
        let nuevoTotal = subtotal

        if (subtotal > 5000) {
            const descuento = calcularPorcentaje(subtotal, 20);
            nuevoTotal -= descuento;
            descuentoElement.textContent = `Descuento: -$${descuento}`;
            
        } else {
            descuentoElement.textContent = "Descuento: $0";
        }

        totalElement.textContent = `Total: $${nuevoTotal}`;
        

        guardarInvitacionesEnLocalStorage();
       
        actualizarCarritoEnDOM();
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
    
    function guardarInvitacionesEnLocalStorage() {
       
        const datosGuardados = {
            invitaciones: invitacionesCompradas,
            subtotal: subtotal,
            descuento: descuentoElement.textContent,
            total: totalElement.textContent
        };
    
        
        const datosJSON = JSON.stringify(datosGuardados);
    
        
        localStorage.setItem("datos", datosJSON);
    }


    function mostrarDatosDesdeLocalStorage() {
    
    const datosJSON = localStorage.getItem("datos");

    if (datosJSON) {
       
        const datosGuardados = JSON.parse(datosJSON);

        
        subtotal = datosGuardados.subtotal;
        descuentoElement.textContent = datosGuardados.descuento;
        totalElement.textContent = datosGuardados.total;

        
        while (tablaInvitacionesBody.firstChild) {
            tablaInvitacionesBody.removeChild(tablaInvitacionesBody.firstChild);
        }

        // Itera sobre las invitaciones guardadas y agrega cada invitación a la tabla
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

mostrarDatosDesdeLocalStorage();

    const resetBtn = document.getElementById("resetBtn");

    resetBtn.addEventListener("click", () => {
        while (tablaInvitacionesBody.firstChild) {
            tablaInvitacionesBody.removeChild(tablaInvitacionesBody.firstChild);
        }

        subtotal = 0;
        descuentoElement.textContent = "Descuento: $0";
        subtotalElement.textContent = "Subtotal: $0";
        totalElement.textContent = "Total: $0";

        invitacionesCompradas = [];

        guardarInvitacionesEnLocalStorage();
    });
  
});



