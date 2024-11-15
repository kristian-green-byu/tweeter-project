import { AuthToken, PostStatusRequest, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
  setPost: (post: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView>{
  private service: StatusService | null = null;
  public isLoading: boolean = false;

  public constructor(view: PostStatusView) {
    super(view);
    this.service = this.statusService;
  }

  public get statusService() {
    if (this.service == null) {
      this.service = new StatusService();
    }
    return this.service;
  }

  public async submitPost(currentUser: User, authToken: AuthToken, post: string) {
    this.doFailureReportingOperation(async () => {
      this.isLoading = true;
      this.view.displayInfoMessage("Posting status...", 0);

      const status = new Status(post, currentUser!, authToken.timestamp);
      const request : PostStatusRequest = {
        token: authToken.token,
        newStatus: status.dto
      }
      await this.statusService.(request);

      this.clearPost();
      this.view.displayInfoMessage("Status posted!", 2000);
      this.view.clearLastInfoMessage();
      this.isLoading = false;
    }, "post the status", undefined, () => {
      this.view.clearLastInfoMessage();
      this.isLoading = false;
    });
  };

  public clearPost() {
    this.view.setPost("");
  };
}