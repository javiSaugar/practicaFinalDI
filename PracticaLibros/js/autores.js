const url = "https://biblioteca.guappi.com/";
getAutores();

function getAutores(){
    timerAutores()
fetch(url+"api/autores")
  .then((response) => response.json())
  .then((datos) => {
    console.log(datos);
    document.querySelector("#autores").innerHTML ="";
    datos.forEach(autor => {
        let divAutor = document.createElement("div");
        let divBotones = document.createElement("div");
        divAutor.classList.add("d-flex","justify-content-between","border", "border-white","p-2","rounded")
        let h2Autor = document.createElement("h2");
        h2Autor.innerText = autor.nombre;
        divBotones.classList.add("d-flex")
        let btnEditar = document.createElement("a");
        btnEditar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        btnEditar.classList.add("btn","btn-light","m-1")
        btnEditar.setAttribute("data-bs-toggle","modal");
        btnEditar.setAttribute("data-bs-target", "#modalModificarAutor");


        let btnEliminar = document.createElement("a");
        btnEliminar.classList.add("btn","btn-light","m-1");
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></i>'
        btnEliminar.setAttribute("data-bs-toggle","modal");
        btnEliminar.setAttribute("data-bs-target", "#modalEliminarAutor");

        divBotones.append(btnEditar,btnEliminar)
        
        divAutor.append(h2Autor,divBotones);
        document.querySelector("#autores").append(divAutor)
        btnEliminar.addEventListener("click",()=>{
          document.querySelector("#btnBorrarSi").addEventListener("click",()=>{
          deleteAutores(autor.id);
        })
        })

        btnEditar.addEventListener("click",()=>{
          document.querySelector("#txtNomAutMod").value = autor.nombre;
          document.querySelector("#btnEditarAutor").addEventListener("click",()=>{
            let datos = {
            nombre: document.querySelector("#txtNomAutMod").value
            };
            putAutores(autor,datos);
            getAutores();
          })
        })
        
    });
  });
}

document.querySelector("#btnEnviarAutor").addEventListener("click",()=>{
  let datos = {
            nombre: document.querySelector("#txtNomAut").value
        };
        postAutor(datos)
        getAutores()
})

function postAutor(userData){
      fetch(url + "api/autores", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            mensajeExito("Autor Creado");
        })
        .catch(error => {
            console.error("Error:", error);
        });
       
}

function deleteAutores(id){
    fetch(url+"api/autores/"+id, 
    { method: "DELETE" }).then((response) => {
        if (!response.ok) {
            throw new Error("Error en la respuesta: " + response.status);
        }
        console.log("entra")
        mensajeExito("Autor Eliminado");
        });
        
        getAutores()
}

function putAutores(autor,userData){
fetch(url + "api/autores/" + autor.id, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        mensajeExito("Autor modificado")
    })
    .then(data => {
        
        console.log(data);
    })
    .catch(error => {
        
        console.error('Error:', error);
    });
    
}

function timerAutores(){
    let timerInterval;
    Swal.fire({
        theme: "dark",
        title: "Cargando Autores!",
        html: "cerrando en <b></b>.",
        timer: 1200,
        timerProgressBar: true,
        didOpen: () => {
           const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
}

function mensajeExito(mensaje){
    console.log(mensaje)
   Swal.fire({
        position: "top-mid",
        theme:"dark",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}