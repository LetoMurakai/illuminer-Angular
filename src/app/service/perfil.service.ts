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
     headers: new HttpHeaders().set("Authorization", "Basic ZmFiQG1haWwuY29tOjEyMzQ1Ng==") //enviroment.token
   }
   refreshToken(){
     this.token = {
       headers:new HttpHeaders().set("Authorization", "Basic ZmFiQG1haWwuY29tOjEyMzQ1Ng==") //enviroment.token
     }
   }

   getById(id: number): Observable<Usuario>{
     return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`, this.token)
   }
   
}
