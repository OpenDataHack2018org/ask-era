import { Injectable } from '@angular/core';
import {CognitoIdentityServiceFactory} from "@djabry/aws-factory/src/cognito.identity.service.factory";
import {CognitoIdentityCredentials} from "aws-sdk/lib/core";
import {environment} from "../environments/environment";
import {config} from "aws-sdk/global";
config.region = environment.region;
@Injectable({
  providedIn: 'root'
})
export class AwsService extends CognitoIdentityServiceFactory {

  constructor() {
    super(new CognitoIdentityCredentials({
      IdentityPoolId: environment.identityPoolId
    }));

  }


}
