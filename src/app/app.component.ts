import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { ConductoresService } from './conductores.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jamAngular';

  constructor(private usuarioService: UsuarioService, private conductoresService: ConductoresService) {
  }

  onLogOut() {

    localStorage.removeItem('user-token');
  }
}
