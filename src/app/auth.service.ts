import { Injectable } from '@angular/core';
import {AuthenticationService} from "@djabry/cdsapi/src/authentication.service";
import {MatDialog} from "@angular/material";
import {AuthComponent} from "./auth/auth.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthenticationService {

  apiKey: string;
  constructor(private dialog: MatDialog) {
  }

  requestApiKey(): Promise<string> {
    const ref = this.dialog.open(AuthComponent);
    ref.disableClose = true;
    ref.afterClosed().subscribe(result => {

    });
  }

  async getApiKey(): Promise<string> {
    if(!this.apiKey) {
      this.apiKey = await this.requestApiKey();
    }

    return this.apiKey;
  }
}
