import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertaService } from '../service/alerta.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.css']
})
export class MiniPerfilComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo
  id = environment.id

  fotoCapa = "https://source.unsplash.com/random"
  usuario: Usuario = new Usuario()
  confirmaSenha: string
  tipoUsuario: string


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
    this.usuarioService.refreshToken()
    this.findByIdUsuario(this.id)
    if (this.usuario.fotoCapa != undefined) {
      this.fotoCapa = this.usuario.fotoCapa
      console.log(this.fotoCapa)
    }
  }

  confirmarSenha(event: any) {
    this.confirmaSenha = event.target.value

  }

  salvar() {
      this.usuario.postagens = [] 
      this.usuarioService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alerta.showAlertSuccess('Usuário atualizado com sucesso!')
        environment.nome = this.usuario.nome
        environment.foto = this.usuario.foto
        
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

  findByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}
