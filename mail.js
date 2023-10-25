// Obtener una referencia al formulario con el id "my-form"
var form = document.getElementById("my-form");

// Función asincrónica que maneja el envío del formulario
async function handleSubmit(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
  var status = document.getElementById("my-form-status"); // Obtener el elemento donde se mostrará el estado
  var data = new FormData(event.target); // Crear un objeto FormData para recopilar los datos del formulario

  // Realizar una solicitud de red utilizando la función fetch
  fetch(event.target.action, {
    method: form.method, // Utilizar el método HTTP especificado en el formulario
    body: data, // Adjuntar los datos del formulario a la solicitud
    headers: {
        'Accept': 'application/json' // Configurar cabeceras para aceptar JSON
    }
  }).then(response => { // Manejar la respuesta de la solicitud
    if (response.ok) { // Si la respuesta es exitosa (código de estado HTTP 2xx)
      status.innerHTML = "Gracias por tu mail! Interesante! lo anotaré en mi maquina de escribir invisible";
      form.reset(); // Restablecer el formulario
    } else { // Si la respuesta no es exitosa
      response.json().then(data => { // Intentar analizar el cuerpo de la respuesta como JSON
        if (Object.hasOwn(data, 'errors')) { // Comprobar si la respuesta contiene un campo 'errors'
          status.innerHTML = data["errors"].map(error => error["message"]).join(", "); // Mostrar mensajes de error
        } else {
          status.innerHTML = "Oops! Hay un problema para enviar el mail"; // Mensaje de error genérico
        }
      });
    }
  }).catch(error => { // Manejar errores de red
    status.innerHTML = "Oops! Hay un problema para enviar el mail"; // Mensaje de error en caso de error de red
  });
}

// Agregar un "event listener" para escuchar el evento de envío del formulario y llamar a la función handleSubmit
form.addEventListener("submit", handleSubmit);