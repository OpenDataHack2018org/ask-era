import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {QueryService} from "../query.service";

@Component({
  selector: 'app-query-input',
  templateUrl: './query.input.component.html',
  styleUrls: ['./query.input.component.css']
})
export class QueryInputComponent implements OnInit {

  constructor(private queryService: QueryService) {
  }

  queryFormControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit() {
  }

  async onSubmit() {
    const text = this.queryFormControl.value;
    const query = await this.queryService.createQuery(text);
    const dataRequest = this.queryService.toDataRequest(query);
  }

}
