import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Server } from '../interfaces/server';
import { Incidente } from '../interfaces/incidente';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private db: DatabaseService) { }


  generatePdf(server: Server) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de estado de servidor', 10, 10);
    doc.setFontSize(12);
    doc.text('Codigo de servidor: ' + server.id, 10, 20);
    doc.text('Nombre de servidor: ' + server.name, 10, 30);

    const headers = [['Fecha incidente', 'Descripcion Incidente', 'Criticidad']];
    const data: any = []
    let incidentes: Array<Incidente> = []
    this.db.obtenerIncidentes(server).then((res) => {
      incidentes = res;
      for (let inci of incidentes) {
        console.log(inci)
        data.push([inci.date, inci.content, 'Criticidad'])
      }
      autoTable(doc, { head: headers, body: data, startY: 40 });
      doc.save('table.pdf');

    });


  }




  ejemploGeneratePDF() {
    const doc = new jsPDF(); //Se inicializa un nuevo documento.

    //Acá, por linea se debe indicar el tamaño de la fuente si es que se requiere que cambie.
    doc.setFontSize(16);
    doc.text('Titulo de prueba', 10, 10);//El texto contiene como primer parametro el contenido del texto, como seguno parametro la coordenada x y como tercer parametro la cordenada Y
    doc.setFontSize(12);
    doc.text('Parrafo de prueba', 10, 20);


    //Método de creación de tabla
    const headers = [['col1', 'col2', 'col3']];
    const data = [['campo1', 'campo2', 'campo3'],
    ['campo4', 'campo5', 'campo6']];
    autoTable(doc, { head: headers, body: data, startY: 30 });

    doc.save('table.pdf');
  }
}
