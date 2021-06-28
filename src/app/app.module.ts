import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EstudarFazBemComponent } from './estudar-faz-bem/estudar-faz-bem.component';
import { ContatosComponent } from './contatos/contatos.component';
import { SobreComponent } from './sobre/sobre.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';


@NgModule({
  declarations: [
    AppComponent,
    dafhne-cadastro,
    CadastroComponent,
    EstudarFazBemComponent,
    ContatosComponent,
    SobreComponent,
    CabecalhoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
