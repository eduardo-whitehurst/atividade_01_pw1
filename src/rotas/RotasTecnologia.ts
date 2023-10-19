import express, { Router, Request, Response } from 'express';
import { Usuario } from '../modelos/Usuario';
import { Tecnologia } from '../modelos/Tecnologia';
import { verificarContaUsuarioExiste } from '../middleware/VerificarContaUsuarioExiste';
import { v4 as uuidv4 } from 'uuid';

const router: Router = express.Router();

// Rota para criar uma nova tecnologia para um usuário
router.post('/', verificarContaUsuarioExiste, (req: Request, res: Response) => {
    const { titulo, estudar_ate } = req.body;
    const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
    const newTechnology: Tecnologia = {
      id: uuidv4(), // Gere um ID como UUID
      titulo: titulo,
      estudada: false, // Inicialize 'studied' como false
      estudar_ate: new Date(estudar_ate),
      criado_em: new Date(),
    };
  
    // Adicione a nova tecnologia à lista de tecnologias do usuário
    user.tecnologias.push(newTechnology);
  
    // Retorne a tecnologia criada
    res.status(201).json(newTechnology);
  });

// Rota para listar todas as tecnologias de um usuário
router.get('/', verificarContaUsuarioExiste, (req: Request, res: Response) => {
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware

  // Retorna a lista de tecnologias do usuário
  res.status(200).json(user.tecnologias);
});

// Rota para atualizar uma tecnologia de um usuário
router.put('/:id', verificarContaUsuarioExiste, (req: Request, res: Response) => {
  const { titulo, estudar_ate } = req.body;
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  const technologyId: string = req.params.id;

  const technology: Tecnologia | undefined = user.tecnologias.find((tech) => tech.id === technologyId);

  if (!technology) {
    return res.status(404).json({ error: 'Tecnologia não encontrada' });
  }

  // Atualize as propriedades da tecnologia
  technology.titulo = titulo;
  technology.estudar_ate = estudar_ate;

  // Retorne a tecnologia atualizada
  res.status(200).json(technology);
});

// Rota para marcar uma tecnologia como estudada
router.patch('/:id/studied', verificarContaUsuarioExiste, (req: Request, res: Response) => {
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  const technologyId: string = req.params.id;

  const technology: Tecnologia | undefined = user.tecnologias.find((tech) => tech.id === technologyId);

  if (!technology) {
    return res.status(404).json({ error: 'Tecnologia não encontrada' });
  }

  // Marque a tecnologia como estudada
  technology.estudada = true;

  // Retorne a tecnologia marcada como estudada
  res.status(200).json(technology);
});

// Rota para excluir uma tecnologia de um usuário
router.delete('/:id', verificarContaUsuarioExiste, (req: Request, res: Response) => {
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  const technologyId: string = req.params.id;

  const index: number = user.tecnologias.findIndex((tech) => tech.id === technologyId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tecnologia não Encontrada' });
  }

  // Remova a tecnologia da lista do usuário
  user.tecnologias.splice(index, 1);

  // Retorne a lista de tecnologias restantes
  res.status(200).json(user.tecnologias);
});

export { router as technologyRoutes };
