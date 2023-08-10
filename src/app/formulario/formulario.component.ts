import { ServiceBpmService } from './../services/service-bpm.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Posto } from '../interfaces/posto-trabalho.interface';
import { Mensagem } from '../interfaces/gerais.interface';
import { Formulario } from '../interfaces/formulario.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  @Output() dadosMensagem = new EventEmitter<Mensagem>();
  @Output() dadosSpinner = new EventEmitter<boolean>();

  info_posto: Posto = { numEmp: 252 };
  camposFormulario: Formulario = { email: '' };

  constructor(private serviceBpm: ServiceBpmService) {
    // utilizado assim que capturado o token
    this.serviceBpm.token$.subscribe((retorno) => {
      this.camposFormulario.email = retorno.email;
      this.camposFormulario.posto = retorno.posto;

      console.table(retorno);

      //this.info_posto.dados?.push({desRed: valor[1]});

      //Chamar getPosto apenas no primeiro form
      //this.getPostoTrabalho();
    });
  }

  getPostoTrabalho() {
    this.dadosSpinner.emit(true);
    this.serviceBpm.getPostoTrabalho(this.info_posto).subscribe({
      next: (v) => {
        this.info_posto.dados = v.dados;
        this.info_posto.selecionado = [];
      },
      error: (e) => {
        this.dadosMensagem.emit({ tipo: 4, mensagem: e.error.errorMessage });
      },
      complete: () => {
        this.dadosSpinner.emit(false);
      },
    });
  }

  getPostoSelecionado(dados: any) {
    this.info_posto.selecionado.push(dados);
    this.serviceBpm.dadosFormulario.posto = dados;
  }

  postSpinner() {
    this.dadosSpinner.emit(false);
  }
}
