import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  darkMode = environment.darkMode
  constructor(
    public auth:AuthService
  ) { }
    
  ngOnInit() {
    
  }

 
}
