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

    let task1 = new Task(1, "Resumo Datawarehouses", "Lorem ipsum dolor sit amet, adipiscing enum", "new", new Date(2050, 10, 22), 3);
    let task2 = new Task(2, "Lavar louça", "Tá na cara", "new", new Date(2200, 10, 22), 1);

    memorybox.inserirTask(task1);
    memorybox.inserirTask(task2);

    console.log(this.memoryboxes[0].removerTask(2));

    let note1 = new Note(1, "Lorem ipsum");
    let note2 = new Note(2, "Ipsum dolor");

    memorybox.inserirNote(note1);
    memorybox.inserirNote(note2);

    console.log(this.memoryboxes[0].removerNote(2));

    let tag1 = new Tag(1, "graduação", "#FF5733");
    let tag2 = new Tag(2, "self-care", "#4CFF33");
    let tag3 = new Tag(3, "estágio", "#33B2FF");

    memorybox.inserirTag(tag1);
    memorybox.inserirTag(tag2);
    memorybox.inserirTag(tag3);

    console.log(memorybox)

    console.log(this.memoryboxes[0].removerTag(2));

    console.log(memorybox)

    /*TESTES DE TASKSERVICE*/
    try {
      /* Testando generateID */
      console.log(this.taskService.generateID());
      this.taskService.inserir(task1);
      this.taskService.inserir(task2);
      console.log(this.taskService.generateID());

      /* Testando inserção e getter */
      console.log(this.taskService.listar());
      console.log(`${this.taskService.get(1)} \n ${this.taskService.get(2)}`)

      /* Testando edição */
      this.taskService.editar(1, "title", "Resumo BI");

      /* Adicionar tags à task1 */
      this.taskService.inserirTag(1, tag1);
      this.taskService.inserirTag(1, tag2);
      this.taskService.inserirTag(1, tag3);

      /* Adicionar tags à task2 */
      this.taskService.inserirTag(2, tag1);
      this.taskService.inserirTag(2, tag2);

      /* Localizar tags de task1 */
      console.log(this.taskService.localizarTag(1, 1));
      console.log(this.taskService.localizarTag(1, 2));
      console.log(this.taskService.localizarTag(1, 3));

      /* Remover tags de task1 */
      console.log(this.taskService.removerTag(1, 1));
      console.log(this.taskService.removerTag(1, 2));
      console.log(this.taskService.localizarTag(1,1));

      /* Averiguando mudanças em task1 */
      console.log(`${this.taskService.get(1)}`)

      /* Removendo task2 */
      console.log(this.taskService.remover(2));

    } catch (e) {
      console.log((e as Error).message);
    }

  }


}
