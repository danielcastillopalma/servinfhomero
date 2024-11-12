import { Component } from '@angular/core';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-servidores',
  standalone: true,
  imports: [],
  templateUrl: './servidores.component.html',
  styleUrl: './servidores.component.css'
})
export class ServidoresComponent {
  constructor(private pdf: PdfService) {

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
