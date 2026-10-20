// Vamos a transformar nuestro servidor, incluyendo Promesas
// Promesas, objetos js que representan valores desconocidos, en funcion de una operación que se lleva a cabo
// las promesas pueden estar en 3 estados: pendiente, resuelta, rechazada
// Metodos que implementan las promesas:
// .then() -> se devuelve un resultado exitoso
// .catch() -> se van a capturar errores y devolver respuesta en consecuencia

const http = require("http");
const fs = require("fs").promises; // necesario agregar el .promises para poder trabajar con promesas en las funciones del file system

const server = http.createServer(function (req, res) {
  if (req.url === "/mensaje" && req.method === "GET") {
    res.setHeader("Conten-Type", "text/plain; charset=UTF-8");
    fs.readFile("message.txt", "utf8")
      .then((data) => {
        res.statusCode = 200;
        res.end(data);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end("Error al leer el archivo");
      }); //solamente se pasan dos parametros para promesas y luego se pasan los metodos
  }
});

server.listen(3000, function () {
  console.log("Escuchando en el puerto 3000");
});
