import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-crud-servers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crud-servers.component.html',
  styleUrl: './crud-servers.component.css'
})
export class CrudServersComponent {
  serverForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    this.serverForm = this.fb.group({
      name: ['', Validators.required],
      ip: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]],
      location: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.serverForm.valid) {
      this.databaseService.addServer(this.serverForm.value)
        .then(() => {
          console.log('Servidor agregado con éxito!');
          this.serverForm.reset(); // Limpiar el formulario después de agregar
        })
        .catch(error => {
          console.error('Error al agregar el servidor:', error);
        });
    }
  }
}
