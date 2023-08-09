import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Posto } from '../interfaces/posto-trabalho.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  info_posto: Posto = { numEmp: 1 };

  constructor(private service: ServicesService) {
    // utilizado assim que capturado o token
    this.service.acao$.subscribe(() => {
      this.getPostoTrabalho();
    });

    // utilizado para depois de meio segundo
    // setTimeout(() => {
    //   this.getPostoTrabalho();
    // }, 500);
  }

  getPostoTrabalho() {
    this.service.getPostoTrabalho(this.info_posto).subscribe((retorno) => {
      console.log(retorno);
      this.info_posto = retorno;
      this.info_posto.selecionado = [];
    });
  }

  getPostoSelecionado(dados: any) {
    this.info_posto.selecionado.push(dados);
  }
}
