import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {QueryService} from "../query.service";
import {InterpreterService} from "../interpreter.service";
import {MatDialog} from "@angular/material";
import {AuthService} from "../auth.service";
import {ProgressComponent} from "../progress/progress.component";

@Component({
  selector: 'app-query-input',
  templateUrl: './query.input.component.html',
  styleUrls: ['./query.input.component.css']
})
export class QueryInputComponent implements OnInit {

  constructor(private queryService: QueryService,
              private interpreter: InterpreterService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  queryFormControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit() {
  }

  async onSubmit() {

    await this.authService.requestApiKey();
    const ref = this.dialog.open(ProgressComponent);
    ref.disableClose = true;
    try {

      const text = this.queryFormControl.value;
      const query = await this.queryService.createQuery(text);
      const result = await this.queryService.runQuery(query);
      const climateResult = this.interpreter.parseData(query.variable, result);
      const message = this.interpreter.interpret(climateResult);
      console.log(message);
      ref.close();
    } catch (err) {
      ref.close();
    }


  }

}
