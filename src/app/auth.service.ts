import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post('/auth/login', { username, password });
  }

  // Agrega otros métodos de autenticación aquí, como registro, cierre de sesión, etc.
}
