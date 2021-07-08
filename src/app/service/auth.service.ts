
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

}
