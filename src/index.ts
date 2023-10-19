import express from 'express';
import { userRoutes } from './rotas/RotasUsuario';
import { technologyRoutes } from './rotas/RotasTecnologia';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/technologies', technologyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
