import { DadosUsuario } from './../interfaces/dados-usuario.interface';
import { Injectable } from '@angular/core';
import { Data, Info, ProcessVariables } from '../interfaces/workflow.interface';
import { Observable, Subject } from 'rxjs';
import { Posto } from '../interfaces/posto-trabalho.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { converteUrl } from '../functions/functions';
import { Formulario } from '../interfaces/formulario.interface';
import { ColaboradorPosto } from '../interfaces/colaborador.interface';

declare var workflowCockpit: any;

@Injectable({
  providedIn: 'root',
})
export class ServiceBpmService {
  // Declara variáveis para montagem da url
  private urlSenior: string = ''; //= environment.urlG5Hom;
  private contexto: string = ''; //= 'SXI-API';
  private modulo: string = 'rubi';
  private portasG5 = ['getPostoTrabalho', 'getColaboradoresPosto'];
  private urlPosto: string = '';
  private urlColaborador: string = '';
  private dadosUsuario: DadosUsuario = { email: '' };
  private variaveisProcesso: ProcessVariables[] = [];
  dadosFormulario: Formulario = {};

  constructor(private http: HttpClient) {
    // cria meio de conexão entre a api do bpm e formulário
    new workflowCockpit({
      init: this._loadData,
      onSubmit: this._saveData,
      onError: this._rollback,
    });

    // Obter parâmetros da página index.
    const elemento: any = document.querySelector('app-root');
    // Requisição G5 via SXI
    this.contexto = elemento.getAttribute('contextoSXI');
    this.urlSenior = elemento.getAttribute('urlG5');
    this.urlSenior =
      this.urlSenior + 'g5-senior-services/rubi_Synccom_prisma_bpm?wsdl';
    this.urlPosto = converteUrl(
      this.urlSenior,
      this.portasG5[0],
      this.modulo,
      this.contexto
    );
    this.urlColaborador = converteUrl(
      this.urlSenior,
      this.portasG5[1],
      this.modulo,
      this.contexto
    );
  }

  private getDados = new Subject<Formulario>(); // Criação do canal de comunicação.
  dados$ = this.getDados.asObservable(); // instanciando o Observable para mudanças no valor da variável

  // Essa função é chamada quando o usuário clicar no botão 'Enviar'
  private _saveData = (_data: Data, _info: Info): any => {
    return {
      formData: this.dadosFormulario,
    };
  };

  // Função init é chamada ao abrir o formulário
  private _loadData = async (_data: Data, _info: Info): Promise<void> => {
    if (this.getEtapa() == 'conferencia') {
      await _info.getInfoFromProcessVariables().then((dados) => {
        this.variaveisProcesso = dados;
        console.table(this.variaveisProcesso);
        let variavel = new Map();

        for (let i = 0; i < this.variaveisProcesso.length; i++) {
          variavel.set(
            this.variaveisProcesso[i].key,
            this.variaveisProcesso[i].value
          );
        }

        this.dadosFormulario.email = variavel.get('email');
        this.dadosFormulario.posto = variavel.get('posto');

        console.log(this.dadosFormulario);
        this.getDados.next(
          this.dadosFormulario ? this.dadosFormulario : this.dadosFormulario
        );
      });
    }

    if (this.getEtapa() == 'solicitacao') {
      await _info.getUserData().then((dados) => {
        this.dadosFormulario.email = dados.email;
      });
      await _info.getPlatformData().then((dados) => {
        this.dadosUsuario.access_token = dados.token.access_token;
        this.getDados.next(
          this.dadosFormulario ? this.dadosFormulario : this.dadosFormulario
        );
      });
    }
  };

  private _rollback = (_data: Data, _info: Info): any => {
    _data.error = 'teste';
  };

  // pega a etapa do fluxo via url. Obs.: a url no fluxo deve conter a etapa informada
  getEtapa() {
    return '' + window.location.href.match(/#!\/(.*?)\//)![1];
  }

  // requisição na G5 - Posto de trabalho
  getPostoTrabalho(empresa: Posto): Observable<Posto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${this.dadosUsuario.access_token}`,
    });
    return this.http.post<Posto>(this.urlPosto, empresa, { headers });
  }

  // requisição na G5 - Colaboradores
  getColaboradoresPosto(
    parametros: ColaboradorPosto
  ): Observable<ColaboradorPosto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${this.dadosUsuario.access_token}`,
    });
    return this.http.post<ColaboradorPosto>(this.urlColaborador, parametros, {
      headers,
    });
  }
}
