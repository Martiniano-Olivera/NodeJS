const express = require("express");

const socketIO = require("socket.io");

const http = require("http");

const path = require("path");

const app = express();

//! Instanciamos http

// let enunciado = {
//   "dt": 1523197443,
//   "weather": {
//     "temp": 285.524,
//     "pressure": 1021.39,
//     "humidity": 100,
//     "temp_min": 285.524,
//     "temp_max": 285.524,
//     "sea_level": 1031.04,
//     "grnd_level": 1021.39
//   },
//   "wind": {
//     "speed": 11.58,
//     "deg": 262.5
//   },
//   "clouds": {
//     "all": 0
//   }
// };

// var myJSObject = JSON.parse(enunciado);

// var jsonText = JSON.stringify(myJSObject);


let server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//? IO= esta es la comunicacion del backend a traves del render socket.

let io = socketIO(server);

io.on("connection", client => {
  console.log(`Usuario se conectó.`);

  client.on("disconnect", () => {
    console.log("Usuario desconectado.");
  });

  //! Escuchar al cliente

  client.on("emitMensaje", mensaje => {
    console.log(mensaje);
  });

  client.emit("emitMensaje", {
    usuario: "Martiniano",
    mensaje: "Bienvenido a esta aplicación perreke."
  });
});

server.listen(port, err => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});