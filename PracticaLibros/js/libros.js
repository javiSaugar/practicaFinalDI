const url = "https://biblioteca.guappi.com/";
let contadorPaginas = 1;
getLibrosPaginacion(contadorPaginas);

document.querySelector("#btnNuevoLibro").addEventListener("click",()=>{
    
    fetch(url+"api/autores")
    .then((response) => response.json())
    .then((datos) => {
        datos.forEach(autor => {
            let opcionAutor = document.createElement("option");
            opcionAutor.innerText = autor.nombre;
            opcionAutor.value = autor.id;
            document.querySelector("#autorNuevoLibro").append(opcionAutor);
        });
    });

    fetch(url+"api/generos")
    .then((response) => response.json())
    .then((datos) => {
        datos.forEach(genero => {
            let opcionGenero= document.createElement("option");
            opcionGenero.innerText = genero.genero;
            opcionGenero.value = genero.id
            document.querySelector("#generoNuevoLibro").append(opcionGenero);
        });
    });

    document.querySelector("#btnEnviar").addEventListener("click", () => {
        let titulo = document.querySelector("#tituloNuevoLibro").value
        let descripcion = document.querySelector("#descripcionNuevoLibro").value
        let autor = parseInt(document.querySelector("#autorNuevoLibro").value)
        let genero = parseInt(document.querySelector("#generoNuevoLibro").value);
        let imagenURl = document.querySelector("#imagenLibro").files[0];
        //crear form data
       
        let form = document.querySelector("#formNuevoLibro");
        console.log("form")
        let datos = new FormData(form);

        if(imagenURl == null){
            datos.append("titulo",titulo);
            datos.append("descripcion",descripcion);
            datos.append("autor_id",autor);
            datos.append("genero_id",genero);
        }else{
            datos.append("titulo",titulo);
            datos.append("descripcion",descripcion);
            datos.append("autor_id",autor);
            datos.append("genero_id",genero);
            datos.append("imagen",imagenURl);
        }
        console.log(datos)
        postLibro(datos)
        getLibrosPaginacion(contadorPaginas)
       
    })
})

document.querySelector("#paginaMas").addEventListener("click",()=>{
    contadorPaginas ++;
    fetch(url+"api/libros/pagina/"+contadorPaginas)
  .then((response) => response.json())
  .then((data) => {
    if(data.length != 0){
        getLibrosPaginacion(contadorPaginas)
    }else{
        contadorPaginas --;
    }
  });


})

document.querySelector("#paginaMenos").addEventListener("click",()=>{
    if(contadorPaginas<=1){
        contadorPaginas=1;
    }else{
    contadorPaginas--;
    getLibrosPaginacion(contadorPaginas);
    }
    
})

