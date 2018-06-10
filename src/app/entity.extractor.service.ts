import { Injectable } from '@angular/core';
import {SnerEntity} from "./sner.entity";
import {SnerType} from "./sner.type";
import {HttpUtilsService} from "./http.utils.service";
import {environment} from "../environments/environment";
import {Entity} from "aws-sdk/clients/comprehend";

@Injectable({
  providedIn: 'root'
})
export class EntityExtractorService {

  constructor(private httpUtils: HttpUtilsService) {
  }

  extractEntities(text: string): Promise<Record<SnerType, SnerEntity[]>> {
    return this.httpUtils.get(`${environment.snerEndpoint}?text=${text}` );
  }

  toAwsEntities(snerEntities: Record<SnerType, SnerEntity[]>): Entity[] {
    const entities: Entity[] = [];
    for(const type of Object.keys(snerEntities)) {
      for(const child of snerEntities[type]) {
        entities.push({
          Type: type,
          Score: child.count
        })
      }

    }

    return entities;
  }
}
