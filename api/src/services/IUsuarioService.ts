import Usuario from '../models/Usuario';

export interface IUsuarioService {
  buscarTodosUsuarios(): Promise<Usuario[]>;
  criarUsuario(usuario: { nome: string; login: string; senha: string }): Promise<void>;
  buscarUsuarioPorLogin(login: string): Promise<Usuario | null>;
}