import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private auth: Auth, // Inyecta Auth desde app.config.ts
    private firestore: Firestore // Inyecta Firestore desde app.config.ts
  ) { }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
      });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error.message);
    });
  }

  async agregarUsuario(usuario: Usuario) {
    const credential = await createUserWithEmailAndPassword(this.auth, usuario.correo, usuario.contrasena!);
    const uid = credential.user?.uid;
    const usuarioSinContrasena = { ...usuario };
    delete usuarioSinContrasena.contrasena;

    await setDoc(doc(this.firestore, 'usuarios', uid), {
      ...usuarioSinContrasena,
      uid
    });
  }
}