function getLibrosPaginacion(paginas){
timerLibros();
document.querySelector("#numeroPagina").innerText= paginas;
document.querySelector("#libros").innerHTML ="";
let divLibros = document.createElement("div");
divLibros.classList.add("d-flex","flex-wrap")
document.querySelector("#libros").append(divLibros);

fetch(url+"api/libros/pagina/"+paginas)
  .then((response) => response.json())
  .then((datos) => {
    console.log
    datos.forEach(libro => {
        let divContenedor = document.createElement("div");
        divContenedor.classList.add("p-3","col-4","h-100");

        let divCard = document.createElement("div");
        divCard.classList.add("card");

        let imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top");
        if(libro.imagen == null){
            imgCard.src = "./imagenes/libro-default.png"
        }else{
             imgCard.src =url+ libro.imagen
        }
        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        let h5Card = document.createElement("h5");
        h5Card.classList.add("card-title");

        let divBotones = document.createElement("div");
        let btnInfo = document.createElement("a");
        divBotones.classList.add("d-flex","justify-content-evenly")

        btnInfo.classList.add("btn","btn-dark");
        btnInfo.innerText ="Más info";
        btnInfo.setAttribute("data-bs-toggle","modal")
        btnInfo.setAttribute("data-bs-target", "#modalInfo");

        let btnModificar = document.createElement("a");
        btnModificar.classList.add("btn","btn-dark")
        btnModificar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        btnModificar.setAttribute("data-bs-toggle","modal");
        btnModificar.setAttribute("data-bs-target", "#modalEditarLibro");

        let btnEliminar = document.createElement("a");
        btnEliminar.classList.add("btn","btn-dark");
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></i>'
        btnEliminar.setAttribute("data-bs-toggle","modal");
        btnEliminar.setAttribute("data-bs-target", "#modalEliminarLibro");

        divBotones.append(btnInfo,btnModificar,btnEliminar);

        h5Card.innerText = libro.titulo
        divCardBody.append(h5Card,divBotones);
        divCard.append(imgCard,divCardBody)

        divContenedor.append(divCard);
        divLibros.append(divContenedor);


        btnInfo.addEventListener("click",()=>{
            document.querySelector("#imgInfo").src = url+libro.imagen;
            document.querySelector("#tituloInfo").innerText = libro.titulo;
            document.querySelector("#descripcionInfo").innerText += libro.descripcion;    
            document.querySelector("#autorInfo").innerText = "Autor: "+libro.autor.nombre;   
            document.querySelector("#generoInfo").innerText = "Genero: "+libro.genero.genero;               
        })

        btnEliminar.addEventListener("click",()=>{
            console.log("Eliminar")
            document.querySelector("#btnBorrarSi").addEventListener("click",()=>{
                console.log(libro.id)
                deleteLibro(libro.id);
                getLibrosPaginacion(contadorPaginas)
            })
        })

        btnModificar.addEventListener("click",()=>{
            document.querySelector("#tituloModLibro").value = libro.titulo
            document.querySelector("#descModLibro").value = libro.descripcion
            selectAutores(document.querySelector("#autorModLibro"));
            selectGeneros(document.querySelector("#generoModLibro"))
            imagePreviewMod.src = url+ libro.imagen;
            

            document.querySelector("#btnModEnviar").addEventListener("click",()=>{
                let titulo = document.querySelector("#tituloModLibro").value;
                let descripcion = document.querySelector("#descModLibro").value;
                let autorID = parseInt(document.querySelector("#autorModLibro").value);
                let generoId = parseInt(document.querySelector("#generoModLibro").value);
                let imgUrl = document.querySelector("#imagenLibroMod").files[0];
                let form = document.querySelector("#formModLibro");
                console.log("form")
                let datos = new FormData(form);
                if(imgUrl != null){
                    datos.append("titulo",titulo);
                    datos.append("descripcion",descripcion);
                    datos.append("autor_id",autorID);
                    datos.append("genero_id",generoId);
                    datos.append("imagen",imgUrl);
                }else{
                    datos.append("titulo",titulo);
                    datos.append("descripcion",descripcion);
                    datos.append("autor_id",autorID);
                    datos.append("genero_id",generoId);
                }
                putLibro(libro,datos)
                getLibrosPaginacion(contadorPaginas)
            })
        })
    }); 
    });
}

