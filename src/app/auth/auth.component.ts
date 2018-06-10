import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public ref: MatDialogRef<AuthComponent>) {
  }

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(36),
    Validators.maxLength(36)
  ]);

  ngOnInit() {
  }

  onSubmit() {
    if(this.usernameFormControl.valid && this.passwordFormControl.valid) {
      const apiKey = `${this.usernameFormControl.value}:${this.passwordFormControl.value}`;
      this.ref.close(apiKey);
    }
  }

}
