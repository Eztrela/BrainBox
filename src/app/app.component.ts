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

  constructor(private memoryBoxService: MemoryboxService,private userService: UserService, private tagService: TagService, private taskService: TaskService, private noteService: NoteService) {
    

    

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

    let note1 = new Note(1, "Lorem ipsum");
    let note2 = new Note(2, "Ipsum dolor");
    let note3 = new Note(3, "Sit amet");

    let tag1 = new Tag(1, "graduação", "#FF5733");
    let tag2 = new Tag(2, "self-care", "#4CFF33");
    let tag3 = new Tag(3, "estágio", "#33B2FF");

    //TESTES DE TASKSERVICE
    try {
      //Testando generateID

      // console.log(this.taskService.generateID());
      this.taskService.create(task1).subscribe();
      this.taskService.create(task2).subscribe();
      // console.log(this.taskService.generateID());

      //Testando inserção e getByIdter
      // console.log(this.taskService.getAll());
      // console.log(`${this.taskService.getById(1)} \n ${this.taskService.getById(2)}`)

      //Testando edição
      task1.title = "Resumo BI"
      this.taskService.update(1, task1);

      //Adicionar tags à task1

      // this.taskService.createTag(1, tag1);
      // this.taskService.createTag(1, tag2);
      // this.taskService.createTag(1, tag3);

      //Adicionar tags à task2
      // this.taskService.createTag(2, tag1);
      // this.taskService.createTag(2, tag2);

      //Localizar tags de task1

      // console.log(this.taskService.getById(1));
      // console.log(this.taskService.getById(2));
      // console.log(this.taskService.getById(3));

      //Remover tags de task1

      // console.log(this.taskService.deleteTag(1, 1));
      // console.log(this.taskService.deleteTag(1, 2));
      // console.log(this.taskService.getById(1));


      //Averiguando mudanças em task1
      // console.log(`${this.taskService.getById(1)}`)

      //Removendo task2

      console.log(this.taskService.delete(2));
      } catch (e) {
        console.log((e as Error).message)
    }


    //Testes de memoryBoxService

    try {
      this.memoryBoxService.create(memorybox1);
      this.memoryBoxService.create(memorybox2);
      this.memoryBoxService.create(memorybox3);
      this.memoryBoxService.create(memorybox4);

      // console.log(this.memoryBoxService.getAll());
      // console.log(this.memoryBoxService.getById(2));
      memorybox1.title = "🎨 Abstração de Código"
      this.memoryBoxService.update(1, memorybox1);
      // console.log(this.memoryBoxService.getById(1));


      //Inserção de tags

      // this.memoryBoxService.createTag(1, tag1);
      // this.memoryBoxService.createTag(1, tag2);
      // this.memoryBoxService.createTag(1, tag3);
      // this.memoryBoxService.createTag(2, tag2);
      // this.memoryBoxService.createTag(3, tag3);


      // //Inserção de tasks

      // this.memoryBoxService.createTask(1, task1);
      // this.memoryBoxService.createTask(1, task2);
      // this.memoryBoxService.createTask(2, task2);
      // this.memoryBoxService.createTask(3, task3);


      // //Inserção de notes

      // this.memoryBoxService.createNote(1, note1);
      // this.memoryBoxService.createNote(1, note2);
      // this.memoryBoxService.createNote(2, note2);
      // this.memoryBoxService.createNote(3, note3);

      // console.log(this.memoryBoxService.getAll());


      //Remoção de elementos

      // console.log(this.memoryBoxService.deleteTag(1, 2));
      // console.log(this.memoryBoxService.deleteTag(1, 3));
      // console.log(this.memoryBoxService.deleteTask(1, 2));
      // console.log(this.memoryBoxService.deleteNote(1, 2));
      // console.log(this.memoryBoxService.getAll())


      //Getters de relacionamentos

      // console.log(this.memoryBoxService.getTag(1, 1));
      // console.log(this.memoryBoxService.getTask(2, 2));
      // console.log(this.memoryBoxService.getNote(3, 3));

    } catch (e) {
      console.log((e as Error).message)
    }


    //TESTES DE USER SERVICE

    try {
      this.userService.create(user1);
      this.userService.create(user2);
      this.userService.create(user3);
      // console.log(this.userService.getAll());
      // console.log(`${this.userService.getById(1)} \n ${this.userService.getById(2)}`);
      user1.username = "newUsername"
      // console.log(this.userService.update(1, user1));
      // console.log(`${this.userService.getById(1)}`);
      // console.log(this.userService.delete(2));
    } catch (e) {
      console.log((e as Error).message);
    }



    try {
      //Geração de ID

      // console.log(this.tagService.generateID());
      this.tagService.create(tag1);
      this.tagService.create(tag2);
      this.tagService.create(tag3);
      // console.log(this.tagService.generateID());


      //Teste listagem e getByIdters
      // console.log(this.tagService.getAll());
      // console.log(`${this.tagService.getById(1)} \n ${this.tagService.getById(2)}`)

      /* Teste edição */
      tag1.title = "Graduação"
      // console.log(this.tagService.update(1,tag1));
      // console.log(`${this.tagService.getById(1)}`)

      //Remover tag 2
      // console.log(this.tagService.delete(2));

    } catch (e) {
      console.log((e as Error).message);
    }


    //TESTES DE NOTE SERVICE

    try {
      this.noteService.create(note1);
      this.noteService.create(note2);

      // console.log(this.noteService.getAll());
      // console.log(`${this.noteService.getById(1)} \n ${this.noteService.getById(2)}`);
      note1.content = "https://www.udemy.com/course/clean-code-na-pratica/"
      // console.log(this.noteService.update(1, note1));
      // console.log(`${this.noteService.getById(1)}`);
      // console.log(this.noteService.delete(2));
      // console.log(this.noteService.getById(2));
    } catch (e) {
      console.log((e as Error).message);
    }

  }


}
