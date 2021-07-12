import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  textoPesquisa: string
  idUsuarioLogado = environment.id

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  pesquisar() {
   environment.textoPesquisaPostagem = this.textoPesquisa
   environment.idUsuarioPerfil = 0
   environment.idDestaqueComentario = 0
   this.router.navigate(['/pagina-inicio'])
   setTimeout(() => {
     this.router.navigate(['/feed'])
   }, 1)
  }

  atualizar(){
    environment.textoPesquisaPostagem = ''
    environment.idUsuarioPerfil = 0
    environment.idDestaqueComentario = 0
   this.router.navigate(['/pagina-inicio'])
   setTimeout(() => {
     this.router.navigate(['/feed'])
   }, 1)
  }

  sair() {
    environment.textoPesquisaPostagem = ''
    environment.idUsuarioPerfil = 0
    environment.idDestaqueComentario = 0
    this.router.navigate(['/login'])
  }
}
