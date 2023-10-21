import { Component } from '@angular/core';
import {MemoryboxService} from "./shared/services/memorybox.service";
import {MemoryBox, Note, Tag, User, Task} from "./shared/models";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brainbox';
  constructor(private memoryBoxService: MemoryboxService) {

    let user3 = new User(1, "pabo@email.com", "pabo", "######", false);
    let user2 = new User(2, "lucas@email.com", "lucas", "######", false);
    let user1 = new User(1, "nato@email.com", "nato", "######", false);

    let memorybox1 = new MemoryBox(1, "Tal", user1);
    let memorybox2 = new MemoryBox(2, "Musculação", user2);
    let memorybox3 = new MemoryBox(3, "Machine Learning", user3);

    let task1 = new Task(1, "Resumo Datawarehouses", "Lorem ipsum dolor sit amet, adipiscing enum", "new", new Date(2050, 10, 22), 3);
    let task2 = new Task(2, "Lavar louça", "Tá na cara", "new", new Date(2200, 10, 22), 1);
    let task3 = new Task(3, "Clean dataset", "Lorem ipsum dolor sit amet adipiscing enum", "new", new Date(2200, 10, 22), 5);

    let note1 = new Note(1, "Lorem ipsum");
    let note2 = new Note(2, "Ipsum dolor");
    let note3 = new Note(3, "Sit amet");

    let tag1 = new Tag(1, "graduação", "#FF5733");
    let tag2 = new Tag(2, "self-care", "#4CFF33");
    let tag3 = new Tag(3, "estágio", "#33B2FF");

    /* Testes de memoryBoxService */
    try {
      this.memoryBoxService.inserir(memorybox1);
      this.memoryBoxService.inserir(memorybox2);
      this.memoryBoxService.inserir(memorybox3);

      console.log(this.memoryBoxService.listar());
      console.log(this.memoryBoxService.get(2));

      this.memoryBoxService.editar(1, "title", "PWEB1");
      console.log(this.memoryBoxService.get(1));

      /* Inserção de tags */
      this.memoryBoxService.inserirTag(1, tag1);
      this.memoryBoxService.inserirTag(1, tag2);
      this.memoryBoxService.inserirTag(1, tag3);
      this.memoryBoxService.inserirTag(2, tag2);
      this.memoryBoxService.inserirTag(3, tag3);

      /* Inserção de tasks */
      this.memoryBoxService.inserirTask(1, task1);
      this.memoryBoxService.inserirTask(1, task2);
      this.memoryBoxService.inserirTask(2, task2);
      this.memoryBoxService.inserirTask(3, task3);

      /* Inserção de notes */
      this.memoryBoxService.inserirNote(1, note1);
      this.memoryBoxService.inserirNote(1, note2);
      this.memoryBoxService.inserirNote(2, note2);
      this.memoryBoxService.inserirNote(3, note3);

      console.log(this.memoryBoxService.listar());

      /* Remoção de elementos */
      console.log(this.memoryBoxService.removerTag(1, 2));
      console.log(this.memoryBoxService.removerTag(1, 3));
      console.log(this.memoryBoxService.removerTask(1, 2));
      console.log(this.memoryBoxService.removerNote(1, 2));
      console.log(this.memoryBoxService.listar())

      /* Getters de relacionamentos */
      console.log(this.memoryBoxService.getTag(1, 1));
      console.log(this.memoryBoxService.getTask(2, 2));
      console.log(this.memoryBoxService.getNote(3, 3));

    } catch (e) {
      console.log((e as Error).message)
    }



  }


}
