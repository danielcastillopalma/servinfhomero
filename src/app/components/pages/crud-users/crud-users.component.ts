import { Component } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-crud-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-users.component.html',
  styleUrl: './crud-users.component.css'
})
export class CrudUsersComponent {
  usuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',

    tipoUsuario: 'normal',
    organizacion: '',
    servidoresSeleccionados: []
  };
  contrasenan = '';

  servidores: string[] = ['Servidor 1', 'Servidor 2', 'Servidor 3', 'Servidor 4'];
  busqueda: string = '';

  constructor(private auth: AuthenticationService, private db: DatabaseService) {

  }

  agregarUsuario() {
    if (this.usuario.contrasena !== this.contrasenan) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    this.auth.agregarUsuario(this.usuario)
      .then(() => {
        this.limpiarFormulario();
        this.auth.logout();
      })
      .catch((error) => {
        console.error('Error al crear el usuario: ', error);
        alert('Ocurrió un error al crear el usuario: ' + error.message);
      });
  }

  limpiarFormulario() {
    this.usuario = {
      nombre: '',
      correo: '',
      contrasena: '',
      tipoUsuario: 'normal',
      organizacion: '',
      servidoresSeleccionados: []
    };
  }

  buscarServidores() {
    return this.servidores.filter(servidor =>
      servidor.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
}