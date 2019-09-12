import { Component, OnInit } from '@angular/core';
import { ConductoresService } from '../conductores.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  formUpdate: FormGroup;
  formulario: FormGroup;
  usuario: any;

  constructor(private conductoresService: ConductoresService, private router: Router, private usuariosServices: UsuarioService) {
    this.formUpdate = new FormGroup({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      fecha_nacimiento: new FormControl(''),
      email: new FormControl(''),
      usuario: new FormControl(''),
      password: new FormControl(''),
      password_repeat: new FormControl('')

    });


  }

  async ngOnInit() {
    // Recupero los datos del usuario que está logado
    this.usuario = await this.usuariosServices.profile()

    // Actualizo los valores de los campos de texto. Contra más los actualizo más los uso.
    this.formUpdate.controls['nombre'].setValue(this.usuario.nombre);
    this.formUpdate.controls['apellidos'].setValue(this.usuario.apellidos);

  }

}
