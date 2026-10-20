const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.url === "/mensaje" && req.method === "GET") {
    res.setHeader("Conten-Type", "text/plain; charset=UTF-8");
    fs.readFile("message.txt", "utf8", (err, data) => {
      if (err) {
        //esto verifica que error no sea nulo
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("Archivo no econtrado");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer el archivo");
        }
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else if (req.url === "/mensaje" && req.method === "POST") {
    const nuevoCont = "Despiertame! Cuando pase el hervor!!";
    fs.writeFile("message.txt", nuevoCont, "utf8", (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("No se pudo crear/modificar el archivo");
      } else {
        res.statusCode = 201;
        res.end("Archivo creado/modificado exitosamente");
      }
    });
  } else if (req.url === "/imagen" && req.method === "GET") {
    fs.readFile("imageCode.png", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("No se encontro el achivo");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer la imagen");
        }
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else if (req.url === "/imagen" && req.method === "POST") {
    fs.copyFile("imageCode.png", "./copia.png", (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error interno al leer la imagen");
      } else {
        res.statusCode = 201;
        res.end("Imagen copiada con exito");
      }
    });
  } else if (req.url === "/imagen" && req.method === "DELETE") {
    fs.unlink("copia.png", (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("No se encontro el achivo");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer la imagen");
        }
      } else {
        res.statusCode = 200;
        res.end("Imagen borrada con exito");
      }
    });
  }
});

server.listen(0, () => {
  console.log(`Escuchando en el puerto ${server.address().port} `); //lo que sige del $ es un literal de plantilla, que nos permite referenciar variables/obejtos/etc y nos va a devolver su valor
});
