interface DadosPosto {
  estPos?: number;
  posTra?: string;
  desRed?: string;
}

export interface Posto {
  numEmp: number;
  dados?: DadosPosto[];
  selecionado?: any;
  msgRet?: string;
}
