import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QueryInputComponent } from './query.input/query.input.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatProgressBarModule,
  MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { ProgressComponent } from './progress/progress.component';
import { OutputComponent } from './output/output.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  entryComponents: [
    AuthComponent,
    ProgressComponent,
    ErrorComponent
  ],
  declarations: [
    AppComponent,
    QueryInputComponent,
    AuthComponent,
    ProgressComponent,
    OutputComponent,
    ErrorComponent
  ],
  imports: [
    MatProgressBarModule,
    MatDialogModule,
    MatCardModule,
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
