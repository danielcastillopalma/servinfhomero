import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: any;
  public admin: boolean;

  constructor(private auth: Auth, private router: Router, private db: DatabaseService) {
    this.admin = false;
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log("LOGUEADO");
        this.usuario = user;
        this.db.getUserData(this.usuario.uid).then((res) => {
         if(res!["tipoUsuario"]=="admin"){
          this.admin = true;
         }
        })


      } else {
        this.usuario = null;
      }
    });
  }

  logOut() {
    signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error.message);
    });
  }


}
