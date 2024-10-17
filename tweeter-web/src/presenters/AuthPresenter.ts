import { NavigateFunction } from "react-router-dom";
import { Presenter, View } from "./Presenter";
import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface AuthView extends View {
    navigate: NavigateFunction
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
}

export abstract class AuthPresenter<T extends AuthView> extends Presenter<T> {
    private _isLoading = false;
    protected service: UserService;

    public constructor(view: T){
        super(view);
        this.service = new UserService();
    }

    public get isLoading() {
        return this._isLoading;
    }

    public async doAuth(executeAuth: () => void, originalUrl?: string) {
        this.doFailureReportingOperation(async () => {
            this._isLoading = true;

            //function to login/register
            executeAuth();

            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        }, this.getItemDescription(), () => {this._isLoading = false});
    };

    protected abstract getItemDescription(): string;

}