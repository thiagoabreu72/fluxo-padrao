import { ServiceBpmService } from './../services/service-bpm.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Posto } from '../interfaces/posto-trabalho.interface';
import { Mensagem } from '../interfaces/gerais.interface';
import { Formulario } from '../interfaces/formulario.interface';
import { ColaboradorPosto } from '../interfaces/colaborador.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  @Output() dadosMensagem = new EventEmitter<Mensagem>();
  @Output() dadosSpinner = new EventEmitter<boolean>();

  parametrosPosto: Posto = { numEmp: 252 };
  parametrosColaborador: ColaboradorPosto = {
    numEmp: 0,
    estPos: 0,
    posTra: '',
  };
  camposFormulario: Formulario = { email: '' };
  desabilitaEmail: boolean = true;
  desabilitaPosto: boolean = false;

  constructor(private serviceBpm: ServiceBpmService) {
    // utilizado assim que capturado o token
    this.serviceBpm.dados$.subscribe((retorno) => {
      console.log(this.serviceBpm.getEtapa());
      switch (this.serviceBpm.getEtapa()) {
        case 'solicitacao':
          {
            this.camposFormulario.email = retorno.email;
            this.getPostoTrabalho();
          }
          break;
        case 'conferencia':
          {
            this.camposFormulario.email = retorno.email;
            this.camposFormulario.posto = retorno.posto;
            this.desabilitaEmail = true;
            this.desabilitaPosto = true;
          }
          break;
      }
    });
  }

  getPostoTrabalho() {
    this.dadosSpinner.emit(true);
    this.serviceBpm.getPostoTrabalho(this.parametrosPosto).subscribe({
      next: (v) => {
        this.parametrosPosto.dados = v.dados;
        this.parametrosPosto.selecionado = [];
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
    this.parametrosPosto.selecionado.push(dados);
    this.serviceBpm.dadosFormulario = dados;
  }

  postSpinner() {
    this.dadosSpinner.emit(false);
  }

  exibe(valor: any) {
    console.log(valor);
  }
}
