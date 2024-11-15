import { TweeterRequest } from "./TweeterRequest";

export interface DoLoginRequest extends TweeterRequest {
  readonly userAlias: string;
  readonly password: string;
}