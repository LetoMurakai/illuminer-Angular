import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { UserPerfilComponent } from './user-perfil/user-perfil.component';

const routes: Routes = [
  {path: '', redirectTo: 'pagina-inicio', pathMatch: 'full'},
  {path: 'pagina-inicio', component: PaginaInicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastroComponent},
  {path: 'feed', component: FeedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }