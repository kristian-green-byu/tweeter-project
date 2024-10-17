import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { MessageView, Presenter, View } from "./Presenter";

export interface NavBarView extends MessageView {
    clearUserInfo: () => void;
}

export class NavBarPresenter extends Presenter<NavBarView>{
    private service: UserService;

    public constructor(view: NavBarView) {
        super(view);
        this.service = new UserService;
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
            await this.service.logout(authToken!);
            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        }, "log user out");
    };
}