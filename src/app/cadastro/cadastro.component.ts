import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertaService } from '../service/alerta.service';
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
  formulario: FormGroup
 
  constructor(
    private authService: AuthService,
    private router:Router,
    private alerta: AlertaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    window.scroll(0,0)
   /* this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
      confirmaSenha: [null],
      foto: [null]
    });
    
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
      this.alerta.showAlertWarning('As senhas não são iguais')

    } else {
      this.authService.cadastro(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso!')
      })

    }

  }

}
