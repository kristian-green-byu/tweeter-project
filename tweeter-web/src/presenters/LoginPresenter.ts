import { DoLoginRequest } from "tweeter-shared";
import { AuthPresenter, AuthView } from "./AuthPresenter";


export class LoginPresenter extends AuthPresenter<AuthView>{
    protected getItemDescription(): string {
        return "log user in";
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string) {
        this.doAuth(async () => {
            const request : DoLoginRequest = {
                userAlias: alias,
                password: password,
                token: ""
            }
            const [user, authToken] = await this.service.login(request);
            this.view.updateUserInfo(user, user, authToken, rememberMe);
        }, originalUrl);
    };
}