import { Injectable } from '@angular/core';
import {Client} from "@djabry/cdsapi";
import {AuthService} from "./auth.service";
import {HttpUtilsService} from "./http.utils.service";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CdsClientService extends Client {

  constructor(authService: AuthService, httpService: HttpUtilsService) {
    super(authService, httpService, environment.cdsEndpoint);
  }
}
