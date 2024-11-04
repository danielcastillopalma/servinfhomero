import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment.development';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  app = initializeApp(environment.firebaseConfig);
  public auth = getAuth(this.app);
  constructor(private router: Router, private firestore: Firestore) {

  }

  login(email: string, password: string) {

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigateByUrl('/home')
      })
      .catch((error) => {
        console.log("SESION no INICIADA")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home')
    }).catch((error) => {
      // An error happened.
    });
  }


  async agregarUsuario(usuario: Usuario) {
    const credential = await createUserWithEmailAndPassword(this.auth, usuario.correo, usuario.contrasena);

    const uid = credential.user?.uid;

    await setDoc(doc(this.firestore, 'usuarios', uid), {
      ...usuario,
      uid
    });
  }

}