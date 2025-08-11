export interface ICriptografiaService {
  criptografarSenha(senha: string): Promise<string>;
  verificarSenha(senha: string, senhaHash: string): Promise<boolean>;
}