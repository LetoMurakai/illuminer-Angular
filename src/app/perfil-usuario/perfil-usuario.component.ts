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
  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo
  id = environment.id

  confirmaSenha: string
  tipoUsuario: string
  fotoCapa = "https://source.unsplash.com/random"
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
    this.perfilService.refreshToken()
    this.findByIdUsuario(this.id)
    console.log(this.fotoCapa)
    console.log(this.usuario.fotoCapa)
    console.log(this.usuario)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    if(this.usuario.fotoCapa != undefined){
      this.fotoCapa = this.usuario.fotoCapa
      console.log(this.fotoCapa)
    }
    

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
    // this.usuario.tipoUsuario = this.confirmaSenha 
       this.perfilService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
         this.usuario = resp
         alert('Usuário atualizado com sucesso!')
         environment.nome = this.usuario.nome
         environment.foto = this.usuario.foto
         environment.fotoCapa = this.usuario.fotoCapa
         
         this.nome = this.usuario.nome
         console.log(resp)
         console.log(this.usuario)
         this.foto = this.usuario.foto
         this.fotoCapa = this.usuario.fotoCapa
         this.router.navigate(['/pagina-inicio'])
         setTimeout(() => {
           this.router.navigate(['/feed'])
         }, 1);
       })
   }
}
