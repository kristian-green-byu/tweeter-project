import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { MessageView, Presenter, View } from "./Presenter";

export interface NavBarView extends MessageView {
    clearUserInfo: () => void;
}

export class NavBarPresenter extends Presenter<NavBarView>{
    private service: UserService | null = null;

    public constructor(view: NavBarView) {
        super(view);
        this.service = this.userService;
    }

    public get userService() {
        if (this.service == null) {
            this.service = new UserService();
        }
        return this.service;
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
            await this.userService.logout(authToken!);
            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        }, "log user out");
    };
}