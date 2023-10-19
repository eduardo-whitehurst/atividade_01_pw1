import express, { Router, Request, Response } from 'express';
import { Usuario } from '../modelos/Usuario';
import { verificarContaUsuarioExiste } from '../middleware/VerificarContaUsuarioExiste';
import { v4 as uuidv4 } from 'uuid';

const router: Router = express.Router();
const usuarios: Usuario[] = []; // A mesma lista de usuários usada no middleware

// Rota para criar um novo usuário
router.post('/users', (req: Request, res: Response) => {
  const { name, username } = req.body;

  // Verifique se já existe um usuário com o mesmo username
  const existingUser = usuarios.find((user) => user.nomeusuario === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Crie um novo usuário com um ID gerado como UUID
  const newUser: Usuario = {
    id: uuidv4(),
    nome: name,
    nomeusuario: username,
    tecnologias: [],
  };

  // Adicione o novo usuário à lista de usuários
  usuarios.push(newUser);

  // Retorne o usuário criado com o código de status 201
  res.status(201).json(newUser);
});

// Rota para listar todos os usuários
router.get('/users', (req: Request, res: Response) => {
  // Retorna a lista de todos os usuários
  res.status(200).json(usuarios);
});

// Rota para validar a existência de um usuário
router.get('/users/validate', verificarContaUsuarioExiste, (req: Request, res: Response) => {
  // Se chegou até aqui, o usuário existe
  res.status(200).json({ message: 'Este usuário já existe' });
});

export { router as userRoutes };
