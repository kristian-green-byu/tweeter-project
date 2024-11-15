import { UserDto } from "../../model/dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface IsFollowerStatusRequest extends TweeterRequest {
  readonly user: UserDto;
  readonly otherUser: UserDto;
}