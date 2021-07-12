
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogado: UsuarioLogin = new UsuarioLogin()
  uri = environment.uri
  constructor(
    private http: HttpClient
  ) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {

    return this.http.post<UsuarioLogin>(`${this.uri}/usuarios/login`, usuarioLogin)


  }

  cadastro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.uri}/usuarios`, usuario)

  }
  professor(){
    let professor = true
    if(environment.tipo != 'professor'){
      professor = false
    }
    return professor
  }
  aluno(){
    let aluno = true
    if(environment.tipo != 'aluno'){
      aluno = false
    }
    return aluno
  }
}
