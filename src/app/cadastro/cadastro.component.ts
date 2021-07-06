import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmaSenha: string
  tipoUsuario: string
 
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    
  }

  confirmarSenha(event: any) {
    this.confirmaSenha = event.target.value

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
   // this.usuario.tipoUsuario = this.confirmaSenha
   console.log(this.usuario.email)

   this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmaSenha ){
      alert('As senhas não são iguais')

    } else {
      this.authService.cadastro(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso!')
      })

    }

  }

}
