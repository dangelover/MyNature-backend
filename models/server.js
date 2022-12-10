const express = require("express");
const cors = require("cors");
class Server {
  //en el constructor de js vamos a colocar todas nuestra propiedades
  constructor() {
    //creamos una instancia de express, cuando se lance se creara como una propiedad del constructor
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    //Middlewares
    this.middleware();

    //Rutas
    this.routes();
  }
  middleware() {
    // CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static("public"));
  }
  //creamos un metodo para las rutas
  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}
module.exports = Server;
