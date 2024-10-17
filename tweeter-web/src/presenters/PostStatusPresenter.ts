import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
  setPost: (post: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView>{
  private service: StatusService;
  public isLoading: boolean = false;
  public post: string = "";

  public constructor(view: PostStatusView) {
    super(view);
    this.service = new StatusService();
  }

  public async submitPost(event: React.MouseEvent, currentUser: User, authToken: AuthToken) {
    event.preventDefault();
    this.doFailureReportingOperation(async () => {
      this.isLoading = true;
      this.view.displayInfoMessage("Posting status...", 0);

      const status = new Status(this.post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.post = "";
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status", () => {
      this.view.clearLastInfoMessage();
      this.isLoading = false;
    });
  };

  public clearPost(event: React.MouseEvent) {
    event.preventDefault();
    this.view.setPost("");
  };
}