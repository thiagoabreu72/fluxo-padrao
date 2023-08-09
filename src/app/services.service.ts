import { Injectable } from '@angular/core';
import { DadosUsuario } from './interfaces/dados-usuario.interface';
import { user } from '@seniorsistemas/senior-platform-data';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { converteUrl } from './functions/functions';
import { Posto } from './interfaces/posto-trabalho.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  // Dados Obtidos do index e url
  private urlSenior: string; //= environment.urlG5Hom;
  private contexto: string; //= 'SXI-API';
  private modulo: string;
  private portasG5 = ['getPostoTrabalho'];
  private urlPosto: string = '';

  // dados do usuário/token
  private dados_usuario: DadosUsuario = { access_token: '', email: '' };
  private capturaToken = new Subject<string>(); // Criação do canal de comunicação.
  acao$ = this.capturaToken.asObservable(); // instanciando o Observable para mudanças no valor

  constructor(private http: HttpClient) {
    const elemento: any = document.querySelector('app-root');
    this.modulo = 'sm';
    this.contexto = elemento.getAttribute('contextoSXI');
    this.urlSenior = elemento.getAttribute('urlG5');
    this.urlSenior =
      this.urlSenior + 'g5-senior-services/tr_Synccom_prisma_bpm?wsdl';

    this.urlPosto = converteUrl(
      this.urlSenior,
      this.portasG5[0],
      'tr',
      this.contexto
    );

    // Captura informações do token gerado pela plataforma
    user
      .getToken()
      .then((data) => {
        this.dados_usuario = data;
        this.capturaToken.next(this.dados_usuario.access_token);
        //this.capturaToken.next('xjJ6JVOfsO59XFrrcnh1xjzJhjvqDjuZ');
      })
      .catch((error) => {
        alert(
          'Não foi possível obter token. Verifique se a tela está sendo acessada pela plataforma Senior X.'
        );
      });
  }

  getPostoTrabalho(empresa: Posto): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   // Authorization: `bearer ${this.dados_usuario.access_token}`,
    //   Authorization: `bearer xjJ6JVOfsO59XFrrcnh1xjzJhjvqDjuZ`,
    // });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `bearer ${this.dados_usuario.access_token}`,
    });
    return this.http.post<any>(this.urlPosto, empresa, { headers });
  }
}
