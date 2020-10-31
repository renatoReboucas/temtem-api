const express = require("express");
const routes = require("./routes");
const cors = require("cors");
// const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(express.json());

app.use((error, req, res, next) => {
  const erro = new Error('Not found')
  erro.status = 404;
  next(erro);
});

//pega os erros
app.use((error, req, res, next) =>{
  res.status(error.status || 500)
  res.json({error: error.message})
})

const port = 3333;

// disponibiliza as rotas no arquivo base
routes(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
