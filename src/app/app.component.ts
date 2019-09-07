import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jamAngular';

  constructor(private usuarioService: UsuarioService) {
  }

  onLogOut() {

    localStorage.removeItem('user-token');
  }
}
