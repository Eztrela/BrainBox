import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MemoryBox } from '../models';
import { from, map, max, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemoryboxFirestoreService {

  public colecaoMemoryboxes: AngularFirestoreCollection<MemoryBox>;
  NOME_COLECAO = 'memoryboxes'

  constructor(private afs:AngularFirestore) { 
    this.colecaoMemoryboxes = this.afs.collection(this.NOME_COLECAO);
  }

  getAll(): Observable<MemoryBox[]> {
    return this.colecaoMemoryboxes.valueChanges({idField: 'id'});
  }

  create(memorybox: MemoryBox): Observable<MemoryBox> {
    console.log(memorybox);
    delete memorybox.id;
    //@ts-ignore
    return from(this.colecaoMemoryboxes.add(Object.assign({}, memorybox)))
  }

  getById(id: string): Observable<MemoryBox> {
    return this.colecaoMemoryboxes.doc(id).get().pipe(map(document =>
      new MemoryBox(id, document.data())));
  }

  delete(memorybox: MemoryBox): Observable<any> {
    return from(this.colecaoMemoryboxes.doc(memorybox.id).delete());
  }

  update(memorybox: MemoryBox): Observable<void> {
    return from(this.colecaoMemoryboxes.doc(memorybox.id).update({...memorybox}));
  }


}
