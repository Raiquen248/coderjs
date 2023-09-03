alert("Bienvenid@ a Invitaciondigital.ar")

const comprarInvitacion = () => {
    let invitacion = "";
    let cantidad = 0;
    let precio = 0;
    let subtotal = 0;
    let seguirComprando = true;

    do {
        invitacion = prompt("Que invitacion queres, boda, quince, infantil?");
        opcion = Number(prompt("Elegi con numero que opcion queres, 1 para Basica, 2 para Plus, 3 Premium"))

        console.log(invitacion);
        console.log(opcion);

        switch (invitacion) {
            case "boda":
                precio = 2000;             
                break;   
            case "quince":
                precio = 1500;             
                break;
            case "infantil":
                precio = 1000;             
                break;            
            default:
                alert("No entendi, ¿invitacion para que tipo de evento?")
                precio = 0;
                opcion = 0;                
        }
        
    
    subtotal += precio * opcion;
    console.log(subtotal);

    seguirComprando = confirm('¿Queres comprar otra?');

    } while (seguirComprando);
}

comprarInvitacion();