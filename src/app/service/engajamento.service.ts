import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioDestaque } from '../model/UsuarioDestaque';

@Injectable({
  providedIn: 'root'
})
export class EngajamentoService {


  
  constructor(

    private http: HttpClient
    
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  usuarioMaisEngajado(): Observable<UsuarioDestaque>{
    return this.http.get<UsuarioDestaque>('http://localhost:8080/usuarios/engajamento/postagens', this.token)
  }

  
}