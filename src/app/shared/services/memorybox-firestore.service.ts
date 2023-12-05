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
    this.colecaoMemoryboxes.valueChanges({idField: 'id'}).subscribe((res) => {
      console.log(res);
    });
    return this.colecaoMemoryboxes.valueChanges({idField: 'id'});
  }

  create(memorybox: MemoryBox): Observable<MemoryBox> {
    return from(this.colecaoMemoryboxes.add(Object.assign({}, memorybox)))
      .pipe(
        map(docRef => {
          // Lógica para manipular a resposta do Firestore, se necessário
          // Por exemplo, se você espera que a resposta contenha o ID gerado, pode manipular aqui
          const newMemoryBox = { ...memorybox, id: +docRef.id } as MemoryBox;
          console.log(newMemoryBox);
          return newMemoryBox;
        })
      );
  }

  generateID(): Observable<number> {
    return this.getAll().pipe(
      map((res: MemoryBox[]) => {
        if (res && res.length > 0) {
          const maxId = Math.max(...res.map(box => {
            return  box.id ? box.id : 0
          }));
          return maxId + 1;
        } else {
          return 1;
        }
      })
    );
  }
}
