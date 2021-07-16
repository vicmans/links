import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      component: LoginComponent
    },{
      path: 'login',
      component: LoginComponent
    },{
      path: 'register',
      component: RegisterComponent
    },
  ]
}]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
