class Receita {
  constructor(
    public id: number,
    public idUsuarios: number,
    public idCategorias: number | null,
    public nome: string | null,
    public tempoPreparoMinutos: number | null,
    public porcoes: number | null,
    public modoPreparo: string,
    public ingredientes: string | null,
    public criadoEm: Date,
    public alteradoEm: Date
  ) {}
}

export default Receita;