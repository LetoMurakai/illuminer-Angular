import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDestaque } from '../model/UsuarioDestaque';
import { EngajamentoService } from '../service/engajamento.service';
@Component({
  selector: 'app-engajamento',
  templateUrl: './engajamento.component.html',
  styleUrls: ['./engajamento.component.css']
})
export class EngajamentoComponent implements OnInit {

  usuarioDestaque: UsuarioDestaque = new UsuarioDestaque

  


  constructor(
    private engajamentoService: EngajamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.engajamentoService.refreshToken()
    this.obterUsuarioDestaque()

    let id = this.route.snapshot.params['id']


    
  }

  findByIdUsusarioDestaque(id: number){
    this.engajamentoService.refreshToken()
    this.engajamentoService.getById(id).subscribe((resp: UsuarioDestaque) =>{
      console.log(resp)
      this.usuarioDestaque = resp
    })
  }
  
  obterUsuarioDestaque(){
    this.engajamentoService.refreshToken()
    this.engajamentoService.usuarioMaisEngajado().subscribe((resp: UsuarioDestaque) => {
      this.usuarioDestaque = resp
      
    })

  }
  
}
