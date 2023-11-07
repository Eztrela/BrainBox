import { Component } from '@angular/core';
import {MemoryBox, User} from "../../shared/models";
import {MemoryboxService} from "../../shared/services/memorybox.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  memoryboxes:Array<MemoryBox> = new Array<MemoryBox>();

  constructor(private memoryBoxService: MemoryboxService) {
  }
  ngOnInit() {
    let user3 = new User(1, "pabo@email.com", "pabo", "######", false);
    let user2 = new User(2, "lucas@email.com", "lucas", "######", false);
    let user1 = new User(3, "nato@email.com", "nato", "######", false);
    
    let memorybox1 = new MemoryBox(1, "Tal", user1);
    let memorybox2 = new MemoryBox(2, "🦉 Business Intelligence", user2);
    let memorybox3 = new MemoryBox(3, "️‍🏋️‍♂️ Musculação", user2)
    let memorybox4 = new MemoryBox(4, "🤖 Machine Learning", user3);

    this.memoryBoxService.create(memorybox1).subscribe((data: MemoryBox)=>{
      console.log(data);
    })
    this.memoryBoxService.create(memorybox2);
    this.memoryBoxService.create(memorybox3);
    this.memoryBoxService.create(memorybox4);

    this.memoryBoxService.getAll().subscribe((arrayMemoryboxes:Array<MemoryBox>) => {
      this.memoryboxes = arrayMemoryboxes;
      console.log(arrayMemoryboxes)
    });
  }
}
