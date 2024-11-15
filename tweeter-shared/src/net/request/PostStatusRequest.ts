import { StatusDto } from "../../model/dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PostStatusRequest extends TweeterRequest {
    readonly newStatus: StatusDto | null;
}