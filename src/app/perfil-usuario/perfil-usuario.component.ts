import { ComentarioService } from './../service/comentario.service';
import { PostagemService } from './../service/postagem.service';
import { EngajamentoService } from './../service/engajamento.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../service/perfil.service';
import { Comentario } from '../model/Comentario';
import { AlertaService } from '../service/alerta.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {
  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo
  id = environment.id
  darkMode = environment.darkMode


  confirmaSenha: string
  tipoUsuario: string
  usuario: Usuario = new Usuario()
  comentario: Comentario = new Comentario()



  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private postagemService:PostagemService,
    private comentarioService: ComentarioService,
    private engajamentoService: EngajamentoService,
    private route: ActivatedRoute,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    window.scroll(0, 0)
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

  confirmarSenha(event: any) {
    this.confirmaSenha = event.target.value

  }

  salvar() {
         this.usuario.postagens = []
         this.perfilService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
         this.usuario = resp
         this.alerta.showAlertSuccess('Usuário atualizado com sucesso!')
         environment.nome = this.usuario.nome
         environment.foto = this.usuario.foto
         
         this.nome = this.usuario.nome
         console.log(resp)
         console.log(this.usuario)
         this.foto = this.usuario.foto
         this.router.navigate(['/pagina-inicio'])
         setTimeout(() => {
           this.router.navigate([`/perfil/${environment.idUsuarioPerfil}`])
         }, 1);
       })
   }
}
