import express from 'express';
import { userRoutes } from './rotas/RotasUsuario';
import { technologyRoutes } from './rotas/RotasTecnologia';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/technologies', technologyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
