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
            <button onclick = "AbrirModalEditar('${persona.id}', '${persona.nombre}', '${persona.apellido}', '${persona.correo}')">Editar</button>
            <button onclick = "EliminarPersona(${persona.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

ObtenerRegistros();


//Proceso para agregar registros
const modal = document.getElementById("mdAgregar");//Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar");//Boton abrir
const btnCerrar = document.getElementById("btnCerrarModal"); //Boton cerrar

btnAgregar.addEventListener("click" , ()=> {
    modal.showModal(); //Abre el modal cuando a btnAgregar se le hace clic
} );
btnCerrar.addEventListener("click", ()=>{
    modal.close();//Cerrar modal
});

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//Evita que los datos se envien por defecto

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validación básica
    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return; /*Evita que el código se siga ejecutando*/
    }

    //Llamar a la API para evitar los datos
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre,apellido,correo})
    });

    if(respuesta.ok){
        //Mensaje de confirmación
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();
        //Cerramos el modal(dialog)
        modal.close();

        //Recargar la tabla 
        ObtenerRegistros();
    }

    else{
        alert("No se resgistro nada hey");
    }
});

//Función para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Quieres eliminar el registro?");

    //Validamos si el usuario eligio 'Aceptar'
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method : "DELETE"
        }); //Llamada al endpoint

        //Recargar la tabla para actualizar la vista
        ObtenerRegistros();



    }
}

//Funcionalidad para editar registros
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

//Cerrar el modal 
btnCerrarEditar.addEventListener("click" , ()=> {
    modalEditar.close();//Cerrar modal de editar
} );

function AbrirModalEditar(id, nombre, apellido, correo){
    //Agregamos los valores a los input antes de abrir el modal
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar"). value = apellido;
    document.getElementById("txtEmailEditar").value = correo;


    //Modal se abre después de agregar los valores a los input
    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault();//Evita que el formulario se envie de una
    //Capturamos los valores nuevos del formulario
    const id = document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtEmailEditar").value.trim();

    //Validación de los campos
    if(!id || !nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return; //Evita que el codigo se diga ejecutando
    }

    //Llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method : "PUT", 
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({correo, nombre, apellido})
    });

    if(respuesta.ok){
        alert("Registro actualizado con éxito"); //Confirmación
        modalEditar.close();//Cerramos el modal
        ObtenerRegistros();//Se recarga la tabla
    }
    else{
        alert("Hubo un error al actualizar");
    }
});