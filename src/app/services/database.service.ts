import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc, collection, query, getDocs, addDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Server } from '../interfaces/server';
import { Incidente } from '../interfaces/incidente';

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
    let servidores: Array<Server> = [];
    const q = query(collection(this.firestore, 'servidores'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let server: Server = { id: '', name: '', ip: '', ubi: '' };
      let id: string = doc.id;
      server.id = id;
      server.name = doc.data()["name"];
      server.ip = doc.data()["ip"]
      server.ubi = doc.data()["location"]
      servidores.push(server);
    });
    return servidores;
  }


  async agregarIncidente(incidente: Incidente, id: string) {
    const incidentesRef = collection(this.firestore, 'incidentes', id, 'incidente');
    await addDoc(incidentesRef, incidente);
  }

  async obtenerIncidentes(server: Server) {
    let incidentes: Array<Incidente> = [];
    const q = query(collection(this.firestore, 'incidentes', server.id, 'incidente'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      let incidente: Incidente = { content: '', date: new Date, server, title: '' };
      incidente.content = doc.data()["content"];
      incidente.date = doc.data()["date"]
      incidentes.push(incidente);
    })
    return incidentes;

  }
}
