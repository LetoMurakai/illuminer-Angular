import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EstudarFazBemComponent } from './estudar-faz-bem/estudar-faz-bem.component';
import { ContatosComponent } from './contatos/contatos.component';
import { SobreComponent } from './sobre/sobre.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { UserPerfilComponent } from './user-perfil/user-perfil.component';
import { FeedComponent } from './feed/feed.component';
import { PostagemComponent } from './postagem/postagem.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ComentarioComponent } from './comentario/comentario.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MiniPerfilComponent } from './mini-perfil/mini-perfil.component';

import { EngajamentoComponent } from './engajamento/engajamento.component';

import { FazerPostagemComponent } from './fazer-postagem/fazer-postagem.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent,
    CadastroComponent,
    EstudarFazBemComponent,
    ContatosComponent,
    SobreComponent,
    CabecalhoComponent,
    PaginaInicioComponent,
    UserPerfilComponent,
    FeedComponent,

    NavbarComponent,
    MiniPerfilComponent,
    PostagemComponent,
    ComentarioComponent,
    EngajamentoComponent,
    FazerPostagemComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
