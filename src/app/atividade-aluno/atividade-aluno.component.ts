import { PagAtividade } from './../model/PagAtividade';
import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { PerfilService } from './../service/perfil.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AtividadeService } from '../service/atividade.service';


@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {
  darkMode = environment.darkMode
  paginaAtividade: PagAtividade = new PagAtividade()
  usuario: Usuario = new Usuario()

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private atividadeService: AtividadeService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.atividadeService.refreshToken()
    this.obterAtividadeUsuario(0,5)
    this.obterUsuario()

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.perfilService.refreshToken()

  }

  obterAtividadeUsuario(pagina: number, size: number){
    this.atividadeService.refreshToken()
    this.atividadeService.obterAtividadesAluno(environment.idUsuarioPerfil, pagina, size).subscribe((resp: PagAtividade) => {
      this.paginaAtividade = resp
    })

  }

  obterUsuario(){
    this.usuarioService.refreshToken()
    this.usuarioService.getByIdUsuario(environment.idUsuarioPerfil).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  abrirUsuario(idUsuario:number){
    environment.idUsuarioPerfil = idUsuario
    this.router.navigate(['/feed'])
        setTimeout(() => {
          this.router.navigate([`/perfil/${idUsuario}`])
        }, 30);
  }

  abrirPublicacao(idPerfil:number){
    environment.idDestaqueComentario = idPerfil
    environment.idUsuarioPerfil = 0
    this.router.navigate(['/pagina-inicio'])
        setTimeout(() => {
          this.router.navigate([`/feed`])
        }, 30);
  }

}
