import { Injectable } from '@angular/core';
import {AuthenticationService} from "@djabry/cdsapi/src/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthenticationService {

  constructor() {
  }

  async getApiKey(): Promise<string> {
    return "";
  }
}
