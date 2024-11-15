import { UserDto } from "../../model/dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface GetUserResponse extends TweeterResponse {
  readonly user: UserDto | null;
}