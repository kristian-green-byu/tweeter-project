import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";

export interface PostStatusView{
    displayInfoMessage: (message: string, duration: number) => void;
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
    setPost: (post: string) => void;
}

export class PostStatusPresenter{
    private service: StatusService;
    private view: PostStatusView;
    public isLoading: boolean = false;
    public post: string = "";

    public constructor(view: PostStatusView){
        this.service = new StatusService;
        this.view = view;
    }

    public async submitPost(event: React.MouseEvent, currentUser: User, authToken: AuthToken){
        event.preventDefault();
    
        try {
          this.isLoading = true;
          this.view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(this.post, currentUser!, Date.now());
    
          await this.service.postStatus(authToken!, status);
    
          this.post = "";
          this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.isLoading = false;
        }
      };
    
      public clearPost(event: React.MouseEvent){
        event.preventDefault();
        this.view.setPost("");
      };
}