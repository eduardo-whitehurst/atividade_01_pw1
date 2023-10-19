import { Tecnologia } from './Tecnologia';

interface Usuario {
  id: string;
  nome: string;
  nomeusuario: string;
  tecnologias: Tecnologia[];
}

export { Usuario };