function getLibros(){
let divLibros = document.createElement("div");
divLibros.classList.add("d-flex","flex-wrap")
document.querySelector("#libros").append(divLibros);
fetch(url+"api/libros")
  .then((response) => response.json())
  .then((datos) => {
    console.log(datos);
    datos.forEach(libro => {
        let divContenedor = document.createElement("div");
        divContenedor.classList.add("p-3","col-3","h-100");

        let divCard = document.createElement("div");
        divCard.classList.add("card");

        let imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top");
        imgCard.src =url+ libro.imagen

        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        let h5Card = document.createElement("h5");
        h5Card.classList.add("card-title");

        let divBotones = document.createElement("div");
        let btnInfo = document.createElement("a");
        divBotones.classList.add("d-flex","justify-content-evenly")

        btnInfo.classList.add("btn","btn-dark");
        btnInfo.innerText ="Más info";
        btnInfo.setAttribute("data-bs-toggle","modal")
        btnInfo.setAttribute("data-bs-target", "#modalInfo");

        let btnModificar = document.createElement("a");
        btnModificar.classList.add("btn","btn-dark")
        btnModificar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        btnModificar.setAttribute("data-bs-toggle","modal");
        btnModificar.setAttribute("data-bs-target", "#modalEditarLibro");

        let btnEliminar = document.createElement("a");
        btnEliminar.classList.add("btn","btn-dark");
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></i>'
        btnEliminar.setAttribute("data-bs-toggle","modal");
        btnEliminar.setAttribute("data-bs-target", "#modalEliminarLibro");

        divBotones.append(btnInfo,btnModificar,btnEliminar);

        h5Card.innerText = libro.titulo
        divCardBody.append(h5Card,divBotones);
        divCard.append(imgCard,divCardBody)

        divContenedor.append(divCard);
        divLibros.append(divContenedor);


        btnInfo.addEventListener("click",()=>{
            document.querySelector("#imgInfo").src = url+libro.imagen;
            document.querySelector("#tituloInfo").innerText = libro.titulo;
            document.querySelector("#descripcionInfo").innerText += libro.descripcion;    
            document.querySelector("#autorInfo").innerText = "Autor: "+libro.autor.nombre;   
            document.querySelector("#generoInfo").innerText = "Genero: "+libro.genero.genero;               
        })

        btnEliminar.addEventListener("click",()=>{
            console.log("Eliminar")
            document.querySelector("#btnBorrarSi").addEventListener("click",()=>{
                console.log(libro.id)
                deleteLibro(libro.id);
                getLibros()
            })
        })

        btnModificar.addEventListener("click",()=>{
            document.querySelector("#tituloModLibro").placeholder = libro.titulo
            document.querySelector("#descModLibro").placeholder = libro.descripcion
            selectAutores(document.querySelector("#autorModLibro"));
            selectGeneros(document.querySelector("#generoModLibro"))
            document.querySelector("#btnModEnviar").addEventListener("click",()=>{
                let datos = {
                    titulo: document.querySelector("#tituloModLibro").value,
                    descripcion: document.querySelector("#descModLibro").value,
                    autor_id: parseInt(document.querySelector("#autorModLibro").value),
                    genero_id: parseInt(document.querySelector("#generoModLibro").value),
                    imagen:null
                };
                putLibro(libro,datos)
                getLibros()
            })
        })
    });
  });
}

function postLibro(userData){
     fetch(url + "api/libros", {
            method: 'POST',
            //meter body: formulario
            //body: JSON.stringify(userData)
            body:userData
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
        getLibrosPaginacion(contadorPaginas);
}

function deleteLibro(id){
    fetch(url+"api/libros/"+id, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
        throw new Error("Error en la respuesta: " + response.status);
    }
    });
    alert("libro eliminado")
    getLibrosPaginacion(contadorPaginas)
}

function putLibro(libro,userData){
  fetch(url + "api/libros/" + libro.id, {
    method: 'PUT',
     body:userData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    getLibrosPaginacion(contadorPaginas)
}

function selectAutores(selectAutores){
    fetch(url+"api/autores")
    .then((response) => response.json())
    .then((datos) => {
        datos.forEach(autor => {
            let opcionAutor = document.createElement("option");
            opcionAutor.innerText = autor.nombre;
            opcionAutor.value = autor.id;
            selectAutores.append(opcionAutor);
        });
    });
}

function selectGeneros(selectGeneros){
     fetch(url+"api/generos")
    .then((response) => response.json())
    .then((datos) => {
        datos.forEach(genero => {
            let opcionGenero= document.createElement("option");
            opcionGenero.innerText = genero.genero;
            opcionGenero.value = genero.id
            selectGeneros.append(opcionGenero);
        });
    });
}

function timerLibros(){
    let timerInterval;
    Swal.fire({
        theme: "dark",
        title: "📚Cargando Libros!",
        html: "cerrando en <b></b>.",
        timer: 2000,
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
        }
    });
}

 document.querySelector("#imagenLibro").addEventListener("change", ()=>{
    const imagePreview = document.getElementById('imagePreview');
    const file = document.querySelector("#imagenLibro").files[0]; 
    if (file) {
            const reader = new FileReader(); 
            reader.addEventListener("load",()=>{ 
                imagePreview.src = reader.result; 
            }) 
            reader.readAsDataURL(file); 
    } else {
        imagePreview.src = "./imagenes/libro-default.png";
    }

});

document.querySelector("#imagenLibroMod").addEventListener("change", ()=>{
    const imagePreview = document.getElementById('imagePreviewMod');
    const file = document.querySelector("#imagenLibroMod").files[0]; 
    if (file) {
            const reader = new FileReader(); 
            reader.addEventListener("load",()=>{ 
                imagePreview.src = reader.result; 
            }) 
            reader.readAsDataURL(file); 
    } else {
        imagePreview.src = "./imagenes/libro-default.png";
    }

});
