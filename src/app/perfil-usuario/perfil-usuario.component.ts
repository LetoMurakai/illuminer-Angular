import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario()
  


  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    /*let id = this.route.snapshot.params['id']*/
    this.findByIdUsuario(3)
    console.log(this.usuario)
  }

  findByIdUsuario(id: number) {
    this.perfilService.getById(id).subscribe((resp: Usuario) => {
      console.log(resp)
      this.usuario = resp
    })
  }

  

}
