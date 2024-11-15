import { AuthToken, FakeData, User } from "tweeter-shared";

export class UserService {
    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        const user = FakeData.instance.firstUser;
        if(alias == null || password == null){
            throw new Error("[Bad Request] alias or password invalid");
        }
        if (user === null) {
            throw new Error("Invalid alias or password");
        }
        return [user, FakeData.instance.authToken];
    };


    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: string,
        imageFileExtension: string
    ): Promise<[User, AuthToken]> {
        const user = FakeData.instance.firstUser;
        if(alias == null || password == null){
            throw new Error("[Bad Request] alias or password invalid");
        }
        if (user === null) {
            throw new Error("Invalid registration");
        }
        return [user, FakeData.instance.authToken];
    }


    public async getUser(
        token: string,
        alias: string
    ): Promise<User | null> {
        return FakeData.instance.findUserByAlias(alias);
    }

    public async logout(token: string): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}