import { ComentarioService } from './../service/comentario.service';
import { PostagemService } from './../service/postagem.service';
import { EngajamentoService } from './../service/engajamento.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../service/perfil.service';
import { Comentario } from '../model/Comentario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario()
  comentario: Comentario = new Comentario()


  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private postagemService:PostagemService,
    private comentarioService: ComentarioService,
    private engajamentoService: EngajamentoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.perfilService.refreshToken()

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


}
