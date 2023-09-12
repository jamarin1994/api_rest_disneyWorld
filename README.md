 # Api rest Disney World 

 ## Descripcion del proyecto

Desarrollar una API que permita explorar el universo Disney, facilitando conocer y modificar los
personajes, y entender las películas en las que estos participaron. Además, deberá exponer la
información de manera que cualquier frontend pueda consumirla

 ## Tegnologias usadas

    - NodeJs
    - express
    - Sequelize ORM
    - MySQL
    - JWT

 ## Documentacion

 La api cuenta con documentacion hecha en Swagger ,la misma se puede visualizar corriendo el proyecto y yendo a "/api-doc"


 ## como usar

 lo primero que hay que hacer despues de clonar el proyecto es ejecutar el script "createDb.sql" el cual creara la base de datos y la poblara con datos basicos para poder probar los servicios de la api,luego de creada la db,dentro del proyecto hay que copiar el archivo ".envExample" y cambiar su nombre a ".env" y cambiar los datos de ejemplo por sus datos.

 ## variables .env

    - DB_USER, DB_PASSWORD, DB_HOST ( corresponden a los datos de alojamiento de su base de datos , son necesarios para que el proyecto pueda conectarse)

    - JWT_SECRET ( secreto que se usara para poder verificar los token que emita la api )

    - SENDGRID_KEY, SENDGRID_EMAIL ( variables para poder usar el servicio de sendgrid ,tienen que ser datos vinculados a una cuenta de sengrid )

 ## colecciones

 ### auth

 maneja el registro y autenticacion de usuarios ,cuando se registre un nuevo usuario se enviara un email de bienvenida y cuando 
 se loggean la api emitira un token para poder hacer el resto de peticions, el token tiene una duracion de 3 min.

 ### movies

 maneja todas las acciones relacionadas con las peliculas dentro de la api 

### characters

 maneja todas las acciones relacionadas con los personajes dentro de la api 
