import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Server } from '../../../interfaces/server';
import { Incidente } from '../../../interfaces/incidente';
import { PdfService } from '../../../services/pdf.service';


@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './server-list.component.html',
  styleUrl: './server-list.component.css'
})
export class ServerListComponent {
  servers: Array<Server> = []
  date: Date = new Date;
  contentIncident: string = ""
  constructor(private db: DatabaseService, private http: HttpClient, private pdf: PdfService) {
    this.db.getAllServers().then((res) => {

      this.servers = res
    })


  }

  serverStatus(server: any) {
    console.log("ESTATUS ONLINE")
  }
  generatePDF(server: Server) {
    this.pdf.generatePdf(server);
  }

  guardarIncidente(server: Server, date: Date) {
    let incidente: Incidente = { title: '', server: { id: '', ip: '', name: '', ubi: '' }, content: "", date: this.date };
    incidente.server = server;
    incidente.date = date;
    incidente.content = (document.getElementById("txtAreaIncidente") as HTMLInputElement).value;
    this.db.agregarIncidente(incidente, server.id);

  }
}






