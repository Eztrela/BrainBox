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

    let task1 = new Task(1, "title1", "description", "new", new Date(2020, 10, 22), 3);
    let task2 = new Task(2, "title2", "description", "new", new Date(2020, 10, 22), 3);

    memorybox.inserirTask(task1);
    memorybox.inserirTask(task2);

    console.log(memorybox.localizarTask(1));
    console.log(memorybox.localizarTask(123451));
    console.log(this.memoryboxes[0].removerTask(2));

    let note1 = new Note(1, "content1");
    let note2 = new Note(2, "content2");

    memorybox.inserirNote(note1);
    memorybox.inserirNote(note2);

    console.log(memorybox.localizarNote(1));
    console.log(memorybox.localizarNote(123451));
    console.log(this.memoryboxes[0].removerNote(2));

    let tag1 = new Tag(1, "title1", "#00000");
    let tag2 = new Tag(2, "title2", "#00000");
    let tag3 = new Tag(3, "title3", "#00000");

    memorybox.inserirTag(tag1);
    memorybox.inserirTag(tag2);
    memorybox.inserirTag(tag3);

    console.log(memorybox)

    console.log(memorybox.localizarTag(1));
    console.log(memorybox.localizarTag(123451));
    console.log(this.memoryboxes[0].removerTag(2));

    console.log(memorybox)

    /*TESTES DE TAG SERVICE*/
    this.tagService.inserir(tag1);
    this.tagService.inserir(tag2);
    this.tagService.inserir(tag3);

    console.log(this.tagService.listar());
    console.log(`${this.tagService.get(1)} \n ${this.tagService.get(2)}`)
    console.log(this.tagService.editar(1, "title", "newTitle"));
    console.log(`${this.tagService.get(1)}`)
    console.log(this.tagService.remover(2));

  }


}
