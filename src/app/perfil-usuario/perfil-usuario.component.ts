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

  fotoCapa = "https://source.unsplash.com/random"
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
    this.perfilService.refreshToken()

    let id = this.route.snapshot.params['id']
    this.findByIdUsuario(id)
    environment.idUsuarioPerfil = id
  }

  findByIdUsuario(id: number) {
    this.perfilService.refreshToken()
    this.perfilService.getByIdPerfil(id).subscribe((resp: Usuario) => {
      console.log(resp)
      this.usuario = resp
    })
  }

}
