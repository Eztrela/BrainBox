import { Component } from '@angular/core';
import { MemoryBox, Note, Tag, User, Task } from "./shared/models";
import { TagService } from "./shared/services/tag.service";
import { MemoryboxService } from "./shared/services/memorybox.service";
import { UserService } from './shared/services/user.service';
import { TaskService } from "./shared/services/task.service";
import { NoteService } from './shared/services/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brainbox';

  constructor() {

    /*
    private memoryBoxService: MemoryboxService,private userService: UserService, private tagService: TagService, private taskService: TaskService, private noteService: NoteService

    let user3 = new User(1, "pabo@email.com", "pabo", "######", false);
    let user2 = new User(2, "lucas@email.com", "lucas", "######", false);
    let user1 = new User(3, "nato@email.com", "nato", "######", false);

    let memorybox1 = new MemoryBox(1, "Tal", user1);
    let memorybox2 = new MemoryBox(2, "🦉 Business Intelligence", user2);
    let memorybox3 = new MemoryBox(3, "️‍🏋️‍♂️ Musculação", user2)
    let memorybox4 = new MemoryBox(4, "🤖 Machine Learning", user3);

    let task1 = new Task(1, "Resumo Datawarehouses", "Lorem ipsum dolor sit amet, adipiscing enum", "new", new Date(2050, 10, 22), 3);
    let task2 = new Task(2, "Lavar louça", "Tá na cara", "new", new Date(2200, 10, 22), 1);
    let task3 = new Task(3, "Clean dataset", "Lorem ipsum dolor sit amet adipiscing enum", "new", new Date(2200, 10, 22), 5);

    let note1 = new Inote(1, "Lorem ipsum");
    let note2 = new Inote(2, "Ipsum dolor");
    let note3 = new Inote(3, "Sit amet");

    let tag1 = new Tag(1, "graduação", "#FF5733");
    let tag2 = new Tag(2, "self-care", "#4CFF33");
    let tag3 = new Tag(3, "estágio", "#33B2FF");

    //TESTES DE TASKSERVICE
    try {
      //Testando generateID

      console.log(this.taskService.generateID());
      this.taskService.inserir(task1);
      this.taskService.inserir(task2);
      console.log(this.taskService.generateID());

      //Testando inserção e getter
      console.log(this.taskService.listar());
      console.log(`${this.taskService.get(1)} \n ${this.taskService.get(2)}`)

      //Testando edição
      this.taskService.editar(1, "title", "Resumo BI");

      //Adicionar tags à task1

      this.taskService.inserirTag(1, tag1);
      this.taskService.inserirTag(1, tag2);
      this.taskService.inserirTag(1, tag3);

      //Adicionar tags à task2
      this.taskService.inserirTag(2, tag1);
      this.taskService.inserirTag(2, tag2);

      //Localizar tags de task1

      console.log(this.taskService.localizar(1));
      console.log(this.taskService.localizar(2));
      console.log(this.taskService.localizar(3));

      //Remover tags de task1

      console.log(this.taskService.removerTag(1, 1));
      console.log(this.taskService.removerTag(1, 2));
      console.log(this.taskService.localizar(1));


      //Averiguando mudanças em task1
      console.log(`${this.taskService.get(1)}`)

      //Removendo task2

      console.log(this.taskService.remover(2));
      } catch (e) {
        console.log((e as Error).message)
    }


    //Testes de memoryBoxService

    try {
      this.memoryBoxService.inserir(memorybox1);
      this.memoryBoxService.inserir(memorybox2);
      this.memoryBoxService.inserir(memorybox3);
      this.memoryBoxService.inserir(memorybox4);

      console.log(this.memoryBoxService.listar());
      console.log(this.memoryBoxService.get(2));

      this.memoryBoxService.editar(1, "title", "🎨 Abstração de Código");
      console.log(this.memoryBoxService.get(1));


      //Inserção de tags

      this.memoryBoxService.inserirTag(1, tag1);
      this.memoryBoxService.inserirTag(1, tag2);
      this.memoryBoxService.inserirTag(1, tag3);
      this.memoryBoxService.inserirTag(2, tag2);
      this.memoryBoxService.inserirTag(3, tag3);


      //Inserção de tasks

      this.memoryBoxService.inserirTask(1, task1);
      this.memoryBoxService.inserirTask(1, task2);
      this.memoryBoxService.inserirTask(2, task2);
      this.memoryBoxService.inserirTask(3, task3);


      //Inserção de notes

      this.memoryBoxService.inserirNote(1, note1);
      this.memoryBoxService.inserirNote(1, note2);
      this.memoryBoxService.inserirNote(2, note2);
      this.memoryBoxService.inserirNote(3, note3);

      console.log(this.memoryBoxService.listar());


      //Remoção de elementos

      console.log(this.memoryBoxService.removerTag(1, 2));
      console.log(this.memoryBoxService.removerTag(1, 3));
      console.log(this.memoryBoxService.removerTask(1, 2));
      console.log(this.memoryBoxService.removerNote(1, 2));
      console.log(this.memoryBoxService.listar())


      //Getters de relacionamentos

      console.log(this.memoryBoxService.getTag(1, 1));
      console.log(this.memoryBoxService.getTask(2, 2));
      console.log(this.memoryBoxService.getNote(3, 3));

    } catch (e) {
      console.log((e as Error).message)
    }


    //TESTES DE USER SERVICE

    try {
      this.userService.inserir(user1);
      this.userService.inserir(user2);
      this.userService.inserir(user3);
      console.log(this.userService.listar());
      console.log(`${this.userService.get(1)} \n ${this.userService.get(2)}`);
      console.log(this.userService.editar(1, "username", "newUsername"));
      console.log(`${this.userService.get(1)}`);
      console.log(this.userService.remover(2));
    } catch (e) {
      console.log((e as Error).message);
    }



    try {
      //Geração de ID

      console.log(this.tagService.generateID());
      this.tagService.inserir(tag1);
      this.tagService.inserir(tag2);
      this.tagService.inserir(tag3);
      console.log(this.tagService.generateID());


      //Teste listagem e getters
      console.log(this.tagService.listar());
      console.log(`${this.tagService.get(1)} \n ${this.tagService.get(2)}`)

      //Teste edição
      console.log(this.tagService.editar(1, "title", "newTitle"));
      console.log(`${this.tagService.get(1)}`)

      //Remover tag 2
      console.log(this.tagService.remover(2));

    } catch (e) {
      console.log((e as Error).message);
    }


    //TESTES DE NOTE SERVICE

    try {
      this.noteService.inserir(note1);
      this.noteService.inserir(note2);

      console.log(this.noteService.listar());
      console.log(`${this.noteService.get(1)} \n ${this.noteService.get(2)}`);
      console.log(this.noteService.editar(1, "content", "newContent"));
      console.log(`${this.noteService.get(1)}`);
      console.log(this.noteService.remover(2));
      console.log(this.noteService.localizar(2));
    } catch (e) {
      console.log((e as Error).message);
    }


     */


  }


}
