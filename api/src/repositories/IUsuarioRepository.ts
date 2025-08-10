import Usuario from '../models/Usuario';

export interface IUsuarioRepository {
  buscarPorId(id: number): Promise<Usuario | null>;
  buscarTodos(): Promise<Usuario[]>;
  criar(usuario: Partial<Usuario>): Promise<void>;
  atualizar(id: number, usuario: Usuario): Promise<void>;
  deletar(id: number): Promise<void>;
  buscarPorLogin(login: string): Promise<Usuario | null>;
}
