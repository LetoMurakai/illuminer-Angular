import { PostagemService } from './../service/postagem.service';
import { PerfilService } from './../service/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from './../model/Postagem';
import { Comentario } from './../model/Comentario';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {

  usuario: Usuario = new Usuario()
  coment: Comentario = new Comentario()
  postagem: Postagem = new Postagem()

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private postagemService: PostagemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.perfilService.refreshToken()
    this.postagemService.refreshToken()

    let id = this.route.snapshot.params['id']
    this.findByIdUsuario(id)
    environment.idUsuarioPerfil = id
  }

  findByIdUsuario(id: number) {
    this.perfilService.refreshToken()
    this.perfilService.getByIdPerfil(id).subscribe((resp: Usuario) => {
      console.log(resp)
      this.usuario = resp
    })
  }

  definirIdPostagem(id: number) {
    this.postagem.id = id
    this.obterPostagemPorId(this.postagem.id)
  }

  obterPostagemPorId(id: number) {
    this.postagemService.getById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }
}
