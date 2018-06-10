import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {QueryService} from "../query.service";
import {InterpreterService} from "../interpreter.service";
import {MatDialog} from "@angular/material";
import {AuthService} from "../auth.service";
import {ProgressComponent} from "../progress/progress.component";
import {OutputService} from "../output.service";
import {QueryError} from "../query.error";
import {ErrorComponent} from "../error/error.component";

@Component({
  selector: 'app-query-input',
  templateUrl: './query.input.component.html',
  styleUrls: ['./query.input.component.css']
})
export class QueryInputComponent implements OnInit {

  expectedErrors: Record<QueryError, string>;
  constructor(private queryService: QueryService,
              private interpreter: InterpreterService,
              private dialog: MatDialog,
              private authService: AuthService,
              private outputService: OutputService) {
    this.expectedErrors = {
      [QueryError.NoDatesFound]: "Please include a date",
      [QueryError.NoVariableFound]: "Please include a variable",
      [QueryError.NoLocationsFound]: "Please include a location"
    };
  }

  queryFormControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit() {
  }

  async onSubmit() {

    this.outputService.message = "";
    await this.authService.requestApiKey();
    const ref = this.dialog.open(ProgressComponent);
    ref.disableClose = true;
    try {

      const text = this.queryFormControl.value;
      ref.componentInstance.message = "Interpreting your query...";
      const query = await this.queryService.createQuery(text);

      ref.componentInstance.message = `Requesting data for ${query.variable} in ${query.googleResult.formatted_address}`;
      const result = await this.queryService.runQuery(query);
      const climateResult = this.interpreter.parseData(query.variable, result);
      const message = this.interpreter.interpret(climateResult, query);
      console.log(message);
      this.outputService.message = message;
      ref.close();
    } catch (err) {
      ref.close();

      if(err.message && this.expectedErrors[err.message]) {
        const errorToDisplay = this.expectedErrors[err.message];
        const errorRef = this.dialog.open(ErrorComponent);
        errorRef.componentInstance.message = errorToDisplay;
      }

    }


  }

}
