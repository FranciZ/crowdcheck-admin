import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
  }

  async onLoginClick() {
    const result = await this.apiService.login(this.email, this.password);
    if (result) {
      this.router.navigate(['home']);
    }
  }

}
