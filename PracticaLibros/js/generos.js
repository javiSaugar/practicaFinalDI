const url = "https://biblioteca.guappi.com/";

getGeneros();

function getGeneros(){
    timerGeneros()
fetch(url+"api/generos")
  .then((response) => response.json())
  .then((datos) => {
    console.log(datos);
    document.querySelector("#generos").innerHTML = "";
    datos.forEach(genero => {
        let divGenero = document.createElement("div");
        let divBotones = document.createElement("div");
        divGenero.classList.add("d-flex","justify-content-between","border", "border-white","p-2","rounded")
        let h2Genero = document.createElement("h2");
        h2Genero.innerText = genero.genero;
        divBotones.classList.add("d-flex")
        let btnEditar = document.createElement("a");
        btnEditar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        btnEditar.classList.add("btn","btn-light","m-1");
        btnEditar.setAttribute("data-bs-toggle","modal");
        btnEditar.setAttribute("data-bs-target", "#modalEditarGenero");

        let btnEliminar = document.createElement("a");
        btnEliminar.classList.add("btn","btn-light","m-1");
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></i>'
        btnEliminar.setAttribute("data-bs-toggle","modal");
        btnEliminar.setAttribute("data-bs-target", "#modalEliminarGenero");

        divBotones.append(btnEditar,btnEliminar);
        divGenero.append(h2Genero,divBotones);
        document.querySelector("#generos").append(divGenero);
       btnEditar.addEventListener("click",()=>{
          document.querySelector("#txtGenEdi").value = genero.genero
          
          document.querySelector("#btnEditarGenero").addEventListener("click",()=>{
            let datos  = {
            genero: document.querySelector("#txtGenEdi").value
            }
            putGenero(genero,datos);
            getGeneros();
          })
       })

       btnEliminar.addEventListener("click",()=>{
          document.querySelector("#btnBorrarSi").addEventListener("click",()=>{
            deleteGenero(genero.id);
          })
       })
    });
  })
}

document.querySelector("#btnEnviarGenero").addEventListener("click",()=>{
   let datos = {
            genero: document.querySelector("#txtGenNue").value
        };
    postGenero(datos);
    getGeneros();
})

function postGenero(userData){
  fetch(url + "api/generos", {
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
            console.log("Libro guardado:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
        alert("Genero Creado")
}

function deleteGenero(id){
fetch(url+"api/generos/"+id, 
  { method: "DELETE" }).then((response) => {
    if (!response.ok) {
        throw new Error("Error en la respuesta: " + response.status);
    }
    });
    alert("genero eliminado")
    getGeneros()
}

function putGenero(genero,userData){
  fetch(url + "api/generos/" + genero.id, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData) // datos enviados en JSON
    })
    .then(response => {
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        return response.json(); // Parsea la respuesta como JSON
    })
    .then(data => {
        // Maneja los datos recibidos del servidor
        console.log(data);
    })
    .catch(error => {
        // Maneja cualquier error durante la petición
        console.error('Error:', error);
    });
    alert("Genero modificado")
}

function timerGeneros(){
    let timerInterval;
    Swal.fire({
        theme: "dark",
        title: "Cargando Generos!",
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