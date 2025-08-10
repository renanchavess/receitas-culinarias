import { inject, injectable } from 'inversify';
import { IUsuarioService } from './IUsuarioService';
import { IUsuarioRepository } from '../repositories/IUsuarioRepository';
import Usuario from '../models/Usuario';

@injectable()
export class UsuarioService implements IUsuarioService {
  constructor(@inject('IUsuarioRepository') private usuarioRepository: IUsuarioRepository) {}

  async buscarTodosUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.buscarTodos();
  }

  async criarUsuario(usuario: { nome: string; login: string; senha: string }): Promise<void> {
    const criadoEm = new Date();
    const alteradoEm = new Date();
    await this.usuarioRepository.criar({ ...usuario, criadoEm, alteradoEm });
  }

  async buscarUsuarioPorLogin(login: string): Promise<Usuario | null> {
    return this.usuarioRepository.buscarPorLogin(login);
  }
}