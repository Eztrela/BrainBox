import { Component } from '@angular/core';
import {MemoryBox, Note, Tag} from "./shared/models";
import {Task} from "./shared/models";
import {TaskService} from "./shared/services/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brainbox'
  memoryboxes: Array<MemoryBox> = new Array<MemoryBox>();
  constructor(private taskService: TaskService) {
    let memorybox = new MemoryBox(1, "title")

    this.memoryboxes.push(memorybox);

    let task1 = new Task(1, "title1", "description", "new", new Date(2020, 10, 22), 3);
    let task2 = new Task(2, "title2", "description", "new", new Date(2020, 10, 22), 3);

    memorybox.inserirTask(task1);
    memorybox.inserirTask(task2);

    console.log(this.memoryboxes[0].removerTask(2));

    let note1 = new Note(1, "content1");
    let note2 = new Note(2, "content2");

    memorybox.inserirNote(note1);
    memorybox.inserirNote(note2);

    console.log(this.memoryboxes[0].removerNote(2));

    let tag1 = new Tag(1, "title1", "#00000");
    let tag2 = new Tag(2, "title2", "#00000");
    let tag3 = new Tag(3, "title3", "#00000");

    memorybox.inserirTag(tag1);
    memorybox.inserirTag(tag2);
    memorybox.inserirTag(tag3);

    console.log(memorybox)

    console.log(this.memoryboxes[0].removerTag(2));

    console.log(memorybox)

    /*TESTES DE TASKSERVICE*/
    this.taskService.inserir(task1);
    this.taskService.inserir(task2);

    console.log(this.taskService.listar());
    console.log(`${this.taskService.get(1)} \n ${this.taskService.get(2)}`)
    console.log(this.taskService.remover(2));


  }


}
