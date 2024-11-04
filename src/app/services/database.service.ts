import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc, collection, query, getDocs } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private collectionName = 'servidores';

  constructor(private auth: Auth, private firestore: Firestore) { }

  async getUserData(uid: string) {
    if (uid) {
      const docRef = doc(this.firestore, 'usuarios', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } else {
      console.log('No user is currently signed in.');
      return null;
    }
  }

  async getAllUsers() {
    let usuarios: any = [];
    const q = query(collection(this.firestore, 'usuarios'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usuarios.push(doc.data());
    });
    return usuarios;
  }

  async addServer(server: { name: string; ip: string; location: string }): Promise<void> {
    const serverId = doc(collection(this.firestore, this.collectionName)).id;
    const serverRef = doc(this.firestore, this.collectionName, serverId);
    await setDoc(serverRef, server);
  }
  async getAllServers() {
    let servidores: any = [];
    const q = query(collection(this.firestore, 'servidores'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      servidores.push(doc.data());
    });
    return servidores;
  }
}
