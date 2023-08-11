export interface ColaboradorPosto {
  numEmp: number;
  estPos: number;
  posTra: string;
  dados?: Colaborador[];
}

interface Colaborador {
  numEmp?: number;
  tipCol?: number;
  numCad?: number;
  nomFun?: string;
}
