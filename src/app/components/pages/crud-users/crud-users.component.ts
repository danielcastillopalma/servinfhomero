import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { DatabaseService } from '../../../services/database.service';
import { Server } from '../../../interfaces/server';

@Component({
  selector: 'app-crud-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-users.component.html',
  styleUrl: './crud-users.component.css'
})
export class CrudUsersComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',

    tipoUsuario: 'normal',
    organizacion: '',
    servidoresSeleccionados: []
  };
  contrasenan = '';
  ngOnInit(): void {
    this.obtenerServidores();
  }
  servidores: Server[] = [];
  serverSelect: Server[] = []
  busqueda: string = '';

  constructor(private auth: AuthenticationService, private db: DatabaseService) {

  }

  agregarUsuario() {
    if (this.usuario.contrasena !== this.contrasenan) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    this.usuario.servidoresSeleccionados=this.serverSelect
    console.log(this.serverSelect)
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
  async obtenerServidores() {
    this.db.getAllServers().then((res) => {
      for (let ser in res) {
        this.servidores.push(res[ser])
      }
    })
  }

}