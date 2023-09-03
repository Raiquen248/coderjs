alert("Bienvenid@ a Invitaciondigital.ar");

const comprarInvitacion = () => {
    let subtotal = 0;
    let seguirComprando = true;

    while (seguirComprando) {
        let invitacion = prompt("¿Qué tipo de invitación deseas: boda, quince o infantil?");
        let precio = 0;

        switch (invitacion) {
            case "boda":
                precio = 2000;
                console.log("Opción elegida: Boda");
                console.log("Precio Basico: $" + precio);
                break;
            case "quince":
                precio = 1500;
                console.log("Opción elegida: Quince");
                console.log("Precio Basico: $" + precio);
                break;
            case "infantil":
                precio = 1000;
                console.log("Opción elegida: Infantil");
                console.log("Precio Basico: $" + precio);
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

        const costoTotal = precio * opcionElegida;
        subtotal += costoTotal;
        console.log(`Subtotal: $${subtotal}`);

        seguirComprando = confirm('¿Quieres comprar otra invitación?');
    }

    if (subtotal > 5000) {
        const descuento = subtotal * 0.20;
        subtotal -= descuento;
        console.log(`Descuento del 20% aplicado: -$${descuento}`);
    }
    
    alert("El total de tu compra es: $" + subtotal);
};

comprarInvitacion();