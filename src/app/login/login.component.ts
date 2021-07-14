import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin
  emailValido: boolean =false
  senhaValido: boolean = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertaService
    )
     { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login() {
    this.auth.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin=resp
      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id
      environment.tipo = this.usuarioLogin.tipo
      this.router.navigate(['/feed'])
    }, erro => {
      if(erro.status=401) {
        this.alerta.showAlertWarning('Usuário ou Senha incorretos!')

      }
    })
    
  }

  validaEmail(event: any) {
    this.emailValido = this.validacao(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.com') == -1, event);

  }

  validaSenha(event: any) {
    this.senhaValido = this.validacao( event.target.value.indexOf('SENHA') == this.usuarioLogin, event);

  }

  validacao(condicao: boolean, event: any) {
    let valid = false;
    if (condicao) {
      event.target.classList.remove('is-valid');
      event.target.classList.add('is-invalid');
    } else {
      event.target.classList.remove('is-invalid');
      event.target.classList.add('is-valid');
      valid = true;
    }
    return valid;
  }
}
