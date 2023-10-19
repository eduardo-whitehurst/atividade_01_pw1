import { Usuario } from "../modelos/Usuario";

declare global {
  namespace Express {
    interface Request {
      user: Usuario;
    }
  }
}
