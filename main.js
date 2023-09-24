alert("Bienvenid@ a Invitaciondigital.ar");


let subtotal = 0;
let invitacionesCompradas = [];

// Objeto para almacenar información de las invitaciones
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

const comprarInvitacion = () => {
    let seguirComprando = true;

    while (seguirComprando) {
        let invitacion = prompt("¿Qué tipo de invitación deseas: Boda, Quince o Infantil?").toUpperCase();
        let precio = 0;

        switch (invitacion) {
            case "BODA":
                precio = 2000;
                console.log("Opción elegida: Boda");
                console.log("Precio Básico: $" + precio);
                break;
            case "QUINCE":
                precio = 1500;
                console.log("Opción elegida: Quince");
                console.log("Precio Básico: $" + precio);
                break;
            case "INFANTIL":
                precio = 1000;
                console.log("Opción elegida: Infantil");
                console.log("Precio Básico: $" + precio);
                break;
            default:
                alert("No entendí tu elección. Por favor, elige entre boda, quince o infantil.");
                continue;
        }

        let opcion = prompt("Elige una de las siguientes opciones:\n1. Básica\n2. Plus\n3. Premium");
        const opcionElegida = parseInt(opcion);

        switch (opcionElegida) {
            case 1:
                console.log("Has elegido la opción Básica.");
                break;
            case 2:
                console.log("Has elegido la opción Plus.");
                break;
            case 3:
                console.log("Has elegido la opción Premium.");
                break;
            default:
                console.log("Opción no válida. Por favor, elige una opción válida (1, 2 o 3).");
                continue;
        }

        const invitacionNueva = new Invitacion(invitacion, precio, opcionElegida);


        const costoTotal = invitacionNueva.precioTotal;
        subtotal += costoTotal;
        console.log(`Subtotal: $${subtotal}`);
        alert(`Subtotal: $${subtotal}`);

        invitacionesCompradas.push(invitacionNueva);

        seguirComprando = confirm('¿Quieres comprar otra invitación?');
    }

    if (subtotal > 5000) {
        const descuento = calcularPorcentaje(subtotal, 20);
        subtotal -= descuento;
        alert(`Descuento del 20% aplicado: -$${descuento}.`)
        console.log(`Descuento del 20% aplicado: -$${descuento}. Se aplicó un descuento de $${descuento}`);
    }

    const tiposDeInvitaciones = ["BODA", "QUINCE", "INFANTIL"];
    function informarCantidadInvitacionesCompradasPorTipos(tipos) {
        tipos.forEach((tipo) => {
            const invitacionesCompradasTipo = invitacionesCompradas.filter((invitacion) => invitacion.tipo === tipo);
            
            if (invitacionesCompradasTipo.length > 0) {
                const cantidadComprada = invitacionesCompradasTipo.length;
                alert(`Has comprado ${cantidadComprada} invitaciones de tipo ${tipo}.`);
            }
        });
    }
    

    informarCantidadInvitacionesCompradasPorTipos(tiposDeInvitaciones);

    // Muestra el resultado en la consola
    console.log(`El total de tu compra es: $${subtotal}`);
    console.log("Invitaciones compradas:", invitacionesCompradas);
    // Muestra el resultado en una alerta
    alert(`El total de tu compra es: $${subtotal}`);

};

comprarInvitacion();