//Direcciòn del Endpoint generado en Retool
const API_URL = "https://retoolapi.dev/427Q72/integrantes";

//Funcion que llama a la API y realiza una solicitud GET, obtine  un JSON
async function ObtenerRegistros() {
    //Hacemos GET al servidor (API) y obtenemos su respuesta (response)
    const respuesta = await fetch (API_URL);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json();//Esto ya es un JSON lo que necesitabamos para poder crear la tabla

    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);
}


//Función para generar las filas de la tabla
//'Datos' representa al JSON
function MostrarRegistros(datos){
    //Se llama al elemento tbody dentro de la tabla con id 'tabla'
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo html usamos innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.correo}</td>
            <td>
            <button>Editar</button>
            <button>Eliminar</button>
            </td>
        </tr>
        `;
    });
}

ObtenerRegistros();


//Proceso para agregar registros
const modal = docuemnt.getElementById("mdAgregar");//Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar");//Boton abrir
const btnCerrar = docuemnt.getElementById("btnCerrarModal"); //Boton cerrar