import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QueryInputComponent } from './query.input/query.input.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QueryInputComponent
  ],
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
