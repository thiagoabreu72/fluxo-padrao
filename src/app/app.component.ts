import { Mensagem } from './interfaces/gerais.interface';
import { ServiceBpmService } from './services/service-bpm.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fluxo-padrao';
  carregando: boolean = false;
  dadosMensagem: Mensagem = { tipo: 0 };

  getValorSpinner(valor: boolean) {
    this.carregando = valor;
  }

  getDadosMensagem(dados: Mensagem) {
    this.dadosMensagem = dados;
  }
}
