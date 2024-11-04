import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { onAuthStateChanged } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuario: any;
  constructor(private auth: AuthenticationService) {

    onAuthStateChanged(this.auth.auth, (user) => {
      if (user) {
        console.log("LOGUEADO")
        this.usuario = user;
        //this.perm.setAdmin(this.usuario.uuid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
  logOut() {
    this.auth.logout();
  }

}
