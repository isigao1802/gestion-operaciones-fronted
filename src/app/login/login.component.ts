// login.component.ts (Componente de Inicio de Sesión)
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Manejar la respuesta de inicio de sesión
      },
      error => {
        // Manejar errores
      }
    );
  }
}

