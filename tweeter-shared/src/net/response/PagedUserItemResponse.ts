import { UserDto } from "../../model/dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedUserItemResponse extends TweeterResponse {
    readonly items: UserDto[] | null,
    readonly hasMore: boolean;
}