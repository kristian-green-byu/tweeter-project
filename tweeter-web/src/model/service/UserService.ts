import { AuthToken, DoLoginRequest, DoRegisterRequest, FakeData, GetUserRequest, TweeterRequest, User } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../net/ServerFacade";

export class UserService {
    private facade = new ServerFacade();

    public async login(
        request: DoLoginRequest
    ): Promise<[User, AuthToken]> {
        return this.facade.login(request)
    };

    public async register(
        requestObject: DoRegisterRequest
    ): Promise<[User, AuthToken]> {
        return this.facade.register(requestObject)
    }

    public async getUser(
        requestObject: GetUserRequest
    ): Promise<User | null> {
        return this.facade.getUser(requestObject)
    }

    public async logout(requestObject: TweeterRequest): Promise<void> {
        await new Promise((res) => setTimeout(res, 1000));
        this.facade.logout(requestObject)
    };
}