import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'illuminer';

  onActivate(e: any) {
    window.scrollTo(0, environment.posicaoScroll);
    let scroll = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos == 0) {
        window.scrollTo(0, environment.posicaoScroll);
      } else {
        window.clearInterval(scroll);
      }
    }, 1);
    // }
  }

}
