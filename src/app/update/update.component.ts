import { Component, OnInit } from '@angular/core';
import { ConductoresService } from '../conductores.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  formUpdate: FormGroup;
  formulario: FormGroup;
  usuario: any;

  constructor(private conductoresService: ConductoresService, private router: Router, private usuariosService: UsuarioService) {
    this.formUpdate = new FormGroup({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      fecha_nacimiento: new FormControl(''),
      email: new FormControl(''),
      usuario: new FormControl('')

    });


  }

  async ngOnInit() {
    // Recupero los datos del usuario que está logado
    this.usuario = await this.usuariosService.profile()

    // Actualizo los valores de los campos de texto. 
    this.formUpdate.controls['nombre'].setValue(this.usuario.nombre);
    this.formUpdate.controls['apellidos'].setValue(this.usuario.apellidos);
    this.formUpdate.controls['email'].setValue(this.usuario.email);

    this.formUpdate.controls['fecha_nacimiento'].setValue(moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD'));

    this.formUpdate.controls['usuario'].setValue(this.usuario.usuario);


  }

  onSubmit() {
    console.log(this.formUpdate.value);
    this.usuariosService.update(this.formUpdate.value)
      .then((response) => {
        console.log(response);
        if (response['affectedRows'] == 1) {
          alert('usuario modificado');
          this.router.navigate(['/profile']);
        } else {
          alert('Error en la modificación. Inténtalo más tarde.');
        }
      })

      .catch(err => {
        alert('Error en el registro. Inténtalo más tarde.');

      })

  }

}
