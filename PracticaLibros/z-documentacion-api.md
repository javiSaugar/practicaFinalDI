# Documentación de la API

## Endpoints

### Obtener los 10 ultimos libros añadidos libros
- **URL:** `/api/libros`
- **Método:** `GET`
- **Descripción:** Obtiene una lista con los 10 ultimos libros añadidos.
- **Respuesta exitosa (200):**
  ```json
  [
    {
      "id": 4,
      "titulo": "De amor y de sombra",
      "descripcion": "Otra brillante obra de Isabel Allende",
      "imagen": "wRCzwBxwsKKHRiyyesylfPkmdGGQpYJzVxWZkQUk.png",
      "autor": {
        "id": 2,
        "nombre": "Isabel Allende"
      },
      "genero": {
        "id": 10,
        "genero": "Biografía"
      }
    }
    // ...otros libros...
  ]
  ```

  ### Obtener los libros por pagina
- **URL:** `/api/libros/pagina/{npagina}`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de 10 libros.
- **Parámetros:**
  - `npagina` (requerido): El número de la página que se desea obtener.
- **Respuesta exitosa (200):**
  ```json
  [
    {
      "id": 4,
      "titulo": "De amor y de sombra",
      "descripcion": "Otra brillante obra de Isabel Allende",
      "imagen": "wRCzwBxwsKKHRiyyesylfPkmdGGQpYJzVxWZkQUk.png",
      "autor": {
        "id": 2,
        "nombre": "Isabel Allende"
      },
      "genero": {
        "id": 10,
        "genero": "Biografía"
      }
    }
    // ...otros libros...
  ]
  ```

### Buscar libros por titulo
- **URL:** `/api/libros/search/{titulo}`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de los libros que contengan parte del titulo.
  **Parámetros:**
  - `titulo` (requerido): Parte del titulo del libro.
- **Respuesta exitosa (200):**
  ```json
  [
    {
      "id": 4,
      "titulo": "De amor y de sombra",
      "descripcion": "Otra brillante obra de Isabel  Allende",
      "imagen": "wRCzwBxwsKKHRiyyesylfPkmdGGQpYJzVxWZkQUk.png",
      "autor": {
        "id": 2,
        "nombre": "Isabel Allende"
      },
      "genero": {
        "id": 10,
        "genero": "Biografía"
      }
    }
    // ...otros libros...
  ]
  ```

### Obtener un libro por ID
- **URL:** `/api/libros/{id}`
- **Método:** `GET`
- **Descripción:** Obtiene la información de un libro específico por ID.
- **Parámetros:**
  - `id` (requerido): ID del libro.
- **Respuesta exitosa (200):**
  ```json
  {
    "id": 4,
    "titulo": "De amor y de sombra",
    "descripcion": "Otra brillante obra de Isabel Allende",
    "imagen": "wRCzwBxwsKKHRiyyesylfPkmdGGQpYJzVxWZkQUk.png",
    "autor": {
      "id": 2,
      "nombre": "Isabel Allende"
    },
    "genero": {
      "id": 10,
      "genero": "Biografía"
    }
  }
  ```

### Crear un nuevo libro
- **URL:** `/api/libros`
- **Método:** `POST`
- **Descripción:** Crea un nuevo libro.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "titulo": "Nuevo Libro",
    "descripcion": "Descripción del nuevo libro",
    "autor_id": 2,
    "genero_id": 10,
    "imagen":null
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
    "id": 5,
    "titulo": "Nuevo Libro",
    "descripcion": "Descripción del nuevo libro",
    "imagen": "imagen.png",
    "autor": {
      "id": 2,
      "nombre": "Isabel Allende"
    },
    "genero": {
      "id": 10,
      "genero": "Biografía"
    }
  }
  ```

### Actualizar un libro
- **URL:** `/api/libros/{id}`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de un libro existente.
- **Parámetros:**
  - `id` (requerido): ID del libro.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "titulo": "Libro Actualizado",
    "descripcion": "Descripción actualizada",
    "autor_id": 2,
    "genero_id": 10
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "id": 4,
    "titulo": "Libro Actualizado",
    "descripcion": "Descripción actualizada",
    "imagen": "imagen_actualizada.png",
    "autor": {
      "id": 2,
      "nombre": "Isabel Allende"
    },
    "genero": {
      "id": 10,
      "genero": "Biografía"
    }
  }
  ```

### Eliminar un libro
- **URL:** `/api/libros/{id}`
- **Método:** `DELETE`
- **Descripción:** Elimina un libro por ID.
- **Parámetros:**
  - `id` (requerido): ID del libro.
- **Respuesta exitosa (204):** No hay contenido.

### Obtener todos los géneros
- **URL:** `/api/generos`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los géneros.
- **Respuesta exitosa (200):**
  ```json
  [
    {
      "id": 10,
      "genero": "Biografía"
    }
    // ...otros géneros...
  ]
  ```

### Obtener un género por ID
- **URL:** `/api/generos/{id}`
- **Método:** `GET`
- **Descripción:** Obtiene la información de un género específico por ID.
- **Parámetros:**
  - `id` (requerido): ID del género.
- **Respuesta exitosa (200):**
  ```json
  {
    "id": 10,
    "genero": "Biografía"
  }
  ```

### Crear un nuevo género
- **URL:** `/api/generos`
- **Método:** `POST`
- **Descripción:** Crea un nuevo género.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "genero": "Nuevo Género"
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
    "id": 11,
    "genero": "Nuevo Género"
  }
  ```

### Actualizar un género
- **URL:** `/api/generos/{id}`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de un género existente.
- **Parámetros:**
  - `id` (requerido): ID del género.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "genero": "Género Actualizado"
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "id": 10,
    "genero": "Género Actualizado"
  }
  ```

### Eliminar un género
- **URL:** `/api/generos/{id}`
- **Método:** `DELETE`
- **Descripción:** Elimina un género por ID.
- **Parámetros:**
  - `id` (requerido): ID del género.
- **Respuesta exitosa (204):** No hay contenido.

### Obtener todos los autores
- **URL:** `/api/autores`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los autores.
- **Respuesta exitosa (200):**
  ```json
  [
    {
      "id": 2,
      "nombre": "Isabel Allende"
    }
    // ...otros autores...
  ]
  ```

### Obtener un autor por ID
- **URL:** `/api/autores/{id}`
- **Método:** `GET`
- **Descripción:** Obtiene la información de un autor específico por ID.
- **Parámetros:**
  - `id` (requerido): ID del autor.
- **Respuesta exitosa (200):**
  ```json
  {
    "id": 2,
    "nombre": "Isabel Allende"
  }
  ```

### Crear un nuevo autor
- **URL:** `/api/autores`
- **Método:** `POST`
- **Descripción:** Crea un nuevo autor.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "nombre": "Nuevo Autor"
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
    "id": 3,
    "nombre": "Nuevo Autor"
  }
  ```

### Actualizar un autor
- **URL:** `/api/autores/{id}`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de un autor existente.
- **Parámetros:**
  - `id` (requerido): ID del autor.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "nombre": "Autor Actualizado"
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "id": 2,
    "nombre": "Autor Actualizado"
  }
  ```

### Eliminar un autor
- **URL:** `/api/autores/{id}`
- **Método:** `DELETE`
- **Descripción:** Elimina un autor por ID.
- **Parámetros:**
  - `id` (requerido): ID del autor.
- **Respuesta exitosa (204):** No hay contenido.
