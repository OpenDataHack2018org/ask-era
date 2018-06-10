import { Injectable } from '@angular/core';
import {HttpUtils} from "@djabry/cdsapi";

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService extends HttpUtils {

  constructor() {
    super()
  }
}
