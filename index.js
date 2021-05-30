const express = require('express');

const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use(usersRoute);
app.use(loginRoute);
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
