import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService) { }

  canActivate() {
    return this.usuarioService.isUserLogged();
  }

}
