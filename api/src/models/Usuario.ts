class Usuario {
  constructor(
    public id: number,
    public nome: string | null,
    public login: string,
    public senha: string,
    public criadoEm: Date,
    public alteradoEm: Date
  ) {}
}

export default Usuario;