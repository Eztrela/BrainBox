import { Component } from '@angular/core';
import {MemoryBox, Note, Tag} from "./shared/models";
import {Task} from "./shared/models";
import {TagService} from "./shared/services/tag.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brainbox'
  memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();
  constructor(private tagService: TagService) {
    let memorybox = new MemoryBox(1, "title")

    this.memoryboxes.push(memorybox);

    let task1 = new Task(1, "Resumo Datawarehouses", "Lorem ipsum dolor sit amet, adipiscing enum", "new", new Date(2050, 10, 22), 3);
    let task2 = new Task(2, "Lavar louça", "Tá na cara", "new", new Date(2200, 10, 22), 1);

    memorybox.inserirTask(task1);
    memorybox.inserirTask(task2);

    console.log(memorybox.localizarTask(1));
    console.log(memorybox.localizarTask(123451));
    console.log(this.memoryboxes[0].removerTask(2));

    let note1 = new Note(1, "Lorem ipsum");
    let note2 = new Note(2, "Ipsum dolor");

    memorybox.inserirNote(note1);
    memorybox.inserirNote(note2);

    console.log(memorybox.localizarNote(1));
    console.log(memorybox.localizarNote(123451));
    console.log(this.memoryboxes[0].removerNote(2));

    let tag1 = new Tag(1, "graduação", "#FF5733");
    let tag2 = new Tag(2, "self-care", "#4CFF33");
    let tag3 = new Tag(3, "estágio", "#33B2FF");

    memorybox.inserirTag(tag1);
    memorybox.inserirTag(tag2);
    memorybox.inserirTag(tag3);

    console.log(memorybox)

    console.log(memorybox.localizarTag(1));
    console.log(memorybox.localizarTag(123451));
    console.log(this.memoryboxes[0].removerTag(2));

    console.log(memorybox)

    /*TESTES DE TAG SERVICE*/
    try {
      /* Geração de ID */
      console.log(this.tagService.generateID());
      this.tagService.inserir(tag1);
      this.tagService.inserir(tag2);
      this.tagService.inserir(tag3);
      console.log(this.tagService.generateID());

      /* Teste listagem e getters */
      console.log(this.tagService.listar());
      console.log(`${this.tagService.get(1)} \n ${this.tagService.get(2)}`)

      /* Teste edição */
      console.log(this.tagService.editar(1, "title", "newTitle"));
      console.log(`${this.tagService.get(1)}`)

      /* Remover tag 2*/
      console.log(this.tagService.remover(2));
    } catch (e) {
      console.log((e as Error).message);
    }

  }


}
