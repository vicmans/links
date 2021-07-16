import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {catchError, tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUri: string

  private user$: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.apiUri = environment.apiUri
    this.user$ = new BehaviorSubject<User>(null);
  }

  login(data: any) {
    return this.http.post(`${this.apiUri}/login`, data).pipe(
      tap(
        (token: any) => {
          this.setToken(token.token)
          this.getUserApi(1).subscribe()
          this.router.navigate(['/links'])
        }
      ),
      catchError(error => {
        this.router.navigate(['/links'])
        return throwError(error)
      })
    )
  }

  register(data: any) {
    return this.http.post(`${this.apiUri}/register`, data).pipe(
      tap(
        (user: any) => {
          this.router.navigate(['/links'])
          this.getUserApi(user.id)
        }
      )
    )
  }

  getUserApi(id: number) {
    return this.http.get(`${this.apiUri}/user/${id}`).pipe(
      tap((user: any) => {
        this.setUser(user)
        this.user$.next(user)
      })
    )
  }

  getUser(): Observable<User> {
    return this.user$.asObservable()
  }

  protected setUser(newState: User): void {
    this.user$.next({
      ...newState,
    });
  }

  setToken(token: string): void{
    localStorage.setItem('token', token)
  }

  logout() {
    this.setUser(null)
    localStorage.clear()
  }
}

export interface UserModel {
  id?: number,
  createdAt?: string,
  name?: string,
  email?: string,
  avatar?: string
}

export type User = UserModel|null