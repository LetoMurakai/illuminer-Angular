import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.salvarScroll()
  }

  salvarScroll() {
    console.log('inicio')
    var posicao = localStorage.getItem('posicaoScroll');
    console.log(environment.posicao)

    /* Se existir uma posição salva seta o scroll nela */
    if (posicao) {
      setTimeout(() => {
        window.scrollTo(0, environment.posicao);
      }, 1);
      console.log('entrou')
    }
    /* Verifica mudanças no Scroll e salva no localStorage a posição */
    window.onscroll = function () {
      environment.posicao = window.scrollY;
      localStorage.setItem('posicaoScroll', JSON.stringify(environment.posicao));
      console.log('salvou')
    }
    console.log(environment.posicao)
  }

}
