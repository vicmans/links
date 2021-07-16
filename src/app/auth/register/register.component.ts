import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string = ''
  email: string = ''
  password: string = ''

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
    }).toPromise()
  }
}
