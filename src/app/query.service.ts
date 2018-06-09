import { Injectable } from '@angular/core';
import {AwsService} from "./aws.service";
import {Query} from "./query";
import {Client} from "@djabry/cdsapi";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private awsService: AwsService,
              private cdsClient: Client) {

  }

  async createQuery(input: string): Promise<Query> {

  }

}
