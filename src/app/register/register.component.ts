import { Component, OnInit } from '@angular/core';
import { ConductoresService } from '../conductores.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup

  constructor(private conductoresService: ConductoresService, private router: Router) {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      fecha_nacimiento: new FormControl(''),
      email: new FormControl(''),
      usuario: new FormControl(''),
      password: new FormControl(''),
      password_repeat: new FormControl('')

    });


  }

  ngOnInit() {
  }

  onSubmit() {
    this.conductoresService.create(this.formulario.value)

      .then(response => {
        console.log(response)
        if (response['token'] && response['usuario']) {
          localStorage.setItem('user-token', response['token']);
          localStorage.setItem('usuario', JSON.stringify(response['usuario']));
          //console.log(response);
          this.router.navigate(['/home']);
        } else {
          alert('Error en el registro. Inténtalo más tarde. 1');
        }

      })
      .catch(err => {
        console.log(err)
        alert('Error en el registro. Inténtalo más tarde. 2');
      });
  }

}