import { Request, Response, NextFunction } from 'express';
import { Usuario } from '../modelos/Usuario';

const listaUsuarios: Usuario[] = [];

function verificarContaUsuarioExiste(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nomeusuario } = req.headers;

  const usuario = listaUsuarios.find((u) => u.nomeusuario === nomeusuario);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  req.user = usuario;
  next();
}

export { verificarContaUsuarioExiste, listaUsuarios };
