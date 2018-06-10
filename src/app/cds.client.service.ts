import { Injectable } from '@angular/core';
import {Client} from "@djabry/cdsapi";
import {AuthService} from "./auth.service";
import {HttpUtilsService} from "./http.utils.service";

@Injectable({
  providedIn: 'root'
})
export class CdsClientService extends Client {

  constructor(authService: AuthService, httpService: HttpUtilsService) {
    super(authService, httpService);
  }
}
