import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from '../interfaces/Part';
import { PartService } from '../services/part.service';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  allParts: Observable<Part[]>;
  query: string;
  constructor(private partservice :PartService,private router: Router) { }

  ngOnInit() {
    this.GetParts();
  }

  GetParts(){
    this.allParts = this.partservice.getAllParts();
  }

  
  loadPartToEdit(id: number)
  {
    this.router.navigate(['/part/new/' + id]);
  }
  
  deletePart(id: number)
  {
    this.partservice.DeletePart(id).subscribe((data)=>{
      console.log("success");
    });
    this.router.navigate(['/part/list/']);
  }
  
}
