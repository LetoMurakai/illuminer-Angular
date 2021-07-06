import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  displayComentarios = "none"
  idPostagem = environment.idPostagem
  constructor() { }

  ngOnInit(){
  }

  comentar() {
    this.displayComentarios = "block"
  }

  verComentarios() {
    if(this.displayComentarios == "none") {
      this.displayComentarios = "block"
    } else {
      this.displayComentarios = "none"
    }
  }
}
