import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient){}

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener(): Observable<boolean>{
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData = {email, password};
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string){
    const authData: AuthData = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;
        this.authStatusListener.next(true);
      });
  }
}
