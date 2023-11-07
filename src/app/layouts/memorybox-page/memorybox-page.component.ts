import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MemoryboxService} from "../../shared/services/memorybox.service";
import {MemoryBox} from "../../shared/models";

@Component({
  selector: 'app-memorybox-page',
  templateUrl: './memorybox-page.component.html',
  styleUrls: ['./memorybox-page.component.css']
})
export class MemoryboxPageComponent implements OnInit {
  public id: number = 0;
  public memorybox: any = {};
  constructor(private route: ActivatedRoute, private memoryBoxService: MemoryboxService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    })
    this.memoryBoxService.getById(this.id).subscribe((memorybox: MemoryBox) => {
      this.memorybox = memorybox;
    })
  }
}
