import { Component, OnInit } from '@angular/core';
import { Task } from "../shared/models";
import { TaskService } from "../shared/services/task.service";
@Component({
  selector: 'app-listagemtasks',
  templateUrl: './listagemtasks.component.html',
  styleUrls: ['./listagemtasks.component.css']
})
export class ListagemtasksComponent {

  tasks: Task[] = [];

  constructor(public taskService: TaskService) { }

  ngOnInit() {

    let task1 = new Task(1, "Resumo Datawarehouses", "Lorem ipsum dolor sit amet, adipiscing enum", "new", new Date(2050, 10, 22), 3);
    let task2 = new Task(2, "Lavar louça", "Tá na cara", "new", new Date(2200, 10, 22), 1);
    let task3 = new Task(3, "Clean dataset", "Lorem ipsum dolor sit amet adipiscing enum", "new", new Date(2200, 10, 22), 5);

    this.taskService.create(task1).subscribe();
    this.taskService.create(task2).subscribe();
    this.taskService.create(task3).subscribe();

    this.taskService.getAll().subscribe((data: Task[])=> {
      this.tasks = data;
      console.log(data);
    })

  }


}
