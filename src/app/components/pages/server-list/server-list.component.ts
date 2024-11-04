import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-list.component.html',
  styleUrl: './server-list.component.css'
})
export class ServerListComponent {
  servers = []
  constructor(private db: DatabaseService) {
    this.db.getAllServers().then((res) => {
      this.servers = res
    })
  }
}
