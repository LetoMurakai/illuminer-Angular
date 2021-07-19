import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  darkMode = environment.darkMode
  textoPesquisa: string
  idUsuarioLogado = environment.id
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
  trocarCor(){
    
    let id = this.route.snapshot.params['id']
    console.log(id)
    if(id == 0 || id == null || id == '' || id == undefined){
      if(this.darkMode == false){
        environment.darkMode = true
        this.darkMode = environment.darkMode
      }
      else{
        environment.darkMode = false
        this.darkMode = environment.darkMode
      }
    this.router.navigate(['/pagina-inicio'])
    setTimeout(() => {
      this.router.navigate(['/feed'])
    }, 1);
  }

    else{
      if(this.darkMode == false){
        environment.darkMode = true
        this.darkMode = environment.darkMode
      }
      else{
        environment.darkMode = false
        this.darkMode = environment.darkMode
      }
      this.router.navigate(['/pagina-inicio'])
      setTimeout(() => {
        this.router.navigate([`/perfil/${id}`])
      }, 1);
    }
  }
}
