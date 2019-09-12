import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { ConductoresService } from './conductores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jamAngular';

  constructor(private usuarioService: UsuarioService, private conductoresService: ConductoresService, private router: Router) {
  }

  onLogOut() {

    localStorage.removeItem('user-token');
    this.router.navigate(['/home']);
  }
}
