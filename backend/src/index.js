const express = require("express");
const routes = require("./routes");
// const bodyParser = require('body-parser')

const app = express();

const port = 3333;

// disponibiliza as rotas no arquivo base
routes(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
