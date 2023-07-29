import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string | undefined;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService){
  }

  ngOnInit(): void {
    this.userEmail = JSON.parse(window.localStorage.getItem('user') || '{}').email;

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogout(){
    this.authService.logOut();
  }

}
