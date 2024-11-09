import { Component } from '@angular/core';

@Component({
  selector: 'app-servidores',
  standalone: true,
  imports: [],
  templateUrl: './servidores.component.html',
  styleUrl: './servidores.component.css'
})
export class ServidoresComponent {
  serverStatus() {
    console.log("ESTATUS ONLINE")
  }
  launchModal() {
    const myModal = document.getElementById('myModal')

    myModal!.addEventListener('shown.bs.modal', () => {
      console.log("MODAL")
    })
  }
}
