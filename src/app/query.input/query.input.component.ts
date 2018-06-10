import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {QueryService} from "../query.service";
import {InterpreterService} from "../interpreter.service";

@Component({
  selector: 'app-query-input',
  templateUrl: './query.input.component.html',
  styleUrls: ['./query.input.component.css']
})
export class QueryInputComponent implements OnInit {

  constructor(private queryService: QueryService,
              private interpreter: InterpreterService) {
  }

  queryFormControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit() {
  }

  async onSubmit() {
    const text = this.queryFormControl.value;
    const query = await this.queryService.createQuery(text);
    const result = await this.queryService.runQuery(query);
    const climateResult = this.interpreter.parseData(query.variable, result);
    const message = this.interpreter.interpret(climateResult);
    console.log(message);

  }

}
