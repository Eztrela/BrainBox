import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MemoryBox } from '../models';
import { from, map, max, Observable, switchMap } from "rxjs";

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
    return from(this.colecaoMemoryboxes.add(Object.assign({}, memorybox))).pipe(
      switchMap(docRef => {
        // Após a criação do documento, você pode obter os dados do Kit a partir do DocumentReference
        return this.colecaoMemoryboxes.doc(docRef.id).get().pipe(
          map(doc => {
            // Certifique-se de ajustar conforme a estrutura real do seu objeto Kit
            return doc.data() as MemoryBox;
          })
        );
      })
    );
  }

  getById(id: string): Observable<MemoryBox> {
    return this.colecaoMemoryboxes.doc(id).get().pipe(map(document =>{
      const data = document.data()

      if (data) {
        return data;
    } else {
        throw new Error('MemoryBox not found'); // ou retorne um valor padrão, dependendo da lógica desejada
    }
    }));
  }

  delete(id: string): Observable<any> {
    return from(this.colecaoMemoryboxes.doc(id).delete());
  }

  update(id: string, memorybox: MemoryBox): Observable<any> {
    const updatedMemoryBox = {
      ...memorybox,
      notes: memorybox.notes.map(note => ({ ...note })),
      tasks: memorybox.tasks.map(task => ({ ...task})),
      tags: memorybox.tags.map(tag => ({ ...tag})),
    };
    return from(this.colecaoMemoryboxes.doc(id).update({...updatedMemoryBox}));
  }


}
