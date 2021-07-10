import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private http: HttpClient
   ) { }

   token = {
     headers: new HttpHeaders().set("Authorization", environment.token)
   }
   refreshToken(){
     this.token = {
       headers:new HttpHeaders().set("Authorization", environment.token) 
     }
   }

   getByIdPerfil(id: number): Observable<Usuario>{
     return this.http.get<Usuario>(`${environment.uri}/usuarios/${id}`, this.token)
   }

   putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.uri}/usuarios`, usuario, this.token)
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${environment.uri}/usuarios/${id}`, this.token)
  }
   
}
