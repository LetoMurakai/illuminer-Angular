import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Curtida } from '../model/Curtida';
import { CurtidaPK } from '../model/CurtidaPK';

@Injectable({
  providedIn: 'root'
})
export class CurtidasService {

  uri = environment.uri
  token ={
    headers : new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  constructor(
    private router:Router,
    private http: HttpClient
  ) { }

   postCurtidas(curtida: Curtida): Observable<Curtida>{
    return this.http.post<Curtida>(`${this.uri}/curtidas?usuario=${curtida.id.usuario.id}&postagem=${curtida.id.postagem.id}`, curtida.id, this.token)
  }
  deleteCurtidas(id: CurtidaPK){
    return this.http.delete(`${this.uri}/curtidas?usuario=${id.usuario.id}&postagem=${id.postagem.id}`,this.token)
  }
  getCurtidasPostagens(id:number){
    return this.http.get(`${this.uri}/postagens/${id}/curtidas`, this.token)
  }
  getCurtidasUsuario(id:number){
    return this.http.get(`${this.uri}/usuarios/${id}/curtidas`,this.token)
  } 
}
