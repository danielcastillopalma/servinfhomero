import { Injectable } from '@angular/core';
import { doc, getDoc, Firestore, query, collection, where, getDocs } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private auth: Auth, private firestore: Firestore) {

  }

  async getUserData(uid: any) {
    if (uid) {
      const docRef = doc(this.firestore, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
      } else {
        console.log("No such document!");
        return null
      }
    } else {
      console.log("No user is currently signed in.");
      return
    }
  }

  async getAllUsers() {
    let usuarios:any = []
    const q = query(collection(this.firestore, "usuarios"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usuarios.push(doc.data());
    });
    return usuarios;
  }
}

