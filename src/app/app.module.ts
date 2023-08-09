import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//PRIMENG
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  declarations: [AppComponent, FormularioComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    CardModule,
    CheckboxModule,
    TableModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
