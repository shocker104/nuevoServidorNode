const http = require("http");
const fs = require("fs");

// GET para obtener el contenido del TXT
// PUIT para modificar el contenido del TXT
// en ambos casos, la URL sera /mensaje
const server = http.createServer(function (req, res) {
  // que no se vaya
  // Declaramos esto acá, ya que vamos a devolver con todos txt
  res.setHeader("Content-type", "text/plain; charset=utf-8");
  if (req.url === "/mensaje" && req.method === "GET") {
    const mensaje = fs.readFileSync("message.txt", "utf8");
    res.statusCode = 200;
    res.end(mensaje);
  } else if (req.url === "/mensaje" && req.method === "POST") {
    const nuevoCont =
      "Por eso en tu total fracaso de vivir, ni el tiro del final te va a salir!";
    fs.writeFileSync("message.txt", nuevoCont, "utf8");
    res.statusCode = 201;
    res.end("El archivo se modificó exitosamente!");
  } else if (req.url === "/imagen" && req.method === "GET") {
    if (fs.existsSync("imageCode.png")) {
      res.setHeader("Content-Type", "image/png");
      const img = fs.readFileSync("imageCode.png");
      res.statusCode = 200;
      res.end(img);
    } else {
      res.statusCode = 404;
      res.end("Imagen no encontrada");
    }
  } else {
    res.statusCode = 404;
    res.end("Pagína no encontrada", "utf8");
  }
});

server.listen(3000, function () {
  console.log("Escuchando en el puerto 3000");
});
