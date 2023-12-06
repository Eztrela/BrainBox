import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MemoryBox } from '../models';
import { TaskEvent } from '../interfaces/task-event';
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

  getAllTasksWithColor(): Observable<TaskEvent[]> {
    return this.getAll().pipe(
      map((res: MemoryBox[]) => {
        let tasksWithColor: TaskEvent[] = [];

        for (let box of res) {
          for (let task of box.tasks) {
              const matchingTag = box.tags.find(tag => tag.id === task.tags[0]);
              const tagColor = matchingTag ? matchingTag.color : '#9593D9';

              tasksWithColor.push({
                task: task,
                idBox: box.id!,
                color: tagColor
              });
          }
        }

        return tasksWithColor;
      })
    );
  }


  delete(id: string): Observable<void> {
    return from(this.colecaoMemoryboxes.doc(id).delete());
  }

  update(id: string, memorybox: MemoryBox): Observable<void> {
    const updatedMemoryBox = {
      ...memorybox,
      notes: memorybox.notes.map(note => ({ ...note })),
      tasks: memorybox.tasks.map(task => ({ ...task})),
      tags: memorybox.tags.map(tag => ({ ...tag})),
    };
    return from(this.colecaoMemoryboxes.doc(id).update({...updatedMemoryBox}));
  }


}
