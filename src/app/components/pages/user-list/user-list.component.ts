import { Component } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  usuarios=[]
  constructor(private db: DatabaseService) {
    this.db.getAllUsers().then((res) => {
      this.usuarios=res
    })
  }

}
