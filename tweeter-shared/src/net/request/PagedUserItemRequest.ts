import { UserDto } from "../../model/dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedUserItemRequest extends TweeterRequest {
    readonly userAlias: string,
    readonly pageSize: number,
    readonly lastItem: UserDto | null,
}