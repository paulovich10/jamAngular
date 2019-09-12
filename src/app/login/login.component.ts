import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) {

    this.formulario = new FormGroup({
      usuario: new FormControl(''),
      password: new FormControl('')

    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.usuarioService.login(this.formulario.value)
      .then(response => {

        if (response['token'] && response['username']) {
          console.log(response)
          localStorage.setItem('user-token', response['token']);
          localStorage.setItem('username', response['username']);
          alert('usuario logado con éxito')
          this.router.navigate(['/home']);
        } else {
          alert(response['error'])
        }
      })
  }


}


