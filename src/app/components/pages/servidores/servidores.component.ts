import { Component } from '@angular/core';
import { PdfService } from '../../../services/pdf.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { DatabaseService } from '../../../services/database.service';
import { CommonModule, NgForOf } from '@angular/common';
import { Server } from '../../../interfaces/server';

@Component({
  selector: 'app-servidores',
  standalone: true,
  imports: [CommonModule,NgForOf],
  templateUrl: './servidores.component.html',
  styleUrl: './servidores.component.css'
})
export class ServidoresComponent {
  servidores: Server[] | null = []
  constructor(private pdf: PdfService, private auth: Auth, private db: DatabaseService) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.db.getUserServers(user).then((res) => {
          this.servidores = res;
          console.log(this.servidores)

        })
      }
    });
  }
  serverStatus() {
    console.log("ESTATUS ONLINE")
  }
  launchModal() {
    const myModal = document.getElementById('myModal')

    myModal!.addEventListener('shown.bs.modal', () => {
      console.log("MODAL")
    })
  }

  generatePDF() {
    //this.pdf.generatePDF();
  }
}
