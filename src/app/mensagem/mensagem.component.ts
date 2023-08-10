import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Message } from 'primeng/api';
import { Mensagem } from '../interfaces/gerais.interface';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss'],
})
export class MensagemComponent implements OnInit {
  @Input() dadosMensagem: Mensagem = { tipo: 0, mensagem: '' };

  constructor() {}

  mensagem: Message[] = [];
  teste: Message[] = [];

  determinaTipo() {
    switch (this.dadosMensagem.tipo) {
      case 1:
        this.mensagem = [
          {
            severity: 'success',
            summary: 'Sucesso',
            detail: this.dadosMensagem.mensagem,
          },
        ];
        break;
      case 2:
        this.mensagem = [
          {
            severity: 'info',
            summary: 'Info',
            detail: this.dadosMensagem.mensagem,
          },
        ];
        break;

      case 3:
        this.mensagem = [
          {
            severity: 'warn',
            summary: 'Atenção',
            detail: this.dadosMensagem.mensagem,
          },
        ];
        break;
      case 4:
        this.mensagem = [
          {
            severity: 'error',
            summary: 'Erro',
            detail: this.dadosMensagem.mensagem,
          },
        ];
        break;
    }
  }

  //ngOnChange(alteracao: SimpleChanges) {}

  ngOnInit() {
    this.determinaTipo();
    // this.teste = {
    //   severity: 'success',
    //   summary: 'Sucesso',
    //   detail: this.dadosMensagem.mensagem,
    // };

    /*this.mensagem = [
      {
        severity: 'success',
        summary: 'Sucesso',
        detail: this.dadosMensagem.mensagem,
      },
      {
        severity: 'info',
        summary: 'Info',
        detail: this.dadosMensagem.mensagem,
      },
      {
        severity: 'warn',
        summary: 'Atenção',
        detail: this.dadosMensagem.mensagem,
      },
      {
        severity: 'error',
        summary: 'Erro',
        detail: this.dadosMensagem.mensagem,
      },
    ];*/
  }
}
