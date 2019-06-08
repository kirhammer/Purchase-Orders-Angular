import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { PartService } from '../services/part.service';

import { PartComponent } from '../part/part.component';

import { Part } from '../interfaces/Part';

@Component({
  selector: 'app-new-part',
  templateUrl: './new-part.component.html',
  styleUrls: ['./new-part.component.css']
})
export class NewPartComponent implements OnInit {
  partForm: any;
  partComponent: PartComponent;
  IdPart: string;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private partService :PartService
  ) { }

  ngOnInit() {
    this.partForm = this.formbuilder.group({
      Id: [''],
      Description: ['',[Validators.required]]
    });
    this.route.paramMap.subscribe(
      (params: ParamMap)=> {
        this.IdPart = params.get('id');
        this.getPart();
      }
    );
  }

  getPart(){
    this.partService.GetPart(this.IdPart).subscribe(
      part=>{
        this.partForm.controls['Id'].setValue(part.Id);
        this.partForm.controls['Description'].setValue(part.Description);
      }
    );
  }

  onFormSubmit(){
    this.CreatePart(this.partForm.value);
    this.router.navigate(['/part/list/']);
  }

  CreatePart(part: Part){
    this.partService.CreatePart(part).subscribe(_ => this.partComponent.GetParts());
  }

}
