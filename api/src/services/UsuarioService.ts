import { inject, injectable } from 'inversify';
import { IUsuarioService } from './IUsuarioService';
import { IUsuarioRepository } from '../repositories/IUsuarioRepository';
import { ICriptografiaService } from './ICriptografiaService';
import Usuario from '../models/Usuario';

@injectable()
export class UsuarioService implements IUsuarioService {
  constructor(
    @inject('IUsuarioRepository') private usuarioRepository: IUsuarioRepository,
    @inject('ICriptografiaService') private criptografiaService: ICriptografiaService
  ) {}

  async buscarTodosUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.buscarTodos();
  }

  async criarUsuario(usuario: { nome: string; login: string; senha: string }): Promise<void> {
    const senhaHash = await this.criptografiaService.criptografarSenha(usuario.senha);
    const criadoEm = new Date();
    const alteradoEm = new Date();
    await this.usuarioRepository.criar({ 
      ...usuario, 
      senha: senhaHash, 
      criadoEm, 
      alteradoEm 
    });
  }

  async buscarUsuarioPorLogin(login: string): Promise<Usuario | null> {
    return this.usuarioRepository.buscarPorLogin(login);
  }
}