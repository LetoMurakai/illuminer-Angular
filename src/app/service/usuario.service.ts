import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  uri = environment.uri
  idUsuario = environment.idPostagem
  
  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  constructor(

    private http: HttpClient

  ) { }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.uri}/usuarios/${id}`, this.token)
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.uri}/usuarios`, usuario, this.token)
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${environment.uri}/usuarios/${id}`, this.token)
  }
  
}
