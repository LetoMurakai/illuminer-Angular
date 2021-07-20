import { Component, OnInit } from '@angular/core';
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
  nomeValido: boolean = false
  emailValido: boolean =false
  fotoValida: boolean = false
  validarUsuario : boolean = false
  senhaValida: boolean =false

  displaySpinner = "none"
  displayTextoCadastrar = "block"




  constructor(
    private authService: AuthService,
    private router:Router,
    private alerta: AlertaService,

  ) { }

  ngOnInit() {
    window.scroll(0,0)


  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }



  confirmSenha(event: any) {
    this.confirmaSenha = event.target.value
  }

  cadastrar() {
   // this.usuario.tipoUsuario = this.confirmaSenha
      this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmaSenha ){
      this.alerta.showAlertWarning('As senhas não são iguais')

    } else {
      this.displaySpinner = "block"
      this.displayTextoCadastrar = "none"
      this.authService.cadastro(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso!')
        this.displaySpinner = "none"
        this.displayTextoCadastrar = "block"
        this.router.navigate(['/login'])
      }, () => {
        this.displaySpinner = "none"
        this.displayTextoCadastrar = "block"
      })

    }

  }

  validaNome(event: any) {
    this.nomeValido = this.validacao(event.target.value.length < 3, event);
  }

  validaEmail(event: any) {
    this.emailValido = this.validacao(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.com') == -1, event);

  }
  validaFoto(event: any){
    this.fotoValida = this.validacao(event.target.value.indexOf('https://') == -1, event)
  }


  validarTipoUsario ( event: any){
    this.validarUsuario = this.validacao(event.target.value.indexOf('Selecione um tipo de usuario:') == 0, event)

  }

  validarSenha (event: any){
    this.senhaValida =  this.validacao(event.target.value != this.confirmaSenha, event)
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
