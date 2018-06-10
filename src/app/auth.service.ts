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

  async requestApiKey(): Promise<void> {
    if(!this.apiKey) {
      const ref = this.dialog.open(AuthComponent);
      ref.disableClose = true;
      this.apiKey = await new Promise<string>(resolve => {
        ref.afterClosed().subscribe(result => {
          resolve(result);
        });
      });
    }


  }

  async getApiKey(): Promise<string> {
    await this.requestApiKey();
    return this.apiKey;
  }
}
